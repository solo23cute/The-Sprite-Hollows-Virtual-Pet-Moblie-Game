/* Closed captions for the hearing impaired.
   Describes meaningful sound effects and mirrors spoken lines in a live region. */
const Captions = {
  bar: null,
  hideTimer: 0,

  enabled() {
    return typeof state === 'undefined' || !state.theme || state.theme.captions !== false;
  },

  mount() {
    this.bar = document.querySelector('[data-cc-bar]');
    if (this.bar && !this.enabled()) this.bar.hidden = true;
  },

  say(text, opts = {}) {
    if (!text || !this.enabled()) return;
    const bar = this.bar || document.querySelector('[data-cc-bar]');
    if (!bar) return;
    this.bar = bar;
    const speech = opts.kind === 'speech';
    bar.innerHTML = `<span class="cc-tag">${speech ? '🗣️ CC' : '🔊 CC'}</span><span class="cc-text">${esc(text)}</span>`;
    bar.hidden = false;
    clearTimeout(this.hideTimer);
    const delay = opts.sticky ? 5200 : Math.min(4200, 1700 + String(text).length * 45);
    this.hideTimer = setTimeout(() => {
      bar.hidden = true;
    }, delay);
  },

  sound(label) {
    this.say(`[${label}]`, { kind: 'sound' });
  },

  speech(text) {
    this.say(text, { kind: 'speech' });
  },

  refresh() {
    if (!this.enabled()) {
      const bar = this.bar || document.querySelector('[data-cc-bar]');
      if (bar) bar.hidden = true;
    }
  },
};
