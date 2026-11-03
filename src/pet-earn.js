/* Pet Earn — server-backed coins, native inside Sprite Hollow.
   Care in the Hollow earns coins; the Wallet sheet (Settings) cashes them out
   to PayPal at any time. There is no separate screen and players sign nothing. */

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
  const money = (cents) => `$${(Number(cents || 0) / 100).toFixed(2)}`;
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

  /* Lights the Cash out chip when the balance can actually be withdrawn. */
  function markReady() {
    if (LOCAL_ONLY) return;
    const w = S.me?.wallet;
    if (!w) return;
    const ready = Number(w.coins || 0) >= Math.max(1, Number(w.minWithdrawCoins || 1));
    document.querySelectorAll('[data-cash-ready]').forEach((dot) => { dot.hidden = !ready; });
  }

  /* The top-bar "cash" pill is the server balance. */
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
    markReady();
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

  async function refreshWallet() {
    await ensureSession();
    const data = await api('/wallet');
    S.me.wallet = data.wallet;
    syncPill();
    return data;
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

  function historyHTML(list) {
    if (!list?.length) {
      return '<p class="tiny muted" style="margin:8px 2px">No payouts yet. Keep caring for your sprite and the coins add up.</p>';
    }
    return list.map((x) => `<div class="card" style="padding:10px 12px;margin-top:8px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">${x.status === 'paid' ? '✅' : x.status === 'rejected' ? '↩️' : x.status === 'approved' ? '📦' : '⏳'}</span>
      <div style="flex:1;min-width:0">
        <b style="font-size:13px">${money(x.usd_cents)} · ${fmt(x.coins)} coins</b>
        <div class="tiny muted" style="margin-top:2px">${esc(x.paypal_email)} · ${dateShort(x.created_at)}${x.note ? ` · ${esc(x.note)}` : ''}</div>
      </div>
      <span class="chip" style="font-size:10px;text-transform:uppercase;letter-spacing:.4px">${esc(x.status)}</span>
    </div>`).join('');
  }

  function walletBody(data) {
    const w = data.wallet;
    const rate = Math.max(1, w.coinsPerDollar || 1000);
    const min = Math.max(1, w.minWithdrawCoins || 1);
    /* Only whole US cents can be requested, so the offer is rounded down to one. */
    const offer = Math.floor((Math.floor((w.coins * 100) / rate) * rate) / 100);
    return `
      <div class="between">
        <span class="chip">🪙 <b>${fmt(w.coins)}</b> coins</span>
        <span class="tiny muted">≈ ${money(Math.floor((w.coins * 100) / rate))} at ${fmt(rate)} coins / $1</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
        <span class="chip" style="font-size:10px">Available ${fmt(w.available ?? w.coins)}</span>
        <span class="chip" style="font-size:10px">In review ${fmt(w.reserved || 0)}</span>
        <span class="chip" style="font-size:10px">Paid ${money(Math.round((w.paid || 0) * 100))}</span>
      </div>
      <div class="section-title" style="margin-top:14px"><h2>Cash out to PayPal</h2><span>${w.autoPayout ? 'sent straight to your PayPal' : 'owner reviews each one'}</span></div>
      <form data-withdraw>
        <label class="tiny muted" style="display:block;margin:0 2px 5px">Coins to withdraw</label>
        <input name="coins" type="number" inputmode="numeric" min="${min}" step="1" placeholder="${fmt(min)}" value="${w.coins >= min ? offer : ''}" style="${fieldStyle}">
        <label class="tiny muted" style="display:block;margin:10px 2px 5px">PayPal email</label>
        <input name="paypalEmail" type="email" inputmode="email" placeholder="you@example.com" style="${fieldStyle}">
        <p class="tiny muted" data-est style="margin:8px 2px 0">${w.coins >= min
          ? `${fmt(offer)} coins ≈ ${money(Math.floor((offer * 100) / rate))} via PayPal.`
          : `Any amount is cashable, down to one cent.`}</p>
        <button class="btn btn-primary btn-block" type="submit" style="margin-top:10px" ${w.coins < min ? 'disabled' : ''}>Request payout</button>
      </form>
      ${(() => { const waiting = outboxRead().length; return waiting ? `<p class="tiny muted" style="margin:10px 2px 0">⏳ ${waiting} reward${waiting === 1 ? '' : 's'} saved on this phone, syncing automatically.</p>` : ''; })()}
      <div class="section-title"><h2>Your requests</h2></div>
      ${historyHTML(data.withdrawals)}
      <button class="btn btn-soft btn-block" data-owner style="margin-top:14px">🛠️ Owner tools</button>`;
  }

  function offlineBody(what) {
    return `<p class="tiny muted" style="margin:0 2px 10px;line-height:1.6">Coins are kept by the Hollow server, and this copy of the game runs entirely on your phone — so ${what} cannot reach it from here.</p>
      <p class="tiny muted" style="margin:0 2px 10px;line-height:1.6">Play the online Hollow to earn and cash out. Nothing on this phone is affected: your sprites, levels, coins in the shop and saves all work as usual.</p>`;
  }

  async function openWallet() {
    if (!LOCAL_ONLY) flushOutbox().catch(() => {});
    if (LOCAL_ONLY) {
      const sheet = openSheet({
        title: 'Wallet',
        sub: 'Care here cannot pay coins yet.',
        body: offlineBody('the wallet'),
      });
      return sheet.close;
    }
    let data;
    try {
      data = await refreshWallet();
    } catch (err) {
      toast(err.message, '😕');
      return null;
    }

    const rate = Math.max(1, data.wallet.coinsPerDollar || 1000);
    const min = Math.max(1, data.wallet.minWithdrawCoins || 1);

    const sheet = openSheet({
      title: 'Wallet',
      sub: 'Coins you earned in the Hollow. Cash out whenever you like.',
      body: walletBody(data),
      onMount: (root, close) => {
        const form = root.querySelector('[data-withdraw]');
        const input = form.querySelector('[name="coins"]');
        const est = form.querySelector('[data-est]');

        const paintEstimate = () => {
          const coins = Number(input.value || 0);
          est.textContent = coins >= min
            ? `${fmt(coins)} coins ≈ ${money(Math.floor((coins * 100) / rate))} via PayPal.`
            : `Any amount is cashable, down to one cent.`;
        };
        input.addEventListener('input', paintEstimate);
        paintEstimate();

        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          if (S.busy) return;
          const coins = Number(input.value || 0);
          const paypalEmail = form.querySelector('[name="paypalEmail"]').value.trim();
          if (!coins || coins < min) { toast('Enter how many coins to cash out.', '🪙'); return; }
          if (!paypalEmail) { toast('Add the PayPal email for the payout.', '✉️'); return; }
          S.busy = true;
          try {
            const res = await api('/wallet/withdraw', { body: { coins, paypalEmail } });
            const paidNow = res.withdrawal?.status === 'paid';
            S.me.wallet = (await api('/wallet')).wallet;
            syncPill();
            toast(paidNow
              ? 'Paid to PayPal — the money is on its way.'
              : res.queued ? 'Payout queued — it is being sent.' : 'Payout requested — the owner reviews it by hand.', paidNow ? '💸' : '✅');
            close();
            openWallet();
          } catch (err) {
            toast(err.message, '😕');
          } finally {
            S.busy = false;
          }
        });

        root.querySelector('[data-owner]')?.addEventListener('click', () => {
          close();
          openOwner();
        });
      },
    });
    return sheet.close;
  }

  async function adminBody() {
    const [overview, pending] = await Promise.all([
      api('/admin/overview'),
      api('/admin/withdrawals?status=pending'),
    ]);
    const rows = pending.withdrawals || [];
    const totals = overview.totals || {};
    return `
      <div class="between">
        <span class="chip">🪙 <b>${fmt(totals.coinsInCirculation || 0)}</b> in circulation</span>
        <span class="chip">${rows.length} pending</span>
      </div>
      <div class="section-title" style="margin-top:14px"><h2>Pending payouts</h2></div>
      ${rows.length ? rows.map((w) => `<div class="card" style="padding:12px;margin-top:8px">
        <b style="font-size:13.5px">${money(w.usd_cents)} · ${fmt(w.coins)} coins</b>
        <div class="tiny muted" style="margin-top:2px">${esc(w.paypal_email)} · ${esc(w.username || 'player')} · ${dateShort(w.created_at)}</div>
        <div class="row" style="gap:6px;margin-top:9px;flex-wrap:wrap">
          <input data-note placeholder="Reason (needed to reject)" maxlength="200" style="${fieldStyle};padding:9px 11px;font-size:13px">
          <input data-reference placeholder="PayPal reference (needed to mark paid)" maxlength="120" style="${fieldStyle};padding:9px 11px;font-size:13px">
          <button class="btn btn-sm btn-primary" data-decide="approve" data-id="${esc(w.id)}">Approve</button>
          <button class="btn btn-sm btn-soft" data-decide="paid" data-id="${esc(w.id)}">Mark paid</button>
          <button class="btn btn-sm btn-ghost" data-decide="reject" data-id="${esc(w.id)}" style="color:var(--bad)">Reject</button>
        </div>
      </div>`).join('') : '<p class="tiny muted" style="margin:8px 2px">Nothing waiting for review.</p>'}
      <a class="btn btn-soft btn-block" href="${API}/admin/withdrawals/export" style="margin-top:14px;text-align:center;text-decoration:none">⬇️ Export payouts CSV</a>
      <button class="btn btn-ghost btn-block" data-signout style="margin-top:10px">Sign out</button>`;
  }

  async function openOwner() {
    if (LOCAL_ONLY) {
      const sheet = openSheet({
        title: 'Payout review',
        sub: 'Only available in the online Hollow.',
        body: offlineBody('payouts'),
      });
      return sheet.close;
    }
    /* Nothing to type. The first session to open payout review takes the seat;
       anyone after that is a player and only sees who reviews the payouts. */
    if (!S.me?.user?.isAdmin) {
      try {
        const res = await api('/owner/claim', { method: 'POST' });
        S.me = { ...(S.me || {}), user: res.owner || { ...(S.me?.user || {}), isAdmin: true } };
        if (res.claimed) toast('This Hollow is yours — payouts are reviewed here.', '🔑');
      } catch (err) {
        const sheet = openSheet({
          title: 'Payout review',
          sub: 'Another session owns this Hollow.',
          body: `<p class="tiny muted" style="margin:0 2px 10px;line-height:1.6">${esc(err.message)}</p>
            <p class="tiny muted" style="margin:0 2px 10px;line-height:1.6">There is nothing to type: earning coins and cashing out work exactly the same from the Wallet.</p>`,
        });
        return sheet.close;
      }
    }

    let body = '';
    try {
      body = await adminBody();
    } catch (err) {
      body = `<p class="tiny muted">${esc(err.message)}</p>`;
    }

    const sheet = openSheet({
      title: 'Payout review',
      sub: 'Approve, pay or reject PayPal payouts.',
      body,
      onMount: (root, close) => {
        root.querySelectorAll('[data-decide]').forEach((btn) => {
          btn.addEventListener('click', async () => {
            if (S.busy) return;
            S.busy = true;
            try {
              const card = btn.closest ? btn.closest('.card') : null;
              const note = card?.querySelector('[data-note]')?.value?.trim() || '';
              const reference = card?.querySelector('[data-reference]')?.value?.trim() || '';
              const action = btn.dataset.decide;
              if (action === 'reject' && !note) { toast('Add a reason so the player knows why.', '✍️'); return; }
              if (action === 'paid' && !reference) { toast('Enter the PayPal transaction reference.', '🧾'); return; }
              await api(`/admin/withdrawals/${btn.dataset.id}/decide`, { body: { action, note, reference } });
              toast(`Payout ${action === 'reject' ? 'rejected' : action === 'paid' ? 'marked paid' : 'approved'}.`, '✅');
              close();
              openOwner();
            } catch (err) {
              toast(err.message, '😕');
            } finally {
              S.busy = false;
            }
          });
        });

        root.querySelector('[data-signout]')?.addEventListener('click', async () => {
          try { await api('/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
          writeToken('');
          S.me = null;
          close();
          toast('Signed out of the owner account.', '👋');
        });
      },
    });
    return sheet.close;
  }

  /* --- Hollow care pays the wallet ---------------------------------------
     The game keeps the sprite happy in the local save; this bridge pays server
     coins for the same care, so the cash pill and the withdrawable balance are
     the same number. Each game action is wrapped once and never blocked. */
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
    }).catch(() => { /* offline is handled by the wallet sheet */ });
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

  /* The cash pill opens the Wallet on the web and in the app. */
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', (event) => {
      const pill = event.target && event.target.closest ? event.target.closest('[data-coin-pill]') : null;
      if (!pill) return;
      event.preventDefault();
      openWallet();
    });
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
    openWallet,
    openOwner,
    sync: () => { syncPill(); markReady(); },
    bridge: bridgeActions,
    _state: S,
  };
})();
