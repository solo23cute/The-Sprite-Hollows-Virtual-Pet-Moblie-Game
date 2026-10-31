/* Candy wave: sweet species, candy foods, and sugar transformations. */

const CANDY_SPECIES = ['cottoncandy', 'lollipop', 'gumball', 'jellybean', 'chocobunny', 'peppermint', 'toffee', 'candycorn'];

const CANDY_KINDS = {
  cottoncandy: {
    name: 'Cotton Candy', primary: '#ffb3e6', light: '#fff0fb', deep: '#a13b7a', accent: '#8be9ff',
    trait: 'Airy — leaves a trail of pink sugar wherever it floats.',
    blurb: 'A cloud of spun sugar with a heartbeat and very strong opinions about naps.',
    greeting: 'I’m mostly air. The rest is sugar. And love.',
    likes: 'Cotton Candy Cloud',
  },
  lollipop: {
    name: 'Lollipop', primary: '#ff7ac8', light: '#ffe0f0', deep: '#8a1f52', accent: '#ffd166',
    trait: 'Swirly — thinks in circles and licks its own elbow.',
    blurb: 'A glossy candy swirl on a stick, always slightly sticky and extremely pleased about it.',
    greeting: 'Want a lick? Too late. I licked it first.',
    likes: 'Peppermint Cane',
  },
  gumball: {
    name: 'Gumball', primary: '#b69cff', light: '#f0e8ff', deep: '#4a2a7a', accent: '#7cf0d0',
    trait: 'Bouncy — boings first and asks questions never.',
    blurb: 'A round, shiny gumball with a speckled coat and a surprising amount of bounce.',
    greeting: 'Boing! That was hello. Boing is also goodbye.',
    likes: 'Gumball Gems',
  },
  jellybean: {
    name: 'Jellybean', primary: '#a3e635', light: '#f2ffd9', deep: '#3f6212', accent: '#ff8fc8',
    trait: 'Wobbly — every emotion arrives with a jiggle.',
    blurb: 'A translucent bean of jelly with a sweet center and absolutely no inside voice.',
    greeting: 'I’m not shaking. I’m jiggling. There’s a difference.',
    likes: 'Fruit Gummies',
  },
  chocobunny: {
    name: 'Choco Bunny', primary: '#b97a4e', light: '#f6dcc8', deep: '#5a3218', accent: '#ffd166',
    trait: 'Smooth — melts a little around friends.',
    blurb: 'A chocolate bunny with long ears, a bow, and a tendency to go soft in warm company.',
    greeting: 'Don’t leave me in the sun. I’m delicate.',
    likes: 'Cocoa Truffle',
  },
  peppermint: {
    name: 'Peppermint', primary: '#ff6b7a', light: '#ffe3e6', deep: '#8a1f2a', accent: '#7cf0d0',
    trait: 'Cool — fresh breath, sharper comebacks.',
    blurb: 'A red-and-white striped sweet with a chill outlook and a very clean aura.',
    greeting: 'Breathe. No, really — breathe on someone else.',
    likes: 'Peppermint Cane',
  },
  toffee: {
    name: 'Toffee Taffy', primary: '#d99a5b', light: '#ffead1', deep: '#6b3a16', accent: '#ff7ac8',
    trait: 'Sticky — holds on to every friend it makes.',
    blurb: 'A chewy caramel pup wrapped in twists of wax paper and stubborn affection.',
    greeting: 'You’re stuck with me now. Literally. I’m sticky.',
    likes: 'Toffee Chew',
  },
  candycorn: {
    name: 'Candy Corn', primary: '#ffb347', light: '#fff2c2', deep: '#8a4a00', accent: '#ff6b3d',
    trait: 'Festive — arrives early and leaves last.',
    blurb: 'A tricolor candy kernel who treats every day like the best night of October.',
    greeting: 'Spooky season is a state of mind. My state of mind.',
    likes: 'Candy Corn Cluster',
  },
};

const CANDY_GENES = {
  cottoncandy: { name: 'Sugar Cloud', icon: '☁️', desc: 'Joy fades 30% slower and snacks give +20% XP.', effect: { joyDecay: 0.7, snackXp: 1.2 } },
  lollipop: { name: 'Sugar Swirl', icon: '🍭', desc: 'Games pay +3 coins and gifts come 20% sooner.', effect: { gameCoins: 3, giftSpeed: 1.2 } },
  gumball: { name: 'Bounce', icon: '🔮', desc: 'Energy fades 25% slower and pets pay +2 coins.', effect: { energyDecay: 0.75, petCoins: 2 } },
  jellybean: { name: 'Jelly Jiggle', icon: '🫘', desc: 'Joy fades 25% slower and +15% XP.', effect: { joyDecay: 0.75, xp: 1.15 } },
  chocobunny: { name: 'Sweet Hop', icon: '🍫', desc: 'Pets build +40% bond and pay +1 coin.', effect: { petBond: 1.4, petCoins: 1 } },
  peppermint: { name: 'Cool Mint', icon: '❄️', desc: 'Clean fades 35% slower and night games pay +3.', effect: { cleanDecay: 0.65, nightCoins: 3 } },
  toffee: { name: 'Sticky Charm', icon: '🍯', desc: 'Gifts arrive 30% sooner and pets build +25% bond.', effect: { giftSpeed: 1.3, petBond: 1.25 } },
  candycorn: { name: 'Sugar Rush', icon: '🎃', desc: 'Games pay +3 coins and +15% XP.', effect: { gameCoins: 3, xp: 1.15 } },
};

const CANDY_TITANS = {
  cottoncandy: 'Sugarcloud Titan',
  lollipop: 'Swirl Sovereign',
  gumball: 'Bounce King',
  jellybean: 'Jelly Colossus',
  chocobunny: 'Cocoa Monarch',
  peppermint: 'Frostmint Titan',
  toffee: 'Taffy Leviathan',
  candycorn: 'Harvest Candy Titan',
};

const CANDY_PRICES = {
  cottoncandy: 90,
  lollipop: 100,
  gumball: 95,
  jellybean: 85,
  chocobunny: 120,
  peppermint: 105,
  toffee: 110,
  candycorn: 80,
};

const CANDY_FOODS = {
  candyfloss: { id: 'candyfloss', name: 'Cotton Candy Cloud', emoji: '🍥', price: 7, joy: 22, xp: 8, desc: '+22 joy · +8 XP', cat: 'treat', candy: true },
  candycane: { id: 'candycane', name: 'Peppermint Cane', emoji: '🍬', price: 6, joy: 18, clean: 3, xp: 7, desc: '+18 joy · fresh breath', cat: 'treat', candy: true },
  gumballs: { id: 'gumballs', name: 'Gumball Gems', emoji: '🔮', price: 5, hunger: 8, joy: 18, xp: 7, desc: '+18 joy · +8 food', cat: 'treat', candy: true },
  toffeechew: { id: 'toffeechew', name: 'Toffee Chew', emoji: '🍮', price: 8, hunger: 14, joy: 20, bond: 1, xp: 9, desc: '+20 joy · +bond', cat: 'treat', candy: true },
};

const CANDY_FOOD_DIET = {
  candyfloss: { path: 'sweet', gain: 2 },
  candycane: { path: 'sweet', gain: 1 },
  gumballs: { path: 'sweet', gain: 2 },
  toffeechew: { path: 'sweet', gain: 2 },
};

const CANDY_HYBRIDS = {
  'candy+cottoncandy': 'Cotton Floss',
  'candy+lollipop': 'Sugar Swirl',
  'candy+chocobunny': 'Truffle Hop',
  'candycorn+pumpkin': 'Harvest Candy',
  'gummybear+jellybean': 'Jelly Bear',
};

const CANDY_HABITATS = {
  cottoncandy: ['sugar', 'dream'],
  lollipop: ['sugar', 'grove'],
  gumball: ['sugar', 'neon'],
  jellybean: ['sugar', 'grove'],
  chocobunny: ['sugar', 'dream'],
  peppermint: ['sugar', 'aurora'],
  toffee: ['sugar', 'grove'],
  candycorn: ['sugar', 'night', 'ember'],
};

const CANDY_ITEMS = ['candy', 'truffle', 'candyapple', 'gummy', 'stargummy', 'chocolate', 'candyfloss', 'candycane', 'gumballs', 'toffeechew'];

Object.assign(ELEMENTS, CANDY_KINDS);
Object.assign(GENE_POWERS, CANDY_GENES);
Object.assign(TITAN_NAMES, CANDY_TITANS);
Object.assign(TYPE_EGG_BASE_PRICE, CANDY_PRICES);
Object.assign(HYBRID_NAMES, CANDY_HYBRIDS);
Object.assign(FOODS, CANDY_FOODS);
Object.assign(FOOD_DIET, CANDY_FOOD_DIET);
Object.keys(CANDY_PRICES).forEach((key) => {
  TYPE_EGG_PRICE[key] = discountedEggPrice(CANDY_PRICES[key]);
});
ELEMENT_KEYS.push(...CANDY_SPECIES);
FOOD_KEYS.push(...Object.keys(CANDY_FOODS));
Object.entries(CANDY_HABITATS).forEach(([key, scenes]) => {
  scenes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});
