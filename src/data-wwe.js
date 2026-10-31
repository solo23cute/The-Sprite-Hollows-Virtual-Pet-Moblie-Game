/* WWE wave: 20 superstars, legends, and champions with original procedural
   ring gear. Each is a full collectible with a gene, Titan, type egg,
   habitats, and a named hybrid. */

const WWE_GROUPS = {
  legends: {
    label: 'WWE Legends', icon: '🏆', price: 210,
    homes: ['ember', 'neon', 'night'], likes: 'Ember Steak', partner: 'crown',
    suffix: 'Slam',
    gene: ['Hall of Fame', '🏆', 'Games pay +6 coins and gifts arrive 20% sooner.', { gameCoins: 6, giftSpeed: 1.2 }],
    trait: 'Immortal — has a entrance theme that starts before the lights even change.',
    blurb: 'A WWE legend with championship gold, a signature pose, and a crowd that never quite sits down.',
    greetings: [
      'The ring is ready. The crowd is loud. Let’s make this memorable.',
      'I have won titles. I have lost titles. I have never lost a snack.',
      'You can’t see the entrance. You can feel it.',
    ],
    note: 'The Undertaker, Stone Cold, The Rock, Triple H, Shawn Michaels, and Bret Hart.',
  },
  men: {
    label: 'WWE Superstars', icon: '💪', price: 190,
    homes: ['ember', 'savanna', 'neon'], likes: 'Juicy Drumstick', partner: 'volt',
    suffix: 'Striker',
    gene: ['Main Event', '💪', 'Night games pay +5 coins and gain +15% XP.', { nightCoins: 5, xp: 1.15 }],
    trait: 'Main-event ready — turns a quiet room into a sold-out arena.',
    blurb: 'A WWE superstar with ring gear, a finisher name, and an unreasonable amount of confidence.',
    greetings: [
      'You want the main event? You got the main event.',
      'I don’t do warm-ups. I do highlights.',
      'The belt is not a prop. It’s a promise.',
    ],
    note: 'John Cena, Roman Reigns, Cody Rhodes, Seth Rollins, Randy Orton, CM Punk, Drew McIntyre, and AJ Styles.',
  },
  women: {
    label: 'WWE Women’s Division', icon: '👑', price: 200,
    homes: ['aurora', 'ember', 'dream'], likes: 'Star Cookie', partner: 'radiant',
    suffix: 'Crown',
    gene: ['Champion’s Crown', '👑', 'Gain 18% more XP and gifts arrive 25% sooner.', { xp: 1.18, giftSpeed: 1.25 }],
    trait: 'Fearless — walks into the ring like the title already has their name on it.',
    blurb: 'A WWE women’s champion with a signature entrance, a sharp finisher, and a heart that fights for the whole locker room.',
    greetings: [
      'This is my ring. You can watch, but you can’t take it.',
      'I don’t wait for an invitation. I make an entrance.',
      'The crown fits. The fight is just getting started.',
    ],
    note: 'Becky Lynch, Charlotte Flair, Rhea Ripley, Bianca Belair, Sasha Banks, Alexa Bliss, Asuka, and Bayley.',
  },
};

const WWE_GROUP_ORDER = ['legends', 'men', 'women'];

const WWE_PALETTES = [
  ['#b51f1f', '#ffd1b3', '#08060a', '#ffd166'],
  ['#2f2a33', '#e6efff', '#08060a', '#8be9ff'],
  ['#d9a441', '#fff3c4', '#5c3a0a', '#b51f1f'],
  ['#3a4a5c', '#d9f2ff', '#101a24', '#ff6b4a'],
  ['#8a2a5c', '#ffe0f0', '#2a0a1a', '#ffd166'],
  ['#4b3f9e', '#ece6ff', '#1f144a', '#41e0d0'],
  ['#2f9e5a', '#e8ffe8', '#144a24', '#ffcf5c'],
  ['#e08a4f', '#ffe6cc', '#5c2a0a', '#2f2a33'],
  ['#5cc8ff', '#e6f9ff', '#123a5c', '#ff8fc8'],
  ['#a33a6b', '#ffd9e8', '#3a1024', '#8be9ff'],
  ['#d94f5c', '#ffe0e3', '#5c1a22', '#ffd166'],
  ['#7a4a2a', '#ffe4c2', '#2a180a', '#d9a441'],
  ['#8a5cff', '#eee6ff', '#2f1a5c', '#ffd166'],
  ['#ff8a4c', '#ffe3c2', '#5c2a0a', '#8be9ff'],
  ['#3a2a6b', '#d9ccff', '#120a2a', '#7affd8'],
  ['#f2d14f', '#fff8d9', '#8a6a2a', '#b51f1f'],
  ['#5a3a6b', '#e6d6f2', '#1f0a2a', '#ff6b4a'],
  ['#3ecf8e', '#e0fff2', '#145a3a', '#ff8fc8'],
  ['#d9a441', '#fff3c4', '#5c3a0a', '#4f89c9'],
  ['#b23a5c', '#ffd9e3', '#4a0f22', '#ffd166'],
];

/* [group, key, name, nickname, art] */
const WWE_DEFS = [
  ['legends', 'wwe_undertaker', 'The Undertaker', 'The Deadman', 'deadman'],
  ['legends', 'wwe_stonecold', '“Stone Cold” Steve Austin', 'The Rattlesnake', 'brawler'],
  ['legends', 'wwe_therock', 'The Rock', 'The Great One', 'showman'],
  ['legends', 'wwe_tripleh', 'Triple H', 'The Cerebral Assassin', 'champion'],
  ['legends', 'wwe_shawnmichaels', 'Shawn Michaels', 'The Heartbreak Kid', 'showman'],
  ['legends', 'wwe_brethart', 'Bret “Hitman” Hart', 'The Excellence of Execution', 'champion'],

  ['men', 'wwe_johncena', 'John Cena', 'The Cenation Leader', 'champion'],
  ['men', 'wwe_romanreigns', 'Roman Reigns', 'The Tribal Chief', 'power'],
  ['men', 'wwe_codyrhodes', 'Cody Rhodes', 'The American Nightmare', 'champion'],
  ['men', 'wwe_sethrollins', 'Seth Rollins', 'The Visionary', 'showman'],
  ['men', 'wwe_randyorton', 'Randy Orton', 'The Viper', 'viper'],
  ['men', 'wwe_cmpunk', 'CM Punk', 'The Best in the World', 'brawler'],
  ['men', 'wwe_drewmcintyre', 'Drew McIntyre', 'The Scottish Warrior', 'power'],
  ['men', 'wwe_ajstyles', 'AJ Styles', 'The Phenomenal One', 'highflyer'],

  ['women', 'wwe_beckylynch', 'Becky Lynch', 'The Man', 'champion'],
  ['women', 'wwe_charlotteflair', 'Charlotte Flair', 'The Queen', 'queen'],
  ['women', 'wwe_rhearipley', 'Rhea Ripley', 'The Eradicator', 'power'],
  ['women', 'wwe_biancabelair', 'Bianca Belair', 'The EST', 'queen'],
  ['women', 'wwe_sashabanks', 'Sasha Banks', 'The Boss', 'showman'],
  ['women', 'wwe_asuka', 'Asuka', 'The Empress of Tomorrow', 'empress'],
];

const WWE_SPECIES = [];
const WWE_BY_GROUP = {};
WWE_GROUP_ORDER.forEach((group) => { WWE_BY_GROUP[group] = []; });

WWE_DEFS.forEach(([groupKey, key, name, nickname, art], index) => {
  const group = WWE_GROUPS[groupKey];
  if (!group || ELEMENTS[key]) return;
  const palette = WWE_PALETTES[index % WWE_PALETTES.length];
  const [primary, light, deep, accent] = palette;
  const trait = `${group.trait} ${nickname} signs every autograph like it is a title defense.`;
  const blurb = `${group.blurb} ${name} — ${nickname} — brings the entrance, the finisher, and the championship pose.`;
  ELEMENTS[key] = {
    name, primary, light, deep, accent, trait, blurb,
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
});

ELEMENT_KEYS.push(...WWE_SPECIES);

let WWE_TOTAL = WWE_SPECIES.length;
