/* American Horror Story wave: characters from every season with original vector art,
   genes, Titans, egg prices, habitats, and named hybrids. */

const AHS_SPECIES = {
  tate: {
    name: 'Tate Langdon', primary: '#8f97a8', light: '#dfe6f2', deep: '#262c3a', accent: '#ff7597',
    trait: 'Haunted — stands a little too close and remembers everything.', likes: 'Cherry Cola',
    blurb: 'A soft-spoken ghost in a plaid shirt who drifts through the Murder House and never quite leaves.',
    greeting: 'You came back. Nobody comes back.',
  },
  violet: {
    name: 'Violet Harmon', primary: '#b69cff', light: '#f0e6ff', deep: '#3d2a6b', accent: '#8be9ff',
    trait: 'Wry — narrates her own haunting like a diary entry.', likes: 'Star Cookie',
    blurb: 'A sharp, lonely teenager with headphones, a sketchbook, and a room she cannot seem to leave.',
    greeting: 'This house is weird. I am choosing to be fine with it.',
  },
  constance: {
    name: 'Constance Langdon', primary: '#e8c07a', light: '#fff2d2', deep: '#6b4a12', accent: '#c94f5c',
    trait: 'Commanding — runs the neighborhood with a cigarette and a stare.', likes: 'Sweet Tea',
    blurb: 'A steel-spined matriarch in pearls who knows every secret on the block and enjoys all of them.',
    greeting: 'Stand up straight. The neighbors are watching.',
  },
  rubberman: {
    name: 'Rubber Man', primary: '#3d3d4a', light: '#8f8fa8', deep: '#14141c', accent: '#ff7597',
    trait: 'Silent — enters without a sound and leaves the door open.', likes: 'Warm Milk',
    blurb: 'A figure in black latex who never speaks, never hurries, and always knows the floor plan.',
    greeting: '...',
  },
  moira: {
    name: 'Moira O’Hara', primary: '#c94f5c', light: '#ffd9dd', deep: '#4a1018', accent: '#e8c07a',
    trait: 'Two-sided — everyone sees a different version of her.', likes: 'Warm Tea',
    blurb: 'A housekeeper trapped between what she was and what the house decided she should be.',
    greeting: 'The floors are done. Do not ask about the basement.',
  },
  addie: {
    name: 'Addie Langdon', primary: '#8fe07a', light: '#eaffd6', deep: '#2a5a1e', accent: '#ffd166',
    trait: 'Fearless — wants to be a pretty girl and see the world.', likes: 'Candy Apple',
    blurb: 'A bright, stubborn child who slips out the door every chance she gets to meet the neighbors.',
    greeting: 'Pretty girl! I am going outside now.',
  },
  sisterjude: {
    name: 'Sister Jude', primary: '#5b6b8a', light: '#dbe4f5', deep: '#1f2a42', accent: '#ffd166',
    trait: 'Unbending — rules first, mercy later, questions never.', likes: 'Warm Tea',
    blurb: 'A cigarette-smoking nun who runs Briarcliff with an iron rosary and a very loud voice.',
    greeting: 'Lights out. That means now.',
  },
  kit: {
    name: 'Kit Walker', primary: '#8f6b4a', light: '#f2dcc2', deep: '#3d2612', accent: '#8be9ff',
    trait: 'Steady — keeps his head when everyone else loses theirs.', likes: 'Apple Pie',
    blurb: 'A gentle handyman with a radio voice and a talent for surviving things he should not.',
    greeting: 'I did not do it. But I will help anyway.',
  },
  lana: {
    name: 'Lana Winters', primary: '#c9a6ff', light: '#f4e9ff', deep: '#3a2050', accent: '#ffd166',
    trait: 'Relentless — a story is a door and she always finds the hinge.', likes: 'Milk Tea',
    blurb: 'An investigative journalist with a tape recorder, a sharp pen, and absolutely no quit.',
    greeting: 'Start talking. I have all night and a deadline.',
  },
  arden: {
    name: 'Dr. Arthur Arden', primary: '#7a8f5a', light: '#e6f0d2', deep: '#2a3a1a', accent: '#c94f5c',
    trait: 'Clinical — calls every horror an experiment.', likes: 'Ember Steak',
    blurb: 'A surgeon in a bloodstained coat who treats the asylum as a laboratory with no oversight.',
    greeting: 'Fascinating. Hold still.',
  },
  bloodyface: {
    name: 'Bloody Face', primary: '#c94f5c', light: '#ffd9dd', deep: '#3a0d12', accent: '#d9d9d9',
    trait: 'Masked — a stitched face and a very bad temper.', likes: 'Ember Steak',
    blurb: 'A killer wearing a sewn mask of skin who turns every hallway into a dead end.',
    greeting: 'You should not have opened that door.',
  },
  maryeunice: {
    name: 'Sister Mary Eunice', primary: '#8be9ff', light: '#e6fbff', deep: '#24506b', accent: '#c94f5c',
    trait: 'Split — sweet as sugar one moment, something else the next.', likes: 'Candyfloss',
    blurb: 'A quiet novice whose voice changes halfway through a sentence and whose eyes never quite settle.',
    greeting: 'Bless you. Bless you. Bless you.',
  },
  pepper: {
    name: 'Pepper', primary: '#e8b07a', light: '#ffe8cc', deep: '#6b3a12', accent: '#8fe07a',
    trait: 'Loyal — loves hard, remembers everything, forgives almost.', likes: 'Trail Mix',
    blurb: 'A pinhead with a huge heart who keeps the troupe together and knows every secret in the camp.',
    greeting: 'Pepper! Pepper knows. Pepper saw.',
  },
  fiona: {
    name: 'Fiona Goode', primary: '#2f3442', light: '#c9a6ff', deep: '#0d0d16', accent: '#ffd166',
    trait: 'Supreme — wears black and expects the room to agree.', likes: 'Berry Fizz',
    blurb: 'The reigning Supreme of the Coven: elegant, ruthless, and terrified of getting old.',
    greeting: 'I am the Supreme. Do keep up.',
  },
  cordelia: {
    name: 'Cordelia Goode', primary: '#ffd166', light: '#fff7d6', deep: '#6b4a00', accent: '#8fe07a',
    trait: 'Visionary — sees what others refuse to.', likes: 'Sun Nectar',
    blurb: 'A gentle headmistress whose second sight turns the Coven into a place that actually protects people.',
    greeting: 'Close your eyes. Now tell me what you see.',
  },
  marie: {
    name: 'Marie Laveau', primary: '#b69cff', light: '#f0e9ff', deep: '#241040', accent: '#ffd166',
    trait: 'Undying — has been here longer than the city remembers.', likes: 'Moon Berry',
    blurb: 'The immortal voodoo queen of New Orleans, owner of a salon and a very long memory.',
    greeting: 'You want a reading? Sit. Do not touch the candles.',
  },
  myrtle: {
    name: 'Myrtle Snow', primary: '#ff7ac8', light: '#ffe6f4', deep: '#5a1a3a', accent: '#ffd166',
    trait: 'Flamboyant — critiques your outfit before your decisions.', likes: 'Honeycomb Cake',
    blurb: 'A red-haired witch with enormous glasses, a sharper tongue, and impeccable taste in revenge.',
    greeting: 'Darling, that color is a war crime.',
  },
  madison: {
    name: 'Madison Montgomery', primary: '#ff9ec7', light: '#ffe6f4', deep: '#5a1a3a', accent: '#8be9ff',
    trait: 'Bratty — famous, telekinetic, and fully aware of both.', likes: 'Star Pop',
    blurb: 'A movie-star witch with a cigarette, a phone, and a talent for flicking people across rooms.',
    greeting: 'Do not touch me. Also, do not look at me.',
  },
  misty: {
    name: 'Misty Day', primary: '#8fe07a', light: '#eaffd6', deep: '#2a5a1e', accent: '#ff7ac8',
    trait: 'Gentle — heals everything she touches except her own timing.', likes: 'Lemonade',
    blurb: 'A swamp-loving witch in a Stevie Nicks shawl who brings things back to life and dances to her own tape.',
    greeting: 'Everything deserves another chance. Even this.',
  },
  queenie: {
    name: 'Queenie', primary: '#e8b07a', light: '#ffe8cc', deep: '#5a3418', accent: '#b69cff',
    trait: 'Unshakable — has survived more than anyone gives her credit for.', likes: 'Butter Potato',
    blurb: 'A witch with a human voodoo doll gift and a fully functioning sense of right and wrong.',
    greeting: 'You think that hurts? Try again.',
  },
  kyle: {
    name: 'Kyle Spencer', primary: '#8f97a8', light: '#e3e8f2', deep: '#2f3442', accent: '#8fe07a',
    trait: 'Rebuilt — quiet, kind, and stitched back together.', likes: 'Trail Mix',
    blurb: 'A college kid with a terrible scar and a loyalty that outlasts everything that happened to him.',
    greeting: 'I am still here. That counts.',
  },
  elsamars: {
    name: 'Elsa Mars', primary: '#b69cff', light: '#efe4ff', deep: '#33204a', accent: '#ffd166',
    trait: 'Showman — the spotlight is a survival skill.', likes: 'Berry Fizz',
    blurb: 'The glittering, wounded ringmistress of a traveling freak show with a German accent and a dream.',
    greeting: 'Ladies and gentlemen, the show must go on.',
  },
  twisty: {
    name: 'Twisty the Clown', primary: '#c94f5c', light: '#ffd9dd', deep: '#3a0d12', accent: '#ffd166',
    trait: 'Silent — a painted grin and a bag of very bad props.', likes: 'Candyfloss',
    blurb: 'A mute clown with a flower on his chest, a mask over his mouth, and a taste for balloons.',
    greeting: '... a balloon? Go on. Take it.',
  },
  dandy: {
    name: 'Dandy Mott', primary: '#8be9ff', light: '#e6fbff', deep: '#24506b', accent: '#c94f5c',
    trait: 'Spoiled — a velvet blazer and absolutely no limits.', likes: 'Honeycomb Cake',
    blurb: 'A bored heir with a boat, a tantrum, and a hobby nobody should encourage.',
    greeting: 'I want that. Get me that. Now.',
  },
  jimmy: {
    name: 'Jimmy Darling', primary: '#8f6b4a', light: '#f2dcc2', deep: '#3d2612', accent: '#c9a6ff',
    trait: 'Charming — lobsterman hands and a soft heart.', likes: 'Apple Pie',
    blurb: 'The troupe’s favorite showman, born with clawed hands and a talent for making people feel welcome.',
    greeting: 'Come on in. Everyone gets a seat.',
  },
  countess: {
    name: 'The Countess', primary: '#f2e6ff', light: '#ffffff', deep: '#4a2050', accent: '#c94f5c',
    trait: 'Ageless — always the most interesting person in the room.', likes: 'Berry Fizz',
    blurb: 'The platinum-haired owner of the Hotel Cortez, with a silver glove and a taste for the eternal.',
    greeting: 'Darling, you look delicious.',
  },
  march: {
    name: 'James Patrick March', primary: '#5b4b3a', light: '#e8dcc2', deep: '#241a10', accent: '#c94f5c',
    trait: 'Theatrical — commits to a bit and to a body count.', likes: 'Ember Steak',
    blurb: 'The hotel’s original owner: a meticulous architect with a mustache and a maze of secret rooms.',
    greeting: 'The walls are thicker than they look. Do enjoy your stay.',
  },
  liztaylor: {
    name: 'Liz Taylor', primary: '#ff9f43', light: '#ffe6cc', deep: '#6b3a00', accent: '#b69cff',
    trait: 'Glamorous — the bar is her stage and she owns it.', likes: 'Milk Tea',
    blurb: 'The Cortez bartender with a caftan, a sharp joke, and the best advice in the building.',
    greeting: 'Sit. Tell me everything. Order something expensive.',
  },
  sally: {
    name: 'Hypodermic Sally', primary: '#8f97a8', light: '#e3e8f2', deep: '#22222e', accent: '#ff7ac8',
    trait: 'Clipped — tells the truth like it is a weapon.', likes: 'Lemonade',
    blurb: 'A ghost in a fur vest who types people’s secrets into a hotel computer and enjoys the fallout.',
    greeting: 'I know what you did. I always know.',
  },
  butcher: {
    name: 'The Butcher', primary: '#7a5a3a', light: '#e8d2b0', deep: '#2a1a0a', accent: '#c94f5c',
    trait: 'Ruthless — the woods belong to her, and so do you.', likes: 'Ember Steak',
    blurb: 'A colonial matriarch with a cleaver who leads a dead colony and knows every tree by name.',
    greeting: 'You are trespassing. Kneel.',
  },
  scathach: {
    name: 'Scáthach', primary: '#5b4b6b', light: '#d8cce8', deep: '#1a1024', accent: '#8fe07a',
    trait: 'Ancient — older than the colony and far less forgiving.', likes: 'Moon Berry',
    blurb: 'The original witch of Roanoke, a figure of wood and whispers who taught the first Supreme.',
    greeting: 'The forest remembers you. So do I.',
  },
  kai: {
    name: 'Kai Anderson', primary: '#ff3b57', light: '#ffd9dd', deep: '#3a0a10', accent: '#8be9ff',
    trait: 'Manic — turns a bad week into a movement.', likes: 'Ember Steak',
    blurb: 'A charismatic, blue-haired cult leader with a smile that never reaches his eyes.',
    greeting: 'We are going to fix this city. Starting with you.',
  },
  ally: {
    name: 'Ally Mayfair-Richards', primary: '#8be9ff', light: '#e6fbff', deep: '#1f4a5a', accent: '#ff3b57',
    trait: 'Fraying — sees every threat twice.', likes: 'Warm Tea',
    blurb: 'A restaurant owner whose fears turn out to be the most reasonable thing in the room.',
    greeting: 'I am not paranoid. I am early.',
  },
  michael: {
    name: 'Michael Langdon', primary: '#e8c07a', light: '#fff7d6', deep: '#3a2a00', accent: '#c94f5c',
    trait: 'Inevitable — arrives like a verdict.', likes: 'Star Pop',
    blurb: 'The long-haired Antichrist in a black coat, calm as a closing door.',
    greeting: 'I am here to take you home. All of you.',
  },
  mallory: {
    name: 'Mallory', primary: '#ffd166', light: '#fff7d6', deep: '#6b4a00', accent: '#8be9ff',
    trait: 'Radiant — quietly the most powerful person in the room.', likes: 'Sun Nectar',
    blurb: 'A kind witch with a healing touch and a destiny that rewrites the whole timeline.',
    greeting: 'Let me help. I am stronger than I look.',
  },
  dinah: {
    name: 'Dinah Stevens', primary: '#b69cff', light: '#f0e9ff', deep: '#2a1040', accent: '#ffd166',
    trait: 'Pragmatic — a talk show and a spellbook, both sharp.', likes: 'Milk Tea',
    blurb: 'A television host and voodoo practitioner who survives every apocalypse with good lighting.',
    greeting: 'We are live in five. Fix your hair.',
  },
  brooke: {
    name: 'Brooke Thompson', primary: '#8fe07a', light: '#eaffd6', deep: '#2a5a1e', accent: '#c94f5c',
    trait: 'Survivor — keeps running, keeps planning.', likes: 'Trail Mix',
    blurb: 'A quiet athlete at Camp Redwood who turns out to be the hardest person there to kill.',
    greeting: 'We should not be here. But we are. So: plan.',
  },
  jingles: {
    name: 'Mr. Jingles', primary: '#8f97a8', light: '#e3e8f2', deep: '#1f2430', accent: '#ffd166',
    trait: 'Haunted — a whistle in the dark and a very long grudge.', likes: 'Warm Milk',
    blurb: 'A camp janitor with a key ring and a legend that outgrew the man who started it.',
    greeting: 'Do you hear that? That is me.',
  },
  montana: {
    name: 'Montana Duke', primary: '#ff7ac8', light: '#ffe6f4', deep: '#5a1a3a', accent: '#8be9ff',
    trait: 'Wild — a party that never got the memo.', likes: 'Berry Fizz',
    blurb: 'Aerobics-obsessed ghost with big hair, a bigger attitude, and a plan for everyone.',
    greeting: 'This camp is a total snore. Let us fix that.',
  },
  karen: {
    name: 'Karen Tuberculosis', primary: '#c9a6ff', light: '#f4e9ff', deep: '#3a2050', accent: '#c94f5c',
    trait: 'Feral — lives by the beach and answers to no one.', likes: 'Canned Beans',
    blurb: 'A gravel-voiced beach dweller with a loyal dog, a sharp knife, and a soft spot for outcasts.',
    greeting: 'You brought food? Then you can stay.',
  },
  tuberose: {
    name: 'Tuberose', primary: '#8be9ff', light: '#e6fbff', deep: '#1f4a5a', accent: '#ff7ac8',
    trait: 'Radiant — a mystery with excellent hair.', likes: 'Moon Berry',
    blurb: 'The pale, glamorous writer who arrives in Provincetown with a typewriter and a secret.',
    greeting: 'I write about hunger. Would you like to read it?',
  },
};

const AHS_GENES = {
  tate: ['Poltergeist', '👻', 'Haunted bond: +8% XP and gifts arrive sooner.', { xp: 1.08, giftSpeed: 1.1 }],
  violet: ['Diary Voice', '📓', 'XP +10% while the Hollow is dark.', { xp: 1.1 }],
  constance: ['Matriarch', '💎', 'Coins +15% from every finished activity.', { coins: 1.15 }],
  rubberman: ['Latex Silence', '🖤', 'Needs fade 15% slower.', { needSlow: 0.85 }],
  moira: ['Two Faces', '🪞', 'Gifts arrive 15% sooner.', { giftSpeed: 1.15 }],
  addie: ['Bright Eyes', '🌼', 'Joy gains +10%.', { joy: 1.1 }],
  sisterjude: ['Iron Rosary', '📿', 'Bond gains +12%.', { bond: 1.12 }],
  kit: ['Radio Hands', '📻', 'XP +9% and +6 coins per game.', { xp: 1.09, gameCoins: 6 }],
  lana: ['Deadline', '🎙️', 'XP +12% from chats and tasks.', { xp: 1.12 }],
  arden: ['Experiment', '🧪', 'Feeds give +15% more XP.', { xp: 1.15 }],
  bloodyface: ['Stitched Mask', '🎭', 'Game coins +20%.', { gameCoins: 20 }],
  maryeunice: ['Split Choir', '😇', 'XP +10%, bond +10%.', { xp: 1.1, bond: 1.1 }],
  pepper: ['Big Heart', '🫶', 'Bond gains +18%.', { bond: 1.18 }],
  fiona: ['Supreme', '👑', 'XP +18% and coins +10%.', { xp: 1.18, coins: 1.1 }],
  cordelia: ['Second Sight', '🔮', 'Gifts arrive 20% sooner.', { giftSpeed: 1.2 }],
  marie: ['Undying', '🕯️', 'Needs fade 20% slower.', { needSlow: 0.8 }],
  myrtle: ['Impeccable Taste', '🕶️', 'Coins +18%.', { coins: 1.18 }],
  madison: ['Telekinetic', '💅', 'XP +14%, but joy fades a little faster.', { xp: 1.14 }],
  misty: ['Resurrection', '🌿', 'Heals needs faster: +12% joy on care.', { joy: 1.12 }],
  queenie: ['Voodoo Doll', '🧸', 'Bond +15% and +8 coins per game.', { bond: 1.15, gameCoins: 8 }],
  kyle: ['Rebuilt', '🧵', 'Needs fade 12% slower.', { needSlow: 0.88 }],
  elsamars: ['Spotlight', '🎪', 'XP +16% while a holiday is active.', { xp: 1.16 }],
  twisty: ['Balloon Animal', '🎈', 'Snacks give +20% XP.', { xp: 1.2 }],
  dandy: ['Heir', '🥂', 'Coins +25% from check-ins.', { coins: 1.25 }],
  jimmy: ['Claw Hands', '🦞', 'Bond +12% and +10 coins per game.', { bond: 1.12, gameCoins: 10 }],
  countess: ['Ageless', '🩸', 'Needs fade 25% slower.', { needSlow: 0.75 }],
  march: ['Architect', '🗝️', 'XP +15% from tasks.', { xp: 1.15 }],
  liztaylor: ['Bartender', '🍸', 'Chats pay double coins.', { chatCoins: 2 }],
  sally: ['Clipped', '💉', 'Gifts arrive 18% sooner.', { giftSpeed: 1.18 }],
  butcher: ['Colony Knife', '🔪', 'Game coins +25%.', { gameCoins: 25 }],
  scathach: ['First Witch', '🌲', 'XP +20% in night habitats.', { xp: 1.2 }],
  kai: ['Cult Leader', '🔴', 'XP +15%; bond gains +8%.', { xp: 1.15, bond: 1.08 }],
  ally: ['Early', '😰', 'Needs fade 15% slower.', { needSlow: 0.85 }],
  michael: ['Inevitable', '🕳️', 'XP +22% while it rains.', { xp: 1.22 }],
  mallory: ['Rewrite', '🕊️', 'Gifts arrive 22% sooner.', { giftSpeed: 1.22 }],
  dinah: ['Live in Five', '📺', 'Coins +20% from games.', { coins: 1.2, gameCoins: 10 }],
  brooke: ['Survivor', '🏃', 'Trail walks pay +20% coins.', { coins: 1.2 }],
  jingles: ['Whistle', '🎵', 'XP +12% at night.', { xp: 1.12 }],
  montana: ['Aerobics', '🎉', 'Joy +15% and bond +8%.', { joy: 1.15, bond: 1.08 }],
  karen: ['Beach Feral', '🐕', 'Feeds cost 15% less.', { feedDiscount: 0.15 }],
  tuberose: ['Typewriter', '⌨️', 'Chats give +20% XP.', { xp: 1.2 }],
};

const AHS_TITANS = {
  tate: 'Murder House Titan', violet: 'Diary Titan', constance: 'Pearl Titan',
  rubberman: 'Latex Titan', moira: 'Mirror Titan', addie: 'Pretty Girl Titan',
  sisterjude: 'Rosary Titan', kit: 'Radio Titan', lana: 'Deadline Titan',
  arden: 'Asylum Titan', bloodyface: 'Stitched Titan', maryeunice: 'Choir Titan',
  pepper: 'Pinhead Titan', fiona: 'Supreme Titan', cordelia: 'Sight Titan',
  marie: 'Voodoo Titan', myrtle: 'Sunglasses Titan', madison: 'Telekinetic Titan',
  misty: 'Swamp Titan', queenie: 'Doll Titan', kyle: 'Stitched Boy Titan',
  elsamars: 'Freak Show Titan', twisty: 'Balloon Titan', dandy: 'Velvet Titan',
  jimmy: 'Lobster Titan', countess: 'Cortez Titan', march: 'Hotel Titan',
  liztaylor: 'Bar Titan', sally: 'Hypodermic Titan', butcher: 'Roanoke Titan',
  scathach: 'First Witch Titan', kai: 'Cult Titan', ally: 'Paranoia Titan',
  michael: 'Apocalypse Titan', mallory: 'Timeline Titan', dinah: 'Broadcast Titan',
  brooke: 'Redwood Titan', jingles: 'Camp Titan', montana: 'Aerobic Titan',
  karen: 'Provincetown Titan', tuberose: 'Writer Titan',
};

const AHS_PRICES = {
  tate: 180, violet: 170, constance: 190, rubberman: 200, moira: 165, addie: 150,
  sisterjude: 195, kit: 175, lana: 185, arden: 190, bloodyface: 220, maryeunice: 205,
  pepper: 160, fiona: 240, cordelia: 230, marie: 235, myrtle: 210, madison: 215,
  misty: 200, queenie: 205, kyle: 165, elsamars: 225, twisty: 230, dandy: 220,
  jimmy: 180, countess: 250, march: 235, liztaylor: 195, sally: 200, butcher: 225,
  scathach: 245, kai: 215, ally: 190, michael: 260, mallory: 240, dinah: 205,
  brooke: 175, jingles: 210, montana: 195, karen: 185, tuberose: 200,
};

const AHS_HOMES = {
  tate: ['night', 'dream'], violet: ['night', 'starlit'], constance: ['grove', 'night'],
  rubberman: ['night', 'ember'], moira: ['night', 'grove'], addie: ['grove', 'sugar'],
  sisterjude: ['night', 'starlit'], kit: ['grove', 'savanna'], lana: ['night', 'cybergrid'],
  arden: ['mycelium', 'night'], bloodyface: ['ember', 'night'], maryeunice: ['starlit', 'night'],
  pepper: ['grove', 'sugar'], fiona: ['night', 'lanternbay'], cordelia: ['starlit', 'sakura'],
  marie: ['lanternbay', 'night'], myrtle: ['sakura', 'sugar'], madison: ['neon', 'night'],
  misty: ['mycelium', 'grove'], queenie: ['lanternbay', 'grove'], kyle: ['grove', 'night'],
  elsamars: ['lanternbay', 'neon'], twisty: ['neon', 'night'], dandy: ['sugar', 'night'],
  jimmy: ['lanternbay', 'grove'], countess: ['night', 'starlit'], march: ['night', 'sunken'],
  liztaylor: ['neon', 'night'], sally: ['cybergrid', 'night'], butcher: ['mycelium', 'night'],
  scathach: ['mycelium', 'starlit'], kai: ['neon', 'cybergrid'], ally: ['grove', 'night'],
  michael: ['starlit', 'night'], mallory: ['starlit', 'sakura'], dinah: ['lanternbay', 'neon'],
  brooke: ['grove', 'mycelium'], jingles: ['night', 'mycelium'], montana: ['neon', 'sugar'],
  karen: ['tide', 'night'], tuberose: ['tide', 'starlit'],
};

/* One named hybrid per pair, so the breeding codex stays populated. */
const AHS_HYBRIDS = {
  'tate+violet': 'Murder House Pair',
  'constance+addie': 'Langdon Line',
  'sisterjude+maryeunice': 'Briarcliff Choir',
  'kit+lana': 'Asylum Story',
  'arden+bloodyface': 'Bad Medicine',
  'fiona+cordelia': 'Two Supremes',
  'marie+queenie': 'Voodoo Court',
  'myrtle+madison': 'Sunglasses & Sass',
  'misty+kyle': 'Swamp Revival',
  'elsamars+pepper': 'Freak Show Family',
  'twisty+dandy': 'Bad Balloon',
  'jimmy+elsamars': 'Troupe Bound',
  'countess+march': 'Hotel Cortez',
  'liztaylor+sally': 'Bar Secrets',
  'butcher+scathach': 'Roanoke Colony',
  'kai+ally': 'Cult Panic',
  'michael+mallory': 'Rewritten End',
  'dinah+michael': 'Broadcast Doom',
  'brooke+jingles': 'Camp Redwood',
  'montana+brooke': 'Aerobic Survivors',
  'karen+tuberose': 'Provincetown',
  'rubberman+tate': 'Silent House',
  'moira+constance': 'Upstairs, Downstairs',
  'violet+madison': 'Dead Famous',
};

Object.entries(AHS_SPECIES).forEach(([key, meta]) => {
  const gene = AHS_GENES[key] || ['Season Regular', '🎬', 'XP +10%.', { xp: 1.1 }];
  ELEMENTS[key] = {
    name: meta.name,
    primary: meta.primary,
    light: meta.light,
    deep: meta.deep,
    accent: meta.accent,
    trait: meta.trait,
    blurb: meta.blurb,
    greeting: meta.greeting,
    likes: meta.likes,
    ahs: true,
  };
  GENE_POWERS[key] = { name: gene[0], icon: gene[1], desc: gene[2], effect: gene[3] };
  TITAN_NAMES[key] = AHS_TITANS[key] || `${meta.name} Titan`;
  NAME_START[key] = [meta.name.split(' ')[0], 'Hollow', 'Season', 'Screen', 'Dread', 'Velvet'];
  TYPE_EGG_BASE_PRICE[key] = AHS_PRICES[key] || 180;
  TYPE_EGG_PRICE[key] = discountedEggPrice(TYPE_EGG_BASE_PRICE[key]);
  (AHS_HOMES[key] || ['night']).forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
});

Object.assign(HYBRID_NAMES, AHS_HYBRIDS);

const AHS_KEYS = Object.keys(AHS_SPECIES);
ELEMENT_KEYS.push(...AHS_KEYS);
AHS_KEYS.forEach((key) => {
  if (typeof TYPE_EGG_SPECIES !== 'undefined' && !TYPE_EGG_SPECIES.includes(key)) TYPE_EGG_SPECIES.push(key);
  if (typeof WILD_SPECIES !== 'undefined' && !WILD_SPECIES.includes(key)) WILD_SPECIES.push(key);
});
