/* Pet Earn — server-backed coins, native inside Sprite Hollow.
   Care in the Hollow earns coins and the coin pill shows the balance. Coins stay
   in the Hollow: there is no wallet sheet and they are never converted to money. */

(function () {
  'use strict';

  /* The coin server is same-origin in the web build. A packaged build is
     served from appassets.androidplatform.net, where /api would be answered by
     the local asset reader, so it bakes an absolute URL into src/api-base.js. */
  const RAW_BASE = String((window.SPRITE_HOLLOW_API || '')).trim().replace(/\/+$/, '');
  const CONFIGURED = RAW_BASE ? (/\/api$/.test(RAW_BASE) ? RAW_BASE : `${RAW_BASE}/api`) : '';
  const API = CONFIGURED || '/api';
  /* A packaged build talks to another origin, where the session cookie is not
     sent, so the server hands out a bearer token instead. */
  const TOKEN_KEY = 'spritehollow.api.token';
  const readToken = () => {
    try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; }
  };
  const writeToken = (token) => {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    } catch { /* private mode */ }
  };
  const PACKAGED = location.protocol === 'https:' && location.hostname === 'appassets.androidplatform.net';
  const LOCAL_ONLY = PACKAGED && !CONFIGURED;
  const S = { me: null, busy: false };

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
  const fmt = (n) => Number(n || 0).toLocaleString();
  const dateShort = (ts) => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const fieldStyle = 'width:100%;padding:12px 14px;border-radius:13px;background:rgba(255,255,255,.06);border:1px solid var(--line);color:var(--text);outline:none;font-size:14px;font-family:inherit';

  async function api(path, { method, body } = {}) {
    let res;
    try {
      res = await fetch(API + path, {
        method: method || (body ? 'POST' : 'GET'),
        headers: {
          ...(body ? { 'content-type': 'application/json' } : {}),
          ...(readToken() ? { authorization: `Bearer ${readToken()}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'same-origin',
        cache: 'no-store',
      });
    } catch {
      throw new Error('The coin server is offline right now.');
    }
    let data = null;
    try { data = await res.json(); } catch { /* empty body */ }
    if (!res.ok) {
      const err = new Error(data?.error || 'That did not work. Try again.');
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data || {};
  }

  /* The top-bar coin pill is the server balance. */
  try {
    window.addEventListener('online', () => { flushOutbox().catch(() => {}); });
  } catch { /* no window */ }

  function syncPill() {
    const coins = S.me?.wallet?.coins;
    if (typeof coins !== 'number') return;
    const el = document.querySelector('[data-coins]');
    if (el && el.textContent !== String(coins)) {
      el.textContent = String(coins);
      const pill = document.querySelector('[data-coin-pill]');
      if (pill) {
        pill.classList.remove('bump');
        void pill.offsetWidth;
        pill.classList.add('bump');
      }
    }
  }

  async function ensureSession() {
    if (LOCAL_ONLY) throw new Error('Coins need the online Hollow.');
    if (S.me) return S.me;
    S.me = await api('/guest', { method: 'POST' });
    writeToken(S.me.token);
    syncPill();
    return S.me;
  }

  async function wallet() {
    await ensureSession();
    syncPill();
    return S.me.wallet;
  }

  /* Care taken in the Hollow pays server-side coins. */
  async function care(action) {
    const mapped = action === 'feed' ? 'feed' : (action === 'clean' || action === 'bath') ? 'clean' : 'play';
    if (LOCAL_ONLY) return { award: 0, offline: true, error: 'Coins need the online Hollow.' };
    try {
      await ensureSession();
      const data = await api('/pet/care', { body: { action: mapped } });
      S.me.pet = data.pet;
      S.me.wallet = data.wallet;
      S.me.today = data.today;
      syncPill();
      return data;
    } catch (err) {
      return { award: 0, error: err.message, retryAfter: err.data?.retryAfter };
    }
  }

  /* A win is saved on the phone before it is sent, so losing signal mid-game
     keeps the reward and pays it in later instead of dropping it. Each entry
     keeps its own id, so replaying the queue can never pay a win twice. */
  const OUTBOX_KEY = () => `spritehollow.reward-outbox.${S.me?.user?.id || 'guest'}`;
  function outboxRead() {
    try {
      const list = JSON.parse(localStorage.getItem(OUTBOX_KEY()) || '[]');
      return Array.isArray(list) ? list : [];
    } catch { return []; }
  }
  function outboxWrite(list) {
    try { localStorage.setItem(OUTBOX_KEY(), JSON.stringify(list.slice(-200))); } catch { /* full or private */ }
  }
  let outboxBusy = null;
  let flushTimer = null;
  let flushWaiters = [];
  /* The server banks at most this much in one award. */
  const MAX_AWARD = 500;

  const newAwardId = () => {
    try {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    } catch { /* older webviews */ }
    return `r${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  };

  /* A reward won before the session existed is saved under the guest bucket,
     because the session id is not known yet. Adopting those entries means the
     very first coins a new player earns still reach their wallet. */
  function adoptGuestOutbox() {
    if (!S.me?.user?.id) return;
    try {
      const guestKey = 'spritehollow.reward-outbox.guest';
      const raw = localStorage.getItem(guestKey);
      if (!raw) return;
      localStorage.removeItem(guestKey);
      const orphans = JSON.parse(raw);
      if (!Array.isArray(orphans) || !orphans.length) return;
      outboxWrite([...orphans, ...outboxRead()]);
    } catch { /* private mode */ }
  }

  async function flushOutbox() {
    if (outboxBusy) return outboxBusy;
    if (LOCAL_ONLY) return { award: 0, pending: 0 };
    outboxBusy = (async () => {
      /* /earn needs a session, and the queue may hold wins from before there was
         one, so the session is established here rather than trusted. */
      try { await ensureSession(); } catch { return { award: 0, pending: outboxRead().length, offline: true }; }
      adoptGuestOutbox();
      let list = outboxRead();
      let rewarded = 0;
      while (list.length) {
        const item = list[0];
        try {
          const data = await api('/earn', {
            body: { amount: item.amount, source: item.source, key: item.id },
          });
          const paid = Math.max(0, Number(data.award) || 0);
          rewarded += paid;
          if (data.wallet) { S.me.wallet = data.wallet; syncPill(); }
          if (data.duplicate) {
            /* already banked under this id: it must not pay again, or block the queue */
            list = list.slice(1);
          } else if (paid <= 0) {
            /* the day's room is gone; keep it and try again later */
            break;
          } else if (paid < item.amount) {
            /* the daily room ran out part-way, so the rest keeps its place */
            list = [{ ...item, amount: item.amount - paid }, ...list.slice(1)];
          } else {
            list = list.slice(1);
          }
          outboxWrite(list);
        } catch (err) {
          // an award the server will never accept is dropped, anything else waits
          if (/not a coin source|cannot be banked|needs an id/.test(String(err && err.message))) {
            list = list.slice(1);
            outboxWrite(list);
            continue;
          }
          break;
        }
      }
      return { award: rewarded, pending: list.length };
    })();
    try { return await outboxBusy; } finally { outboxBusy = null; }
  }

  /* Coins are folded together before they are sent — petting a sprite for one
     coin should not become its own request — and a win bigger than the server's
     per-award ceiling is split so no part of it is refused. */
  function enqueue(amount, source) {
    const n = Math.round(Number(amount) || 0);
    if (LOCAL_ONLY || n <= 0) return Promise.resolve({ award: 0, pending: 0 });
    const list = outboxRead();
    const tail = list[list.length - 1];
    if (tail && tail.source === source && Date.now() - (tail.at || 0) < 20000 && tail.amount + n <= MAX_AWARD) {
      tail.amount += n;
      tail.at = Date.now();
      outboxWrite(list);
    } else {
      let left = n;
      while (left > 0) {
        const chunk = Math.min(MAX_AWARD, left);
        list.push({ id: newAwardId(), amount: chunk, source, at: Date.now() });
        left -= chunk;
      }
      outboxWrite(list);
    }
    /* Sending is debounced so a burst of small wins becomes one award, and the
       caller still gets the result of the send it triggered. */
    const settled = new Promise((resolve) => flushWaiters.push(resolve));
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = setTimeout(() => {
      flushTimer = null;
      const done = flushWaiters;
      flushWaiters = [];
      flushOutbox()
        .then((result) => done.forEach((fn) => fn(result)))
        .catch(() => done.forEach((fn) => fn({ award: 0, pending: list.length })));
    }, 900);
    return settled;
  }

  /* Hollow coins banked into the same wallet the pill shows. Fire-and-forget:
     the game stays playable offline and the server decides how much is payable
     today, answering with the wallet so the pill never drifts. */
  async function earn(amount, source, key) {
    const n = Math.round(Number(amount) || 0);
    if (LOCAL_ONLY || n <= 0) return { award: 0 };
    try {
      await ensureSession();
      const data = await api('/earn', { body: { amount: n, source, key } });
      if (data.wallet) {
        S.me.wallet = data.wallet;
        syncPill();
      }
      return data;
    } catch (err) {
      return { award: 0, error: err.message };
    }
  }

  /* --- Hollow care pays the coins ---------------------------------------
     The game keeps the sprite happy in the local save; this bridge pays server
     coins for the same care, so the pill is the server balance. Each game action
     is wrapped once and never blocked. */
  const CARE_BRIDGE = {
    feed: 'feed', feedStock: 'feed', feedSnack: 'feed',
    bathe: 'clean',
    pet: 'play', rubBelly: 'play', playCatch: 'play', nap: 'play', tuckIn: 'play',
  };
  const BRIDGE_VERB = { feed: 'feeding', clean: 'bathing', play: 'playing' };
  let bridgeTries = 0;

  const say = (text, icon) => {
    try { if (typeof toast === 'function') toast(text, icon); } catch { /* no toasts here */ }
  };

  function payForCare(action) {
    care(action).then((res) => {
      if (!res) return;
      if (res.award > 0) say(`+${res.award} coins for ${BRIDGE_VERB[action] || 'caring'}`, '🪙');
      else if (res.error && /cap|limit|wait|try again/i.test(res.error)) say(res.error, '🪙');
    }).catch(() => { /* the pill simply stays where it is */ });
  }

  function bridgeActions() {
    let actions = null;
    try { actions = typeof Actions !== 'undefined' ? Actions : null; } catch { actions = null; }
    if (!actions) return false;
    if (actions.__petEarnBridge) return true;
    for (const [name, mapped] of Object.entries(CARE_BRIDGE)) {
      const original = actions[name];
      if (typeof original !== 'function') continue;
      actions[name] = function bridgedCare(...args) {
        const result = original.apply(this, args);
        if (!result || result.ok !== false) payForCare(mapped);
        return result;
      };
    }
    actions.__petEarnBridge = true;
    return true;
  }

  if (!bridgeActions() && typeof document !== 'undefined' && document.addEventListener) {
    const retry = () => { if (!bridgeActions()) { bridgeTries += 1; if (bridgeTries < 20) setTimeout(retry, 250); } };
    document.addEventListener('DOMContentLoaded', retry, { once: true });
    setTimeout(retry, 0);
  }

  window.PetEarn = {
    available: !LOCAL_ONLY,
    offline: LOCAL_ONLY,
    apiBase: API,
    care,
    earn,
    enqueue,
    flushOutbox,
    pendingRewards: () => outboxRead().length,
    wallet,
    sync: () => { syncPill(); },
    bridge: bridgeActions,
    _state: S,
  };
})();
