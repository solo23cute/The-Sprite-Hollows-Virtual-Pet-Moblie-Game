/* Base roster: the ordinary, un-prefixed versions of the named sprites.
   Existing base species are reused by exact name; the missing Fortune base
   forms and the X-Ray base form are added here. */

const BASE_ROSTER_NAMES = [
  "Halfpeel'd", 'Re-Pete', "Barry O'Fish", 'Chester', 'Exmarks', 'Wayfinder',
  'Kelper', 'Sweet Dreams', "Lil' Squibbly", "Lil' Flacko", 'Plundarrgh',
  'Transponder Snail', 'Jonesy', 'Adventure', 'Bush', 'Sonic', 'Tails', 'Shadow',
  '8-Bit', 'Jackrabbit', 'Crown', 'Killswitch', 'Klombo', 'Mega Man',
  'Overshield', 'Pond', 'X-Ray', 'Onigiri', 'Storm Scout', 'Blinky',
  'Dumpster Dive', 'Birthday', 'Crash Bandicoot', 'Morgana', 'Spooky Dash',
  'The Deer', 'Vampire', 'Honey', 'One Wish Willow', 'John Wick', 'Batman',
  'Water', 'Earth', 'Fire', 'Duck', 'Ghost', 'Dream', 'Demon', 'Punk', 'King',
  'Vini Jr.', 'Burnt Peanut', 'Zero Point', 'Fishy', 'Striker', 'Aura', 'Boss',
  'Grim', 'Air', 'Seven', 'Ironmouse', 'Pollo', 'Llama', 'Peeky Peely',
];

const BASE_ROSTER_KEYS = [];
const BASE_SPECIES = [
  { key: 'halfpeeld', name: "Halfpeel'd", base: 'peely', price: 100, art: 'peel' },
  { key: 'repete', name: 'Re-Pete', base: 'normal', price: 100, art: 'repeat' },
  { key: 'barryofish', name: "Barry O'Fish", base: 'fishy', price: 110, art: 'fish' },
  { key: 'chester', name: 'Chester', base: 'lootllama', price: 120, art: 'chest' },
  { key: 'exmarks', name: 'Exmarks', base: 'seven', price: 105, art: 'x' },
  { key: 'wayfinder', name: 'Wayfinder', base: 'adventure', price: 115, art: 'compass' },
  { key: 'kelper', name: 'Kelper', base: 'squibbly', price: 110, art: 'kelp' },
  { key: 'sweetdreams', name: 'Sweet Dreams', base: 'dream', price: 125, art: 'sleep' },
  { key: 'lilsquibbly', name: "Lil' Squibbly", base: 'squibbly', price: 120, art: 'sprout' },
  { key: 'lilflacko', name: "Lil' Flacko", base: 'blaster', price: 115, art: 'spark' },
  { key: 'plundarrgh', name: 'Plundarrgh', base: 'captainx', price: 130, art: 'hook' },
  { key: 'transpondersnail', name: 'Transponder Snail', base: 'squibbly', price: 135, art: 'snail' },
  { key: 'xray', name: 'X-Ray', base: 'ghost', price: 125, art: 'xray' },
];

const BASE_NAME_ALIASES = {
  '8-Bit': 'blaster', Jackrabbit: 'jazz', Bush: 'bushranger', Honey: 'honey',
  Llama: 'lootllama', 'Peeky Peely': 'peely', 'Mega Man': 'megaman',
  'John Wick': 'wick', 'Vini Jr.': 'vini', 'Burnt Peanut': 'burntpb',
  Grim: 'grim',
};

const BASE_LOOKUP = new Map();
ELEMENT_KEYS.forEach((key) => {
  if (!BASE_LOOKUP.has(ELEMENTS[key]?.name)) BASE_LOOKUP.set(ELEMENTS[key]?.name, key);
});

function registerBaseSpecies(def) {
  if (ELEMENTS[def.key]) return;
  const baseEl = ELEMENTS[def.base] || ELEMENTS.bloom;
  const baseGene = GENE_POWERS[def.base] || { name: 'Type Power', desc: 'A steady little bonus.', effect: { xp: 1.05 } };
  const baseHomes = Object.keys(SCENES).filter((scene) => SCENES[scene].species?.includes(def.base)).slice(0, 2);
  const style = def.key === 'xray' ? 'xray' : def.key === 'transpondersnail' ? 'snail' : 'fortune';
  const display = def.name;
  const isBase = style === 'xray' ? 'A clear-bodied ghost with a bright skeleton and a calm, knowing stare.' : style === 'snail' ? 'A shell-bound messenger with two bright antennae and a letter tucked under its shell.' : 'The original, unshined form of a Fortune favorite.';

  ELEMENTS[def.key] = {
    name: display,
    primary: baseEl.primary,
    light: baseEl.light,
    deep: baseEl.deep,
    accent: baseEl.accent,
    trait: style === 'xray' ? 'See-through — reads the room down to the bones.' : style === 'snail' ? 'Signal-bound — always carries the next message.' : 'Unadorned — the original before the shine.',
    blurb: `${isBase} ${baseEl.name} keeps its original colors and habits.`,
    greeting: style === 'xray' ? 'X-Ray can see right through you — in a friendly way.' : style === 'snail' ? 'Transponder Snail has a message and is taking the scenic route.' : `${display} is here, plain and proud.`,
    likes: baseEl.likes || 'Star Candy',
    baseRoster: true,
    baseOf: def.base,
    baseStyle: style,
    baseArt: def.art,
    catalogType: 'Base',
    ...(style === 'fortune' || style === 'snail' ? { fortuneArt: def.art } : {}),
  };

  GENE_POWERS[def.key] = {
    name: def.key === 'xray' ? 'X-Ray Vision' : def.key === 'transpondersnail' ? 'Shell Signal' : `${display} ${baseGene.name}`,
    icon: def.key === 'xray' ? '🦴' : def.key === 'transpondersnail' ? '📡' : '✨',
    desc: `${baseGene.desc || 'A steady little bonus.'} The base form keeps its original power.`,
    effect: { ...(baseGene.effect || {}) },
  };
  TITAN_NAMES[def.key] = `${display} Titan`;
  TYPE_EGG_BASE_PRICE[def.key] = def.price;
  TYPE_EGG_PRICE[def.key] = discountedEggPrice(def.price);
  NAME_START[def.key] = [display.split(' ')[0], 'Base', 'Echo', 'Lucky', 'Plain'];
  HYBRID_NAMES[`${def.key}+pumpkin`] = `${display} Harvest`;

  [def.base, 'grove', 'dream', 'tide', 'sugar'].concat(baseHomes).forEach((scene) => {
    if (Array.isArray(SCENES[scene]?.species) && !SCENES[scene].species.includes(def.key)) SCENES[scene].species.push(def.key);
  });

  ELEMENT_KEYS.push(def.key);
  if (typeof TYPE_EGG_SPECIES !== 'undefined' && !TYPE_EGG_SPECIES.includes(def.key)) TYPE_EGG_SPECIES.push(def.key);
  BASE_LOOKUP.set(display, def.key);
}

BASE_SPECIES.forEach(registerBaseSpecies);

BASE_ROSTER_NAMES.forEach((name) => {
  const key = BASE_LOOKUP.get(name) || BASE_NAME_ALIASES[name];
  if (key && ELEMENTS[key] && !BASE_ROSTER_KEYS.includes(key)) BASE_ROSTER_KEYS.push(key);
});

if (typeof registerCollectionWave === 'function') {
  registerCollectionWave({
    key: 'base-roster',
    label: 'Base roster',
    icon: '◻️',
    group: 'Events',
    note: 'The ordinary forms behind the named favorites, Fortune characters, and X-Ray.',
    count: () => BASE_ROSTER_KEYS.length,
  });
}
