/* Grand Theft Auto wave: characters from every mainline GTA game become
   Hollow sprites, each with a gene, a Titan name, a type egg, hybrids, and a
   home biome. Loaded after data-franchise-waves.js so the shared wave helper
   and the franchise palettes are available. */

/* ---------- GTA district biomes ---------- */

const GTA_BIOME_DEFS = {
  'gta-libertycity': {
    name: 'Liberty City Docks', habitat: 'Liberty City', emoji: '🗽', bonus: 0.5,
    blurb: 'Rain on the piers, neon over the bridge, and a taxi horn somewhere that never stops.',
    tint: { b1: '#4a5a72', b2: '#0d1220', b3: '#cfe3ff' },
  },
  'gta-vicecity': {
    name: 'Vice Beach', habitat: 'Vice City', emoji: '🌴', bonus: 0.5,
    blurb: 'Pink sunset, palm shade, and a convertible radio stuck on the best song.',
    tint: { b1: '#ff6bd6', b2: '#1a0a2a', b3: '#8be9ff' },
  },
  'gta-sanandreas': {
    name: 'San Andreas Backroads', habitat: 'San Andreas', emoji: '🌵', bonus: 0.5,
    blurb: 'Dust, freight trains, and a horizon that keeps promising another county.',
    tint: { b1: '#d9a441', b2: '#2a1a08', b3: '#ffd9a0' },
  },
  'gta-losantos': {
    name: 'Los Santos Hills', habitat: 'Los Santos', emoji: '🌇', bonus: 0.5,
    blurb: 'Hillside houses, heli lights, and a city that looks best from above.',
    tint: { b1: '#ff9a5a', b2: '#160a1a', b3: '#ffd6a5' },
  },
  'gta-london': {
    name: 'London Streets', habitat: 'London', emoji: '☂️', bonus: 0.48,
    blurb: 'Wet cobbles, black cabs, and a fog that keeps everybody’s secrets.',
    tint: { b1: '#8f9bb3', b2: '#0a0d12', b3: '#e6eefc' },
  },
  'gta-chinatown': {
    name: 'Chinatown Alleys', habitat: 'Chinatown', emoji: '🏮', bonus: 0.48,
    blurb: 'Paper lanterns, stacked crates, and a back room behind every restaurant.',
    tint: { b1: '#e0503f', b2: '#170a08', b3: '#ffd166' },
  },
  'gta-anywhere': {
    name: 'Anywhere City', habitat: 'Anywhere City', emoji: '🚧', bonus: 0.48,
    blurb: 'Retro-future blocks, electric taxis, and a city that never says which decade it is.',
    tint: { b1: '#5f8f7a', b2: '#0a1a16', b3: '#a8ffd8' },
  },
};

Object.entries(GTA_BIOME_DEFS).forEach(([key, def]) => {
  if (SCENES[key]) return;
  SCENES[key] = {
    name: def.name,
    habitat: def.habitat,
    emoji: def.emoji,
    bonus: def.bonus,
    blurb: def.blurb,
    unlocked: true,
    gtaBiome: true,
    tint: def.tint,
    species: [],
  };
  SCENE_KEYS.push(key);
});

const GTA_BIOME_KEYS = Object.keys(GTA_BIOME_DEFS);

/* ---------- gangs, crews, and corners ---------- */

const GTA_GROUPS = {
  gta1: {
    label: 'GTA 1 & London', icon: '📼', price: 210,
    homes: ['gta-london', 'gta-libertycity', 'neon'], likes: 'Trail Mix', partner: 'normal', suffix: 'Classic',
    gene: ['Original Score', '📼', 'Gifts arrive 24% sooner and games pay +3 coins.', { giftSpeed: 1.24, gameCoins: 3 }],
    trait: 'Old-school — remembers when the whole city fit on one disc.',
    blurb: 'A founding-era GTA legend with a top-down city, a paper map, and absolutely no GPS.',
    greetings: [
      'Liberty City, 1997. Mind the traffic. There is no traffic law.',
      'I have been doing this since before the map had a north.',
      'No quest markers. You just had to know somebody who knew somebody.',
    ],
  },
  gta3: {
    label: 'GTA III', icon: '🏙️', price: 225,
    homes: ['gta-libertycity', 'night', 'neon'], likes: 'Pizza Slice', partner: 'normal', suffix: 'Hustle',
    gene: ['Liberty Hustle', '🏙️', 'Games pay +5 coins and all needs fade 10% slower.', { gameCoins: 5, decay: 0.9 }],
    trait: 'Silent — says more with a raised eyebrow than most people manage in a monologue.',
    blurb: 'A Liberty City operator from the third game, built out of rain, payphones, and a very short list of friends.',
    greetings: [
      'You work for me now. It is a better deal than it sounds.',
      'The payphone is ringing. That is never good news. Let us go anyway.',
      'Three islands. One bridge at a time.',
    ],
  },
  vice: {
    label: 'Vice City', icon: '🌴', price: 230,
    homes: ['gta-vicecity', 'sugar', 'tide'], likes: 'Tropical Fizz', partner: 'tide', suffix: 'Vice',
    gene: ['Vice Vice', '🌴', 'Night games pay +6 coins and pets pay +2 coins.', { nightCoins: 6, petCoins: 2 }],
    trait: 'Sunset — treats every crime like a music video and every room like a stage.',
    blurb: 'A Vice City icon in a pastel blazer, permanently two songs away from a montage.',
    greetings: [
      'The eighties called. They want their beach back. I said no.',
      'Sunset is at eight. Wear something loud.',
      'We are not in trouble. We are in a montage.',
    ],
  },
  san: {
    label: 'San Andreas', icon: '🟢', price: 235,
    homes: ['gta-sanandreas', 'grove', 'savanna'], likes: 'Grove Feast', partner: 'bloom', suffix: 'Grove',
    gene: ['Grove For Life', '🟢', 'Pets build +45% bond and snacks give +30% XP.', { petBond: 1.45, snackXp: 1.3 }],
    trait: 'Loyal — measures a whole state in friends, cousins, and long drives home.',
    blurb: 'A San Andreas local with a green rag, a BMX bike, and a family that is complicated even by Hollow standards.',
    greetings: [
      'You picked the right street. Everybody picks the right street eventually.',
      'Long drive? Good. We talk on the way.',
      'All you had to do was ask nicely.',
    ],
  },
  stories: {
    label: 'Stories', icon: '🎮', price: 220,
    homes: ['gta-libertycity', 'gta-vicecity', 'neon'], likes: 'Star Pop', partner: 'volt', suffix: 'Story',
    gene: ['Pocket Legend', '🎮', 'Chats pay +3 coins and games pay +4 coins.', { chatCoins: 3, gameCoins: 4 }],
    trait: 'Portable — does the same job as the big city legends, but fits in a pocket.',
    blurb: 'A Liberty City or Vice City Stories lead with a handheld-sized chip on their shoulder.',
    greetings: [
      'Everything the big city does, I do smaller and angrier.',
      'They put my whole year on a handheld. I am still not over it.',
      'One city. Two Stories. Same problems.',
    ],
  },
  iv: {
    label: 'GTA IV', icon: '🔔', price: 240,
    homes: ['gta-libertycity', 'night', 'crystal'], likes: 'Warm Soup', partner: 'dusk', suffix: 'Liberty',
    gene: ['Liberty Bell', '🔔', 'All needs fade 12% slower and gifts arrive 20% sooner.', { decay: 0.88, giftSpeed: 1.2 }],
    trait: 'Cold-weather — arrived with one suitcase and a long list of people to look up.',
    blurb: 'A GTA IV figure from Liberty City, carrying a cousin’s optimism and a very heavy coat.',
    greetings: [
      'In Liberty City, everyone is somebody’s cousin. Now I am yours.',
      'I came for a better life. I got a better story.',
      'Bowling? I know a place. I always know a place.',
    ],
  },
  v: {
    label: 'GTA V', icon: '🌇', price: 245,
    homes: ['gta-losantos', 'grove', 'savanna'], likes: 'Ember Steak', partner: 'hero', suffix: 'Heist',
    gene: ['Heist Split', '💰', 'Games pay +7 coins and gain +20% XP.', { gameCoins: 7, xp: 1.2 }],
    trait: 'Three-handed — thinks like a planner, drives like a lunatic, and somehow splits the take evenly.',
    blurb: 'A Los Santos heist veteran with a planner’s notebook, three friends on speed dial, and one very unlucky getaway car.',
    greetings: [
      'Three of us, one plan, no witnesses. That is the pitch.',
      'Los Santos looks better from a helicopter. Most things do.',
      'You bring the snacks. I will bring the getaway.',
    ],
  },
  chinatown: {
    label: 'Chinatown Wars', icon: '🏮', price: 215,
    homes: ['gta-chinatown', 'neon', 'night'], likes: 'Moon Cake', partner: 'dusk', suffix: 'Alley',
    gene: ['Paper Trail', '🏮', 'Gifts arrive 22% sooner and pets build +30% bond.', { giftSpeed: 1.22, petBond: 1.3 }],
    trait: 'Two-language — runs a deal, a favour, and a menu in the same sentence.',
    blurb: 'A Chinatown Wars operator with a handheld map, a rack of fake IDs, and a family business nobody wants to inherit.',
    greetings: [
      'You want the good stuff or the expensive stuff? Same shelf.',
      'My uncle runs this block. My other uncle also runs this block.',
      'Fixed prices. Flexible problems.',
    ],
  },
  gta2: {
    label: 'GTA 2', icon: '🚧', price: 215,
    homes: ['gta-anywhere', 'neon', 'night'], likes: 'Trail Mix', partner: 'normal', suffix: 'Retro',
    gene: ['Retro Future', '🚧', 'Games pay +4 coins and gifts arrive 20% sooner.', { gameCoins: 4, giftSpeed: 1.2 }],
    trait: 'Retro-future — drives an electric cab through a city with no name and three rival gangs.',
    blurb: 'An Anywhere City operator from GTA 2, all chrome, attitude, and a job list delivered by pager.',
    greetings: [
      'Anywhere City. Any decade. Same problems.',
      'Respect is everything. Everything else is just a job.',
      'Do the job, keep the pager, lose the witness.',
    ],
  },
  advance: {
    label: 'GTA Advance', icon: '📟', price: 210,
    homes: ['gta-libertycity', 'neon', 'night'], likes: 'Pizza Slice', partner: 'volt', suffix: 'Advance',
    gene: ['Handheld Hustle', '📟', 'Chats pay +3 coins and all needs fade 8% slower.', { chatCoins: 3, decay: 0.92 }],
    trait: 'Pocket-sized — runs an entire Liberty City on a battery and a bad attitude.',
    blurb: 'A GTA Advance figure from the handheld era, carrying a tiny city, a big grudge, and a cartridge full of trouble.',
    greetings: [
      'Whole city, two buttons, no map. Still made it work.',
      'My pager says you need something. Sit down.',
      'Small screen. Big debt. Same Liberty City.',
    ],
  },
};

const GTA_GROUP_ORDER = ['gta1', 'gta2', 'gta3', 'vice', 'san', 'advance', 'stories', 'iv', 'v', 'chinatown'];

/* [group, key, name, game/label, art] */
const GTA_DEFS = [
  /* GTA 1 & London */
  ['gta1', 'gta1_deever', 'Samuel Deever', 'Liberty City', 'badge'],
  ['gta1', 'gta1_marcus', 'Brother Marcus', 'San Andreas', 'gang'],
  ['gta1', 'gta1_bubba', 'Bubba', 'Liberty City', 'bat'],
  ['gta1', 'gta1_unclefu', 'Uncle Fu', 'Liberty City', 'gang'],
  ['gta1', 'gta1_elburro', 'El Burro', 'Liberty City', 'star'],
  ['gta1', 'gta1_donpablo', 'Don Pablo', 'Liberty City', 'crown'],
  ['gta1', 'gta1_katie', 'Katie', 'Liberty City', 'hair'],
  ['gta1', 'gta1_travis', 'Travis', 'Liberty City', 'suit'],
  ['gta1', 'gta1_mauricaine', 'Maurice Caine', 'London', 'suit'],
  ['gta1', 'gta1_harold', 'Harold', 'London', 'gun'],
  ['gta1', 'gta1_zak', 'Zak', 'London', 'wheel'],
  /* GTA 2 */
  ['gta2', 'gta2_claudespeed', 'Claude Speed', 'Anywhere City', 'jacket'],
  ['gta2', 'gta2_elmo', 'Elmo', 'Loonies turf', 'hair'],
  ['gta2', 'gta2_johnnyzoo', 'Johnny Zoo', 'Yakuza turf', 'mask'],
  ['gta2', 'gta2_treywelsh', 'Trey Welsh', 'Zaibatsu tower', 'suit'],
  ['gta2', 'gta2_labrat', 'Dr. LaBrat', 'SRS labs', 'phone'],
  ['gta2', 'gta2_billybob', 'Billy Bob Bean', 'Redneck county', 'cap'],
  /* GTA III */
  ['gta3', 'gta3_claude', 'Claude', 'Liberty City', 'jacket'],
  ['gta3', 'gta3_eightball', '8-Ball', 'Liberty City', 'boom'],
  ['gta3', 'gta3_misty', 'Misty', 'Red Light District', 'hair'],
  ['gta3', 'gta3_luigi', 'Luigi Goterelli', 'Red Light District', 'suit'],
  ['gta3', 'gta3_joey', 'Joey Leone', 'Trenton', 'wheel'],
  ['gta3', 'gta3_toni', 'Toni Cipriani', 'Saint Mark’s', 'bat'],
  ['gta3', 'gta3_salvatore', 'Salvatore Leone', 'Saint Mark’s', 'crown'],
  ['gta3', 'gta3_asuka', 'Asuka Kasen', 'Staunton Island', 'gun'],
  ['gta3', 'gta3_kenji', 'Kenji Kasen', 'Staunton Island', 'suit'],
  ['gta3', 'gta3_donald', 'Donald Love', 'Staunton Island', 'cash'],
  ['gta3', 'gta3_ray', 'Ray Machowski', 'Liberty City', 'badge'],
  ['gta3', 'gta3_phil', 'Phil Cassidy', 'Liberty City', 'boom'],
  ['gta3', 'gta3_maria', 'Maria Latore', 'Liberty City', 'hair'],
  ['gta3', 'gta3_catalina', 'Catalina', 'Liberty City', 'gun'],
  ['gta3', 'gta3_kingcourtney', 'King Courtney', 'Liberty City', 'gang'],
  ['gta3', 'gta3_dice', 'D-Ice', 'Shoreside Vale', 'gang'],
  ['gta3', 'gta3_marty', 'Marty Chonks', 'Portland', 'phone'],
  /* Vice City */
  ['vice', 'vice_tommy', 'Tommy Vercetti', 'Vice Beach', 'jacket'],
  ['vice', 'vice_sonny', 'Sonny Forelli', 'Liberty City', 'suit'],
  ['vice', 'vice_ken', 'Ken Rosenberg', 'Vice City', 'suit'],
  ['vice', 'vice_lance', 'Lance Vance', 'Vice City', 'shades'],
  ['vice', 'vice_cortez', 'Colonel Cortez', 'Vice City', 'suit'],
  ['vice', 'vice_mercedes', 'Mercedes Cortez', 'Vice City', 'hair'],
  ['vice', 'vice_kentpaul', 'Kent Paul', 'Vice City', 'mic'],
  ['vice', 'vice_umberto', 'Umberto Robina', 'Little Havana', 'gang'],
  ['vice', 'vice_poulet', 'Auntie Poulet', 'Little Haiti', 'crown'],
  ['vice', 'vice_diaz', 'Ricardo Diaz', 'Starfish Island', 'crown'],
  ['vice', 'vice_candy', 'Candy Suxxx', 'Vice City', 'star'],
  ['vice', 'vice_steve', 'Steve Scott', 'Vice City', 'mic'],
  ['vice', 'vice_hilary', 'Hilary King', 'Vice City', 'wheel'],
  ['vice', 'vice_mitch', 'Big Mitch Baker', 'Vice City', 'bike'],
  ['vice', 'vice_avery', 'Avery Carrington', 'Vice City', 'cash'],
  ['vice', 'vice_gonzales', 'Gonzalez', 'Vice City', 'suit'],
  /* San Andreas */
  ['san', 'san_cj', 'Carl Johnson', 'Grove Street', 'gang'],
  ['san', 'san_sweet', 'Sweet Johnson', 'Grove Street', 'gang'],
  ['san', 'san_kendl', 'Kendl Johnson', 'Grove Street', 'hair'],
  ['san', 'san_ryder', 'Ryder', 'Grove Street', 'cap'],
  ['san', 'san_bigsmoke', 'Big Smoke', 'Ganton', 'food'],
  ['san', 'san_ogloc', 'OG Loc', 'Los Santos', 'mic'],
  ['san', 'san_cesar', 'Cesar Vialpando', 'Los Santos', 'wheel'],
  ['san', 'san_woozie', 'Wu Zi Mu', 'San Fierro', 'shades'],
  ['san', 'san_ranfali', 'Ran Fa Li', 'San Fierro', 'suit'],
  ['san', 'san_truth', 'The Truth', 'San Fierro', 'hair'],
  ['san', 'san_toreno', 'Mike Toreno', 'Las Venturas', 'phone'],
  ['san', 'san_tenpenny', 'Officer Tenpenny', 'Los Santos', 'badge'],
  ['san', 'san_pulaski', 'Officer Pulaski', 'Los Santos', 'badge'],
  ['san', 'san_hernandez', 'Officer Hernandez', 'Los Santos', 'badge'],
  ['san', 'san_bigbear', 'Big Bear', 'Ganton', 'gang'],
  ['san', 'san_bdup', 'B-Dup', 'Ganton', 'cash'],
  ['san', 'san_zero', 'Zero', 'San Fierro', 'mask'],
  ['san', 'san_jizzy', 'Jizzy B', 'San Fierro', 'mic'],
  ['san', 'san_tbone', 'T-Bone Mendez', 'San Fierro', 'gun'],
  ['san', 'san_madddogg', 'Madd Dogg', 'Los Santos', 'mic'],
  ['san', 'san_denise', 'Denise Robinson', 'Los Santos', 'hair'],
  /* Liberty City / Vice City Stories */
  ['stories', 'stories_toni', 'Toni Cipriani', 'Liberty City Stories', 'bat'],
  ['stories', 'stories_vincenzo', 'Vincenzo Cilli', 'Liberty City Stories', 'suit'],
  ['stories', 'stories_jd', 'JD O’Toole', 'Liberty City Stories', 'cap'],
  ['stories', 'stories_mcaffrey', 'Leon McAffrey', 'Liberty City Stories', 'badge'],
  ['stories', 'stories_hopper', 'Jane Hopper', 'Liberty City Stories', 'cash'],
  ['stories', 'stories_vic', 'Vic Vance', 'Vice City Stories', 'jacket'],
  ['stories', 'stories_louise', 'Louise Cassidy-Williams', 'Vice City Stories', 'hair'],
  ['stories', 'stories_marty', 'Marty Jay Williams', 'Vice City Stories', 'gang'],
  ['stories', 'stories_reni', 'Reni Wassulmaier', 'Vice City Stories', 'star'],
  ['stories', 'stories_barry', 'Barry Mickelthwaite', 'Vice City Stories', 'suit'],
  ['stories', 'stories_jerry', 'Jerry Martinez', 'Vice City Stories', 'badge'],
  ['stories', 'stories_diego', 'Diego Mendez', 'Vice City Stories', 'crown'],
  /* GTA IV */
  ['iv', 'iv_niko', 'Niko Bellic', 'Liberty City', 'jacket'],
  ['iv', 'iv_roman', 'Roman Bellic', 'Broker', 'cash'],
  ['iv', 'iv_mallorie', 'Mallorie Bardas', 'Broker', 'hair'],
  ['iv', 'iv_brucie', 'Brucie Kibbutz', 'Algonquin', 'shades'],
  ['iv', 'iv_jacob', 'Little Jacob', 'Dukes', 'cap'],
  ['iv', 'iv_packie', 'Packie McReary', 'Dukes', 'gun'],
  ['iv', 'iv_kate', 'Kate McReary', 'Dukes', 'hair'],
  ['iv', 'iv_gerry', 'Gerry McReary', 'Alderney', 'gang'],
  ['iv', 'iv_francis', 'Francis McReary', 'Algonquin', 'badge'],
  ['iv', 'iv_derrick', 'Derrick McReary', 'Alderney', 'bike'],
  ['iv', 'iv_dwayne', 'Dwayne Forge', 'Bohan', 'gang'],
  ['iv', 'iv_playboyx', 'Playboy X', 'Algonquin', 'suit'],
  ['iv', 'iv_manny', 'Manny Escuela', 'Bohan', 'mic'],
  ['iv', 'iv_elizabeta', 'Elizabeta Torres', 'Bohan', 'cash'],
  ['iv', 'iv_faustin', 'Mikhail Faustin', 'Hove Beach', 'crown'],
  ['iv', 'iv_dimitri', 'Dimitri Rascalov', 'Hove Beach', 'suit'],
  ['iv', 'iv_vlad', 'Vlad Glebov', 'Hove Beach', 'gun'],
  ['iv', 'iv_rayboccino', 'Ray Boccino', 'Algonquin', 'suit'],
  ['iv', 'iv_philbell', 'Phil Bell', 'Alderney', 'cash'],
  ['iv', 'iv_gaytony', 'Gay Tony Prince', 'Algonquin', 'star'],
  ['iv', 'iv_luis', 'Luis Lopez', 'Algonquin', 'bike'],
  ['iv', 'iv_johnny', 'Johnny Klebitz', 'Alderney', 'bike'],
  ['iv', 'iv_billy', 'Billy Grey', 'Alderney', 'gang'],
  ['iv', 'iv_jim', 'Jim Fitzgerald', 'Alderney', 'gun'],
  ['iv', 'iv_ashley', 'Ashley Butler', 'Alderney', 'hair'],
  /* GTA V */
  ['v', 'v_michael', 'Michael De Santa', 'Los Santos', 'suit'],
  ['v', 'v_franklin', 'Franklin Clinton', 'Los Santos', 'jacket'],
  ['v', 'v_trevor', 'Trevor Philips', 'Sandy Shores', 'hair'],
  ['v', 'v_lamar', 'Lamar Davis', 'Los Santos', 'gang'],
  ['v', 'v_lester', 'Lester Crest', 'Los Santos', 'phone'],
  ['v', 'v_ron', 'Ron Jakowski', 'Sandy Shores', 'cap'],
  ['v', 'v_wade', 'Wade Hebert', 'Sandy Shores', 'hair'],
  ['v', 'v_amanda', 'Amanda De Santa', 'Los Santos', 'hair'],
  ['v', 'v_jimmy', 'Jimmy De Santa', 'Los Santos', 'cap'],
  ['v', 'v_tracey', 'Tracey De Santa', 'Los Santos', 'star'],
  ['v', 'v_norton', 'Dave Norton', 'Los Santos', 'badge'],
  ['v', 'v_haines', 'Steve Haines', 'Los Santos', 'suit'],
  ['v', 'v_weston', 'Devin Weston', 'Los Santos', 'cash'],
  ['v', 'v_madrazo', 'Martin Madrazo', 'Los Santos', 'crown'],
  ['v', 'v_simeon', 'Simeon Yetarian', 'Los Santos', 'suit'],
  ['v', 'v_weicheng', 'Wei Cheng', 'Los Santos', 'mask'],
  ['v', 'v_stretch', 'Stretch', 'Los Santos', 'gang'],
  ['v', 'v_tanisha', 'Tanisha Jackson', 'Los Santos', 'hair'],
  ['v', 'v_chop', 'Chop', 'Los Santos', 'dog'],
  ['v', 'v_chef', 'Chef', 'Sandy Shores', 'food'],
  /* GTA Advance */
  ['advance', 'adv_mike', 'Mike', 'Liberty City', 'jacket'],
  ['advance', 'adv_vinnie', 'Vinnie', 'Liberty City', 'suit'],
  ['advance', 'adv_yuka', 'Yuka', 'Liberty City', 'hair'],
  ['advance', 'adv_cisco', 'Cisco', 'Liberty City', 'gun'],
  ['advance', 'adv_jonnie', 'Jonnie', 'Liberty City', 'gang'],
  ['advance', 'adv_kingcourtney', 'King Courtney', 'Liberty City', 'crown'],
  /* Chinatown Wars */
  ['chinatown', 'ct_huang', 'Huang Lee', 'Liberty City', 'jacket'],
  ['chinatown', 'ct_kenny', 'Wu “Kenny” Lee', 'Liberty City', 'suit'],
  ['chinatown', 'ct_chan', 'Chan Jaoming', 'Liberty City', 'gang'],
  ['chinatown', 'ct_zhou', 'Zhou Ming', 'Liberty City', 'crown'],
  ['chinatown', 'ct_melanie', 'Melanie Mallard', 'Liberty City', 'hair'],
  ['chinatown', 'ct_rudy', 'Rudy D’Avanzo', 'Liberty City', 'gun'],
];

const GTA_PALETTES = [
  ['#7f9ec4', '#e3f1ff', '#16304a', '#ffd166'],
  ['#ff7ac8', '#ffe4f5', '#3a0d2c', '#8be9ff'],
  ['#7ee787', '#e6ffe9', '#14401c', '#ffd166'],
  ['#ffb15c', '#fff0d9', '#3a1a06', '#ff6b4a'],
  ['#b79cff', '#f0e9ff', '#22104d', '#7affd8'],
  ['#8be9ff', '#e9fcff', '#0e3a4a', '#ffd166'],
  ['#ffd166', '#fff7d6', '#4a3200', '#c9455c'],
  ['#c9455c', '#ffdde3', '#3a0a12', '#ffd166'],
  ['#8f9bb3', '#eaf0ff', '#0a0d12', '#8be9ff'],
  ['#4fc9e0', '#e2fbff', '#0d3140', '#ff7ac8'],
  ['#d9a441', '#fff2c7', '#3a2606', '#c9455c'],
  ['#6b8a4a', '#e8f4dc', '#202e12', '#ffcf5c'],
];

const GTA_WAVE = registerFranchiseWave({
  parentType: 'Grand Theft Auto', shortLabel: 'GTA', flag: 'gta', groupField: 'gtaGroup',
  artField: 'gtaArt', subtitleField: 'gtaGame', groups: GTA_GROUPS, groupOrder: GTA_GROUP_ORDER,
  rows: GTA_DEFS, palettes: GTA_PALETTES,
  titan: (name) => `${name} Titan`,
});

const GTA_SPECIES = GTA_WAVE.species;

/* Every GTA sprite wakes up in its own game's district instead of a generic
   meadow, so the homes picker lands somewhere that fits the character. */
GTA_SPECIES.forEach((key) => {
  const meta = ELEMENTS[key];
  const group = GTA_GROUPS[meta.gtaGroup];
  if (group && group.homes && group.homes[0]) meta.gtaHome = group.homes[0];
});
const GTA_BY_GROUP = GTA_WAVE.byGroup;
const GTA_TOTAL = GTA_WAVE.total;

function isGtaSpecies(key) {
  return !!(ELEMENTS[key] && ELEMENTS[key].gta);
}

function gtaGameLabel(key) {
  const meta = ELEMENTS[key];
  if (!meta || !meta.gta) return '';
  const group = GTA_GROUPS[meta.gtaGroup];
  return group ? `${meta.gtaGame} · ${group.label}` : meta.gtaGame || 'GTA';
}
