/* Franchise Waves 3.2: My Little Pony, television legends, the four realms,
   and Kingdom Hearts. Each row becomes a full Nest collectible with a gene,
   Titan, type egg, habitat, named hybrid, and original procedural art. */

const FRANCHISE_PALETTES = [
  ['#c86bff', '#f3ddff', '#4d176b', '#ffd166'],
  ['#ff8fb8', '#ffe3ee', '#701f43', '#8be9ff'],
  ['#72c7ff', '#dff5ff', '#164c78', '#ffd166'],
  ['#ffd166', '#fff5c9', '#73510a', '#ff7ac8'],
  ['#8fe07a', '#eaffdf', '#2d5c1a', '#ff9ec7'],
  ['#b79cff', '#eee6ff', '#33205e', '#7affd8'],
  ['#ff8a4c', '#ffe5d1', '#6b2a0a', '#ffe066'],
  ['#5ad6b8', '#dcfff7', '#105c4c', '#ffd166'],
  ['#d9a441', '#fff2c7', '#5c3a0a', '#b51f1f'],
  ['#ff6b8a', '#ffdce3', '#661429', '#8be9ff'],
  ['#5a9eff', '#e0ecff', '#163a73', '#ffd166'],
  ['#8a5cff', '#e9e0ff', '#2d1566', '#7affd8'],
  ['#6b8a4a', '#e4efd5', '#2b3d1b', '#ffcf5c'],
  ['#e08a4f', '#ffe9d4', '#5c2a0a', '#8be9ff'],
  ['#4b3f9e', '#e5e0ff', '#17104a', '#ff8fc8'],
  ['#3ecf8e', '#ddfff2', '#105c3a', '#ffd166'],
  ['#c9455c', '#ffdde3', '#4d1020', '#ffd166'],
  ['#8be9ff', '#e9fcff', '#155162', '#ff7ac8'],
  ['#b58ae8', '#f2e8ff', '#3d1f66', '#ffe066'],
  ['#ffb347', '#fff0d4', '#6b3a0a', '#5a9eff'],
];

function registerFranchiseWave(config) {
  const species = [];
  const byGroup = {};
  config.groupOrder.forEach((groupKey) => { byGroup[groupKey] = []; });
  config.rows.forEach((row, index) => {
    const [groupKey, key, name, subtitle, art] = row;
    const group = config.groups[groupKey];
    if (!group || ELEMENTS[key]) return;
    const palette = config.palettes[index % config.palettes.length];
    const [primary, light, deep, accent] = palette;
    const title = config.titan ? config.titan(name) : `${name} Titan`;
    ELEMENTS[key] = {
      name, primary, light, deep, accent,
      trait: `${group.trait} ${name} carries that signature everywhere.`,
      blurb: `${group.blurb} ${name} is the ${subtitle.toLowerCase()} signature.`,
      greeting: group.greetings[index % group.greetings.length],
      likes: group.likes,
      parentTypes: [config.parentType, group.label],
      catalogType: `${config.shortLabel} · ${subtitle}`,
      [config.flag]: true,
      [config.groupField]: groupKey,
      [config.artField]: art,
      [config.subtitleField]: subtitle,
      ...(config.flag === 'pony' ? { ponyMark: row[5] || 'star' } : {}),
    };
    GENE_POWERS[key] = {
      name: group.gene[0], icon: group.gene[1], desc: group.gene[2], effect: group.gene[3],
    };
    TITAN_NAMES[key] = title;
    const basePrice = group.price + (index % 4) * 5;
    TYPE_EGG_BASE_PRICE[key] = basePrice;
    TYPE_EGG_PRICE[key] = discountedEggPrice(basePrice);
    HYBRID_NAMES[pairKey(key, group.partner)] = `${name} ${group.suffix}`;
    NAME_START[key] = [...new Set([name.replace(/[“”"']/g, '').split(' ')[0], config.shortLabel, group.label.split(' ')[0], 'Little'])];
    group.homes.forEach((scene) => {
      if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
    });
    species.push(key);
    byGroup[groupKey].push(key);
  });
  ELEMENT_KEYS.push(...species);
  return { species, byGroup, total: species.length, groups: config.groups, order: config.groupOrder };
}

/* ---------------- My Little Pony ---------------- */

const PONY_GROUPS = {
  harmony: {
    label: 'Mane Six', icon: '💖', price: 195,
    homes: ['sugar', 'grove', 'dream'], likes: 'Honeycomb Cake', partner: 'bloom', suffix: 'Harmony',
    gene: ['Harmony Heart', '💖', 'Check-ins pay +6 bonus coins and completed tasks pay +4 bonus coins.', { checkinCoins: 6, taskCoins: 4 }],
    trait: 'Harmony-bound — makes every room a little kinder just by walking in.',
    blurb: 'A My Little Pony friend with a bright mane, a cutie mark, and a talent for turning ordinary days into friendship lessons.',
    greetings: [
      'Everypony ready? I brought snacks and a plan. Mostly snacks.',
      'A little kindness goes a long way. So does a well-timed cupcake.',
      'You look like you need a friend. Good news: I am right here.',
    ],
  },
  cutiemark: {
    label: 'Cutie Mark Crusaders', icon: '🎀', price: 180,
    homes: ['sugar', 'grove', 'world-alps'], likes: 'Star Cookie', partner: 'radiant', suffix: 'Crusade',
    gene: ['Crusader Spirit', '🎀', 'Check-ins pay +4 bonus coins and completed tasks pay +5 bonus coins. Gain +10% XP.', { checkinCoins: 4, taskCoins: 5, xp: 1.1 }],
    trait: 'Curious — will try absolutely anything twice if the first attempt is funny.',
    blurb: 'A young pony adventurer with a handmade cape, a big dream, and a cutie mark still waiting to appear.',
    greetings: [
      'We are definitely old enough for this. Probably.',
      'I made a list of things to try. It is mostly snacks and stunts.',
      'If this works, we get our cutie marks. If not, we get a story.',
    ],
  },
  royalty: {
    label: 'Royal Alicorns', icon: '👑', price: 230,
    homes: ['aurora', 'dream', 'crystal'], likes: 'Cloud Feast', partner: 'dream', suffix: 'Crown',
    gene: ['Royal Canter', '👑', 'Check-ins pay +7 bonus coins, completed tasks pay +3 bonus coins, and gifts arrive 15% sooner.', { checkinCoins: 7, taskCoins: 3, giftSpeed: 1.15 }],
    trait: 'Regal — raises the sun, the moon, or at least the room’s standards.',
    blurb: 'A royal pony with a flowing mane, a patient heart, and an entire sky’s worth of responsibility.',
    greetings: [
      'The day is yours. Try not to spend all of it napping. Again.',
      'A crown is heavy. A good friend makes it lighter.',
      'We have kept the stars in order for a thousand years. We can handle one picnic.',
    ],
  },
  town: {
    label: 'Ponyville Friends', icon: '🏡', price: 185,
    homes: ['grove', 'sugar', 'world-bavaria'], likes: 'Apple Tart', partner: 'earth', suffix: 'Neighbor',
    gene: ['Neighborly', '🏡', 'Check-ins pay +5 bonus coins and completed tasks pay +4 bonus coins. Joy fades 15% slower.', { checkinCoins: 5, taskCoins: 4, joyDecay: 0.85 }],
    trait: 'Grounded — knows every shortcut, every recipe, and every pony’s birthday.',
    blurb: 'A Ponyville local with a warm welcome, a useful talent, and a sense of timing that keeps the whole town running.',
    greetings: [
      'Come in, come in. The kettle is already on.',
      'I fixed the fence, the cake, and the scheduling conflict. What did I miss?',
      'Everypony has a job. Mine is making sure everypony else gets theirs done.',
    ],
  },
  hearts: {
    label: 'Sweethearts', icon: '🎵', price: 190,
    homes: ['sugar', 'dream', 'grove'], likes: 'Sweet Apple', partner: 'bloom', suffix: 'Duet',
    gene: ['Sweet Duet', '🎵', 'Check-ins pay +5 bonus coins, completed tasks pay +5 bonus coins, and chats pay +2 coins.', { checkinCoins: 5, taskCoins: 5, chatCoins: 2 }],
    trait: 'Sweet-natured — keeps a song in one hoof and a backup snack in the other.',
    blurb: 'A gentle pony sweetheart with a musical cutie mark, a shy smile, and a surprising amount of resolve.',
    greetings: [
      'I wrote a little song about today. It is mostly about snacks.',
      'Do you want to sit together for a while? No talking required.',
      'I am not shy. I am just saving my best hello for the right moment.',
    ],
  },
  villains: {
    label: 'Ponyvillains', icon: '🌩️', price: 220,
    homes: ['night', 'ember', 'crystal'], likes: 'Dark Berry', partner: 'dusk', suffix: 'Scheme',
    gene: ['Dramatic Scheme', '🌩️', 'Night games pay +5 coins, check-ins pay +3 bonus coins, and completed tasks pay +3 bonus coins.', { nightCoins: 5, checkinCoins: 3, taskCoins: 3 }],
    trait: 'Theatrical — has a monologue ready for every minor inconvenience.',
    blurb: 'A pony villain with a dramatic mane, an elaborate plan, and a weakness for being understood.',
    greetings: [
      'You are just in time for the villain song. Do not touch the prop moon.',
      'I am not defeated. I am between schemes.',
      'Everypony underestimates the power of a really good entrance.',
    ],
  },
};

const PONY_GROUP_ORDER = ['harmony', 'cutiemark', 'royalty', 'town', 'hearts', 'villains'];

/* [group, key, name, pony type, cutie mark] */
const PONY_DEFS = [
  ['harmony', 'pony_twilight', 'Twilight Sparkle', 'Alicorn of Friendship', 'star'],
  ['harmony', 'pony_applejack', 'Applejack', 'Earth pony', 'apple'],
  ['harmony', 'pony_rainbow', 'Rainbow Dash', 'Pegasus', 'bolt'],
  ['harmony', 'pony_pinkie', 'Pinkie Pie', 'Earth pony', 'balloon'],
  ['harmony', 'pony_fluttershy', 'Fluttershy', 'Pegasus', 'butterfly'],
  ['harmony', 'pony_rarity', 'Rarity', 'Unicorn', 'diamond'],
  ['cutiemark', 'pony_applebloom', 'Apple Bloom', 'Earth pony', 'apple'],
  ['cutiemark', 'pony_sweetiebelle', 'Sweetie Belle', 'Unicorn', 'note'],
  ['cutiemark', 'pony_scootaloo', 'Scootaloo', 'Pegasus', 'bolt'],
  ['royalty', 'pony_celestia', 'Princess Celestia', 'Alicorn of the Sun', 'sun'],
  ['royalty', 'pony_luna', 'Princess Luna', 'Alicorn of the Moon', 'moon'],
  ['royalty', 'pony_cadance', 'Princess Cadance', 'Alicorn of Love', 'heart'],
  ['royalty', 'pony_shiningarmor', 'Shining Armor', 'Unicorn captain', 'shield'],
  ['royalty', 'pony_sunset', 'Sunset Shimmer', 'Unicorn', 'sun'],
  ['town', 'pony_starlight', 'Starlight Glimmer', 'Unicorn', 'star'],
  ['town', 'pony_trixie', 'Trixie Lulamoon', 'Unicorn', 'moon'],
  ['town', 'pony_spike', 'Spike', 'Baby dragon', 'heart'],
  ['town', 'pony_bigmac', 'Big McIntosh', 'Earth pony', 'apple'],
  ['town', 'pony_granny', 'Granny Smith', 'Earth pony', 'apple'],
  ['town', 'pony_cheerilee', 'Cheerilee', 'Earth pony', 'flower'],
  ['town', 'pony_zecora', 'Zecora', 'Zebra', 'leaf'],
  ['town', 'pony_derpy', 'Derpy Hooves', 'Pegasus', 'bubble'],
  ['hearts', 'pony_lyra', 'Lyra Heartstrings', 'Unicorn', 'note'],
  ['hearts', 'pony_bonbon', 'Bon Bon', 'Earth pony', 'candy'],
  ['hearts', 'pony_maud', 'Maud Pie', 'Earth pony', 'rock'],
  ['hearts', 'pony_marble', 'Marble Pie', 'Earth pony', 'heart'],
  ['hearts', 'pony_limestone', 'Limestone Pie', 'Earth pony', 'rock'],
  ['villains', 'pony_chrysalis', 'Queen Chrysalis', 'Changeling queen', 'crown'],
  ['villains', 'pony_cozyglow', 'Cozy Glow', 'Pegasus schemer', 'heart'],
  ['villains', 'pony_sombra', 'King Sombra', 'Umbrum king', 'crown'],
  ['villains', 'pony_lightning', 'Lightning Dust', 'Pegasus', 'bolt'],
  ['villains', 'pony_discord', 'Discord', 'Draconequus', 'chaos'],
];

const PONY_WAVE = registerFranchiseWave({
  parentType: 'My Little Pony', shortLabel: 'Pony', flag: 'pony', groupField: 'ponyGroup',
  artField: 'ponyArt', subtitleField: 'ponyType', groups: PONY_GROUPS, groupOrder: PONY_GROUP_ORDER,
  rows: PONY_DEFS, palettes: FRANCHISE_PALETTES,
  titan: (name) => `${name.replace(/^(Princess|Queen|King|Granny)\s+/, '')} Titan`,
});
const PONY_SPECIES = PONY_WAVE.species;
const PONY_BY_GROUP = PONY_WAVE.byGroup;
let PONY_TOTAL = PONY_WAVE.total;

/* ---------------- TV Legends ---------------- */

const TV_LEGACY_GROUPS = {
  prestige: {
    label: 'Prestige TV', icon: '🎭', price: 215,
    homes: ['night', 'neon', 'grove'], likes: 'Ember Steak', partner: 'dusk', suffix: 'Finale',
    gene: ['Slow Burn', '🎭', 'Night games pay +5 coins and all needs fade 10% slower.', { nightCoins: 5, decay: 0.9 }],
    trait: 'Prestige — every quiet stare is a three-act story with a cold-open flashback.',
    blurb: 'A prestige-television lead with a complicated past, a signature look, and at least one monologue in the rain.',
    greetings: [
      'Previously on my life: everything went wrong. Tonight, we fix one thing.',
      'I do not do small talk. I do twelve-episode arcs.',
      'The camera loves me. The feeling is complicated.',
    ],
  },
  sitcom: {
    label: 'Sitcom Legends', icon: '🛋️', price: 195,
    homes: ['sugar', 'grove', 'neon'], likes: 'Cereal Bowl', partner: 'bloom', suffix: 'Cold Open',
    gene: ['Laugh Track', '🛋️', 'Chats pay +3 coins, pets pay +2 coins, and check-ins pay +2 bonus coins.', { chatCoins: 3, petCoins: 2, checkinCoins: 2 }],
    trait: 'Ensemble — cannot leave the room without one last punchline.',
    blurb: 'A sitcom legend with perfect comic timing, a familiar couch, and a friendship that survives every season finale.',
    greetings: [
      'Nobody move. I have the perfect joke and nowhere else to be.',
      'We are a found family. Unfortunately, nobody found the remote.',
      'This is a normal Tuesday. Please laugh on cue.',
    ],
  },
  scifi: {
    label: 'Sci-Fi TV', icon: '🛰️', price: 220,
    homes: ['neon', 'crystal', 'aurora'], likes: 'Nova Nectar', partner: 'volt', suffix: 'Signal',
    gene: ['Final Frontier', '🛰️', 'Games pay +4 coins and gain +16% XP.', { gameCoins: 4, xp: 1.16 }],
    trait: 'Far-reaching — has seen the edge of the map and packed a snack for the return trip.',
    blurb: 'A science-fiction television icon with a ship, a crew, and a knack for making first contact look easy.',
    greetings: [
      'Space is big. The snack drawer is bigger.',
      'The ship is fine. The timeline is mostly fine.',
      'Strange new worlds, same old paperwork.',
    ],
  },
  fantasy: {
    label: 'Fantasy TV', icon: '🐉', price: 225,
    homes: ['crystal', 'ember', 'aurora'], likes: 'Honeycomb Cake', partner: 'crystal', suffix: 'Saga',
    gene: ['Thronebound', '🐉', 'Night games pay +5 coins and gain +15% XP.', { nightCoins: 5, xp: 1.15 }],
    trait: 'Saga-sized — has a family tree, a prophecy, and a very sharp outfit.',
    blurb: 'A fantasy-television ruler or rogue with a kingdom-sized problem and a dragon-sized entrance.',
    greetings: [
      'The realm is mine. The snacks are negotiable.',
      'Every family reunion needs a treaty and a good table.',
      'Winter is coming. I brought a coat and three backup plans.',
    ],
  },
  animated: {
    label: 'Animated TV', icon: '📺', price: 195,
    homes: ['sugar', 'dream', 'neon'], likes: 'Star Pop', partner: 'radiant', suffix: 'Episode',
    gene: ['Saturday Morning', '📺', 'Day games pay +4 coins, joy fades 20% slower, and check-ins pay +2 bonus coins.', { dayCoins: 4, joyDecay: 0.8, checkinCoins: 2 }],
    trait: 'Animated — defies physics for a gag and lands the emotional beat anyway.',
    blurb: 'An animated-television hero with a theme song, a signature catchphrase, and a world that runs on cartoon logic.',
    greetings: [
      'Theme song? Check. Impossible plan? Check. Snacks? Double check.',
      'We have twelve minutes to save the world. Do not waste them on exposition.',
      'Everything is fine. The background is spinning, but everything is fine.',
    ],
  },
};

const TV_LEGACY_GROUP_ORDER = ['prestige', 'sitcom', 'scifi', 'fantasy', 'animated'];

/* [group, key, name, show, art] */
const TV_LEGACY_DEFS = [
  ['prestige', 'tv_walter', 'Walter White', 'Breaking Bad', 'antihero'],
  ['prestige', 'tv_jesse', 'Jesse Pinkman', 'Breaking Bad', 'antihero'],
  ['prestige', 'tv_eleven', 'Eleven', 'Stranger Things', 'psychic'],
  ['prestige', 'tv_steve', 'Steve Harrington', 'Stranger Things', 'hero'],
  ['prestige', 'tv_rick', 'Rick Grimes', 'The Walking Dead', 'survivor'],
  ['prestige', 'tv_daryl', 'Daryl Dixon', 'The Walking Dead', 'hunter'],
  ['prestige', 'tv_michonne', 'Michonne', 'The Walking Dead', 'blade'],
  ['prestige', 'tv_dexter', 'Dexter Morgan', 'Dexter', 'killer'],
  ['prestige', 'tv_house', 'Gregory House', 'House', 'doctor'],
  ['prestige', 'tv_sherlock', 'Sherlock Holmes', 'Sherlock', 'detective'],
  ['sitcom', 'tv_michael', 'Michael Scott', 'The Office', 'office'],
  ['sitcom', 'tv_dwight', 'Dwight Schrute', 'The Office', 'office'],
  ['sitcom', 'tv_jim', 'Jim Halpert', 'The Office', 'office'],
  ['sitcom', 'tv_pam', 'Pam Beesly', 'The Office', 'office'],
  ['sitcom', 'tv_rachel', 'Rachel Green', 'Friends', 'friend'],
  ['sitcom', 'tv_chandler', 'Chandler Bing', 'Friends', 'friend'],
  ['sitcom', 'tv_phoebe', 'Phoebe Buffay', 'Friends', 'friend'],
  ['sitcom', 'tv_sheldon', 'Sheldon Cooper', 'The Big Bang Theory', 'genius'],
  ['sitcom', 'tv_tedlasso', 'Ted Lasso', 'Ted Lasso', 'coach'],
  ['sitcom', 'tv_eleanor', 'Eleanor Shellstrop', 'The Good Place', 'architect'],
  ['scifi', 'tv_kirk', 'James T. Kirk', 'Star Trek', 'captain'],
  ['scifi', 'tv_spock', 'Spock', 'Star Trek', 'vulcan'],
  ['scifi', 'tv_picard', 'Jean-Luc Picard', 'Star Trek', 'captain'],
  ['scifi', 'tv_mulder', 'Fox Mulder', 'The X-Files', 'agent'],
  ['scifi', 'tv_scully', 'Dana Scully', 'The X-Files', 'agent'],
  ['scifi', 'tv_adama', 'William Adama', 'Battlestar Galactica', 'admiral'],
  ['scifi', 'tv_starbuck', 'Kara Thrace', 'Battlestar Galactica', 'pilot'],
  ['scifi', 'tv_doctor', 'The Doctor', 'Doctor Who', 'time'],
  ['fantasy', 'tv_daenerys', 'Daenerys Targaryen', 'Game of Thrones', 'royal'],
  ['fantasy', 'tv_jon', 'Jon Snow', 'Game of Thrones', 'ranger'],
  ['fantasy', 'tv_arya', 'Arya Stark', 'Game of Thrones', 'assassin'],
  ['fantasy', 'tv_tyrion', 'Tyrion Lannister', 'Game of Thrones', 'strategist'],
  ['fantasy', 'tv_wednesday', 'Wednesday Addams', 'Wednesday', 'goth'],
  ['fantasy', 'tv_morticia', 'Morticia Addams', 'The Addams Family', 'goth'],
  ['animated', 'tv_fry', 'Philip J. Fry', 'Futurama', 'toon'],
  ['animated', 'tv_leela', 'Turanga Leela', 'Futurama', 'toon'],
  ['animated', 'tv_bender', 'Bender', 'Futurama', 'robot'],
  ['animated', 'tv_ash', 'Ash Ketchum', 'Pokémon', 'trainer'],
  ['animated', 'tv_aang', 'Aang', 'Avatar: The Last Airbender', 'monk'],
  ['animated', 'tv_zuko', 'Zuko', 'Avatar: The Last Airbender', 'fire'],
];

const TV_LEGACY_WAVE = registerFranchiseWave({
  parentType: 'TV Legends', shortLabel: 'TV', flag: 'tvLegacy', groupField: 'tvLegacyGroup',
  artField: 'tvArt', subtitleField: 'tvShow', groups: TV_LEGACY_GROUPS, groupOrder: TV_LEGACY_GROUP_ORDER,
  rows: TV_LEGACY_DEFS, palettes: FRANCHISE_PALETTES,
});
const TV_LEGACY_SPECIES = TV_LEGACY_WAVE.species;
const TV_LEGACY_BY_GROUP = TV_LEGACY_WAVE.byGroup;
let TV_LEGACY_TOTAL = TV_LEGACY_WAVE.total;

/* ---------------- Horror, dark horror, light & darkness ---------------- */

const REALM_WAVE_GROUPS = {
  horror: {
    label: 'Horror', icon: '🕯️', price: 205,
    homes: ['night', 'ember', 'world-bavaria'], likes: 'Midnight Tea', partner: 'dusk', suffix: 'Fright',
    gene: ['Night Signal', '🕯️', 'Night games pay +5 coins and gifts arrive 20% sooner.', { nightCoins: 5, giftSpeed: 1.2 }],
    trait: 'Unsettling — the room gets quieter before they even speak.',
    blurb: 'A horror sprite with a lantern, a long shadow, and a story that gets stranger every time it is retold.',
    greetings: [
      'The house is not haunted. The house is just particular.',
      'Do not look behind you. I already did.',
      'Every light casts a shadow. Mine just happens to wave back.',
    ],
  },
  darkhorror: {
    label: 'Dark Horror', icon: '🩸', price: 230,
    homes: ['night', 'crystal', 'ember'], likes: 'Black Cherry', partner: 'demon', suffix: 'Dread',
    gene: ['Dread Engine', '🩸', 'Night games pay +6 coins and gain +18% XP.', { nightCoins: 6, xp: 1.18 }],
    trait: 'Dreadful — arrives after the warning and stays for the sequel.',
    blurb: 'A darker horror sprite with a broken halo, a sealed book, and a patient hunger for the last word.',
    greetings: [
      'You opened the door. That was the whole ritual.',
      'I am not the monster under the bed. I am the reason it left.',
      'The dark does not need a voice. But it likes one.',
    ],
  },
  light: {
    label: 'Light', icon: '☀️', price: 215,
    homes: ['aurora', 'dream', 'crystal'], likes: 'Sunfruit', partner: 'radiant', suffix: 'Dawn',
    gene: ['First Light', '☀️', 'Day games pay +5 coins, pets build +35% bond, and check-ins pay +2 bonus coins.', { dayCoins: 5, petBond: 1.35, checkinCoins: 2 }],
    trait: 'Luminous — makes even a bad morning look like the start of something.',
    blurb: 'A light sprite with a warm halo, a clear voice, and the kind of glow that makes shadows feel invited rather than afraid.',
    greetings: [
      'Good morning. I brought the sun. You are welcome.',
      'A little light is enough to change the whole room.',
      'You do not have to be bright all the time. Just do not go out.',
    ],
  },
  darkness: {
    label: 'Darkness', icon: '🌑', price: 225,
    homes: ['night', 'crystal', 'dream'], likes: 'Moon Cake', partner: 'dusk', suffix: 'Umbra',
    gene: ['Void Quiet', '🌑', 'Night games pay +5 coins and all needs fade 12% slower.', { nightCoins: 5, decay: 0.88 }],
    trait: 'Quiet — holds a whole night sky in a body the size of a pillow.',
    blurb: 'A darkness sprite with a crescent grin, a orbit of tiny stars, and a heart that beats very slowly and very warmly.',
    greetings: [
      'The dark is not empty. It is full of things that prefer quiet.',
      'Turn off the light. I will keep an eye on the stars.',
      'You can be afraid and still be safe. I will sit with you.',
    ],
  },
};

const REALM_WAVE_ORDER = ['horror', 'darkhorror', 'light', 'darkness'];

/* [group, key, name, role, art] */
const REALM_WAVE_DEFS = [
  ['horror', 'horror_palestag', 'The Pale Stag', 'Antlered omen', 'pale'],
  ['horror', 'horror_lanternwidow', 'Lantern Widow', 'Webbed lantern', 'widow'],
  ['horror', 'horror_staticman', 'The Static Man', 'Signal intruder', 'static'],
  ['horror', 'horror_hollowbride', 'Hollow Bride', 'Veiled promise', 'bride'],
  ['horror', 'horror_mirrorchild', 'Mirror Child', 'Reflected guest', 'mirror'],
  ['horror', 'horror_drownedchoir', 'Drowned Choir', 'Sunken hymn', 'choir'],
  ['horror', 'horror_scarecrow', 'The Last Scarecrow', 'Field watcher', 'scarecrow'],
  ['horror', 'horror_nightbus', 'The Night Bus', 'Last stop', 'bus'],
  ['darkhorror', 'darkhorror_graveengine', 'Grave Engine', 'Buried machine', 'engine'],
  ['darkhorror', 'darkhorror_blackabbot', 'The Black Abbot', 'Sealed order', 'abbot'],
  ['darkhorror', 'darkhorror_skinbook', 'Skinbound Book', 'Living chapter', 'book'],
  ['darkhorror', 'darkhorror_redroom', 'The Red Room', 'Impossible parlor', 'room'],
  ['darkhorror', 'darkhorror_bonelord', 'Bone Sovereign', 'Crowned remains', 'bone'],
  ['darkhorror', 'darkhorror_weepingwall', 'The Weeping Wall', 'Mourning stone', 'wall'],
  ['darkhorror', 'darkhorror_ashhound', 'Ash Hound', 'Cinder pursuer', 'hound'],
  ['darkhorror', 'darkhorror_voidchoir', 'Void Choir', 'Hymnless chorus', 'choir'],
  ['light', 'light_dawnkeeper', 'Dawnkeeper', 'Keeper of mornings', 'dawn'],
  ['light', 'light_halo', 'Halo Sprite', 'Soft halo', 'halo'],
  ['light', 'light_prism', 'Prism Messenger', 'Colour courier', 'prism'],
  ['light', 'light_sunmane', 'Sunmane', 'Golden mane', 'sun'],
  ['light', 'light_glassbird', 'Glasswing', 'Sunlit flyer', 'bird'],
  ['light', 'light_starwell', 'Starwell', 'Wish gatherer', 'star'],
  ['light', 'light_lumen', 'Lumen', 'Little lamp', 'lumen'],
  ['light', 'light_firstcandle', 'First Candle', 'Old flame', 'candle'],
  ['darkness', 'darkness_umbra', 'Umbra', 'Soft shadow', 'umbra'],
  ['darkness', 'darkness_voidling', 'Voidling', 'Pocket void', 'void'],
  ['darkness', 'darkness_nightglass', 'Nightglass', 'Dark mirror', 'glass'],
  ['darkness', 'darkness_eclipse', 'Eclipse', 'Hidden sun', 'eclipse'],
  ['darkness', 'darkness_shade', 'Shade', 'Quiet companion', 'shade'],
  ['darkness', 'darkness_hollowmoon', 'Hollow Moon', 'Crescent heart', 'moon'],
  ['darkness', 'darkness_abyss', 'Abyss', 'Deep watcher', 'abyss'],
  ['darkness', 'darkness_blackstar', 'Black Star', 'Fallen light', 'star'],
];

const REALM_WAVE = registerFranchiseWave({
  parentType: 'Four Realms', shortLabel: 'Realm', flag: 'realmWave', groupField: 'realmGroup',
  artField: 'realmArt', subtitleField: 'realmRole', groups: REALM_WAVE_GROUPS, groupOrder: REALM_WAVE_ORDER,
  rows: REALM_WAVE_DEFS, palettes: FRANCHISE_PALETTES,
});
const REALM_SPECIES = REALM_WAVE.species;
const REALM_BY_GROUP = REALM_WAVE.byGroup;
const REALM_TOTAL = REALM_WAVE.total;
const HORROR_SPECIES = REALM_BY_GROUP.horror;
const DARK_HORROR_SPECIES = REALM_BY_GROUP.darkhorror;
const LIGHT_SPECIES = REALM_BY_GROUP.light;
const DARKNESS_SPECIES = REALM_BY_GROUP.darkness;

/* ---------------- Kingdom Hearts ---------------- */

const KH_GROUPS = {
  destiny: {
    label: 'Destiny Islands', icon: '🌴', price: 235,
    homes: ['tide', 'grove', 'dream'], likes: 'Sea-Salt Ice Cream', partner: 'tide', suffix: 'Key',
    gene: ['Keyblade Bond', '🗝️', 'Games pay +4 coins and pets build +35% bond.', { gameCoins: 4, petBond: 1.35 }],
    trait: 'Keyblade-bound — opens doors that should not exist and makes friends in every world.',
    blurb: 'A Kingdom Hearts hero with a keyblade, a heart full of promises, and a talent for finding the light in strange places.',
    greetings: [
      'There are other worlds out there. Want to go see them?',
      'My friends are my power. Also, this key is surprisingly good at opening snack cabinets.',
      'We are not lost. We are on a very long side quest.',
    ],
  },
  organization: {
    label: 'Organization XIII', icon: '🖤', price: 245,
    homes: ['night', 'neon', 'crystal'], likes: 'Moon Cake', partner: 'dusk', suffix: 'Nobody',
    gene: ['Nobody’s Grin', '🖤', 'Night games pay +5 coins and gifts arrive 20% sooner.', { nightCoins: 5, giftSpeed: 1.2 }],
    trait: 'Organization — has a coat, a title, and a plan involving at least three impossible doors.',
    blurb: 'An Organization XIII member with a black coat, a numbered purpose, and a heart they insist they do not have.',
    greetings: [
      'The superior will see you now. He is very busy being ominous.',
      'I have no heart. I do, however, have a schedule.',
      'Nothing is true. The coat, unfortunately, is dry-clean only.',
    ],
  },
  seasalt: {
    label: 'Sea-Salt Trio', icon: '🍦', price: 230,
    homes: ['tide', 'dream', 'crystal'], likes: 'Sea-Salt Ice Cream', partner: 'dream', suffix: 'Memory',
    gene: ['Sea-Salt Memory', '🍦', 'Pets build +40% bond, chats pay +2 coins, and gain +12% XP.', { petBond: 1.4, chatCoins: 2, xp: 1.12 }],
    trait: 'Remembering — holds a summer that may or may not have happened.',
    blurb: 'A Keyblade wielder shaped by memory, missing friends, and one perfect ice cream on the clock tower.',
    greetings: [
      'We should get sea-salt ice cream. It tastes like a promise.',
      'I remember you. I think that means we met somewhere important.',
      'Some memories are worth keeping even when they hurt.',
    ],
  },
  wayfinder: {
    label: 'Wayfinder Trio', icon: '💠', price: 240,
    homes: ['aurora', 'crystal', 'world-hokkaido'], likes: 'Star Fruit', partner: 'crystal', suffix: 'Way',
    gene: ['Wayfinder', '💠', 'Gain +18% XP and day games pay +3 coins.', { xp: 1.18, dayCoins: 3 }],
    trait: 'Wayfinding — follows a star, a promise, and a training regimen that would exhaust a Titan.',
    blurb: 'A Keyblade Master or apprentice with a Wayfinder charm, a heavy responsibility, and a friend worth crossing worlds for.',
    greetings: [
      'A true Keyblade Master protects the people who cannot protect themselves.',
      'I made a promise. I intend to keep it.',
      'The path is not always clear. That is why we have friends.',
    ],
  },
  villains: {
    label: 'Seekers of Darkness', icon: '🌑', price: 250,
    homes: ['night', 'ember', 'crystal'], likes: 'Dark Berry', partner: 'dusk', suffix: 'Darkness',
    gene: ['Darkness Within', '🌑', 'Night games pay +6 coins and all needs fade 8% slower.', { nightCoins: 6, decay: 0.92 }],
    trait: 'Seeking — believes every heart has a door and every door should be opened.',
    blurb: 'A Kingdom Hearts villain with a dark plan, a keyblade, and a truly unreasonable amount of patience.',
    greetings: [
      'Darkness is not evil. It is simply honest.',
      'Every heart has a door. I brought the key.',
      'You cannot destroy darkness. You can only choose what to do with it.',
    ],
  },
  keyblade: {
    label: 'Keyblade Legacy', icon: '✨', price: 255,
    homes: ['aurora', 'dream', 'world-hokkaido'], likes: 'Star Fruit', partner: 'radiant', suffix: 'Legacy',
    gene: ['Foreteller', '✨', 'Gifts arrive 25% sooner and gain +15% XP.', { giftSpeed: 1.25, xp: 1.15 }],
    trait: 'Foretold — carries a Keyblade from before the war and a secret from after it.',
    blurb: 'A Keyblade legacy figure with a ancient key, a forgotten world, and a role in a story still being written.',
    greetings: [
      'The Keyblade chooses. The heart decides what to do next.',
      'I have seen the end of this story. It is not the end.',
      'Some doors are opened from both sides.',
    ],
  },
};

const KH_GROUP_ORDER = ['destiny', 'organization', 'seasalt', 'wayfinder', 'villains', 'keyblade'];

/* [group, key, name, world, art] */
const KH_DEFS = [
  ['destiny', 'kh_sora', 'Sora', 'Destiny Islands', 'crown'],
  ['destiny', 'kh_riku', 'Riku', 'Destiny Islands', 'keyblade'],
  ['destiny', 'kh_kairi', 'Kairi', 'Destiny Islands', 'heart'],
  ['destiny', 'kh_donald', 'Donald Duck', 'Disney Castle', 'mage'],
  ['destiny', 'kh_goofy', 'Goofy', 'Disney Castle', 'guard'],
  ['destiny', 'kh_mickey', 'King Mickey', 'Disney Castle', 'king'],
  ['organization', 'kh_xemnas', 'Xemnas', 'The World That Never Was', 'nobody'],
  ['organization', 'kh_xigbar', 'Xigbar', 'The World That Never Was', 'guns'],
  ['organization', 'kh_xaldin', 'Xaldin', 'The World That Never Was', 'lance'],
  ['organization', 'kh_vexen', 'Vexen', 'The World That Never Was', 'shield'],
  ['organization', 'kh_lexaeus', 'Lexaeus', 'The World That Never Was', 'axe'],
  ['organization', 'kh_zexion', 'Zexion', 'The World That Never Was', 'book'],
  ['organization', 'kh_saix', 'Saïx', 'The World That Never Was', 'claymore'],
  ['organization', 'kh_axel', 'Axel', 'The World That Never Was', 'chakram'],
  ['organization', 'kh_demyx', 'Demyx', 'The World That Never Was', 'sitar'],
  ['organization', 'kh_luxord', 'Luxord', 'The World That Never Was', 'cards'],
  ['organization', 'kh_marluxia', 'Marluxia', 'Castle Oblivion', 'scythe'],
  ['organization', 'kh_larxene', 'Larxene', 'Castle Oblivion', 'knives'],
  ['organization', 'kh_roxas', 'Roxas', 'Twilight Town', 'keyblade'],
  ['seasalt', 'kh_xion', 'Xion', 'Twilight Town', 'shell'],
  ['seasalt', 'kh_namine', 'Naminé', 'Castle Oblivion', 'sketch'],
  ['wayfinder', 'kh_terra', 'Terra', 'Land of Departure', 'earth'],
  ['wayfinder', 'kh_aqua', 'Aqua', 'Land of Departure', 'water'],
  ['wayfinder', 'kh_ventus', 'Ventus', 'Land of Departure', 'wind'],
  ['wayfinder', 'kh_eraqus', 'Master Eraqus', 'Land of Departure', 'master'],
  ['wayfinder', 'kh_vanitas', 'Vanitas', 'Keyblade Graveyard', 'mask'],
  ['wayfinder', 'kh_youngxehanort', 'Young Xehanort', 'Destiny Islands', 'time'],
  ['villains', 'kh_ansem', 'Ansem, Seeker of Darkness', 'End of the World', 'darkness'],
  ['villains', 'kh_darkriku', 'Dark Riku', 'Hollow Bastion', 'darkness'],
  ['villains', 'kh_maleficent', 'Maleficent', 'Hollow Bastion', 'witch'],
  ['villains', 'kh_pete', 'Pete', 'Disney Castle', 'brawler'],
  ['villains', 'kh_masterxehanort', 'Master Xehanort', 'Scala ad Caelum', 'master'],
  ['villains', 'kh_xehanort', 'Xehanort', 'Scala ad Caelum', 'darkness'],
  ['keyblade', 'kh_ephemer', 'Ephemer', 'Daybreak Town', 'star'],
  ['keyblade', 'kh_skuld', 'Skuld', 'Daybreak Town', 'star'],
  ['keyblade', 'kh_strelitzia', 'Strelitzia', 'Daybreak Town', 'flower'],
  ['keyblade', 'kh_chirithy', 'Chirithy', 'Daybreak Town', 'dream'],
  ['keyblade', 'kh_yozora', 'Yozora', 'Shinjuku', 'blade'],
  ['keyblade', 'kh_masterofmasters', 'The Master of Masters', 'Daybreak Town', 'master'],
  ['keyblade', 'kh_luxu', 'Luxu', 'Daybreak Town', 'keyblade'],
];

const KH_WAVE = registerFranchiseWave({
  parentType: 'Kingdom Hearts', shortLabel: 'Kingdom Hearts', flag: 'kingdomHearts', groupField: 'khGroup',
  artField: 'khArt', subtitleField: 'khWorld', groups: KH_GROUPS, groupOrder: KH_GROUP_ORDER,
  rows: KH_DEFS, palettes: FRANCHISE_PALETTES,
});
const KH_SPECIES = KH_WAVE.species;
const KH_BY_GROUP = KH_WAVE.byGroup;
let KH_TOTAL = KH_WAVE.total;
let FRANCHISE_WAVE_TOTAL = PONY_TOTAL + TV_LEGACY_TOTAL + REALM_TOTAL + KH_TOTAL;
