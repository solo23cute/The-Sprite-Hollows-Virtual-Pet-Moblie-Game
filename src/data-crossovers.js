/* Crossover wave: Fall Guys, Among Us, pocket monsters, and brick builders. */

const CROSSOVER_KINDS = {
  fallbean: {
    name: 'Fall Bean', primary: '#ff7ab8', light: '#ffe1f0', deep: '#8a2458', accent: '#ffd166',
    trait: 'Wobbly — celebrates every finish line with a full-body flop.',
    blurb: 'A round little bean with a tinted visor, tiny arms, and absolutely no brakes.',
    greeting: 'I made it! I think. Everything is spinning.',
    likes: 'Star Pop',
  },
  crownbean: {
    name: 'Crown Bean', primary: '#ffd166', light: '#fff6d6', deep: '#8a5a00', accent: '#ff8fc8',
    trait: 'Victorious — wears the crown even during snack breaks.',
    blurb: 'A golden bean who has won exactly one crown and mentions it constantly.',
    greeting: 'Bow before the champion. Then pass the snacks.',
    likes: 'Cloud Feast',
  },
  hurdlebean: {
    name: 'Hurdle Bean', primary: '#7bd88f', light: '#e5ffe9', deep: '#2f7a46', accent: '#ff8a5c',
    trait: 'Springy — turns every obstacle into a personal challenge.',
    blurb: 'A sporty bean with a headband, quick feet, and a dramatic finish pose.',
    greeting: 'Race you to the snack table. Ready, set— already gone.',
    likes: 'Sun Nectar',
  },
  crewmate: {
    name: 'Crewmate', primary: '#ef4b5e', light: '#ffd9de', deep: '#7a1624', accent: '#8be9ff',
    trait: 'Helpful — finishes tasks early and reports every tiny victory.',
    blurb: 'A sturdy little crewmate with a clear visor, a backpack, and a clipboard of chores.',
    greeting: 'Tasks first, snacks second. Okay, snacks first.',
    likes: 'Moon Berry',
  },
  impostor: {
    name: 'Impostor', primary: '#7a2b4a', light: '#e0c3d1', deep: '#2a0c1a', accent: '#ff5e6c',
    trait: 'Suspicious — is definitely not standing near the vent for no reason.',
    blurb: 'A shifty crewmate with a sharp grin, a dark suit, and a very innocent whistle.',
    greeting: 'I was doing tasks. In the dark. Alone. Normally.',
    likes: 'Ember Steak',
  },
  ghostmate: {
    name: 'Ghostmate', primary: '#c7d2ff', light: '#f3f6ff', deep: '#4a578a', accent: '#8be9ff',
    trait: 'Floatly — phases through walls and apologizes on the way out.',
    blurb: 'A soft blue ghost with a visor, a wavy tail, and unfinished business with the snack cabinet.',
    greeting: 'I’m not haunting you. I’m visiting. There’s a difference.',
    likes: 'Warm Soup',
  },
  voltling: {
    name: 'Voltling', primary: '#ffd84d', light: '#fff4b8', deep: '#8a5a00', accent: '#ff9f1c',
    trait: 'Charged — static follows it like a tiny, sparkling entourage.',
    blurb: 'A pocket-sized storm with pointed ears, a lightning-bolt tail, and too much energy.',
    greeting: 'I learned a new trick! It’s mostly just zapping things.',
    likes: 'Star Fruit',
  },
  emberling: {
    name: 'Emberling', primary: '#ff9a5a', light: '#ffe0c2', deep: '#a63516', accent: '#ffd166',
    trait: 'Warm — a tiny flame tail that brightens when it sees you.',
    blurb: 'A little cinder lizard with a soft belly, bright eyes, and a tail that never quite goes out.',
    greeting: 'My tail says hello. It also says please bring snacks.',
    likes: 'Golden Curry',
  },
  bulblet: {
    name: 'Bulblet', primary: '#8fe07a', light: '#e5ffc9', deep: '#357a2e', accent: '#ffd166',
    trait: 'Sunny — grows a new leaf whenever someone compliments it.',
    blurb: 'A round garden pal with a leafy bulb, tiny roots, and a face made for basking.',
    greeting: 'I grew a leaf for you. It’s the good one.',
    likes: 'Honey Tea',
  },
  bubblet: {
    name: 'Bubblet', primary: '#56c8e8', light: '#d6f7ff', deep: '#15607d', accent: '#7cf0d0',
    trait: 'Buoyant — never sinks, even when it is pretending to be shy.',
    blurb: 'A little water turtle with a bubbly shell, soft flippers, and a talent for blowing perfect circles.',
    greeting: 'The bubble is for you. Don’t pop it. Okay, pop it.',
    likes: 'Tide Sushi',
  },
  brickling: {
    name: 'Brickling', primary: '#e05a4f', light: '#ffe1d6', deep: '#7a1f18', accent: '#ffd166',
    trait: 'Stackable — sees every problem as a pile waiting to be built into something.',
    blurb: 'A cheerful brick creature with studs on its head and a pocket full of spare pieces.',
    greeting: 'I fixed it! There are three pieces left over. That’s normal.',
    likes: 'Butter Potato',
  },
  minipal: {
    name: 'Minipal', primary: '#ffd84d', light: '#fff4b8', deep: '#8a5a00', accent: '#5a7bff',
    trait: 'Handy — carries a little wrench and a big plan.',
    blurb: 'A pocket builder with a blocky smile, a hard hat, and hands that click into place.',
    greeting: 'Need a hand? Mine come off. For building, mostly.',
    likes: 'Cinnamon Churro',
  },
  brickdragon: {
    name: 'Brick Dragon', primary: '#d94f5c', light: '#ffe0e3', deep: '#5c1a22', accent: '#8fe07a',
    trait: 'Snap-fit — its wings click together when it gets excited.',
    blurb: 'A dragon assembled from bright bricks, with a studded tail and a roar that sounds like a handful of plastic.',
    greeting: 'I am the hoard. Please do not step on me.',
    likes: 'Ember Steak',
  },
  spacebuilder: {
    name: 'Space Builder', primary: '#8a97ff', light: '#e6e9ff', deep: '#2f3a8a', accent: '#ffd166',
    trait: 'Modular — builds a new attachment for every adventure.',
    blurb: 'A brick astronaut with a clear helmet, a jetpack made of spare parts, and stars in its visor.',
    greeting: 'One small click for me. One giant build for spritedom.',
    likes: 'Aurora Bun',
  },
};
const CROSSOVER_SPECIES = Object.keys(CROSSOVER_KINDS);

const CROSSOVER_GENES = {
  fallbean: { name: 'Bean Bounce', icon: '🫘', desc: 'Games pay +2 coins and +15% XP.', effect: { gameCoins: 2, xp: 1.15 } },
  crownbean: { name: 'Crown Luck', icon: '👑', desc: 'Gifts arrive 25% sooner and +10% XP.', effect: { giftSpeed: 1.25, xp: 1.1 } },
  hurdlebean: { name: 'Hurdle Hop', icon: '🏃', desc: 'Energy fades 20% slower and games pay +2 coins.', effect: { energyDecay: 0.8, gameCoins: 2 } },
  crewmate: { name: 'Task Buddy', icon: '📋', desc: 'Pets build +25% bond and +15% XP.', effect: { petBond: 1.25, xp: 1.15 } },
  impostor: { name: 'Vent Whisper', icon: '🔪', desc: 'Night games pay +5 coins and games pay +2 more.', effect: { nightCoins: 5, gameCoins: 2 } },
  ghostmate: { name: 'Soft Haunt', icon: '👻', desc: 'Night games pay +3 coins and needs fade 10% slower.', effect: { nightCoins: 3, decay: 0.9 } },
  voltling: { name: 'Static Pop', icon: '⚡', desc: 'Games pay +3 coins and energy fades 15% slower.', effect: { gameCoins: 3, energyDecay: 0.85 } },
  emberling: { name: 'Ember Tail', icon: '🔥', desc: 'Games pay +3 coins and +10% XP.', effect: { gameCoins: 3, xp: 1.1 } },
  bulblet: { name: 'Photosynth', icon: '🌱', desc: 'Hunger fades 20% slower and +15% XP.', effect: { hungerDecay: 0.8, xp: 1.15 } },
  bubblet: { name: 'Bubble Guard', icon: '🫧', desc: 'Cleanliness fades 20% slower and +10% XP.', effect: { cleanDecay: 0.8, xp: 1.1 } },
  brickling: { name: 'Stud Sense', icon: '🧱', desc: 'All needs fade 10% slower.', effect: { decay: 0.9 } },
  minipal: { name: 'Mini Build', icon: '🔧', desc: 'Gifts arrive 25% sooner and pets build +20% bond.', effect: { giftSpeed: 1.25, petBond: 1.2 } },
  brickdragon: { name: 'Snap-Fit Roar', icon: '🐉', desc: 'Games pay +4 coins and +10% XP.', effect: { gameCoins: 4, xp: 1.1 } },
  spacebuilder: { name: 'Zero-G Build', icon: '🚀', desc: 'Energy fades 25% slower and +15% XP.', effect: { energyDecay: 0.75, xp: 1.15 } },
};

const CROSSOVER_TITANS = {
  fallbean: 'Crownfall Titan',
  crownbean: 'Royal Bean Sovereign',
  hurdlebean: 'Hurdle Hurricane',
  crewmate: 'Skeld Sentinel',
  impostor: 'Impostor Overlord',
  ghostmate: 'Vent Phantom',
  voltling: 'Stormvolt Titan',
  emberling: 'Cinderling Prime',
  bulblet: 'Verdant Bulb Titan',
  bubblet: 'Tidal Shell Titan',
  brickling: 'Brickwork Colossus',
  minipal: 'Minifig Monarch',
  brickdragon: 'Brick Dragon Eternal',
  spacebuilder: 'Galaxy Builder Prime',
};

const CROSSOVER_PRICES = {
  fallbean: 55,
  crownbean: 95,
  hurdlebean: 75,
  crewmate: 70,
  impostor: 135,
  ghostmate: 115,
  voltling: 120,
  emberling: 110,
  bulblet: 100,
  bubblet: 105,
  brickling: 65,
  minipal: 85,
  brickdragon: 180,
  spacebuilder: 145,
};

const CROSSOVER_HYBRIDS = {
  'fallbean+gale': 'Bounce Breeze',
  'crownbean+radiant': 'Crownlight',
  'hurdlebean+volt': 'Hurdle Spark',
  'crewmate+tide': 'Crew Splash',
  'impostor+demon': 'Suspicious Flame',
  'ghostmate+dusk': 'Vent Shade',
  'voltling+ember': 'Storm Cinder',
  'emberling+gale': 'Cinder Wing',
  'bulblet+bloom': 'Garden Bulb',
  'bubblet+tide': 'Bubble Reef',
  'brickling+earth': 'Brickworks',
  'minipal+hero': 'Block Hero',
  'brickdragon+ember': 'Brick Flame',
  'spacebuilder+radiant': 'Brick Odyssey',
};

const CROSSOVER_HABITATS = {
  fallbean: ['grove', 'neon', 'sugar'],
  crownbean: ['sugar', 'neon', 'aurora'],
  hurdlebean: ['grove', 'neon', 'savanna'],
  crewmate: ['neon', 'tide', 'crystal'],
  impostor: ['night', 'ember', 'neon'],
  ghostmate: ['night', 'dream', 'crystal'],
  voltling: ['neon', 'aurora', 'savanna'],
  emberling: ['ember', 'crystal', 'grove'],
  bulblet: ['grove', 'dream', 'crystal'],
  bubblet: ['tide', 'grove', 'aurora'],
  brickling: ['grove', 'neon', 'crystal'],
  minipal: ['neon', 'grove', 'sugar'],
  brickdragon: ['ember', 'crystal', 'aurora'],
  spacebuilder: ['aurora', 'neon', 'crystal'],
};

Object.assign(ELEMENTS, CROSSOVER_KINDS);
Object.assign(GENE_POWERS, CROSSOVER_GENES);
Object.assign(TITAN_NAMES, CROSSOVER_TITANS);
Object.assign(TYPE_EGG_BASE_PRICE, CROSSOVER_PRICES);
Object.assign(HYBRID_NAMES, CROSSOVER_HYBRIDS);
Object.keys(CROSSOVER_PRICES).forEach((key) => {
  TYPE_EGG_PRICE[key] = discountedEggPrice(CROSSOVER_PRICES[key]);
});
ELEMENT_KEYS.push(...CROSSOVER_SPECIES);
Object.entries(CROSSOVER_HABITATS).forEach(([key, scenes]) => {
  scenes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});
