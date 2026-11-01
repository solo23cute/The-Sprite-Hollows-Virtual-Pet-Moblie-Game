/* Biome habitats wave: eight more built-in environments, each with its own palette and species list. */

const EXTRA_BIOME_DEFS = {
  memecore: {
    name: 'Meme Core', habitat: 'Internet', emoji: '😂', bonus: 0.5,
    blurb: 'A glowing server-room playground where jokes become creatures and every snack is a bit.',
    tint: { b1: '#7c4dff', b2: '#1a1030', b3: '#7affd8' },
    species: ['volt', 'wrixel', 'geno', 'charlotte', 'k1ttyw1ns', 'pika'],
  },
  sakura: {
    name: 'Sakura Vale', habitat: 'Blossom', emoji: '🌸', bonus: 0.46,
    blurb: 'Pink petals, paper lanterns, and a warm wind that carries the whole valley along.',
    tint: { b1: '#ff9ec7', b2: '#4a2038', b3: '#ffe6f4' },
    species: ['bloom', 'bunny', 'butterfly', 'deer', 'unicorn', 'charm', 'cupid', 'cherry', 'moth'],
  },
  mycelium: {
    name: 'Mushroom Hollow', habitat: 'Fungal', emoji: '🍄', bonus: 0.46,
    blurb: 'Soft caps, glowing spores, and a floor that springs back under every paw.',
    tint: { b1: '#a9713f', b2: '#2a1a10', b3: '#ffe0b8' },
    species: ['mushroom', 'frog', 'bug', 'ants', 'slime', 'creeper', 'muddy', 'badger', 'hare'],
  },
  sunken: {
    name: 'Sunken Temple', habitat: 'Abyss', emoji: '🏛️', bonus: 0.48,
    blurb: 'Flooded stone halls where old carvings glow and fish keep the archives.',
    tint: { b1: '#2a8f9e', b2: '#0a2a33', b3: '#a8f0ff' },
    species: ['tide', 'water', 'fishy', 'fish', 'shark', 'starfish', 'whitewhale', 'dolphin', 'crab', 'nicorobin'],
  },
  cybergrid: {
    name: 'Cyber Grid', habitat: 'Digital', emoji: '💻', bonus: 0.48,
    blurb: 'Neon walkways, humming servers, and a sky made of falling code.',
    tint: { b1: '#41e0d0', b2: '#0f1a2a', b3: '#8be9ff' },
    species: ['volt', 'pika', 'blaster', 'megaman', 'killswitch', 'geno', 'wrixel', 'six', 'seven', 'zeropoint'],
  },
  skyisles: {
    name: 'Sky Isles', habitat: 'Sky', emoji: '☁️', bonus: 0.47,
    blurb: 'Floating islands joined by rope bridges and a permanent, gentle tailwind.',
    tint: { b1: '#8bc6ff', b2: '#274a6b', b3: '#eaf6ff' },
    species: ['air', 'gale', 'cloud', 'radiant', 'angel', 'unicorn', 'falcon', 'owl', 'lucky', 'dream'],
  },
  lanternbay: {
    name: 'Lantern Bay', habitat: 'Lantern', emoji: '🏮', bonus: 0.46,
    blurb: 'A quiet harbor of paper lights, slow boats, and reflections that keep moving.',
    tint: { b1: '#ffb347', b2: '#2a1a10', b3: '#ffe6a3' },
    species: ['pond', 'duck', 'fishy', 'frog', 'firefly', 'moth', 'sally', 'otter', 'starfish'],
  },
  starlit: {
    name: 'Starfall Basin', habitat: 'Meteor', emoji: '🌠', bonus: 0.5,
    blurb: 'A crater garden of warm meteor glass where wishes land and take root.',
    tint: { b1: '#7a5cff', b2: '#120a2a', b3: '#c9a6ff' },
    species: ['lucky', 'onewish', 'radiant', 'dream', 'dreameater', 'zeropoint', 'crown', 'klombo'],
  },
};

Object.entries(EXTRA_BIOME_DEFS).forEach(([key, def]) => {
  if (SCENES[key]) return;
  SCENES[key] = {
    name: def.name,
    habitat: def.habitat,
    emoji: def.emoji,
    bonus: def.bonus,
    blurb: def.blurb,
    unlocked: true,
    biome: true,
    extraBiome: true,
    tint: def.tint,
    species: (def.species || []).filter((k) => ELEMENTS[k]),
  };
  SCENE_KEYS.push(key);
});

const EXTRA_BIOME_KEYS = Object.keys(EXTRA_BIOME_DEFS);
const EXTRA_BIOME_SCENE_KEYS = EXTRA_BIOME_KEYS.slice();

function isExtraBiomeScene(sceneKey) {
  return EXTRA_BIOME_SCENE_KEYS.includes(sceneKey);
}
