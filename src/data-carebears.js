/* Care Bears & Cousins: 10 classic Care Bears plus 7 Care Bear Cousins.
   Every species uses original procedural badge art, a play-and-gift gene,
   a type egg, habitat homes, and a named hybrid. */

const CARE_BEAR_GROUPS = {
  bears: {
    label: 'Care Bears', icon: '🌈', price: 175,
    homes: ['grove', 'dream', 'sugar'], likes: 'Honey Drop',
    blurb: 'A classic Care Bear who turns a gray day into a group hug.',
    note: 'Cheer, Grumpy, Tenderheart, Good Luck, Funshine, Love-a-Lot, Wish, Bedtime, Birthday, and Friend.',
    greetings: [
      'A little care makes every day brighter.',
      'I brought a hug and a snack. Which one first?',
      'The Hollow feels better when you are here.',
    ],
  },
  cousins: {
    label: 'Care Bear Cousins', icon: '🦁', price: 185,
    homes: ['grove', 'savanna', 'aurora'], likes: 'Star Cookie',
    blurb: 'A Care Bear Cousin with a big heart, a brave step, and a favourite game.',
    note: 'Brave Heart Lion, Bright Heart Raccoon, Cozy Heart Penguin, Lotsa Heart Elephant, Swift Heart Rabbit, Treat Heart Pig, and Playful Heart Monkey.',
    greetings: [
      'Cousins stick together, especially at playtime.',
      'I came for the game and stayed for the care.',
      'Every day is better with a friend.',
    ],
  },
};

const CARE_BEAR_GROUP_ORDER = ['bears', 'cousins'];

const CARE_BEAR_GENE_META = {
  cheer: {
    name: 'Rainbow Cheer', icon: '🌈',
    desc: 'Games pay +4 coins and gifts arrive 25% sooner. Joy fades 10% slower.',
    effect: { gameCoins: 4, giftSpeed: 1.25, joyDecay: 0.9 },
    trait: 'Cheerful — finds the bright side and brings everyone with them.',
    blurb: 'Their rainbow badge leaves a little colour on every game and gift.',
  },
  grumpy: {
    name: 'Grumpy Guard', icon: '🌧️',
    desc: 'Games pay +3 coins and gifts arrive 20% sooner. All needs fade 10% slower.',
    effect: { gameCoins: 3, giftSpeed: 1.2, decay: 0.9 },
    trait: 'Grumpy — complains about the rain, then shares their umbrella.',
    blurb: 'A storm cloud badge with a silver lining and a very dry umbrella.',
  },
  tenderheart: {
    name: 'Tender Care', icon: '💗',
    desc: 'Games pay +3 coins and gifts arrive 25% sooner. Pets build 30% more bond.',
    effect: { gameCoins: 3, giftSpeed: 1.25, petBond: 1.3 },
    trait: 'Tender — the first to notice when someone needs a friend.',
    blurb: 'A warm heart badge that makes every victory feel shared.',
  },
  goodluck: {
    name: 'Lucky Clover', icon: '🍀',
    desc: 'Games pay +4 coins and gifts arrive 20% sooner. Day games pay +2 more.',
    effect: { gameCoins: 4, giftSpeed: 1.2, dayCoins: 2 },
    trait: 'Lucky — finds a four-leaf clover in every lawn.',
    blurb: 'A four-leaf badge for good games and even better gift timing.',
  },
  funshine: {
    name: 'Sunshine Stare', icon: '☀️',
    desc: 'Games pay +4 coins and gifts arrive 25% sooner. Day games pay +3 more.',
    effect: { gameCoins: 4, giftSpeed: 1.25, dayCoins: 3 },
    trait: 'Sunny — wakes up already in a good mood.',
    blurb: 'A pocket sun badge that keeps the whole Hollow warm.',
  },
  lovealot: {
    name: 'Heart Hug', icon: '💞',
    desc: 'Games pay +3 coins and gifts arrive 25% sooner. Pets build 35% more bond.',
    effect: { gameCoins: 3, giftSpeed: 1.25, petBond: 1.35 },
    trait: 'Affectionate — has never met a friend they did not hug.',
    blurb: 'Two little hearts that beat together after every game.',
  },
  wish: {
    name: 'Wish Upon', icon: '🌠',
    desc: 'Games pay +3 coins and gifts arrive 30% sooner. Gain 15% more XP.',
    effect: { gameCoins: 3, giftSpeed: 1.3, xp: 1.15 },
    trait: 'Hopeful — makes wishes for everyone else first.',
    blurb: 'A shooting-star badge that turns practice into possibility.',
  },
  bedtime: {
    name: 'Moonlight Lullaby', icon: '🌙',
    desc: 'Games pay +3 coins and gifts arrive 25% sooner. Night games pay +3 more.',
    effect: { gameCoins: 3, giftSpeed: 1.25, nightCoins: 3 },
    trait: 'Sleepy — always ready for a nap and a bedtime story.',
    blurb: 'A crescent-moon badge that makes late games feel cozy.',
  },
  birthday: {
    name: 'Birthday Wish', icon: '🎂',
    desc: 'Games pay +4 coins and gifts arrive 20% sooner. Snacks give 30% more XP.',
    effect: { gameCoins: 4, giftSpeed: 1.2, snackXp: 1.3 },
    trait: 'Celebratory — remembers every hatch day and wraps every gift twice.',
    blurb: 'A cupcake badge with one candle for every new friend.',
  },
  friend: {
    name: 'Best Friends', icon: '🌼',
    desc: 'Games pay +3 coins and gifts arrive 25% sooner. Chats pay +2 coins.',
    effect: { gameCoins: 3, giftSpeed: 1.25, chatCoins: 2 },
    trait: 'Friendly — collects friends the way other sprites collect pebbles.',
    blurb: 'Two bright flowers for the friend who always saves you a seat.',
  },
  braveheart: {
    name: 'Brave Roar', icon: '🦁',
    desc: 'Games pay +5 coins and gifts arrive 20% sooner. Energy fades 15% slower.',
    effect: { gameCoins: 5, giftSpeed: 1.2, energyDecay: 0.85 },
    trait: 'Brave — scared and doing it anyway, with a roar.',
    blurb: 'A lion-hearted badge for the cousin who takes the first step.',
  },
  brightheart: {
    name: 'Bright Idea', icon: '💡',
    desc: 'Games pay +4 coins and gifts arrive 25% sooner. Gain 15% more XP.',
    effect: { gameCoins: 4, giftSpeed: 1.25, xp: 1.15 },
    trait: 'Clever — can turn a paper clip into a game and a gift.',
    blurb: 'A bright little spark for the cousin who is always thinking.',
  },
  cozyheart: {
    name: 'Cozy Snuggle', icon: '🧣',
    desc: 'Games pay +3 coins and gifts arrive 25% sooner. All needs fade 10% slower.',
    effect: { gameCoins: 3, giftSpeed: 1.25, decay: 0.9 },
    trait: 'Cozy — brings a blanket to every party.',
    blurb: 'A warm scarf badge for the friend who makes anywhere feel like home.',
  },
  lotsaheart: {
    name: 'Lotsa Love', icon: '💝',
    desc: 'Games pay +4 coins and gifts arrive 30% sooner. Pets build 30% more bond.',
    effect: { gameCoins: 4, giftSpeed: 1.3, petBond: 1.3 },
    trait: 'Generous — has room in their heart for one more friend.',
    blurb: 'A big heart badge with enough room for the whole Hollow.',
  },
  swiftheart: {
    name: 'Swift Hop', icon: '🐇',
    desc: 'Games pay +4 coins and gifts arrive 20% sooner. Energy fades 20% slower.',
    effect: { gameCoins: 4, giftSpeed: 1.2, energyDecay: 0.8 },
    trait: 'Quick — finished the game before the rules were explained.',
    blurb: 'A lucky-rabbit badge for fast feet and quicker celebrations.',
  },
  treatheart: {
    name: 'Treat Time', icon: '🍬',
    desc: 'Games pay +4 coins and gifts arrive 25% sooner. Snacks give 35% more XP.',
    effect: { gameCoins: 4, giftSpeed: 1.25, snackXp: 1.35 },
    trait: 'Sweet — always has one more treat in their pocket.',
    blurb: 'A candy-heart badge for the cousin who celebrates every win with snacks.',
  },
  playfulheart: {
    name: 'Playful Spark', icon: '🎈',
    desc: 'Games pay +5 coins and gifts arrive 20% sooner. Joy fades 15% slower.',
    effect: { gameCoins: 5, giftSpeed: 1.2, joyDecay: 0.85 },
    trait: 'Playful — turns every chore into a game.',
    blurb: 'A balloon-heart badge for the cousin who never runs out of ideas.',
  },
};

/* group, key, name, primary, light, deep, accent, gene, badge art, partner, hybrid, home */
const CARE_BEAR_DEFS = [
  ['bears', 'care_cheer', 'Cheer Bear', '#ff9ec7', '#fff0f8', '#8a2f5a', '#ffd166', 'cheer', 'rainbow', 'bloom', 'Rainbow Bloom', 'grove'],
  ['bears', 'care_grumpy', 'Grumpy Bear', '#5a8ad6', '#e0efff', '#23406b', '#8be9ff', 'grumpy', 'storm', 'dusk', 'Stormy Skies', 'night'],
  ['bears', 'care_tenderheart', 'Tenderheart Bear', '#c97a4a', '#ffe8d6', '#5c2a14', '#ff8fa3', 'tenderheart', 'heart', 'radiant', 'Heartlight', 'grove'],
  ['bears', 'care_goodluck', 'Good Luck Bear', '#7ed37a', '#efffdc', '#2f5a1a', '#ffd166', 'goodluck', 'clover', 'lucky', 'Four-Leaf Luck', 'grove'],
  ['bears', 'care_funshine', 'Funshine Bear', '#ffd166', '#fff8d0', '#8a5a00', '#ff9f43', 'funshine', 'sun', 'radiant', 'Sunny Days', 'savanna'],
  ['bears', 'care_lovealot', 'Love-a-Lot Bear', '#f28ab8', '#ffe8f3', '#8a2f5a', '#ff5e8a', 'lovealot', 'doubleheart', 'honey', 'Honey Hearts', 'sugar'],
  ['bears', 'care_wish', 'Wish Bear', '#5ad6c8', '#e0fff8', '#0f5c4a', '#ffd166', 'wish', 'shootingstar', 'dream', 'Wishful Dream', 'dream'],
  ['bears', 'care_bedtime', 'Bedtime Bear', '#6b8ad6', '#e8efff', '#1f3a6b', '#ffd166', 'bedtime', 'moon', 'frost', 'Moonlit Lullaby', 'night'],
  ['bears', 'care_birthday', 'Birthday Bear', '#ffb86b', '#fff0d6', '#6b3a0a', '#ff7ac8', 'birthday', 'cupcake', 'candy', 'Birthday Candy', 'sugar'],
  ['bears', 'care_friend', 'Friend Bear', '#ff9f6b', '#ffe8d6', '#6b2a0a', '#8fe07a', 'friend', 'flowers', 'bloom', 'Friendship Bloom', 'grove'],
  ['cousins', 'care_braveheart', 'Brave Heart Lion', '#e8a23a', '#fff3d6', '#6b4210', '#ff6b3d', 'braveheart', 'lion', 'lion', 'Brave Lionheart', 'savanna'],
  ['cousins', 'care_brightheart', 'Bright Heart Raccoon', '#8a9ab8', '#e8efff', '#2f3a5c', '#8be9ff', 'brightheart', 'raccoon', 'dusk', 'Bright Night', 'neon'],
  ['cousins', 'care_cozyheart', 'Cozy Heart Penguin', '#b58ae8', '#f3e8ff', '#4a2a6b', '#5ad6ff', 'cozyheart', 'penguin', 'frost', 'Cozy Frost', 'crystal'],
  ['cousins', 'care_lotsaheart', 'Lotsa Heart Elephant', '#c99ab8', '#f8e8f5', '#5c2a4a', '#ffd166', 'lotsaheart', 'elephant', 'earth', 'Hearty Earth', 'savanna'],
  ['cousins', 'care_swiftheart', 'Swift Heart Rabbit', '#7ad8e8', '#e8fbff', '#1f5c6b', '#ffffff', 'swiftheart', 'rabbit', 'gale', 'Swift Winds', 'aurora'],
  ['cousins', 'care_treatheart', 'Treat Heart Pig', '#f2a6b8', '#fff0f4', '#7a2f4a', '#ffd166', 'treatheart', 'pig', 'honey', 'Treatly Sweet', 'sugar'],
  ['cousins', 'care_playfulheart', 'Playful Heart Monkey', '#c98a5a', '#ffe8d6', '#5c3410', '#ffd166', 'playfulheart', 'monkey', 'volt', 'Playful Spark', 'grove'],
];

const CARE_BEAR_SPECIES = [];
const CARE_BEAR_BY_GROUP = {};
CARE_BEAR_GROUP_ORDER.forEach((group) => { CARE_BEAR_BY_GROUP[group] = []; });

CARE_BEAR_DEFS.forEach(([groupKey, key, name, primary, light, deep, accent, geneKey, artKey, partner, hybrid, home], index) => {
  const group = CARE_BEAR_GROUPS[groupKey];
  const gene = CARE_BEAR_GENE_META[geneKey];
  if (!group || !gene || ELEMENTS[key]) return;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: gene.trait,
    blurb: `${group.blurb} ${gene.blurb}`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    parentTypes: [group.label],
    careBearGroup: groupKey,
    careBearGene: geneKey,
    careBearArt: artKey,
    careBearCousin: groupKey === 'cousins',
  };
  GENE_POWERS[key] = { name: gene.name, icon: gene.icon, desc: gene.desc, effect: gene.effect };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = group.price;
  TYPE_EGG_PRICE[key] = discountedEggPrice(group.price);
  if (ELEMENTS[partner]) HYBRID_NAMES[pairKey(key, partner)] = hybrid;
  NAME_START[key] = [...new Set([name.replace(/^The /, '').split(' ')[0], 'Care', 'Heart'])];
  const homes = [home, ...group.homes];
  homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  CARE_BEAR_SPECIES.push(key);
  CARE_BEAR_BY_GROUP[groupKey].push(key);
});

ELEMENT_KEYS.push(...CARE_BEAR_SPECIES);

const CARE_BEAR_KEYS = CARE_BEAR_SPECIES.slice();
let CARE_BEAR_TOTAL = CARE_BEAR_SPECIES.length;
const CARE_PACKAGE_EVERY = 3;
