/* Spoken greetings, goodbyes, return updates, and needs reminders.
   Uses the Android text-to-speech bridge when packaged, speechSynthesis in the browser. */
const Voice = {
  native: null,
  lastLine: '',
  lastAt: 0,
  reminderAt: 0,
  lastReminderKey: '',
  startedAt: 0,
  hiddenAt: 0,
  away: null,
  history: [],

  init() {
    this.startedAt = Date.now();
    if (typeof window !== 'undefined' && window.Voice && typeof window.Voice.speak === 'function') {
      this.native = window.Voice;
      if (typeof this.native.setType === 'function') this.native.setType(this.type());
    }
  },

  type() {
    return typeof state !== 'undefined' && state.theme && state.theme.voiceType === 'male' ? 'male' : 'female';
  },

  enabled() {
    return typeof state === 'undefined' || !state.theme || state.theme.voice !== false;
  },

  supported() {
    return !!this.native || (typeof window !== 'undefined' && 'speechSynthesis' in window);
  },

  speak(text, opts = {}) {
    if (!text || (!this.enabled() && !opts.allowMuted)) return false;
    const now = Date.now();
    if (!opts.force && text === this.lastLine && now - this.lastAt < 4000) return false;
    this.lastLine = text;
    this.lastAt = now;
    this.history.push(text);
    if (this.history.length > 6) this.history.shift();
    if (typeof Captions !== 'undefined') Captions.speech(text);
    const type = opts.type === 'male' || opts.type === 'female' ? opts.type : this.type();
    try {
      if (this.native) {
        if (typeof this.native.setType === 'function') this.native.setType(type);
        this.native.speak(text);
        return true;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = (typeof I18N_LANGUAGES !== 'undefined' && I18N_LANGUAGES[uiLang()]?.tag) || 'en-US';
        utterance.rate = Number.isFinite(opts.rate) ? opts.rate : (type === 'male' ? 0.96 : 1.0);
        utterance.pitch = type === 'male' ? 0.8 : 1.12;
        utterance.volume = 0.95;
        window.speechSynthesis.speak(utterance);
        return true;
      }
    } catch (err) {
      console.warn('Voice could not speak.', err);
    }
    return false;
  },

  stop() {
    try {
      if (this.native && this.native.stop) this.native.stop();
      else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } catch { /* ignore */ }
  },

  actionFor(need) {
    return {
      hunger: 'A snack would help.',
      energy: 'A nap would help.',
      joy: 'A little play would help.',
      clean: 'A bubble bath would help.',
    }[need] || '';
  },

  lowestNeed(s) {
    if (!s || !s.needs) return null;
    return ['hunger', 'energy', 'joy', 'clean']
      .map((key) => ({ key, value: Math.round(s.needs[key]) }))
      .sort((a, b) => a.value - b.value)[0];
  },

  needsLine(s) {
    if (!s) return '';
    const low = this.lowestNeed(s);
    if (!low) return '';
    if (low.value >= 40) return 'All their needs are in good shape.';
    return `${displayName(s)} is ${low.value} out of 100 on ${low.key}. ${this.actionFor(low.key)}`;
  },

  welcome(force = false) {
    if (!state.started || !this.supported()) return;
    const s = activeSprite() || grownSprites()[0];
    if (!s) return;
    const line = `Welcome to Sprite Hollow. ${displayName(s)} is happy you are here. ${this.needsLine(s)}`;
    this.speak(line, { force });
  },

  goodbye() {
    if (!state.started) return;
    const s = activeSprite() || grownSprites()[0];
    if (!s) return;
    this.speak(`Goodbye for now. ${displayName(s)} will keep the Hollow warm.`);
  },

  markHidden() {
    this.hiddenAt = Date.now();
    const s = activeSprite();
    this.away = s ? { id: s.id, name: displayName(s), needs: { ...s.needs } } : null;
  },

  returnSummary() {
    if (!this.hiddenAt || !state.started) return;
    const awayFor = Date.now() - this.hiddenAt;
    this.hiddenAt = 0;
    if (awayFor < 90000) return;
    const s = activeSprite();
    if (!s) return;
    const before = this.away && this.away.id === s.id ? this.away.needs : null;
    const drops = before
      ? ['hunger', 'energy', 'joy', 'clean']
        .map((key) => ({ key, drop: Math.round(before[key] - s.needs[key]) }))
        .filter((d) => d.drop >= 8)
        .sort((a, b) => b.drop - a.drop)
      : [];
    let line;
    if (drops.length) {
      const worst = drops[0];
      line = `Welcome back. While you were away, ${displayName(s)}'s ${worst.key} dropped to ${Math.round(s.needs[worst.key])}. ${this.actionFor(worst.key)}`;
    } else {
      line = `Welcome back. ${displayName(s)} kept the Hollow warm. ${this.needsLine(s)}`;
    }
    this.speak(line, { force: true });
    const toastLine = drops.length
      ? `${displayName(s)} missed you — ${this.lowestNeed(s).key} is ${Math.round(this.lowestNeed(s).value)}/100.`
      : `${displayName(s)} kept the Hollow warm while you were away.`;
    if (typeof toast === 'function') toast(toastLine, '🌅');
  },

  remind() {
    if (!state.started || document.hidden || !this.enabled() || !this.supported()) return;
    if (typeof overlayStack !== 'undefined' && overlayStack.length) return;
    if (document.querySelector('.game-overlay')) return;
    const now = Date.now();
    if (now - this.startedAt < 120000) return;
    if (now - this.reminderAt < 150000) return;
    const s = activeSprite();
    if (!s || s.asleep) return;
    const low = this.lowestNeed(s);
    if (!low || low.value >= 28) return;
    const key = `${s.id}:${low.key}`;
    if (key === this.lastReminderKey) return;
    this.lastReminderKey = key;
    this.reminderAt = now;
    const line = `A little reminder: ${displayName(s)} is ${low.key === 'clean' ? 'grubby' : low.key === 'energy' ? 'sleepy' : low.key === 'joy' ? 'bored' : 'hungry'}. ${this.actionFor(low.key)}`;
    this.speak(line);
    if (typeof toast === 'function') toast(`${displayName(s)} could use some care.`, '💛');
  },
};
