/* Biome ambience: per-scene scenery extras, local weather, and a soft
   synthesized sound loop for the Hollow exotics and the GTA districts. */

const BIOME_SCENE_AMBIENCE = {
  'gta-libertycity': {
    weather: 'rain',
    sound: { type: 'sine', notes: [[0, .5, 220], [.6, .5, 174], [1.4, .8, 146]], gap: 7000, vol: .018 },
    label: 'Rain on the docks',
  },
  'gta-vicecity': {
    weather: 'sun',
    sound: { type: 'triangle', notes: [[0, .16, 523], [.18, .16, 659], [.36, .2, 784], [.62, .26, 988]], gap: 6200, vol: .02 },
    label: 'Palm-warm synth',
  },
  'gta-sanandreas': {
    weather: 'heat',
    sound: { type: 'sawtooth', notes: [[0, .5, 262], [.5, .5, 311], [1.1, .7, 233]], gap: 7600, vol: .014 },
    label: 'Dust and slide guitar',
  },
  'gta-losantos': {
    weather: 'breeze',
    sound: { type: 'sine', notes: [[0, .4, 392], [.5, .6, 330]], gap: 7000, vol: .017 },
    label: 'Heli over the hills',
  },
  'gta-london': {
    weather: 'fog',
    sound: { type: 'triangle', notes: [[0, .6, 196], [.7, .8, 165]], gap: 8200, vol: .016 },
    label: 'Wet cobbles and fog',
  },
  'gta-chinatown': {
    weather: 'clear',
    sound: { type: 'triangle', notes: [[0, .18, 587], [.2, .18, 659], [.42, .24, 880]], gap: 6400, vol: .018 },
    label: 'Lantern-market plucks',
  },
  'gta-anywhere': {
    weather: 'clear',
    sound: { type: 'square', notes: [[0, .14, 440], [.18, .14, 330], [.38, .2, 440]], gap: 5800, vol: .012 },
    label: 'Retro-future pulse',
  },
  'exotic-backstage': {
    weather: 'petals',
    sound: { type: 'square', notes: [[0, .12, 659], [.16, .12, 784], [.34, .18, 988], [.56, .14, 784]], gap: 5600, vol: .014 },
    label: 'Stage lights and monitors',
  },
  'exotic-supernova': {
    weather: 'clear',
    sound: { type: 'sine', notes: [[0, .3, 1046], [.34, .3, 1318], [.7, .5, 1568]], gap: 6600, vol: .014 },
    label: 'Comet shimmer',
  },
  'exotic-jester': {
    weather: 'leaves',
    sound: { type: 'triangle', notes: [[0, .12, 740], [.14, .12, 622], [.3, .12, 740], [.46, .2, 831]], gap: 5400, vol: .014 },
    label: 'Carnival wink',
  },
  'exotic-litlair': {
    weather: 'heat',
    sound: { type: 'sawtooth', notes: [[0, .5, 165], [.55, .5, 196], [1.15, .7, 147]], gap: 7200, vol: .012 },
    label: 'Velvet-rope rumble',
  },
  'exotic-rift': {
    weather: 'storm',
    sound: { type: 'square', notes: [[0, .18, 294], [.2, .18, 392], [.42, .3, 587]], gap: 6000, vol: .014 },
    label: 'Storm-ring charge',
  },
  'exotic-grandslam': {
    weather: 'clear',
    sound: { type: 'triangle', notes: [[0, .2, 523], [.22, .2, 659], [.46, .2, 784], [.72, .34, 1046]], gap: 6900, vol: .016 },
    label: 'Coliseum fanfare',
  },
};

function sceneAmbience(sceneKey) {
  return BIOME_SCENE_AMBIENCE[sceneKey] || null;
}

function sceneWeatherKey(sceneKey) {
  const amb = sceneAmbience(sceneKey);
  return amb && amb.weather ? amb.weather : null;
}

/* Scenery layers for the new districts and exotic stages. */
function buildBiomeExtras(sceneKey) {
  const span = (cls, style = '', text = '') => `<span class="${cls}" style="${style}">${text}</span>`;
  if (sceneKey === 'gta-libertycity') {
    return `${span('gta-skyline')}${span('gta-lamp', 'left:12%')}${span('gta-lamp', 'left:74%;height:46px')}
      ${Array.from({ length: 7 }, () => span('gta-rain-streak', `left:${rand(4, 96)}%;animation-delay:${rand(-1.4, 0)}s;animation-duration:${rand(.7, 1.3)}s`)).join('')}`;
  }
  if (sceneKey === 'gta-vicecity') {
    return `${span('gta-sunset')}${span('gta-palm', 'left:6%')}${span('gta-palm', 'right:7%;transform:scaleX(-1)')}
      ${span('gta-waveband')}${Array.from({ length: 4 }, () => span('gta-palm-frond', `left:${rand(10, 88)}%;animation-delay:${rand(0, 3)}s`)).join('')}`;
  }
  if (sceneKey === 'gta-sanandreas') {
    return `${span('gta-mesa')}${span('gta-cactus', 'left:14%')}${span('gta-cactus', 'right:18%;height:30px')}
      ${span('gta-train-track')}${Array.from({ length: 8 }, () => span('gta-dust', `left:${rand(4, 94)}%;animation-delay:${rand(-6, 0)}s`)).join('')}`;
  }
  if (sceneKey === 'gta-losantos') {
    return `${span('gta-cityscape')}${span('gta-heli')}${span('gta-billboard', 'right:9%')}${span('gta-hill-line')}`;
  }
  if (sceneKey === 'gta-london') {
    return `${span('gta-fog-band')}${span('gta-cab')}${span('gta-lamp', 'left:18%;height:52px')}${span('gta-umbrella', 'right:16%')}`;
  }
  if (sceneKey === 'gta-chinatown') {
    return `${span('gta-lantern', 'left:10%')}${span('gta-lantern', 'left:30%;animation-delay:.6s')}${span('gta-lantern', 'right:24%;animation-delay:1.2s')}
      ${span('gta-crate', 'left:8%')}${span('gta-crate', 'right:12%;width:30px;height:22px')}`;
  }
  if (sceneKey === 'gta-anywhere') {
    return `${span('gta-gridline')}${span('gta-taxi')}${span('gta-lamp', 'right:14%;height:58px')}${span('gta-skyline', 'opacity:.4')}`;
  }
  if (sceneKey === 'exotic-backstage') {
    return `${span('ex-beam', 'left:18%')}${span('ex-beam', 'left:66%;animation-delay:.8s')}${span('ex-speaker', 'left:8%')}${span('ex-speaker', 'right:9%')}
      ${Array.from({ length: 6 }, () => span('ex-note', `left:${rand(12, 88)}%;animation-delay:${rand(0, 4)}s`)).join('')}`;
  }
  if (sceneKey === 'exotic-supernova') {
    const stars = Array.from({ length: 14 }, () => span('ex-star', `left:${rand(4, 96)}%;top:${rand(6, 44)}%;animation-delay:${rand(0, 3)}s`)).join('');
    return `${stars}${span('ex-comet')}${span('ex-spotlight', 'left:50%')}`;
  }
  if (sceneKey === 'exotic-jester') {
    return `${span('ex-card', 'left:14%')}${span('ex-card', 'right:18%;animation-delay:1s')}${span('ex-mirror', 'right:8%')}
      ${span('ex-spotlight', 'left:38%;opacity:.4')}`;
  }
  if (sceneKey === 'exotic-litlair') {
    return `${span('ex-stripe')}${span('ex-spotlight', 'left:62%')}${span('ex-paw', 'left:12%')}${span('ex-paw', 'right:14%;transform:scaleX(-1)')}`;
  }
  if (sceneKey === 'exotic-rift') {
    return `${span('ex-storm-ring')}${span('ex-storm-ring', 'width:64%;height:40%;left:18%;top:12%;animation-delay:1.2s')}
      ${Array.from({ length: 5 }, () => span('ex-spark', `left:${rand(10, 90)}%;animation-delay:${rand(0, 2)}s`)).join('')}`;
  }
  if (sceneKey === 'exotic-grandslam') {
    return `${span('ex-spotlight', 'left:22%')}${span('ex-spotlight', 'left:78%;animation-delay:.9s')}${span('ex-belt', 'left:10%')}${span('ex-belt', 'right:12%')}${span('ex-ring')}`;
  }
  return '';
}

/* ---------------- biome sound loop ---------------- */
const BiomeAmbience = {
  key: null,
  timer: null,
  start(sceneKey) {
    const amb = sceneAmbience(sceneKey);
    if (!amb || typeof Sfx === 'undefined' || typeof Sfx.tone !== 'function') return this.stop();
    const soundOn = typeof state === 'undefined' || !state.theme || state.theme.sound !== false;
    if (!soundOn) return this.stop();
    if (this.key === sceneKey && this.timer) return;
    this.stop();
    this.key = sceneKey;
    Sfx.init();
    const play = () => {
      if (typeof state !== 'undefined' && state.theme && state.theme.sound === false) return this.stop();
      if (!Sfx.ctx) return;
      const motif = amb.sound;
      motif.notes.forEach(([at, dur, freq]) => Sfx.tone(freq, dur, motif.type, motif.vol || 0.016, at));
    };
    play();
    this.timer = setInterval(play, Math.max(4000, amb.sound.gap || 7000));
  },
  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.key = null;
  },
};

function startBiomeAmbience(sceneKey) {
  BiomeAmbience.start(sceneKey);
}

function stopBiomeAmbience() {
  BiomeAmbience.stop();
}

function refreshBiomeAmbience() {
  if (typeof App === 'undefined' || App.tab !== 'hollow') return stopBiomeAmbience();
  return startBiomeAmbience(state.theme.scene);
}
