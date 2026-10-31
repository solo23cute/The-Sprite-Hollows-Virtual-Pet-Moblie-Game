/* Tiny synthesized sound effects — no audio files needed. */
const Sfx = {
  ctx: null,
  enabled() {
    return typeof state === 'undefined' || !state.theme || state.theme.sound !== false;
  },
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return;
    }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
    } catch { /* no audio */ }
  },
  tone(freq = 440, dur = 0.12, type = 'sine', vol = 0.05, delay = 0, glide = 0) {
    if (!this.enabled() || !this.ctx) return;
    try {
      const t0 = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + glide), t0 + dur);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch { /* ignore */ }
  },
  click() { this.tone(520, 0.06, 'triangle', 0.035); },
  pop() { this.tone(660, 0.09, 'sine', 0.05, 0, 220); },
  coin() { this.tone(880, 0.07, 'triangle', 0.04); this.tone(1320, 0.1, 'triangle', 0.03, 0.06); if (typeof Captions !== 'undefined') Captions.sound('coins chime'); },
  level() {
    [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.16, 'triangle', 0.045, i * 0.09));
    if (typeof Captions !== 'undefined') Captions.sound('level-up fanfare');
  },
  purr() {
    this.tone(340, 0.14, 'sine', 0.035, 0, 90);
    this.tone(300, 0.2, 'sine', 0.03, 0.1, 60);
    if (typeof Captions !== 'undefined') Captions.sound('contented purr');
  },
  eat() { [420, 360, 400].forEach((f, i) => this.tone(f, 0.08, 'square', 0.02, i * 0.11)); if (typeof Captions !== 'undefined') Captions.sound('happy munching'); },
  bath() { [720, 980, 840].forEach((f, i) => this.tone(f, 0.1, 'sine', 0.025, i * 0.07)); if (typeof Captions !== 'undefined') Captions.sound('bubbles and splashing'); },
  sleep() { this.tone(330, 0.4, 'sine', 0.025, 0, -120); if (typeof Captions !== 'undefined') Captions.sound('soft sleepy hum'); },
  hatch() {
    [392, 523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.22, 'triangle', 0.04, i * 0.11));
    if (typeof Captions !== 'undefined') Captions.sound('egg cracking and hatching fanfare');
  },
  error() { this.tone(190, 0.15, 'sawtooth', 0.025); if (typeof Captions !== 'undefined') Captions.sound('gentle error buzz'); },
  win() { [523, 659, 784, 1046, 1318].forEach((f, i) => this.tone(f, 0.24, 'sine', 0.045, i * 0.11)); if (typeof Captions !== 'undefined') Captions.sound('victory fanfare'); },
  tick() { this.tone(1200, 0.03, 'square', 0.015); },
};
