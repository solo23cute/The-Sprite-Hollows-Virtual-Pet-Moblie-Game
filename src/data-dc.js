/* DC hero wave: the Justice League, Bat-family, Titans, and street-level mystics. */

const DC_KINDS = {
  wonderwoman: {
    name: 'Wonder Woman', primary: '#d94f5c', light: '#ffe0e3', deep: '#5c1a22', accent: '#ffd166',
    trait: 'Amazonian — meets every problem with a calm stare and a ready lasso.',
    blurb: 'A red-and-gold champion with a tiara, silver bracelets, and a lasso that tells the truth.',
    greeting: 'Stand tall. We can solve this together.',
    likes: 'Golden Curry',
  },
  flash: {
    name: 'The Flash', primary: '#d93a4a', light: '#ffd9dd', deep: '#5c1018', accent: '#ffd166',
    trait: 'Fast — finishes the sentence you were about to start.',
    blurb: 'A scarlet speedster with gold lightning ears and a trail of afterimages.',
    greeting: 'I was going to say hi, but I already did. Twice.',
    likes: 'Star Pop',
  },
  greenlantern: {
    name: 'Green Lantern', primary: '#2f9e5a', light: '#d9ffe8', deep: '#123f24', accent: '#7affd8',
    trait: 'Willful — builds a bridge out of pure determination.',
    blurb: 'A green-glowing guardian with a power ring, a domino mask, and a lantern-shaped heart.',
    greeting: 'If you can imagine it, I can make it. Snacks included.',
    likes: 'Aurora Bun',
  },
  aquaman: {
    name: 'Aquaman', primary: '#e08a3c', light: '#ffe3b8', deep: '#6b3a0a', accent: '#7affd8',
    trait: 'Tidal — hears the ocean in every shell and every snack crunch.',
    blurb: 'A golden king of the sea with a coral crown, a trident, and salt in his hair.',
    greeting: 'The tide brought me here. The snacks made me stay.',
    likes: 'Tide Sushi',
  },
  cyborg: {
    name: 'Cyborg', primary: '#7a8a9c', light: '#d9e6f2', deep: '#26323f', accent: '#6fffe0',
    trait: 'Connected — can hear a Wi-Fi handshake from three rooms away.',
    blurb: 'A silver-armored hero with a glowing red eye, circuit lines, and a boom tube on standby.',
    greeting: 'I ran a scan. You need a snack and a nap. In that order.',
    likes: 'Melted Toastie',
  },
  martian: {
    name: 'Martian Manhunter', primary: '#4fae6b', light: '#d9ffe4', deep: '#174a2a', accent: '#e8574a',
    trait: 'Shapeshifted — wears a different silhouette whenever the mood strikes.',
    blurb: 'A green guardian from Mars with a long brow, a flowing cape, and a quiet mind.',
    greeting: 'I can read your thoughts. Mostly it says “snack.”',
    likes: 'Moon Cake',
  },
  greenarrow: {
    name: 'Green Arrow', primary: '#3f9e4f', light: '#dfffdc', deep: '#184a1f', accent: '#ffd166',
    trait: 'Sharpshooting — turns every scrap of conversation into a target.',
    blurb: 'A hooded archer with a bow, a quiver of trick arrows, and a goatee worth respecting.',
    greeting: 'I never miss. Except when I’m aiming at a nap.',
    likes: 'Trail Jerky',
  },
  blackcanary: {
    name: 'Black Canary', primary: '#3a3a4a', light: '#d9d9e8', deep: '#14141c', accent: '#ffd166',
    trait: 'Resonant — a whisper can rattle the cookie jar off the shelf.',
    blurb: 'A gold-haired fighter with a black mask, a leather jacket, and a sonic cry.',
    greeting: 'Cover your ears. Or don’t. Your choice.',
    likes: 'Berry Fizz',
  },
  supergirl: {
    name: 'Supergirl', primary: '#3a6bff', light: '#d6e4ff', deep: '#142a8a', accent: '#e8574a',
    trait: 'Sun-powered — gets stronger after a good stretch and a brighter sky.',
    blurb: 'A blue-and-red Kryptonian with a red cape, a gold crest, and a grin full of sunlight.',
    greeting: 'Up, up, and — oh, you have snacks. Priorities changed.',
    likes: 'Cloud Feast',
  },
  batgirl: {
    name: 'Batgirl', primary: '#6b4fa0', light: '#e6d9ff', deep: '#24163f', accent: '#ffd166',
    trait: 'Detective — notices the one crumb you tried to hide.',
    blurb: 'A purple-caped vigilante with a cowl, a gold bat emblem, and a utility belt of snacks.',
    greeting: 'I already checked the room. It’s clear. Mostly.',
    likes: 'Star Cookie',
  },
  nightwing: {
    name: 'Nightwing', primary: '#24345c', light: '#c9dcff', deep: '#0c142a', accent: '#5a9eff',
    trait: 'Acrobatic — enters through the window and leaves through the conversation.',
    blurb: 'A black-and-blue acrobat with a domino mask, a wing-shaped crest, and two escrima sticks.',
    greeting: 'Missed me? You blinked. That’s on you.',
    likes: 'Berry Shake',
  },
  shazam: {
    name: 'Shazam', primary: '#d94f5c', light: '#ffe0e3', deep: '#5c1a22', accent: '#ffd166',
    trait: 'Thunderous — says the magic word and immediately regrets the lightning.',
    blurb: 'A red-and-gold champion with a white cape, a lightning bolt, and the heart of a kid.',
    greeting: 'Shazam! Wait — did I leave the stove on?',
    likes: 'Star Pop',
  },
  zatanna: {
    name: 'Zatanna', primary: '#3a2a5c', light: '#e6d9ff', deep: '#140a2a', accent: '#ffd166',
    trait: 'Backwards — says exactly what she means, in reverse.',
    blurb: 'A stage magician with a top hat, a white bow tie, and a wand that makes the impossible look easy.',
    greeting: 'Emos ewgnirts! That means “nice to meet you.”',
    likes: 'Moonberry Shake',
  },
  dcraven: {
    name: 'Raven', primary: '#6b5b9a', light: '#d9ccff', deep: '#241a3d', accent: '#e8574a',
    trait: 'Empathic — feels the room before anyone says a word.',
    blurb: 'A hooded mystic with a red gem, a dark cloak, and a shadow that sometimes has feathers.',
    greeting: 'Your aura is loud. I brought tea.',
    likes: 'Moon Cake',
  },
  starfire: {
    name: 'Starfire', primary: '#ff8a3c', light: '#ffe0b8', deep: '#7a2a0a', accent: '#7affd8',
    trait: 'Radiant — hugs first and asks about the atmosphere later.',
    blurb: 'A Tamaranean warrior with fiery hair, green starbolts, and a smile that could light a city.',
    greeting: 'I have learned a new Earth greeting. It is called “snack.”',
    likes: 'Sun Nectar',
  },
  beastboy: {
    name: 'Beast Boy', primary: '#4fae5a', light: '#d9ffdc', deep: '#174a1f', accent: '#ffd166',
    trait: 'Shapeshifting — turns into a tiger, a bird, or a very convincing couch.',
    blurb: 'A green changeling with pointed ears, a flicking tail, and an endless supply of animal facts.',
    greeting: 'Did you know a tiger can nap for eighteen hours? Goals.',
    likes: 'Fruit Gummies',
  },
  bluebeetle: {
    name: 'Blue Beetle', primary: '#2f6bff', light: '#c9deff', deep: '#102a7a', accent: '#7affd8',
    trait: 'Armored — the scarab has opinions, and most of them are about defense.',
    blurb: 'A blue-armored hero with a scarab backpack, glowing wings, and an antenna for trouble.',
    greeting: 'The scarab says danger. I say snacks. We compromised.',
    likes: 'Cloud Macaron',
  },
  static: {
    name: 'Static', primary: '#6b4f9e', light: '#e0d6ff', deep: '#24163f', accent: '#ffd166',
    trait: 'Charged — his hair stands up before a storm and after a good joke.',
    blurb: 'A purple-and-blue electro hero with a static disc, a lightning bolt, and a shock of white hair.',
    greeting: 'Don’t touch the hair. It’s already busy.',
    likes: 'Dew Fizz',
  },
  constantine: {
    name: 'John Constantine', primary: '#c9a26b', light: '#f2e0c2', deep: '#5c4225', accent: '#e8574a',
    trait: 'Hellblazing — solves magical disasters with a cigarette, a smirk, and a backup plan.',
    blurb: 'A trench-coated occult detective with a gold tie, a lighter, and a talent for bad luck.',
    greeting: 'I’ve seen worse. Usually right before it gets better.',
    likes: 'Warm Soup',
  },
  swampthing: {
    name: 'Swamp Thing', primary: '#4f7a3a', light: '#d9f2c2', deep: '#1f3a14', accent: '#ffd166',
    trait: 'Rooted — carries the whole swamp in his chest and a flower behind one ear.',
    blurb: 'A moss-covered guardian with leafy antlers, vine arms, and a very gentle growl.',
    greeting: 'The green says hello. It also says you should water your plants.',
    likes: 'Moon Berry',
  },
};
const DC_SPECIES = Object.keys(DC_KINDS);

const DC_GENES = {
  wonderwoman: { name: 'Amazonian Guard', icon: '🪢', desc: 'Pets build +35% bond and games pay +3 coins.', effect: { petBond: 1.35, gameCoins: 3 } },
  flash: { name: 'Speed Force', icon: '⚡', desc: 'Gifts arrive 30% sooner and energy fades 20% slower.', effect: { giftSpeed: 1.3, energyDecay: 0.8 } },
  greenlantern: { name: 'Willpower', icon: '💚', desc: '+20% XP and gifts arrive 20% sooner.', effect: { xp: 1.2, giftSpeed: 1.2 } },
  aquaman: { name: 'King of the Seas', icon: '🔱', desc: 'Chats pay +2 coins and needs fade 8% slower.', effect: { chatCoins: 2, decay: 0.92 } },
  cyborg: { name: 'Boom Circuit', icon: '🔌', desc: 'Games pay +3 coins and +15% XP.', effect: { gameCoins: 3, xp: 1.15 } },
  martian: { name: 'Shapechanger', icon: '🪐', desc: 'All needs fade 10% slower and +15% XP.', effect: { decay: 0.9, xp: 1.15 } },
  greenarrow: { name: 'Trick Arrow', icon: '🏹', desc: 'Games pay +3 coins and night games pay +2.', effect: { gameCoins: 3, nightCoins: 2 } },
  blackcanary: { name: 'Canary Cry', icon: '🎤', desc: 'Pets build +40% bond and games pay +2 coins.', effect: { petBond: 1.4, gameCoins: 2 } },
  supergirl: { name: 'Girl of Steel', icon: '☀️', desc: 'Day games pay +3 coins and +20% XP.', effect: { dayCoins: 3, xp: 1.2 } },
  batgirl: { name: 'Bat Signal', icon: '🦇', desc: 'Night games pay +3 coins and +15% XP.', effect: { nightCoins: 3, xp: 1.15 } },
  nightwing: { name: 'Acrobat', icon: '🪽', desc: 'Energy fades 20% slower and games pay +3 coins.', effect: { energyDecay: 0.8, gameCoins: 3 } },
  shazam: { name: 'Wisdom of Solomon', icon: '⚡', desc: 'Day games pay +3 coins and +20% XP.', effect: { dayCoins: 3, xp: 1.2 } },
  zatanna: { name: 'Backwards Magic', icon: '🎩', desc: 'Gifts arrive 25% sooner and chats pay +2 coins.', effect: { giftSpeed: 1.25, chatCoins: 2 } },
  dcraven: { name: 'Empathy', icon: '🔮', desc: 'Night games pay +4 coins and needs fade 8% slower.', effect: { nightCoins: 4, decay: 0.92 } },
  starfire: { name: 'Starbolt', icon: '🌟', desc: 'Day games pay +4 coins and games pay +2 more.', effect: { dayCoins: 4, gameCoins: 2 } },
  beastboy: { name: 'Wild Shape', icon: '🐾', desc: 'All needs fade 10% slower and pets build +30% bond.', effect: { decay: 0.9, petBond: 1.3 } },
  bluebeetle: { name: 'Scarab Armor', icon: '🪲', desc: 'Energy fades 20% slower and gifts arrive 20% sooner.', effect: { energyDecay: 0.8, giftSpeed: 1.2 } },
  static: { name: 'Static Charge', icon: '⚡', desc: 'Games pay +3 coins and energy fades 15% slower.', effect: { gameCoins: 3, energyDecay: 0.85 } },
  constantine: { name: 'Hellblazer', icon: '🕯️', desc: 'Night games pay +3 coins and chats pay +2 coins.', effect: { nightCoins: 3, chatCoins: 2 } },
  swampthing: { name: 'Green Growth', icon: '🌿', desc: 'All needs fade 12% slower and +20% XP.', effect: { decay: 0.88, xp: 1.2 } },
};

const DC_TITANS = {
  wonderwoman: 'Amazonian Titan',
  flash: 'Speed Force Titan',
  greenlantern: 'Willpower Titan',
  aquaman: 'Atlantis Titan',
  cyborg: 'Cyber Titan',
  martian: 'Mars Titan',
  greenarrow: 'Emerald Archer',
  blackcanary: 'Sonic Canary',
  supergirl: 'Kryptonian Titan',
  batgirl: 'Batgirl Titan',
  nightwing: 'Nightwing Titan',
  shazam: 'Shazam Titan',
  zatanna: 'Mystic Titan',
  dcraven: 'Azarath Titan',
  starfire: 'Tamaran Titan',
  beastboy: 'Changeling Titan',
  bluebeetle: 'Scarab Titan',
  static: 'Electro Titan',
  constantine: 'Hellblazer Titan',
  swampthing: 'Green Titan',
};

const DC_PRICES = {
  wonderwoman: 195,
  flash: 185,
  greenlantern: 180,
  aquaman: 175,
  cyborg: 175,
  martian: 170,
  greenarrow: 155,
  blackcanary: 150,
  supergirl: 190,
  batgirl: 155,
  nightwing: 155,
  shazam: 190,
  zatanna: 175,
  dcraven: 180,
  starfire: 185,
  beastboy: 155,
  bluebeetle: 175,
  static: 155,
  constantine: 170,
  swampthing: 185,
};

const DC_HYBRIDS = {
  'hero+wonderwoman': 'Amazon Star',
  'flash+volt': 'Speed Surge',
  'greenlantern+radiant': 'Emerald Dawn',
  'aquaman+tide': 'Ocean Crown',
  'cyborg+volt': 'Boom Circuit',
  'martian+stone': 'Mars Dust',
  'greenarrow+volt': 'Arrow Spark',
  'blackcanary+sonic': 'Sonic Cry',
  'radiant+supergirl': 'Solar Kryptonian',
  'batgirl+ghost': 'Bat Signal',
  'nightwing+sonic': 'Acrobat Dash',
  'shazam+volt': 'Shazam Spark',
  'dream+zatanna': 'Backwards Dream',
  'dcraven+dusk': 'Raven’s Shadow',
  'ember+starfire': 'Starbolt',
  'beastboy+bloom': 'Wild Green',
  'bluebeetle+crystal': 'Scarab Gem',
  'static+volt': 'Static Surge',
  'constantine+dusk': 'Hellblazer',
  'pond+swampthing': 'Green Mire',
};

const DC_HABITATS = {
  wonderwoman: ['grove', 'crystal', 'aurora'],
  flash: ['neon', 'savanna', 'grove'],
  greenlantern: ['neon', 'aurora', 'crystal'],
  aquaman: ['tide', 'reef'],
  cyborg: ['neon', 'crystal'],
  martian: ['night', 'aurora'],
  greenarrow: ['grove', 'savanna'],
  blackcanary: ['neon', 'night'],
  supergirl: ['aurora', 'neon'],
  batgirl: ['night', 'neon'],
  nightwing: ['night', 'neon'],
  shazam: ['aurora', 'crystal'],
  zatanna: ['dream', 'night'],
  dcraven: ['night', 'dream'],
  starfire: ['aurora', 'savanna'],
  beastboy: ['grove', 'savanna'],
  bluebeetle: ['neon', 'crystal'],
  static: ['neon', 'grove'],
  constantine: ['night', 'dream'],
  swampthing: ['grove', 'tide', 'dream'],
};

Object.assign(ELEMENTS, DC_KINDS);
Object.assign(GENE_POWERS, DC_GENES);
Object.assign(TITAN_NAMES, DC_TITANS);
Object.assign(TYPE_EGG_BASE_PRICE, DC_PRICES);
Object.assign(HYBRID_NAMES, DC_HYBRIDS);
Object.keys(DC_PRICES).forEach((key) => {
  TYPE_EGG_PRICE[key] = discountedEggPrice(DC_PRICES[key]);
});
ELEMENT_KEYS.push(...DC_SPECIES);
Object.entries(DC_HABITATS).forEach(([key, scenes]) => {
  scenes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});
