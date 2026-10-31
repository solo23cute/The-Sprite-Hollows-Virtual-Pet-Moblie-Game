/* Fortnite Legacy: headliners from every past season, Chapter 1 through Chapter 5.
   Kept separate from the current Chapter 6/7 pass wave so saves, eggs, and
   existing Fortnite species stay unchanged. */

const FORTNITE_LEGACY_GROUPS = {
  c1: {
    label: 'Chapter 1', icon: '🪂', price: 165,
    homes: ['grove', 'neon', 'savanna'], likes: 'Cinnamon Churro', partner: 'bloom',
    suffix: 'Rift',
    gene: ['Rift Raider', '🪂', 'Gifts arrive 25% sooner and games pay +3 coins.', { giftSpeed: 1.25, gameCoins: 3 }],
    trait: 'Seasoned — has dropped onto every island and still checks the map twice.',
    blurb: 'A past-season legend with a parachute, a pickaxe, and a story for every storm circle.',
    greetings: [
      'The bus is leaving. I already called shotgun.',
      'New island, old tricks. Let’s drop in.',
      'I survived the first storm. This one looks cute.',
    ],
    note: 'The original island years, from Renegade Raider and Black Knight to Peely, Rox, and the Season X remixes.',
  },
  c2: {
    label: 'Chapter 2', icon: '🕶️', price: 175,
    homes: ['neon', 'night', 'grove'], likes: 'Honey Tea', partner: 'dusk',
    suffix: 'Case',
    gene: ['Agent Instinct', '🕶️', 'Night games pay +4 coins and gain +12% XP.', { nightCoins: 4, xp: 1.12 }],
    trait: 'Classified — has a file on every henchman and a snack tucked in the folder.',
    blurb: 'A sharp-dressed agent from the second chapter, carrying a briefcase and a very polished escape plan.',
    greetings: [
      'You’re not on the list. I like that. Come in.',
      'The briefcase is snacks. Do not ask follow-up questions.',
      'I’ve been undercover for three seasons. Mostly in the pantry.',
    ],
    note: 'The spy years: Journey and Rippley, Skye and Brutus, Jules and Kit, Lara Croft, Carnage, and more.',
  },
  c3: {
    label: 'Chapter 3', icon: '🌪️', price: 180,
    homes: ['crystal', 'aurora', 'neon'], likes: 'Star Fruit', partner: 'crystal',
    suffix: 'Storm',
    gene: ['Reality Storm', '🌪️', 'Games pay +4 coins and gifts arrive 20% sooner.', { gameCoins: 4, giftSpeed: 1.2 }],
    trait: 'Reality-bent — treats a changing island like a minor weather report.',
    blurb: 'A chapter-three hero shaped by flipped islands, chrome storms, and one very dramatic cape.',
    greetings: [
      'Careful, the island changed again. Or maybe I did.',
      'I have been through three realities and two snack shortages.',
      'The storm is not the problem. The storm is the commute.',
    ],
    note: 'The chapter of flipped islands, chrome, and heroes: Erisa, Gunnar, Kiara K.O., Darth Vader, Meow Skulls, and more.',
  },
  c4: {
    label: 'Chapter 4', icon: '🧭', price: 190,
    homes: ['grove', 'ember', 'aurora'], likes: 'Golden Curry', partner: 'radiant',
    suffix: 'Path',
    gene: ['Wild Path', '🧭', 'Gain 15% more XP and all needs fade 8% slower.', { xp: 1.15, decay: 0.92 }],
    trait: 'Trailblazing — finds the scenic route and a hidden chest on the way.',
    blurb: 'A chapter-four wanderer with a compass, a wild outfit, and a talent for finding the unmarked path.',
    greetings: [
      'The path is not on the map. That’s what makes it good.',
      'I brought a compass and absolutely no plan.',
      'Every detour is a main quest if you commit.',
    ],
    note: 'The wild chapter: Geralt, Doom Slayer, Renzo, Optimus Prime, Ahsoka, Anakin, and the OG remix pass.',
  },
  c5: {
    label: 'Chapter 5', icon: '🏛️', price: 200,
    homes: ['dream', 'ember', 'crystal'], likes: 'Honeycomb Cake', partner: 'dream',
    suffix: 'Myth',
    gene: ['Mythic Rule', '🏛️', 'Night games pay +5 coins and gain +15% XP.', { nightCoins: 5, xp: 1.15 }],
    trait: 'Legendary — walks like a myth and orders dessert like a regular.',
    blurb: 'A chapter-five myth with a crown-sized ego, a cinematic entrance, and a surprisingly soft heart.',
    greetings: [
      'You may tell the others I have arrived.',
      'A myth is just a story that learned to do a pose.',
      'I have defeated gods. I have not defeated the dessert menu.',
    ],
    note: 'The mythic chapter: Peter Griffin and Snake, Zeus and Hades, Magneto and Toph, Gwenpool, Peelverine, and more.',
  },
};

const FORTNITE_LEGACY_CHAPTER_ORDER = ['c1', 'c2', 'c3', 'c4', 'c5'];

const FORTNITE_LEGACY_PALETTES = [
  ['#c9a46b', '#fff0d0', '#5c3a1a', '#55d6ff'],
  ['#6b5bd6', '#ece6ff', '#241a5c', '#ffd166'],
  ['#d94f5c', '#ffe0e3', '#5c1a22', '#8be9ff'],
  ['#4f89c9', '#e6f3ff', '#1c3b63', '#ffcf5c'],
  ['#d9a441', '#fff3c4', '#5c3a0a', '#2f2a33'],
  ['#6b9e3a', '#e7ffcc', '#2f4a14', '#ff8fc8'],
  ['#a33a6b', '#ffd9e8', '#3a1024', '#ffd166'],
  ['#3ecf8e', '#e0fff2', '#145a3a', '#ff6b7a'],
  ['#e08a4f', '#ffe6cc', '#6b3414', '#8be9ff'],
  ['#5cc8ff', '#e6f9ff', '#123a5c', '#ffd166'],
  ['#8b5cf6', '#efe5ff', '#241044', '#41e0d0'],
  ['#5d6b66', '#cfd8d2', '#1f2b28', '#ff6b4a'],
  ['#b23a5c', '#ffd9e3', '#4a0f22', '#ffd166'],
  ['#2f9e5a', '#e8ffe8', '#144a24', '#ffcf5c'],
  ['#7ee8ff', '#eaffff', '#174a6b', '#ff8fc8'],
];

/* [chapter, key, name, season, art, optional extra homes] */
const FORTNITE_LEGACY_DEFS = [
  ['c1', 'fn_renegade', 'Renegade Raider', 'Chapter 1 · Season 1', 'raider'],
  ['c1', 'fn_aerial', 'Aerial Assault Trooper', 'Chapter 1 · Season 1', 'raider'],
  ['c1', 'fn_blackknight', 'Black Knight', 'Chapter 1 · Season 2', 'knight'],
  ['c1', 'fn_sparkle', 'Sparkle Specialist', 'Chapter 1 · Season 2', 'neon'],
  ['c1', 'fn_eliteagent', 'Elite Agent', 'Chapter 1 · Season 3', 'agent'],
  ['c1', 'fn_rustlord', 'Rust Lord', 'Chapter 1 · Season 3', 'raider'],
  ['c1', 'fn_carbide', 'Carbide', 'Chapter 1 · Season 4', 'hero'],
  ['c1', 'fn_omega', 'Omega', 'Chapter 1 · Season 4', 'armor'],
  ['c1', 'fn_drift', 'Drift', 'Chapter 1 · Season 5', 'drift'],
  ['c1', 'fn_ragnarok', 'Ragnarok', 'Chapter 1 · Season 5', 'myth'],
  ['c1', 'fn_calamity', 'Calamity', 'Chapter 1 · Season 6', 'witch'],
  ['c1', 'fn_dire', 'Dire', 'Chapter 1 · Season 6', 'wolf'],
  ['c1', 'fn_iceking', 'Ice King', 'Chapter 1 · Season 7', 'king'],
  ['c1', 'fn_lynx', 'Lynx', 'Chapter 1 · Season 7', 'agent'],
  ['c1', 'fn_classicpeely', 'Peely', 'Chapter 1 · Season 8', 'banana'],
  ['c1', 'fn_luxe', 'Luxe', 'Chapter 1 · Season 8', 'star'],
  ['c1', 'fn_rox', 'Rox', 'Chapter 1 · Season 9', 'neon'],
  ['c1', 'fn_vendetta', 'Vendetta', 'Chapter 1 · Season 9', 'armor'],
  ['c1', 'fn_catalyst', 'Catalyst', 'Chapter 1 · Season X', 'rift'],
  ['c1', 'fn_eternalvoyager', 'Eternal Voyager', 'Chapter 1 · Season X', 'cosmic'],

  ['c2', 'fn_journey', 'Journey', 'Chapter 2 · Season 1', 'agent'],
  ['c2', 'fn_rippley', 'Rippley', 'Chapter 2 · Season 1', 'slurp'],
  ['c2', 'fn_skye', 'Skye', 'Chapter 2 · Season 2', 'agent', ['aurora']],
  ['c2', 'fn_brutus', 'Brutus', 'Chapter 2 · Season 2', 'power', ['ember']],
  ['c2', 'fn_jules', 'Jules', 'Chapter 2 · Season 3', 'mechanic'],
  ['c2', 'fn_kit', 'Kit', 'Chapter 2 · Season 3', 'wolf'],
  ['c2', 'fn_shehulk', 'She-Hulk', 'Chapter 2 · Season 4', 'power', ['ember']],
  ['c2', 'fn_mancake', 'Mancake', 'Chapter 2 · Season 5', 'mask', ['sugar']],
  ['c2', 'fn_lexa', 'Lexa', 'Chapter 2 · Season 5', 'raider'],
  ['c2', 'fn_laracroft', 'Lara Croft', 'Chapter 2 · Season 6', 'explorer', ['crystal']],
  ['c2', 'fn_raz', 'Raz', 'Chapter 2 · Season 6', 'rift'],
  ['c2', 'fn_rick', 'Rick Sanchez', 'Chapter 2 · Season 7', 'scientist'],
  ['c2', 'fn_toonafish', 'Toona Fish', 'Chapter 2 · Season 8', 'fish'],
  ['c2', 'fn_carnage', 'Carnage', 'Chapter 2 · Season 8', 'symbiote'],

  ['c3', 'fn_erisa', 'Erisa', 'Chapter 3 · Season 1', 'myth'],
  ['c3', 'fn_gunnar', 'Gunnar', 'Chapter 3 · Season 2', 'armor'],
  ['c3', 'fn_kiara', 'Kiara K.O.', 'Chapter 3 · Season 2', 'fighter'],
  ['c3', 'fn_darthvader', 'Darth Vader', 'Chapter 3 · Season 3', 'mask'],
  ['c3', 'fn_adira', 'Adira', 'Chapter 3 · Season 3', 'explorer'],
  ['c3', 'fn_meowskulls', 'Meow Skulls', 'Chapter 3 · Season 4', 'neon'],
  ['c3', 'fn_bytes', 'Bytes', 'Chapter 3 · Season 4', 'robot'],

  ['c4', 'fn_geralt', 'Geralt of Rivia', 'Chapter 4 · Season 1', 'fighter'],
  ['c4', 'fn_doomslayer', 'Doom Slayer', 'Chapter 4 · Season 1', 'armor'],
  ['c4', 'fn_renzo', 'Renzo the Destroyer', 'Chapter 4 · Season 2', 'raider'],
  ['c4', 'fn_thunder', 'Thunder', 'Chapter 4 · Season 2', 'power'],
  ['c4', 'fn_optimus', 'Optimus Prime', 'Chapter 4 · Season 3', 'robot'],
  ['c4', 'fn_era', 'Era', 'Chapter 4 · Season 3', 'myth'],
  ['c4', 'fn_ahsoka', 'Ahsoka Tano', 'Chapter 4 · Season 4', 'fighter'],
  ['c4', 'fn_anakin', 'Anakin Skywalker', 'Chapter 4 · Season 4', 'mask'],
  ['c4', 'fn_lilsplit', 'Lil Split', 'Chapter 4 · OG', 'banana'],

  ['c5', 'fn_petergriffin', 'Peter Griffin', 'Chapter 5 · Season 1', 'brawler'],
  ['c5', 'fn_snake', 'Snake', 'Chapter 5 · Season 1', 'agent'],
  ['c5', 'fn_zeus', 'Zeus', 'Chapter 5 · Season 2', 'myth'],
  ['c5', 'fn_hades', 'Hades', 'Chapter 5 · Season 2', 'king'],
  ['c5', 'fn_magneto', 'Magneto', 'Chapter 5 · Season 3', 'armor'],
  ['c5', 'fn_toph', 'Toph', 'Chapter 5 · Season 3', 'fighter'],
  ['c5', 'fn_gwenpool', 'Gwenpool', 'Chapter 5 · Season 4', 'hero'],
  ['c5', 'fn_peelverine', 'Peelverine', 'Chapter 5 · Season 4', 'banana'],
  ['c5', 'fn_icespice', 'Ice Spice', 'Chapter 5 · Remix', 'star'],
];

const FORTNITE_LEGACY_SPECIES = [];
const FORTNITE_LEGACY_BY_CHAPTER = {};
FORTNITE_LEGACY_CHAPTER_ORDER.forEach((chapter) => { FORTNITE_LEGACY_BY_CHAPTER[chapter] = []; });

FORTNITE_LEGACY_DEFS.forEach(([chapterKey, key, name, season, art, extraHomes], index) => {
  const group = FORTNITE_LEGACY_GROUPS[chapterKey];
  if (!group || ELEMENTS[key]) return;
  const palette = FORTNITE_LEGACY_PALETTES[index % FORTNITE_LEGACY_PALETTES.length];
  const [primary, light, deep, accent] = palette;
  const trait = `${group.trait} ${name} arrived with the ${season} crowd.`;
  const blurb = `${group.blurb} ${name} carries a ${season} badge and a very specific memory of the old map.`;
  ELEMENTS[key] = {
    name, primary, light, deep, accent, trait, blurb,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    parentTypes: ['Fortnite Legacy', `Fortnite ${group.label}`],
    fortniteLegacy: true,
    fortniteLegacyGroup: chapterKey,
    fortniteLegacyArt: art,
    fortniteSeason: season,
    catalogType: `Fortnite legacy · ${season}`,
  };
  GENE_POWERS[key] = {
    name: group.gene[0], icon: group.gene[1], desc: group.gene[2], effect: group.gene[3],
  };
  TITAN_NAMES[key] = `${name} Titan`;
  const basePrice = group.price + (index % 5) * 4;
  TYPE_EGG_BASE_PRICE[key] = basePrice;
  TYPE_EGG_PRICE[key] = discountedEggPrice(basePrice);
  HYBRID_NAMES[pairKey(key, group.partner)] = `${name.replace(/^The /, '')} ${group.suffix}`;
  NAME_START[key] = [...new Set([name.replace(/^The /, '').split(' ')[0], 'Rift', 'Island', 'Season'])];
  const homes = [...new Set([...(extraHomes || []), ...group.homes])];
  homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  FORTNITE_LEGACY_SPECIES.push(key);
  FORTNITE_LEGACY_BY_CHAPTER[chapterKey].push(key);
});

ELEMENT_KEYS.push(...FORTNITE_LEGACY_SPECIES);

let FORTNITE_LEGACY_TOTAL = FORTNITE_LEGACY_SPECIES.length;
let FORTNITE_TOTAL = FORTNITE_SPECIES.length + FORTNITE_LEGACY_TOTAL;
