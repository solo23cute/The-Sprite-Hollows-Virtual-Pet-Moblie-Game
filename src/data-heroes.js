/* Heroes, villains, and anti-heroes: a 61-character signature wave. */

const HERO_ROLE_META = {
  hero: {
    label: 'Superhero', price: 175, likes: 'Star Pop',
    blurb: 'A caped champion with a bright emblem, a team-up instinct, and an original Hollow silhouette.',
    homes: ['aurora', 'neon'],
    greetings: [
      'The city can wait. You look like you need a snack first.',
      'Suit up? I was already suited up. I was hoping for a nap.',
      'Every good rescue starts with a plan. Mine starts with breakfast.',
      'You called? I was mid-dramatic entrance, but I can finish it here.',
    ],
  },
  villain: {
    label: 'Villain', price: 195, likes: 'Ember Steak',
    blurb: 'A dramatic schemer with an unmistakable emblem, a flair for the ominous, and an original Hollow silhouette.',
    homes: ['night', 'ember'],
    greetings: [
      'Ah. You arrived exactly when I planned. Mostly.',
      'Do not mistake this lair for a home. The rent is simply convenient.',
      'I have a five-step plan. Step one is judging your snack choices.',
      'Stay a while. The doom is scheduled for later.',
    ],
  },
  anti: {
    label: 'Anti-hero', price: 185, likes: 'Hollow Burger',
    blurb: 'A morally complicated fighter with a well-worn mask, a sharp edge, and an original Hollow silhouette.',
    homes: ['night', 'neon'],
    greetings: [
      'I am not a hero. I am just the person still standing here.',
      'Save the speech. Point me at the problem.',
      'Do I look like a team player? Do not answer that.',
      'Fine. I will help. But I am complaining the whole time.',
    ],
  },
};

const HERO_MOTIF_META = {
  arrow: { trait: 'Deadeye — never misses, especially when showing off.', gene: 'Perfect Shot', icon: '🏹', desc: 'Games pay +3 coins and +10% XP.', effect: { gameCoins: 3, xp: 1.1 }, blurb: 'A taut bow and a steady aim.' },
  star: { trait: 'Starborn — radiates confidence in every direction.', gene: 'Bright Star', icon: '⭐', desc: 'Day games pay +3 coins and +15% XP.', effect: { dayCoins: 3, xp: 1.15 }, blurb: 'A four-point star catches the light.' },
  ant: { trait: 'Pocket-Sized — tiny shoulders, unreasonable confidence.', gene: 'Ant Squad', icon: '🐜', desc: 'Pets pay +2 coins and +10% XP.', effect: { petCoins: 2, xp: 1.1 }, blurb: 'A little antenna and a whole lot of nerve.' },
  wing: { trait: 'Airborne — has never once taken the stairs.', gene: 'Wingbeat', icon: '🪽', desc: 'Gifts arrive 25% sooner and +10% XP.', effect: { giftSpeed: 1.25, xp: 1.1 }, blurb: 'Swept-back wings catch an updraft.' },
  metal: { trait: 'Hardwired — built for the job and very proud of the paint.', gene: 'Iron Will', icon: '🛡️', desc: 'Energy fades 25% slower and games pay +2 coins.', effect: { energyDecay: 0.75, gameCoins: 2 }, blurb: 'Bandwidth metal and a glowing core.' },
  cosmic: { trait: 'Cosmic — thinks in orbits and speaks in dramatic pauses.', gene: 'Orbit', icon: '🪐', desc: 'Night games pay +4 coins and +10% XP.', effect: { nightCoins: 4, xp: 1.1 }, blurb: 'A tiny orbit circles its shoulder.' },
  blade: { trait: 'Edgewise — solves problems with a very clean line.', gene: 'Keen Edge', icon: '⚔️', desc: 'Games pay +3 coins and gifts arrive 15% sooner.', effect: { gameCoins: 3, giftSpeed: 1.15 }, blurb: 'A polished blade rests across the back.' },
  leaf: { trait: 'Deep-Rooted — slow to anger, impossible to uproot.', gene: 'Living Bark', icon: '🌿', desc: 'All needs fade 12% slower and snacks give +25% XP.', effect: { decay: 0.88, snackXp: 1.25 }, blurb: 'A leafy crest and curling new growth.' },
  storm: { trait: 'Weather-Made — arrives with thunder and leaves with static hair.', gene: 'Eye of the Storm', icon: '🌩️', desc: 'Day games pay +3 coins and gifts arrive 20% sooner.', effect: { dayCoins: 3, giftSpeed: 1.2 }, blurb: 'A storm cell crackles overhead.' },
  fist: { trait: 'Heavy-Handed — gentle until the moment is not.', gene: 'Power Punch', icon: '🥊', desc: 'Games pay +4 coins and +10% XP.', effect: { gameCoins: 4, xp: 1.1 }, blurb: 'A big gauntlet and a bigger stance.' },
  gem: { trait: 'Clear-Minded — sees the pattern before the picture.', gene: 'Facet', icon: '💎', desc: 'Night games pay +3 coins and +15% XP.', effect: { nightCoins: 3, xp: 1.15 }, blurb: 'A glowing jewel sits at the brow.' },
  bolt: { trait: 'Quick-Charged — the plan is usually “run fast, figure it out later.”', gene: 'Flash Step', icon: '⚡', desc: 'Energy fades 20% slower and games pay +3 coins.', effect: { energyDecay: 0.8, gameCoins: 3 }, blurb: 'A hot little bolt cracks the air.' },
  bat: { trait: 'Night-Shift — owns the dark and knows every rooftop.', gene: 'Echo Location', icon: '🦇', desc: 'Night games pay +4 coins and needs fade 8% slower.', effect: { nightCoins: 4, decay: 0.92 }, blurb: 'A bat-wing cape and pointed cowl.' },
  crossbow: { trait: 'Locked-On — always has one more bolt.', gene: 'Hunter’s Mark', icon: '🎯', desc: 'Games pay +3 coins and night games pay +2 more.', effect: { gameCoins: 3, nightCoins: 2 }, blurb: 'A compact crossbow with a bright scope.' },
  magic: { trait: 'Rune-Touched — says the impossible part out loud.', gene: 'Arcane Circle', icon: '🔮', desc: 'Gifts arrive 25% sooner and chats pay +2 coins.', effect: { giftSpeed: 1.25, chatCoins: 2 }, blurb: 'A ring of runes turns slowly.' },
  claw: { trait: 'Wild-Hearted — trusts instinct before instruction.', gene: 'Predator’s Grace', icon: '🐾', desc: 'Pets build +35% bond and games pay +2 coins.', effect: { petBond: 1.35, gameCoins: 2 }, blurb: 'Three bright claw marks cross the flank.' },
  shield: { trait: 'Unbreakable — stands in front so others do not have to.', gene: 'Guardian Plate', icon: '🛡️', desc: 'All needs fade 10% slower and pets pay +2 coins.', effect: { decay: 0.9, petCoins: 2 }, blurb: 'A broad hero shield catches the light.' },
  mask: { trait: 'Faceless — prefers a good mask to a long explanation.', gene: 'Hidden Face', icon: '🎭', desc: 'Night games pay +3 coins and gifts arrive 20% sooner.', effect: { nightCoins: 3, giftSpeed: 1.2 }, blurb: 'A sharp domino mask and a secret.' },
  rose: { trait: 'Cultivated — dangerous in a way that smells expensive.', gene: 'Thorned Bloom', icon: '🌹', desc: 'Chats pay +3 coins and +10% XP.', effect: { chatCoins: 3, xp: 1.1 }, blurb: 'A perfect rose with a hidden thorn.' },
  shapeshift: { trait: 'Unfixed — changes shape to suit the room.', gene: 'Borrowed Form', icon: '🎭', desc: 'All needs fade 12% slower and gifts arrive 15% sooner.', effect: { decay: 0.88, giftSpeed: 1.15 }, blurb: 'A half-shifted silhouette and a sly grin.' },
  fang: { trait: 'Hungry — all instinct, no indoor voice.', gene: 'Feral Bite', icon: '🦷', desc: 'Games pay +4 coins and energy fades 15% slower.', effect: { gameCoins: 4, energyDecay: 0.85 }, blurb: 'A pair of bright fangs and a predator’s hunch.' },
  armor: { trait: 'Fortified — has never met a wall he did not walk through.', gene: 'Bulwark', icon: '🛡️', desc: 'Hunger fades 25% slower and +10% XP.', effect: { hungerDecay: 0.75, xp: 1.1 }, blurb: 'Layered plates and a heavy stance.' },
  time: { trait: 'Slightly Early — has already seen how this ends.', gene: 'Time Slip', icon: '⏳', desc: 'Gifts arrive 30% sooner and +10% XP.', effect: { giftSpeed: 1.3, xp: 1.1 }, blurb: 'A fractured clock ring hangs at the shoulder.' },
  sand: { trait: 'Shifting — impossible to hold onto and proud of it.', gene: 'Dust Devil', icon: '🏜️', desc: 'Energy fades 25% slower and clean fades 20% slower.', effect: { energyDecay: 0.75, cleanDecay: 0.8 }, blurb: 'A spiral of sand circles the feet.' },
  mind: { trait: 'Big-Brained — never loses an argument inside his own head.', gene: 'Mental Apex', icon: '🧠', desc: 'Chats pay +2 coins and +20% XP.', effect: { chatCoins: 2, xp: 1.2 }, blurb: 'A glowing thought-ring pulses at the brow.' },
  tech: { trait: 'Wireless — runs on batteries, spite, and three backup plans.', gene: 'Circuit Mind', icon: '🔌', desc: 'Games pay +3 coins and +15% XP.', effect: { gameCoins: 3, xp: 1.15 }, blurb: 'Circuit lines and a targeting lens.' },
  ice: { trait: 'Cold-Snap — cool under pressure and cooler in conversation.', gene: 'Cold Front', icon: '❄️', desc: 'Energy fades 20% slower and day games pay +3 coins.', effect: { energyDecay: 0.8, dayCoins: 3 }, blurb: 'A frost crystal and a trail of cold air.' },
  eye: { trait: 'All-Seeing — notices everything except personal space.', gene: 'Wide Gaze', icon: '👁️', desc: 'Night games pay +3 coins and snacks give +30% XP.', effect: { nightCoins: 3, snackXp: 1.3 }, blurb: 'A watchful eye sigil glows on the chest.' },
  riddle: { trait: 'Cryptic — answers questions with better questions.', gene: 'Puzzle Lock', icon: '❓', desc: 'Chats pay +3 coins and gifts arrive 15% sooner.', effect: { chatCoins: 3, giftSpeed: 1.15 }, blurb: 'A question mark cracks like a puzzle.' },
  coin: { trait: 'Double-Sided — every choice has a second face.', gene: 'Two Faces', icon: '🪙', desc: 'Day games pay +3 coins and night games pay +2 more.', effect: { dayCoins: 3, nightCoins: 2 }, blurb: 'A bright coin hangs on a fine chain.' },
  skull: { trait: 'Remorseless — wears the warning on the chest.', gene: 'Last Warning', icon: '💀', desc: 'Games pay +4 coins and night games pay +2 more.', effect: { gameCoins: 4, nightCoins: 2 }, blurb: 'A pale skull sigil marks the armor.' },
  flame: { trait: 'Burning — leaves ash, footprints, and a strong first impression.', gene: 'Hellfire', icon: '🔥', desc: 'Night games pay +4 coins and +10% XP.', effect: { nightCoins: 4, xp: 1.1 }, blurb: 'A crown of flame flickers above the head.' },
  moon: { trait: 'Moonbound — sleeps all day and shines all night.', gene: 'Lunar Guard', icon: '🌙', desc: 'Night games pay +4 coins and energy fades 15% slower.', effect: { nightCoins: 4, energyDecay: 0.85 }, blurb: 'A crescent moon and a scatter of stars.' },
  chain: { trait: 'Unchained — the chain is decorative, the attitude is not.', gene: 'Chainbreaker', icon: '⛓️', desc: 'Games pay +3 coins and petting pays +2 coins.', effect: { gameCoins: 3, petCoins: 2 }, blurb: 'A heavy chain loops across one shoulder.' },
};

const HERO_WAVE_DEFS = [
  ['hero', 'hero_hawkeye', 'Hawkeye', '#6b4fa0', '#eadcff', '#2a143f', '#ffd166', 'arrow', 'volt', 'Trick Shot', 'grove'],
  ['hero', 'hero_captainmarvel', 'Captain Marvel', '#2f5fd0', '#dbe9ff', '#10245c', '#ffd166', 'star', 'radiant', 'Binary Star', 'aurora'],
  ['hero', 'hero_antman', 'Ant-Man', '#8b2f4a', '#ffe0e8', '#3a1020', '#8fe07a', 'ant', 'bloom', 'Tiny Titan', 'grove'],
  ['hero', 'hero_wasp', 'Wasp', '#d9a21b', '#fff3c2', '#5c3a05', '#3a2a5c', 'wing', 'gale', 'Stinger Gale', 'grove'],
  ['hero', 'hero_falcon', 'The Falcon', '#b83b36', '#ffe2dc', '#4a1210', '#e8e3f5', 'wing', 'gale', 'Sky Talon', 'aurora'],
  ['hero', 'hero_wintersoldier', 'Winter Soldier', '#3f4c63', '#dbe4f2', '#141b26', '#e8574a', 'metal', 'frost', 'Winter Protocol', 'crystal'],
  ['hero', 'hero_warmachine', 'War Machine', '#56606e', '#e2e6ed', '#1e232a', '#ffb347', 'metal', 'ember', 'War Forge', 'ember'],
  ['hero', 'hero_starlord', 'Star-Lord', '#7a3a2a', '#ffd9b8', '#2e120a', '#5ad6ff', 'cosmic', 'dusk', 'Milky Way', 'aurora'],
  ['hero', 'hero_gamora', 'Gamora', '#3f8a4f', '#d9ffdf', '#143a1c', '#b69cff', 'blade', 'dusk', 'Deadliest Woman', 'night'],
  ['hero', 'hero_groot', 'Groot', '#6b5136', '#f2dcc0', '#2f2110', '#8fe07a', 'leaf', 'bloom', 'Guardian Grove', 'grove'],
  ['hero', 'hero_storm', 'Storm', '#5c6b8a', '#e8efff', '#1e263d', '#e8e3f5', 'storm', 'gale', 'Stormfront', 'aurora'],
  ['hero', 'hero_shehulk', 'She-Hulk', '#4f9a3a', '#dcffd2', '#1a4010', '#8b5cf6', 'fist', 'bloom', 'Gamma Bloom', 'grove'],
  ['hero', 'hero_nova', 'Nova', '#3a5fd0', '#dbe9ff', '#12245c', '#ffd166', 'cosmic', 'radiant', 'Nova Burst', 'aurora'],
  ['hero', 'hero_vision', 'Vision', '#8a2f3a', '#ffe0e3', '#3a1016', '#8fe07a', 'gem', 'crystal', 'Mind Gem', 'crystal'],
  ['hero', 'hero_quicksilver', 'Quicksilver', '#9aa7b8', '#f4f7ff', '#3a4350', '#5ad6ff', 'bolt', 'volt', 'Silver Rush', 'neon'],
  ['hero', 'hero_batwoman', 'Batwoman', '#7a1028', '#ffdbe2', '#2a0710', '#e8574a', 'bat', 'dusk', 'Crimson Bat', 'night'],
  ['hero', 'hero_huntress', 'Huntress', '#5c3f8a', '#e6dcff', '#21143a', '#ffd166', 'crossbow', 'dusk', 'Crossbow Moon', 'night'],
  ['hero', 'hero_hawkman', 'Hawkman', '#8a6a3a', '#fff0c2', '#3a2a10', '#b83b36', 'wing', 'gale', 'Nth Metal', 'aurora'],
  ['hero', 'hero_doctorfate', 'Doctor Fate', '#c9a21b', '#fff6c2', '#5c4205', '#3a5fd0', 'magic', 'radiant', 'Helmet of Fate', 'dream'],
  ['hero', 'hero_blacklightning', 'Black Lightning', '#2a2a5c', '#dbe2ff', '#0e0e26', '#5ad6ff', 'bolt', 'volt', 'Black Bolt', 'neon'],
  ['hero', 'hero_vixen', 'Vixen', '#b86a1b', '#fff0d0', '#4a2605', '#8fe07a', 'claw', 'bloom', 'Animal Kingdom', 'grove'],
  ['hero', 'hero_boostergold', 'Booster Gold', '#d9b21b', '#fff5c2', '#5c4605', '#3a7ad0', 'star', 'radiant', 'Booster Gold', 'neon'],
  ['hero', 'hero_stargirl', 'Stargirl', '#3a7ad0', '#dbe9ff', '#122a5c', '#ffd166', 'star', 'radiant', 'Cosmic Staff', 'aurora'],
  ['hero', 'hero_batwing', 'Batwing', '#2f3f5c', '#dbe4f2', '#0e1422', '#5ad6ff', 'bat', 'dusk', 'Batwing', 'night'],
  ['hero', 'hero_invincible', 'Invincible', '#d9b21b', '#fff8c2', '#5c4605', '#3a5fd0', 'shield', 'ember', 'Invincible', 'ember'],
  ['hero', 'hero_hellboy', 'Hellboy', '#b83b2a', '#ffe0d6', '#4a120a', '#ffd166', 'fist', 'ember', 'Right Hand of Doom', 'ember'],
  ['hero', 'hero_zorro', 'Zorro', '#2a2a33', '#e8e3f5', '#0e0e14', '#e8574a', 'blade', 'dusk', 'Mark of Zorro', 'night'],
  ['hero', 'hero_daredevil', 'Daredevil', '#8a1b1b', '#ffd6d6', '#3a0707', '#ffd166', 'mask', 'dusk', 'Radar Sense', 'night'],
  ['villain', 'v_doctordoom', 'Doctor Doom', '#3a5c3a', '#d9f2d9', '#122412', '#9aa7b8', 'metal', 'crystal', 'Doom Castle', 'ember'],
  ['villain', 'v_kingpin', 'Kingpin', '#e8e3f5', '#ffffff', '#5c5a66', '#8a1b2a', 'rose', 'dusk', 'Kingpin', 'night'],
  ['villain', 'v_mystique', 'Mystique', '#3a2a8a', '#e0d9ff', '#140a3a', '#e8574a', 'shapeshift', 'tide', 'Mystique', 'night'],
  ['villain', 'v_sabretooth', 'Sabretooth', '#c9a26b', '#fff0d0', '#4a3210', '#b83b2a', 'fang', 'frost', 'Sabretooth', 'crystal'],
  ['villain', 'v_apocalypse', 'Apocalypse', '#5c4a8a', '#e6dcff', '#20143a', '#5ad6ff', 'armor', 'earth', 'Apocalypse', 'ember'],
  ['villain', 'v_galactus', 'Galactus', '#3a2a5c', '#e0d9ff', '#120a26', '#ff7ac8', 'cosmic', 'dusk', 'World Eater', 'aurora'],
  ['villain', 'v_kang', 'Kang the Conqueror', '#3a6b5c', '#d9fff2', '#123a2f', '#b69cff', 'time', 'crystal', 'Time Conqueror', 'crystal'],
  ['villain', 'v_sandman', 'Sandman', '#b89a5c', '#fff3d6', '#4a3a10', '#5c6b3a', 'sand', 'earth', 'Sandstorm', 'savanna'],
  ['villain', 'v_juggernaut', 'Juggernaut', '#8a1b1b', '#ffd9d9', '#3a0707', '#b89a5c', 'armor', 'stone', 'Juggernaut', 'ember'],
  ['villain', 'v_reverseflash', 'Reverse-Flash', '#d9b21b', '#fff8c2', '#5c4605', '#e8574a', 'bolt', 'volt', 'Reverse Flash', 'neon'],
  ['villain', 'v_gorillagrodd', 'Gorilla Grodd', '#5c4a3a', '#f2e4d0', '#20140a', '#8fe07a', 'mind', 'earth', 'Gorilla Grodd', 'grove'],
  ['villain', 'v_brainiac', 'Brainiac', '#3a6b5c', '#d9fff2', '#123a2f', '#8fe07a', 'tech', 'crystal', 'Brainiac', 'crystal'],
  ['villain', 'v_generalzod', 'General Zod', '#3a3a4a', '#e2e2f2', '#12121c', '#e8574a', 'armor', 'frost', 'Kneel', 'crystal'],
  ['villain', 'v_captaincold', 'Captain Cold', '#3a5f8a', '#dbe9ff', '#12243a', '#5ad6ff', 'ice', 'frost', 'Cold Gun', 'crystal'],
  ['villain', 'v_blackmanta', 'Black Manta', '#1b2a3a', '#d6e8f2', '#070e14', '#e8574a', 'eye', 'tide', 'Black Manta', 'tide'],
  ['villain', 'v_riddler', 'The Riddler', '#3a7a3a', '#dcffdc', '#123a12', '#ffd166', 'riddle', 'volt', 'Riddle Me This', 'night'],
  ['villain', 'v_twoface', 'Two-Face', '#5c3a3a', '#f2d9d9', '#1e0e0e', '#e8e3f5', 'coin', 'ember', 'Two-Face', 'night'],
  ['villain', 'v_omniman', 'Omni-Man', '#b83b36', '#ffe2dc', '#4a1210', '#e8e3f5', 'star', 'ember', 'Omni-Man', 'aurora'],
  ['villain', 'v_homelander', 'Homelander', '#2f4fa0', '#dbe9ff', '#101e4a', '#e8574a', 'star', 'radiant', 'Homelander', 'aurora'],
  ['villain', 'v_mistersinister', 'Mister Sinister', '#8a1b4a', '#ffd9e8', '#3a071c', '#e8e3f5', 'rose', 'crystal', 'Mister Sinister', 'crystal'],
  ['villain', 'v_clayface', 'Clayface', '#8a6a3a', '#f2e4c2', '#3a2a0a', '#5c8a5c', 'shapeshift', 'earth', 'Clayface', 'night'],
  ['anti', 'a_deadpool', 'Deadpool', '#b81b1b', '#ffd9d9', '#3a0707', '#2a2a33', 'mask', 'ember', 'Maximum Effort', 'ember'],
  ['anti', 'a_punisher', 'The Punisher', '#2a2a33', '#e8e3f5', '#0e0e14', '#e8574a', 'skull', 'dusk', 'Punisher', 'night'],
  ['anti', 'a_redhood', 'Red Hood', '#8a1b1b', '#ffd9d9', '#3a0707', '#2a2a33', 'mask', 'dusk', 'Red Hood', 'night'],
  ['anti', 'a_spawn', 'Spawn', '#2a0e0e', '#e8574a', '#0a0202', '#8fe07a', 'flame', 'ember', 'Spawn', 'night'],
  ['anti', 'a_butcher', 'Billy Butcher', '#3a3a2a', '#e8e3c2', '#121208', '#e8574a', 'mask', 'dusk', 'Butcher', 'night'],
  ['anti', 'a_ghostrider', 'Ghost Rider', '#2a2a33', '#e8e3f5', '#0e0e14', '#ff7a1b', 'flame', 'ember', 'Ghost Rider', 'ember'],
  ['anti', 'a_blade', 'Blade', '#3a2a2a', '#e8d9d9', '#120808', '#b83b2a', 'blade', 'dusk', 'Daywalker', 'night'],
  ['anti', 'a_moonknight', 'Moon Knight', '#e8e3f5', '#ffffff', '#5c5a66', '#c9a21b', 'moon', 'radiant', 'Moon Knight', 'night'],
  ['anti', 'a_blackadam', 'Black Adam', '#2a2a33', '#e8e3f5', '#0e0e14', '#ffd166', 'bolt', 'volt', 'Black Adam', 'crystal'],
  ['anti', 'a_lobo', 'Lobo', '#5c4a6b', '#e8dcf2', '#1e1226', '#e8574a', 'chain', 'ember', 'Main Man', 'ember'],
  ['anti', 'a_peacemaker', 'Peacemaker', '#3a5f8a', '#dbe9ff', '#12243a', '#e8e3f5', 'mask', 'volt', 'Peacemaker', 'savanna'],
  ['anti', 'a_gwenpool', 'Gwenpool', '#ff5fa2', '#ffe3f2', '#4a0f2e', '#2a2a33', 'mask', 'bloom', 'Pink Paradox', 'neon'],
];

const HERO_PUBLISHER_META = {
  marvel: { label: 'Marvel', icon: '🕷️' },
  dc: { label: 'DC', icon: '🦇' },
  other: { label: 'Beyond Marvel & DC', icon: '✨' },
};

const HERO_PUBLISHER_KEYS = {
  marvel: new Set([
    'spiderman',
    'hero_hawkeye', 'hero_captainmarvel', 'hero_antman', 'hero_wasp', 'hero_falcon',
    'hero_wintersoldier', 'hero_warmachine', 'hero_starlord', 'hero_gamora', 'hero_groot',
    'hero_storm', 'hero_shehulk', 'hero_nova', 'hero_vision', 'hero_quicksilver', 'hero_daredevil',
    'v_doctordoom', 'v_kingpin', 'v_mystique', 'v_sabretooth', 'v_apocalypse', 'v_galactus',
    'v_kang', 'v_sandman', 'v_juggernaut', 'v_mistersinister',
    'a_deadpool', 'a_gwenpool', 'a_punisher', 'a_ghostrider', 'a_blade', 'a_moonknight',
  ]),
  dc: new Set([
    'hero_batwoman', 'hero_huntress', 'hero_hawkman', 'hero_doctorfate', 'hero_blacklightning',
    'hero_vixen', 'hero_boostergold', 'hero_stargirl', 'hero_batwing',
    'v_reverseflash', 'v_gorillagrodd', 'v_brainiac', 'v_generalzod', 'v_captaincold',
    'v_blackmanta', 'v_riddler', 'v_twoface', 'v_clayface',
    'a_redhood', 'a_blackadam', 'a_lobo', 'a_peacemaker',
  ]),
};

function heroPublisherFor(key) {
  if (HERO_PUBLISHER_KEYS.marvel.has(key)) return 'marvel';
  if (HERO_PUBLISHER_KEYS.dc.has(key)) return 'dc';
  return 'other';
}

const HERO_SPECIES = [];
const HERO_BY_ROLE = { hero: [], villain: [], anti: [] };

HERO_WAVE_DEFS.forEach(([roleKey, key, name, primary, light, deep, accent, motifKey, partner, hybrid, home], index) => {
  const role = HERO_ROLE_META[roleKey];
  const motif = HERO_MOTIF_META[motifKey];
  if (!role || !motif || ELEMENTS[key]) return;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: motif.trait,
    blurb: `${role.blurb} ${motif.blurb}`,
    greeting: role.greetings[index % role.greetings.length],
    likes: role.likes,
    heroRole: roleKey,
    heroMotif: motifKey,
    heroPublisher: heroPublisherFor(key),
  };
  GENE_POWERS[key] = { name: motif.gene, icon: motif.icon, desc: motif.desc, effect: motif.effect };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = role.price;
  TYPE_EGG_PRICE[key] = discountedEggPrice(role.price);
  if (ELEMENTS[partner]) HYBRID_NAMES[pairKey(key, partner)] = hybrid;
  NAME_START[key] = [name.replace(/^The /, '').split(' ')[0], ...name.split(' ').slice(1, 3)];
  const homes = [home, ...role.homes];
  homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  HERO_SPECIES.push(key);
  HERO_BY_ROLE[roleKey].push(key);
});

ELEMENT_KEYS.push(...HERO_SPECIES);

/* Classic Marvel signatures join the publisher roster without inflating the new-wave count. */
['spiderman'].forEach((key) => {
  if (!ELEMENTS[key]) return;
  ELEMENTS[key].heroPublisher = 'marvel';
  ELEMENTS[key].heroRole = 'hero';
});
