/* Holiday wave: more calendar events, season gift eggs, holiday XP bonuses, and seasonal species. */

Object.assign(HOLIDAYS, {
  lantern: {
    name: 'Lantern Festival', icon: '🏮', start: [1, 1], end: [1, 6], color: '#ffb347',
    treat: 'mooncake', coinMult: 1.2, giftSpeed: 1.15, xpMult: 1.15,
    blurb: 'Paper lights on the water, sweet mooncakes, and a whole harbor of soft gold.',
  },
  aprilfools: {
    name: 'Prank Day', icon: '🃏', start: [3, 1], end: [3, 5], color: '#b69cff',
    treat: 'candy', coinMult: 1.25, giftSpeed: 1.3, xpMult: 1.2,
    blurb: 'The Hollow gets silly: trickster eggs, suspicious cookies, and very fast gifts.',
  },
  easter: {
    name: 'Spring Egg Hunt', icon: '🥚', start: [3, 6], end: [3, 19], color: '#ffb3d1',
    treat: 'starfruit', coinMult: 1.2, giftSpeed: 1.25, xpMult: 1.2,
    blurb: 'Painted eggs under every bush, a basket by the door, and a bonus egg every day.',
  },
  summer: {
    name: 'Sunfest', icon: '☀️', start: [5, 20], end: [6, 7], color: '#ffd166',
    treat: 'coconutwater', coinMult: 1.15, giftSpeed: 1.15, xpMult: 1.2,
    blurb: 'Long light, cold drinks, and a beach-ball egg waiting in the warm grass.',
  },
  harvest: {
    name: 'Harvest Moon', icon: '🌾', start: [10, 1], end: [10, 30], color: '#e0a44a',
    treat: 'apple', coinMult: 1.15, giftSpeed: 1.15, xpMult: 1.15,
    blurb: 'Golden fields, apple baskets, and a scarecrow who insists the moon is ripe.',
  },
});

/* Bloom Festival now ends in March so Prank Day can open April. */
HOLIDAYS.spring.end = [2, 31];

const HOLIDAY_EGG_POOLS = {
  newyear: ['santa', 'crown', 'radiant', 'lucky', 'onewish'],
  lantern: ['lanternfox', 'lucky', 'crown', 'candy', 'radiant'],
  valentine: ['cupid', 'charm', 'bestie', 'cuddle', 'keke'],
  spring: ['springchick', 'bloom', 'bunny', 'charm', 'moth'],
  aprilfools: ['jester', 'trollface', 'smugfrog', 'cheems', 'sussy'],
  easter: ['egghunt', 'springchick', 'bunny', 'charm', 'holly'],
  summer: ['sunspark', 'beachball', 'tide', 'dolphin', 'splash'],
  candyfest: ['candy', 'gummybear', 'cauldron', 'cocoa', 'cherry'],
  halloween: ['scarecrow', 'witch', 'mummy', 'franken', 'blackcat', 'pumpkin'],
  harvest: ['scarecrow', 'apple', 'pumpkin', 'honey', 'gingerbread'],
  christmas: ['elf', 'reindeer', 'gingerbread', 'nutcracker', 'snowman', 'holly', 'santa'],
};

const HOLIDAY_XP_BONUS = {
  newyear: 1.15, lantern: 1.15, valentine: 1.1, spring: 1.15, aprilfools: 1.2,
  easter: 1.2, summer: 1.2, candyfest: 1.15, halloween: 1.25, harvest: 1.15, christmas: 1.3,
};

Object.entries(HOLIDAY_EGG_POOLS).forEach(([key, eggs]) => {
  if (HOLIDAYS[key]) HOLIDAYS[key].eggs = eggs;
});
Object.entries(HOLIDAY_XP_BONUS).forEach(([key, mult]) => {
  if (HOLIDAYS[key]) HOLIDAYS[key].xpMult = mult;
});

function holidayXpMult() {
  return activeHoliday()?.xpMult || 1;
}

function holidayEggPool(holiday = activeHoliday()) {
  if (!holiday) return [];
  const pool = (holiday.eggs || []).filter((key) => ELEMENTS[key]);
  if (pool.length) return pool;
  return ['bloom', 'lucky', 'candy'].filter((key) => ELEMENTS[key]);
}

function holidayGiftClaimed(holiday = activeHoliday(), date = new Date()) {
  if (!holiday) return false;
  return state?.holidayGift?.date === dayKey(date) && state.holidayGift.holiday === holiday.key;
}

/* Seasonal wave: these six sprites arrive through holiday gift eggs. */
const SEASONAL_KINDS = {
  springchick: {
    name: 'Spring Chick', primary: '#ffe066', light: '#fff8d1', deep: '#8a5a00', accent: '#8fe07a',
    trait: 'Newly hatched — meets every morning like it is the first one ever.',
    blurb: 'A fluffy yellow chick with a tuft of grass on its head and a song for the sunrise.',
    greeting: 'Good morning! I found three seeds and a worm. Big day.', likes: 'Sun Nectar',
  },
  egghunt: {
    name: 'Egg Hunt Bunny', primary: '#ffb3d1', light: '#ffe6f0', deep: '#8a2a52', accent: '#8be9ff',
    trait: 'Hiding — remembers where every single egg went, and refuses to say.',
    blurb: 'A long-eared bunny with a paint-spotted basket and a suspiciously smug smile.',
    greeting: 'You are getting warmer. No, colder. This is fun for me.', likes: 'Candy Apple',
  },
  sunspark: {
    name: 'Sunspark', primary: '#ffb347', light: '#ffe6c2', deep: '#8a4a00', accent: '#8be9ff',
    trait: 'Radiant — charges up in a sunbeam and shares the warmth freely.',
    blurb: 'A small sun-shaped sprite that hums at noon and glows faintly all night.',
    greeting: 'Stand here. The light is perfect. I checked.', likes: 'Lemonade',
  },
  beachball: {
    name: 'Beach Ball', primary: '#ff7a7a', light: '#ffe0e0', deep: '#8a2a2a', accent: '#8be9ff',
    trait: 'Bouncy — arrives at every gathering already mid-jump.',
    blurb: 'A striped, round friend who lives for the beach, the pool, and any excuse to bounce.',
    greeting: 'Throw me! I promise I will come back. Probably.', likes: 'Coconut Water',
  },
  lanternfox: {
    name: 'Lantern Fox', primary: '#ffb347', light: '#ffe6c2', deep: '#6b3a08', accent: '#ffd166',
    trait: 'Guiding — carries a paper lantern and walks the harbor path every evening.',
    blurb: 'A warm orange fox with a lantern tail that lights the way home for everyone.',
    greeting: 'The path is lit. Follow me, I know the good dock.', likes: 'Moon Cake',
  },
  jester: {
    name: 'Jester Prank', primary: '#b69cff', light: '#f0e9ff', deep: '#3d2a6b', accent: '#ffd166',
    trait: 'Playful — every joke is harmless and every harmless thing becomes a joke.',
    blurb: 'A tiny jester with a bell-tipped hat, a deck of joke cards, and perfect timing.',
    greeting: 'Why did the sprite cross the Hollow? To get to your snack drawer.', likes: 'Candyfloss',
  },
};

const SEASONAL_GENES = {
  springchick: ['First Peep', '🐣', '+18% XP and gifts arrive 15% sooner.', { xp: 1.18, giftSpeed: 1.15 }],
  egghunt: ['Hidden Egg', '🥚', 'Games pay +4 coins and gifts arrive 20% sooner.', { gameCoins: 4, giftSpeed: 1.2 }],
  sunspark: ['Sunbeam', '☀️', '+20% XP and day games pay +3 coins.', { xp: 1.2, dayCoins: 3 }],
  beachball: ['Bounce', '🏖️', 'Joy fades 25% slower and games pay +3 coins.', { joyDecay: 0.75, gameCoins: 3 }],
  lanternfox: ['Lantern Light', '🏮', 'Night games pay +4 coins and +12% XP.', { nightCoins: 4, xp: 1.12 }],
  jester: ['Prank Trick', '🃏', 'Games pay +5 coins and chats pay +2 coins.', { gameCoins: 5, chatCoins: 2 }],
};

const SEASONAL_TITANS = {
  springchick: 'Peep Titan',
  egghunt: 'Basket Titan',
  sunspark: 'Solar Titan',
  beachball: 'Bounce Titan',
  lanternfox: 'Lantern Titan',
  jester: 'Jester Titan',
};

const SEASONAL_PRICES = {
  springchick: 120, egghunt: 130, sunspark: 135, beachball: 95, lanternfox: 150, jester: 140,
};

const SEASONAL_HOMES = {
  springchick: ['sakura', 'grove'],
  egghunt: ['sakura', 'sugar'],
  sunspark: ['skyisles', 'tide'],
  beachball: ['tide', 'reef'],
  lanternfox: ['lanternbay', 'night'],
  jester: ['memecore', 'sugar'],
};

const SEASONAL_HYBRIDS = {
  'springchick+bloom': 'Peep Bloom',
  'egghunt+bunny': 'Egg Basket',
  'sunspark+radiant': 'Solar Flare',
  'beachball+tide': 'High Bounce',
  'lanternfox+firefly': 'Harbor Light',
  'jester+trollface': 'Prank Court',
};

Object.entries(SEASONAL_KINDS).forEach(([key, meta]) => {
  const gene = SEASONAL_GENES[key];
  ELEMENTS[key] = {
    name: meta.name,
    primary: meta.primary, light: meta.light, deep: meta.deep, accent: meta.accent,
    trait: meta.trait, blurb: meta.blurb, greeting: meta.greeting, likes: meta.likes,
    seasonal: true,
  };
  GENE_POWERS[key] = { name: gene[0], icon: gene[1], desc: gene[2], effect: gene[3] };
  TITAN_NAMES[key] = SEASONAL_TITANS[key];
  TYPE_EGG_BASE_PRICE[key] = SEASONAL_PRICES[key];
  TYPE_EGG_PRICE[key] = discountedEggPrice(SEASONAL_PRICES[key]);
  NAME_START[key] = [meta.name.split(' ')[0], 'Spring', 'Sun', 'Bounce', 'Glow', 'Prank', 'Gift', 'Season'];
  (SEASONAL_HOMES[key] || []).forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});
Object.assign(HYBRID_NAMES, SEASONAL_HYBRIDS);
ELEMENT_KEYS.push(...Object.keys(SEASONAL_KINDS));

const SEASONAL_KEYS = Object.keys(SEASONAL_KINDS);
