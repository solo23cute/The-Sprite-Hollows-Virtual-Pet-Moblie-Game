/* Variant tiers: named Gummy, Hacker, Cheat, Hunter, Gold, Galaxy, Gem, Holofoil,
   Cube, Quack, and Fortune sprites. Each is a real type-egg species so it
   appears in the Nest, tier filters, collection, and codex. */

const VARIANT_FAVORITES = [
  ['jonesy', 'Jonesy'], ['adventure', 'Adventure'], ['bushranger', 'Bush'],
  ['sonic', 'Sonic'], ['tails', 'Tails'], ['shadow', 'Shadow'],
  ['blaster', '8-Bit'], ['jazz', 'Jackrabbit'], ['crown', 'Crown'],
  ['killswitch', 'Killswitch'], ['klombo', 'Klombo'], ['overshield', 'Overshield'],
  ['pond', 'Pond'], ['xray', 'X-Ray'], ['onigiri', 'Onigiri'],
  ['stormscout', 'Storm Scout'], ['blinky', 'Blinky'], ['dumpster', 'Dumpster Dive'],
  ['birthday', 'Birthday'], ['crash', 'Crash Bandicoot'], ['morgana', 'Morgana'],
  ['spookydash', 'Spooky Dash'], ['deer', 'The Deer'], ['vampire', 'Vampire'],
  ['honeypot', 'Honey'], ['onewish', 'One Wish Willow'],
];

const VARIANT_GENERIC = [
  ['batman', 'Batman'], ['water', 'Water'], ['earth', 'Earth'], ['fire', 'Fire'],
  ['duck', 'Duck'], ['ghost', 'Ghost'], ['dream', 'Dream'], ['demon', 'Demon'],
  ['punk', 'Punk'], ['king', 'King'], ['zeropoint', 'Zero Point'], ['fishy', 'Fishy'],
  ['striker', 'Striker'], ['aura', 'Aura'], ['boss', 'Boss'], ['grim', 'Grim'],
  ['air', 'Air'], ['seven', 'Seven'], ['lootllama', 'Llama'], ['peely', 'Peeky Peely'],
];

const VARIANT_FAMILIES = {
  gummy: {
    label: 'Gummy', icon: '🍬', finish: 'gummy', price: 165,
    trait: 'Squishy — every step leaves a tiny fruit-scented wobble.',
    blurb: 'A translucent candy-shell variant that catches the light and jiggles when happy.',
  },
  cheat: {
    label: 'Cheat', icon: '🕹️', price: 250, masterTier: true, style: 'cheat',
    trait: 'Unlisted — knows a shortcut that should not exist.',
    blurb: 'A glitch-touched variant with a console-green halo and a suspicious amount of confidence.',
  },
  hunter: {
    label: 'Hunter', icon: '🎯', price: 150, style: 'hunter',
    trait: 'Locked-on — finds the one trail everyone else missed.',
    blurb: 'A bounty-hunter variant in a weathered cloak, with a scope and a very patient stare.',
  },
  hacker: {
    label: 'Hacker', icon: '💻', price: 160, style: 'hacker',
    trait: 'Wired — sees the code beneath the Hollow and edits one line for fun.',
    blurb: 'A neon-wired variant with a glowing visor, circuit traces, and a trail of quiet green code.',
  },
  gold: {
    label: 'Gold', icon: '🥇', finish: 'gold', price: 210,
    trait: 'Polished — leaves a little shine on everything it touches.',
    blurb: 'A gold-shell variant with a mirror finish and an unreasonable amount of sparkle.',
  },
  galaxy: {
    label: 'Galaxy', icon: '🌌', finish: 'galaxy', price: 210,
    trait: 'Starry — carries a pocket of night sky wherever it goes.',
    blurb: 'A galaxy-shell variant with tiny constellations caught under the surface.',
  },
  gem: {
    label: 'Gem', icon: '💎', finish: 'gem', price: 125,
    trait: 'Faceted — thinks in angles and refracts every mood.',
    blurb: 'A crystal-shell variant with a thousand tiny edges and a bright inner glow.',
  },
  holofoil: {
    label: 'Holofoil', icon: '🌈', finish: 'holofoil', price: 165,
    trait: 'Iridescent — changes color when you tilt your head.',
    blurb: 'A rainbow-foil variant that catches the light in slow, shifting bands.',
  },
  cube: {
    label: 'Cube', icon: '🧊', finish: 'cube', price: 120,
    trait: 'Blocky — hums with quiet geometry.',
    blurb: 'A cube-shell variant with clean edges, soft corners, and a low geometric hum.',
  },
  quack: {
    label: 'Quack', icon: '🦆', finish: 'quack', price: 100,
    trait: 'Waddly — has a bill and is not afraid to use it.',
    blurb: 'A duck-billed variant with an unmistakable waddle and a pocket full of crumbs.',
  },
  fortune: {
    label: 'Fortune', icon: '🍀', price: 200, style: 'fortune',
    trait: 'Lucky — always finds one more coin under the sofa.',
    blurb: 'A fortune-themed variant with a lucky coin, a bright star, and a knack for good timing.',
  },
  secret: {
    label: 'Secret', icon: '🔐', price: 260, style: 'secret',
    trait: 'Hidden — keeps one more door than the map admits.',
    blurb: 'A secret-shell variant wrapped in a quiet violet veil, with a tiny golden lock and a key that never quite fits.',
  },
};

const VARIANT_GROUPS = {
  gummy: VARIANT_GENERIC,
  cheat: VARIANT_FAVORITES,
  hunter: VARIANT_FAVORITES,
  hacker: VARIANT_FAVORITES,
  gold: [...VARIANT_FAVORITES, ...VARIANT_GENERIC],
  galaxy: VARIANT_GENERIC,
  gem: [
    ['water', 'Water'], ['earth', 'Earth'], ['duck', 'Duck'], ['demon', 'Demon'],
    ['zeropoint', 'Zero Point'], ['aura', 'Aura'], ['grim', 'Grim'], ['lootllama', 'Llama'],
  ],
  holofoil: [
    ['batman', 'Batman'], ['water', 'Water'], ['fire', 'Fire'], ['ghost', 'Ghost'],
    ['king', 'King'], ['zeropoint', 'Zero Point'], ['striker', 'Striker'],
    ['grim', 'Grim'], ['air', 'Air'], ['seven', 'Seven'], ['peely', 'Peeky Peely'],
  ],
  cube: [
    ['batman', 'Batman'], ['earth', 'Earth'], ['fire', 'Fire'], ['dream', 'Dream'],
    ['punk', 'Punk'], ['zeropoint', 'Zero Point'], ['fishy', 'Fishy'], ['boss', 'Boss'],
    ['grim', 'Grim'],
  ],
  quack: [
    ['jonesy', 'Jonesy'], ['adventure', 'Adventure'], ['bushranger', 'Bush'],
    ['klombo', 'Klombo'], ['spookydash', 'Spooky Dash'], ['water', 'Water'],
    ['earth', 'Earth'], ['fire', 'Fire'], ['zeropoint', 'Zero Point'],
  ],
};

const VARIANT_FORTUNE = [
  { key: 'halfpeeld', label: "Halfpeel'd", base: 'peely', art: 'peel' },
  { key: 'repete', label: 'Re-Pete', base: 'normal', art: 'repeat' },
  { key: 'barryofish', label: "Barry O'Fish", base: 'fishy', art: 'fish' },
  { key: 'chester', label: 'Chester', base: 'lootllama', art: 'chest' },
  { key: 'exmarks', label: 'Exmarks', base: 'seven', art: 'x' },
  { key: 'wayfinder', label: 'Wayfinder', base: 'adventure', art: 'compass' },
  { key: 'kelper', label: 'Kelper', base: 'squibbly', art: 'kelp' },
  { key: 'lilsquibbly', label: "Lil' Squibbly", base: 'squibbly', art: 'sprout' },
  { key: 'lilflacko', label: "Lil' Flacko", base: 'blaster', art: 'spark' },
  { key: 'plundarrgh', label: 'Plundarrgh', base: 'captainx', art: 'hook' },
  { key: 'sweetdreams', label: 'Sweet Dreams', base: 'dream', art: 'sleep' },
  { key: 'transpondersnail', label: 'Transponder Snail', base: 'transpondersnail', art: 'snail' },
];

const VARIANT_CHEATMASTER_KEYS = new Set(['xray', 'deer', 'vampire', 'honeypot', 'onewish']);
const VARIANT_KEYS = [];

function variantDisplayName(familyKey, label, baseKey) {
  if (familyKey === 'cheat') {
    return `${VARIANT_CHEATMASTER_KEYS.has(baseKey) ? 'Cheatmaster' : 'Cheat Master'} ${label}`;
  }
  if (familyKey === 'hunter') return `Bounty Hunter ${label}`;
  if (familyKey === 'fortune') return `Fortune ${label}`;
  return `${VARIANT_FAMILIES[familyKey].label} ${label}`;
}

function registerVariantSpecies(familyKey, baseKey, label, extra = {}) {
  const family = VARIANT_FAMILIES[familyKey];
  const key = familyKey === 'fortune'
    ? `fortune${extra.key || baseKey}`
    : `${familyKey}${baseKey}`;
  if (VARIANT_KEYS.includes(key)) return;
  const baseEl = ELEMENTS[baseKey] || ELEMENTS.bloom;
  const baseGene = GENE_POWERS[baseKey] || { name: 'Type Power', desc: 'A steady little bonus.', effect: { xp: 1.05 } };
  const baseHomes = Object.keys(SCENES).filter((scene) => SCENES[scene].species?.includes(baseKey)).slice(0, 2);
  const display = variantDisplayName(familyKey, label, baseKey);

  ELEMENTS[key] = {
    name: display,
    primary: baseEl.primary,
    light: baseEl.light,
    deep: baseEl.deep,
    accent: baseEl.accent,
    trait: `${family.trait} ${baseEl.name} variant.`,
    blurb: `${family.blurb} ${baseEl.name} wears it like a second nature.`,
    greeting: `${family.icon} ${display} reporting in. The ordinary version is jealous.`,
    likes: baseEl.likes || 'Star Candy',
    variantOf: baseKey,
    variantFamily: familyKey,
    variantStyle: family.style || 'finish',
    forcedVariant: family.finish || null,
    masterTier: !!family.masterTier,
    catalogType: familyKey === 'secret' ? 'Secret variant' : `${family.label} variant`,
    secretVariant: familyKey === 'secret',
    ...(extra.art ? { fortuneArt: extra.art } : {}),
  };

  GENE_POWERS[key] = {
    name: `${family.label} ${baseGene.name}`,
    icon: family.icon,
    desc: `${baseGene.desc || 'A steady little bonus.'} The ${family.label.toLowerCase()} variant keeps its signature bonus.`,
    effect: { ...(baseGene.effect || {}) },
  };
  TITAN_NAMES[key] = `${family.label} ${baseEl.name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = family.price;
  TYPE_EGG_PRICE[key] = discountedEggPrice(family.price);
  NAME_START[key] = [family.label, baseEl.name.split(' ')[0], 'Variant', 'Shine', 'Lucky', 'Prime'];
  HYBRID_NAMES[`${key}+pumpkin`] = `${family.label} Harvest`;

  [baseKey, 'night', 'sugar'].concat(baseHomes).forEach((scene) => {
    if (Array.isArray(SCENES[scene]?.species) && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });

  ELEMENT_KEYS.push(key);
  if (typeof TYPE_EGG_SPECIES !== 'undefined' && !TYPE_EGG_SPECIES.includes(key)) TYPE_EGG_SPECIES.push(key);
  VARIANT_KEYS.push(key);
}

Object.entries(VARIANT_GROUPS).forEach(([familyKey, entries]) => {
  entries.forEach(([baseKey, label]) => registerVariantSpecies(familyKey, baseKey, label));
});

VARIANT_FORTUNE.forEach((entry) => registerVariantSpecies('fortune', entry.base, entry.label, { key: entry.key, art: entry.art }));

/* Every normal sprite gets one Secret form. Vault-only species are skipped so
   their Secret forms cannot undercut the Vault; existing variant tiers are
   included so the Secret roster covers every sprite already in the game. */
const SECRET_VARIANT_BASE_KEYS = Array.from(new Set((typeof ELEMENT_KEYS !== 'undefined' ? ELEMENT_KEYS.slice() : [])
  .filter((key) => ELEMENTS[key] && !(typeof isSecretSpecies === 'function' && isSecretSpecies(key)))));
SECRET_VARIANT_BASE_KEYS.forEach((baseKey) => registerVariantSpecies('secret', baseKey, ELEMENTS[baseKey].name));

function variantFamilyKeys(familyKey) {
  return VARIANT_KEYS.filter((key) => ELEMENTS[key]?.variantFamily === familyKey);
}

if (typeof registerCollectionWave === 'function') {
  registerCollectionWave({
    key: 'variants',
    label: 'Variant tiers',
    icon: '✨',
    group: 'Events',
    note: 'Gummy, Hacker, Cheat, Hunter, Gold, Galaxy, Gem, Holofoil, Cube, Quack, Fortune, and Secret variants with their own type eggs.',
    count: () => VARIANT_KEYS.length,
  });
  registerCollectionWave({
    key: 'secret-variants',
    label: 'Secret variants',
    icon: '🔐',
    group: 'Secrets',
    note: 'A hidden Secret form for every normal sprite and every existing variant tier.',
    count: () => SECRET_VARIANT_BASE_KEYS.length,
  });
}
