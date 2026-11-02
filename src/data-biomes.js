/* Type biomes, exotic guardians, and the secret vault.
   Loaded after data-pokedex.js so each type biome can gather every Pokémon species. */

const BIOME_DEFS = {
  normal: {
    name: 'Wildmeadow', habitat: 'Normal', emoji: '🌾',
    blurb: 'Soft grass, winding paths, and room for every ordinary adventure.',
    guardian: {
      key: 'exnormal', name: 'Meadow Warden', trait: 'Boundary — keeps every path in the Hollow safe.',
      blurb: 'An exotic guardian with a satchel of maps and a soft spot for lost travelers.',
      greeting: 'The path is open. I checked twice.', likes: 'Honeycomb Cake',
      gene: ['Open Path', '🧭', 'Pets build 25% more bond and all needs fade 8% slower.', { petBond: 1.25, decay: 0.92 }],
      titan: 'Meadow Colossus',
    },
  },
  fire: {
    name: 'Cinder Caldera', habitat: 'Fire', emoji: '🔥',
    blurb: 'A warm stone basin where the air shimmers and every step sparks.',
    guardian: {
      key: 'exfire', name: 'Cinder Regent', trait: 'Caldera — wears the heat like a crown.',
      blurb: 'An exotic guardian born in a cooled lava hollow, carrying a lantern that never goes out.',
      greeting: 'You brought snacks? Excellent. The throne is negotiable.', likes: 'Ember Steak',
      gene: ['Caldera Heart', '🌋', '+18% XP and games pay +3 coins.', { xp: 1.18, gameCoins: 3 }],
      titan: 'Caldera Sovereign',
    },
  },
  water: {
    name: 'Azure Lagoon', habitat: 'Water', emoji: '💧',
    blurb: 'Clear shallows, floating lanterns, and a tide that hums in its sleep.',
    guardian: {
      key: 'exwater', name: 'Tidecaller', trait: 'Current — hears the mood of every wave.',
      blurb: 'An exotic guardian who keeps the lagoon’s tide charts in a shell-bound book.',
      greeting: 'The water likes you. That is a high compliment.', likes: 'River Fillet',
      gene: ['Deep Current', '🌊', 'Needs fade 10% slower and gifts arrive 18% sooner.', { decay: 0.9, giftSpeed: 1.18 }],
      titan: 'Abyssal Tide',
    },
  },
  electric: {
    name: 'Static Spire', habitat: 'Electric', emoji: '⚡',
    blurb: 'A humming tower of glass and copper where storms come to recharge.',
    guardian: {
      key: 'exelectric', name: 'Volt Warden', trait: 'Charged — a calm center inside a thunderclap.',
      blurb: 'An exotic guardian with a lightning rod tail and a patient, grounded heart.',
      greeting: 'Stand back. No — closer. I am only slightly dangerous.', likes: 'Star Pop',
      gene: ['Live Current', '🔌', 'Games pay +5 coins and pets pay +1 coin.', { gameCoins: 5, petCoins: 1 }],
      titan: 'Thunder Spire',
    },
  },
  grass: {
    name: 'Verdant Terrace', habitat: 'Grass', emoji: '🍃',
    blurb: 'Stepped gardens, singing reeds, and sunlight caught in every leaf.',
    guardian: {
      key: 'exgrass', name: 'Verdant Warden', trait: 'Evergrowth — plants a promise wherever it walks.',
      blurb: 'An exotic guardian whose antlers bloom with a different flower each season.',
      greeting: 'I grew you a chair. It is mostly moss. Sit.', likes: 'Moon Berry',
      gene: ['Evergrowth', '🌿', 'Snacks give +35% XP and hunger fades 15% slower.', { snackXp: 1.35, hungerDecay: 0.85 }],
      titan: 'World Garden',
    },
  },
  ice: {
    name: 'Frostglint Fjord', habitat: 'Ice', emoji: '❄️',
    blurb: 'Blue ice, silent snow, and northern lights caught under the water.',
    guardian: {
      key: 'exice', name: 'Frost Sovereign', trait: 'Permafrost — still on the surface, busy underneath.',
      blurb: 'An exotic guardian with a crown of old ice and a pocket full of snowdrops.',
      greeting: 'Your nose is cold. Mine is colder. We match.', likes: 'Warm Soup',
      gene: ['Permafrost', '🧊', 'Energy and cleanliness fade 20% slower.', { energyDecay: 0.8, cleanDecay: 0.8 }],
      titan: 'Eternal Winter',
    },
  },
  fighting: {
    name: 'Iron Dojo', habitat: 'Fighting', emoji: '🥊',
    blurb: 'A cliffside training hall where every challenge ends in a shared meal.',
    guardian: {
      key: 'exfighting', name: 'Iron Challenger', trait: 'Disciplined — trains hard, celebrates harder.',
      blurb: 'An exotic guardian with wrapped paws and a belt covered in tiny victory knots.',
      greeting: 'One round. Then snacks. This is the rule.', likes: 'Juicy Drumstick',
      gene: ['Perfect Form', '🥋', 'Pets build 30% more bond and games pay +3 coins.', { petBond: 1.3, gameCoins: 3 }],
      titan: 'Champion Eternal',
    },
  },
  poison: {
    name: 'Miasma Marsh', habitat: 'Poison', emoji: '☠️',
    blurb: 'Bubbling pools, glowing reeds, and a thousand useful little secrets.',
    guardian: {
      key: 'expoison', name: 'Miasma Alchemist', trait: 'Tricky — labels every bottle and trusts none of them.',
      blurb: 'An exotic guardian with a bandolier of tinctures and a very careful stirring hand.',
      greeting: 'Do not drink the green one. Or the purple one. Ask first.', likes: 'Moon Cake',
      gene: ['Toxin Bloom', '🧪', 'Night games pay +4 coins and hunger fades 15% slower.', { nightCoins: 4, hungerDecay: 0.85 }],
      titan: 'Plaguebloom',
    },
  },
  ground: {
    name: 'Dustbadge Canyon', habitat: 'Ground', emoji: '🏜️',
    blurb: 'Red walls, buried rivers, and a wind that draws new maps in the dust.',
    guardian: {
      key: 'exground', name: 'Dune Architect', trait: 'Patient — builds roads one grain at a time.',
      blurb: 'An exotic guardian carrying a level and a chisel, with a city planned in its head.',
      greeting: 'Mind the trench. I am building something important.', likes: 'Honeycomb Cake',
      gene: ['Bedrock Blueprint', '⛰️', 'All needs fade 12% slower and hunger fades 15% slower.', { decay: 0.88, hungerDecay: 0.85 }],
      titan: 'Continental Fault',
    },
  },
  flying: {
    name: 'Cloudstep Aerie', habitat: 'Flying', emoji: '🪽',
    blurb: 'A ring of high nests above the clouds, connected by rope bridges and updrafts.',
    guardian: {
      key: 'exflying', name: 'Sky Courier', trait: 'Breezy — never late, often sideways.',
      blurb: 'An exotic guardian with a satchel of letters and a scarf that points toward home.',
      greeting: 'I have a letter for you. It just says “snacks.”', likes: 'Cloud Feast',
      gene: ['Tailwind Route', '🪁', 'Gifts arrive 28% sooner and energy fades 12% slower.', { giftSpeed: 1.28, energyDecay: 0.88 }],
      titan: 'Stratos',
    },
  },
  psychic: {
    name: 'Mindveil Observatory', habitat: 'Psychic', emoji: '🔮',
    blurb: 'A quiet dome of drifting lenses where thoughts look like constellations.',
    guardian: {
      key: 'expsychic', name: 'Mind Prism', trait: 'Focused — thinks in colors instead of words.',
      blurb: 'An exotic guardian with a floating lens and a mind that politely knocks before reading.',
      greeting: 'I saw you coming. I also saw the snack in your pocket.', likes: 'Moon Cake',
      gene: ['Thought Echo', '🔮', '+25% XP and chats pay +2 coins.', { xp: 1.25, chatCoins: 2 }],
      titan: 'Noosphere',
    },
  },
  bug: {
    name: 'Honeyshell Hive', habitat: 'Bug', emoji: '🐛',
    blurb: 'Amber chambers, humming tunnels, and a library made of pressed leaves.',
    guardian: {
      key: 'exbug', name: 'Hive Curator', trait: 'Busy — has a list for every list.',
      blurb: 'An exotic guardian wearing tiny spectacles and carrying a leaf-bound ledger.',
      greeting: 'You are late. I have already made you a name tag.', likes: 'Moon Berry',
      gene: ['Colony Clock', '🐝', 'Gifts arrive 22% sooner and +16% XP.', { giftSpeed: 1.22, xp: 1.16 }],
      titan: 'Grand Hive',
    },
  },
  rock: {
    name: 'Granite Amphitheater', habitat: 'Rock', emoji: '🪨',
    blurb: 'A natural stone stage where every footstep becomes a drumbeat.',
    guardian: {
      key: 'exrock', name: 'Stone Sentinel', trait: 'Steady — applauds by tapping one enormous toe.',
      blurb: 'An exotic guardian carved from a single boulder, still wearing its moss cloak.',
      greeting: 'I have been waiting. I am very good at it.', likes: 'Honeycomb Cake',
      gene: ['Living Geode', '💎', 'All needs fade 16% slower.', { decay: 0.84 }],
      titan: 'Mountain That Waits',
    },
  },
  ghost: {
    name: 'Wispveil Cemetery', habitat: 'Ghost', emoji: '👻',
    blurb: 'Soft fog, candlelit stones, and friendly echoes that always say hello back.',
    guardian: {
      key: 'exghost', name: 'Veil Keeper', trait: 'Gentle — keeps the door open for everyone.',
      blurb: 'An exotic guardian with a lantern for a heart and a key ring full of quiet doors.',
      greeting: 'You are not late. Ghost time is very forgiving.', likes: 'Warm Soup',
      gene: ['Between Worlds', '🕯️', 'Night games pay +5 coins and chats pay +2 coins.', { nightCoins: 5, chatCoins: 2 }],
      titan: 'Hollow Choir',
    },
  },
  dragon: {
    name: 'Wyrmbone Peak', habitat: 'Dragon', emoji: '🐉',
    blurb: 'A windswept summit of ancient ribs, hoarded coins, and dramatic sunsets.',
    guardian: {
      key: 'exdragon', name: 'Wyrm Regent', trait: 'Proud — practices every entrance twice.',
      blurb: 'An exotic guardian with a cracked horn and a hoard that is mostly thoughtful gifts.',
      greeting: 'You may enter. Wipe your feet. The hoard is clean.', likes: 'Ember Steak',
      gene: ['Ancient Blood', '🐲', 'Gain 32% more XP.', { xp: 1.32 }],
      titan: 'First Wyrm',
    },
  },
  dark: {
    name: 'Moonshade Bazaar', habitat: 'Dark', emoji: '🌑',
    blurb: 'A night market of quiet stalls, black velvet, and deals whispered under the moon.',
    guardian: {
      key: 'exdark', name: 'Night Broker', trait: 'Discreet — knows every secret, trades for snacks.',
      blurb: 'An exotic guardian in a travelling coat with a ledger of favors and a very soft laugh.',
      greeting: 'I have what you need. You have what I want. Cookies.', likes: 'Moon Cake',
      gene: ['Midnight Deal', '🌒', 'Night games pay +6 coins and gifts arrive 15% sooner.', { nightCoins: 6, giftSpeed: 1.15 }],
      titan: 'Moonless Crown',
    },
  },
  steel: {
    name: 'Alloy Foundry', habitat: 'Steel', emoji: '⚙️',
    blurb: 'Polished catwalks and warm furnaces where broken things become useful again.',
    guardian: {
      key: 'exsteel', name: 'Alloy Guardian', trait: 'Reliable — fixes the hinge before you notice it squeaks.',
      blurb: 'An exotic guardian plated in layered steel with a toolbox folded into its tail.',
      greeting: 'I fixed your door. It was making a sad noise.', likes: 'Star Cookie',
      gene: ['Unbreakable', '⚙️', 'All needs fade 18% slower and cleanliness fades 25% slower.', { decay: 0.82, cleanDecay: 0.75 }],
      titan: 'Forge Eternal',
    },
  },
  fairy: {
    name: 'Wishbloom Court', habitat: 'Fairy', emoji: '✨',
    blurb: 'A teacup garden of giant flowers, tinny bells, and wishes waiting their turn.',
    guardian: {
      key: 'exfairy', name: 'Wish Diplomat', trait: 'Charming — can make a Tuesday feel like a festival.',
      blurb: 'An exotic guardian with a ribbon ledger, a listening ear, and a pocketful of spare wishes.',
      greeting: 'Make a wish. No pressure. I have backups.', likes: 'Star Cookie',
      gene: ['Granted Wish', '🌠', 'Pets build 40% more bond and gifts arrive 20% sooner.', { petBond: 1.4, giftSpeed: 1.2 }],
      titan: 'Wish Crown',
    },
  },
};

const BIOME_GUARDIAN_BY_TYPE = {};
const BIOME_GUARDIAN_BY_SPECIES = {};

Object.entries(BIOME_DEFS).forEach(([type, def]) => {
  const g = def.guardian;
  const palette = PDX_TYPES[type];
  ELEMENTS[g.key] = {
    name: g.name,
    primary: palette.primary,
    light: palette.light,
    deep: palette.deep,
    accent: palette.accent,
    trait: g.trait,
    blurb: g.blurb,
    greeting: g.greeting,
    likes: g.likes,
    biomeType: type,
    exotic: true,
  };
  GENE_POWERS[g.key] = { name: g.gene[0], icon: g.gene[1], desc: g.gene[2], effect: g.gene[3] };
  TITAN_NAMES[g.key] = g.titan;
  TYPE_EGG_BASE_PRICE[g.key] = 260;
  TYPE_EGG_PRICE[g.key] = discountedEggPrice(260);
  ELEMENT_KEYS.push(g.key);
  NAME_START[g.key] = [g.name.split(' ')[0], 'Ward', 'Keep', 'Aura', 'Elder', 'Prime', 'Rune', 'Vale'];
  BIOME_GUARDIAN_BY_TYPE[type] = g.key;
  BIOME_GUARDIAN_BY_SPECIES[g.key] = type;
});

const SPECIAL_EXOTIC_DEFS = {
  yeallingzebra81: {
    name: 'YeallingZebra81',
    palette: ['#6b4fa8', '#ffd4ec', '#2a1748', '#4be0b0'],
    trait: 'Backstage — always knows the next track before it drops.',
    blurb: 'A rare Hollow exotic with neon-pink hair, purple headphones, green-lit cups, and a backstage pass in creature form.',
    greeting: 'Headphones on. The Hollow has a soundtrack now.',
    likes: 'Berry Fizz',
    gene: ['Backstage Pass', '🎧', 'Gifts arrive 28% sooner and chats pay +3 coins.', { giftSpeed: 1.28, chatCoins: 3 }],
    titan: 'Backstage Titan',
    price: 260,
    homes: ['neon', 'sugar', 'aurora'],
    hybrid: 'Backstage Bloom',
    hybridWith: 'candy',
    nameStart: ['Yeall', 'Zeb', 'Amp', 'Neon', 'Beat', 'Echo', 'Stage', 'Tone'],
  },
  supernora: {
    name: 'Supernora',
    palette: ['#4b3f9e', '#ffe9b0', '#22154f', '#ffcf5c'],
    trait: 'Star-Marked — arrives with a comet at their heels and a plan in their cape.',
    blurb: 'A cosmic Hollow exotic with a star crown, a golden comet trail, and enough confidence to light up a whole biome.',
    greeting: 'Stand back. The stars are still catching up.',
    likes: 'Star Pop',
    gene: ['Supernova Heart', '🌟', '+32% XP and games pay +4 coins.', { xp: 1.32, gameCoins: 4 }],
    titan: 'Supernova Titan',
    price: 260,
    homes: ['aurora', 'neon', 'dream'],
    hybrid: 'Nova Crown',
    hybridWith: 'radiant',
    nameStart: ['Nora', 'Nova', 'Star', 'Sol', 'Comet', 'Astra', 'Luma', 'Sky'],
  },
  wildtrickyjokerwolf: {
    name: 'WildTricky-JokerWolf',
    palette: ['#4b2a78', '#d9ffcf', '#160d26', '#67f07a'],
    trait: 'Trickster — treats every rule like a card tucked up a sleeve.',
    blurb: 'A wild-eyed wolf exotic with split purple-and-green ears, a jester’s grin, and a playing card for every occasion.',
    greeting: 'Pick a card. No — the other one. Too late.',
    likes: 'Candy Apple',
    gene: ['Wildcard Howl', '🃏', 'Games pay +5 coins and gifts arrive 20% sooner.', { gameCoins: 5, giftSpeed: 1.2 }],
    titan: 'Jokerwolf Titan',
    price: 260,
    homes: ['neon', 'ember', 'night'],
    hybrid: 'Wild Joker',
    hybridWith: 'darkjoker',
    nameStart: ['Wild', 'Trick', 'Joker', 'Wolf', 'Howl', 'Grin', 'Lark', 'Rook'],
  },
  litladybear: {
    name: 'LIT-LadyBear',
    palette: ['#b51f1f', '#ffd1b3', '#08060a', '#15b8a6'],
    trait: 'Lit — turns every room into a stage and every entrance into a warning.',
    blurb: 'A roaring Hollow exotic with black tiger stripes, glowing gold eyes, a white fur hood, and a teal LIT-LADYBEAR plaque.',
    greeting: 'Lights up. Fangs out. Still a lady.',
    likes: 'Ember Steak',
    gene: ['LIT Roar', '🔥', 'Games pay +6 coins and gifts arrive 20% sooner.', { gameCoins: 6, giftSpeed: 1.2 }],
    titan: 'LadyBear Titan',
    price: 260,
    homes: ['ember', 'night', 'neon'],
    hybrid: 'LIT Ladywolf',
    hybridWith: 'werewolf',
    nameStart: ['Lit', 'Lady', 'Bear', 'Scar', 'Ember', 'Rogue', 'Tiger', 'Blaze'],
  },
};

Object.entries(SPECIAL_EXOTIC_DEFS).forEach(([key, meta]) => {
  const [primary, light, deep, accent] = meta.palette;
  ELEMENTS[key] = {
    name: meta.name,
    primary, light, deep, accent,
    trait: meta.trait,
    blurb: meta.blurb,
    greeting: meta.greeting,
    likes: meta.likes,
    exotic: true,
    specialExotic: true,
  };
  GENE_POWERS[key] = { name: meta.gene[0], icon: meta.gene[1], desc: meta.gene[2], effect: meta.gene[3] };
  TITAN_NAMES[key] = meta.titan;
  TYPE_EGG_BASE_PRICE[key] = meta.price;
  TYPE_EGG_PRICE[key] = discountedEggPrice(meta.price);
  HYBRID_NAMES[pairKey(key, meta.hybridWith)] = meta.hybrid;
  NAME_START[key] = meta.nameStart;
  meta.homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  ELEMENT_KEYS.push(key);
});

const SPECIAL_EXOTIC_SPECIES = Object.keys(SPECIAL_EXOTIC_DEFS).filter((key) => ELEMENTS[key]);
const EXOTIC_SPECIES = [...Object.keys(BIOME_GUARDIAN_BY_SPECIES), ...SPECIAL_EXOTIC_SPECIES];

const TYPE_BIOMES = {};
Object.entries(BIOME_DEFS).forEach(([type, def]) => {
  const key = `biome-${type}`;
  const guardian = BIOME_GUARDIAN_BY_TYPE[type];
  const species = POKEDEX_SPECIES
    .filter((speciesKey) => (POKEDEX_META[speciesKey]?.types || []).includes(type))
    .concat(guardian);
  const scene = {
    name: def.name,
    unlocked: true,
    habitat: def.habitat,
    emoji: def.emoji,
    bonus: 0.5,
    blurb: def.blurb,
    type,
    biome: true,
    species,
  };
  SCENES[key] = scene;
  SCENE_KEYS.push(key);
  TYPE_BIOMES[type] = { type, key, ...def, guardian, speciesCount: species.length };
});
const BIOME_KEYS = Object.keys(TYPE_BIOMES);
const BIOME_SCENE_KEYS = BIOME_KEYS.map((type) => `biome-${type}`);

const SECRET_SPECIES_META = {
  hollowguide: {
    name: 'Hollow Guide', title: 'A light for the first steps',
    clue: 'Complete the induction tour.',
    palette: ['#ffe6a3', '#fff9df', '#8a5a00', '#8be9ff'],
    trait: 'Guiding — always knows which path leads to the snack table.',
    blurb: 'A secret lantern spirit that appears when a new keeper learns the way around the Hollow.',
    greeting: 'You made it. I knew you would. The tour is over, but the wandering is just starting.',
    likes: 'Honey Tea',
    gene: ['Guiding Light', '🏮', '+12% XP and gifts arrive 22% sooner.', { xp: 1.12, giftSpeed: 1.22 }],
    titan: 'Lantern Titan',
  },
  summitspirit: {
    name: 'Summit Spirit', title: 'The peak is a beginning',
    clue: 'Raise any sprite to level 1,000.',
    palette: ['#ffd166', '#fff7d6', '#8a5a00', '#b69cff'],
    trait: 'Ascended — has already climbed the mountain and is waiting with cocoa.',
    blurb: 'A secret spirit that appears on the day a sprite reaches the top of its growth.',
    greeting: 'You reached the summit. Now we can finally enjoy the view.',
    likes: 'Moon Cake',
    gene: ['Peak State', '🏔️', 'Gain 38% more XP.', { xp: 1.38 }],
    titan: 'Apex Titan',
  },
  atlaskeeper: {
    name: 'Atlas Keeper', title: 'Every biome, one map',
    clue: 'Visit all 18 type biomes.',
    palette: ['#8be9ff', '#effeff', '#1f5f70', '#c9a6ff'],
    trait: 'Cartographic — folds the whole world into a coat pocket.',
    blurb: 'A secret keeper who binds every biome into a single, living atlas.',
    greeting: 'Eighteen doors. You opened every one. The map is yours now.',
    likes: 'Dumpling Boat',
    gene: ['World Map', '🗺️', 'Gifts arrive 32% sooner and all needs fade 10% slower.', { giftSpeed: 1.32, decay: 0.9 }],
    titan: 'Cartographer Titan',
  },
  heartkeeper: {
    name: 'Heart Keeper', title: 'A bond with no ceiling',
    clue: 'Reach 100 bond with a sprite.',
    palette: ['#ff9ec7', '#fff0f7', '#8a2a52', '#ffd166'],
    trait: 'Devoted — measures every day in shared moments.',
    blurb: 'A secret companion that only appears when a sprite trusts you completely.',
    greeting: 'You did not just raise a friend. You kept one. That is different.',
    likes: 'Star Cookie',
    gene: ['Open Heart', '💖', 'Pets build 60% more bond and pay +2 coins.', { petBond: 1.6, petCoins: 2 }],
    titan: 'Heart Titan',
  },
  shelloracle: {
    name: 'Shell Oracle', title: 'A warm shell remembers',
    clue: 'Hatch 25 eggs.',
    palette: ['#9ad7ff', '#f0fbff', '#3a6b86', '#ffd166'],
    trait: 'Patient — listens to the future inside every shell.',
    blurb: 'A secret oracle who keeps the tiny echoes of every egg that ever hatched.',
    greeting: 'Twenty-five little beginnings. I kept every crack.',
    likes: 'Cloud Sorbet',
    gene: ['Shell Song', '🐚', 'Snacks give +50% XP and gifts arrive 22% sooner.', { snackXp: 1.5, giftSpeed: 1.22 }],
    titan: 'Oracle Shell',
  },
  cheatmaster: {
    name: 'Master Cheat', title: 'The Hollow’s unlisted resident',
    clue: 'Finish the induction tour, then speak the Master’s name.',
    palette: ['#2f2a33', '#fff6cc', '#0a0910', '#7affd8'],
    trait: 'Uncatalogued — exists slightly outside the rules.',
    blurb: 'A secret master who treats the game’s balance as a suggestion and arrives fully grown.',
    greeting: 'You found the code. I have been waiting in the debug room.',
    likes: 'Star Pop',
    gene: ['Cheat Code', '🕹️', 'Double XP, +10 game coins, double gifts, and needs fade 50% slower.', { xp: 2, gameCoins: 10, giftSpeed: 2, decay: 0.5 }],
    titan: 'Master Console',
    master: true,
  },
  dailykeeper: {
    name: 'Elder Keeper', title: 'Rest is part of the story',
    clue: 'Retire your first Elderly sprite.',
    palette: ['#c9a6ff', '#f4ecff', '#4a2a7a', '#ffd166'],
    trait: 'Storied — every retirement adds a chapter to the Hollow’s library.',
    blurb: 'A secret keeper who appears when a sprite finishes one long life and chooses to rest.',
    greeting: 'Every ending is a shelf in my library. Welcome.', likes: 'Honey Tea',
    gene: ['Long Story', '📖', '+14% XP and all needs fade 10% slower.', { xp: 1.14, decay: 0.9 }],
    titan: 'Archive Titan',
  },
  elderkeeper: {
    name: 'Daily Keeper', title: 'Seven mornings make a habit',
    clue: 'Check in on seven separate days.',
    palette: ['#ffd166', '#fff7d6', '#8a5a00', '#8be9ff'],
    trait: 'Steady — turns small daily rituals into lasting magic.',
    blurb: 'A calendar spirit who appears when a keeper shows up for their Hollow again and again.',
    greeting: 'Seven mornings. I counted every one.', likes: 'Honey Tea',
    gene: ['Daily Ritual', '📅', '+16% XP and gifts arrive 18% sooner.', { xp: 1.16, giftSpeed: 1.18 }],
    titan: 'Ritual Titan',
  },
  taskkeeper: {
    name: 'Task Keeper', title: 'Small goals, big garden',
    clue: 'Claim ten daily, weekly, or monthly goals.',
    palette: ['#8fe07a', '#effff2', '#2f5c3a', '#ffd166'],
    trait: 'Diligent — grows a tiny garden from every finished checklist.',
    blurb: 'A secret helper who rewards keepers for finishing the little things.',
    greeting: 'Ten goals finished. The garden is proud of you.', likes: 'Trail Mix',
    gene: ['Task Bloom', '✅', 'Game coins +2 and snacks give +25% XP.', { gameCoins: 2, snackXp: 1.25 }],
    titan: 'Checklist Titan',
  },
  giftkeeper: {
    name: 'Gift Keeper', title: 'Every ribbon remembers',
    clue: 'Open twenty gifts from your sprites.',
    palette: ['#ff9ec7', '#fff0f7', '#8a2a52', '#ffd166'],
    trait: 'Generous — saves every ribbon and turns them into paths home.',
    blurb: 'A secret keeper who appears after a Hollow has shared twenty wrapped surprises.',
    greeting: 'Twenty ribbons. I tied them all into one bright door.', likes: 'Star Cookie',
    gene: ['Ribbon Road', '🎀', 'Gifts arrive 25% sooner and pets build +25% bond.', { giftSpeed: 1.25, petBond: 1.25 }],
    titan: 'Ribbon Titan',
  },
  rebirthkeeper: {
    name: 'Rebirth Keeper', title: 'A new life, carrying the old',
    clue: 'Feed a MAX sprite a Rebirth Meal.',
    palette: ['#7affd8', '#effffb', '#1f5f70', '#ffd166'],
    trait: 'Renewing — keeps the spark of every life in a little green flame.',
    blurb: 'A secret phoenix of the Hollow who appears when a sprite chooses to begin again.',
    greeting: 'You kept the memory and made room for a new beginning.', likes: 'Rebirth Meal',
    gene: ['New Leaf', '🌱', '+22% XP and all needs fade 12% slower.', { xp: 1.22, decay: 0.88 }],
    titan: 'Phoenix Titan',
  },
  seasonkeeper: {
    name: 'Season Keeper', title: 'Every season leaves a mark',
    clue: 'Collect 8 Fortnite Legacy species.',
    palette: ['#ffd166', '#fff8d9', '#6b4a00', '#41e0d0'],
    trait: 'Nostalgic — keeps the old island in a snow globe and shakes it when nobody is looking.',
    blurb: 'A secret keeper who appears when a Hollow remembers the seasons before the current one.',
    greeting: 'Eight old seasons. I kept every drop, every map, and every ridiculous landing.', likes: 'Cinnamon Churro',
    gene: ['Season Ticket', '🎟️', 'Gifts arrive 30% sooner and games pay +3 coins.', { giftSpeed: 1.3, gameCoins: 3 }],
    titan: 'Season Titan',
    collectionSecret: { flag: 'fortniteLegacy', count: 8 },
  },
  ringkeeper: {
    name: 'Ring Keeper', title: 'The bell never really stops',
    clue: 'Collect 6 WWE species.',
    palette: ['#b51f1f', '#ffe0d0', '#2a0808', '#ffd166'],
    trait: 'Bell-bright — hears the three-count in every quiet room.',
    blurb: 'A secret keeper who appears when the Hollow starts to smell like popcorn, canvas, and main-event nerves.',
    greeting: 'Six superstars. The ring is warm. Take your corner.', likes: 'Juicy Drumstick',
    gene: ['Opening Bell', '🔔', 'Night games pay +5 coins and pets build +30% bond.', { nightCoins: 5, petBond: 1.3 }],
    titan: 'Bell Titan',
    collectionSecret: { flag: 'wwe', count: 6 },
  },
  riftchampion: {
    name: 'Rift Champion', title: 'The last drop wins the map',
    clue: 'Collect 16 Fortnite Legacy species.',
    palette: ['#41e0d0', '#eaffff', '#0f3a4a', '#ff4fd8'],
    trait: 'Victory-crowned — wears the storm like a cape and the crown like a loot drop.',
    blurb: 'A secret exotic forged from sixteen old seasons, a hundred drop trails, and one perfect victory royale.',
    greeting: 'Sixteen seasons. One crown. You brought the whole history with you.', likes: 'Star Pop',
    gene: ['Victory Crown', '👑', '+25% XP, +6 game coins, and gifts arrive 20% sooner.', { xp: 1.25, gameCoins: 6, giftSpeed: 1.2 }],
    titan: 'Victory Titan',
    exotic: true,
    collectionSecret: { flag: 'fortniteLegacy', count: 16 },
  },
  grandslam: {
    name: 'Grand Slam', title: 'Every belt, every era',
    clue: 'Collect 12 WWE species.',
    palette: ['#d9a441', '#fff3c4', '#2a1808', '#b51f1f'],
    trait: 'Undisputed — carries every title at once and still offers to help with the bags.',
    blurb: 'A secret exotic who unifies the whole locker room into one glittering, over-championed sprite.',
    greeting: 'Twelve signatures. Every era. One locker room. Let’s main-event the snack table.', likes: 'Ember Steak',
    gene: ['Undisputed', '🏆', 'Games pay +7 coins, gain 20% XP, and needs fade 10% slower.', { gameCoins: 7, xp: 1.2, decay: 0.9 }],
    titan: 'Undisputed Titan',
    exotic: true,
    collectionSecret: { flag: 'wwe', count: 12 },
  },
};

if (typeof installRotatingVaultSecrets === 'function') installRotatingVaultSecrets(SECRET_SPECIES_META);

const SECRET_SPECIES = Object.keys(SECRET_SPECIES_META);

SECRET_SPECIES.forEach((key) => {
  const meta = SECRET_SPECIES_META[key];
  const [primary, light, deep, accent] = meta.palette;
  ELEMENTS[key] = {
    name: meta.name,
    primary, light, deep, accent,
    trait: meta.trait,
    blurb: meta.blurb,
    greeting: meta.greeting,
    likes: meta.likes,
    secret: true,
    exotic: !!meta.exotic,
    specialExotic: !!meta.exotic,
    secretExotic: !!meta.exotic,
  };
  GENE_POWERS[key] = { name: meta.gene[0], icon: meta.gene[1], desc: meta.gene[2], effect: meta.gene[3] };
  TITAN_NAMES[key] = meta.titan;
  ELEMENT_KEYS.push(key);
  NAME_START[key] = [meta.name.split(' ').pop(), 'Myst', 'Key', 'Echo', 'Aeon', 'Veil', 'Code', 'Lumen'];
});

const SECRET_EXOTIC_SPECIES = SECRET_SPECIES.filter((key) => SECRET_SPECIES_META[key].exotic);
SECRET_EXOTIC_SPECIES.forEach((key) => { if (!EXOTIC_SPECIES.includes(key)) EXOTIC_SPECIES.push(key); });
const HOLLOW_EXOTIC_SPECIES = [...SPECIAL_EXOTIC_SPECIES, ...SECRET_EXOTIC_SPECIES];

const MASTER_CHEAT_SPECIES = 'cheatmaster';
const TYPE_EGG_SPECIES = ELEMENT_KEYS.filter((key) => !SECRET_SPECIES.includes(key));
const WILD_SPECIES = ELEMENT_KEYS.filter((key) => !SECRET_SPECIES.includes(key));

function biomeForSpecies(key) {
  const type = ELEMENTS[key]?.biomeType;
  return type ? TYPE_BIOMES[type] || null : null;
}
function isExoticSpecies(key) {
  return EXOTIC_SPECIES.includes(key);
}
function isSecretSpecies(key) {
  return SECRET_SPECIES.includes(key);
}
function secretMeta(key) {
  return SECRET_SPECIES_META[key] || null;
}
function isTypeBiomeScene(sceneKey) {
  return BIOME_SCENE_KEYS.includes(sceneKey);
}
function biomeSpeciesCount(type) {
  return TYPE_BIOMES[type]?.speciesCount || 0;
}
