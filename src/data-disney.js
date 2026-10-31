/* Disney signature collection: 72 new characters plus Mickey, Simba, and Stitch. */

const DISNEY_GROUPS = {
  mickey: {
    label: 'Mickey & Friends', icon: '🐭', price: 165,
    homes: ['neon', 'grove', 'sugar'], likes: 'Star Pop',
    blurb: 'A bright cartoon friend from the House of Mouse.',
    note: 'Mickey, Minnie, Donald, Daisy, Goofy, Pluto, Chip, Dale, Scrooge, and Pete bring the classic cartoon energy.',
    greetings: [
      'Hot dog! You made it!',
      'There is always room for one more friend.',
      'A little laughter makes every Hollow brighter.',
    ],
  },
  classics: {
    label: 'Disney classics', icon: '📖', price: 175,
    homes: ['dream', 'grove', 'aurora'], likes: 'Honeycomb Cake',
    blurb: 'A storybook classic with a timeless silhouette and a soft spot for wonder.',
    note: 'Snow White, Pinocchio, Dumbo, Bambi, Alice, Peter Pan, Tinker Bell, Pooh, Tigger, and Eeyore.',
    greetings: [
      'Every day is a new page.',
      'A little wonder goes a long way.',
      'The story is better with you in it.',
    ],
  },
  princesses: {
    label: 'Princesses & heroes', icon: '👑', price: 195,
    homes: ['aurora', 'crystal', 'dream'], likes: 'Honeycomb Cake',
    blurb: 'A royal or heroic signature with a storybook heart and a brave streak.',
    note: 'Cinderella, Aurora, Ariel, Belle, Jasmine, Aladdin, Genie, Pocahontas, Mulan, Tiana, and Rapunzel.',
    greetings: [
      'A dream is a wish your heart makes.',
      'Adventure is out there. I packed snacks.',
      'Royalty is a state of mind. So is a nap.',
    ],
  },
  adventure: {
    label: 'Animals & adventure', icon: '🌴', price: 180,
    homes: ['savanna', 'grove', 'tide'], likes: 'Ember Steak',
    blurb: 'A wild heart from a wide-open story, built for big skies and brave choices.',
    note: 'Nala, Lilo, Moana, Maui, Merida, Tarzan, Jane, Hercules, Megara, Quasimodo, plus classic Simba and Stitch.',
    greetings: [
      'The horizon is calling. Let us go.',
      'Family is the adventure that matters most.',
      'One more step. Then maybe a snack.',
    ],
  },
  pixar: {
    label: 'Pixar pals', icon: '💡', price: 185,
    homes: ['neon', 'sugar', 'grove'], likes: 'Star Cookie',
    blurb: 'A Pixar pal with big feelings, a bright idea, and a story worth telling.',
    note: 'Woody, Buzz, Jessie, Nemo, Dory, Sulley, Mike, Remy, WALL-E, EVE, Lightning McQueen, and Mater.',
    greetings: [
      'You have a friend in me.',
      'To infinity and the next snack!',
      'Just keep swimming. Or napping. Both work.',
    ],
  },
  villains: {
    label: 'Disney villains', icon: '🖤', price: 205,
    homes: ['night', 'ember', 'crystal'], likes: 'Ember Steak',
    blurb: 'A scene-stealing villain with a dramatic plan and an unforgettable entrance.',
    note: 'The Evil Queen, Maleficent, Cruella, Ursula, Jafar, Captain Hook, Hades, Scar, Gaston, and Mother Gothel.',
    greetings: [
      'Ah. You arrived exactly when I planned.',
      'Every good story needs a little menace.',
      'Do not mistake this lair for a home. The rent is convenient.',
    ],
  },
  modern: {
    label: 'Modern Disney', icon: '✨', price: 190,
    homes: ['dream', 'neon', 'aurora'], likes: 'Star Pop',
    blurb: 'A modern Disney favorite with a fresh silhouette and a very big heart.',
    note: 'Elsa, Anna, Olaf, Mirabel, Bruno, Baymax, Hiro, Judy Hopps, Nick Wilde, and Miguel.',
    greetings: [
      'Into the unknown? I brought a jacket.',
      'We can do this together. Probably.',
      'The miracle is the friends we made along the way.',
    ],
  },
};

const DISNEY_GROUP_ORDER = ['mickey', 'classics', 'princesses', 'adventure', 'pixar', 'villains', 'modern'];

const DISNEY_GENE_META = {
  royal: { name: 'Royal Presence', icon: '👑', trait: 'Regal — treats every room like a throne room.', desc: 'Gifts arrive 25% sooner and +10% XP.', effect: { giftSpeed: 1.25, xp: 1.1 }, blurb: 'A little crown-shaped confidence follows them around.' },
  song: { name: 'Encore', icon: '🎵', trait: 'Musical — turns ordinary moments into a production number.', desc: 'Chats pay +3 coins and petting builds +25% bond.', effect: { chatCoins: 3, petBond: 1.25 }, blurb: 'A bright note hangs in the air beside them.' },
  wish: { name: 'Wishing Star', icon: '🌟', trait: 'Hopeful — wishes out loud, just in case.', desc: 'Day games pay +3 coins and +15% XP.', effect: { dayCoins: 3, xp: 1.15 }, blurb: 'A small wishing star keeps them company.' },
  sea: { name: 'Sea Song', icon: '🌊', trait: 'Tidal — always knows which way the current is going.', desc: 'Energy fades 20% slower and day games pay +2 coins.', effect: { energyDecay: 0.8, dayCoins: 2 }, blurb: 'A shell-like echo of the sea follows them.' },
  frost: { name: 'Frozen Heart', icon: '❄️', trait: 'Glacial — calm, precise, and secretly sentimental.', desc: 'Energy fades 25% slower and +15% XP.', effect: { energyDecay: 0.75, xp: 1.15 }, blurb: 'A snowflake spins slowly above their head.' },
  beast: { name: 'Wild Heart', icon: '🐾', trait: 'Feral — polite until the forest says otherwise.', desc: 'Games pay +3 coins and pets build +30% bond.', effect: { gameCoins: 3, petBond: 1.3 }, blurb: 'A pawprint marks the path behind them.' },
  play: { name: 'Playtime', icon: '🧸', trait: 'Playful — takes playtime very seriously.', desc: 'Games pay +3 coins and gifts arrive 20% sooner.', effect: { gameCoins: 3, giftSpeed: 1.2 }, blurb: 'A favourite toy seems to follow them around.' },
  dream: { name: 'Dreamer', icon: '💭', trait: 'Dreamy — half here, half in a better story.', desc: 'Night games pay +3 coins and gifts arrive 20% sooner.', effect: { nightCoins: 3, giftSpeed: 1.2 }, blurb: 'A soft dream-bubble drifts at their shoulder.' },
  trick: { name: 'Mischief', icon: '🎭', trait: 'Trickster — cannot resist a dramatic entrance.', desc: 'Night games pay +4 coins and games pay +2 more.', effect: { nightCoins: 4, gameCoins: 2 }, blurb: 'A sly little spark gives away the next prank.' },
  courage: { name: 'Brave Heart', icon: '🛡️', trait: 'Brave — scared and doing it anyway.', desc: 'All needs fade 10% slower and +15% XP.', effect: { decay: 0.9, xp: 1.15 }, blurb: 'A steady little shield glows at their side.' },
  family: { name: 'Ohana', icon: '💙', trait: 'Loyal — family is the whole plan.', desc: 'Pets build +35% bond and needs fade 8% slower.', effect: { petBond: 1.35, decay: 0.92 }, blurb: 'A warm blue heart keeps them close.' },
  dark: { name: 'Dark Charm', icon: '🖤', trait: 'Ominous — makes an entrance before making a point.', desc: 'Night games pay +4 coins and gifts arrive 20% sooner.', effect: { nightCoins: 4, giftSpeed: 1.2 }, blurb: 'A dramatic shadow trails just behind them.' },
  spark: { name: 'Spark', icon: '✨', trait: 'Inventive — sees a machine in every pile of parts.', desc: 'Gifts arrive 30% sooner and +10% XP.', effect: { giftSpeed: 1.3, xp: 1.1 }, blurb: 'A tiny idea-spark circles their head.' },
  island: { name: 'Island Flame', icon: '🔥', trait: 'Restless — the horizon is a personal invitation.', desc: 'Day games pay +3 coins and games pay +3 more.', effect: { dayCoins: 3, gameCoins: 3 }, blurb: 'A warm island ember flickers nearby.' },
  magic: { name: 'Wonder', icon: '🔮', trait: 'Enchanted — keeps a little magic in every pocket.', desc: 'Gifts arrive 25% sooner and night games pay +2 coins.', effect: { giftSpeed: 1.25, nightCoins: 2 }, blurb: 'A ring of storybook sparkles turns slowly.' },
};

const DISNEY_WAVE_DEFS = [
  // Mickey & Friends
  ['mickey', 'disney_minnie', 'Minnie Mouse', '#e84a7a', '#ffe3ef', '#6b1233', '#2a2a33', 'royal', 'bow', 'bloom', 'Polka Bow', 'neon'],
  ['mickey', 'disney_donald', 'Donald Duck', '#3a6bd0', '#e8f0ff', '#122a5c', '#ffd166', 'song', 'note', 'tide', 'Sailor Song', 'tide'],
  ['mickey', 'disney_daisy', 'Daisy Duck', '#b58ae8', '#f3e8ff', '#4a2a6b', '#ff7ac8', 'royal', 'bow', 'bloom', 'Petal Parade', 'grove'],
  ['mickey', 'disney_goofy', 'Goofy', '#e8a23a', '#fff3d6', '#6b4210', '#e8574a', 'play', 'ears', 'stone', 'Goofy Gallop', 'savanna'],
  ['mickey', 'disney_pluto', 'Pluto', '#e8b23a', '#fff5d6', '#6b4a10', '#2a2a33', 'family', 'paw', 'ember', 'Loyal Bounce', 'grove'],
  ['mickey', 'disney_chip', 'Chip', '#b87a3a', '#ffe8d6', '#5c3410', '#e8574a', 'trick', 'paw', 'bloom', 'Acorn Caper', 'grove'],
  ['mickey', 'disney_dale', 'Dale', '#c95a3a', '#ffe0d6', '#5c1f10', '#ffd166', 'trick', 'paw', 'gale', 'Nutty Plan', 'grove'],
  ['mickey', 'disney_scrooge', 'Scrooge McDuck', '#e8e3f5', '#ffffff', '#5c5a66', '#ffd166', 'royal', 'coin', 'crystal', 'Gold Hoard', 'crystal'],
  ['mickey', 'disney_pete', 'Pete', '#3a3a4a', '#e2e2f2', '#12121c', '#e8574a', 'dark', 'ears', 'stone', 'Big Bully', 'night'],

  // Disney classics
  ['classics', 'disney_snowwhite', 'Snow White', '#f2c9d8', '#fff5fa', '#6b1f3a', '#e8574a', 'royal', 'apple', 'bloom', 'Fairest Bloom', 'dream'],
  ['classics', 'disney_pinocchio', 'Pinocchio', '#e8c25a', '#fff6d6', '#6b4a10', '#e8574a', 'wish', 'key', 'volt', 'Wish Upon', 'dream'],
  ['classics', 'disney_dumbo', 'Dumbo', '#8aa7c9', '#e8f2ff', '#2f4a6b', '#ff8fc8', 'courage', 'wing', 'gale', 'Sky Elephant', 'aurora'],
  ['classics', 'disney_bambi', 'Bambi', '#c99a6b', '#fff0d6', '#5c3a1a', '#ffd166', 'beast', 'paw', 'bloom', 'Forest Fawn', 'grove'],
  ['classics', 'disney_alice', 'Alice', '#5a8ae8', '#e8f2ff', '#1e3a6b', '#ff8fc8', 'dream', 'key', 'crystal', 'Wonder Door', 'dream'],
  ['classics', 'disney_peterpan', 'Peter Pan', '#4a9a5a', '#e0ffe8', '#1a4a2a', '#ffd166', 'courage', 'wing', 'gale', 'Neverland Wind', 'aurora'],
  ['classics', 'disney_tinkerbell', 'Tinker Bell', '#ffd166', '#fffbe0', '#6b5205', '#7ee787', 'magic', 'sparkle', 'bloom', 'Pixie Dust', 'dream'],
  ['classics', 'disney_pooh', 'Winnie the Pooh', '#e8b23a', '#fff5d6', '#6b4a10', '#e8574a', 'family', 'balloon', 'bloom', 'Honey Hug', 'sugar'],
  ['classics', 'disney_tigger', 'Tigger', '#e88a3a', '#ffe8d6', '#6b3a10', '#2a2a33', 'play', 'paw', 'volt', 'Bounce Line', 'savanna'],
  ['classics', 'disney_eeyore', 'Eeyore', '#8a9ac9', '#e8efff', '#2f3a6b', '#b58ae8', 'dream', 'balloon', 'bloom', 'Blue Balloon', 'grove'],

  // Princesses & heroes
  ['princesses', 'disney_cinderella', 'Cinderella', '#8ab8e8', '#f0f8ff', '#2f4a8a', '#ffd166', 'royal', 'clock', 'crystal', 'Midnight Glass', 'crystal'],
  ['princesses', 'disney_aurora', 'Aurora', '#e88ab8', '#ffe8f3', '#6b1f4a', '#ffd166', 'dream', 'crown', 'bloom', 'Rose Spindle', 'dream'],
  ['princesses', 'disney_ariel', 'Ariel', '#3ac9b8', '#e0fff8', '#0f5c4a', '#ff8a7a', 'sea', 'shell', 'tide', 'Sea Foam', 'tide'],
  ['princesses', 'disney_belle', 'Belle', '#e8c25a', '#fff8d6', '#6b4a10', '#e8574a', 'song', 'rose', 'bloom', 'Rose Library', 'grove'],
  ['princesses', 'disney_jasmine', 'Jasmine', '#3ab8c9', '#e0f8ff', '#0f4a5c', '#ffd166', 'royal', 'lamp', 'gale', 'Desert Gem', 'savanna'],
  ['princesses', 'disney_aladdin', 'Aladdin', '#8a5ac9', '#f0e8ff', '#3a1f6b', '#ffd166', 'trick', 'lamp', 'ember', 'Street Spark', 'savanna'],
  ['princesses', 'disney_genie', 'Genie', '#3a7ae8', '#e0efff', '#123a8a', '#ffd166', 'magic', 'lamp', 'radiant', 'Wish Grant', 'dream'],
  ['princesses', 'disney_pocahontas', 'Pocahontas', '#c99a6b', '#fff0d6', '#5c3a1a', '#3ac9b8', 'courage', 'leaf', 'gale', 'River Wind', 'grove'],
  ['princesses', 'disney_mulan', 'Mulan', '#e85a5a', '#ffe0e0', '#6b1a1a', '#ffd166', 'courage', 'shield', 'ember', 'Dragon Guard', 'ember'],
  ['princesses', 'disney_tiana', 'Tiana', '#4a9a5a', '#e0ffe8', '#1a4a2a', '#ffd166', 'family', 'note', 'bloom', 'Bayou Beat', 'grove'],
  ['princesses', 'disney_rapunzel', 'Rapunzel', '#b58ae8', '#f3e8ff', '#4a2a6b', '#ffd166', 'wish', 'crown', 'bloom', 'Lantern Braid', 'dream'],

  // Animals & adventure
  ['adventure', 'disney_nala', 'Nala', '#e8c25a', '#fff6d6', '#6b4a10', '#e8a23a', 'beast', 'paw', 'ember', 'Pride Roar', 'savanna'],
  ['adventure', 'disney_lilo', 'Lilo', '#e85a5a', '#ffe0e0', '#6b1a1a', '#3ac9b8', 'family', 'shell', 'tide', 'Ohana Shell', 'tide'],
  ['adventure', 'disney_moana', 'Moana', '#3ac9b8', '#e0fff8', '#0f5c4a', '#ff8a7a', 'sea', 'shell', 'tide', 'Wayfinder', 'tide'],
  ['adventure', 'disney_maui', 'Maui', '#b87a4a', '#ffe8d6', '#5c3410', '#3ac9b8', 'island', 'fish', 'ember', 'Island Hook', 'tide'],
  ['adventure', 'disney_merida', 'Merida', '#e88a3a', '#ffe8d6', '#6b3a10', '#3ac9b8', 'courage', 'arrow', 'gale', 'Wild Arrow', 'aurora'],
  ['adventure', 'disney_tarzan', 'Tarzan', '#c99a6b', '#fff0d6', '#5c3a1a', '#4a9a5a', 'beast', 'leaf', 'gale', 'Jungle Call', 'grove'],
  ['adventure', 'disney_jane', 'Jane', '#e8dcc0', '#fff8e8', '#6b5a3a', '#4a9a5a', 'wish', 'key', 'gale', 'Field Notes', 'grove'],
  ['adventure', 'disney_hercules', 'Hercules', '#e8c25a', '#fff8d6', '#6b4a10', '#3a6bd0', 'courage', 'shield', 'volt', 'Olympian', 'aurora'],
  ['adventure', 'disney_megara', 'Megara', '#b58ae8', '#f3e8ff', '#4a2a6b', '#ffd166', 'trick', 'heart', 'dusk', 'Witty Heart', 'dream'],
  ['adventure', 'disney_quasimodo', 'Quasimodo', '#9aa7b8', '#e8eff5', '#3a4350', '#e8574a', 'family', 'clock', 'stone', 'Bell Tower', 'crystal'],

  // Pixar
  ['pixar', 'disney_woody', 'Woody', '#b87a3a', '#ffe8d6', '#5c3410', '#e8574a', 'family', 'star', 'ember', 'Roundup', 'savanna'],
  ['pixar', 'disney_buzz', 'Buzz Lightyear', '#e8e3f5', '#ffffff', '#5c5a66', '#7ee787', 'spark', 'rocket', 'radiant', 'Space Ranger', 'aurora'],
  ['pixar', 'disney_jessie', 'Jessie', '#e85a5a', '#ffe0d6', '#6b1a10', '#ffd166', 'play', 'star', 'ember', 'Yeehaw', 'savanna'],
  ['pixar', 'disney_nemo', 'Nemo', '#e88a3a', '#fff0d6', '#6b3a10', '#2a2a33', 'sea', 'fish', 'tide', 'Reef Run', 'tide'],
  ['pixar', 'disney_dory', 'Dory', '#3a7ae8', '#e0efff', '#123a8a', '#ffd166', 'dream', 'fish', 'tide', 'Just Keep', 'tide'],
  ['pixar', 'disney_sulley', 'Sulley', '#3ab8a8', '#e0fff8', '#0f5c4a', '#b58ae8', 'beast', 'monster', 'volt', 'Scare Floor', 'night'],
  ['pixar', 'disney_mike', 'Mike Wazowski', '#7ee787', '#f0fff0', '#2f6b3a', '#ffffff', 'spark', 'eye', 'volt', 'One Eye', 'neon'],
  ['pixar', 'disney_remy', 'Remy', '#9aa7b8', '#f0f4ff', '#3a4350', '#e8574a', 'spark', 'apple', 'bloom', 'Little Chef', 'sugar'],
  ['pixar', 'disney_walle', 'WALL-E', '#e8c25a', '#fff8d6', '#6b4a10', '#7ee787', 'spark', 'rocket', 'crystal', 'Waste Allocator', 'crystal'],
  ['pixar', 'disney_eve', 'EVE', '#e8f2ff', '#ffffff', '#5c7a9a', '#5ad6ff', 'spark', 'sparkle', 'frost', 'Probe Pair', 'crystal'],
  ['pixar', 'disney_lightning', 'Lightning McQueen', '#e83a3a', '#ffe0e0', '#6b0f0f', '#ffd166', 'play', 'bolt', 'volt', 'Ka-Chow', 'neon'],
  ['pixar', 'disney_mater', 'Mater', '#b87a4a', '#ffe8d6', '#5c3410', '#5ad6ff', 'family', 'gear', 'stone', 'Tow Buddy', 'savanna'],

  // Disney villains
  ['villains', 'disney_evilqueen', 'The Evil Queen', '#8a3a8a', '#f0e0ff', '#3a0f3a', '#7ee787', 'dark', 'apple', 'dusk', 'Poison Crown', 'night'],
  ['villains', 'disney_maleficent', 'Maleficent', '#4a8a5a', '#e0ffe8', '#1a3a2a', '#b58ae8', 'dark', 'flame', 'ember', 'Dragon Curse', 'night'],
  ['villains', 'disney_cruella', 'Cruella', '#2a2a33', '#f5f5ff', '#0a0a12', '#e8574a', 'dark', 'paw', 'frost', 'Dalmatian Diva', 'night'],
  ['villains', 'disney_ursula', 'Ursula', '#8a5ac9', '#f0e8ff', '#3a1f6b', '#3ac9b8', 'dark', 'shell', 'tide', 'Sea Witch', 'tide'],
  ['villains', 'disney_jafar', 'Jafar', '#2a2a33', '#e8e3f5', '#0a0a12', '#e8574a', 'dark', 'lamp', 'ember', 'Snake Staff', 'savanna'],
  ['villains', 'disney_captainhook', 'Captain Hook', '#b83a3a', '#ffe0d6', '#5c0f0f', '#ffd166', 'dark', 'key', 'tide', 'Tick Tock', 'tide'],
  ['villains', 'disney_hades', 'Hades', '#3a5ac9', '#e0e8ff', '#12245c', '#ff7a3a', 'dark', 'flame', 'ember', 'Underworld', 'ember'],
  ['villains', 'disney_scar', 'Scar', '#5c4a3a', '#f2e4d0', '#20140a', '#7ee787', 'dark', 'paw', 'ember', 'Pride Shadow', 'savanna'],
  ['villains', 'disney_gaston', 'Gaston', '#b84a3a', '#ffe0d6', '#5c1a0f', '#ffd166', 'dark', 'arrow', 'ember', 'Village Champ', 'savanna'],
  ['villains', 'disney_gothel', 'Mother Gothel', '#6b3a6b', '#f0e0f0', '#2a0f2a', '#ffd166', 'dark', 'crown', 'bloom', 'Golden Flower', 'night'],

  // Modern Disney
  ['modern', 'disney_elsa', 'Elsa', '#8ad8ff', '#f0fbff', '#2f5c8a', '#ffffff', 'frost', 'snow', 'frost', 'Frozen Crown', 'crystal'],
  ['modern', 'disney_anna', 'Anna', '#e88a7a', '#ffe8e0', '#6b2a1a', '#3ac9b8', 'courage', 'snow', 'bloom', 'Warm Heart', 'aurora'],
  ['modern', 'disney_olaf', 'Olaf', '#f0f8ff', '#ffffff', '#8aa7b8', '#ff8a3a', 'play', 'snow', 'frost', 'Snow Hug', 'crystal'],
  ['modern', 'disney_mirabel', 'Mirabel', '#3ac9b8', '#e0fff8', '#0f5c4a', '#ffd166', 'magic', 'sparkle', 'bloom', 'Miracle Bloom', 'dream'],
  ['modern', 'disney_bruno', 'Bruno', '#4a9a5a', '#e0ffe8', '#1a4a2a', '#ffd166', 'dream', 'eye', 'crystal', 'Vision Green', 'dream'],
  ['modern', 'disney_baymax', 'Baymax', '#f0f8ff', '#ffffff', '#8aa7b8', '#e8574a', 'family', 'heart', 'frost', 'Health Scan', 'crystal'],
  ['modern', 'disney_hiro', 'Hiro', '#e85a5a', '#ffe0e0', '#6b1a1a', '#3a7ae8', 'spark', 'gear', 'volt', 'Microbot', 'neon'],
  ['modern', 'disney_judy', 'Judy Hopps', '#9aa7b8', '#f0f4ff', '#3a4350', '#3a7ae8', 'courage', 'paw', 'crystal', 'ZPD Hop', 'neon'],
  ['modern', 'disney_nick', 'Nick Wilde', '#e8a23a', '#fff3d6', '#6b4210', '#4a9a5a', 'trick', 'paw', 'dusk', 'Sly Fox', 'neon'],
  ['modern', 'disney_miguel', 'Miguel', '#e85a3a', '#ffe0d6', '#6b1a0f', '#ffd166', 'song', 'note', 'ember', 'Guitar Spirit', 'ember'],
];

const DISNEY_SPECIES = [];
const DISNEY_BY_GROUP = {};
DISNEY_GROUP_ORDER.forEach((group) => { DISNEY_BY_GROUP[group] = []; });

DISNEY_WAVE_DEFS.forEach(([groupKey, key, name, primary, light, deep, accent, geneKey, artKey, partner, hybrid, home], index) => {
  const group = DISNEY_GROUPS[groupKey];
  const gene = DISNEY_GENE_META[geneKey];
  if (!group || !gene || ELEMENTS[key]) return;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: gene.trait,
    blurb: `${group.blurb} ${gene.blurb}`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    disneyGroup: groupKey,
    disneyGene: geneKey,
    disneyArt: artKey,
  };
  GENE_POWERS[key] = { name: gene.name, icon: gene.icon, desc: gene.desc, effect: gene.effect };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = group.price;
  TYPE_EGG_PRICE[key] = discountedEggPrice(group.price);
  if (ELEMENTS[partner]) HYBRID_NAMES[pairKey(key, partner)] = hybrid;
  NAME_START[key] = [name.replace(/^The /, '').split(' ')[0], ...name.split(' ').slice(1, 3)];
  const homes = [home, ...group.homes];
  homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  DISNEY_SPECIES.push(key);
  DISNEY_BY_GROUP[groupKey].push(key);
});

ELEMENT_KEYS.push(...DISNEY_SPECIES);

/* Mickey, Simba, and Stitch were already in the cartoon wave. */
const DISNEY_CLASSIC_KEYS = ['mickey', 'simba', 'stitch'];
DISNEY_CLASSIC_KEYS.forEach((key) => {
  if (!ELEMENTS[key]) return;
  ELEMENTS[key].disneyGroup = key === 'mickey' ? 'mickey' : 'adventure';
  ELEMENTS[key].disneyClassic = true;
  const group = DISNEY_BY_GROUP[ELEMENTS[key].disneyGroup];
  if (group && !group.includes(key)) group.push(key);
});

const DISNEY_TOTAL = DISNEY_SPECIES.length + DISNEY_CLASSIC_KEYS.filter((key) => ELEMENTS[key]).length;
