/* 3.4.2 Netflix animation wing: 60 original collectibles under TV Legends,
   grouped as Netflix Anime and Netflix Toons with three characters per show. */

const NETFLIX_WINGS = {
  anime: {
    label: 'Netflix Anime', icon: '🍥',
    note: 'Stylised action, sharp silhouettes, and a midnight broadcast glow.',
  },
  toons: {
    label: 'Netflix Toons', icon: '🎨',
    note: 'Bright shapes, storybook colour, and a Saturday-morning bounce.',
  },
};
const NETFLIX_WING_ORDER = ['anime', 'toons'];

/* [wing, key, label, icon, base price, palette, homes, likes, partner, suffix, gene, trait, blurb, greetings, note] */
const NETFLIX_SHOW_ROWS = [
  ['anime', 'castlevania', 'Castlevania', '🦇', 215,
    ['#8e2b3f', '#f6dfe3', '#3b0d18', '#e8b04a'], ['night', 'ember'], 'Ember Steak', 'dusk', 'Requiem',
    ['Belmont Bloodline', '🦇', 'Night games pay +6 coins and gain +16% XP.', { nightCoins: 6, xp: 1.16 }],
    'Gothic — hunts in the rain and apologises to the furniture afterward.',
    'A gothic action signature with a family legacy, a consecrated weapon, and a castle-sized problem.',
    ['The castle is not a home. It is a very long hallway with opinions.', 'Bring a torch. The good one.', 'Every curse has a family tree. Ours is worse.'],
    'A wallachian revenge saga of hunters, speakers, and night creatures, retold in the Hollow with candlelight and crimson.'],
  ['anime', 'nocturne', 'Castlevania: Nocturne', '🌙', 205,
    ['#3b5ba8', '#dfe9ff', '#15234a', '#ff8a4c'], ['night', 'grove'], 'Revolution Loaf', 'ember', 'Revolution',
    ['Revolutionary Flame', '🔥', 'Day games pay +5 coins and gifts arrive 20% sooner.', { dayCoins: 5, giftSpeed: 1.2 }],
    'Revolutionary — fights for a future that has not been drawn yet.',
    'A revolutionary-era hunter with a blue coat, a family whip, and a city that needs saving before sunrise.',
    ['The old world had its turn. We are drafting a new one.', 'A revolution is just a party with better timing.', 'Sing louder. The night creatures hate a good chorus.'],
    'A French Revolution chapter of the Belmont story, with opera houses, red banners, and a moon that will not sit still.'],
  ['anime', 'edgerunners', 'Cyberpunk: Edgerunners', '🌆', 195,
    ['#f7e14a', '#fffbd6', '#3a2a00', '#23e6d0'], ['neon', 'crystal'], 'Synth Noodle', 'volt', 'Overdrive',
    ['Chrome Rush', '⚡', 'Games pay +6 coins and energy fades 20% slower.', { gameCoins: 6, energyDecay: 0.8 }],
    'Chrome-bright — runs on neon, nerve, and one more job.',
    'A neon street runner with a borrowed jacket, a custom implant, and a city that keeps raising the rent.',
    ['One more job. Then we sleep. Probably.', 'The city is loud. I am louder.', 'Chrome does not make you invincible. It just makes the fall shinier.'],
    'A rain-slick night-city story of young runners, cheap noodles, and expensive dreams, drawn with circuit lines and warning yellow.'],
  ['anime', 'blueeye', 'Blue Eye Samurai', '🗡️', 200,
    ['#3f6f8a', '#e6f4fb', '#122a38', '#e05a4a'], ['night', 'crystal'], 'Miso Broth', 'dusk', 'Edge',
    ['Silent Edge', '🗡️', 'Night games pay +5 coins and all needs fade 10% slower.', { nightCoins: 5, decay: 0.9 }],
    'Unreadable — a still face, a measured step, and a blade already moving.',
    'A lone swordsperson with a blue gaze, a hidden history, and a road that keeps getting narrower.',
    ['I did not come here to explain myself.', 'The blade is quiet. The rest of me is quieter.', 'A disguise is only a door. You still have to walk through it.'],
    'An Edo-period revenge tale of masks, ink, and snow, using indigo, steel, and a single ember-red accent.'],
  ['anime', 'dungeon', 'Delicious in Dungeon', '🍲', 180,
    ['#c98a3c', '#ffeed2', '#4a2a08', '#7ab55c'], ['grove', 'ember'], 'Dungeon Stew', 'bloom', 'Stew',
    ['Monster Menu', '🍲', 'Hunger fades 30% slower and snacks give +30% XP.', { hungerDecay: 0.7, snackXp: 1.3 }],
    'Practical — every problem is either a recipe or a very large spoon.',
    'A dungeon delver with a cooking pot, a patient party, and a plan that begins with dinner.',
    ['We are not lost. We are marinating.', 'Everything in this corridor is edible with the right sauce.', 'A balanced meal is the first rule of dungeon survival.'],
    'A dungeon-crawl comedy about adventurers who cook the monsters, told with copper pots, chipped stone, and a lot of parsley.'],
  ['anime', 'pluto', 'Pluto', '🤖', 210,
    ['#8a97b8', '#eef2ff', '#232a45', '#d94b4b'], ['neon', 'crystal'], 'Oil Cake', 'crystal', 'Circuit',
    ['Robot Heart', '🤖', 'Games pay +5 coins and pets build +30% bond.', { gameCoins: 5, petBond: 1.3 }],
    'Thoughtful — measures a life in small kindnesses, not in processing speed.',
    'A robot detective with a heavy coat, a heavier question, and a red signal blinking somewhere far away.',
    ['A machine can mourn. It just takes longer to explain.', 'I am looking for the part of the law that protects people.', 'Hatred is a programming error with excellent marketing.'],
    'A quiet science-fiction mystery about robot detectives, global fear, and the cost of being built to protect.'],
  ['anime', 'scott', 'Scott Pilgrim Takes Off', '🎸', 160,
    ['#d94b7a', '#ffe0ea', '#4a0f28', '#4fc3ff'], ['neon', 'sugar'], 'Garlic Bread', 'volt', 'Chord',
    ['Subspace Spark', '🎸', 'Games pay +4 coins and gain +20% XP.', { gameCoins: 4, xp: 1.2 }],
    'Band-practice — turns every fight into a set list and every apology into a chorus.',
    'A garage-band romantic with a sticker-covered bass, a complicated ex-list, and a very literal learning curve.',
    ['This is a love song. It is also a boss fight.', 'I have made a list. The list is mostly exes.', 'Turn it up. The emotional honesty is in the second verse.'],
    'A Toronto music-comedy about dating, band practice, and battles that obey arcade rules, scored in hot pink and cyan.'],
  ['anime', 'devilmaycry', 'Devil May Cry', '😈', 220,
    ['#a32b2b', '#ffe0d9', '#3a0909', '#6fd8ff'], ['night', 'ember'], 'Pizza Slice', 'ember', 'Trigger',
    ['Devil Trigger', '😈', 'Night games pay +6 coins and gain +20% XP.', { nightCoins: 6, xp: 1.2 }],
    'Devil-may-care — flips a coin at danger and usually catches it.',
    'A demon hunter with a long coat, a longer sword, and a talent for making apocalypse look like a Tuesday.',
    ['I am not dramatic. The lighting is dramatic.', 'Payment first. Existential crisis second.', 'The demons are the easy part. The paperwork is eternal.'],
    'A gothic action romp of devil hunters, oversized weapons, and family arguments conducted at full volume.'],
  ['anime', 'sakamoto', 'Sakamoto Days', '🛒', 150,
    ['#e8dcc4', '#fffaf0', '#3b3428', '#e05a5a'], ['sugar', 'grove'], 'Cream Bun', 'bloom', 'Shift',
    ['Retail Reflex', '🛒', 'Check-ins pay +7 bonus coins and completed tasks pay +6 bonus coins.', { checkinCoins: 7, taskCoins: 6 }],
    'Retired — moves like a legend and stocks the shelves like a saint.',
    'A retired hitman turned shopkeeper with a soft apron, unbreakable calm, and reflexes that never clocked out.',
    ['We close at eight. The other thing is by appointment.', 'A clean counter is a kind of peace.', 'Do not run in the aisles. I will know.'],
    'A deadpan action-comedy about a legendary assassin who chose a quiet store, a family, and unbeatable customer service.'],
  ['anime', 'beastars', 'Beastars', '🐺', 170,
    ['#7b5a48', '#f0e2d6', '#2b1a12', '#c9a44a'], ['grove', 'night'], 'Egg Sandwich', 'wolf', 'Instinct',
    ['Predator Poise', '🐺', 'Pets build +40% bond and all needs fade 10% slower.', { petBond: 1.4, decay: 0.9 }],
    'Careful — keeps instinct on a short leash and manners on a long one.',
    'A boarding-school animal with a tailored uniform, a careful posture, and a heart louder than any growl.',
    ['Instinct is a suggestion. I am trying to make better choices.', 'The cafeteria is a social experiment with soup.', 'Being gentle is not the same as being weak.'],
    'A school drama about instinct, etiquette, and belonging, told in warm browns and a single flash of gold.'],
  ['toons', 'arcane', 'Arcane', '🔷', 215,
    ['#2f6f9e', '#dff3ff', '#0f2436', '#ffcf4a'], ['neon', 'crystal'], 'Hextech Tart', 'crystal', 'Hex',
    ['Hextech Charge', '🔷', 'Gifts arrive 25% sooner and gain +20% XP.', { giftSpeed: 1.25, xp: 1.2 }],
    'Inventive — builds a better future and then worries about the warranty.',
    'A hextech city native with a bright coat, a pocket full of blueprints, and a family argument with global consequences.',
    ['The blue glow means it is working. Usually.', 'Every invention is a promise with a fuse.', 'The city has two halves. I keep visiting both.'],
    'A painted steampunk story of sisterhood, class, and dangerous progress, told in hextech blue and warning gold.'],
  ['toons', 'hilda', 'Hilda', '🗺️', 140,
    ['#5aa9c9', '#e6f8ff', '#17414f', '#f2c14e'], ['grove', 'world-iceland'], 'Cucumber Sandwich', 'gale', 'Trail',
    ['Wilderness Brave', '🌿', 'Day games pay +5 coins and needs fade 14% slower.', { dayCoins: 5, decay: 0.86 }],
    'Curious — packs a sketchbook before a plan and a sandwich before either.',
    'A blue-haired adventurer with a red scarf, a tiny notebook, and an unshakable belief that every creature is a neighbour.',
    ['The map ends here. That is the best part.', 'I brought a spare pencil and three snacks.', 'A troll is only a neighbour with a very old fence.'],
    'A storybook wilderness of trolls, elves, and very small houses, drawn in fjord blue and warm scarf red.'],
  ['toons', 'kipo', 'Kipo and the Age of Wonderbeasts', '🎶', 145,
    ['#8a4fbf', '#f2e4ff', '#2a0f45', '#5ce0b8'], ['grove', 'savanna'], 'Mega Mango', 'bloom', 'Song',
    ['Wonderbeast Song', '🎶', 'Pets build +35% bond and joy fades 20% slower.', { petBond: 1.35, joyDecay: 0.8 }],
    'Hopeful — meets a giant strange thing and asks what it likes to eat.',
    'A surface-world explorer with purple hair, a bright jacket, and a song for every enormous mutant animal.',
    ['The surface is not scary. It is just loud.', 'Every wonderbeast has a favourite song. Most are bangers.', 'We do not have to agree to share a garden.'],
    'A post-apocalyptic sing-along of giant animals, underground survivors, and friendship in ultraviolet and mint.'],
  ['toons', 'shera', 'She-Ra and the Princesses of Power', '🌟', 185,
    ['#c94f8a', '#ffe4f1', '#4a0f2d', '#ffd166'], ['crystal', 'aurora'], 'Moonberry Tart', 'radiant', 'Rebellion',
    ['Princess Rebellion', '🌟', 'Games pay +5 coins and pets pay +3 coins.', { gameCoins: 5, petCoins: 3 }],
    'Rebellious — has a sword, a speech, and absolutely no indoor voice.',
    'A princess of power with a starry crown, a glowing blade, and a rebellion that keeps growing extra chairs.',
    ['For the honour of the rebellion! Also: snacks.', 'A crown is a responsibility. A sword is a loud responsibility.', 'We are stronger together. That is not a slogan; it is a battle plan.'],
    'A sparkling fantasy rebellion of princesses, magic, and found family, in rose, gold, and starlight.'],
  ['toons', 'dragonprince', 'The Dragon Prince', '🐉', 190,
    ['#3f7a5a', '#e2fff0', '#12301f', '#c96bff'], ['crystal', 'grove'], 'Moonberry Juice', 'crystal', 'Primal',
    ['Primal Spark', '🐉', 'Gain +24% XP and gifts arrive 15% sooner.', { xp: 1.24, giftSpeed: 1.15 }],
    'Primal — listens for the magic in weather, rivers, and very patient eggs.',
    'A young mage with a primal symbol, a long journey, and a dragon egg that refuses to stay quiet.',
    ['The sky is an ocean if you know how to read it.', 'Magic is a conversation. Most people just shout.', 'Every egg is a promise that has not hatched yet.'],
    'A fantasy road story of elves, humans, and a dragon prince, painted in forest green and violet lightning.'],
  ['toons', 'carmen', 'Carmen Sandiego', '🕵️', 155,
    ['#c93030', '#ffe3e3', '#420a0a', '#ffd166'], ['sugar', 'world-alps'], 'Opera Cake', 'gale', 'Getaway',
    ['Where in the World', '🕵️', 'Games pay +4 coins and chats pay +3 coins.', { gameCoins: 4, chatCoins: 3 }],
    'Globetrotting — leaves a perfect clue and a better view.',
    'A red-coated thief with a worldly itinerary, a white hat, and a habit of stealing only what was already stolen.',
    ['The thief is not always the villain. Check the paperwork.', 'Every city has a rooftop with a better exit.', 'A good hat is a public service.'],
    'A globe-trotting caper of red coats, riddles, and landmarks, with a passport full of trouble.'],
  ['toons', 'voltron', 'Voltron: Legendary Defender', '🦁', 175,
    ['#3b5fbf', '#e4ecff', '#101f45', '#ff6b5a'], ['neon', 'crystal'], 'Space Goo', 'volt', 'Formation',
    ['Defender Formation', '🦁', 'Energy fades 25% slower and night games pay +4 coins.', { energyDecay: 0.75, nightCoins: 4 }],
    'Team-first — counts to five before doing anything reckless.',
    'A space defender with a bright uniform, a cockpit view, and an entire team riding on the same plan.',
    ['Form the lion. Then we talk.', 'Space is quiet. Our comms are not.', 'Five pilots, one very large robot. What could go wrong?'],
    'A cosmic team-up of coloured lions, impossible odds, and a very large robot, drawn in cobalt and signal red.'],
  ['toons', 'trollhunters', 'Trollhunters: Tales of Arcadia', '🛡️', 165,
    ['#4f6fbf', '#e8eeff', '#16234a', '#7de0ff'], ['crystal', 'grove'], 'Doughnut', 'crystal', 'Armor',
    ['Daylight Armor', '🛡️', 'All needs fade 12% slower and pets build +30% bond.', { decay: 0.88, petBond: 1.3 }],
    'Reluctant — has homework, a magical amulet, and absolutely no free evening.',
    'A small-town hero with a glowing amulet, a secret underground world, and a very patient best friend.',
    ['I was going to study. That was the whole plan.', 'The amulet chose me. The amulet has questionable taste.', 'Being brave mostly means showing up on time.'],
    'A suburban fantasy of trolls, amulets, and after-school apocalypses, in slate blue and daylight cyan.'],
  ['toons', 'cuphead', 'The Cuphead Show!', '☕', 130,
    ['#e8c15a', '#fff8d6', '#4a3505', '#e0574a'], ['sugar', 'neon'], 'Sugar Cube', 'sugar', 'Gamble',
    ['Run-and-Gun', '☕', 'Games pay +6 coins and gifts arrive 20% sooner.', { gameCoins: 6, giftSpeed: 1.2 }],
    'Rubber-hose — loses a fight, learns nothing, and comes back with a better hat.',
    'A cartoon cup with white gloves, a straw, and a talent for turning a small errand into a full musical number.',
    ['We are not in trouble. We are in a montage.', 'If the plan has a dance break, it is a good plan.', 'Do not shake the dice. The dice are already upset.'],
    'A rubber-hose cartoon of cups, dice, and vaudeville trouble, in butter yellow and cherry red.'],
  ['toons', 'sonicprime', 'Sonic Prime', '💠', 160,
    ['#3b7be8', '#e3efff', '#0a2350', '#ff4f8a'], ['neon', 'aurora'], 'Chili Dog', 'volt', 'Shatter',
    ['Shatterverse', '💠', 'Energy fades 30% slower and gifts arrive 25% sooner.', { energyDecay: 0.7, giftSpeed: 1.25 }],
    'Split-second — has a plan for every shard and a quip for every timeline.',
    'A blue-speed hero with a crystal-shard horizon, a bright smirk, and too many alternate worlds to count.',
    ['One world is enough. I have seven.', 'The shards are not broken. They are just... rearranged.', 'If you see another me, do not lend him money.'],
    'A shatterverse sprint through prismatic worlds, speed lines, and alternate friends, in electric blue and magenta.'],
];

const NETFLIX_SHOWS = {};
const NETFLIX_SHOW_ORDER = [];
NETFLIX_SHOW_ROWS.forEach((row) => {
  const [wing, key, label, icon, price, palette, homes, likes, partner, suffix, gene, trait, blurb, greetings, note] = row;
  NETFLIX_SHOWS[key] = {
    wing, key, label, icon, price, homes, likes, partner, suffix, gene, trait, blurb, greetings, note,
    primary: palette[0], light: palette[1], deep: palette[2], accent: palette[3],
  };
  NETFLIX_SHOW_ORDER.push(key);
});

/* [show, key, name, art, trait, short original article] */
const NETFLIX_DEFS = [
  ['castlevania', 'nf_trevor', 'Trevor Belmont', 'whip', 'Hunter-born — treats a cursed castle like a badly kept cellar.',
    'A Belmont heir with a worn coat, a consecrated whip, and a talent for finding the one door that should have stayed shut.'],
  ['castlevania', 'nf_sypha', 'Sypha Belnades', 'frost', 'Speaker-mage — narrates the spell and the escape route at the same time.',
    'A speaker magician who reads the weather like a manuscript and keeps a small flame ready for the dark corridors.'],
  ['castlevania', 'nf_carmilla', 'Carmilla', 'claws', 'Courtly — turns a strategic retreat into a formal invitation.',
    'A vampire strategist in crimson armour who prefers a well-drafted alliance to a messy battlefield.'],

  ['nocturne', 'nf_richter', 'Richter Belmont', 'whip', 'Nocturne heir — fights with a family relic and a stubborn streak.',
    'A young Belmont with a blue coat and a whip that remembers every ancestor who ever held it.'],
  ['nocturne', 'nf_maria', 'Maria Renard', 'doves', 'Summoner — keeps a flock of doves and a very sharp opinion.',
    'A revolutionary summoner who sends doves into the dark and expects them to come back with news.'],
  ['nocturne', 'nf_annette', 'Annette', 'flame', 'Revolutionary — carries a fire that refuses to be politely contained.',
    'A Caribbean sorceress whose flame magic is tied to memory, justice, and a city learning to breathe again.'],

  ['edgerunners', 'nf_david', 'David Martinez', 'chrome', 'Street-runner — trades sleep for upgrades and upgrades for trouble.',
    'A night-city runner in a borrowed jacket who keeps saying yes to one more job and one more implant.'],
  ['edgerunners', 'nf_lucy', 'Lucy', 'netrunner', 'Netrunner — walks through firewall doors and leaves them politely closed.',
    'A quiet netrunner with pale hair and a holographic escape plan who trusts a keyboard more than a promise.'],
  ['edgerunners', 'nf_rebecca', 'Rebecca', 'shotgun', 'Loud — solves a room-sized problem with a hand-sized answer.',
    'A compact edgerunner with a big shotgun, a bigger grin, and absolutely no interest in a quiet exit.'],

  ['blueeye', 'nf_mizu', 'Mizu', 'blade', 'Hidden — keeps a whole life behind a pair of blue eyes.',
    'A swordsperson in a travelling disguise, following a list of names through snow, ink, and narrow roads.'],
  ['blueeye', 'nf_ringo', 'Ringo', 'ladle', 'Steady — cooks first and asks difficult questions second.',
    'A cheerful travelling cook with a ladle, a full pot, and a knack for making a cold camp feel like a kitchen.'],
  ['blueeye', 'nf_taigen', 'Taigen', 'spear', 'Proud — rehearses his legacy and forgets his footwork.',
    'A rival swordsman with a polished reputation, a sharp spear, and a lesson still waiting at the end of the road.'],

  ['dungeon', 'nf_laios', 'Laios', 'pot', 'Monster-minded — takes notes on the thing that is trying to eat him.',
    'A dungeon explorer in light armour who believes every monster is a puzzle and every puzzle is a recipe.'],
  ['dungeon', 'nf_marcille', 'Marcille', 'spellbook', 'Precise — measures ingredients, spell components, and everyone else’s mistakes.',
    'An elven mage with a spellbook, a sensible haircut, and a deep suspicion of dungeon cooking.'],
  ['dungeon', 'nf_senshi', 'Senshi', 'skillet', 'Provisioner — will not enter a dungeon without a full pantry.',
    'A seasoned dungeon cook in a sturdy helmet who turns monster parts into a balanced three-course meal.'],

  ['pluto', 'nf_gesicht', 'Gesicht', 'detective', 'Investigative — notices the one detail the room wants forgotten.',
    'A robot detective in a heavy coat, working a case that keeps pointing back at the people who built him.'],
  ['pluto', 'nf_atom', 'Atom', 'core', 'Bright — believes the best proof of humanity is a kind choice.',
    'A small robot with a bright core, a brave stance, and an unshakable faith that people can do better.'],
  ['pluto', 'nf_epsilon', 'Epsilon', 'sun', 'Gentle — carries a star of hope into rooms that have gone cold.',
    'A thoughtful robot with a sunny crest who would rather have a conversation than a confrontation.'],

  ['scott', 'nf_knives', 'Knives Chau', 'skates', 'Fast-paced — arrives on wheels and leaves before the chorus.',
    'A sharp-witted skater with a bright jacket, a quick comeback, and a talent for changing the tempo of a scene.'],
  ['scott', 'nf_wallace', 'Wallace Wells', 'phone', 'Social — knows everyone, everything, and the best place to brunch.',
    'A stylish friend with a phone in one hand and a plan for everyone else’s love life in the other.'],
  ['scott', 'nf_lucas', 'Lucas Lee', 'skateboard', 'Showman — treats a fight like a stunt and a stunt like a sequel.',
    'A movie-star skater with a branded board, a practiced grin, and an agent somewhere off-screen.'],

  ['devilmaycry', 'nf_dante', 'Dante', 'greatsword', 'Unbothered — orders pizza in the middle of an apocalypse.',
    'A devil hunter in a red coat who flips a coin at danger and complains when the coin lands badly.'],
  ['devilmaycry', 'nf_lady', 'Lady', 'cannon', 'Pragmatic — brings a firearm to a family argument.',
    'A professional demon hunter with a rocket launcher, a motorcycle, and a very low tolerance for excuses.'],
  ['devilmaycry', 'nf_vergil', 'Vergil', 'katana', 'Exacting — sharpens a blade while the world makes its case.',
    'A reserved swordsman in blue with a precise stance and an ambition that cuts wider than any weapon.'],

  ['sakamoto', 'nf_sakamoto', 'Taro Sakamoto', 'apron', 'Retired — stocks shelves with the calm of a legend.',
    'A former hitman turned neighbourhood shopkeeper, moving through the aisles with unshakeable calm.'],
  ['sakamoto', 'nf_shin', 'Shin Asakura', 'reading', 'Perceptive — hears the thought behind the order.',
    'A shop clerk with a quiet gaze and a habit of knowing exactly what a customer needs before they say it.'],
  ['sakamoto', 'nf_nagumo', 'Yoichi Nagumo', 'cards', 'Playful — treats a threat like a card trick with a punchline.',
    'A cheerful operative with a deck of cards, a light step, and a dangerous amount of confidence.'],

  ['beastars', 'nf_legoshi', 'Legoshi', 'uniform', 'Gentle — a tall silhouette trying very hard to be small.',
    'A grey wolf in a school blazer who keeps his claws polished and his instincts under a very careful lid.'],
  ['beastars', 'nf_haru', 'Haru', 'flower', 'Independent — grows a small garden in a very large shadow.',
    'A white rabbit gardener with a firm sense of self and a refusal to be defined by anyone else’s appetite.'],
  ['beastars', 'nf_louis', 'Louis', 'antlers', 'Composed — wears authority like a tailored coat.',
    'A red deer with antlers held high, a precise uniform, and a notion of leadership that keeps everyone guessing.'],

  ['arcane', 'nf_vi', 'Vi', 'gauntlets', 'Direct — answers a complicated problem with a straight punch.',
    'A street-fighting enforcer with red hair, heavy gauntlets, and a loyalty that outlasts every bad plan.'],
  ['arcane', 'nf_jinx', 'Jinx', 'bombs', 'Volatile — turns a quiet room into a fireworks display.',
    'A blue-haired tinkerer with a painted cannon, a pocket full of sparks, and a laugh that arrives before the explosion.'],
  ['arcane', 'nf_ekko', 'Ekko', 'clock', 'Quick — borrows a few seconds and pays them back with interest.',
    'A bright-eyed inventor with a clockwork device, a hoverboard, and a plan that improves every time it is rewound.'],

  ['hilda', 'nf_frida', 'Frida', 'quill', 'Studious — takes notes on magic and files them alphabetically.',
    'A young spellcaster with a neat satchel and a talent for turning careful research into brave action.'],
  ['hilda', 'nf_alfur', 'Alfur', 'notebook', 'Meticulous — documents everything and signs each page twice.',
    'A tiny elf with a large notebook, a responsible attitude, and a formal signature for every occasion.'],
  ['hilda', 'nf_hildadavid', 'David', 'scarf', 'Loyal — follows the adventure and worries about the weather.',
    'A kind-hearted friend with a warm scarf, a sensible concern for safety, and a willingness to keep going anyway.'],

  ['kipo', 'nf_kipo', 'Kipo Oak', 'song', 'Optimistic — makes friends with the enormous thing first.',
    'A purple-haired surface explorer who greets giant wonderbeasts with a song and a plan for a shared garden.'],
  ['kipo', 'nf_benson', 'Benson', 'guitar', 'Loyal — keeps the beat even when the world is ending.',
    'A quiet friend with a guitar, a level head, and a willingness to follow a very loud plan.'],
  ['kipo', 'nf_dave', 'Dave', 'bug', 'Excitable — turns a survival problem into a very long story.',
    'A chatty insect with a big heart, a bigger imagination, and a talent for finding the funny side of danger.'],

  ['shera', 'nf_adora', 'Adora', 'sword', 'Courageous — lifts the sword and the whole room with it.',
    'A young rebel with a starry crown and a glowing blade, still learning that leadership is more than a speech.'],
  ['shera', 'nf_catra', 'Catra', 'claws', 'Sharp — keeps a soft spot carefully hidden under a smirk.',
    'A feline strategist with a sly grin, quick claws, and a loyalty that insists it does not need anyone.'],
  ['shera', 'nf_bow', 'Bow', 'arrows', 'Heart-first — brings a bow, a quiver, and an emotional support speech.',
    'An archer with a bright heart, a well-kept bow, and a tendency to make friends out of enemies.'],

  ['dragonprince', 'nf_callum', 'Callum', 'rune', 'Studious — draws the sky until it answers.',
    'A young mage with a sketchbook, a primal rune, and a stubborn belief that magic is a conversation.'],
  ['dragonprince', 'nf_rayla', 'Rayla', 'blades', 'Swift — moves like a rumor and lands like a promise.',
    'An elven warrior with bound blades, a quick step, and a sense of honour that keeps getting tested.'],
  ['dragonprince', 'nf_ezran', 'Ezran', 'crown', 'Kind — would rather negotiate with the dragon than slay it.',
    'A young prince with a small crown, a large heart, and an ability to hear the other side of the story.'],

  ['carmen', 'nf_player', 'Player', 'headset', 'Connected — turns a hunch into a map in thirty seconds.',
    'A brilliant support operative with a headset, a wall of screens, and a plan for every border.'],
  ['carmen', 'nf_ivy', 'Ivy', 'toolkit', 'Inventive — fixes the getaway and improves the soundtrack.',
    'A mechanic and strategist with a toolkit, a bright jacket, and a strong opinion about good escapes.'],
  ['carmen', 'nf_zack', 'Zack', 'ladder', 'Eager — brings the ladder and a very literal reading of the plan.',
    'A loyal accomplice with a big smile, a heavy ladder, and more enthusiasm than any caper strictly needs.'],

  ['voltron', 'nf_shiro', 'Shiro', 'lion', 'Steady — keeps the team steady when the stars move.',
    'A calm pilot with a leadership bearing, a strong right arm, and a talent for keeping five plans aligned.'],
  ['voltron', 'nf_keith', 'Keith', 'blade', 'Instinctive — flies first and files the report later.',
    'A hotshot pilot with dark hair, a sharp blade, and a habit of trusting the route nobody else can see.'],
  ['voltron', 'nf_pidge', 'Pidge', 'scanner', 'Analytical — finds the weak signal in a galaxy of noise.',
    'A small pilot with a big screen, a green uniform, and a talent for making machines tell secrets.'],

  ['trollhunters', 'nf_jim', 'Jim Lake Jr.', 'amulet', 'Reluctant — has a magical destiny and an unfinished essay.',
    'A small-town student with a glowing amulet, a secret underground world, and an after-school apocalypse.'],
  ['trollhunters', 'nf_claire', 'Claire Nuñez', 'shadow', 'Resourceful — steps through a shadow and returns with a plan.',
    'A clever friend with a dark ponytail, a staff, and a talent for making impossible shortcuts.'],
  ['trollhunters', 'nf_toby', 'Toby Domzalski', 'hammer', 'Loyal — brings a warhammer and a pep talk.',
    'A cheerful friend with a bike helmet, a heavy hammer, and a refusal to let anyone face a troll alone.'],

  ['cuphead', 'nf_cuphead', 'Cuphead', 'straw', 'Restless — turns a small errand into a full musical number.',
    'A rubber-hose cup with white gloves, a red straw, and a talent for finding trouble in three-part harmony.'],
  ['cuphead', 'nf_mugman', 'Mugman', 'shield', 'Cautious — has the plan and the bandage ready.',
    'A kind-hearted mug with a blue straw and a sensible streak that lasts almost until the next dance break.'],
  ['cuphead', 'nf_chalice', 'Ms. Chalice', 'dice', 'Showstopper — arrives with a flourish and leaves with the scene.',
    'A charming dancer with a golden cup, a quick step, and a smile that has never once lost a bet.'],

  ['sonicprime', 'nf_nine', 'Nine', 'tails', 'Independent — builds a world with two tails and no permission.',
    'A sharp-eyed fox with extra tails and a shattered-world workshop, trusting tools more than people.'],
  ['sonicprime', 'nf_rusty', 'Rusty Rose', 'arm', 'Determined — keeps fighting after the odds have left.',
    'A pink hedgehog with a cybernetic edge, a stubborn stance, and a refusal to be anyone’s backup.'],
  ['sonicprime', 'nf_dread', 'Dread', 'cutlass', 'Salty — tells a tall tale and then tries to live up to it.',
    'A pirate captain with a weathered coat, a curved cutlass, and a crew that is mostly one very loud parrot.'],
];

const NETFLIX_SPECIES = [];
const NETFLIX_BY_WING = { anime: [], toons: [] };
const NETFLIX_BY_SHOW = {};
NETFLIX_SHOW_ORDER.forEach((show) => { NETFLIX_BY_SHOW[show] = []; });

NETFLIX_DEFS.forEach(([showKey, key, name, art, trait, article], index) => {
  const show = NETFLIX_SHOWS[showKey];
  if (!show || ELEMENTS[key]) return;
  const basePrice = show.price + (index % 3) * 5;
  ELEMENTS[key] = {
    name, primary: show.primary, light: show.light, deep: show.deep, accent: show.accent,
    trait,
    blurb: `${show.blurb} ${name} is one of the three ${show.label} signatures in the Netflix animation wing.`,
    greeting: show.greetings[index % show.greetings.length],
    likes: show.likes,
    parentTypes: ['TV Legends', show.label],
    netflix: true,
    netflixWing: show.wing,
    netflixShow: show.label,
    netflixShowKey: showKey,
    netflixArt: art,
    netflixArticle: article,
    catalogType: `Netflix · ${show.label}`,
  };
  GENE_POWERS[key] = {
    name: show.gene[0], icon: show.gene[1], desc: show.gene[2], effect: show.gene[3],
  };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = basePrice;
  TYPE_EGG_PRICE[key] = discountedEggPrice(basePrice);
  if (ELEMENTS[show.partner]) HYBRID_NAMES[pairKey(key, show.partner)] = `${name} ${show.suffix}`;
  NAME_START[key] = [...new Set([
    name.replace(/[“”"']/g, '').split(' ')[0],
    'Netflix', show.label.split(' ')[0], 'Screen',
  ])];
  [...new Set([...show.homes])].forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  NETFLIX_SPECIES.push(key);
  NETFLIX_BY_WING[show.wing].push(key);
  NETFLIX_BY_SHOW[showKey].push(key);
});

ELEMENT_KEYS.push(...NETFLIX_SPECIES);
const NETFLIX_TOTAL = NETFLIX_SPECIES.length;
const NETFLIX_WING_COUNTS = {
  anime: NETFLIX_BY_WING.anime.length,
  toons: NETFLIX_BY_WING.toons.length,
};
const TV_FAMILY_TOTAL = TV_LEGACY_TOTAL + NETFLIX_TOTAL;
