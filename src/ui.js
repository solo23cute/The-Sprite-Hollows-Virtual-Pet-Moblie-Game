/* Shared UI: icons, sheets, modals, toasts, particles. */

const ICONS = {
  hollow: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h5v-5h3v5h5v-9.5"/>',
  sprites: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  types: '<path d="M12 6.5C10.3 5.2 8 4.5 5 4.5v13c3 0 5.3.7 7 2 1.7-1.3 4-2 7-2v-13c-3 0-5.3.7-7 2Z" stroke-linejoin="round"/><path d="M12 6.5v13" stroke-linecap="round"/>',
  nest: '<path d="M12 3c4.2 0 7 4.4 7 9.2C19 17 16 20 12 20s-7-3-7-7.8C5 7.4 7.8 3 12 3Z"/><path d="M9 12.5c1.6 1.5 4.4 1.5 6 0" stroke-linecap="round"/>',
  play: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M8 11v3M6.5 12.5h3" stroke-linecap="round"/><circle cx="16" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="18" cy="13.8" r="1.1" fill="currentColor" stroke="none"/>',
  today: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="m8.5 15 2.3 2.3 4.5-4.4" stroke-linecap="round" stroke-linejoin="round"/>',
  palette: '<path d="M12 3c5 0 9 3.6 9 8 0 2.8-2.2 4-4 4h-1.6c-1 0-1.7.7-1.7 1.6 0 .5.2.9.5 1.3.3.4.4.8.4 1.2 0 .5-.4.9-1.4.9-5.2 0-9.2-4-9.2-9S7 3 12 3Z"/><circle cx="8.5" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="9" r="1" fill="currentColor" stroke="none"/>',
  settings: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9" stroke-linecap="round"/><circle cx="15" cy="7" r="2.4"/><circle cx="9" cy="17" r="2.4"/>',
  coin: '<circle cx="12" cy="12" r="8.2"/><path d="M12 7.6v8.8M14.6 9.4c0-1-1.2-1.7-2.6-1.7-1.6 0-2.6.8-2.6 1.9 0 2.7 5.2 1.4 5.2 4 0 1.1-1.1 1.9-2.6 1.9-1.5 0-2.6-.7-2.6-1.8" stroke-linecap="round"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-9.4C4.5 7.4 6.7 5 9.6 5c1.7 0 3 .9 2.4 2 .6-1.1 1.7-2 3.4-2 2.9 0 5.1 2.4 5.1 5.6C20.5 15.4 12 20 12 20Z"/>',
  food: '<path d="M6 3.5v7.2c0 1.7 1.1 2.8 2.5 2.8v6.8M8.5 3.5v6M11 3.5v6"/><path d="M17.5 3.5c-2 0-3.5 2.5-3.5 5.5s1.5 4 3.5 4 3.5-1 3.5-4-1.5-5.5-3.5-5.5ZM17.5 13v7.5" stroke-linecap="round"/>',
  bath: '<path d="M4 13h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6.5 13V6.2A2.2 2.2 0 0 1 8.7 4c1.2 0 2 .7 2.4 1.8M8 17.5v2M16 17.5v2" stroke-linecap="round"/><circle cx="9" cy="9.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="14" cy="8" r="1.6" fill="currentColor" stroke="none"/>',
  moon: '<path d="M20 14.3A8.4 8.4 0 0 1 9.7 4 8.5 8.5 0 1 0 20 14.3Z"/>',
  chat: '<path d="M20.5 11.8c0 4-3.8 7.2-8.5 7.2-1 0-2-.2-2.9-.5L4 20.5l1.4-4A6.7 6.7 0 0 1 3.5 11.8C3.5 7.9 7.3 4.6 12 4.6s8.5 3.3 8.5 7.2Z"/>',
  send: '<path d="M21 3 10.5 13.5M21 3l-6.6 18-3.9-7.5L3 9.6 21 3Z" stroke-linejoin="round"/>',
  close: '<path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/>',
  plus: '<path d="M12 5v14M5 12h14" stroke-linecap="round"/>',
  chevron: '<path d="m9 5 7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>',
  dna: '<path d="M7 3c0 5 10 5 10 9S7 16 7 21M17 3c0 5-10 5-10 9s10 5 10 9" stroke-linecap="round"/><path d="M8.6 7h6.8M9 17h6.5M9.4 12h5.2" stroke-linecap="round"/>',
  star: '<path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.3l6-.8L12 3Z" stroke-linejoin="round"/>',
  sparkle: '<path d="m12 3 1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3Z" stroke-linejoin="round"/>',
  arrow: '<path d="M19 12H5m6-6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.6 6M20 4.5V11h-6.2" stroke-linecap="round" stroke-linejoin="round"/>',
  sound: '<path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z" stroke-linejoin="round"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.4 8.4 0 0 1 0 12" stroke-linecap="round"/>',
  lock: '<rect x="4.5" y="10" width="15" height="10" rx="3"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
  trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l1 13h9l1-13M10 11v5M14 11v5" stroke-linecap="round" stroke-linejoin="round"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.3" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.3" fill="currentColor" stroke="none"/>',
};

function icon(name, cls = '') {
  const path = ICONS[name] || ICONS.sparkle;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${path}</svg>`;
}

function portalRoot() {
  return document.getElementById('portal');
}

function ensureToastWrap() {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    wrap.className = 'toast-wrap';
    document.getElementById('app').appendChild(wrap);
  }
  return wrap;
}

function toast(message, emoji = '✨') {
  const wrap = ensureToastWrap();
  while (wrap.children.length >= 3) wrap.firstElementChild.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="t-ico">${emoji}</span><span>${message}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, 2200);
}

const overlayStack = [];
function closeTopOverlay() {
  const el = overlayStack.pop();
  if (el) {
    if (typeof el._closeCleanup === 'function') {
      try { el._closeCleanup(); } catch (err) { console.error(err); }
    }
    el.remove();
  }
}
function closeAllOverlays() {
  while (overlayStack.length) closeTopOverlay();
}

function buildOverlay(inner, { center = false, dismissible = true, onClose } = {}) {
  const overlay = document.createElement('div');
  overlay.className = `overlay${center ? ' center' : ''}`;
  overlay.innerHTML = inner;
  portalRoot().appendChild(overlay);
  overlayStack.push(overlay);
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    const idx = overlayStack.indexOf(overlay);
    if (idx >= 0) overlayStack.splice(idx, 1);
    overlay.remove();
    if (typeof onClose === 'function') {
      try { onClose(); } catch (err) { console.error(err); }
    }
  };
  overlay._closeCleanup = close;
  if (dismissible) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  }
  return { overlay, close };
}

function openSheet({ title, sub = '', body = '', onMount, dismissible = true, onClose }) {
  const inner = `<div class="sheet" onclick="event.stopPropagation()">
    <div class="sheet-handle"></div>
    <div class="between" style="align-items:flex-start">
      <div><h2>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}</div>
      <button class="icon-btn" data-close aria-label="Close">${icon('close')}</button>
    </div>
    <div class="sheet-body">${body}</div>
  </div>`;
  const { overlay, close } = buildOverlay(inner, { dismissible, onClose });
  overlay.querySelector('.sheet')?.addEventListener('click', (e) => e.stopPropagation());
  if (onMount) onMount(overlay, close);
  return { overlay, close };
}

function openModal({ title = '', sub = '', body = '', onMount, dismissible = true, onClose }) {
  const inner = `<div class="modal" onclick="event.stopPropagation()">
    <div class="between" style="align-items:flex-start;text-align:left">
      <div>${title ? `<h2>${title}</h2>` : ''}${sub ? `<p>${sub}</p>` : ''}</div>
      ${dismissible ? `<button class="icon-btn" data-close aria-label="Close">${icon('close')}</button>` : ''}
    </div>
    <div class="modal-body">${body}</div>
  </div>`;
  const { overlay, close } = buildOverlay(inner, { center: true, dismissible, onClose });
  overlay.querySelector('.modal')?.addEventListener('click', (e) => e.stopPropagation());
  if (onMount) onMount(overlay, close);
  return { overlay, close };
}

function confirmModal(title, body, confirmLabel = 'Confirm', { danger = false, cancelLabel = 'Not now' } = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    const { close } = openModal({
      title,
      body: `<p>${body}</p><div class="actions" style="display:flex;gap:8px;margin-top:16px">
        <button class="btn btn-ghost" data-no>${cancelLabel}</button>
        <button class="btn ${danger ? 'btn-primary' : 'btn-gold'}" data-yes>${confirmLabel}</button></div>`,
      onMount: (root) => {
        root.querySelector('[data-no]').onclick = () => { finish(false); close(); };
        root.querySelector('[data-yes]').onclick = () => { finish(true); close(); };
      },
      onClose: () => finish(false),
    });
  });
}

function burstAt(x, y, chars = ['💛'], count = 6) {
  if (document.body.classList.contains('reduce-motion')) return;
  const app = document.getElementById('app');
  const rect = app.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = typeof chars === 'string' ? chars : pick(chars);
    p.style.left = `${x - rect.left + rand(-8, 8)}px`;
    p.style.top = `${y - rect.top + rand(-6, 6)}px`;
    p.style.setProperty('--dx', `${rand(-50, 50)}px`);
    p.style.setProperty('--dy', `${rand(-70, -30)}px`);
    p.style.setProperty('--rot', `${rand(-40, 40)}deg`);
    p.style.fontSize = `${rand(12, 22)}px`;
    p.style.animationDelay = `${i * 0.035}s`;
    app.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
}

function burstOn(el, chars = ['💛'], count = 6) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  burstAt(r.left + r.width / 2, r.top + r.height / 2, chars, count);
}

function coinFly(el, amount = 1) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const app = document.getElementById('app');
  const ar = app.getBoundingClientRect();
  const node = document.createElement('span');
  node.className = 'coin-fly';
  node.textContent = `+${amount} 🪙`;
  node.style.left = `${r.left - ar.left + r.width / 2 - 16}px`;
  node.style.top = `${r.top - ar.top - 4}px`;
  node.style.fontSize = '12px';
  node.style.fontWeight = '900';
  node.style.color = '#ffe9ac';
  app.appendChild(node);
  setTimeout(() => node.remove(), 900);
}

function pct(n) { return Math.round(clamp(n, 0, 100)); }

/* Task labels carry their base goal in the text; period goals scale, so re-render the number. */
function taskLabel(t) {
  if (!t) return '';
  return String(t.label).replace(/\d+/, t.goal);
}

function needRow(key, label, value) {
  return `<div class="need">
    <div class="need-label"><span>${label}</span><b>${pct(value)}</b></div>
    <div class="bar ${key}"><i style="width:${pct(value)}%"></i></div>
  </div>`;
}

function needBlock(key, value) {
  return `<div class="dstat">
    <span class="lbl">${key}</span>
    <div class="bar ${key}"><i style="width:${pct(value)}%"></i></div>
    <b>${pct(value)}</b>
  </div>`;
}

function setThemeVars(theme) {
  const t = THEMES[theme.ui] || THEMES.prism;
  const root = document.documentElement.style;
  root.setProperty('--accent', t.accent);
  root.setProperty('--accent-2', t.accent2);
  root.setProperty('--bg', t.bg);
  root.setProperty('--bg-2', t.bg2);
  root.setProperty('--text', t.text);
  root.setProperty('--muted', t.muted);
  root.setProperty('--panel', `color-mix(in srgb, ${t.bg2} 78%, transparent)`);
  document.body.classList.toggle('reduce-motion', theme.motion === false);
  document.body.dataset.haptics = theme.haptics === false ? 'off' : 'on';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bg);
}

function spriteTag(sprite) {
  if (!sprite) return '';
  if (sprite.stage === 'egg') return `<span class="chip chip-egg">Egg</span>`;
  const el = ELEMENTS[sprite.element] || ELEMENTS.bloom;
  const label = sprite.hybrid || el.name;
  return `<span class="chip" style="color:${lighten(el.primary, 0.28)};border-color:${el.primary}55;background:${el.primary}1f">
    <span class="dot" style="background:${el.primary}"></span>${label}</span>`;
}

function moodChip(sprite) {
  if (!sprite) return '';
  if (sprite.stage === 'egg') return `<span class="mood-pill">Egg</span>`;
  const m = moodOf(sprite);
  return `<span class="mood-pill">${m.icon} ${m.label}</span>`;
}

function stageLabel(sprite) {
  if (!sprite) return '';
  return { egg: 'Egg', baby: 'Baby', juvenile: 'Juvenile', sprite: 'Teen', youngadult: 'Young Adult', midadult: 'Mid-Adult', highadult: 'High Adult', elder: 'Elderly', ancient: 'Ancient', sensei: 'Sensei' }[sprite.stage] || 'Baby';
}
