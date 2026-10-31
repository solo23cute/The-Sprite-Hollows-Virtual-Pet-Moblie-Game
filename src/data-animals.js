/* Animal wave: wolves, tamers, and flying friends join the Hollow. */

const ANIMAL_SPECIES = {
  firefang: {
    name: 'Firefang Wolf', primary: '#ff8a4c', light: '#ffd9b0', deep: '#6f1d10', accent: '#ffd166',
    trait: 'Fierce — guards the Hollow with a warm growl.',
    blurb: 'A scorch-pelted wolf with a bark that sparks and a heart that melts.',
    greeting: 'I smelled snack on the wind. Point me at it.',
    likes: 'Ember Steak',
  },
  tamer: {
    name: 'Beast Tamer', primary: '#8fbf6b', light: '#f0ffd9', deep: '#3a5a2a', accent: '#ffd166',
    trait: 'Kind — every animal is a friend waiting to happen.',
    blurb: 'A patient wanderer with a whistle, a satchel of treats, and no fear of teeth.',
    greeting: 'Easy there. Everything with a heartbeat is a friend.',
    likes: 'Honey Drop',
  },
  falcon: {
    name: 'Sky Falcon', primary: '#7cc6f2', light: '#e6f7ff', deep: '#24506b', accent: '#ffd166',
    trait: 'Keen — spots a lost button from a mile up.',
    blurb: 'A sharp-winged hunter who would rather race the wind than catch anything.',
    greeting: 'I saw the whole Hollow from up there. You missed a spot.',
    likes: 'River Fillet',
  },
  raven: {
    name: 'Night Raven', primary: '#6f5b9e', light: '#d9ccff', deep: '#241a3d', accent: '#9ae6ff',
    trait: 'Ominous — collects shiny things and ominous sayings.',
    blurb: 'A velvet-winged gossip with a moon in one eye and a secret in the other.',
    greeting: 'I know what you did. I also know where the snacks are.',
    likes: 'Moon Blueberries',
  },
  moth: {
    name: 'Ember Moth', primary: '#f2a06b', light: '#ffe6cc', deep: '#6b2a1f', accent: '#ffd166',
    trait: 'Drawn — follows warm light and warmer company.',
    blurb: 'A dusk-winged moth dusted with embers, always circling whatever glows.',
    greeting: 'You’re warm. I’m staying right here.',
    likes: 'Sun Nectar',
  },
  dragonfly: {
    name: 'Glass Dragonfly', primary: '#6fe3d4', light: '#e0fffb', deep: '#155e5a', accent: '#b69cff',
    trait: 'Restless — hovers first, thinks later.',
    blurb: 'A four-winged jewel that skims the ponds and never quite lands.',
    greeting: 'Watch this! No, wait — watch this!',
    likes: 'Coconut Water',
  },
  firefly: {
    name: 'Lantern Firefly', primary: '#d9f26b', light: '#f8ffd1', deep: '#4f5a16', accent: '#ffe066',
    trait: 'Glowing — a tiny nightlight with opinions.',
    blurb: 'A green-gold firefly who blinks in Morse code and insists it means something.',
    greeting: 'Blink blink. That means hello. Probably.',
    likes: 'Lemonade',
  },
  fox: {
    name: 'Moon Fox', primary: '#c9a0ff', light: '#f3e6ff', deep: '#4a2a7a', accent: '#ffd6a5',
    trait: 'Clever — solves problems you didn’t know existed.',
    blurb: 'A silver-violet fox who naps in moonbeams and steals only the good snacks.',
    greeting: 'I have a plan. It involves you and possibly a nap.',
    likes: 'Moon Pie',
  },
  otter: {
    name: 'River Otter', primary: '#b98a5e', light: '#ffe8cc', deep: '#5a3a1e', accent: '#7cf0d0',
    trait: 'Playful — turns every puddle into a water park.',
    blurb: 'A sleek river otter with a favorite pebble and a laugh that echoes.',
    greeting: 'Hold my pebble. I’m going in.',
    likes: 'Tide Sushi',
  },
  badger: {
    name: 'Stone Badger', primary: '#8f97a8', light: '#e3e8f2', deep: '#2f3442', accent: '#ffd166',
    trait: 'Stubborn — digs in and stays put, usually for a nap.',
    blurb: 'A broad-pawed badger with a burrow full of snacks and absolutely no regrets.',
    greeting: 'This is my burrow. You’re welcome in it. Bring food.',
    likes: 'Butter Potato',
  },
  hare: {
    name: 'Thistle Hare', primary: '#b8d98f', light: '#f4ffe0', deep: '#43602e', accent: '#ffb3d9',
    trait: 'Skittish — fast feet, faster worries.',
    blurb: 'A long-eared hare with a thistle behind one ear and a head start on everything.',
    greeting: 'Did you hear that? Me neither. I’m leaving anyway.',
    likes: 'Sweet Peas',
  },
  elk: {
    name: 'Aurora Elk', primary: '#bfe6ff', light: '#f2fbff', deep: '#3a6b86', accent: '#a8e6cf',
    trait: 'Serene — carries the northern lights in its antlers.',
    blurb: 'A tall, quiet elk whose antlers shimmer green and violet after dark.',
    greeting: 'The sky is singing again. Can you hear it?',
    likes: 'Aurora Cooler',
  },
};

const ANIMAL_GENES = {
  firefang: { name: 'Firefang', icon: '🔥', desc: '+20% XP and +3 game coins.', effect: { xp: 1.2, gameCoins: 3 } },
  tamer: { name: 'Kindred Call', icon: '🤝', desc: 'Pets build +40% more bond and gifts arrive 20% sooner.', effect: { petBond: 1.4, giftSpeed: 1.2 } },
  falcon: { name: 'Dive', icon: '🪶', desc: 'Games pay +3 coins and gifts come 20% sooner.', effect: { gameCoins: 3, giftSpeed: 1.2 } },
  raven: { name: 'Omen', icon: '🌑', desc: 'Night games pay +4 coins and chats pay +1.', effect: { nightCoins: 4, chatCoins: 1 } },
  moth: { name: 'Emberdust', icon: '🦋', desc: 'Snacks give +30% XP and joy fades 15% slower.', effect: { snackXp: 1.3, joyDecay: 0.85 } },
  dragonfly: { name: 'Hover', icon: '🪽', desc: 'Energy fades 30% slower and day games pay +3 coins.', effect: { energyDecay: 0.7, dayCoins: 3 } },
  firefly: { name: 'Lantern', icon: '🏮', desc: 'Night games pay +3 coins and +15% XP.', effect: { nightCoins: 3, xp: 1.15 } },
  fox: { name: 'Cunning', icon: '🦊', desc: 'Games pay +3 coins and gifts come 20% sooner.', effect: { gameCoins: 3, giftSpeed: 1.2 } },
  otter: { name: 'River Play', icon: '🦦', desc: 'Joy fades 25% slower and pets pay +2 coins.', effect: { joyDecay: 0.75, petCoins: 2 } },
  badger: { name: 'Burrow', icon: '🦡', desc: 'Hunger fades 25% slower and clean fades 20% slower.', effect: { hungerDecay: 0.75, cleanDecay: 0.8 } },
  hare: { name: 'Quickstep', icon: '🐇', desc: 'Energy fades 20% slower and games pay +3 coins.', effect: { energyDecay: 0.8, gameCoins: 3 } },
  elk: { name: 'Frost Antlers', icon: '🦌', desc: 'All needs fade 12% slower and +15% XP.', effect: { decay: 0.88, xp: 1.15 } },
};

const ANIMAL_TITANS = {
  firefang: 'Blazefang Colossus',
  tamer: 'Wildheart Warden',
  falcon: 'Stormcrest',
  raven: 'Nevermore',
  moth: 'Emberwing Titan',
  dragonfly: 'Glasswing Sovereign',
  firefly: 'Lantern Titan',
  fox: 'Nine-Tail Titan',
  otter: 'Riverbank Titan',
  badger: 'Earthbore',
  hare: 'Thistlehopper',
  elk: 'Aurora Stag',
};

const ANIMAL_PRICES = {
  firefang: 150,
  tamer: 135,
  falcon: 110,
  raven: 120,
  moth: 100,
  dragonfly: 95,
  firefly: 90,
  fox: 105,
  otter: 95,
  badger: 85,
  hare: 80,
  elk: 125,
};

const ANIMAL_HYBRIDS = {
  'dusk+fox': 'Moonfox',
  'falcon+gale': 'Stormwing',
  'fire+firefang': 'Cinderfang',
  'moth+radiant': 'Lanternwing',
  'dragonfly+tide': 'Glasswing',
  'otter+tide': 'Riverbank',
  'badger+rock': 'Burrowstone',
  'bunny+hare': 'Thistlehop',
  'deer+elk': 'Froststag',
  'raven+volt': 'Storm Omen',
  'tamer+wolf': 'Packbond',
  'firefly+radiant': 'Glowflight',
};

const ANIMAL_HABITATS = {
  firefang: ['ember', 'savanna'],
  tamer: ['grove', 'savanna'],
  falcon: ['aurora', 'savanna'],
  raven: ['night'],
  moth: ['night', 'ember', 'dream'],
  dragonfly: ['tide', 'grove'],
  firefly: ['grove', 'ember'],
  fox: ['grove', 'night'],
  otter: ['tide', 'grove'],
  badger: ['grove', 'crystal'],
  hare: ['grove', 'savanna'],
  elk: ['aurora', 'dream'],
};

Object.assign(ELEMENTS, ANIMAL_SPECIES);
Object.assign(GENE_POWERS, ANIMAL_GENES);
Object.assign(TITAN_NAMES, ANIMAL_TITANS);
Object.assign(HYBRID_NAMES, ANIMAL_HYBRIDS);
Object.assign(TYPE_EGG_BASE_PRICE, ANIMAL_PRICES);
Object.keys(ANIMAL_PRICES).forEach((key) => {
  TYPE_EGG_PRICE[key] = discountedEggPrice(ANIMAL_PRICES[key]);
});
ELEMENT_KEYS.push(...Object.keys(ANIMAL_SPECIES));
Object.entries(ANIMAL_HABITATS).forEach(([key, scenes]) => {
  scenes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});
