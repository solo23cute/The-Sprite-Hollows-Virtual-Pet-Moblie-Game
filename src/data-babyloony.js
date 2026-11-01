/* Baby Looney Tunes wave: the toddler versions of the classic cast, with age-tagged
   genes, Titans, eggs, homes, and hybrids. */

const BABY_LOONEY_GENES = {
  mischief: ['Mischief', '😈', 'Game coins +15%.', { gameCoins: 15 }],
  nap: ['Naptime', '😴', 'Needs fade 15% slower.', { needSlow: 0.85 }],
  song: ['Song', '🎵', 'Joy gains +16%.', { joy: 1.16 }],
  speed: ['Zoomies', '💨', 'Trail walks and games pay +14% XP.', { xp: 1.14 }],
  snack: ['Snack Time', '🍪', 'Gifts arrive 15% sooner.', { giftSpeed: 1.15 }],
  tantrum: ['Tantrum', '🌩️', 'XP +16% from everything.', { xp: 1.16 }],
  tiny: ['Tiny', '🐣', 'Bond gains +18%.', { bond: 1.18 }],
  charm: ['Charm', '💫', 'Coins +15% from everything.', { coins: 1.15 }],
};

const BABY_LOONEY_HOMES = {
  mischief: ['sugar', 'neon'],
  nap: ['dream', 'sugar'],
  song: ['sugar', 'starlit'],
  speed: ['savanna', 'neon'],
  snack: ['sugar', 'grove'],
  tantrum: ['savanna', 'mycelium'],
  tiny: ['grove', 'sakura'],
  charm: ['starlit', 'sakura'],
};

/* key, name, gene, palette [primary, light, deep, accent], price, blurb, greeting */
const BABY_LOONEY_ROSTER = [
  ['baby_bugs', 'Baby Bugs', 'mischief', ['#9aa0ad', '#e3e6ee', '#4a4f5c', '#ffd166'], 155,
    'A tiny rabbit with a big vocabulary, a carrot, and a plan that always works out for him.',
    'Eh, what’s up, doc? Want to see something great?'],
  ['baby_daffy', 'Baby Daffy', 'tantrum', ['#2a2a33', '#c9c9d6', '#0a0a12', '#ff9f1c'], 155,
    'A small duck with enormous opinions and a desperate need to be the centre of attention.',
    'It’s MY turn! I’m the star! You’re the background!'],
  ['baby_tweety', 'Baby Tweety', 'song', ['#ffe066', '#fff8c2', '#a37a00', '#5a9eff'], 155,
    'A tiny yellow bird who sings to himself and says the quiet part very politely out loud.',
    'I tawt I taw a puddy tat! ...I did! I did taw a puddy tat!'],
  ['baby_sylvester', 'Baby Sylvester', 'snack', ['#2a2a33', '#d6d6e3', '#0a0a12', '#e8574a'], 155,
    'A black-and-white kitten with a lisp, a hunger, and absolutely no hunting skill.',
    'Sufferin’ succotash! I’ll get that bird this time. I mean it.'],
  ['baby_lola', 'Baby Lola', 'charm', ['#ff9ec7', '#ffe6f4', '#5a1a3a', '#8be9ff'], 160,
    'A bunny with a bow, a giggle, and a knack for getting exactly what she wants.',
    'Come on, it’ll be fun! It’s always fun when it’s my idea.'],
  ['baby_taz', 'Baby Taz', 'tantrum', ['#8a5a3a', '#e8cbaa', '#3a1f0a', '#e8574a'], 160,
    'A tiny whirlwind of appetite who speaks in growls and spins when he does not get a snack.',
    'Grrraaaah! ...Cookie?'],
  ['baby_porky', 'Baby Porky', 'nap', ['#f2c9c9', '#fff5f5', '#8a5a5a', '#3a6bd0'], 155,
    'A stuttering little pig with a pillow, a teddy, and a strict bedtime he announces hourly.',
    'Th-th-that’s all, folks! Naptime now.'],
  ['baby_foghorn', 'Baby Foghorn', 'mischief', ['#f2efe8', '#ffffff', '#6b6455', '#e8574a'], 160,
    'A very young, very loud rooster who tells long stories nobody asked to hear.',
    'I say, I say, listen here, son — I got a story for ya.'],
  ['baby_pepe', 'Baby Pepé', 'charm', ['#2a2a33', '#f2efe8', '#0a0a12', '#ff5e8a'], 160,
    'A small skunk with a beret, a flower, and a confidence far beyond his years.',
    'Ah, ma petite — do not run. I am very charming.'],
];

const BABY_LOONEY_HYBRIDS = {
  'baby_bugs+baby_daffy': 'Nursery Rivals',
  'baby_sylvester+baby_tweety': 'Naptime Truce',
  'baby_lola+baby_bugs': 'Cuddle Pair',
  'baby_porky+baby_taz': 'Snack Break',
  'baby_foghorn+baby_pepe': 'Playground Talk',
};

function registerBabyLooneyRoster(roster, keysOut) {
  roster.forEach(([key, name, geneKey, palette, price, blurb, greeting], index) => {
    const gene = BABY_LOONEY_GENES[geneKey] || BABY_LOONEY_GENES.charm;
    const [primary, light, deep, accent] = palette;
    ELEMENTS[key] = {
      name, primary, light, deep, accent,
      trait: `${gene[0]} — ${gene[2]}`,
      blurb,
      greeting,
      likes: ['Candy Apple', 'Milk Tea', 'Star Pop', 'Warm Milk', 'Honeycomb Cake', 'Lemonade', 'Candyfloss', 'Trail Mix', 'Berry Fizz', 'Sun Nectar'][index % 10],
      babyloons: true,
    };
    GENE_POWERS[key] = { name: gene[0], icon: gene[1], desc: gene[2], effect: gene[3] };
    TITAN_NAMES[key] = `${name} Titan`;
    NAME_START[key] = [name.split(' ')[1] || name.split(' ')[0], 'Tiny', 'Wobbly', 'Nursery', 'Cuddle', 'Diaper'];
    TYPE_EGG_BASE_PRICE[key] = price;
    TYPE_EGG_PRICE[key] = discountedEggPrice(price);
    (BABY_LOONEY_HOMES[geneKey] || ['sugar']).forEach((scene) => {
      if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
    });
    keysOut.push(key);
  });
}

const BABY_LOONEY_KEYS = [];
registerBabyLooneyRoster(BABY_LOONEY_ROSTER, BABY_LOONEY_KEYS);

Object.assign(HYBRID_NAMES, BABY_LOONEY_HYBRIDS);

ELEMENT_KEYS.push(...BABY_LOONEY_KEYS);
BABY_LOONEY_KEYS.forEach((key) => {
  if (typeof TYPE_EGG_SPECIES !== 'undefined' && !TYPE_EGG_SPECIES.includes(key)) TYPE_EGG_SPECIES.push(key);
  if (typeof WILD_SPECIES !== 'undefined' && !WILD_SPECIES.includes(key)) WILD_SPECIES.push(key);
});
