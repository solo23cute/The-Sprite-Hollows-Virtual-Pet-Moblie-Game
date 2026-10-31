/* 3.4.0 collection widening: background/royal ponies, extended Care Bears,
   full-show TV rosters, and the Disney worlds of Kingdom Hearts. */

/* ---------------- Care Bears: extended family ---------------- */

CARE_BEAR_GROUPS.extended = {
  label: 'Extended Care Family', icon: '🧸', price: 185,
  homes: ['grove', 'dream', 'sugar'], likes: 'Honey Drop',
  blurb: 'An extended Care Bear family member who brings a favourite blanket, a family recipe, and a hug for every cousin.',
  note: 'True Heart, Noble Heart, Grams, Baby Hugs, Baby Tugs, Champ, Secret, Share, Surprise, Harmony, Daydream, Take Care, Me, Messy, and Thanks-a-Lot.',
  greetings: [
    'Family is just friendship that stayed for breakfast.',
    'I brought the blanket. You bring the story.',
    'A little care can turn a whole house into a home.',
  ],
};
CARE_BEAR_GROUP_ORDER.push('extended');
CARE_BEAR_BY_GROUP.extended = [];

/* [group, key, name, primary, light, deep, accent, gene, badge art, partner, hybrid, home] */
const CARE_BEAR_EXTRA_DEFS = [
  ['extended', 'care_trueheart', 'True Heart Bear', '#ff7eb6', '#ffe3f1', '#7a1a47', '#ffd166', 'tenderheart', 'heart', 'radiant', 'True Heartlight', 'dream'],
  ['extended', 'care_nobleheart', 'Noble Heart Horse', '#b58ae8', '#f2e9ff', '#41206b', '#ffd166', 'braveheart', 'heart', 'crystal', 'Noble Heartcrystal', 'aurora'],
  ['extended', 'care_grams', 'Grams Bear', '#7b8fd6', '#e8efff', '#27396b', '#ffd166', 'cozyheart', 'moon', 'frost', 'Grams Moonlight', 'night'],
  ['extended', 'care_babyhugs', 'Baby Hugs Bear', '#ff9ec7', '#fff0f8', '#7a2f52', '#ffd166', 'lovealot', 'doubleheart', 'honey', 'Baby Honeyhugs', 'sugar'],
  ['extended', 'care_babytugs', 'Baby Tugs Bear', '#6bb7ff', '#e3f4ff', '#17476b', '#ffd166', 'lovealot', 'doubleheart', 'bloom', 'Baby Bloomtugs', 'grove'],
  ['extended', 'care_champ', 'Champ Bear', '#f2a33a', '#fff1d8', '#6b3a0a', '#5a9eff', 'braveheart', 'sun', 'volt', 'Champion Spark', 'savanna'],
  ['extended', 'care_secret', 'Secret Bear', '#9c7bd6', '#efe6ff', '#3d226b', '#ffd166', 'wish', 'shootingstar', 'dusk', 'Secret Wish', 'dream'],
  ['extended', 'care_share', 'Share Bear', '#d68ad6', '#fbe8fb', '#5c205c', '#ffd166', 'friend', 'flowers', 'bloom', 'Sharing Bloom', 'grove'],
  ['extended', 'care_surprise', 'Surprise Bear', '#ffb347', '#fff0d4', '#6b3a0a', '#ff6b8a', 'playfulheart', 'shootingstar', 'candy', 'Surprise Candy', 'sugar'],
  ['extended', 'care_harmony', 'Harmony Bear', '#5ad6c8', '#e0fff8', '#0f5c4a', '#ffd166', 'cheer', 'rainbow', 'dream', 'Harmony Dream', 'dream'],
  ['extended', 'care_daydream', 'Daydream Bear', '#8fc7ff', '#e8f5ff', '#1f4a6b', '#ffd166', 'wish', 'sun', 'radiant', 'Daydream Sun', 'aurora'],
  ['extended', 'care_takecare', 'Take Care Bear', '#e6a68f', '#fff0e8', '#6b3020', '#8fe07a', 'tenderheart', 'heart', 'earth', 'Tender Earth', 'grove'],
  ['extended', 'care_me', 'Me Bear', '#ffb3d1', '#fff0f7', '#7a2f52', '#ffffff', 'friend', 'flowers', 'bloom', 'Me Flower', 'sugar'],
  ['extended', 'care_messy', 'Messy Bear', '#8a7a6b', '#efe8df', '#3d3027', '#5a9eff', 'grumpy', 'storm', 'dusk', 'Messy Storm', 'night'],
  ['extended', 'care_thanks', 'Thanks-a-Lot Bear', '#d6b85a', '#fff8d8', '#6b520a', '#ff9ec7', 'goodluck', 'clover', 'honey', 'Thanks Honey', 'sugar'],
];

const careExtraStart = CARE_BEAR_SPECIES.length;
const careExtraKeys = [];
CARE_BEAR_EXTRA_DEFS.forEach(([groupKey, key, name, primary, light, deep, accent, geneKey, artKey, partner, hybrid, home], index) => {
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
    careBearCousin: false,
    catalogType: `Care Bears · ${group.label}`,
  };
  GENE_POWERS[key] = { name: gene.name, icon: gene.icon, desc: gene.desc, effect: gene.effect };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = group.price + (index % 3) * 5;
  TYPE_EGG_PRICE[key] = discountedEggPrice(TYPE_EGG_BASE_PRICE[key]);
  if (ELEMENTS[partner]) HYBRID_NAMES[pairKey(key, partner)] = hybrid;
  NAME_START[key] = [...new Set([name.replace(/^The /, '').split(' ')[0], 'Care', 'Heart'])];
  [...new Set([home, ...group.homes])].forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  CARE_BEAR_SPECIES.push(key);
  CARE_BEAR_BY_GROUP[groupKey].push(key);
  careExtraKeys.push(key);
});
CARE_BEAR_KEYS.push(...careExtraKeys);
CARE_BEAR_TOTAL = CARE_BEAR_SPECIES.length;

/* ---------------- My Little Pony: background and royal ---------------- */

PONY_GROUPS.background = {
  label: 'Background Ponies', icon: '🎨', price: 185,
  homes: ['grove', 'sugar', 'neon'], likes: 'Apple Tart', partner: 'earth', suffix: 'Cameo',
  gene: ['Cameo Spark', '🎨', 'Check-ins pay +4 bonus coins, completed tasks pay +3 bonus coins, and gain +8% XP.', { checkinCoins: 4, taskCoins: 3, xp: 1.08 }],
  trait: 'Background-bright — has a whole life, a signature talent, and at least one memorable crowd shot.',
  blurb: 'A background pony with a familiar face, a distinct talent, and a habit of stealing the scene one frame at a time.',
  greetings: [
    'I was in the background of that scene. You probably missed me.',
    'Everypony has a story, even the one holding the lamp.',
    'Cameo or not, I brought snacks.',
  ],
};
PONY_GROUP_ORDER.push('background');
PONY_BY_GROUP.background = [];

/* [group, key, name, pony type, cutie mark] */
const PONY_EXTRA_DEFS = [
  ['royalty', 'pony_flurryheart', 'Princess Flurry Heart', 'Alicorn princess', 'heart'],
  ['royalty', 'pony_blueblood', 'Prince Blueblood', 'Unicorn prince', 'crown'],
  ['royalty', 'pony_thorax', 'King Thorax', 'Changeling king', 'crown'],
  ['royalty', 'pony_novo', 'Queen Novo', 'Hippogriff queen', 'crown'],
  ['royalty', 'pony_skystar', 'Princess Skystar', 'Hippogriff princess', 'heart'],
  ['royalty', 'pony_ember', 'Dragon Lord Ember', 'Dragon Lord', 'chaos'],
  ['royalty', 'pony_rutherford', 'Prince Rutherford', 'Yak prince', 'rock'],
  ['royalty', 'pony_amore', 'Princess Amore', 'Alicorn princess', 'heart'],
  ['royalty', 'pony_nightmaremoon', 'Nightmare Moon', 'Alicorn of the night', 'moon'],
  ['royalty', 'pony_daybreaker', 'Daybreaker', 'Alicorn of the sun', 'sun'],

  ['background', 'pony_doctor', 'Doctor Whooves', 'Earth pony time traveler', 'moon'],
  ['background', 'pony_vinyl', 'Vinyl Scratch', 'Unicorn DJ', 'note'],
  ['background', 'pony_octavia', 'Octavia Melody', 'Earth pony cellist', 'note'],
  ['background', 'pony_roseluck', 'Roseluck', 'Earth pony florist', 'flower'],
  ['background', 'pony_lilyvalley', 'Lily Valley', 'Earth pony florist', 'flower'],
  ['background', 'pony_flowerwishes', 'Flower Wishes', 'Earth pony florist', 'flower'],
  ['background', 'pony_cloudkicker', 'Cloud Kicker', 'Pegasus', 'bolt'],
  ['background', 'pony_blossomforth', 'Blossomforth', 'Pegasus', 'flower'],
  ['background', 'pony_raindrops', 'Raindrops', 'Pegasus', 'bubble'],
  ['background', 'pony_thunderlane', 'Thunderlane', 'Pegasus', 'bolt'],
  ['background', 'pony_bulbiceps', 'Bulk Biceps', 'Pegasus', 'heart'],
  ['background', 'pony_soarin', 'Soarin', 'Pegasus Wonderbolt', 'bolt'],
  ['background', 'pony_spitfire', 'Spitfire', 'Pegasus Wonderbolt captain', 'bolt'],
  ['background', 'pony_fleetfoot', 'Fleetfoot', 'Pegasus Wonderbolt', 'bolt'],
  ['background', 'pony_silverstream', 'Silverstream', 'Hippogriff student', 'bubble'],
  ['background', 'pony_ocellus', 'Ocellus', 'Changeling student', 'leaf'],
  ['background', 'pony_yona', 'Yona', 'Yak student', 'rock'],
  ['background', 'pony_sandbar', 'Sandbar', 'Earth pony student', 'leaf'],
  ['background', 'pony_gallus', 'Gallus', 'Griffon student', 'bolt'],
  ['background', 'pony_smolder', 'Smolder', 'Dragon student', 'diamond'],
  ['background', 'pony_babsseed', 'Babs Seed', 'Earth pony Crusader', 'apple'],
  ['background', 'pony_diamondtiara', 'Diamond Tiara', 'Earth pony', 'diamond'],
  ['background', 'pony_silverspoon', 'Silver Spoon', 'Earth pony', 'diamond'],
  ['background', 'pony_pipsqueak', 'Pipsqueak', 'Earth pony', 'star'],
  ['background', 'pony_featherweight', 'Featherweight', 'Pegasus', 'leaf'],
  ['background', 'pony_twist', 'Twist', 'Earth pony', 'candy'],
  ['background', 'pony_snips', 'Snips', 'Unicorn', 'candy'],
  ['background', 'pony_snails', 'Snails', 'Unicorn', 'bubble'],
  ['background', 'pony_buttonmash', 'Button Mash', 'Earth pony gamer', 'star'],
  ['background', 'pony_cheesesandwich', 'Cheese Sandwich', 'Earth pony party planner', 'balloon'],
  ['background', 'pony_coco', 'Coco Pommel', 'Earth pony seamstress', 'diamond'],
  ['background', 'pony_coloratura', 'Countess Coloratura', 'Earth pony pop star', 'note'],
  ['background', 'pony_moondancer', 'Moon Dancer', 'Unicorn scholar', 'moon'],
  ['background', 'pony_minuette', 'Minuette', 'Unicorn', 'diamond'],
  ['background', 'pony_twinkleshine', 'Twinkleshine', 'Unicorn', 'star'],
  ['background', 'pony_lemonhearts', 'Lemon Hearts', 'Unicorn', 'heart'],
  ['background', 'pony_treehugger', 'Tree Hugger', 'Earth pony', 'leaf'],
  ['background', 'pony_cloudchaser', 'Cloudchaser', 'Pegasus', 'bolt'],
  ['background', 'pony_flitter', 'Flitter', 'Pegasus', 'butterfly'],
  ['background', 'pony_seaswirl', 'Sea Swirl', 'Earth pony', 'bubble'],
  ['background', 'pony_cherryjubilee', 'Cherry Jubilee', 'Earth pony', 'apple'],
  ['background', 'pony_nightglider', 'Night Glider', 'Pegasus', 'moon'],
  ['background', 'pony_doublediamond', 'Double Diamond', 'Earth pony', 'diamond'],
  ['background', 'pony_partyfavor', 'Party Favor', 'Unicorn', 'balloon'],
  ['background', 'pony_sugarbelle', 'Sugar Belle', 'Earth pony baker', 'candy'],
  ['background', 'pony_goldenharvest', 'Golden Harvest', 'Earth pony', 'apple'],
  ['background', 'pony_carrottop', 'Carrot Top', 'Earth pony', 'apple'],
  ['background', 'pony_berrypunch', 'Berry Punch', 'Earth pony', 'candy'],
  ['background', 'pony_cloudyquartz', 'Cloudy Quartz', 'Earth pony', 'rock'],
  ['background', 'pony_igneousrock', 'Igneous Rock Pie', 'Earth pony', 'rock'],
];

const ponyExtraStart = PONY_SPECIES.length;
const ponyExtraKeys = [];
PONY_EXTRA_DEFS.forEach(([groupKey, key, name, type, mark], index) => {
  const group = PONY_GROUPS[groupKey];
  if (!group || ELEMENTS[key]) return;
  const palette = FRANCHISE_PALETTES[(ponyExtraStart + index) % FRANCHISE_PALETTES.length];
  const [primary, light, deep, accent] = palette;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: `${group.trait} ${name} makes it look effortless.`,
    blurb: `${group.blurb} ${name} — ${type} — has a cutie mark worth a second look.`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    parentTypes: ['My Little Pony', group.label],
    pony: true,
    ponyGroup: groupKey,
    ponyArt: mark,
    ponyType: type,
    ponyMark: mark,
    catalogType: `Pony · ${type}`,
  };
  GENE_POWERS[key] = {
    name: group.gene[0], icon: group.gene[1], desc: group.gene[2], effect: group.gene[3],
  };
  TITAN_NAMES[key] = `${name.replace(/^(Princess|Queen|King|Prince|Dragon Lord|Granny)\\s+/, '')} Titan`;
  TYPE_EGG_BASE_PRICE[key] = group.price + (index % 4) * 5;
  TYPE_EGG_PRICE[key] = discountedEggPrice(TYPE_EGG_BASE_PRICE[key]);
  HYBRID_NAMES[pairKey(key, group.partner)] = `${name.replace(/^(Princess|Queen|King|Prince|Dragon Lord)\\s+/, '')} ${group.suffix}`;
  NAME_START[key] = [...new Set([name.replace(/[“”"']/g, '').split(' ')[0], 'Pony', group.label.split(' ')[0], 'Little'])];
  group.homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  PONY_SPECIES.push(key);
  PONY_BY_GROUP[groupKey].push(key);
  ponyExtraKeys.push(key);
});
PONY_TOTAL = PONY_SPECIES.length;
PONY_WAVE.total = PONY_TOTAL;

/* ---------------- TV Legends: full-show casts ---------------- */

/* [group, key, name, show, art] */
const TV_EXTRA_DEFS = [
  ['prestige', 'tv_saul', 'Saul Goodman', 'Better Call Saul', 'antihero'],
  ['prestige', 'tv_gus', 'Gus Fring', 'Breaking Bad', 'antihero'],
  ['prestige', 'tv_mike', 'Mike Ehrmantraut', 'Breaking Bad', 'antihero'],
  ['prestige', 'tv_hank', 'Hank Schrader', 'Breaking Bad', 'survivor'],
  ['prestige', 'tv_skyler', 'Skyler White', 'Breaking Bad', 'antihero'],
  ['prestige', 'tv_mikewheeler', 'Mike Wheeler', 'Stranger Things', 'survivor'],
  ['prestige', 'tv_dustin', 'Dustin Henderson', 'Stranger Things', 'genius'],
  ['prestige', 'tv_lucas', 'Lucas Sinclair', 'Stranger Things', 'hunter'],
  ['prestige', 'tv_max', 'Max Mayfield', 'Stranger Things', 'psychic'],
  ['prestige', 'tv_hopper', 'Jim Hopper', 'Stranger Things', 'survivor'],
  ['prestige', 'tv_joyce', 'Joyce Byers', 'Stranger Things', 'survivor'],
  ['prestige', 'tv_carol', 'Carol Peletier', 'The Walking Dead', 'hunter'],
  ['prestige', 'tv_glenn', 'Glenn Rhee', 'The Walking Dead', 'survivor'],
  ['prestige', 'tv_maggie', 'Maggie Greene', 'The Walking Dead', 'survivor'],
  ['prestige', 'tv_negan', 'Negan', 'The Walking Dead', 'killer'],
  ['prestige', 'tv_debra', 'Debra Morgan', 'Dexter', 'detective'],
  ['prestige', 'tv_watson', 'John Watson', 'Sherlock', 'detective'],
  ['prestige', 'tv_moriarty', 'Jim Moriarty', 'Sherlock', 'killer'],
  ['prestige', 'tv_cuddy', 'Lisa Cuddy', 'House', 'doctor'],
  ['prestige', 'tv_wilson', 'James Wilson', 'House', 'doctor'],

  ['sitcom', 'tv_andy', 'Andy Bernard', 'The Office', 'office'],
  ['sitcom', 'tv_kevin', 'Kevin Malone', 'The Office', 'office'],
  ['sitcom', 'tv_angela', 'Angela Martin', 'The Office', 'office'],
  ['sitcom', 'tv_oscar', 'Oscar Martinez', 'The Office', 'office'],
  ['sitcom', 'tv_stanley', 'Stanley Hudson', 'The Office', 'office'],
  ['sitcom', 'tv_phyllis', 'Phyllis Vance', 'The Office', 'office'],
  ['sitcom', 'tv_creed', 'Creed Bratton', 'The Office', 'office'],
  ['sitcom', 'tv_toby', 'Toby Flenderson', 'The Office', 'office'],
  ['sitcom', 'tv_kelly', 'Kelly Kapoor', 'The Office', 'office'],
  ['sitcom', 'tv_ryan', 'Ryan Howard', 'The Office', 'office'],
  ['sitcom', 'tv_ross', 'Ross Geller', 'Friends', 'friend'],
  ['sitcom', 'tv_monica', 'Monica Geller', 'Friends', 'friend'],
  ['sitcom', 'tv_joey', 'Joey Tribbiani', 'Friends', 'friend'],
  ['sitcom', 'tv_leonard', 'Leonard Hofstadter', 'The Big Bang Theory', 'genius'],
  ['sitcom', 'tv_penny', 'Penny', 'The Big Bang Theory', 'friend'],

  ['scifi', 'tv_uhura', 'Nyota Uhura', 'Star Trek', 'pilot'],
  ['scifi', 'tv_mccoy', 'Leonard McCoy', 'Star Trek', 'doctor'],
  ['scifi', 'tv_scotty', 'Montgomery Scott', 'Star Trek', 'pilot'],
  ['scifi', 'tv_data', 'Data', 'Star Trek', 'robot'],
  ['scifi', 'tv_worf', 'Worf', 'Star Trek', 'ranger'],
  ['scifi', 'tv_skinner', 'Walter Skinner', 'The X-Files', 'agent'],
  ['scifi', 'tv_smokingman', 'Cigarette Smoking Man', 'The X-Files', 'agent'],
  ['scifi', 'tv_apollo', 'Lee Adama', 'Battlestar Galactica', 'pilot'],
  ['scifi', 'tv_six', 'Number Six', 'Battlestar Galactica', 'psychic'],
  ['scifi', 'tv_baltar', 'Gaius Baltar', 'Battlestar Galactica', 'genius'],

  ['fantasy', 'tv_sansa', 'Sansa Stark', 'Game of Thrones', 'royal'],
  ['fantasy', 'tv_bran', 'Bran Stark', 'Game of Thrones', 'psychic'],
  ['fantasy', 'tv_jaime', 'Jaime Lannister', 'Game of Thrones', 'ranger'],
  ['fantasy', 'tv_cersei', 'Cersei Lannister', 'Game of Thrones', 'royal'],
  ['fantasy', 'tv_brienne', 'Brienne of Tarth', 'Game of Thrones', 'blade'],
  ['fantasy', 'tv_samwell', 'Samwell Tarly', 'Game of Thrones', 'strategist'],
  ['fantasy', 'tv_jorah', 'Jorah Mormont', 'Game of Thrones', 'ranger'],
  ['fantasy', 'tv_sandor', 'Sandor Clegane', 'Game of Thrones', 'hunter'],
  ['fantasy', 'tv_enid', 'Enid Sinclair', 'Wednesday', 'goth'],
  ['fantasy', 'tv_gomez', 'Gomez Addams', 'The Addams Family', 'goth'],

  ['animated', 'tv_farnsworth', 'Professor Farnsworth', 'Futurama', 'genius'],
  ['animated', 'tv_zoidberg', 'Dr. Zoidberg', 'Futurama', 'doctor'],
  ['animated', 'tv_amy', 'Amy Wong', 'Futurama', 'pilot'],
  ['animated', 'tv_pikachu', 'Pikachu', 'Pokémon', 'toon'],
  ['animated', 'tv_misty', 'Misty', 'Pokémon', 'trainer'],
];

const tvExtraStart = TV_LEGACY_SPECIES.length;
const tvExtraKeys = [];
TV_EXTRA_DEFS.forEach(([groupKey, key, name, show, art], index) => {
  const group = TV_LEGACY_GROUPS[groupKey];
  if (!group || ELEMENTS[key]) return;
  const palette = FRANCHISE_PALETTES[(tvExtraStart + index) % FRANCHISE_PALETTES.length];
  const [primary, light, deep, accent] = palette;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: `${group.trait} ${name} knows exactly where the camera is.`,
    blurb: `${group.blurb} ${name} is a full-cast fixture from ${show}.`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    parentTypes: ['TV Legends', group.label],
    tvLegacy: true,
    tvLegacyGroup: groupKey,
    tvArt: art,
    tvShow: show,
    catalogType: `TV · ${show}`,
  };
  GENE_POWERS[key] = {
    name: group.gene[0], icon: group.gene[1], desc: group.gene[2], effect: group.gene[3],
  };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = group.price + (index % 4) * 5;
  TYPE_EGG_PRICE[key] = discountedEggPrice(TYPE_EGG_BASE_PRICE[key]);
  HYBRID_NAMES[pairKey(key, group.partner)] = `${name} ${group.suffix}`;
  NAME_START[key] = [...new Set([name.replace(/[“”"']/g, '').split(' ')[0], 'TV', group.label.split(' ')[0], 'Show'])];
  group.homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  TV_LEGACY_SPECIES.push(key);
  TV_LEGACY_BY_GROUP[groupKey].push(key);
  tvExtraKeys.push(key);
});
TV_LEGACY_TOTAL = TV_LEGACY_SPECIES.length;
TV_LEGACY_WAVE.total = TV_LEGACY_TOTAL;

/* ---------------- Kingdom Hearts: Disney worlds ---------------- */

KH_GROUPS.disneyworlds = {
  label: 'Disney Worlds', icon: '🏰', price: 240,
  homes: ['tide', 'crystal', 'dream', 'aurora'], likes: 'Sea-Salt Ice Cream', partner: 'radiant', suffix: 'World',
  gene: ['World Hopper', '🏰', 'Day games pay +4 coins, gifts arrive 25% sooner, and pets build +25% bond.', { dayCoins: 4, giftSpeed: 1.25, petBond: 1.25 }],
  trait: 'World-hopping — brings a fairy tale, a ship, and a Keyblade-sized guest list.',
  blurb: 'A Disney-world character with a familiar story, a new heart, and a door that opens somewhere unexpected.',
  greetings: [
    'Every world has a story. I brought mine.',
    'The Keyblade does not care if you are a prince, a pirate, or a very small crab.',
    'A happy ending is just a door we have not opened yet.',
  ],
  note: 'Mickey’s castle, the princess worlds, Agrabah, Atlantica, Olympus, Wonderland, Neverland, Halloween Town, the Pride Lands, Hawaii, Andy’s room, Monstropolis, Arendelle, San Fransokyo, and the Grid.',
};
KH_GROUP_ORDER.push('disneyworlds');
KH_BY_GROUP.disneyworlds = [];

/* [group, key, name, world, art] */
const KH_EXTRA_DEFS = [
  ['disneyworlds', 'kh_minnie', 'Minnie Mouse', 'Disney Castle', 'king'],
  ['disneyworlds', 'kh_daisy', 'Daisy Duck', 'Disney Castle', 'heart'],
  ['disneyworlds', 'kh_pluto', 'Pluto', 'Disney Castle', 'guard'],
  ['disneyworlds', 'kh_scrooge', 'Scrooge McDuck', 'Disney Castle', 'crown'],
  ['disneyworlds', 'kh_chip', 'Chip', 'Disney Castle', 'mage'],
  ['disneyworlds', 'kh_dale', 'Dale', 'Disney Castle', 'mage'],
  ['disneyworlds', 'kh_yensid', 'Yen Sid', 'Disney Castle', 'master'],
  ['disneyworlds', 'kh_snowwhite', 'Snow White', 'Dwarf Woodlands', 'heart'],
  ['disneyworlds', 'kh_cinderella', 'Cinderella', 'Enchanted Dominion', 'crown'],
  ['disneyworlds', 'kh_aurora', 'Aurora', 'Enchanted Dominion', 'heart'],
  ['disneyworlds', 'kh_belle', 'Belle', 'Beast’s Castle', 'flower'],
  ['disneyworlds', 'kh_beast', 'Beast', 'Beast’s Castle', 'brawler'],
  ['disneyworlds', 'kh_aladdin', 'Aladdin', 'Agrabah', 'keyblade'],
  ['disneyworlds', 'kh_jasmine', 'Jasmine', 'Agrabah', 'crown'],
  ['disneyworlds', 'kh_genie', 'Genie', 'Agrabah', 'mage'],
  ['disneyworlds', 'kh_ariel', 'Ariel', 'Atlantica', 'water'],
  ['disneyworlds', 'kh_eric', 'Prince Eric', 'Atlantica', 'royal'],
  ['disneyworlds', 'kh_ursula', 'Ursula', 'Atlantica', 'witch'],
  ['disneyworlds', 'kh_hercules', 'Hercules', 'Olympus Coliseum', 'brawler'],
  ['disneyworlds', 'kh_megara', 'Megara', 'Olympus Coliseum', 'heart'],
  ['disneyworlds', 'kh_hades', 'Hades', 'Olympus Coliseum', 'darkness'],
  ['disneyworlds', 'kh_phil', 'Philoctetes', 'Olympus Coliseum', 'master'],
  ['disneyworlds', 'kh_alice', 'Alice', 'Wonderland', 'dream'],
  ['disneyworlds', 'kh_queenofhearts', 'Queen of Hearts', 'Wonderland', 'crown'],
  ['disneyworlds', 'kh_peterpan', 'Peter Pan', 'Neverland', 'wind'],
  ['disneyworlds', 'kh_tinkerbell', 'Tinker Bell', 'Neverland', 'star'],
  ['disneyworlds', 'kh_hook', 'Captain Hook', 'Neverland', 'blade'],
  ['disneyworlds', 'kh_wendy', 'Wendy Darling', 'Neverland', 'dream'],
  ['disneyworlds', 'kh_jackskellington', 'Jack Skellington', 'Halloween Town', 'darkness'],
  ['disneyworlds', 'kh_sally', 'Sally', 'Halloween Town', 'flower'],
  ['disneyworlds', 'kh_oogie', 'Oogie Boogie', 'Halloween Town', 'darkness'],
  ['disneyworlds', 'kh_simba', 'Simba', 'Pride Lands', 'brawler'],
  ['disneyworlds', 'kh_nala', 'Nala', 'Pride Lands', 'heart'],
  ['disneyworlds', 'kh_scar', 'Scar', 'Pride Lands', 'darkness'],
  ['disneyworlds', 'kh_stitch', 'Stitch', 'Hawaii', 'brawler'],
  ['disneyworlds', 'kh_lilo', 'Lilo', 'Hawaii', 'flower'],
  ['disneyworlds', 'kh_woody', 'Woody', 'Andy’s Room', 'guard'],
  ['disneyworlds', 'kh_buzz', 'Buzz Lightyear', 'Andy’s Room', 'blade'],
  ['disneyworlds', 'kh_jessie', 'Jessie', 'Andy’s Room', 'star'],
  ['disneyworlds', 'kh_sulley', 'Sulley', 'Monstropolis', 'brawler'],
  ['disneyworlds', 'kh_mike', 'Mike Wazowski', 'Monstropolis', 'mage'],
  ['disneyworlds', 'kh_boo', 'Boo', 'Monstropolis', 'dream'],
  ['disneyworlds', 'kh_elsa', 'Elsa', 'Arendelle', 'water'],
  ['disneyworlds', 'kh_anna', 'Anna', 'Arendelle', 'heart'],
  ['disneyworlds', 'kh_olaf', 'Olaf', 'Arendelle', 'dream'],
  ['disneyworlds', 'kh_baymax', 'Baymax', 'San Fransokyo', 'guard'],
  ['disneyworlds', 'kh_hiro', 'Hiro Hamada', 'San Fransokyo', 'master'],
  ['disneyworlds', 'kh_ralph', 'Ralph', 'Game Central Station', 'brawler'],
  ['disneyworlds', 'kh_vanellope', 'Vanellope', 'Game Central Station', 'keyblade'],
  ['disneyworlds', 'kh_tron', 'Tron', 'The Grid', 'blade'],
];

const khExtraStart = KH_SPECIES.length;
const khExtraKeys = [];
KH_EXTRA_DEFS.forEach(([groupKey, key, name, world, art], index) => {
  const group = KH_GROUPS[groupKey];
  if (!group || ELEMENTS[key]) return;
  const palette = FRANCHISE_PALETTES[(khExtraStart + index) % FRANCHISE_PALETTES.length];
  const [primary, light, deep, accent] = palette;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: `${group.trait} ${name} keeps the world’s story close.`,
    blurb: `${group.blurb} ${name} arrives from ${world} with a heart full of complications.`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    parentTypes: ['Kingdom Hearts', group.label],
    kingdomHearts: true,
    khGroup: groupKey,
    khArt: art,
    khWorld: world,
    catalogType: `Kingdom Hearts · ${world}`,
  };
  GENE_POWERS[key] = {
    name: group.gene[0], icon: group.gene[1], desc: group.gene[2], effect: group.gene[3],
  };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = group.price + (index % 4) * 5;
  TYPE_EGG_PRICE[key] = discountedEggPrice(TYPE_EGG_BASE_PRICE[key]);
  HYBRID_NAMES[pairKey(key, group.partner)] = `${name} ${group.suffix}`;
  NAME_START[key] = [...new Set([name.replace(/[“”"']/g, '').split(' ')[0], 'Key', 'Heart', 'World'])];
  group.homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  KH_SPECIES.push(key);
  KH_BY_GROUP[groupKey].push(key);
  khExtraKeys.push(key);
});
KH_TOTAL = KH_SPECIES.length;
KH_WAVE.total = KH_TOTAL;

ELEMENT_KEYS.push(...careExtraKeys, ...ponyExtraKeys, ...tvExtraKeys, ...khExtraKeys);
FRANCHISE_WAVE_TOTAL = PONY_TOTAL + TV_LEGACY_TOTAL + REALM_TOTAL + KH_TOTAL;
