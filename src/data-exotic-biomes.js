/* Special biomes for the Hollow exotics: every signature hollow exotic gets a
   whole environment of its own, keyed to the species and used as its home. */

const EXOTIC_BIOME_DEFS = {
  yeallingzebra81: {
    key: 'exotic-backstage',
    name: 'Backstage Bloom', habitat: 'Backstage', emoji: '🎧', bonus: 0.55,
    blurb: 'A neon-green stage behind the stage, where the monitors glow and the setlist never ends.',
    tint: { b1: '#6b4fa8', b2: '#2a1748', b3: '#4be0b0' },
  },
  supernora: {
    key: 'exotic-supernova',
    name: 'Supernova Stage', habitat: 'Starfall', emoji: '🌟', bonus: 0.55,
    blurb: 'A floating gala on the edge of a comet, with a red carpet made of starlight.',
    tint: { b1: '#4b3f9e', b2: '#22154f', b3: '#ffcf5c' },
  },
  wildtrickyjokerwolf: {
    key: 'exotic-jester',
    name: 'Jester’s Alley', habitat: 'Trickster', emoji: '🃏', bonus: 0.55,
    blurb: 'A crooked carnival lane of card tents, mirror mazes, and a permanent wink of green light.',
    tint: { b1: '#4b2a78', b2: '#160d26', b3: '#67f07a' },
  },
  litladybear: {
    key: 'exotic-litlair',
    name: 'LIT Lady Lair', habitat: 'Roaring', emoji: '🔥', bonus: 0.55,
    blurb: 'A velvet-rope lounge with tiger stripes on the walls and a stage light that never cools.',
    tint: { b1: '#b51f1f', b2: '#08060a', b3: '#ffd1b3' },
  },
  riftchampion: {
    key: 'exotic-rift',
    name: 'Rift Arena', habitat: 'Victory', emoji: '👑', bonus: 0.58,
    blurb: 'A storm-ringed arena where sixteen seasons of battle royale history hang in the air.',
    tint: { b1: '#41e0d0', b2: '#0f3a4a', b3: '#ff4fd8' },
  },
  grandslam: {
    key: 'exotic-grandslam',
    name: 'Grand Slam Coliseum', habitat: 'Undisputed', emoji: '🏆', bonus: 0.58,
    blurb: 'A gold-lit coliseum with every title belt on the wall and a ring that never goes dark.',
    tint: { b1: '#d9a441', b2: '#2a1808', b3: '#b51f1f' },
  },
};

const EXOTIC_BIOME_KEYS = [];

Object.entries(EXOTIC_BIOME_DEFS).forEach(([speciesKey, def]) => {
  if (!ELEMENTS[speciesKey] || SCENES[def.key]) return;
  SCENES[def.key] = {
    name: def.name,
    habitat: def.habitat,
    emoji: def.emoji,
    bonus: def.bonus,
    blurb: def.blurb,
    unlocked: true,
    exoticBiome: true,
    guardian: speciesKey,
    tint: def.tint,
    species: [speciesKey],
  };
  SCENE_KEYS.push(def.key);
  EXOTIC_BIOME_KEYS.push(def.key);
});

const EXOTIC_BIOME_BY_SPECIES = {};
EXOTIC_BIOME_KEYS.forEach((sceneKey) => {
  const species = SCENES[sceneKey]?.species?.[0];
  if (species) EXOTIC_BIOME_BY_SPECIES[species] = sceneKey;
});

function exoticBiomeFor(speciesKey) {
  return EXOTIC_BIOME_BY_SPECIES[speciesKey] || null;
}

function isExoticBiomeScene(sceneKey) {
  return EXOTIC_BIOME_KEYS.includes(sceneKey);
}

function exoticBiomeLabel(speciesKey) {
  const scene = SCENES[exoticBiomeFor(speciesKey)];
  return scene ? `${scene.emoji} ${scene.name}` : '';
}
