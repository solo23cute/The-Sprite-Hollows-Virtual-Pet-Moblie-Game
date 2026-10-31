/* Holiday waves: Halloween and Christmas species, treats, and calendar events. */

const HALLOWEEN_SPECIES = ['scarecrow', 'witch', 'mummy', 'franken', 'blackcat', 'cauldron'];
const CHRISTMAS_SPECIES = ['elf', 'reindeer', 'gingerbread', 'nutcracker', 'snowman', 'holly'];

const HOLIDAY_KINDS = {
  scarecrow: {
    name: 'Scarecrow', primary: '#d9a441', light: '#fff0c2', deep: '#6b4a12', accent: '#ff7a4d',
    trait: 'Watchful — stands very still, then waves when you least expect it.',
    blurb: 'A stitched straw guardian with a floppy hat and a heart full of harvest songs.',
    greeting: 'I’ve been standing here for hours. Worth it. You showed up.',
    likes: 'Golden Corn',
  },
  witch: {
    name: 'Pumpkin Witch', primary: '#9a6bff', light: '#ecdcff', deep: '#3d1f6b', accent: '#ff9f43',
    trait: 'Brewing — every potion is one part moonlight and two parts snack.',
    blurb: 'A little witch with a crooked hat, a loyal broom, and a cauldron that never quite behaves.',
    greeting: 'I turned my cauldron into a snack bowl. Progress.',
    likes: 'Pumpkin Spice Latte',
  },
  mummy: {
    name: 'Mummy', primary: '#d8c7a3', light: '#fff8e8', deep: '#6b5a3a', accent: '#8be9ff',
    trait: 'Wrapped — cozy, ancient, and perpetually losing an bandage.',
    blurb: 'A softly wrapped wanderer who has seen centuries of sunsets and still loves a good nap.',
    greeting: 'I’m not slow. I’m marinating.',
    likes: 'Hearth Pot Pie',
  },
  franken: {
    name: 'Frankenpal', primary: '#8fd16b', light: '#e7ffd9', deep: '#2f5a1e', accent: '#ffd166',
    trait: 'Patchwork — built from spare parts and enormous kindness.',
    blurb: 'A gentle stitched friend with a bolt on each side and a very careful hug.',
    greeting: 'Friend? Friend! I made you a rock. It’s a nice rock.',
    likes: 'Butter Potato',
  },
  blackcat: {
    name: 'Black Cat', primary: '#5a4b78', light: '#d9ccff', deep: '#1d1530', accent: '#ffd166',
    trait: 'Lucky — crosses your path on purpose, for good reasons.',
    blurb: 'A sleek midnight cat with moonlit eyes and a tail that writes its own fortunes.',
    greeting: 'You’re lucky I like you. That’s how luck works.',
    likes: 'Moon Blueberries',
  },
  cauldron: {
    name: 'Candy Cauldron', primary: '#7a5cff', light: '#e7dcff', deep: '#2a1a57', accent: '#ff8fc8',
    trait: 'Bubbling — every bubble smells like a different candy.',
    blurb: 'A walking cauldron of melted sweets, always one stir away from a new flavor.',
    greeting: 'Want to see what’s bubbling? It’s probably candy. Probably.',
    likes: 'Candy Corn Cluster',
  },
  elf: {
    name: 'Holiday Elf', primary: '#7ee787', light: '#e7ffe9', deep: '#1f6b2a', accent: '#ff6b7a',
    trait: 'Busy — has a list, checked it twice, and lost it under the couch.',
    blurb: 'A cheerful workshop elf with a bell-tipped hat and more energy than the sleigh.',
    greeting: 'You’re on the nice list! I checked. Then I lost the list.',
    likes: 'Holiday Cookie',
  },
  reindeer: {
    name: 'Tinsel Reindeer', primary: '#b98a5e', light: '#ffe7c9', deep: '#5a3418', accent: '#ff6b6b',
    trait: 'Ready — can find its way home through any snowstorm.',
    blurb: 'A bright-nosed reindeer with tinsel antlers and a red nose that doubles as a nightlight.',
    greeting: 'Hop on. I know a shortcut. It’s mostly snow.',
    likes: 'Warm Milk',
  },
  gingerbread: {
    name: 'Gingerbread', primary: '#c98a4a', light: '#ffe4bf', deep: '#6b3f14', accent: '#fff4e0',
    trait: 'Crumbly — warm, spicy, and held together by icing and hope.',
    blurb: 'A smiling gingerbread friend piped with icing and dusted with cinnamon snow.',
    greeting: 'Careful — I’m 90% icing and 10% structural integrity.',
    likes: 'Gingerbread Cookie',
  },
  nutcracker: {
    name: 'Nutcracker', primary: '#d94f5c', light: '#ffd9dd', deep: '#6b1a24', accent: '#ffd166',
    trait: 'Stately — stands guard over the snack tin with military precision.',
    blurb: 'A polished nutcracker in a little red coat, sworn to protect the holiday treats.',
    greeting: 'Halt! Password? …It’s “cocoa.” You may pass.',
    likes: 'Holiday Cookie',
  },
  snowman: {
    name: 'Snowman', primary: '#bfe6ff', light: '#f7fdff', deep: '#3a6b86', accent: '#ff9f43',
    trait: 'Frosty — a walking snowball with a warm heart and a cold nose.',
    blurb: 'A three-tier snow friend with a scarf, a top hat, and a nose that points toward snacks.',
    greeting: 'I’m not cold. I’m refreshing.',
    likes: 'Hot Cocoa',
  },
  holly: {
    name: 'Holly', primary: '#4f9e5a', light: '#e5ffd9', deep: '#1f4a2a', accent: '#ff4d6d',
    trait: 'Merry — leaves a little green sparkle wherever it goes.',
    blurb: 'A tiny holly sprite wearing a crown of leaves and bright red berries.',
    greeting: 'Deck the Hollow with something shiny. Preferably me.',
    likes: 'Holiday Cookie',
  },
};

const HOLIDAY_GENES = {
  scarecrow: { name: 'Harvest Watch', icon: '🌾', desc: 'Hunger fades 25% slower and day games pay +3 coins.', effect: { hungerDecay: 0.75, dayCoins: 3 } },
  witch: { name: 'Moonbrew', icon: '🧙', desc: 'Night games pay +4 coins and gifts come 20% sooner.', effect: { nightCoins: 4, giftSpeed: 1.2 } },
  mummy: { name: 'Ancient Wrap', icon: '🧻', desc: 'All needs fade 12% slower and +10% XP.', effect: { decay: 0.88, xp: 1.1 } },
  franken: { name: 'Kind Heart', icon: '💚', desc: 'Pets build +45% bond and pay +1 coin.', effect: { petBond: 1.45, petCoins: 1 } },
  blackcat: { name: 'Lucky Paws', icon: '🍀', desc: 'Games pay +4 coins and night games pay +2.', effect: { gameCoins: 4, nightCoins: 2 } },
  cauldron: { name: 'Candy Brew', icon: '🍬', desc: 'Snacks give +35% XP and joy fades 20% slower.', effect: { snackXp: 1.35, joyDecay: 0.8 } },
  elf: { name: 'Workshop Rush', icon: '🔔', desc: 'Gifts arrive 35% sooner and +20% pet bond.', effect: { giftSpeed: 1.35, petBond: 1.2 } },
  reindeer: { name: 'Sleigh Bell', icon: '🦌', desc: 'Games pay +3 coins and energy fades 20% slower.', effect: { gameCoins: 3, energyDecay: 0.8 } },
  gingerbread: { name: 'Icing Bond', icon: '🍪', desc: 'Snacks give +30% XP and pets build +25% bond.', effect: { snackXp: 1.3, petBond: 1.25 } },
  nutcracker: { name: 'Guard Duty', icon: '🛡️', desc: 'All needs fade 10% slower and night games pay +3.', effect: { decay: 0.9, nightCoins: 3 } },
  snowman: { name: 'Snow Glow', icon: '⛄', desc: 'Cold weather is cozy: +3 game coins and joy fades 15% slower.', effect: { gameCoins: 3, joyDecay: 0.85 } },
  holly: { name: 'Merry Sparkle', icon: '🎄', desc: 'Gifts arrive 25% sooner and +15% XP.', effect: { giftSpeed: 1.25, xp: 1.15 } },
};

const HOLIDAY_TITANS = {
  scarecrow: 'Harvest Warden',
  witch: 'Coven Sovereign',
  mummy: 'Eternal Wraps',
  franken: 'Kindhearted Colossus',
  blackcat: 'Fortuna Cat',
  cauldron: 'Candy Caldron',
  elf: 'Workshop Titan',
  reindeer: 'Aurora Sleigh',
  gingerbread: 'Icing Colossus',
  nutcracker: 'Sugarplum Guard',
  snowman: 'Snow Sovereign',
  holly: 'Winterberry Titan',
};

const HOLIDAY_PRICES = {
  scarecrow: 100,
  witch: 140,
  mummy: 105,
  franken: 115,
  blackcat: 95,
  cauldron: 125,
  elf: 110,
  reindeer: 130,
  gingerbread: 100,
  nutcracker: 120,
  snowman: 105,
  holly: 90,
};

const HOLIDAY_FOODS = {
  gingerbreadcookie: { id: 'gingerbreadcookie', name: 'Gingerbread Cookie', emoji: '🍪', price: 8, hunger: 18, joy: 20, xp: 9, desc: '+18 food · +20 joy', cat: 'dessert', holiday: true },
  holidaycookie: { id: 'holidaycookie', name: 'Snowflake Cookie', emoji: '❄️', price: 8, hunger: 16, joy: 22, xp: 9, desc: '+16 food · +22 joy', cat: 'dessert', holiday: true },
  pumpkinspice: { id: 'pumpkinspice', name: 'Pumpkin Spice Latte', emoji: '🎃', price: 8, energy: 24, joy: 12, xp: 8, desc: '+24 rest · +12 joy', cat: 'drink', holiday: true },
  chestnut: { id: 'chestnut', name: 'Roasted Chestnut', emoji: '🌰', price: 6, hunger: 20, energy: 6, xp: 7, desc: '+20 food · +6 rest', cat: 'treat', holiday: true },
};

const HOLIDAY_FOOD_DIET = {
  gingerbreadcookie: { path: 'sweet', gain: 2 },
  holidaycookie: { path: 'sweet', gain: 1 },
  pumpkinspice: { path: 'sweet', gain: 1 },
  chestnut: { path: 'hearty', gain: 1 },
};

const HOLIDAY_HYBRIDS = {
  'blackcat+candy': 'Sugar Claws',
  'cauldron+candy': 'Candy Cauldron',
  'gingerbread+candy': 'Candy House',
  'holly+bloom': 'Winterberry',
  'pumpkin+scarecrow': 'Harvest Warden',
  'reindeer+snow': 'Sleigh Team',
};

const HOLIDAY_HABITATS = {
  scarecrow: ['grove', 'savanna'],
  witch: ['night', 'ember', 'dream'],
  mummy: ['night', 'crystal'],
  franken: ['grove', 'neon'],
  blackcat: ['night', 'grove'],
  cauldron: ['sugar', 'ember', 'night'],
  elf: ['sugar', 'aurora', 'grove'],
  reindeer: ['aurora', 'grove'],
  gingerbread: ['sugar', 'dream'],
  nutcracker: ['sugar', 'crystal'],
  snowman: ['aurora', 'dream'],
  holly: ['grove', 'dream'],
};

const HOLIDAYS = {
  newyear: { name: 'New Year Spark', icon: '🎆', start: [0, 1], end: [0, 7], color: '#8be9ff', treat: 'hotcocoa', coinMult: 1.2, giftSpeed: 1.15, blurb: 'Fireworks, fresh starts, and a little extra sparkle in every coin.' },
  valentine: { name: 'Sweetheart Week', icon: '💘', start: [1, 7], end: [1, 14], color: '#ff8fc8', treat: 'honeycake', coinMult: 1.1, giftSpeed: 1.2, blurb: 'A week for extra bond, extra sweets, and telling your sprites you like them.' },
  spring: { name: 'Bloom Festival', icon: '🌸', start: [2, 20], end: [3, 5], color: '#a3e635', treat: 'starfruit', coinMult: 1.15, giftSpeed: 1.1, blurb: 'Petals in the air and a little more bounce in every check-in.' },
  candyfest: { name: 'Candy Carnival', icon: '🍭', start: [8, 1], end: [8, 30], color: '#ff7ac8', treat: 'candyfloss', coinMult: 1.2, giftSpeed: 1.2, blurb: 'A whole month of spun sugar, gumballs, and extremely sticky paws.' },
  halloween: { name: 'Hollow Halloween', icon: '🎃', start: [9, 1], end: [9, 31], color: '#ff9f43', treat: 'candy', coinMult: 1.25, giftSpeed: 1.25, blurb: 'Pumpkins, moonlight, and a cauldron full of candy. The spookiest, sweetest month.' },
  harvest: { name: 'Harvest Homecoming', icon: '🌾', start: [10, 1], end: [10, 30], color: '#d9a441', treat: 'pumpkinmash', coinMult: 1.15, giftSpeed: 1.1, blurb: 'Warm food, golden fields, and gratitude for every little friend.' },
  christmas: { name: 'Winterlight', icon: '🎄', start: [11, 1], end: [11, 31], color: '#7ee787', treat: 'hotcocoa', coinMult: 1.3, giftSpeed: 1.3, blurb: 'Lights in the windows, cocoa in the pantry, and gifts arriving early all month.' },
};

function holidayForDate(date = new Date()) {
  const month = date.getMonth();
  const day = date.getDate();
  return Object.entries(HOLIDAYS).find(([, h]) => {
    const afterStart = month > h.start[0] || (month === h.start[0] && day >= h.start[1]);
    const beforeEnd = month < h.end[0] || (month === h.end[0] && day <= h.end[1]);
    return afterStart && beforeEnd;
  }) || null;
}

function activeHoliday(date = new Date()) {
  const found = holidayForDate(date);
  return found ? { key: found[0], ...found[1] } : null;
}

function nextHoliday(date = new Date()) {
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Object.entries(HOLIDAYS).map(([key, h]) => {
    let start = new Date(today.getFullYear(), h.start[0], h.start[1]);
    if (start < today) start = new Date(today.getFullYear() + 1, h.start[0], h.start[1]);
    return { key, ...h, start, days: Math.ceil((start - today) / 86400000) };
  }).sort((a, b) => a.start - b.start)[0];
}

function holidayDaysLeft(holiday, date = new Date()) {
  if (!holiday) return 0;
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  let end = new Date(today.getFullYear(), holiday.end[0], holiday.end[1]);
  if (end < today) end = new Date(today.getFullYear() + 1, holiday.end[0], holiday.end[1]);
  return Math.max(0, Math.ceil((end - today) / 86400000));
}

function holidayCoinMult() {
  return activeHoliday()?.coinMult || 1;
}

function holidayGiftSpeed() {
  return activeHoliday()?.giftSpeed || 1;
}

Object.assign(ELEMENTS, HOLIDAY_KINDS);
Object.assign(GENE_POWERS, HOLIDAY_GENES);
Object.assign(TITAN_NAMES, HOLIDAY_TITANS);
Object.assign(TYPE_EGG_BASE_PRICE, HOLIDAY_PRICES);
Object.assign(HYBRID_NAMES, HOLIDAY_HYBRIDS);
Object.assign(FOODS, HOLIDAY_FOODS);
Object.assign(FOOD_DIET, HOLIDAY_FOOD_DIET);
Object.keys(HOLIDAY_PRICES).forEach((key) => {
  TYPE_EGG_PRICE[key] = discountedEggPrice(HOLIDAY_PRICES[key]);
});
ELEMENT_KEYS.push(...HALLOWEEN_SPECIES, ...CHRISTMAS_SPECIES);
FOOD_KEYS.push(...Object.keys(HOLIDAY_FOODS));
Object.entries(HOLIDAY_HABITATS).forEach(([key, scenes]) => {
  scenes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});
