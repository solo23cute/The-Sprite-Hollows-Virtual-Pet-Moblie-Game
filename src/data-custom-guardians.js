/* Custom guardians: earned, not bought. Each one unlocks at a lifetime duel-win
   milestone, is added to the roaming bench, and can then guard any biome. */

const CUSTOM_GUARDIANS = [
  {
    key: 'cg_wardenhart', name: 'Warden Hart', wins: 2, icon: '🦌',
    palette: ['#d9a441', '#fff3c4', '#5c3a0a', '#8be9ff'],
    trait: 'Patient — counts every challenger and remembers the good ones.',
    blurb: 'The first guardian to join you: a soft-antlered warden with a lantern for a heart.',
    greeting: 'You came back. Good. Let us see what you learned.',
    gene: ['Warden Ward', '🛡️', '+12% bond from practice bouts and needs fade 8% slower.', { bond: 1.12, decay: 0.92 }],
  },
  {
    key: 'cg_embermaw', name: 'Ember Maw', wins: 4, icon: '🐉',
    palette: ['#ff7a4d', '#ffe0d0', '#5a1f08', '#ffd166'],
    trait: 'Furnace-hearted — warms the whole arena without asking.',
    blurb: 'A compact dragon that guards the forge district and considers every duel a friendly barbecue.',
    greeting: 'Stand closer. You look cold. That is the point of me.',
    gene: ['Forge Breath', '🔥', 'Practice bouts pay +2 coins and +10% XP.', { gameCoins: 2, xp: 1.1 }],
  },
  {
    key: 'cg_tidekeeper', name: 'Tide Keeper', wins: 7, icon: '🌊',
    palette: ['#4db8d8', '#c2f0ff', '#0f4d66', '#6fffe0'],
    trait: 'Tidal — keeps every promise on the same schedule as the sea.',
    blurb: 'A calm guardian who steps out of the shallows only when the Hollow has earned a little patience.',
    greeting: 'The tide brought you. It usually knows what it is doing.',
    gene: ['Low Tide', '🌊', 'Gifts arrive 15% sooner and energy fades 15% slower.', { giftSpeed: 1.15, energyDecay: 0.85 }],
  },
  {
    key: 'cg_thornwarden', name: 'Thorn Warden', wins: 11, icon: '🌿',
    palette: ['#8fe07a', '#efffdc', '#2f5a1a', '#ff9ec7'],
    trait: 'Rooted — has never once lost the same duel twice.',
    blurb: 'A garden guardian grown from eleven good bouts and one very stubborn hedge.',
    greeting: 'Eleven doors. The garden heard every one of them.',
    gene: ['Briar Guard', '🌿', '+15% XP and pets build 20% more bond.', { xp: 1.15, petBond: 1.2 }],
  },
  {
    key: 'cg_starregent', name: 'Star Regent', wins: 16, icon: '⭐',
    palette: ['#c9a6ff', '#e9ddff', '#5b3b8a', '#7affd8'],
    trait: 'Regal — rules an empty court and keeps it spotless.',
    blurb: 'A prism-feathered regent who keeps the Hollow’s night ledger and duels only after dark.',
    greeting: 'Sixteen victories. The court recognises you. Do not let it go to your head.',
    gene: ['Night Ledger', '🌙', 'Night games pay +4 coins and +15% XP.', { nightCoins: 4, xp: 1.15 }],
  },
  {
    key: 'cg_hollowmaw', name: 'Hollow Maw', wins: 22, icon: '🕳️',
    palette: ['#5a5668', '#b8b4c8', '#22202c', '#ff8ad8'],
    trait: 'Quiet — swallows sound and gives it back as a better idea.',
    blurb: 'The Hollow’s own guardian: a shadow with bright eyes that only shows up once you are truly known.',
    greeting: 'You have been busy. I have been watching. Shall we?',
    gene: ['Quiet Echo', '🕳️', 'Needs fade 15% slower and all games pay +3 coins.', { decay: 0.85, gameCoins: 3 }],
  },
  {
    key: 'cg_goldcrown', name: 'Gold Crown', wins: 30, icon: '👑',
    palette: ['#e8c46a', '#fff6d6', '#7a5a14', '#8be9ff'],
    trait: 'Undefeated — until someone better walks in, which is the fun part.',
    blurb: 'A champion guardian who treats every practice bout like a title match.',
    greeting: 'Thirty. The crown is heavy. You may try to take it.',
    gene: ['Champion’s Purse', '👑', 'Games pay +6 coins and duel wins give +25% bond.', { gameCoins: 6, bond: 1.25 }],
  },
  {
    key: 'cg_aurorawing', name: 'Aurora Wing', wins: 40, icon: '🌌',
    palette: ['#8be9ff', '#e6fbff', '#123a4a', '#b69cff'],
    trait: 'Skybound — arrives only when the Hollow has made a name for itself.',
    blurb: 'The final earned guardian: a wide-winged keeper of lights who guards every biome at once.',
    greeting: 'Forty guardians bested. The sky has been waiting to meet you.',
    gene: ['Sky Writ', '🌌', '+20% XP, gifts 20% sooner, and needs fade 10% slower.', { xp: 1.2, giftSpeed: 1.2, decay: 0.9 }],
  },
];

function customGuardianDef(key) {
  return CUSTOM_GUARDIANS.find((guardian) => guardian.key === key) || null;
}

function customGuardianUnlocksFor(wins) {
  const count = Math.max(0, Number(wins) || 0);
  return CUSTOM_GUARDIANS.filter((guardian) => count >= guardian.wins).map((guardian) => guardian.key);
}

function installCustomGuardianSpecies(key) {
  const def = customGuardianDef(key);
  if (!def || typeof ELEMENTS === 'undefined') return null;
  if (ELEMENTS[key]) return ELEMENTS[key];
  const [primary, light, deep, accent] = def.palette;
  ELEMENTS[key] = {
    name: def.name,
    primary, light, deep, accent,
    trait: def.trait,
    blurb: def.blurb,
    greeting: def.greeting,
    likes: 'Star Pop',
    guardianOnly: true,
    customGuardian: true,
  };
  if (typeof GENE_POWERS !== 'undefined') {
    const gene = def.gene;
    GENE_POWERS[key] = { name: gene[0], icon: gene[1], desc: gene[2], effect: gene[3] };
  }
  if (typeof TITAN_NAMES !== 'undefined') TITAN_NAMES[key] = `${def.name} Titan`;
  if (typeof NAME_START !== 'undefined') NAME_START[key] = [def.name.split(' ')[0], 'Guardian', 'Warden', 'Keeper'];
  if (typeof TYPE_EGG_BASE_PRICE !== 'undefined') TYPE_EGG_BASE_PRICE[key] = 500;
  return ELEMENTS[key];
}

function syncCustomGuardians(list) {
  const keys = Array.isArray(list) ? list : [];
  CUSTOM_GUARDIANS.forEach((guardian) => installCustomGuardianSpecies(guardian.key));
  if (typeof GUARDIAN_ROAMING === 'undefined' || typeof GUARDIAN_POOLS === 'undefined') return;
  keys.forEach((key) => {
    if (!customGuardianDef(key) || !ELEMENTS[key]) return;
    if (!GUARDIAN_ROAMING.includes(key)) GUARDIAN_ROAMING.push(key);
    Object.keys(GUARDIAN_POOLS).forEach((sceneKey) => {
      if (!GUARDIAN_POOLS[sceneKey].includes(key)) GUARDIAN_POOLS[sceneKey].push(key);
    });
  });
}

/* Register the species up front so their art always exists; only unlocked ones
   are added to the guardian rosters. */
CUSTOM_GUARDIANS.forEach((guardian) => installCustomGuardianSpecies(guardian.key));
