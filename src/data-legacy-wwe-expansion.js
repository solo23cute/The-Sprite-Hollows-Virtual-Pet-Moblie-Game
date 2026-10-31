/* 3.3.0 roster widening. Keeps the original 59 Legacy and 20 WWE entries
   intact and appends more Battle Pass outfits and a multi-era locker room. */

/* ---------------- Fortnite Legacy: 75 more outfits ---------------- */

/* [chapter, key, name, season, art, optional extra homes] */
const FORTNITE_LEGACY_EXTRA_DEFS = [
  ['c1', 'fn_bluesquire', 'Blue Squire', 'Chapter 1 · Season 2', 'knight'],
  ['c1', 'fn_royaleknight', 'Royale Knight', 'Chapter 1 · Season 2', 'knight'],
  ['c1', 'fn_missionspecialist', 'Mission Specialist', 'Chapter 1 · Season 3', 'agent'],
  ['c1', 'fn_moonwalker', 'Moonwalker', 'Chapter 1 · Season 3', 'neon'],
  ['c1', 'fn_zoey', 'Zoey', 'Chapter 1 · Season 4', 'hero'],
  ['c1', 'fn_sunstrider', 'Sun Strider', 'Chapter 1 · Season 5', 'drift'],
  ['c1', 'fn_huntress', 'Huntress', 'Chapter 1 · Season 5', 'myth'],
  ['c1', 'fn_djyonder', 'DJ Yonder', 'Chapter 1 · Season 6', 'neon'],
  ['c1', 'fn_nightshade', 'Nightshade', 'Chapter 1 · Season 6', 'witch'],
  ['c1', 'fn_zenith', 'Zenith', 'Chapter 1 · Season 7', 'cosmic'],
  ['c1', 'fn_onesie', 'Onesie', 'Chapter 1 · Season 7', 'star'],
  ['c1', 'fn_sidewinder', 'Sidewinder', 'Chapter 1 · Season 8', 'fighter'],
  ['c1', 'fn_emberoutfit', 'Ember', 'Chapter 1 · Season 8', 'power'],
  ['c1', 'fn_sentinel', 'Sentinel', 'Chapter 1 · Season 9', 'armor'],
  ['c1', 'fn_xlord', 'X-Lord', 'Chapter 1 · Season X', 'raider'],

  ['c2', 'fn_8ball', '8-Ball', 'Chapter 2 · Season 1', 'agent'],
  ['c2', 'fn_midas', 'Midas', 'Chapter 2 · Season 2', 'king', ['neon']],
  ['c2', 'fn_meowscles', 'Meowscles', 'Chapter 2 · Season 2', 'brawler'],
  ['c2', 'fn_tntina', 'TNTina', 'Chapter 2 · Season 2', 'mechanic'],
  ['c2', 'fn_deadpool', 'Deadpool', 'Chapter 2 · Season 2', 'mask'],
  ['c2', 'fn_aquaman', 'Aquaman', 'Chapter 2 · Season 3', 'power', ['tide']],
  ['c2', 'fn_fade', 'Fade', 'Chapter 2 · Season 3', 'drift'],
  ['c2', 'fn_ironman', 'Iron Man', 'Chapter 2 · Season 4', 'armor'],
  ['c2', 'fn_mystique', 'Mystique', 'Chapter 2 · Season 4', 'mask'],
  ['c2', 'fn_stormoutfit', 'Storm', 'Chapter 2 · Season 4', 'power'],
  ['c2', 'fn_mandalorian', 'The Mandalorian', 'Chapter 2 · Season 5', 'armor'],
  ['c2', 'fn_raven', 'Raven', 'Chapter 2 · Season 6', 'witch'],
  ['c2', 'fn_spireassassin', 'Spire Assassin', 'Chapter 2 · Season 6', 'armor'],
  ['c2', 'fn_superman', 'Superman', 'Chapter 2 · Season 7', 'hero'],
  ['c2', 'fn_cubequeen', 'Cube Queen', 'Chapter 2 · Season 8', 'cosmic'],

  ['c3', 'fn_ronin', 'Ronin', 'Chapter 3 · Season 1', 'fighter'],
  ['c3', 'fn_harlowe', 'Harlowe', 'Chapter 3 · Season 1', 'raider'],
  ['c3', 'fn_shanta', 'Shanta', 'Chapter 3 · Season 1', 'explorer'],
  ['c3', 'fn_spiderman3', 'Spider-Man', 'Chapter 3 · Season 1', 'hero'],
  ['c3', 'fn_tsuki', 'Tsuki', 'Chapter 3 · Season 2', 'fighter'],
  ['c3', 'fn_doctorstrange', 'Doctor Strange', 'Chapter 3 · Season 2', 'myth'],
  ['c3', 'fn_prowler', 'Prowler', 'Chapter 3 · Season 2', 'agent'],
  ['c3', 'fn_indianajones', 'Indiana Jones', 'Chapter 3 · Season 3', 'explorer'],
  ['c3', 'fn_snap', 'Snap', 'Chapter 3 · Season 3', 'robot'],
  ['c3', 'fn_gwenstacy', 'Gwen Stacy', 'Chapter 3 · Season 4', 'hero'],
  ['c3', 'fn_dragonrider', 'Dragon Rider', 'Chapter 3 · Season 4', 'myth'],
  ['c3', 'fn_mechateamleader', 'Mecha Team Leader', 'Chapter 3 · Season 4', 'robot'],
  ['c3', 'fn_herald', 'The Herald', 'Chapter 3 · Season 4', 'cosmic'],
  ['c3', 'fn_malik', 'Malik', 'Chapter 3 · Season 4', 'fighter'],
  ['c3', 'fn_sabina', 'Sabina', 'Chapter 3 · Season 4', 'fighter'],

  ['c4', 'fn_dusty', 'Dusty', 'Chapter 4 · Season 1', 'raider'],
  ['c4', 'fn_ageless', 'The Ageless', 'Chapter 4 · Season 1', 'myth'],
  ['c4', 'fn_helsie', 'Helsie', 'Chapter 4 · Season 1', 'explorer'],
  ['c4', 'fn_mort', 'Mort', 'Chapter 4 · Season 1', 'brawler'],
  ['c4', 'fn_eren', 'Eren Jaeger', 'Chapter 4 · Season 2', 'fighter'],
  ['c4', 'fn_attacktitan', 'Attack Titan', 'Chapter 4 · Season 2', 'power'],
  ['c4', 'fn_stray', 'Stray', 'Chapter 4 · Season 2', 'agent'],
  ['c4', 'fn_miles', 'Miles Morales', 'Chapter 4 · Season 3', 'hero'],
  ['c4', 'fn_spiderman2099', 'Spider-Man 2099', 'Chapter 4 · Season 3', 'hero'],
  ['c4', 'fn_purradisemeowscles', 'Purradise Meowscles', 'Chapter 4 · Season 3', 'brawler'],
  ['c4', 'fn_obiwan', 'Obi-Wan Kenobi', 'Chapter 4 · Season 4', 'fighter'],
  ['c4', 'fn_padme', 'Padmé Amidala', 'Chapter 4 · Season 4', 'agent'],
  ['c4', 'fn_princessleia', 'Princess Leia', 'Chapter 4 · Season 4', 'star'],
  ['c4', 'fn_renegadelynx', 'Renegade Lynx', 'Chapter 4 · OG', 'raider'],
  ['c4', 'fn_raventeamleader', 'Raven Team Leader', 'Chapter 4 · OG', 'neon'],

  ['c5', 'fn_nisha', 'Nisha', 'Chapter 5 · Season 1', 'raider'],
  ['c5', 'fn_oscar', 'Oscar', 'Chapter 5 · Season 1', 'brawler'],
  ['c5', 'fn_montague', 'Montague', 'Chapter 5 · Season 1', 'knight'],
  ['c5', 'fn_valeria', 'Valeria', 'Chapter 5 · Season 1', 'myth'],
  ['c5', 'fn_hope', 'Hope', 'Chapter 5 · Season 1', 'hero'],
  ['c5', 'fn_cerberus', 'Cerberus', 'Chapter 5 · Season 2', 'wolf'],
  ['c5', 'fn_poseidon', 'Poseidon', 'Chapter 5 · Season 2', 'king'],
  ['c5', 'fn_aphrodite', 'Aphrodite', 'Chapter 5 · Season 2', 'myth'],
  ['c5', 'fn_korra', 'Korra', 'Chapter 5 · Season 3', 'fighter'],
  ['c5', 'fn_shredder', 'Shredder', 'Chapter 5 · Season 3', 'mask'],
  ['c5', 'fn_mysterio', 'Mysterio', 'Chapter 5 · Season 4', 'mask'],
  ['c5', 'fn_ironspider', 'Iron Spider', 'Chapter 5 · Season 4', 'armor'],
  ['c5', 'fn_wolverine', 'Wolverine', 'Chapter 5 · Season 4', 'brawler'],
  ['c5', 'fn_snoopdogg', 'Snoop Dogg', 'Chapter 5 · Remix', 'star'],
  ['c5', 'fn_eminem', 'Eminem', 'Chapter 5 · Remix', 'star'],
];

const FORTNITE_LEGACY_EXTRA_SPECIES = [];
const legacyPaletteOffset = FORTNITE_LEGACY_SPECIES.length;

FORTNITE_LEGACY_EXTRA_DEFS.forEach(([chapterKey, key, name, season, art, extraHomes], index) => {
  const group = FORTNITE_LEGACY_GROUPS[chapterKey];
  if (!group || ELEMENTS[key]) return;
  const palette = FORTNITE_LEGACY_PALETTES[(legacyPaletteOffset + index) % FORTNITE_LEGACY_PALETTES.length];
  const [primary, light, deep, accent] = palette;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: `${group.trait} ${name} returned with the ${season} crowd and a story about the old island.`,
    blurb: `${group.blurb} ${name} carries a ${season} badge and a very specific memory of the drop.`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    parentTypes: ['Fortnite Legacy', `Fortnite ${group.label}`],
    fortniteLegacy: true,
    fortniteLegacyGroup: chapterKey,
    fortniteLegacyArt: art,
    fortniteSeason: season,
    catalogType: `Fortnite legacy · ${season}`,
  };
  GENE_POWERS[key] = {
    name: group.gene[0], icon: group.gene[1], desc: group.gene[2], effect: group.gene[3],
  };
  TITAN_NAMES[key] = `${name} Titan`;
  const basePrice = group.price + (index % 5) * 4;
  TYPE_EGG_BASE_PRICE[key] = basePrice;
  TYPE_EGG_PRICE[key] = discountedEggPrice(basePrice);
  HYBRID_NAMES[pairKey(key, group.partner)] = `${name.replace(/^The /, '')} ${group.suffix}`;
  NAME_START[key] = [...new Set([name.replace(/^The /, '').split(' ')[0], 'Rift', 'Island', 'Season'])];
  const homes = [...new Set([...(extraHomes || []), ...group.homes])];
  homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  FORTNITE_LEGACY_SPECIES.push(key);
  FORTNITE_LEGACY_BY_CHAPTER[chapterKey].push(key);
  FORTNITE_LEGACY_EXTRA_SPECIES.push(key);
});

ELEMENT_KEYS.push(...FORTNITE_LEGACY_EXTRA_SPECIES);
FORTNITE_LEGACY_TOTAL = FORTNITE_LEGACY_SPECIES.length;
FORTNITE_TOTAL = FORTNITE_SPECIES.length + FORTNITE_LEGACY_TOTAL;

/* ---------------- WWE: 48 more across seven eras ---------------- */

const WWE_EXTRA_GROUPS = {
  golden: {
    label: 'Golden Era', icon: '🏛️', price: 215,
    homes: ['ember', 'neon', 'night'], likes: 'Prime Rib', partner: 'crown', suffix: 'Era',
    gene: ['Golden Legacy', '🏛️', 'Games pay +6 coins and gifts arrive 25% sooner.', { gameCoins: 6, giftSpeed: 1.25 }],
    trait: 'Golden — the entrance is a event, the handshake is a headline, and the crowd already knows the song.',
    blurb: 'A larger-than-life Golden Era star with a championship pedigree and a promo for every occasion.',
    greetings: [
      'Brother, the ring is ready and the people are on their feet.',
      'I have main-evented arenas, airports, and one very confused buffet.',
      'You can boo me. Just make sure you mean it.',
    ],
    note: 'Hulk Hogan, André the Giant, Macho Man, Ultimate Warrior, Roddy Piper, Ric Flair, and Jake Roberts.',
  },
  attitude: {
    label: 'Attitude Era', icon: '😎', price: 225,
    homes: ['night', 'ember', 'neon'], likes: 'Ember Steak', partner: 'volt', suffix: 'Rattle',
    gene: ['Attitude', '😎', 'Night games pay +6 coins and gain +15% XP.', { nightCoins: 6, xp: 1.15 }],
    trait: 'Unfiltered — turns a microphone into a weapon and a chair into a plot device.',
    blurb: 'An Attitude Era icon with a loud entrance, a louder promo, and absolutely no interest in playing it safe.',
    greetings: [
      'Finally, the people have a reason to stay up late.',
      'I do not need a script. I need a microphone and a rival.',
      'If the table is not broken, we have not started.',
    ],
    note: 'Mankind, Kane, Big Show, Chris Jericho, Kurt Angle, Eddie Guerrero, Brock Lesnar, and Rikishi.',
  },
  ruthless: {
    label: 'Ruthless Aggression', icon: '💥', price: 225,
    homes: ['ember', 'savanna', 'neon'], likes: 'Juicy Drumstick', partner: 'volt', suffix: 'Aggression',
    gene: ['Ruthless', '💥', 'Games pay +5 coins and gain +18% XP.', { gameCoins: 5, xp: 1.18 }],
    trait: 'Ruthless — takes every opening and makes it look like a highlight reel.',
    blurb: 'A Ruthless Aggression-era superstar with a high-impact move set and a title in their sights.',
    greetings: [
      'I do not ask for the spotlight. I take the whole ring.',
      'You want a highlight? Keep watching.',
      'Every match is a main event if I am in it.',
    ],
    note: 'Batista, Rey Mysterio, Edge, Christian, Booker T, Rob Van Dam, and JBL.',
  },
  pg: {
    label: 'PG Era', icon: '🌟', price: 220,
    homes: ['neon', 'aurora', 'sugar'], likes: 'Star Cookie', partner: 'radiant', suffix: 'Spark',
    gene: ['PG Spark', '🌟', 'Day games pay +5 coins, gifts arrive 18% sooner, and bond grows +20%.', { dayCoins: 5, giftSpeed: 1.18, petBond: 1.2 }],
    trait: 'PG-era — big moves, bright production, and a catchphrase for the whole family.',
    blurb: 'A PG Era superstar with a signature chant, a championship resume, and a genuinely good catchphrase.',
    greetings: [
      'The crowd is chanting. I am contractually obligated to smile.',
      'This is a family show. The finishing move is still real.',
      'I have a title match and a school assembly. Busy week.',
    ],
    note: 'Sheamus, Kofi Kingston, Big E, Xavier Woods, Daniel Bryan, Bray Wyatt, and Finn Bálor.',
  },
  womenlegends: {
    label: 'Women’s Legends', icon: '👑', price: 225,
    homes: ['aurora', 'ember', 'dream'], likes: 'Star Fruit', partner: 'radiant', suffix: 'Crown',
    gene: ['Women’s Legacy', '👑', 'Gain +20% XP, bond grows +30%, and gifts arrive 20% sooner.', { xp: 1.2, petBond: 1.3, giftSpeed: 1.2 }],
    trait: 'Trailblazing — built the division one match, one promo, and one broken barrier at a time.',
    blurb: 'A women’s wrestling legend with a defining entrance, a title legacy, and a locker room that stands taller because of her.',
    greetings: [
      'The division is not a side story. It is the main event.',
      'I did not wait for history. I made it.',
      'The crown is mine. The fight belongs to everyone who comes next.',
    ],
    note: 'Chyna, Trish Stratus, Lita, Beth Phoenix, Michelle McCool, Natalya, and Alundra Blayze.',
  },
  tagteams: {
    label: 'Tag Team Division', icon: '🤝', price: 210,
    homes: ['ember', 'savanna', 'neon'], likes: 'Juicy Drumstick', partner: 'crown', suffix: 'Double',
    gene: ['Tag Team Tactics', '🤝', 'Games pay +4 coins and petting builds +35% bond.', { gameCoins: 4, petBond: 1.35 }],
    trait: 'Tag-tested — always knows when to make the hot tag and when to break the rules.',
    blurb: 'A legendary tag team with matching gear, a double-team finish, and an entrance that fills the whole aisle.',
    greetings: [
      'Tag me in. I have been waiting by the corner.',
      'The tag rope is a suggestion. The double-team is a promise.',
      'Two hearts, one corner, no survivors.',
    ],
    note: 'The Road Warriors, The Hart Foundation, The Dudley Boyz, The Usos, The Rockers, and The Steiner Brothers.',
  },
  nxt: {
    label: 'NXT', icon: '🟡', price: 205,
    homes: ['neon', 'crystal', 'ember'], likes: 'Star Pop', partner: 'volt', suffix: 'Uprising',
    gene: ['NXT Uprising', '🟡', 'Night games pay +3 coins, gain +16% XP, and gifts arrive 18% sooner.', { nightCoins: 3, xp: 1.16, giftSpeed: 1.18 }],
    trait: 'Next-level — the future of the business, already main-eventing in the building where it started.',
    blurb: 'An NXT standout with a takeover-sized entrance, a black-and-gold chip on the shoulder, and a point to prove.',
    greetings: [
      'The future is not waiting backstage.',
      'Black and gold built this. Now I am building the next chapter.',
      'Takeover is not a show. It is a warning.',
    ],
    note: 'Johnny Gargano, Tommaso Ciampa, Adam Cole, Shayna Baszler, Io Shirai, and Bron Breakker.',
  },
};

const WWE_EXTRA_GROUP_ORDER = ['golden', 'attitude', 'ruthless', 'pg', 'womenlegends', 'tagteams', 'nxt'];
WWE_EXTRA_GROUP_ORDER.forEach((group) => {
  if (!WWE_GROUPS[group]) WWE_GROUPS[group] = WWE_EXTRA_GROUPS[group];
  if (!WWE_BY_GROUP[group]) WWE_BY_GROUP[group] = [];
  if (!WWE_GROUP_ORDER.includes(group)) WWE_GROUP_ORDER.push(group);
});

/* [group, key, name, nickname, art] */
const WWE_EXTRA_DEFS = [
  ['golden', 'wwe_hulkhogan', 'Hulk Hogan', 'The Hulkster', 'showman'],
  ['golden', 'wwe_andre', 'André the Giant', 'The Eighth Wonder', 'power'],
  ['golden', 'wwe_machoman', '“Macho Man” Randy Savage', 'The Macho King', 'showman'],
  ['golden', 'wwe_ultimatewarrior', 'Ultimate Warrior', 'The Warrior', 'power'],
  ['golden', 'wwe_roddyPiper', '“Rowdy” Roddy Piper', 'Hot Rod', 'brawler'],
  ['golden', 'wwe_ricflair', 'Ric Flair', 'The Nature Boy', 'champion'],
  ['golden', 'wwe_jakeroberts', 'Jake “The Snake” Roberts', 'The Snake', 'deadman'],

  ['attitude', 'wwe_mankind', 'Mankind', 'The Hardcore Legend', 'brawler'],
  ['attitude', 'wwe_kane', 'Kane', 'The Big Red Machine', 'deadman'],
  ['attitude', 'wwe_bigshow', 'Big Show', 'The World’s Largest Athlete', 'power'],
  ['attitude', 'wwe_chrisjericho', 'Chris Jericho', 'The Ayatollah of Rock ’n’ Rolla', 'showman'],
  ['attitude', 'wwe_kurtangle', 'Kurt Angle', 'The Olympic Hero', 'champion'],
  ['attitude', 'wwe_eddieguerrero', 'Eddie Guerrero', 'Latino Heat', 'highflyer'],
  ['attitude', 'wwe_brocklesnar', 'Brock Lesnar', 'The Beast Incarnate', 'power'],
  ['attitude', 'wwe_rikishi', 'Rikishi', 'The Samoan Stinker', 'highflyer'],

  ['ruthless', 'wwe_batista', 'Batista', 'The Animal', 'power'],
  ['ruthless', 'wwe_reymysterio', 'Rey Mysterio', 'The Master of the 619', 'highflyer'],
  ['ruthless', 'wwe_edge', 'Edge', 'The Rated-R Superstar', 'viper'],
  ['ruthless', 'wwe_christian', 'Christian', 'Captain Charisma', 'showman'],
  ['ruthless', 'wwe_bookert', 'Booker T', 'The Five-Time Champion', 'champion'],
  ['ruthless', 'wwe_rvd', 'Rob Van Dam', 'The Whole Dam Show', 'highflyer'],
  ['ruthless', 'wwe_jbl', 'John Bradshaw Layfield', 'The Wrestling God', 'champion'],

  ['pg', 'wwe_sheamus', 'Sheamus', 'The Celtic Warrior', 'power'],
  ['pg', 'wwe_kofi', 'Kofi Kingston', 'The Dreadlocked Dynamo', 'highflyer'],
  ['pg', 'wwe_bige', 'Big E', 'The Powerhouse of Positivity', 'power'],
  ['pg', 'wwe_xavier', 'Xavier Woods', 'The King of the Ring', 'showman'],
  ['pg', 'wwe_danielbryan', 'Daniel Bryan', 'The Yes Man', 'champion'],
  ['pg', 'wwe_braywyatt', 'Bray Wyatt', 'The Eater of Worlds', 'deadman'],
  ['pg', 'wwe_finnbalor', 'Finn Bálor', 'The Demon', 'highflyer'],

  ['womenlegends', 'wwe_chyna', 'Chyna', 'The Ninth Wonder of the World', 'power'],
  ['womenlegends', 'wwe_trish', 'Trish Stratus', 'The Quintessential Diva', 'queen'],
  ['womenlegends', 'wwe_lita', 'Lita', 'The Extreme Diva', 'highflyer'],
  ['womenlegends', 'wwe_bethphoenix', 'Beth Phoenix', 'The Glamazon', 'power'],
  ['womenlegends', 'wwe_michellemccool', 'Michelle McCool', 'The All-American Diva', 'queen'],
  ['womenlegends', 'wwe_natalya', 'Natalya', 'The Queen of Harts', 'champion'],
  ['womenlegends', 'wwe_alundra', 'Alundra Blayze', 'The Blayze', 'queen'],

  ['tagteams', 'wwe_roadwarriors', 'The Road Warriors', 'The Legion of Doom', 'power'],
  ['tagteams', 'wwe_hartfoundation', 'The Hart Foundation', 'The Pink and Black Attack', 'champion'],
  ['tagteams', 'wwe_dudleyboyz', 'The Dudley Boyz', 'The Sons of Dudleyville', 'brawler'],
  ['tagteams', 'wwe_usos', 'The Usos', 'The Bloodline Twins', 'highflyer'],
  ['tagteams', 'wwe_rockers', 'The Rockers', 'The Midnight Rockers', 'showman'],
  ['tagteams', 'wwe_steiners', 'The Steiner Brothers', 'The Michigan Mafia', 'power'],

  ['nxt', 'wwe_gargano', 'Johnny Gargano', 'Johnny Wrestling', 'highflyer'],
  ['nxt', 'wwe_ciampa', 'Tommaso Ciampa', 'The Blackheart', 'viper'],
  ['nxt', 'wwe_adamcole', 'Adam Cole', 'The Panama City Playboy', 'showman'],
  ['nxt', 'wwe_shayna', 'Shayna Baszler', 'The Queen of Spades', 'viper'],
  ['nxt', 'wwe_ioshirai', 'Io Shirai', 'The Genius of the Sky', 'highflyer'],
  ['nxt', 'wwe_bronbreakker', 'Bron Breakker', 'The Dog-Faced Gremlin', 'power'],
];

const WWE_EXTRA_SPECIES = [];
const wwePaletteOffset = WWE_SPECIES.length;

WWE_EXTRA_DEFS.forEach(([groupKey, key, name, nickname, art], index) => {
  const group = WWE_GROUPS[groupKey];
  if (!group || ELEMENTS[key]) return;
  const palette = WWE_PALETTES[(wwePaletteOffset + index) % WWE_PALETTES.length];
  const [primary, light, deep, accent] = palette;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: `${group.trait} ${nickname} signs every autograph like it is a title defense.`,
    blurb: `${group.blurb} ${name} — ${nickname} — brings the entrance, the finisher, and the championship pose.`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    parentTypes: ['WWE', group.label],
    wwe: true,
    wweGroup: groupKey,
    wweArt: art,
    wweNickname: nickname,
    catalogType: `WWE · ${nickname}`,
  };
  GENE_POWERS[key] = {
    name: group.gene[0], icon: group.gene[1], desc: group.gene[2], effect: group.gene[3],
  };
  TITAN_NAMES[key] = `${nickname.replace(/^The /, '')} Titan`;
  const basePrice = group.price + (index % 4) * 5;
  TYPE_EGG_BASE_PRICE[key] = basePrice;
  TYPE_EGG_PRICE[key] = discountedEggPrice(basePrice);
  HYBRID_NAMES[pairKey(key, group.partner)] = `${nickname.replace(/^The /, '')} ${group.suffix}`;
  NAME_START[key] = [...new Set([name.replace(/[“”"']/g, '').split(' ')[0], 'Ring', 'Slam', 'Main'])];
  group.homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  WWE_SPECIES.push(key);
  WWE_BY_GROUP[groupKey].push(key);
  WWE_EXTRA_SPECIES.push(key);
});

ELEMENT_KEYS.push(...WWE_EXTRA_SPECIES);
WWE_TOTAL = WWE_SPECIES.length;
