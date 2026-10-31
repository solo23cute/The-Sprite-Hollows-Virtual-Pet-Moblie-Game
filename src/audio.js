/* Tiny synthesized sound effects — no audio files needed. */

/* Every sprite gets a deterministic voice from its species, breed, hybrid and finish.
   Animal families are synthesized from short oscillator phrases, so the whole
   collection works offline without thousands of audio files. */
const CRY_LIBRARY = {
  meow: { type: 'triangle', base: 1.12, notes: [[0, .14, 1, .055, 1.35], [.12, .22, .9, .045, .7]] },
  yip: { type: 'sine', base: 1.25, notes: [[0, .08, 1.5, .045, 1.9], [.1, .09, 1.6, .04, 2]] },
  bark: { type: 'square', base: .85, notes: [[0, .09, .8, .05, .2], [.12, .08, .85, .04, .15]] },
  howl: { type: 'sine', base: .8, notes: [[0, .22, .7, .04, 1.3], [.18, .32, 1, .045, 1.35], [.46, .3, .95, .035, .8]] },
  growl: { type: 'sawtooth', base: .65, notes: [[0, .32, .55, .05, .7], [.05, .3, .58, .04, .68]] },
  roar: { type: 'sawtooth', base: .55, notes: [[0, .38, .45, .06, .8], [.04, .35, .5, .04, .7]] },
  chirp: { type: 'sine', base: 1.9, notes: [[0, .07, 1.9, .04, 2.6], [.09, .06, 2.2, .035, 2.8], [.17, .08, 1.8, .03, 2.2]] },
  hoot: { type: 'sine', base: .7, notes: [[0, .16, .6, .04, .7], [.2, .22, .55, .035, .6]] },
  croak: { type: 'square', base: .55, notes: [[0, .12, .45, .045, .4], [.16, .1, .5, .04, .35], [.3, .14, .42, .03, .3]] },
  moo: { type: 'triangle', base: .62, notes: [[0, .35, .5, .05, .4], [.12, .25, .55, .035, .5]] },
  oink: { type: 'sawtooth', base: .8, notes: [[0, .09, .7, .05, .55], [.11, .09, .75, .045, .6]] },
  squeak: { type: 'sine', base: 1.7, notes: [[0, .1, 2, .04, 2.5], [.11, .08, 2.4, .035, 2.8]] },
  hiss: { type: 'sawtooth', base: 1.5, notes: [[0, .2, 1.4, .035, .9], [.06, .18, 1.6, .03, 1.1]] },
  buzz: { type: 'square', base: 1.4, notes: [[0, .05, 1.6, .03, 1.8], [.06, .05, 1.55, .028, 1.75], [.12, .06, 1.7, .025, 1.9]] },
  clank: { type: 'triangle', base: 1.6, notes: [[0, .08, 2.2, .035, 2.4], [.07, .15, 1.7, .025, 1.4], [.15, .08, 2.6, .02, 2.2]] },
  chime: { type: 'triangle', base: 1.5, notes: [[0, .18, 1.4, .04, 1.8], [.12, .2, 1.8, .035, 2.2], [.24, .26, 2.1, .03, 2.4]] },
  wail: { type: 'sine', base: .8, notes: [[0, .26, .75, .04, 1.2], [.2, .32, 1.1, .038, 1.3], [.46, .28, .9, .03, .6]] },
  babble: { type: 'sine', base: 1.2, notes: [[0, .07, 1.2, .035, 1.4], [.09, .06, 1.5, .03, 1.7], [.16, .08, 1.1, .03, 1.3]] },
  splash: { type: 'sine', base: 1.1, notes: [[0, .1, 1.2, .04, 1.6], [.08, .14, 1.7, .035, 1.2], [.2, .1, 1.4, .03, 1.9]] },
  rumble: { type: 'sawtooth', base: .48, notes: [[0, .28, .5, .05, .65], [.08, .3, .45, .04, .55]] },
  spark: { type: 'triangle', base: 2, notes: [[0, .06, 2, .035, 2.4], [.07, .07, 2.4, .03, 2.7], [.14, .07, 2.8, .028, 3.2]] },
  neigh: { type: 'sawtooth', base: .9, notes: [[0, .2, .9, .045, 1.1], [.16, .18, .95, .04, .75], [.3, .14, .85, .035, 1.2]] },
  trumpet: { type: 'square', base: .85, notes: [[0, .12, .9, .05, 1.2], [.11, .22, .8, .045, 1]] },
};
const CRY_LABELS = {
  meow: 'meows', yip: 'yips', bark: 'barks', howl: 'howls', growl: 'growls', roar: 'roars',
  chirp: 'chirps', hoot: 'hoots', croak: 'croaks', moo: 'moos', oink: 'oinks', squeak: 'squeaks',
  hiss: 'hisses', buzz: 'buzzes', clank: 'clanks', chime: 'chimes', wail: 'wails', babble: 'babbles',
  splash: 'splashes', rumble: 'rumbles', spark: 'sparks', neigh: 'neighs', trumpet: 'trumpets',
};
const CRY_ANIMAL_RULES = [
  [/dragonfly/, 'buzz'],
  [/dragon|wyvern|drake|godzilla|kaiju|rex|raptor|saur|hydra|leviathan|behemoth/, 'roar'],
  [/wolf|werewolf|lycan|fenrir/, 'howl'],
  [/fox|yip|fenn/, 'yip'],
  [/lion|tiger|panther|leopard|jaguar|cheetah|sabre|saber/, 'roar'],
  [/bear|grizzly|ursa|panda/, 'growl'],
  [/dog|puppy|hound|terrier|pug|husky|balto|scooby/, 'bark'],
  [/cat|kitty|kitten|feline|meow|persian|siamese/, 'meow'],
  [/cow|bull|cattle|moo|buffalo|bison|yak/, 'moo'],
  [/pig|hog|boar|oink|piglet/, 'oink'],
  [/frog|toad|ribbit|croak|axolotl/, 'croak'],
  [/owl|hoot/, 'hoot'],
  [/horse|pony|unicorn|pegasus|zebra|donkey|mule/, 'neigh'],
  [/elephant|mammoth|trumpet/, 'trumpet'],
  [/monkey|ape|chimp|gorilla|baboon/, 'babble'],
  [/mouse|hamster|rat|bunny|rabbit|squirrel|chipmunk|ferret|hedgehog/, 'squeak'],
  [/bird|sparrow|robin|finch|parrot|penguin|duck|chicken|rooster|phoenix|eagle|hawk|raven|crow|swallow|humming/, 'chirp'],
  [/bee|wasp|hornet|bug|spider|moth|butterfly|ant|beetle|cricket|mantis|scorpion|worm/, 'buzz'],
  [/snake|serpent|viper|python|cobra|boa|naga/, 'hiss'],
  [/fish|shark|whale|dolphin|otter|seal|mermaid|squid|octopus|crab|turtle|narwhal/, 'splash'],
  [/ghost|spirit|phantom|wraith|specter|soul|haunt|boo/, 'wail'],
  [/robot|mech|android|cyborg|steel|metal|clank|gear|bot|automaton/, 'clank'],
];
const CRY_TYPE_FAMILY = {
  normal: 'babble', fire: 'roar', water: 'splash', electric: 'spark', grass: 'chirp', ice: 'chime',
  fighting: 'growl', poison: 'hiss', ground: 'rumble', flying: 'chirp', psychic: 'chime', bug: 'buzz',
  rock: 'rumble', ghost: 'wail', dragon: 'roar', dark: 'growl', steel: 'clank', fairy: 'chime',
};
function cryHash(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function crySeed(sprite) {
  const raw = [sprite.element, sprite.breed, sprite.hybrid, sprite.palette, sprite.pattern, sprite.finish, sprite.special, sprite.mutation, sprite.size, sprite.form]
    .map((value) => value == null ? '' : String(value)).join('|');
  return cryHash(raw || 'sprite');
}
function cryFamily(sprite) {
  const text = `${sprite.element || ''} ${sprite.name || ''} ${sprite.hybrid || ''}`.toLowerCase();
  for (const [pattern, family] of CRY_ANIMAL_RULES) {
    if (pattern.test(text)) return family;
  }
  const element = String(sprite.element || '');
  const type = (typeof POKEDEX_META !== 'undefined' && POKEDEX_META[element]?.types?.[0]) || element;
  if (CRY_TYPE_FAMILY[type]) return CRY_TYPE_FAMILY[type];
  return ['babble', 'chirp', 'squeak'][crySeed(sprite) % 3];
}
function cryName(sprite) {
  const name = sprite && (sprite.name || (typeof displayName === 'function' ? displayName(sprite) : ''));
  return name || 'Sprite';
}
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
  cry(sprite, opts = {}) {
    if (!sprite || sprite.stage === 'egg' || !this.enabled()) return;
    const now = Date.now();
    if (!opts.force && now - (this._lastCry || 0) < 140) return;
    this.init();
    if (!this.ctx) return;
    const family = cryFamily(sprite);
    const voice = CRY_LIBRARY[family] || CRY_LIBRARY.babble;
    const seed = crySeed(sprite);
    const base = (140 + (seed % 180)) * voice.base;
    const volume = (opts.soft ? 0.62 : 1) * (Number.isFinite(opts.volume) ? opts.volume : 1);
    const start = Number.isFinite(opts.delay) ? opts.delay : 0;
    voice.notes.forEach(([at, dur, mult, vol, end]) => {
      const freq = base * mult;
      this.tone(freq, dur, voice.type, vol * volume, start + at, freq * (end - 1));
    });
    this._lastCry = now;
    if (typeof Captions !== 'undefined') Captions.sound(`${cryName(sprite)} ${CRY_LABELS[family] || 'babbles'}`);
  },
  spriteCry(sprite, opts = {}) { this.cry(sprite, opts); },
  spriteBabble(sprite, opts = {}) { this.cry(sprite, { ...opts, soft: true }); },
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
