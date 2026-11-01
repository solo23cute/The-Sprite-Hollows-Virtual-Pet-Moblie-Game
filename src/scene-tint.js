/* Habitat tints: every scene tile and world habitat gets a visible palette,
   including habitats that have no hand-written CSS gradient. */

const SCENE_TINT_OVERRIDES = {
  grove: { b1: '#6d9e6c', b2: '#3b2f6b', b3: '#d7ffcf' },
  night: { b1: '#30336b', b2: '#090b20', b3: '#d9ccff' },
  tide: { b1: '#5ad0e0', b2: '#1c4e63', b3: '#e6faff' },
  neon: { b1: '#7a3fb0', b2: '#140a2e', b3: '#8be9ff' },
  aurora: { b1: '#2a6777', b2: '#07132c', b3: '#bfffe9' },
  crystal: { b1: '#7c6bb5', b2: '#231a3e', b3: '#e0d4ff' },
  ember: { b1: '#a63b2c', b2: '#17070a', b3: '#ffd9b0' },
  sugar: { b1: '#e58bb6', b2: '#35112e', b3: '#ffe6f4' },
  dream: { b1: '#8b7bd2', b2: '#0b0a2c', b3: '#e9e2ff' },
  reef: { b1: '#3fc4c4', b2: '#0d3140', b3: '#c9fff4' },
  savanna: { b1: '#d9a441', b2: '#4a2f0c', b3: '#fff0c2' },
  'world-serengeti': { b1: '#d9a441', b2: '#4a2f0c', b3: '#fff0c2' },
  'world-amazon': { b1: '#4f9e5a', b2: '#123a1e', b3: '#dcffd6' },
  'world-greatbarrier': { b1: '#4fc9e0', b2: '#123a4a', b3: '#e6fbff' },
  'world-himalaya': { b1: '#9fc6e0', b2: '#243a52', b3: '#f2fbff' },
  'world-arctic': { b1: '#bfe6ff', b2: '#2b5f7a', b3: '#f7fdff' },
  'world-sahara': { b1: '#e2bf65', b2: '#5c4413', b3: '#fff6d6' },
  'world-alps': { b1: '#a8d982', b2: '#3a5a2a', b3: '#f4ffe0' },
  'world-galapagos': { b1: '#8f97a8', b2: '#2f3442', b3: '#e3e8f2' },
  'world-madagascar': { b1: '#b98a5e', b2: '#3a2412', b3: '#ffe8cc' },
  'world-borneo': { b1: '#3f8f6b', b2: '#0f3324', b3: '#d6ffe9' },
  'world-okavango': { b1: '#6fb5a8', b2: '#1f4a44', b3: '#e0fffb' },
  'world-patagonia': { b1: '#a8b58f', b2: '#3a4230', b3: '#f0ffe0' },
  'world-iceland': { b1: '#6b7c99', b2: '#1a2230', b3: '#dbe9ff' },
  'world-tasmania': { b1: '#5f9464', b2: '#1d3322', b3: '#e0ffe4' },
  'world-bavaria': { b1: '#7a9e5a', b2: '#26331a', b3: '#f0ffd9' },
  'world-nile': { b1: '#c9a14a', b2: '#3a2a0c', b3: '#fff0c2' },
  'world-kerala': { b1: '#4fa88f', b2: '#123a30', b3: '#dcfff4' },
  'world-hokkaido': { b1: '#8fb5c9', b2: '#22343f', b3: '#effbff' },
};

const SCENE_TINT_FALLBACKS = [
  { b1: '#6d5bd0', b2: '#2a2050', b3: '#c9bcff' },
  { b1: '#4fa8c9', b2: '#173a4a', b3: '#d6f6ff' },
  { b1: '#c98a4a', b2: '#3a2410', b3: '#ffe4bf' },
  { b1: '#8fd16b', b2: '#2f5a1e', b3: '#e7ffd9' },
  { b1: '#d98bb5', b2: '#3a1528', b3: '#ffe0ee' },
];

function sceneTint(key) {
  const scene = SCENES[key] || {};
  if (scene.custom) return { b1: scene.sky, b2: scene.ground, b3: scene.accent };
  if (scene.tint) return scene.tint;
  if (SCENE_TINT_OVERRIDES[key]) return SCENE_TINT_OVERRIDES[key];
  if (scene.biome && scene.type && typeof PDX_TYPES !== 'undefined' && PDX_TYPES[scene.type]) {
    const palette = PDX_TYPES[scene.type];
    return { b1: palette.primary, b2: palette.deep, b3: palette.light };
  }
  const text = String(key || 'hollow');
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) % 99991;
  return SCENE_TINT_FALLBACKS[hash % SCENE_TINT_FALLBACKS.length];
}

/* Scenes whose stage colour comes from the tint table instead of a CSS gradient. */
function sceneUsesTint(key) {
  const scene = SCENES[key] || {};
  return !!scene.custom || !!scene.worldHabitat || !!scene.extraBiome;
}
