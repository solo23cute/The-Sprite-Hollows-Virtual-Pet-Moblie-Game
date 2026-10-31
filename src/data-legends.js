/* Crossover legends: a curated 160-character pack across games, cartoons, and horror. */

const LEGEND_GROUPS = {
  fnaf: {
    label: "Five Nights at Freddy's", icon: '🐻', price: 185,
    homes: ['neon', 'night', 'ember'], likes: 'Pizza',
    blurb: 'A stage-lit animatronic with a showtune in its chest and a flicker in its eye.',
    note: 'The pizza-party crew, the Funtime set, the Glamrock band, and the rabbit behind the mask.',
    greetings: [
      'The show is about to start. Please keep your hands inside the Hollow.',
      'I have been waiting on this stage a very long time.',
      'Five nights? I only need one good audience.',
    ],
  },
  mario: {
    label: 'Super Mario Bros.', icon: '🍄', price: 165,
    homes: ['grove', 'sugar', 'aurora'], likes: 'Star Pop',
    blurb: 'A bright platforming pal with a can-do pose, a pocketful of power-ups, and somewhere to jump.',
    note: 'The brothers, the princesses, the Kongs, Bowser’s castle, and the familiar faces of the Mushroom Kingdom.',
    greetings: [
      'Let’s-a go! I already packed the snacks.',
      'Every castle has a back door. Probably.',
      'I found a coin. This is now a great day.',
    ],
  },
  spore: {
    label: 'Spore', icon: '🦠', price: 150,
    homes: ['tide', 'grove', 'dream'], likes: 'Moon Berry',
    blurb: 'A creature shaped by its own strange evolutionary path, with a new limb for every occasion.',
    note: 'Original creature archetypes inspired by the cell, creature, tribe, and space stages rather than named characters.',
    greetings: [
      'I evolved a new favorite snack. It is you-adjacent.',
      'My ancestors were much smaller. I grew out of them.',
      'The galaxy is large. My appetite is larger.',
    ],
  },
  tomjerry: {
    label: 'Tom & Jerry', icon: '🧀', price: 150,
    homes: ['sugar', 'grove', 'neon'], likes: 'Star Cookie',
    blurb: 'A slapstick alley regular with perfect comic timing and a suspicious relationship with cheese.',
    note: 'Tom and Jerry join the chase alongside Tuffy, Spike, Tyke, Butch, Quacker, Toodles, and the rest of the alley.',
    greetings: [
      'I heard a cheese wrapper. The chase is back on.',
      'We can be friends after the anvil lands.',
      'This house is too quiet. Time to fix that.',
    ],
  },
  looney: {
    label: 'Looney Tunes', icon: '🥕', price: 155,
    homes: ['savanna', 'neon', 'grove'], likes: 'Carrot Crunch',
    blurb: 'A cartoon troublemaker with rubber-hose timing, a bottomless pocket, and a punchline ready.',
    note: 'Bugs and the whole lunatic ensemble: ducks, pigs, cats, birds, Martians, and one very polite frog.',
    greetings: [
      'What’s up, doc? Besides my excellent entrance?',
      'I saw the anvil coming. I chose comedy.',
      'That’s all, folks — unless there are snacks.',
    ],
  },
  zelda: {
    label: 'The Legend of Zelda', icon: '🗡️', price: 195,
    homes: ['grove', 'crystal', 'aurora'], likes: 'Honeycomb Cake',
    blurb: 'A hero of prophecy with a sacred blade, a brave heart, and a habit of breaking pots.',
    note: 'Heroes, princesses, champions, sages, and the dark powers of Hyrule, Termina, and the skies beyond.',
    greetings: [
      'The road is long, but the sword is warm.',
      'I found a shrine. I also found a nap spot.',
      'Courage is just fear with better footwork.',
    ],
  },
  walkingdead: {
    label: 'The Walking Dead', icon: '🧟', price: 185,
    homes: ['night', 'ember', 'savanna'], likes: 'Hearty Stew',
    blurb: 'A survivor with a hard-won plan, a trusted weapon, and a group worth protecting.',
    note: 'The Grimes family, the communities, the Saviors, the Whisperers, and the people still standing.',
    greetings: [
      'We keep moving. That is the whole plan.',
      'I have lost enough. I am not losing snack time too.',
      'The dead are the easy part. People are complicated.',
    ],
  },
  slasher: {
    label: 'Horror icons', icon: '🔪', price: 205,
    homes: ['night', 'ember', 'crystal'], likes: 'Ember Steak',
    blurb: 'A midnight legend with a signature silhouette, a patient stare, and a very dramatic entrance.',
    note: 'Freddy, Jason, Chucky, and the rest of the late-night horror hall — original collectible silhouettes, no film footage.',
    greetings: [
      'You should see the other guy. He is fine. Mostly.',
      'I brought a friend. He is a knife.',
      'The campfire story got my good side.',
    ],
  },
  videogame: {
    label: 'Video game icons', icon: '🎮', price: 175,
    homes: ['neon', 'crystal', 'aurora'], likes: 'Star Pop',
    blurb: 'A controller-carrying legend from another save file, built from pixels, polygons, and pure attitude.',
    note: 'A curated cross-console roster. Existing Hollow icons Sonic, Tails, Shadow, Crash, Mega Man, Kirby, and Jazz Jackrabbit join as classics.',
    greetings: [
      'Checkpoint reached. I am saving here.',
      'I have a health bar and no patience.',
      'Press start. I will handle the rest.',
    ],
  },
};

const LEGEND_GROUP_ORDER = ['fnaf', 'mario', 'spore', 'tomjerry', 'looney', 'zelda', 'walkingdead', 'slasher', 'videogame'];

const LEGEND_GENE_META = {
  showtime: { name: 'Showtime', icon: '🎤', trait: 'Stage-trained — treats every room like an audience.', desc: 'Gifts arrive 25% sooner and +10% XP.', effect: { giftSpeed: 1.25, xp: 1.1 }, blurb: 'A little spotlight follows them across the floor.' },
  pizza: { name: 'Party Slice', icon: '🍕', trait: 'Party-minded — never lets a plate go empty.', desc: 'Hunger fades 20% slower and snacks give +25% XP.', effect: { hungerDecay: 0.8, snackXp: 1.25 }, blurb: 'A warm pizza-box glow trails behind them.' },
  nightmare: { name: 'Night Terror', icon: '🌙', trait: 'Midnight-made — the dark knows their name.', desc: 'Night games pay +4 coins and needs fade 8% slower.', effect: { nightCoins: 4, decay: 0.92 }, blurb: 'A long shadow turns a beat after they do.' },
  trick: { name: 'Mask Trick', icon: '🎭', trait: 'Unreadable — always playing three moves ahead.', desc: 'Night games pay +3 coins and gifts arrive 20% sooner.', effect: { nightCoins: 3, giftSpeed: 1.2 }, blurb: 'A second face peeks out from the shadow.' },
  speed: { name: 'Quickstep', icon: '💨', trait: 'Restless — the finish line is already bored.', desc: 'Energy fades 20% slower and games pay +3 coins.', effect: { energyDecay: 0.8, gameCoins: 3 }, blurb: 'A speed-line loops around one shoulder.' },
  boss: { name: 'Big Finish', icon: '💥', trait: 'Dramatic — enters through the wall, not the door.', desc: 'Games pay +4 coins and +10% XP.', effect: { gameCoins: 4, xp: 1.1 }, blurb: 'A heavy impact ring cracks the air nearby.' },
  jump: { name: 'Power Jump', icon: '🦘', trait: 'Spring-footed — has never trusted a staircase.', desc: 'Day games pay +3 coins and energy fades 15% slower.', effect: { dayCoins: 3, energyDecay: 0.85 }, blurb: 'A row of sparkles marks the last jump.' },
  heart: { name: 'Big Heart', icon: '💗', trait: 'Soft-centered — fierce about the people they love.', desc: 'Pets build +35% bond and chats pay +2 coins.', effect: { petBond: 1.35, chatCoins: 2 }, blurb: 'A bright heart floats above their head.' },
  cheer: { name: 'Team Cheer', icon: '🎉', trait: 'Sunny — makes the whole room believe in the plan.', desc: 'Joy fades 20% slower and pets pay +2 coins.', effect: { joyDecay: 0.8, petCoins: 2 }, blurb: 'A paper party popper is always ready.' },
  magic: { name: 'Old Magic', icon: '🔮', trait: 'Mystic — keeps one impossible answer in reserve.', desc: 'Gifts arrive 25% sooner and +15% XP.', effect: { giftSpeed: 1.25, xp: 1.15 }, blurb: 'A slow ring of runes circles their feet.' },
  greed: { name: 'Coin Magnet', icon: '🪙', trait: 'Acquisitive — counts the room before entering it.', desc: 'Day games pay +4 coins and games pay +2 more.', effect: { dayCoins: 4, gameCoins: 2 }, blurb: 'A gold coin flips itself at their elbow.' },
  shell: { name: 'Shell Guard', icon: '🐢', trait: 'Protected — slow to start, impossible to move.', desc: 'All needs fade 12% slower and hunger fades 10% slower.', effect: { decay: 0.88, hungerDecay: 0.9 }, blurb: 'A hard shell plate sits across their back.' },
  evolve: { name: 'Adapt', icon: '🧬', trait: 'Changing — every day grows a better version.', desc: '+20% XP and snacks give +20% XP.', effect: { xp: 1.2, snackXp: 1.2 }, blurb: 'A double helix curls around one shoulder.' },
  hunt: { name: 'Hunter’s Eye', icon: '🎯', trait: 'Focused — sees the path before the ground does.', desc: 'Games pay +3 coins and night games pay +3 more.', effect: { gameCoins: 3, nightCoins: 3 }, blurb: 'A thin targeting ring locks onto the horizon.' },
  spore: { name: 'Spore Cloud', icon: '🍄', trait: 'Spreading — leaves a little life wherever they sit.', desc: 'Snacks give +30% XP and joy fades 15% slower.', effect: { snackXp: 1.3, joyDecay: 0.85 }, blurb: 'Tiny drifting spores catch the light.' },
  guard: { name: 'Watchful', icon: '🛡️', trait: 'Protective — stands between the group and the door.', desc: 'All needs fade 10% slower and pets build +25% bond.', effect: { decay: 0.9, petBond: 1.25 }, blurb: 'A simple round shield leans at their side.' },
  chaos: { name: 'Comic Chaos', icon: '🌀', trait: 'Uncontainable — the plan is a suggestion.', desc: 'Games pay +4 coins and joy fades 20% slower.', effect: { gameCoins: 4, joyDecay: 0.8 }, blurb: 'A tiny tornado of scenery spins nearby.' },
  deadpan: { name: 'Deadpan', icon: '😐', trait: 'Unbothered — has seen stranger things before breakfast.', desc: 'Energy fades 25% slower and chats pay +3 coins.', effect: { energyDecay: 0.75, chatCoins: 3 }, blurb: 'A perfectly flat little speech bubble hangs nearby.' },
  courage: { name: 'Courage', icon: '⚔️', trait: 'Brave — scared and moving forward anyway.', desc: '+15% XP and all needs fade 8% slower.', effect: { xp: 1.15, decay: 0.92 }, blurb: 'A steady blade-shaped shine marks the path.' },
  sea: { name: 'Tide Call', icon: '🌊', trait: 'Tidal — always knows where the current is going.', desc: 'Chats pay +3 coins and energy fades 15% slower.', effect: { chatCoins: 3, energyDecay: 0.85 }, blurb: 'A curl of bright water circles one foot.' },
  heal: { name: 'Mend', icon: '💚', trait: 'Gentle — patches people up before asking questions.', desc: 'Hunger fades 20% slower and pets build +30% bond.', effect: { hungerDecay: 0.8, petBond: 1.3 }, blurb: 'A soft green pulse gathers at the chest.' },
  survivor: { name: 'Survivor', icon: '🎒', trait: 'Resourceful — makes three meals out of one bad day.', desc: 'Hunger and energy fade 20% slower.', effect: { hungerDecay: 0.8, energyDecay: 0.8 }, blurb: 'A well-worn pack sits high on the shoulders.' },
  fire: { name: 'Hellfire', icon: '🔥', trait: 'Burning — leaves a warm room and a cold warning.', desc: 'Night games pay +4 coins and +10% XP.', effect: { nightCoins: 4, xp: 1.1 }, blurb: 'A crown of embers flickers and reforms.' },
  tech: { name: 'System Hack', icon: '📡', trait: 'Wired — solves people the way others solve machines.', desc: 'Gifts arrive 25% sooner and games pay +2 coins.', effect: { giftSpeed: 1.25, gameCoins: 2 }, blurb: 'A tiny signal meter pings above their head.' },
  fight: { name: 'Fighting Spirit', icon: '👊', trait: 'Ready — every conversation is one round away.', desc: 'Games pay +4 coins and pets pay +2 coins.', effect: { gameCoins: 4, petCoins: 2 }, blurb: 'A bright impact star snaps at their fist.' },
  armor: { name: 'Battle Plate', icon: '🛡️', trait: 'Fortified — built for the long level.', desc: 'Energy fades 25% slower and games pay +2 coins.', effect: { energyDecay: 0.75, gameCoins: 2 }, blurb: 'A polished shoulder plate catches the light.' },
  build: { name: 'Maker', icon: '🧱', trait: 'Constructive — turns a pile of scraps into a home.', desc: 'Gifts arrive 20% sooner and +15% XP.', effect: { giftSpeed: 1.2, xp: 1.15 }, blurb: 'A neat stack of little blocks floats nearby.' },
  treasure: { name: 'Treasure Sense', icon: '🗺️', trait: 'Curious — follows every rumor with a map on it.', desc: 'Day games pay +4 coins and gifts arrive 15% sooner.', effect: { dayCoins: 4, giftSpeed: 1.15 }, blurb: 'A worn map corner peeks from their pocket.' },
  curse: { name: 'Old Curse', icon: '🏺', trait: 'Ancient — carries a warning older than the room.', desc: 'Night games pay +3 coins and +15% XP.', effect: { nightCoins: 3, xp: 1.15 }, blurb: 'A ring of dust and hieroglyphs circles their feet.' },
  slasher: { name: 'Late Night', icon: '🔪', trait: 'Patient — the scare is better when it is earned.', desc: 'Night games pay +4 coins and games pay +2 more.', effect: { nightCoins: 4, gameCoins: 2 }, blurb: 'Three thin slash marks catch the moonlight.' },
  rival: { name: 'Rivalry', icon: '⚡', trait: 'Competitive — would race a shadow and demand a rematch.', desc: 'Games pay +3 coins and +15% XP.', effect: { gameCoins: 3, xp: 1.15 }, blurb: 'A split spark marks a friendly challenge.' },
  space: { name: 'Star Chart', icon: '🪐', trait: 'Far-minded — half of them is always somewhere else.', desc: 'Night games pay +4 coins and gifts arrive 15% sooner.', effect: { nightCoins: 4, giftSpeed: 1.15 }, blurb: 'A tiny ringed planet turns overhead.' },
  time: { name: 'Time Slip', icon: '⏳', trait: 'Unhurried — remembers tomorrow like it already happened.', desc: 'Gifts arrive 30% sooner and +10% XP.', effect: { giftSpeed: 1.3, xp: 1.1 }, blurb: 'A cracked clock face hangs in the air.' },
};

const LEGEND_WAVE_DEFS = [
  // Five Nights at Freddy's
  ['fnaf', 'lg_freddy', 'Freddy Fazbear', '#8a5a2b', '#ffe0b0', '#3a1f0a', '#ffd166', 'showtime', 'hat', 'ember', 'Mic Check', 'neon'],
  ['fnaf', 'lg_bonnie', 'Bonnie', '#6b4a9e', '#e8d6ff', '#26143f', '#ff8fb2', 'showtime', 'guitar', 'dusk', 'Stage Echo', 'neon'],
  ['fnaf', 'lg_chica', 'Chica', '#e8c23a', '#fff3b8', '#6b4a0a', '#ff9f1c', 'pizza', 'bib', 'ember', 'Pizza Party', 'sugar'],
  ['fnaf', 'lg_foxy', 'Foxy', '#b83a2b', '#ffd6c2', '#4a120a', '#ffd166', 'pizza', 'hook', 'tide', 'Pirate Cove', 'tide'],
  ['fnaf', 'lg_goldenfreddy', 'Golden Freddy', '#d9b23a', '#fff6c2', '#6b4a05', '#f2efe8', 'showtime', 'hat', 'frost', 'Golden Silence', 'crystal'],
  ['fnaf', 'lg_springtrap', 'Springtrap', '#5c7a3a', '#d9e8b8', '#1f2f0a', '#e8574a', 'nightmare', 'spring', 'night', 'Spring Lock', 'night'],
  ['fnaf', 'lg_puppet', 'The Puppet', '#e8e3f5', '#ffffff', '#2a2a33', '#e8574a', 'trick', 'musicbox', 'dusk', 'Music Box', 'dream'],
  ['fnaf', 'lg_baby', 'Circus Baby', '#e86b8a', '#ffe0ea', '#6b1a33', '#3ac9b8', 'showtime', 'bow', 'sugar', 'Ice Cream Song', 'sugar'],
  ['fnaf', 'lg_ballora', 'Ballora', '#b58ae8', '#f3e8ff', '#4a2a6b', '#7affd8', 'magic', 'musicbox', 'aurora', 'Ballet Spin', 'crystal'],
  ['fnaf', 'lg_funtimefreddy', 'Funtime Freddy', '#e8e3f5', '#ffffff', '#5c5a66', '#6b4a9e', 'showtime', 'microphone', 'volt', 'Bon-Bon Beat', 'neon'],
  ['fnaf', 'lg_ennard', 'Ennard', '#8a8a9c', '#e3e6ee', '#3a3a4a', '#e8574a', 'nightmare', 'wires', 'night', 'Wire Tangle', 'night'],
  ['fnaf', 'lg_glamfreddy', 'Glamrock Freddy', '#3a6bd0', '#dbe9ff', '#12245c', '#e8574a', 'showtime', 'microphone', 'neon', 'Glam Solo', 'neon'],
  ['fnaf', 'lg_roxanne', 'Roxanne Wolf', '#7a8a9c', '#e8f2ff', '#2f3a4a', '#7affd8', 'speed', 'claw', 'neon', 'Keytar Howl', 'neon'],
  ['fnaf', 'lg_monty', 'Montgomery Gator', '#4a8a5a', '#d9ffe8', '#143a24', '#b58ae8', 'boss', 'claw', 'ember', 'Gator Stomp', 'ember'],
  ['fnaf', 'lg_glamchica', 'Glamrock Chica', '#f2efe8', '#ffffff', '#6b6455', '#ff8fc8', 'showtime', 'guitar', 'sugar', 'Glam Crunch', 'sugar'],
  ['fnaf', 'lg_vanny', 'Vanny', '#efe8f5', '#ffffff', '#4a3a55', '#e8574a', 'trick', 'mask', 'night', 'Rabbit Mask', 'night'],

  // Super Mario Bros.
  ['mario', 'lg_mario', 'Mario', '#e83a3a', '#ffe0d6', '#6b0f0f', '#3a6bd0', 'jump', 'cap', 'ember', "Plumber's Jump", 'grove'],
  ['mario', 'lg_luigi', 'Luigi', '#3a9a5a', '#d9ffe8', '#0f3a1f', '#3a6bd0', 'jump', 'cap', 'gale', 'Green Thunder', 'grove'],
  ['mario', 'lg_peach', 'Princess Peach', '#ff9fc7', '#fff0f8', '#8a2a5c', '#ffd166', 'heart', 'crown', 'bloom', 'Royal Heart', 'sugar'],
  ['mario', 'lg_daisy', 'Princess Daisy', '#e8a23a', '#fff3d6', '#6b4210', '#b58ae8', 'heart', 'crown', 'bloom', 'Flower Court', 'grove'],
  ['mario', 'lg_bowser', 'Bowser', '#4a7a3a', '#d9e8b8', '#1a2f0f', '#ff9f1c', 'boss', 'shell', 'ember', 'Castle Crush', 'ember'],
  ['mario', 'lg_bowserjr', 'Bowser Jr.', '#7aa84a', '#e8f5c2', '#2f4a10', '#ffd166', 'trick', 'shell', 'tide', 'Junior Scheme', 'tide'],
  ['mario', 'lg_toad', 'Toad', '#f2efe8', '#ffffff', '#6b6455', '#e8574a', 'cheer', 'mushroom', 'bloom', 'Toadstool Tune', 'grove'],
  ['mario', 'lg_toadette', 'Toadette', '#ffb3d1', '#fff0f6', '#a13b63', '#f2efe8', 'cheer', 'mushroom', 'sugar', 'Sweet Spore', 'sugar'],
  ['mario', 'lg_yoshi', 'Yoshi', '#6bc95a', '#e0ffd9', '#275c1e', '#f2efe8', 'jump', 'egg', 'grove', "Yoshi's Egg", 'grove'],
  ['mario', 'lg_donkeykong', 'Donkey Kong', '#8a5a2b', '#e8cbaa', '#3a1f0a', '#e8574a', 'boss', 'tie', 'rock', 'Barrel Roll', 'savanna'],
  ['mario', 'lg_diddykong', 'Diddy Kong', '#b87a3a', '#ffe0c2', '#4a260a', '#e8574a', 'speed', 'cap', 'gale', 'Peanut Pop', 'savanna'],
  ['mario', 'lg_rosalina', 'Rosalina', '#7ad8e8', '#e8fbff', '#1f5c6b', '#ffd166', 'magic', 'star', 'aurora', 'Comet Wish', 'aurora'],
  ['mario', 'lg_wario', 'Wario', '#e8c23a', '#fff3b8', '#6b4a0a', '#6b4a9e', 'greed', 'coin', 'crystal', 'Garlic Gold', 'crystal'],
  ['mario', 'lg_waluigi', 'Waluigi', '#6b4a9e', '#e8d6ff', '#26143f', '#ffd166', 'trick', 'racket', 'dusk', 'Purple Scheme', 'night'],
  ['mario', 'lg_goomba', 'Goomba', '#8a5a3a', '#e8cbaa', '#3a1f0a', '#f2efe8', 'trick', 'brow', 'stone', 'Little Stomp', 'stone'],
  ['mario', 'lg_koopa', 'Koopa Troopa', '#5aa84a', '#d9ffd0', '#1f4a14', '#ffd166', 'shell', 'shell', 'tide', 'Shell Slide', 'tide'],
  ['mario', 'lg_shyguy', 'Shy Guy', '#d93a3a', '#ffd6d6', '#5c0f0f', '#f2efe8', 'trick', 'mask', 'dusk', 'Masked Shuffle', 'night'],
  ['mario', 'lg_kamek', 'Kamek', '#3a5a9e', '#d6e4ff', '#12245c', '#ffd166', 'magic', 'wand', 'dream', 'Spellbook', 'dream'],
  ['mario', 'lg_pauline', 'Pauline', '#c93a5c', '#ffd6e2', '#4d0f24', '#ffd166', 'magic', 'microphone', 'neon', 'City Song', 'neon'],
  ['mario', 'lg_birdo', 'Birdo', '#e88ab8', '#ffe8f3', '#6b1f4a', '#b58ae8', 'heart', 'egg', 'sugar', 'Pink Egg', 'sugar'],

  // Spore creature archetypes
  ['spore', 'lg_sporeling', 'Sporeling', '#7ac95a', '#e8ffd0', '#2f5c1a', '#7affd8', 'evolve', 'spore', 'bloom', 'Cell Bloom', 'grove'],
  ['spore', 'lg_grazer', 'Tide Grazer', '#4ac9b8', '#d9fff8', '#145c4f', '#8fe07a', 'evolve', 'leaf', 'tide', 'Reef Graze', 'tide'],
  ['spore', 'lg_predator', 'Ember Predator', '#e86b3a', '#ffd6b8', '#6b1f0a', '#ffd166', 'hunt', 'fang', 'ember', 'Wild Hunt', 'ember'],
  ['spore', 'lg_hopper', 'Bloom Hopper', '#a8d94a', '#f0ffc2', '#3f5c10', '#ff8fc8', 'jump', 'leaf', 'bloom', 'Leap Seed', 'grove'],
  ['spore', 'lg_flock', 'Gale Flock', '#8ac9e8', '#e8f8ff', '#2f5c7a', '#f2efe8', 'space', 'wing', 'aurora', 'Sky Flock', 'aurora'],
  ['spore', 'lg_mollusk', 'Frost Mollusk', '#8ab8d9', '#e8f5ff', '#2f4a6b', '#c9a6ff', 'shell', 'shell', 'tide', 'Deep Shell', 'tide'],
  ['spore', 'lg_fungoid', 'Fungoid', '#8a5a9e', '#e8d6ff', '#3a1f4a', '#f2efe8', 'spore', 'spore', 'dream', 'Spore Halo', 'dream'],
  ['spore', 'lg_hivewisp', 'Hive Wisp', '#e8c23a', '#fff3b8', '#6b4a0a', '#b58ae8', 'spore', 'wing', 'sugar', 'Hive Song', 'sugar'],
  ['spore', 'lg_terrabraute', 'Terra Brute', '#8a6b4a', '#e8d6b8', '#3a2a14', '#8fe07a', 'boss', 'fist', 'stone', 'Terra Stomp', 'crystal'],
  ['spore', 'lg_starmime', 'Star Mime', '#6b4a9e', '#e8d6ff', '#26143f', '#ffd166', 'space', 'star', 'aurora', 'Silent Star', 'aurora'],
  ['spore', 'lg_cellspark', 'Cell Spark', '#5ae8d9', '#e8fffb', '#145c55', '#ffd84d', 'evolve', 'cell', 'neon', 'First Spark', 'neon'],
  ['spore', 'lg_skewer', 'Skewer', '#6b8a3a', '#e0f2c2', '#2f3f14', '#e8574a', 'hunt', 'spike', 'savanna', 'Needle Rush', 'savanna'],

  // Tom & Jerry
  ['tomjerry', 'lg_tuffy', 'Tuffy', '#e8c9a0', '#fff0d9', '#6b4a2a', '#ffd166', 'cheer', 'cheese', 'sugar', 'Tiny Nibble', 'sugar'],
  ['tomjerry', 'lg_spike', 'Spike', '#8a8a9c', '#e3e6ee', '#3a3a4a', '#e8574a', 'guard', 'collar', 'stone', 'Junkyard Guard', 'stone'],
  ['tomjerry', 'lg_tyke', 'Tyke', '#b8a07a', '#f2e4c9', '#5c4a2a', '#e8574a', 'cheer', 'collar', 'grove', 'Little Guard', 'grove'],
  ['tomjerry', 'lg_butch', 'Butch', '#3a3a4a', '#d6d6e3', '#12121c', '#ffd166', 'trick', 'claw', 'night', 'Alley Cat', 'night'],
  ['tomjerry', 'lg_quacker', 'Quacker', '#f2d14f', '#fff8d9', '#8a6a2a', '#ff9f1c', 'cheer', 'duck', 'tide', 'Little Quack', 'tide'],
  ['tomjerry', 'lg_toodles', 'Toodles Galore', '#f2efe8', '#ffffff', '#6b6455', '#ff8fc8', 'heart', 'bow', 'sugar', 'Ribbon Charm', 'sugar'],
  ['tomjerry', 'lg_meathead', 'Meathead', '#9a6b4a', '#e8cbaa', '#3a2410', '#e8574a', 'boss', 'fist', 'stone', 'Alley Bulk', 'stone'],
  ['tomjerry', 'lg_lightning', 'Lightning', '#e89a3a', '#ffe8c2', '#6b3a0a', '#f2efe8', 'speed', 'bolt', 'neon', 'Fast Paws', 'neon'],
  ['tomjerry', 'lg_unclepecos', 'Uncle Pecos', '#c9a06b', '#fff0d6', '#5c3a14', '#e8574a', 'chaos', 'guitar', 'savanna', 'Pecos Tune', 'savanna'],
  ['tomjerry', 'lg_muscles', 'Muscles', '#8a8a9c', '#e3e6ee', '#3a3a4a', '#e8574a', 'boss', 'dumbbell', 'crystal', 'Muscle Flex', 'crystal'],
  ['tomjerry', 'lg_droopy', 'Droopy', '#e8dcc0', '#fff8e8', '#6b5a3a', '#5a8ac9', 'deadpan', 'ear', 'dream', 'Slow Hello', 'dream'],

  // Looney Tunes
  ['looney', 'lg_daffy', 'Daffy Duck', '#2a2a33', '#c9c9d6', '#0a0a12', '#ff9f1c', 'trick', 'beak', 'neon', 'Duck Dodge', 'neon'],
  ['looney', 'lg_porky', 'Porky Pig', '#f2c9c9', '#fff5f5', '#8a5a5a', '#3a6bd0', 'cheer', 'bowtie', 'grove', "That's All", 'grove'],
  ['looney', 'lg_tweety', 'Tweety', '#ffe066', '#fff8c2', '#a37a00', '#5a9eff', 'cheer', 'feather', 'sugar', 'Little Bird', 'sugar'],
  ['looney', 'lg_sylvester', 'Sylvester', '#2a2a33', '#d6d6e3', '#0a0a12', '#e8574a', 'hunt', 'claw', 'night', 'Cat Cunning', 'night'],
  ['looney', 'lg_roadrunner', 'Road Runner', '#5a9eff', '#dbe9ff', '#1f3a8a', '#f2efe8', 'speed', 'feather', 'savanna', 'Beep Beep', 'savanna'],
  ['looney', 'lg_wile', 'Wile E. Coyote', '#c9a06b', '#fff0d6', '#5c3a14', '#e8574a', 'trick', 'anvil', 'savanna', 'Desert Scheme', 'savanna'],
  ['looney', 'lg_taz', 'Tasmanian Devil', '#8a5a3a', '#e8cbaa', '#3a1f0a', '#e8574a', 'chaos', 'tornado', 'ember', 'Tornado Spin', 'ember'],
  ['looney', 'lg_foghorn', 'Foghorn Leghorn', '#f2efe8', '#ffffff', '#6b6455', '#e8574a', 'boss', 'rooster', 'savanna', 'Big Rooster', 'savanna'],
  ['looney', 'lg_marvin', 'Marvin the Martian', '#5a8a3a', '#d9f2c2', '#1f3a14', '#e8574a', 'space', 'helmet', 'aurora', 'Martian Plan', 'aurora'],
  ['looney', 'lg_yosemite', 'Yosemite Sam', '#e88a3a', '#ffd6b8', '#6b2f0a', '#e8574a', 'boss', 'hat', 'ember', "Rootin' Tootin'", 'ember'],
  ['looney', 'lg_pepe', 'Pepé Le Pew', '#2a2a33', '#f2efe8', '#0a0a12', '#ff5e8a', 'heart', 'flower', 'night', 'Little Flower', 'night'],
  ['looney', 'lg_speedy', 'Speedy Gonzales', '#f2d14f', '#fff8d9', '#8a6a2a', '#e8574a', 'speed', 'sombrero', 'neon', 'Rapid Racer', 'neon'],
  ['looney', 'lg_gossamer', 'Gossamer', '#e88a3a', '#ffd6b8', '#6b2f0a', '#6b4a9e', 'chaos', 'fur', 'dusk', 'Hair Raising', 'night'],
  ['looney', 'lg_granny', 'Granny', '#b8a0b8', '#f2e8f2', '#5c4a5c', '#ff8fc8', 'heart', 'glasses', 'sugar', 'Tea Time', 'sugar'],
  ['looney', 'lg_elmer', 'Elmer Fudd', '#e8c9b8', '#fff5ef', '#8a5a4a', '#5a8a3a', 'hunt', 'cap', 'grove', 'Wabbit Hunt', 'grove'],
  ['looney', 'lg_beaky', 'Beaky Buzzard', '#2a2a33', '#d6d6e3', '#0a0a12', '#f2d14f', 'deadpan', 'beak', 'aurora', 'Buzzard Glide', 'aurora'],
  ['looney', 'lg_michigan', 'Michigan J. Frog', '#4a9a5a', '#d9ffe8', '#143a1f', '#ffd166', 'showtime', 'cane', 'neon', 'Show Tune', 'neon'],

  // The Legend of Zelda
  ['zelda', 'lg_link', 'Link', '#5a9a4a', '#e0ffd6', '#1f3a14', '#ffd166', 'courage', 'sword', 'grove', "Hero's Blade", 'grove'],
  ['zelda', 'lg_zelda', 'Zelda', '#e8a0c9', '#fff0f8', '#8a2a5c', '#ffd166', 'magic', 'triforce', 'crystal', 'Royal Seal', 'crystal'],
  ['zelda', 'lg_ganondorf', 'Ganondorf', '#3a5a3a', '#d9e8d9', '#122412', '#ff9f1c', 'boss', 'trident', 'ember', 'Gerudo Storm', 'ember'],
  ['zelda', 'lg_ganon', 'Ganon', '#2a2a33', '#b8a6c9', '#0a0a12', '#ff6b3d', 'nightmare', 'horns', 'night', 'Dark Beast', 'night'],
  ['zelda', 'lg_impa', 'Impa', '#e8e3f5', '#ffffff', '#5c5a66', '#e8574a', 'guard', 'kunai', 'stone', 'Sheikah Guard', 'stone'],
  ['zelda', 'lg_navi', 'Navi', '#5ad6ff', '#e8fbff', '#145c8a', '#f2efe8', 'magic', 'wing', 'dream', 'Fairy Call', 'dream'],
  ['zelda', 'lg_epona', 'Epona', '#b87a3a', '#ffe0c2', '#4a260a', '#f2efe8', 'speed', 'horseshoe', 'grove', 'Wild Gallop', 'grove'],
  ['zelda', 'lg_midna', 'Midna', '#4a3a6b', '#d9c9ff', '#18102a', '#7affd8', 'trick', 'crown', 'night', 'Twilight Veil', 'night'],
  ['zelda', 'lg_fi', 'Fi', '#8ad8e8', '#e8fbff', '#2f5c6b', '#b58ae8', 'magic', 'sword', 'crystal', 'Sword Spirit', 'crystal'],
  ['zelda', 'lg_ghirahim', 'Ghirahim', '#f2efe8', '#ffffff', '#6b6455', '#e8574a', 'trick', 'sword', 'dusk', 'Demon Blade', 'dusk'],
  ['zelda', 'lg_zant', 'Zant', '#4a3a5c', '#d6c9e8', '#181024', '#e8574a', 'nightmare', 'mask', 'night', 'Usurper Mask', 'night'],
  ['zelda', 'lg_skullkid', 'Skull Kid', '#7a5a3a', '#e8cbaa', '#2f1f0a', '#ff9f1c', 'trick', 'mask', 'night', 'Lost Woods', 'night'],
  ['zelda', 'lg_majora', 'Majora', '#6b3a8a', '#e8d6ff', '#26143f', '#ff5e8a', 'nightmare', 'mask', 'ember', 'Falling Moon', 'ember'],
  ['zelda', 'lg_vaati', 'Vaati', '#6b4a9e', '#e8d6ff', '#26143f', '#e8574a', 'magic', 'eye', 'dusk', 'Wind Mage', 'dusk'],
  ['zelda', 'lg_tetra', 'Tetra', '#c9a06b', '#fff0d6', '#5c3a14', '#3a6bd0', 'sea', 'sword', 'tide', 'Pirate Queen', 'tide'],
  ['zelda', 'lg_kingredlions', 'King of Red Lions', '#b83a3a', '#ffd6d6', '#4a0f0f', '#ffd166', 'sea', 'boat', 'tide', 'Red Sail', 'tide'],
  ['zelda', 'lg_urbosa', 'Urbosa', '#b87a4a', '#ffe0c2', '#4a260a', '#5ad6ff', 'fight', 'scimitar', 'savanna', 'Gerudo Thunder', 'savanna'],
  ['zelda', 'lg_mipha', 'Mipha', '#e85a5a', '#ffd6d6', '#5c0f0f', '#f2efe8', 'heal', 'spear', 'tide', 'Zora Grace', 'tide'],
  ['zelda', 'lg_revali', 'Revali', '#3a7a9e', '#d9f2ff', '#123a4a', '#8fe07a', 'space', 'bow', 'aurora', 'Gale Archer', 'aurora'],
  ['zelda', 'lg_daruk', 'Daruk', '#8a5a3a', '#e8cbaa', '#3a1f0a', '#ff6b3d', 'guard', 'shield', 'ember', 'Goron Guard', 'ember'],
  ['zelda', 'lg_sidon', 'Sidon', '#e84a4a', '#ffd6d6', '#5c0f0f', '#5ad6ff', 'cheer', 'spear', 'tide', "Prince's Smile", 'tide'],
  ['zelda', 'lg_riju', 'Riju', '#e8c23a', '#fff3b8', '#6b4a0a', '#5ad6ff', 'speed', 'helm', 'savanna', 'Sand Seal', 'savanna'],
  ['zelda', 'lg_purah', 'Purah', '#f2efe8', '#ffffff', '#6b6455', '#e8574a', 'tech', 'goggles', 'neon', 'Tech Notes', 'neon'],
  ['zelda', 'lg_sonia', 'Sonia', '#e8d6a0', '#fff8d9', '#6b5a2a', '#ffd166', 'time', 'clock', 'crystal', "Time's Memory", 'crystal'],

  // The Walking Dead
  ['walkingdead', 'lg_rick', 'Rick Grimes', '#8a6b4a', '#e8d6b8', '#3a2a14', '#5a9eff', 'survivor', 'sheriff', 'savanna', 'Grimes Code', 'savanna'],
  ['walkingdead', 'lg_michonne', 'Michonne', '#6b4a3a', '#e8c9b8', '#2a140a', '#e8574a', 'hunt', 'katana', 'night', 'Blade Walker', 'night'],
  ['walkingdead', 'lg_daryl', 'Daryl Dixon', '#6b6b5a', '#e8e8d6', '#2a2a1f', '#c9a06b', 'hunt', 'crossbow', 'savanna', 'Crossbow Trail', 'savanna'],
  ['walkingdead', 'lg_glenn', 'Glenn Rhee', '#3a3a4a', '#d6d6e3', '#12121c', '#5a9eff', 'speed', 'cap', 'neon', 'Supply Run', 'neon'],
  ['walkingdead', 'lg_maggie', 'Maggie Greene', '#d9c9a0', '#fff8e0', '#6b5a2a', '#8fe07a', 'guard', 'hat', 'grove', 'Hilltop Heart', 'grove'],
  ['walkingdead', 'lg_carol', 'Carol Peletier', '#8a8a9c', '#e3e6ee', '#3a3a4a', '#ff8fb2', 'survivor', 'knife', 'night', 'Quiet Flame', 'night'],
  ['walkingdead', 'lg_negan', 'Negan', '#2a2a33', '#c9c9d6', '#0a0a12', '#e8574a', 'boss', 'bat', 'ember', "Lucille's Lesson", 'ember'],
  ['walkingdead', 'lg_judith', 'Judith Grimes', '#8a6b4a', '#e8d6b8', '#3a2a14', '#5a9eff', 'courage', 'sword', 'grove', 'Little Leader', 'grove'],
  ['walkingdead', 'lg_carl', 'Carl Grimes', '#9a7a5a', '#f2e0c2', '#4a2f14', '#e8574a', 'courage', 'sheriff', 'savanna', 'New World', 'savanna'],
  ['walkingdead', 'lg_shane', 'Shane Walsh', '#b89a6b', '#fff0d6', '#5c4a2a', '#3a6bd0', 'rival', 'shotgun', 'stone', 'Hot Temper', 'stone'],
  ['walkingdead', 'lg_andrea', 'Andrea', '#e8d6a0', '#fff8d9', '#6b5a2a', '#e8574a', 'hunt', 'rifle', 'night', 'Watchtower', 'night'],
  ['walkingdead', 'lg_abraham', 'Abraham Ford', '#c95a3a', '#ffd6c2', '#5c1f0a', '#3a6bd0', 'boss', 'hammer', 'ember', 'Big Red', 'ember'],
  ['walkingdead', 'lg_eugene', 'Eugene Porter', '#9a8a6b', '#f2e8cc', '#4a3f2a', '#5a9eff', 'tech', 'radio', 'neon', 'Radio Static', 'neon'],
  ['walkingdead', 'lg_rosita', 'Rosita Espinosa', '#b87a5a', '#ffe0cc', '#4a2414', '#e8574a', 'hunt', 'knife', 'savanna', 'Quick Draw', 'savanna'],
  ['walkingdead', 'lg_sasha', 'Sasha Williams', '#8a6b5a', '#e8d6c9', '#3a241a', '#e8574a', 'hunt', 'rifle', 'grove', 'Fierce Watch', 'grove'],
  ['walkingdead', 'lg_tyreese', 'Tyreese Williams', '#6b5a4a', '#e8d6c9', '#2a1f14', '#8fe07a', 'guard', 'hammer', 'stone', 'Gentle Giant', 'stone'],
  ['walkingdead', 'lg_hershel', 'Hershel Greene', '#d9d9cc', '#ffffff', '#6b6b5c', '#c9a06b', 'heal', 'book', 'grove', 'Farm Wisdom', 'grove'],
  ['walkingdead', 'lg_morgan', 'Morgan Jones', '#6b5a4a', '#e8d6c9', '#2a1f14', '#e8574a', 'survivor', 'staff', 'night', 'Clear', 'night'],
  ['walkingdead', 'lg_gabriel', 'Gabriel Stokes', '#2a2a33', '#d6d6e3', '#0a0a12', '#f2efe8', 'heal', 'book', 'crystal', "Preacher's Hope", 'crystal'],
  ['walkingdead', 'lg_ezekiel', 'Ezekiel', '#8a5a3a', '#e8cbaa', '#3a1f0a', '#e8a23a', 'heart', 'tiger', 'savanna', 'Kingdom Roar', 'savanna'],
  ['walkingdead', 'lg_alpha', 'Alpha', '#8a8a7a', '#e8e8d9', '#3a3a2f', '#e8574a', 'nightmare', 'mask', 'night', 'Whisper Fear', 'night'],
  ['walkingdead', 'lg_beta', 'Beta', '#5c5c4a', '#d6d6c9', '#1f1f14', '#e8574a', 'boss', 'mask', 'ember', 'Whisper Strength', 'ember'],
  ['walkingdead', 'lg_mercer', 'Mercer', '#6b4a3a', '#e8c9b8', '#2a140a', '#e8574a', 'guard', 'baton', 'neon', 'Commonwealth Guard', 'neon'],
  ['walkingdead', 'lg_princess', 'Princess', '#ff8fc8', '#fff0f8', '#8a2a5c', '#5a9eff', 'trick', 'armor', 'dream', 'Free Spirit', 'dream'],

  // Horror icons
  ['slasher', 'lg_freddykrueger', 'Freddy Krueger', '#8a4a2b', '#e8c2a0', '#3a140a', '#e8574a', 'nightmare', 'claw', 'ember', 'Dream Slash', 'ember'],
  ['slasher', 'lg_jason', 'Jason Voorhees', '#6b6b5a', '#e8e8d6', '#2a2a1f', '#e8574a', 'slasher', 'mask', 'night', 'Camp Shadow', 'night'],
  ['slasher', 'lg_chucky', 'Chucky', '#c93a3a', '#ffd6d6', '#4d0f0f', '#3a6bd0', 'trick', 'knife', 'neon', 'Doll Grin', 'neon'],
  ['slasher', 'lg_tiffany', 'Tiffany Valentine', '#b83a6b', '#ffd6e8', '#4a0f2a', '#2a2a33', 'trick', 'knife', 'sugar', "Bride's Blade", 'sugar'],
  ['slasher', 'lg_michaelmyers', 'Michael Myers', '#e8e3f5', '#ffffff', '#5c5a66', '#2a2a33', 'slasher', 'mask', 'night', 'Silent Stare', 'night'],
  ['slasher', 'lg_pinhead', 'Pinhead', '#b8b8c9', '#f2f2ff', '#4a4a5c', '#2a2a33', 'curse', 'puzzlebox', 'crystal', 'Lament Box', 'crystal'],
  ['slasher', 'lg_leatherface', 'Leatherface', '#8a6b4a', '#e8d6b8', '#3a2a14', '#e8574a', 'slasher', 'chainsaw', 'ember', 'Family Cut', 'ember'],
  ['slasher', 'lg_ghostface', 'Ghostface', '#2a2a33', '#e8e3f5', '#0a0a12', '#e8574a', 'trick', 'mask', 'neon', 'Scream Call', 'neon'],
  ['slasher', 'lg_pennywise', 'Pennywise', '#e8e3f5', '#ffffff', '#5c5a66', '#e8574a', 'nightmare', 'balloon', 'tide', 'Red Balloon', 'tide'],
  ['slasher', 'lg_dracula', 'Dracula', '#2a2a33', '#c9c9d6', '#0a0a12', '#c93a3a', 'nightmare', 'cape', 'night', 'Night Fang', 'night'],
  ['slasher', 'lg_frankenstein', "Frankenstein's Monster", '#6b8a5a', '#e0f2d6', '#2a3a1f', '#ffd166', 'boss', 'bolt', 'stone', 'Storm Birth', 'stone'],
  ['slasher', 'lg_mummy', 'The Mummy', '#c9b08a', '#fff0d6', '#5c4a2a', '#ffd166', 'curse', 'bandage', 'crystal', 'Ancient Curse', 'crystal'],

  // Video game icons
  ['videogame', 'lg_masterchief', 'Master Chief', '#4a7a4a', '#d9f2d9', '#1a3a1a', '#ffd166', 'armor', 'visor', 'neon', 'Spartan Shield', 'neon'],
  ['videogame', 'lg_kratos', 'Kratos', '#8a8a7a', '#e8e8d9', '#3a3a2f', '#e8574a', 'boss', 'axe', 'ember', 'Blades of Ash', 'ember'],
  ['videogame', 'lg_laracroft', 'Lara Croft', '#8a5a3a', '#e8cbaa', '#3a1f0a', '#3ac9b8', 'treasure', 'torch', 'stone', 'Tomb Raid', 'stone'],
  ['videogame', 'lg_pacman', 'Pac-Man', '#ffe066', '#fff8c2', '#a37a00', '#5a9eff', 'greed', 'pellet', 'neon', 'Maze Munch', 'neon'],
  ['videogame', 'lg_samus', 'Samus Aran', '#e86b3a', '#ffd6b8', '#6b1f0a', '#5ad6ff', 'armor', 'armcannon', 'aurora', 'Bounty Hunt', 'aurora'],
  ['videogame', 'lg_cloud', 'Cloud Strife', '#e8d6a0', '#fff8d9', '#6b5a2a', '#3a6bd0', 'fight', 'buster', 'aurora', 'Limit Break', 'aurora'],
  ['videogame', 'lg_sephiroth', 'Sephiroth', '#e8e3f5', '#ffffff', '#3a2a3a', '#2a2a33', 'boss', 'sword', 'dusk', 'One Wing', 'dusk'],
  ['videogame', 'lg_snake', 'Solid Snake', '#7a8a7a', '#e3e8e3', '#2f3a2f', '#c9a06b', 'survivor', 'box', 'night', 'Codec Call', 'night'],
  ['videogame', 'lg_alucard', 'Alucard', '#e8e3f5', '#ffffff', '#3a2a3a', '#c93a3a', 'nightmare', 'cape', 'night', 'Night Walker', 'night'],
  ['videogame', 'lg_ryu', 'Ryu', '#f2efe8', '#ffffff', '#6b6455', '#e8574a', 'fight', 'fist', 'ember', 'Hadou Spark', 'ember'],
  ['videogame', 'lg_chunli', 'Chun-Li', '#3a6bd0', '#dbe9ff', '#12245c', '#ffd166', 'speed', 'kick', 'neon', 'Hundred Kicks', 'neon'],
  ['videogame', 'lg_scorpion', 'Scorpion', '#e8c23a', '#fff3b8', '#6b4a0a', '#2a2a33', 'fire', 'chain', 'ember', 'Hellfire Chain', 'ember'],
  ['videogame', 'lg_subzero', 'Sub-Zero', '#5a9eff', '#e8f5ff', '#1f3a8a', '#f2efe8', 'nightmare', 'ice', 'crystal', 'Ice Clone', 'crystal'],
  ['videogame', 'lg_steve', 'Steve', '#4a7aa8', '#d9edff', '#1a3a5c', '#8fe07a', 'build', 'block', 'stone', 'Block By Block', 'stone'],
  ['videogame', 'lg_gordon', 'Gordon Freeman', '#e88a3a', '#ffd6b8', '#6b2f0a', '#3a3a4a', 'tech', 'crowbar', 'crystal', 'Crowbar Logic', 'crystal'],
  ['videogame', 'lg_chell', 'Chell', '#e89a3a', '#ffe8c2', '#6b3a0a', '#f2efe8', 'tech', 'portal', 'neon', 'Portal Pair', 'neon'],
  ['videogame', 'lg_joel', 'Joel Miller', '#7a7a6b', '#e8e8d9', '#2f2f24', '#8a5a3a', 'survivor', 'backpack', 'savanna', 'Last Run', 'savanna'],
  ['videogame', 'lg_ellie', 'Ellie Williams', '#6b8a5a', '#e0f2d6', '#2a3a1f', '#e8574a', 'survivor', 'knife', 'grove', 'Endure', 'grove'],
  ['videogame', 'lg_nathan', 'Nathan Drake', '#8a6b4a', '#e8d6b8', '#3a2a14', '#5a9eff', 'treasure', 'rope', 'tide', 'Treasure Map', 'tide'],
  ['videogame', 'lg_aloy', 'Aloy', '#c95a3a', '#ffd6c2', '#5c1f0a', '#5ad6ff', 'hunt', 'bow', 'aurora', 'Machine Hunt', 'aurora'],
  ['videogame', 'lg_geralt', 'Geralt of Rivia', '#e8e3f5', '#ffffff', '#5c5a66', '#ffd166', 'hunt', 'sword', 'night', 'Witcher Sign', 'night'],
  ['videogame', 'lg_arthur', 'Arthur Morgan', '#8a6b4a', '#e8d6b8', '#3a2a14', '#e8574a', 'survivor', 'hat', 'savanna', 'Ride On', 'savanna'],
  ['videogame', 'lg_doomslayer', 'Doom Slayer', '#4a7a4a', '#d9f2d9', '#1a3a1a', '#e8574a', 'boss', 'armor', 'ember', 'Rip and Tear', 'ember'],
  ['videogame', 'lg_sora', 'Sora', '#a87a4a', '#f2e0c9', '#4a2f14', '#f2efe8', 'heart', 'keyblade', 'dream', 'Key to Hearts', 'dream'],
];

const LEGEND_SPECIES = [];
const LEGEND_BY_GROUP = {};
LEGEND_GROUP_ORDER.forEach((group) => { LEGEND_BY_GROUP[group] = []; });

LEGEND_WAVE_DEFS.forEach(([groupKey, key, name, primary, light, deep, accent, geneKey, artKey, partner, hybrid, home], index) => {
  const group = LEGEND_GROUPS[groupKey];
  const gene = LEGEND_GENE_META[geneKey];
  if (!group || !gene || ELEMENTS[key]) return;
  ELEMENTS[key] = {
    name, primary, light, deep, accent,
    trait: gene.trait,
    blurb: `${group.blurb} ${gene.blurb}`,
    greeting: group.greetings[index % group.greetings.length],
    likes: group.likes,
    legendGroup: groupKey,
    legendGene: geneKey,
    legendArt: artKey,
  };
  GENE_POWERS[key] = { name: gene.name, icon: gene.icon, desc: gene.desc, effect: gene.effect };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = group.price;
  TYPE_EGG_PRICE[key] = discountedEggPrice(group.price);
  if (ELEMENTS[partner]) HYBRID_NAMES[pairKey(key, partner)] = hybrid;
  NAME_START[key] = [name.replace(/^The /, '').replace(/^Princess /, '').replace(/^King /, '').split(' ')[0], ...name.split(' ').slice(1, 3)];
  const homes = [home, ...group.homes];
  homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  LEGEND_SPECIES.push(key);
  LEGEND_BY_GROUP[groupKey].push(key);
});

ELEMENT_KEYS.push(...LEGEND_SPECIES);

/* Existing signatures that belong in the new family rosters without duplicate species. */
const LEGEND_CLASSIC_GROUPS = {
  tomjerry: ['tomcat', 'jerry'],
  looney: ['bugs'],
  videogame: ['sonic', 'tails', 'shadow', 'crash', 'megaman', 'kirby', 'jazz'],
};
const LEGEND_CLASSIC_KEYS = [];
Object.entries(LEGEND_CLASSIC_GROUPS).forEach(([groupKey, keys]) => {
  keys.forEach((key) => {
    if (!ELEMENTS[key]) return;
    ELEMENTS[key].legendGroup = groupKey;
    ELEMENTS[key].legendClassic = true;
    LEGEND_BY_GROUP[groupKey].push(key);
    LEGEND_CLASSIC_KEYS.push(key);
  });
});

const LEGEND_TOTAL = LEGEND_SPECIES.length + LEGEND_CLASSIC_KEYS.length;
