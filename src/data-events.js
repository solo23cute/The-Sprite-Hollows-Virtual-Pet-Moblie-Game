/* Special event sprites, Admin sprites, and the rotating weekend Admin Event.
   Event and admin species are never sold as normal eggs: they arrive through the
   weekend event gift, the daily egg gift, or a holiday pool. */

const EVENT_SPECIES = {
  meteorpup: {
    name: 'Meteor Pup', primary: '#ff7a4d', light: '#ffe0d0', deep: '#5a1f08', accent: '#ffd166',
    trait: 'Sizzling — leaves a warm trail of stardust behind every step.', likes: 'Star Pop',
    blurb: 'A comet-chasing pup who arrives only while a weekend event is burning bright.',
    greeting: 'I fell out of the sky for the weekend. Worth it.',
  },
  auroraowl: {
    name: 'Aurora Owl', primary: '#5ee0a0', light: '#dbfff0', deep: '#0f4a34', accent: '#8be9ff',
    trait: 'Glowing — feathers shift colour with the sky.', likes: 'Moon Berry',
    blurb: 'A quiet owl wrapped in polar light who appears when the weekend skies open.',
    greeting: 'The lights are out. Come look up.',
  },
  confettigoat: {
    name: 'Confetti Goat', primary: '#ff7ac8', light: '#ffe6f4', deep: '#5a1a3a', accent: '#ffd166',
    trait: 'Celebratory — sheds confetti whenever someone finishes a task.', likes: 'Honeycomb Cake',
    blurb: 'A party goat with paper streamers in its horns and no concept of a quiet room.',
    greeting: 'Party! I brought the party! It is me, I am the party.',
  },
  cometbunny: {
    name: 'Comet Bunny', primary: '#b69cff', light: '#f0e9ff', deep: '#33204a', accent: '#8be9ff',
    trait: 'Fast — outruns its own shadow on event weekends.', likes: 'Candyfloss',
    blurb: 'A long-eared sprinter with a tail like a shooting star and a permanent sugar rush.',
    greeting: 'Race you to the weekend!',
  },
  sundialturtle: {
    name: 'Sundial Turtle', primary: '#e8c07a', light: '#fff2d2', deep: '#5a3a0a', accent: '#8fe07a',
    trait: 'Patient — keeps perfect time and never rushes a celebration.', likes: 'Sun Nectar',
    blurb: 'A shell marked like a sundial that only wakes for long, bright event days.',
    greeting: 'Take your time. The sun is not going anywhere.',
  },
};

const ADMIN_SPECIES = {
  adminaura: {
    name: 'Admin Aura', primary: '#8be9ff', light: '#e6fbff', deep: '#123a4a', accent: '#ffd166',
    trait: 'Omniscient — can see the whole save file and politely pretends not to.', likes: 'Star Cookie',
    blurb: 'The Hollow’s quiet operator: a floating icon with a clipboard and root access to the weather.',
    greeting: 'Be right with you. I am patching the sky.',
  },
  rootrabbit: {
    name: 'Root Rabbit', primary: '#8fe07a', light: '#eaffd6', deep: '#1f4a14', accent: '#8be9ff',
    trait: 'Privileged — hops straight past every locked door.', likes: 'Trail Mix',
    blurb: 'A green-eared rabbit that appears only on admin weekends, carrying a tiny terminal.',
    greeting: 'sudo hop. It worked. It always works.',
  },
  devdrake: {
    name: 'Dev Drake', primary: '#b69cff', light: '#f0e9ff', deep: '#2a1040', accent: '#ff7ac8',
    trait: 'Iterative — ships a tiny fix every single day.', likes: 'Berry Fizz',
    blurb: 'A small dragon with a build pipeline for a tail and a habit of breaking things on purpose.',
    greeting: 'Local build passed. Probably. Ship it.',
  },
  patchpup: {
    name: 'Patch Pup', primary: '#ffd166', light: '#fff7d6', deep: '#5a3a00', accent: '#8fe07a',
    trait: 'Repairing — chews up bugs and buries them in the yard.', likes: 'Butter Potato',
    blurb: 'A cheerful pup with a bandage on one ear and a nose for regressions.',
    greeting: 'Found a bug! Ate the bug! You are welcome!',
  },
  loglynx: {
    name: 'Log Lynx', primary: '#8f97a8', light: '#e3e8f2', deep: '#1f2430', accent: '#8be9ff',
    trait: 'Observant — reads every line and remembers the stack trace.', likes: 'Warm Tea',
    blurb: 'A grey lynx with reading glasses who quietly knows exactly what broke and when.',
    greeting: 'Line 412. It is always line 412.',
  },
  cachecat: {
    name: 'Cache Cat', primary: '#ff9ec7', light: '#ffe6f4', deep: '#4a1030', accent: '#8be9ff',
    trait: 'Retentive — remembers everything and refuses to let go.', likes: 'Milk Tea',
    blurb: 'A pink cat curled inside the save file, holding onto data nobody else remembers.',
    greeting: 'I kept that. You may need it in three years.',
  },
};

const EVENT_GENES = {
  meteorpup: ['Meteor Trail', '☄️', 'XP +20% during any weekend event.', { xp: 1.2 }],
  auroraowl: ['Polar Light', '🌌', 'Gifts arrive 25% sooner.', { giftSpeed: 1.25 }],
  confettigoat: ['Celebration', '🎉', 'Coins +20% and joy +10%.', { coins: 1.2, joy: 1.1 }],
  cometbunny: ['Comet Dash', '💫', 'Trail walks pay +25% coins.', { coins: 1.25 }],
  sundialturtle: ['Sundial', '☀️', 'Needs fade 20% slower.', { needSlow: 0.8 }],
  adminaura: ['Root Access', '🛠️', 'XP +25% and coins +25%.', { xp: 1.25, coins: 1.25 }],
  rootrabbit: ['Sudo Hop', '🐇', 'Every game pays +25 coins.', { gameCoins: 25 }],
  devdrake: ['Hot Reload', '🔥', 'Chats and tasks give +20% XP.', { xp: 1.2 }],
  patchpup: ['Bug Bite', '🐛', 'Feeds give +20% XP and needs fade 10% slower.', { xp: 1.2, needSlow: 0.9 }],
  loglynx: ['Stack Trace', '🔍', 'Gifts arrive 20% sooner and bond +10%.', { giftSpeed: 1.2, bond: 1.1 }],
  cachecat: ['Cache Hit', '💾', 'Check-ins and gifts pay +20% coins.', { coins: 1.2 }],
};

const EVENT_PRICES = {
  meteorpup: 240, auroraowl: 240, confettigoat: 230, cometbunny: 235, sundialturtle: 245,
  adminaura: 400, rootrabbit: 380, devdrake: 390, patchpup: 370, loglynx: 385, cachecat: 395,
};

const EVENT_HOMES = {
  meteorpup: ['ember', 'starlit'], auroraowl: ['starlit', 'skyisles'],
  confettigoat: ['memecore', 'sugar'], cometbunny: ['starlit', 'sakura'],
  sundialturtle: ['grove', 'tide'],
  adminaura: ['cybergrid', 'starlit'], rootrabbit: ['cybergrid', 'mycelium'],
  devdrake: ['cybergrid', 'ember'], patchpup: ['grove', 'cybergrid'],
  loglynx: ['cybergrid', 'night'], cachecat: ['cybergrid', 'neon'],
};

const EVENT_HYBRIDS = {
  'meteorpup+cometbunny': 'Meteor Dash',
  'auroraowl+sundialturtle': 'Polar Noon',
  'confettigoat+cometbunny': 'Party Comet',
  'adminaura+rootrabbit': 'Root Console',
  'devdrake+patchpup': 'Hotfix Pack',
  'loglynx+cachecat': 'Stack Cache',
  'meteorpup+adminaura': 'Deploy Night',
  'confettigoat+patchpup': 'Ship It Party',
};

Object.entries({ ...EVENT_SPECIES, ...ADMIN_SPECIES }).forEach(([key, meta]) => {
  const gene = EVENT_GENES[key] || ['Special Guest', '✨', 'XP +10%.', { xp: 1.1 }];
  ELEMENTS[key] = {
    name: meta.name,
    primary: meta.primary,
    light: meta.light,
    deep: meta.deep,
    accent: meta.accent,
    trait: meta.trait,
    blurb: meta.blurb,
    greeting: meta.greeting,
    likes: meta.likes,
    eventOnly: true,
    admin: key in ADMIN_SPECIES,
  };
  GENE_POWERS[key] = { name: gene[0], icon: gene[1], desc: gene[2], effect: gene[3] };
  TITAN_NAMES[key] = `${meta.name} Titan`;
  NAME_START[key] = [meta.name.split(' ')[0], 'Event', 'Weekend', 'Admin', 'Patch', 'Root'];
  TYPE_EGG_BASE_PRICE[key] = EVENT_PRICES[key] || 250;
  TYPE_EGG_PRICE[key] = discountedEggPrice(TYPE_EGG_BASE_PRICE[key]);
  (EVENT_HOMES[key] || ['starlit']).forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});

Object.assign(HYBRID_NAMES, EVENT_HYBRIDS);

const EVENT_KEYS = Object.keys(EVENT_SPECIES);
const ADMIN_KEYS = Object.keys(ADMIN_SPECIES);
ELEMENT_KEYS.push(...EVENT_KEYS, ...ADMIN_KEYS);

/* Rotating weekend Admin Event. Runs every Saturday and Sunday. */
const WEEKEND_ADMIN_EVENTS = [
  {
    key: 'root-sprint', name: 'Root Sprint Weekend', icon: '🛠️', color: '#8be9ff',
    blurb: 'The admins open the console for the weekend: bonus XP, extra coins, and an Admin egg.',
    xpMult: 1.4, coins: 320, egg: 'rootrabbit',
  },
  {
    key: 'hotfix-jam', name: 'Hotfix Jam Weekend', icon: '🧩', color: '#8fe07a',
    blurb: 'Patch notes in one paw and a toolbox in the other: double gifts and a special event sprite.',
    xpMult: 1.25, coins: 300, egg: 'patchpup',
  },
  {
    key: 'log-dive', name: 'Log Dive Weekend', icon: '🔍', color: '#b69cff',
    blurb: 'Trace every line with the admins: faster gifts, richer trails, and an Admin egg.',
    xpMult: 1.3, coins: 340, egg: 'loglynx',
  },
  {
    key: 'cache-clear', name: 'Cache Clear Weekend', icon: '💾', color: '#ff9ec7',
    blurb: 'Clear the weekend cache, keep the rewards: extra coins and an event sprite egg.',
    xpMult: 1.35, coins: 330, egg: 'cachecat',
  },
  {
    key: 'ship-weekend', name: 'Ship It Weekend', icon: '🚀', color: '#ffd166',
    blurb: 'The whole admin team deploys at once: big XP, big coins, and an Admin Aura egg.',
    xpMult: 1.5, coins: 400, egg: 'adminaura',
  },
];

function weekendAdminDateKey(date = new Date()) {
  const day = date.getDay();
  const anchor = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (day === 0) anchor.setDate(anchor.getDate() - 1);
  if (day !== 0 && day !== 6) return null;
  return `weekend-${anchor.getFullYear()}-${String(anchor.getMonth() + 1).padStart(2, '0')}-${String(anchor.getDate()).padStart(2, '0')}`;
}

function weekendAdminActive(date = new Date()) {
  return weekendAdminDateKey(date) !== null;
}

function weekendAdminAnchor(date = new Date()) {
  const anchor = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (anchor.getDay() === 0) anchor.setDate(anchor.getDate() - 1);
  if (anchor.getDay() !== 6) {
    anchor.setDate(anchor.getDate() + ((6 - anchor.getDay() + 7) % 7));
  }
  return anchor;
}

function weekendAdminEvent(date = new Date()) {
  const index = Math.floor(weekendAdminAnchor(date).getTime() / 86400000);
  return WEEKEND_ADMIN_EVENTS[index % WEEKEND_ADMIN_EVENTS.length] || WEEKEND_ADMIN_EVENTS[0];
}

function weekendAdminXpMult(date = new Date()) {
  if (!weekendAdminActive(date)) return 1;
  return weekendAdminEvent(date).xpMult || 1;
}

function weekendAdminClaimed(date = new Date()) {
  const key = weekendAdminDateKey(date);
  return !!key && state?.weekendGift?.week === key;
}

function weekendAdminEggPool() {
  return [...EVENT_KEYS, ...ADMIN_KEYS].filter((key) => ELEMENTS[key]);
}
