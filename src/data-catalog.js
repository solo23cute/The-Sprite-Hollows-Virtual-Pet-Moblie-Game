/* The big cross-media catalog: cartoons, comics, animated films, game genres,
   regional type variants, and the Shortcut signature. Every entry is an
   original procedural sprite; names are used only for identification. */

const CATALOG_GROUPS = {
  pbs: {
    label: 'PBS Kids', icon: '📺', guide: 'cartoonworlds', parentType: 'PBS Kids',
    accent: '#5a9eff', price: 155, likes: 'Star Cookie', homes: ['sugar', 'grove', 'dream'],
    blurb: 'A bright public-television friend with a storybook heart and a pocket full of curiosity.',
    greeting: 'There is always time for one more story.',
    hybridPrefix: 'PBS',
    motifs: ['book', 'note', 'paw', 'star', 'key', 'clock', 'leaf', 'heart'],
  },
  monsterjam: {
    label: 'Monster Jam', icon: '🏟️', guide: 'cartoonworlds', parentType: 'Monster Jam',
    accent: '#ff8a3a', price: 170, likes: 'Ember Steak', homes: ['ember', 'crystal', 'savanna'],
    blurb: 'A roaring arena machine with oversized wheels, a loud engine, and a softer heart than expected.',
    greeting: 'Start your engines. The snack stand is open.',
    hybridPrefix: 'Arena',
    motifs: ['flame', 'bolt', 'gear', 'skull', 'star', 'shield', 'rocket', 'paw'],
  },
  nick: {
    label: 'Nickelodeon', icon: '🧩', guide: 'cartoonworlds', parentType: 'Nickelodeon',
    accent: '#ff7a3c', price: 165, likes: 'Star Pop', homes: ['neon', 'sugar', 'grove'],
    blurb: 'A bright, chaotic cartoon friend from the golden age of channel-surfing.',
    greeting: 'Do not touch that dial. I am about to do something funny.',
    hybridPrefix: 'Nick',
    motifs: ['star', 'monster', 'note', 'mask', 'heart', 'fish', 'paw', 'sparkle'],
  },
  nickjr: {
    label: 'Nick Jr.', icon: '🟧', guide: 'cartoonworlds', parentType: 'Nick Jr.',
    accent: '#ffb347', price: 150, likes: 'Honeycomb Cake', homes: ['sugar', 'tide', 'grove'],
    blurb: 'A preschool pal with a puzzle-solving spirit and a song for every little victory.',
    greeting: 'We can solve it together. First, a little wiggle.',
    hybridPrefix: 'Junior',
    motifs: ['paw', 'star', 'fish', 'note', 'heart', 'key', 'leaf', 'shell'],
  },
  nicktoons: {
    label: 'Nicktoons', icon: '📐', guide: 'cartoonworlds', parentType: 'Nicktoons',
    accent: '#8be9ff', price: 175, likes: 'Moon Cake', homes: ['neon', 'dream', 'night'],
    blurb: 'A strange and wonderful Nicktoon with a dramatic destiny and excellent hair.',
    greeting: 'My training arc starts after this nap.',
    hybridPrefix: 'Toon',
    motifs: ['flame', 'wing', 'eye', 'claw', 'mask', 'storm', 'moon', 'sparkle'],
  },
  discovery: {
    label: 'Discovery Kids & Family', icon: '🌎', guide: 'cartoonworlds', parentType: 'Discovery Kids & Family',
    accent: '#8fe07a', price: 160, likes: 'Trail Mix', homes: ['savanna', 'tide', 'aurora', 'grove'],
    blurb: 'A field-guide adventurer who turns every trail, tide, and backyard into a discovery.',
    greeting: 'Look at that track. We are definitely following it.',
    hybridPrefix: 'Discovery',
    motifs: ['paw', 'leaf', 'fish', 'rocket', 'compass', 'eye', 'star', 'storm'],
  },
  toonmovies: {
    label: 'Animated movies', icon: '🎬', guide: 'cartoonworlds', parentType: 'Animated movies',
    accent: '#b69cff', price: 185, likes: 'Cloud Feast', homes: ['dream', 'aurora', 'grove'],
    blurb: 'A big-screen animated character with a sweeping theme song and a lesson learned just in time.',
    greeting: 'This is the part where we believe in ourselves. Then snack.',
    hybridPrefix: 'Cinema',
    motifs: ['star', 'crown', 'wing', 'moon', 'flame', 'heart', 'key', 'rocket'],
  },
  comics: {
    label: 'Comic books', icon: '💥', guide: 'comicworlds', parentType: 'Comic books',
    accent: '#ffd166', price: 180, likes: 'Star Pop', homes: ['night', 'neon', 'crystal'],
    blurb: 'A panel-perfect comic-book signature with a bold outline and a cliffhanger habit.',
    greeting: 'Same time next issue?',
    hybridPrefix: 'Panel',
    motifs: ['mask', 'fist', 'bolt', 'claw', 'skull', 'star', 'shield', 'eye'],
  },
  disneyjr: {
    label: 'Disney Jr.', icon: '🏰', guide: 'comicworlds', parentType: 'Disney Jr.',
    accent: '#ff9ec7', price: 155, likes: 'Star Cookie', homes: ['sugar', 'dream', 'grove'],
    blurb: 'A gentle Disney Jr. friend with a helping heart and a very singable morning routine.',
    greeting: 'Everybody ready? Then let us help!',
    hybridPrefix: 'Disney Jr.',
    motifs: ['crown', 'heart', 'paw', 'star', 'note', 'magic', 'shell', 'sparkle'],
  },
  disneyxd: {
    label: 'Disney XD', icon: '🎛️', guide: 'comicworlds', parentType: 'Disney XD',
    accent: '#5ad6ff', price: 175, likes: 'Star Pop', homes: ['neon', 'dream', 'aurora'],
    blurb: 'A Disney XD mischief-maker with a sci-fi gadget, a secret identity, and perfect comic timing.',
    greeting: 'I can explain. The explanation is also a gadget.',
    hybridPrefix: 'XD',
    motifs: ['tech', 'mask', 'wing', 'star', 'gear', 'magic', 'bolt', 'clock'],
  },
  disneyextra: {
    label: 'Disney classics', icon: '🐭', guide: 'comicworlds', parentType: 'Disney classics',
    accent: '#ffd166', price: 165, likes: 'Honeycomb Cake', homes: ['dream', 'sugar', 'grove'],
    blurb: 'A House of Mouse classic with a timeless silhouette and a cheerful theme song.',
    greeting: 'Hot dog! The whole gang is here.',
    hybridPrefix: 'Disney',
    motifs: ['crown', 'note', 'star', 'heart', 'key', 'balloon', 'magic', 'paw'],
  },
  gamegenres: {
    label: 'Video game genres', icon: '🕹️', guide: 'gamegenres', parentType: 'Video game genres',
    accent: '#7affd8', price: 190, likes: 'Star Pop', homes: ['neon', 'crystal', 'ember'],
    blurb: 'A living mascot for a whole way to play, carrying the rules of its genre in its silhouette.',
    greeting: 'Press start. I have been waiting on this title screen.',
    hybridPrefix: 'Genre',
    motifs: ['wing', 'gem', 'crossbow', 'fist', 'bolt', 'riddle', 'star', 'skull', 'mind', 'shield', 'rocket', 'gear', 'note', 'key', 'time', 'leaf', 'clock', 'crown'],
  },
  worldtypes: {
    label: 'World type variants', icon: '🌍', guide: 'worldtypes', parentType: 'World type variants',
    accent: '#8be9ff', price: 195, likes: 'Moon Cake', homes: ['aurora', 'savanna', 'tide', 'grove', 'crystal', 'night'],
    blurb: 'A regional expression of a familiar type, shaped by the weather, stories, and colours of its home.',
    greeting: 'Every place teaches a type a different way to shine.',
    hybridPrefix: 'World',
    motifs: ['paw', 'flame', 'fish', 'bolt', 'leaf', 'snow', 'fist', 'rose', 'sand', 'wing', 'eye', 'paw', 'gem', 'moon', 'flame', 'moon', 'gear', 'sparkle'],
  },
  shortcut: {
    label: 'Shortcut', icon: '⚡', guide: 'cartoonworlds', parentType: 'Shortcuts',
    accent: '#ffd166', price: 200, likes: 'Star Pop', homes: ['neon', 'aurora', 'dream'],
    blurb: 'A rare pathfinder that knows the quick way through every menu, map, and biome.',
    greeting: 'This way. I already checked the long route and it has no snacks.',
    hybridPrefix: 'Path',
    motifs: ['clock'],
  },
};

const CATALOG_DEFS = {
  pbs: [
    ['pbs_arthur', 'Arthur Read', 'Storybook'], ['pbs_buster', 'Buster Baxter', 'Goofball'],
    ['pbs_dw', 'D.W. Read', 'Determined'], ['pbs_binky', 'Binky Barnes', 'Gentle Giant'],
    ['pbs_muffy', 'Muffy Crosswire', 'Socialite'], ['pbs_george', 'Curious George', 'Curious'],
    ['pbs_clifford', 'Clifford', 'Bighearted'], ['pbs_emily', 'Emily Elizabeth', 'Caring'],
    ['pbs_daniel', 'Daniel Tiger', 'Neighborly'], ['pbs_tiger', 'Tigey', 'Comforting'],
    ['pbs_superwhy', 'Super Why', 'Wordpowered'], ['pbs_wordgirl', 'WordGirl', 'Verbose'],
    ['pbs_chris', 'Chris Kratt', 'Wildlife'], ['pbs_martin', 'Martin Kratt', 'Wildlife'],
    ['pbs_aviva', 'Aviva Corcovado', 'Inventive'], ['pbs_molly', 'Molly Mabray', 'Trailwise'],
    ['pbs_alma', 'Alma Rivera', 'Neighborhood'], ['pbs_xavier', 'Xavier Riddle', 'Time Traveler'],
    ['pbs_odd', 'Odd Squad Agent', 'Investigative'], ['pbs_pinkalicious', 'Pinkalicious', 'Pinktastic'],
    ['pbs_pete', 'Pete the Cat', 'Cool Cat'], ['pbs_peg', 'Peg', 'Problem Solver'],
    ['pbs_cat', "Peg's Cat", 'Number Friend'], ['pbs_donkey', 'Donkey Hodie', 'Silly'],
    ['pbs_rosie', 'Rosie Fuentes', 'Fixer'], ['pbs_lyla', 'Lyla Loops', 'Inventor'],
    ['pbs_zadie', 'Zadie', 'Neighbor'], ['pbs_buddy', 'Buddy', 'Paleontologist'],
    ['pbs_sid', 'Sid the Science Kid', 'Scientific'], ['pbs_elmo', 'Elmo', 'Friendly'],
  ],
  monsterjam: [
    ['mj_grave', 'Grave Digger', 'Legend truck'], ['mj_maxd', 'Max-D', 'Maximum chaos'],
    ['mj_eltoro', 'El Toro Loco', 'Charging bull'], ['mj_megalodon', 'Megalodon', 'Deep predator'],
    ['mj_zombie', 'Zombie', 'Undead engine'], ['mj_dragon', 'Dragon', 'Fire breather'],
    ['mj_avenger', 'Avenger', 'Arena hero'], ['mj_brutus', 'Brutus', 'Heavy hitter'],
    ['mj_sondig', 'Son-uva Digger', 'Hometown roar'], ['mj_nightmare', 'Northern Nightmare', 'Frost runner'],
    ['mj_dragonoid', 'Bakugan Dragonoid', 'Brawler'], ['mj_thunder', 'ThunderROARus', 'Storm truck'],
    ['mj_earthshaker', 'Earth Shaker', 'Quake maker'], ['mj_mutts', 'Monster Mutt', 'Good truck'],
  ],
  nick: [
    ['nick_rocko', 'Rocko Rama', 'Wallaby'], ['nick_heffer', 'Heffer Wolfe', 'Party heart'],
    ['nick_zim', 'Invader Zim', 'Alien scheme'], ['nick_gir', 'GIR', 'Chaos robot'],
    ['nick_danny', 'Danny Phantom', 'Half ghost'], ['nick_sam', 'Sam Manson', 'Goth friend'],
    ['nick_tucker', 'Tucker Foley', 'Tech friend'], ['nick_timmy', 'Timmy Turner', 'Wishmaker'],
    ['nick_cosmo', 'Cosmo', 'Fairy godparent'], ['nick_wanda', 'Wanda', 'Fairy godparent'],
    ['nick_jimmy', 'Jimmy Neutron', 'Boy genius'], ['nick_cindy', 'Cindy Vortex', 'Rival'],
    ['nick_lincoln', 'Lincoln Loud', 'Middle child'], ['nick_lucy', 'Lucy Loud', 'Poetic'],
    ['nick_ronnie', 'Ronnie Anne', 'City kid'], ['nick_garfield', 'Garfield', 'Lasagna cat'],
    ['nick_odie', 'Odie', 'Loyal pup'], ['nick_ren', 'Ren Höek', 'Chihuahua'],
    ['nick_stimpy', 'Stimpy', 'Happy cat'], ['nick_arnold', 'Arnold Shortman', 'Head turner'],
    ['nick_helga', 'Helga Pataki', 'Secret softie'], ['nick_doug', 'Doug Funnie', 'Daydreamer'],
    ['nick_patty', 'Patty Mayonnaise', 'Cool friend'], ['nick_quail', 'Quailman', 'Backup hero'],
  ],
  nickjr: [
    ['nickjr_blue', 'Blue', 'Clue finder'], ['nickjr_josh', 'Josh', 'Handy neighbor'],
    ['nickjr_periwinkle', 'Periwinkle', 'Little neighbor'], ['nickjr_dora', 'Dora', 'Explorer'],
    ['nickjr_boots', 'Boots', 'Jungle friend'], ['nickjr_diego', 'Diego', 'Animal rescuer'],
    ['nickjr_chase', 'Chase', 'Police pup'], ['nickjr_marshall', 'Marshall', 'Fire pup'],
    ['nickjr_skye', 'Skye', 'Sky pup'], ['nickjr_rubble', 'Rubble', 'Construction pup'],
    ['nickjr_shimmer', 'Shimmer', 'Genie'], ['nickjr_shine', 'Shine', 'Genie'],
    ['nickjr_gil', 'Gil', 'Guppy'], ['nickjr_molly', 'Molly', 'Guppy captain'],
    ['nickjr_deema', 'Deema', 'Guppy'], ['nickjr_oona', 'Oona', 'Guppy'],
    ['nickjr_nonny', 'Nonny', 'Guppy'], ['nickjr_geo', 'Geo', 'Shape hero'],
    ['nickjr_milli', 'Milli', 'Math hero'], ['nickjr_bot', 'Bot', 'Helper robot'],
    ['nickjr_linny', 'Linny', 'Wonder pet'], ['nickjr_tuck', 'Tuck', 'Wonder pet'],
    ['nickjr_mingming', 'Ming-Ming', 'Wonder pet'], ['nickjr_max', 'Max', 'Bunny brother'],
    ['nickjr_ruby', 'Ruby', 'Bunny sister'], ['nickjr_sunny', 'Sunny', 'Salon star'],
    ['nickjr_butterbean', 'Butterbean', 'Cafe fairy'],
  ],
  nicktoons: [
    ['nicktoons_aang', 'Aang', 'Avatar'], ['nicktoons_katara', 'Katara', 'Waterbender'],
    ['nicktoons_zuko', 'Zuko', 'Firebender'], ['nicktoons_toph', 'Toph', 'Earthbender'],
    ['nicktoons_korra', 'Korra', 'Avatar'], ['nicktoons_bolin', 'Bolin', 'Lavabender'],
    ['nicktoons_asami', 'Asami', 'Inventor'], ['nicktoons_mako', 'Mako', 'Detective'],
    ['nicktoons_iroh', 'Uncle Iroh', 'Tea master'], ['nicktoons_appa', 'Appa', 'Sky bison'],
    ['nicktoons_momo', 'Momo', 'Winged lemur'], ['nicktoons_leo', 'Leonardo', 'Turtle leader'],
    ['nicktoons_raph', 'Raphael', 'Turtle bruiser'], ['nicktoons_don', 'Donatello', 'Turtle genius'],
    ['nicktoons_mikey', 'Michelangelo', 'Turtle party'], ['nicktoons_splinter', 'Splinter', 'Turtle sensei'],
  ],
  discovery: [
    ['disc_bindi', 'Bindi Irwin', 'Wildlife guide'], ['disc_doki', 'Doki', 'Explorer'],
    ['disc_mac', 'Mac', 'Discovery kid'], ['disc_adam', 'Adam Savage', 'Maker'],
    ['disc_jamie', 'Jamie Hyneman', 'Builder'], ['disc_mike', 'Mike Rowe', 'Dirty jobs'],
    ['disc_parker', 'Parker Schnabel', 'Gold miner'], ['disc_jeremy', 'Jeremy Wade', 'River detective'],
    ['disc_bear', 'Bear Grylls', 'Survivalist'], ['disc_shark', 'Shark Week Diver', 'Reef watcher'],
    ['disc_puppy', 'Puppy Bowl MVP', 'Playmaker'], ['disc_meerkat', 'Meerkat Scout', 'Lookout'],
    ['disc_turtle', 'Turtle Tracker', 'Sea watcher'], ['disc_whale', 'Whale Watcher', 'Ocean guide'],
    ['disc_rockhound', 'Rockhound', 'Fossil hunter'], ['disc_storm', 'Storm Chaser', 'Weather guide'],
    ['disc_bush', 'Bushcraft Ranger', 'Trail guide'], ['disc_treehouse', 'Treehouse Builder', 'Carpenter'],
  ],
  toonmovies: [
    ['mov_shrek', 'Shrek', 'Ogre hero'], ['mov_fiona', 'Fiona', 'Warrior princess'],
    ['mov_donkey', 'Donkey', 'Loyal talker'], ['mov_puss', 'Puss in Boots', 'Dashing rogue'],
    ['mov_hiccup', 'Hiccup', 'Dragon rider'], ['mov_toothless', 'Toothless', 'Night Fury'],
    ['mov_po', 'Po', 'Dragon Warrior'], ['mov_tigress', 'Tigress', 'Master fighter'],
    ['mov_alex', 'Alex', 'City lion'], ['mov_marty', 'Marty', 'Zebra dreamer'],
    ['mov_melman', 'Melman', 'Giraffe doctor'], ['mov_gloria', 'Gloria', 'Hippo heart'],
    ['mov_gru', 'Gru', 'Villain dad'], ['mov_minion', 'Minion', 'Chaos helper'],
    ['mov_megamind', 'Megamind', 'Genius villain'], ['mov_roxanne', 'Roxanne Ritchi', 'Reporter'],
    ['mov_jackfrost', 'Jack Frost', 'Winter guardian'], ['mov_anastasia', 'Anastasia', 'Lost princess'],
    ['mov_balto', 'Balto', 'Snow dog'], ['mov_crysta', 'Crysta', 'Forest fairy'],
    ['mov_iron', 'Iron Giant', 'Gentle giant'], ['mov_coraline', 'Coraline', 'Door explorer'],
    ['mov_wybie', 'Wybie', 'Local friend'], ['mov_kubo', 'Kubo', 'Storyteller'],
    ['mov_peabody', 'Mr. Peabody', 'Genius dog'], ['mov_sherman', 'Sherman', 'Time kid'],
    ['mov_poppy', 'Poppy', 'Pop queen'], ['mov_branch', 'Branch', 'Cautious troll'],
    ['mov_papa', 'Papa Smurf', 'Village elder'], ['mov_smurfette', 'Smurfette', 'Blue spark'],
  ],
  comics: [
    ['comic_hellboy', 'Hellboy', 'Demon detective'], ['comic_spawn', 'Spawn', 'Hellspawn'],
    ['comic_invincible', 'Invincible', 'Young hero'], ['comic_omniman', 'Omni-Man', 'Cosmic enforcer'],
    ['comic_robo', 'Atomic Robo', 'Robot scientist'], ['comic_bone', 'Bone', 'Cartoon cousin'],
    ['comic_tintin', 'Tintin', 'Reporter'], ['comic_asterix', 'Asterix', 'Gaul hero'],
    ['comic_obelix', 'Obelix', 'Menhir mover'], ['comic_dredd', 'Judge Dredd', 'Street judge'],
    ['comic_tankgirl', 'Tank Girl', 'Rebel'], ['comic_mask', 'The Mask', 'Comic chaos'],
    ['comic_scott', 'Scott Pilgrim', 'Bassist'], ['comic_ramona', 'Ramona Flowers', 'Skater'],
    ['comic_alana', 'Alana', 'Space fugitive'], ['comic_marko', 'Marko', 'Horned warrior'],
    ['comic_usagi', 'Usagi Yojimbo', 'Rabbit ronin'], ['comic_mouseguard', 'Mouse Guard', 'Forest ranger'],
    ['comic_amulet', 'Amulet Keeper', 'Stone guardian'], ['comic_zita', 'Zita', 'Space adventurer'],
    ['comic_hilda', 'Hilda', 'Explorer'], ['comic_cleo', 'Cleopatra in Space', 'Time traveler'],
    ['comic_nimona', 'Nimona', 'Shapeshifter'], ['comic_lumberjane', 'Lumberjane', 'Camp hero'],
    ['comic_goldie', 'Goldie Vance', 'Teen detective'], ['comic_sweettooth', 'Sweet Tooth', 'Antler kid'],
    ['comic_locke', 'Locke', 'Key keeper'], ['comic_papergirl', 'Paper Girl', 'Time courier'],
    ['comic_yotsuba', 'Yotsuba', 'Everyday wonder'], ['comic_thorn', 'Thorn', 'Bone guardian'],
  ],
  disneyjr: [
    ['disneyjr_doc', 'Doc McStuffins', 'Toy doctor'], ['disneyjr_lambie', 'Lambie', 'Stuffed friend'],
    ['disneyjr_sofia', 'Sofia the First', 'Young royal'], ['disneyjr_jake', 'Jake', 'Pirate kid'],
    ['disneyjr_elena', 'Elena of Avalor', 'Crown princess'], ['disneyjr_puppy', 'Puppy Dog Pal', 'Pup hero'],
    ['disneyjr_vampirina', 'Vampirina', 'Friendly vampire'], ['disneyjr_nancy', 'Fancy Nancy', 'Fancy friend'],
    ['disneyjr_pj', 'PJ Masks Hero', 'Night hero'], ['disneyjr_giganto', 'Gigantosaurus', 'Big dino'],
    ['disneyjr_stork', 'T.O.T.S. Stork', 'Baby courier'], ['disneyjr_mira', 'Mira', 'Royal detective'],
    ['disneyjr_spidey', 'Spidey', 'Web hero'], ['disneyjr_kiya', 'Kiya', 'Kiya hero'],
    ['disneyjr_superkitty', 'SuperKitty', 'Cat hero'], ['disneyjr_ariel', 'Ariel Jr.', 'Little mermaid'],
    ['disneyjr_pup', 'Pupstruction', 'Builder pup'], ['disneyjr_muppet', 'Muppet Baby', 'Tiny friend'],
    ['disneyjr_mickey', 'Mickey Jr.', 'Clubhouse host'], ['disneyjr_minnie', 'Minnie Jr.', 'Clubhouse star'],
  ],
  disneyxd: [
    ['disneyxd_phineas', 'Phineas', 'Idea maker'], ['disneyxd_ferb', 'Ferb', 'Quiet builder'],
    ['disneyxd_perry', 'Perry', 'Secret agent'], ['disneyxd_milo', 'Milo Murphy', 'Luck magnet'],
    ['disneyxd_kick', 'Kick Buttowski', 'Stunt rider'], ['disneyxd_randy', 'Randy Cunningham', 'Ninja'],
    ['disneyxd_star', 'Star Butterfly', 'Magic princess'], ['disneyxd_marco', 'Marco Diaz', 'Safe kid'],
    ['disneyxd_dipper', 'Dipper Pines', 'Mystery twin'], ['disneyxd_mabel', 'Mabel Pines', 'Sparkle twin'],
    ['disneyxd_bill', 'Bill Cipher', 'Dream demon'], ['disneyxd_darkwing', 'Darkwing Duck', 'Masked hero'],
    ['disneyxd_goliath', 'Goliath', 'Gargoyle'], ['disneyxd_kim', 'Kim Possible', 'Teen agent'],
    ['disneyxd_ron', 'Ron Stoppable', 'Loyal sidekick'], ['disneyxd_jake', 'Jake Long', 'Dragon kid'],
    ['disneyxd_recess', 'Recess Kid', 'Playground legend'], ['disneyxd_pepper', 'Pepper Ann', 'Original teen'],
    ['disneyxd_dave', 'Dave the Barbarian', 'Reluctant hero'], ['disneyxd_wander', 'Wander', 'Helpful nomad'],
    ['disneyxd_sylvia', 'Sylvia', 'Space steed'], ['disneyxd_cricket', 'Cricket Green', 'Country kid'],
    ['disneyxd_tilly', 'Tilly Green', 'Big dreamer'], ['disneyxd_luz', 'Luz Noceda', 'Magic student'],
  ],
  disneyextra: [
    ['disneyextra_oswald', 'Oswald', 'Lucky rabbit'], ['disneyextra_ortensia', 'Ortensia', 'Lucky cat'],
    ['disneyextra_clarabelle', 'Clarabelle', 'Farm friend'], ['disneyextra_huey', 'Huey', 'Duck triplet'],
    ['disneyextra_dewey', 'Dewey', 'Duck triplet'], ['disneyextra_louie', 'Louie', 'Duck triplet'],
    ['disneyextra_webby', 'Webby', 'Adventure duck'], ['disneyextra_launchpad', 'Launchpad', 'Pilot'],
    ['disneyextra_max', 'Max Goof', 'Cool son'], ['disneyextra_roger', 'Roger Rabbit', 'Toon detective'],
    ['disneyextra_jessica', 'Jessica Rabbit', 'Showstopper'], ['disneyextra_powerline', 'Powerline', 'Pop star'],
  ],
  gamegenres: [
    ['genre_platform', 'Leapster', 'Platformer', 'wing'], ['genre_rpg', 'Runeheart', 'RPG', 'gem'],
    ['genre_fps', 'Vanguard', 'Shooter', 'crossbow'], ['genre_fighting', 'Combo', 'Fighting', 'fist'],
    ['genre_racing', 'Apex Drift', 'Racing', 'bolt'], ['genre_puzzle', 'Gridlock', 'Puzzle', 'riddle'],
    ['genre_sports', 'Goalstorm', 'Sports', 'star'], ['genre_horror', 'Night Signal', 'Horror', 'skull'],
    ['genre_strategy', 'Command Owl', 'Strategy', 'mind'], ['genre_moba', 'Lane Warden', 'MOBA', 'shield'],
    ['genre_battle', 'Dropzone', 'Battle royale', 'rocket'], ['genre_sandbox', 'Blockwild', 'Sandbox', 'gear'],
    ['genre_rhythm', 'Beatbox', 'Rhythm', 'note'], ['genre_visual', 'Storybook', 'Visual novel', 'key'],
    ['genre_rogue', 'Runecrawl', 'Roguelike', 'time'], ['genre_sim', 'Cozyplot', 'Simulation', 'leaf'],
    ['genre_adventure', 'Trailbound', 'Adventure', 'clock'], ['genre_mmo', 'Guild Star', 'MMO', 'crown'],
  ],
  worldtypes: [
    ['world_normal_highland', 'Highland Wanderer', 'Scotland', 'Normal'], ['world_fire_iceland', 'Caldera Keeper', 'Iceland', 'Fire'],
    ['world_water_polynesia', 'Reef Navigator', 'Polynesia', 'Water'], ['world_electric_india', 'Monsoon Charger', 'India', 'Electric'],
    ['world_grass_costa', 'Cloud Forest Sprout', 'Costa Rica', 'Grass'], ['world_ice_greenland', 'Tundra Lantern', 'Greenland', 'Ice'],
    ['world_fighting_brazil', 'Capoeira Sparrow', 'Brazil', 'Fighting'], ['world_poison_indonesia', 'Mangrove Alchemist', 'Indonesia', 'Poison'],
    ['world_ground_morocco', 'Sahara Wayfinder', 'Morocco', 'Ground'], ['world_flying_peru', 'Andes Courier', 'Peru', 'Flying'],
    ['world_psychic_egypt', 'Desert Starreader', 'Egypt', 'Psychic'], ['world_bug_china', 'Silk Lantern', 'China', 'Bug'],
    ['world_rock_australia', 'Uluru Sentinel', 'Australia', 'Rock'], ['world_ghost_japan', 'Moonlit Ancestor', 'Japan', 'Ghost'],
    ['world_dragon_switzerland', 'Alpine Wyrm', 'Switzerland', 'Dragon'], ['world_dark_norway', 'Polar Night', 'Norway', 'Dark'],
    ['world_steel_korea', 'Hanok Guardian', 'South Korea', 'Steel'], ['world_fairy_ireland', 'Wishbell', 'Ireland', 'Fairy'],
  ],
  shortcut: [
    ['shortcut', 'Shortcut', 'Pathfinder', 'clock'],
  ],
};

const CATALOG_PALETTES = [
  ['#5a9eff', '#dbe9ff', '#10245c', '#ffd166'], ['#e85a9a', '#ffe0ef', '#6b103a', '#8be9ff'],
  ['#d9a441', '#fff0c2', '#5c3a0a', '#8fe07a'], ['#4a9a5a', '#e0ffe8', '#1a4a2a', '#ffd166'],
  ['#e8574a', '#ffe0d6', '#6b1a10', '#5a9eff'], ['#8a5ac9', '#f0e8ff', '#3a1f6b', '#ffd166'],
  ['#3ac9b8', '#e0fff8', '#0f5c4a', '#ff8a7a'], ['#e88a3a', '#ffe8d6', '#6b3a10', '#8be9ff'],
  ['#5c4a6b', '#e8e0f2', '#1f1430', '#b69cff'], ['#8ad8ff', '#f0fbff', '#2f5c8a', '#ffffff'],
  ['#8fe07a', '#efffdc', '#2f5a1a', '#ffd166'], ['#ff8fc8', '#ffe8f3', '#6b1f4a', '#ffd166'],
  ['#c9455c', '#ffd6dd', '#4d1024', '#b69cff'], ['#e8c25a', '#fff8d6', '#6b4a10', '#e8574a'],
  ['#7ad8e8', '#e8fbff', '#1f5c6b', '#ffd166'], ['#9ad7a8', '#effff2', '#2f5c3a', '#ffb86b'],
  ['#b58ae8', '#f3e8ff', '#4a2a6b', '#8be9ff'], ['#f2b23c', '#fff2d0', '#7a4a0a', '#5a9eff'],
];

const CATALOG_GENE_POOL = [
  { name: 'Channel Surfer', icon: '🎟️', desc: 'Day games pay +2 coins and gifts arrive 20% sooner.', effect: { dayCoins: 2, giftSpeed: 1.2 } },
  { name: 'Encore', icon: '🎵', desc: 'Chats pay +3 coins and pets build 25% more bond.', effect: { chatCoins: 3, petBond: 1.25 } },
  { name: 'Toy Box', icon: '🧸', desc: 'Snacks give +30% XP and joy fades 15% slower.', effect: { snackXp: 1.3, joyDecay: 0.85 } },
  { name: 'Hero Frame', icon: '🦸', desc: 'Day games pay +3 coins and gain 15% more XP.', effect: { dayCoins: 3, xp: 1.15 } },
  { name: 'Rerun', icon: '🔁', desc: 'Gifts arrive 30% sooner and gain 10% more XP.', effect: { giftSpeed: 1.3, xp: 1.1 } },
  { name: 'World Tour', icon: '🌍', desc: 'Gain 20% more XP and pets build 20% more bond.', effect: { xp: 1.2, petBond: 1.2 } },
  { name: 'Secret Signal', icon: '📡', desc: 'Night games pay +3 coins and chats pay +2 coins.', effect: { nightCoins: 3, chatCoins: 2 } },
  { name: 'High Score', icon: '🕹️', desc: 'Games pay +4 coins and gain 10% more XP.', effect: { gameCoins: 4, xp: 1.1 } },
];

const CATALOG_SPECIES = [];
const CATALOG_BY_GROUP = {};
const CATALOG_GROUP_KEYS = Object.keys(CATALOG_GROUPS);
const CATALOG_GROUP_INDEX = Object.fromEntries(CATALOG_GROUP_KEYS.map((key, index) => [key, index]));

function catalogGroupLabel(key) {
  return CATALOG_GROUPS[key]?.label || 'Hollow';
}

CATALOG_GROUP_KEYS.forEach((groupKey) => {
  const group = CATALOG_GROUPS[groupKey];
  const entries = CATALOG_DEFS[groupKey] || [];
  const groupIndex = CATALOG_GROUP_INDEX[groupKey];
  const newKeys = [];
  CATALOG_BY_GROUP[groupKey] = [];

  entries.forEach((row, index) => {
    const [key, name, tag] = row;
    if (!key || !name || ELEMENTS[key]) return;
    const isWorld = groupKey === 'worldtypes';
    const isGenre = groupKey === 'gamegenres';
    const variantType = isWorld ? row[3] : null;
    const region = isWorld ? row[2] : null;
    const genre = isGenre ? row[2] : null;
    const palette = CATALOG_PALETTES[(groupIndex * 3 + index) % CATALOG_PALETTES.length];
    const [primary, light, deep, accent] = palette;
    const gene = CATALOG_GENE_POOL[(groupIndex * 2 + index) % CATALOG_GENE_POOL.length];
    const motif = (isGenre || groupKey === 'shortcut') && row[3] ? row[3] : group.motifs[index % group.motifs.length];
    const parentTypes = isWorld
      ? ['World variants', `${variantType} variant`]
      : isGenre
        ? ['Video game genres', genre]
        : groupKey === 'shortcut'
          ? ['Shortcuts', 'World navigation']
          : [group.parentType];
    ELEMENTS[key] = {
      name, primary, light, deep, accent,
      trait: `${tag} — ${group.blurb.split('.')[0].toLowerCase()}.`,
      blurb: `${name} is a ${tag.toLowerCase()} signature from ${group.label}. ${group.blurb}`,
      greeting: group.greeting,
      likes: group.likes,
      catalogGroup: groupKey,
      catalogType: tag,
      catalogArt: motif,
      parentTypes,
      ...(isWorld ? { worldVariant: true, worldRegion: region, variantType } : {}),
      ...(isGenre ? { gameGenre: genre } : {}),
      ...(groupKey === 'shortcut' ? { shortcut: true } : {}),
    };
    GENE_POWERS[key] = gene;
    TITAN_NAMES[key] = `${name} Titan`;
    TYPE_EGG_BASE_PRICE[key] = group.price;
    TYPE_EGG_PRICE[key] = discountedEggPrice(group.price);
    NAME_START[key] = [name.split(' ')[0], ...name.split(' ').slice(1, 3), 'Ace', 'Star'];
    group.homes.forEach((scene) => {
      if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
    });
    CATALOG_SPECIES.push(key);
    newKeys.push(key);
    CATALOG_BY_GROUP[groupKey].push(key);
  });

  newKeys.forEach((key, index) => {
    const next = newKeys[(index + 1) % newKeys.length];
    if (!next || next === key) return;
    const first = ELEMENTS[key].name.split(' ')[0];
    const second = ELEMENTS[next].name.split(' ')[0];
    HYBRID_NAMES[pairKey(key, next)] = `${group.hybridPrefix} ${first} & ${second}`;
  });
});

ELEMENT_KEYS.push(...CATALOG_SPECIES);
let CATALOG_TOTAL = CATALOG_SPECIES.length;

function catalogSpeciesFor(groupKey) {
  return (CATALOG_BY_GROUP[groupKey] || []).slice();
}

function catalogGuideForGroup(groupKey) {
  return CATALOG_GROUPS[groupKey]?.guide || 'recent';
}

/* Parent types shown in the breeder codex and species files. Every species
   resolves to at least one readable family, including older Hollow waves. */
function parentTypesForSpecies(key) {
  const el = ELEMENTS[key];
  if (!el) return ['Hollow'];
  const types = [];
  const add = (value) => { if (value && !types.includes(value)) types.push(value); };
  if (Array.isArray(el.parentTypes)) el.parentTypes.forEach(add);
  if (el.catalogGroup) add(CATALOG_GROUPS[el.catalogGroup]?.parentType || catalogGroupLabel(el.catalogGroup));
  if (el.worldVariant && el.variantType) add(`${el.variantType} variant`);
  if (el.gameGenre) add(el.gameGenre);
  if (typeof POKEDEX_META !== 'undefined' && POKEDEX_META[key]) {
    add('Pokémon');
    (POKEDEX_META[key].types || []).forEach((type) => add(PDX_TYPES[type]?.name || type));
  }
  if (el.biomeType) add(PDX_TYPES[el.biomeType]?.name || el.biomeType);
  if (el.heroPublisher && typeof HERO_PUBLISHER_META !== 'undefined') add(HERO_PUBLISHER_META[el.heroPublisher]?.label || el.heroPublisher);
  if (el.heroRole && typeof HERO_ROLE_META !== 'undefined') add(HERO_ROLE_META[el.heroRole]?.label || el.heroRole);
  if (el.disneyGroup && typeof DISNEY_GROUPS !== 'undefined') add(DISNEY_GROUPS[el.disneyGroup]?.label || 'Disney');
  if (el.careBearGroup && typeof CARE_BEAR_GROUPS !== 'undefined') add(CARE_BEAR_GROUPS[el.careBearGroup]?.label || 'Care Bears');
  if (el.fortniteLegacy) add('Fortnite Legacy');
  if (el.wwe) add('WWE');
  if (el.legendGroup && typeof LEGEND_GROUPS !== 'undefined') add(LEGEND_GROUPS[el.legendGroup]?.label || el.legendGroup);
  if (el.waveGroup && typeof WAVE_GROUPS !== 'undefined') add(WAVE_GROUPS[el.waveGroup]?.label || el.waveGroup);
  if (el.candy) add('Candy');
  if (el.secret) add('Secret Vault');
  if (!types.length) add('Hollow');
  return types.slice(0, 5);
}

const LONG_CATALOG_GUIDES = {
  cartoonworlds: ['pbs', 'monsterjam', 'nick', 'nickjr', 'nicktoons', 'discovery', 'toonmovies'],
  comicworlds: ['comics', 'disneyjr', 'disneyxd', 'disneyextra'],
  gamegenres: ['gamegenres'],
  worldtypes: ['worldtypes'],
};
