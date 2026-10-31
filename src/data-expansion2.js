/* Wave 3.1.7: film, anime, TV, Cartoon Network, Powerpuff, food sprites,
   and worldwide habitats. Names identify characters; all art is procedural. */

const WORLD_HABITATS = {
  'world-serengeti': { name: 'Serengeti Plains', habitat: 'Savanna', emoji: '🦁', bonus: .45, blurb: 'Acacia shade, migration trails, and a horizon full of life.' },
  'world-amazon': { name: 'Amazon Canopy', habitat: 'Rainforest', emoji: '🌴', bonus: .45, blurb: 'Warm rain, layered green, and a thousand tiny voices.' },
  'world-greatbarrier': { name: 'Great Barrier Reef', habitat: 'Reef', emoji: '🪸', bonus: .45, blurb: 'Living coral gardens under a shifting blue ceiling.' },
  'world-himalaya': { name: 'Himalayan Pass', habitat: 'Mountain', emoji: '🏔️', bonus: .48, blurb: 'Thin air, prayer flags, and snow that turns gold at dawn.' },
  'world-arctic': { name: 'Arctic Ice', habitat: 'Polar', emoji: '🧊', bonus: .48, blurb: 'Blue ice, long light, and a quiet that carries for miles.' },
  'world-sahara': { name: 'Sahara Dunes', habitat: 'Desert', emoji: '🐪', bonus: .45, blurb: 'Wind-carved sand and stars with nowhere to hide.' },
  'world-alps': { name: 'Alpine Meadow', habitat: 'Alpine', emoji: '🌼', bonus: .46, blurb: 'Wildflowers, cowbells, and clean air above the clouds.' },
  'world-galapagos': { name: 'Galápagos Shore', habitat: 'Island', emoji: '🐢', bonus: .46, blurb: 'Black lava, bright crabs, and curious animals with no hurry.' },
  'world-madagascar': { name: 'Madagascar Forest', habitat: 'Forest', emoji: '🐒', bonus: .46, blurb: 'Baobabs, lemurs, and plants found nowhere else on Earth.' },
  'world-borneo': { name: 'Borneo Rainforest', habitat: 'Rainforest', emoji: '🦧', bonus: .47, blurb: 'Mist, orchids, and a green roof older than memory.' },
  'world-okavango': { name: 'Okavango Delta', habitat: 'Wetland', emoji: '🦛', bonus: .46, blurb: 'A river that ends in a garden instead of the sea.' },
  'world-patagonia': { name: 'Patagonian Steppe', habitat: 'Steppe', emoji: '🦙', bonus: .46, blurb: 'Wind-bent grass, granite towers, and enormous skies.' },
  'world-iceland': { name: 'Icelandic Fjord', habitat: 'Fjord', emoji: '🌋', bonus: .47, blurb: 'Black beaches, hot springs, and waterfalls in the mist.' },
  'world-tasmania': { name: 'Tasmanian Wilds', habitat: 'Temperate', emoji: '🌿', bonus: .45, blurb: 'Fern gullies, cool rivers, and ancient forest light.' },
  'world-bavaria': { name: 'Bavarian Woods', habitat: 'Woodland', emoji: '🏰', bonus: .45, blurb: 'Pine paths, castle bells, and gingerbread-colored towns.' },
  'world-nile': { name: 'Nile Delta', habitat: 'River', emoji: '🚣', bonus: .46, blurb: 'Reeds, ibises, and a river that made a civilization.' },
  'world-kerala': { name: 'Kerala Backwaters', habitat: 'Lagoon', emoji: '🛶', bonus: .46, blurb: 'Coconut shade, green water, and slow boats at sunset.' },
  'world-hokkaido': { name: 'Hokkaido Springs', habitat: 'Hot spring', emoji: '♨️', bonus: .47, blurb: 'Steam, snow monkeys, and cedar forests after rain.' },
};

Object.entries(WORLD_HABITATS).forEach(([key, scene]) => {
  if (SCENES[key]) return;
  SCENES[key] = { ...scene, unlocked: true, species: [], worldHabitat: true };
  SCENE_KEYS.push(key);
});

const EXPANSION2_GROUPS = {
  fnafmovie: { label: 'FNAF movies', icon: '🎬', guide: 'worldwave', parentType: 'FNAF movies', accent: '#c9455c', price: 195, likes: 'Pizza Slice', homes: ['night', 'neon', 'world-bavaria'], blurb: 'A big-screen night-shift survivor with a flashlight, a mystery, and a very persistent animatronic.', greeting: 'The doors lock at midnight. Stay close.', hybridPrefix: 'Night Shift', motifs: ['mask', 'eye', 'clock', 'flame', 'bolt', 'paw', 'skull', 'star'] },
  disneymovies: { label: 'Disney movies', icon: '🏰', guide: 'worldwave', parentType: 'Disney movies', accent: '#ff9ec7', price: 195, likes: 'Star Cookie', homes: ['dream', 'world-bavaria', 'world-hokkaido'], blurb: 'A theatrical Disney legend with a wishing song and a storybook ending.', greeting: 'Every wish starts somewhere. Usually with a song.', hybridPrefix: 'Storybook', motifs: ['crown', 'magic', 'heart', 'star', 'shell', 'rose', 'wing', 'key'] },
  nickmovies: { label: 'Nickelodeon movies', icon: '🧩', guide: 'worldwave', parentType: 'Nickelodeon movies', accent: '#ff7a3c', price: 190, likes: 'Star Pop', homes: ['neon', 'sugar', 'world-galapagos'], blurb: 'A nickelodeon big-screen adventurer with a slime-green sense of timing.', greeting: 'This is either a movie or a very long episode.', hybridPrefix: 'Nick Movie', motifs: ['star', 'fish', 'mask', 'rocket', 'note', 'paw', 'sparkle', 'heart'] },
  pbsmovies: { label: 'PBS Kids movies', icon: '📚', guide: 'worldwave', parentType: 'PBS Kids movies', accent: '#5a9eff', price: 175, likes: 'Storybook Tea', homes: ['grove', 'sugar', 'world-amazon'], blurb: 'A PBS storybook star on a gentle big-screen field trip.', greeting: 'Look, listen, and learn. Then we can sing.', hybridPrefix: 'PBS Movie', motifs: ['book', 'star', 'paw', 'note', 'leaf', 'heart', 'key', 'clock'] },
  anime: { label: 'Anime', icon: '🍥', guide: 'worldwave', parentType: 'Anime', accent: '#ff8ad8', price: 205, likes: 'Ichiraku Ramen', homes: ['neon', 'world-hokkaido', 'world-kerala'], blurb: 'A Japanese animation hero with a training arc, a signature move, and a rival worth respecting.', greeting: 'This is not even my final form.', hybridPrefix: 'Anime', motifs: ['flame', 'bolt', 'mask', 'claw', 'moon', 'wing', 'star', 'storm', 'eye', 'sword'] },
  cartoonnetwork: { label: 'Cartoon Network', icon: '📺', guide: 'worldwave', parentType: 'Cartoon Network', accent: '#ffd166', price: 190, likes: 'Cereal Bowl', homes: ['neon', 'sugar', 'world-borneo'], blurb: 'A Cartoon Network original with a weird premise and perfect comic timing.', greeting: 'It started as a normal Tuesday. It is not a normal Tuesday.', hybridPrefix: 'CN', motifs: ['star', 'rocket', 'mask', 'tech', 'bolt', 'heart', 'fish', 'clock'] },
  nineties: { label: '90s cartoons', icon: '📼', guide: 'worldwave', parentType: '90s cartoons', accent: '#7affd8', price: 185, likes: 'Pizza Slice', homes: ['neon', 'night', 'sugar'], blurb: 'A nineties cartoon with a VHS glow, a loud theme song, and a skateboard in the hall.', greeting: 'Be kind. Rewind. Then let us get snacks.', hybridPrefix: '90s', motifs: ['star', 'note', 'mask', 'skull', 'fish', 'paw', 'bolt', 'sparkle'] },
  early2000s: { label: 'Early 2000s cartoons', icon: '📀', guide: 'worldwave', parentType: 'Early 2000s cartoons', accent: '#8be9ff', price: 185, likes: 'Star Pop', homes: ['neon', 'dream', 'world-greatbarrier'], blurb: 'A new-millennium cartoon with a flip phone, a sci-fi gadget, and unlimited attitude.', greeting: 'I have a gadget for this. I have a gadget for everything.', hybridPrefix: '2000s', motifs: ['tech', 'rocket', 'star', 'mask', 'bolt', 'clock', 'fish', 'magic'] },
  tvshows: { label: 'Classic TV shows', icon: '📡', guide: 'worldwave', parentType: 'Classic TV shows', accent: '#ffe3a3', price: 180, likes: 'Cereal Bowl', homes: ['grove', 'night', 'sugar'], blurb: 'A television icon who knows exactly how to hold a close-up.', greeting: 'We will be right back after these messages.', hybridPrefix: 'TV', motifs: ['star', 'note', 'mask', 'fish', 'paw', 'heart', 'clock', 'bone'] },
  sesame: { label: 'Sesame, Umizoomi & Clifford', icon: '🧸', guide: 'worldwave', parentType: 'Sesame & preschool', accent: '#ffb347', price: 160, likes: 'Sesame Cookie', homes: ['grove', 'sugar', 'world-alps'], blurb: 'A preschool neighbor who turns numbers, letters, and big red dogs into everyday adventures.', greeting: 'Learning is better with a friend. And a snack.', hybridPrefix: 'Preschool', motifs: ['paw', 'star', 'note', 'heart', 'book', 'key', 'shell', 'leaf'] },
  powerpuff: { label: 'Powerpuff heroes & villains', icon: '💥', guide: 'worldwave', parentType: 'Powerpuff', accent: '#ff9ec7', price: 200, likes: 'Chemical X Cupcake', homes: ['neon', 'world-amazon', 'sugar'], blurb: 'A Townsville hero or villain with sugar, spice, and a city-sized sense of drama.', greeting: 'Townsville is about to have a very interesting afternoon.', hybridPrefix: 'Townsville', motifs: ['fist', 'heart', 'star', 'flame', 'bolt', 'eye', 'mask', 'mind'] },
  toonfoods: { label: 'Cartoon & anime foods', icon: '🍜', guide: 'worldwave', parentType: 'Toon foods', accent: '#ffd166', price: 150, likes: 'Everything', homes: ['sugar', 'world-kerala', 'world-hokkaido'], blurb: 'A legendary snack from a cartoon, movie, or anime kitchen, born to be shared.', greeting: 'You cannot watch the episode on an empty stomach.', hybridPrefix: 'Snack', motifs: ['note', 'star', 'heart', 'fish', 'leaf', 'flame', 'shell', 'sparkle'] },
};

const EXPANSION2_DEFS = {
  fnafmovie: [
    ['fm_mike', 'Mike Schmidt', 'Night guard'], ['fm_abby', 'Abby Schmidt', 'Brave kid'],
    ['fm_vanessa', 'Vanessa Shelly', 'Officer'], ['fm_afton', 'William Afton', 'Yellow rabbit'],
    ['fm_jane', 'Aunt Jane', 'Skeptical'], ['fm_max', 'Max', 'Ride leader'],
    ['fm_garrett', 'Garrett Schmidt', 'Lost brother'], ['fm_dunn', 'Officer Dunn', 'Night patrol'],
    ['fm_toyfreddy', 'Toy Freddy', 'Showtime bear'], ['fm_mangle', 'Mangle', 'Tangle of parts'],
    ['fm_puppet', 'The Puppet', 'Music box'], ['fm_bb', 'Balloon Boy', 'Balloon scout'],
  ],
  disneymovies: [
    ['dm_snow', 'Snow White', 'Wishing princess'], ['dm_pinocchio', 'Pinocchio', 'Wooden heart'],
    ['dm_dumbo', 'Dumbo', 'Flying elephant'], ['dm_bambi', 'Bambi', 'Forest prince'],
    ['dm_cinderella', 'Cinderella', 'Glass slipper'], ['dm_alice', 'Alice', 'Curious dreamer'],
    ['dm_peterpan', 'Peter Pan', 'Neverland'], ['dm_aurora', 'Aurora', 'Rose princess'],
    ['dm_maleficent', 'Maleficent', 'Dragon fairy'], ['dm_baloo', 'Baloo', 'Jungle bear'],
    ['dm_robinhood', 'Robin Hood', 'Fox archer'], ['dm_ariel', 'Ariel', 'Little mermaid'],
    ['dm_belle', 'Belle', 'Library heart'], ['dm_jasmine', 'Jasmine', 'Palace rebel'],
    ['dm_simba', 'Simba', 'Lion heir'], ['dm_esmeralda', 'Esmeralda', 'Bell ringer'],
    ['dm_hercules', 'Hercules', 'Hero in training'], ['dm_mulan', 'Mulan', 'Warrior heart'],
    ['dm_tarzan', 'Tarzan', 'Jungle lord'], ['dm_stitch', 'Stitch', 'Experimental friend'],
    ['dm_tiana', 'Tiana', 'Bayou chef'], ['dm_rapunzel', 'Rapunzel', 'Tower dreamer'],
    ['dm_elsa', 'Elsa', 'Snow queen'], ['dm_moana', 'Moana', 'Wayfinder'],
  ],
  nickmovies: [
    ['nm_spongebob', 'SpongeBob', 'Fry cook'], ['nm_patrick', 'Patrick Star', 'Best friend'],
    ['nm_sandy', 'Sandy Cheeks', 'Inventor'], ['nm_mrkrabs', 'Mr. Krabs', 'Coin captain'],
    ['nm_plankton', 'Plankton', 'Tiny schemer'], ['nm_tommy', 'Tommy Pickles', 'Brave baby'],
    ['nm_chuckie', 'Chuckie Finster', 'Worried friend'], ['nm_angelica', 'Angelica Pickles', 'Boss baby'],
    ['nm_arnold', 'Arnold Shortman', 'Headline kid'], ['nm_gerald', 'Gerald Johanssen', 'Street smart'],
    ['nm_jimmy', 'Jimmy Neutron', 'Boy genius'], ['nm_timmy', 'Timmy Turner', 'Fairy wish'],
    ['nm_cosmo', 'Cosmo', 'Fairy goof'], ['nm_wanda', 'Wanda', 'Fairy voice'],
  ],
  pbsmovies: [
    ['pm_arthur', 'Arthur Read', 'Movie reader'], ['pm_dw', 'D.W. Read', 'Movie critic'],
    ['pm_buster', 'Buster Baxter', 'Popcorn fan'], ['pm_molly', 'Molly Mabray', 'Trail guide'],
    ['pm_xavier', 'Xavier Riddle', 'Time traveler'], ['pm_chris', 'Chris Kratt', 'Creature hero'],
    ['pm_martin', 'Martin Kratt', 'Creature hero'], ['pm_aviva', 'Aviva Corcovado', 'Inventor'],
    ['pm_wordgirl', 'WordGirl', 'Word hero'], ['pm_superwhy', 'Super Why', 'Story hero'],
    ['pm_daniel', 'Daniel Tiger', 'Neighbor'], ['pm_donkey', 'Donkey Hodie', 'Silly friend'],
  ],
  anime: [
    ['an_naruto', 'Naruto Uzumaki', 'Ninja dreamer'], ['an_sasuke', 'Sasuke Uchiha', 'Rival'],
    ['an_sakura', 'Sakura Haruno', 'Healer'], ['an_kakashi', 'Kakashi Hatake', 'Masked mentor'],
    ['an_luffy', 'Monkey D. Luffy', 'Pirate captain'], ['an_zoro', 'Roronoa Zoro', 'Sword saint'],
    ['an_nami', 'Nami', 'Navigator'], ['an_goku', 'Goku', 'Saiyan fighter'],
    ['an_vegeta', 'Vegeta', 'Proud rival'], ['an_gohan', 'Gohan', 'Scholar fighter'],
    ['an_bulma', 'Bulma', 'Capsule inventor'], ['an_ichigo', 'Ichigo Kurosaki', 'Soul reaper'],
    ['an_rukia', 'Rukia Kuchiki', 'Soul reaper'], ['an_sailormoon', 'Sailor Moon', 'Moon guardian'],
    ['an_tuxedo', 'Tuxedo Mask', 'Rose ally'], ['an_ash', 'Ash Ketchum', 'Trainer'],
    ['an_misty', 'Misty', 'Water trainer'], ['an_teamrocket', 'Team Rocket', 'Double trouble'],
    ['an_tanjiro', 'Tanjiro Kamado', 'Demon slayer'], ['an_nezuko', 'Nezuko Kamado', 'Demon heart'],
    ['an_zenitsu', 'Zenitsu Agatsuma', 'Thunder sleeper'], ['an_inosuke', 'Inosuke Hashibira', 'Boar mask'],
    ['an_deku', 'Izuku Midoriya', 'Hero student'], ['an_bakugo', 'Katsuki Bakugo', 'Explosive rival'],
    ['an_allmight', 'All Might', 'Symbol of peace'], ['an_edward', 'Edward Elric', 'Alchemist'],
    ['an_alphonse', 'Alphonse Elric', 'Armored heart'], ['an_spike', 'Spike Spiegel', 'Bounty hunter'],
    ['an_totoro', 'Totoro', 'Forest spirit'], ['an_kiki', 'Kiki', 'Flying courier'],
  ],
  cartoonnetwork: [
    ['cn_ben', 'Ben Tennyson', 'Omnitrix hero'], ['cn_gwen', 'Gwen Tennyson', 'Magic learner'],
    ['cn_kevin', 'Kevin Levin', 'Reformed rival'], ['cn_finn', 'Finn the Human', 'Adventure hero'],
    ['cn_jake', 'Jake the Dog', 'Stretchy brother'], ['cn_marceline', 'Marceline', 'Vampire queen'],
    ['cn_bubblegum', 'Princess Bubblegum', 'Candy scientist'], ['cn_mordecai', 'Mordecai', 'Park worker'],
    ['cn_rigby', 'Rigby', 'Park schemer'], ['cn_gumball', 'Gumball Watterson', 'Blue cat'],
    ['cn_darwin', 'Darwin Watterson', 'Fish brother'], ['cn_steven', 'Steven Universe', 'Gem heart'],
    ['cn_garnet', 'Garnet', 'Gem leader'], ['cn_pearl', 'Pearl', 'Gem strategist'],
    ['cn_amethyst', 'Amethyst', 'Gem wildcard'], ['cn_jack', 'Samurai Jack', 'Time traveler'],
    ['cn_aku', 'Aku', 'Shape-shifting evil'], ['cn_johnny', 'Johnny Bravo', 'Pompadour hero'],
    ['cn_dexter', 'Dexter', 'Boy inventor'], ['cn_deedee', 'Dee Dee', 'Lab chaos'],
    ['cn_mandark', 'Mandark', 'Rival inventor'], ['cn_courage', 'Courage', 'Anxious dog'],
    ['cn_ed', 'Ed', 'Lovable goof'], ['cn_mojo', 'Mojo Jojo', 'Simian schemer'],
  ],
  nineties: [
    ['n90_tommy', 'Tommy Pickles', 'Rugrat'], ['n90_chuckie', 'Chuckie Finster', 'Rugrat'],
    ['n90_angelica', 'Angelica Pickles', 'Rugrat'], ['n90_rocko', 'Rocko Rama', 'Wallaby'],
    ['n90_heffer', 'Heffer Wolfe', 'Party heart'], ['n90_stimpy', 'Stimpy', 'Cat inventor'],
    ['n90_ren', 'Ren Höek', 'Chihuahua'], ['n90_doug', 'Doug Funnie', 'Journal keeper'],
    ['n90_skeeter', 'Skeeter Valentine', 'Best friend'], ['n90_patti', 'Patti Mayonnaise', 'Athlete'],
    ['n90_arnold', 'Arnold Shortman', 'Headline kid'], ['n90_gerald', 'Gerald Johanssen', 'Street smart'],
    ['n90_daria', 'Daria Morgendorffer', 'Deadpan'], ['n90_beavis', 'Beavis', 'Chaos teen'],
    ['n90_butthead', 'Butt-Head', 'Chaos teen'], ['n90_freakazoid', 'Freakazoid', 'Zany hero'],
  ],
  early2000s: [
    ['e00_danny', 'Danny Phantom', 'Half ghost'], ['e00_sam', 'Sam Manson', 'Goth friend'],
    ['e00_tucker', 'Tucker Foley', 'Tech friend'], ['e00_jimmy', 'Jimmy Neutron', 'Boy genius'],
    ['e00_timmy', 'Timmy Turner', 'Fairy wish'], ['e00_cosmo', 'Cosmo', 'Fairy goof'],
    ['e00_wanda', 'Wanda', 'Fairy voice'], ['e00_jenny', 'Jenny Wakeman', 'Robot hero'],
    ['e00_kim', 'Kim Possible', 'Teen agent'], ['e00_ron', 'Ron Stoppable', 'Loyal friend'],
    ['e00_shego', 'Shego', 'Green flame'], ['e00_juni', 'Juniper Lee', 'Monster keeper'],
    ['e00_carmen', 'Carmen Sandiego', 'Master thief'], ['e00_odd', 'Odd', 'Virtual agent'],
    ['e00_oddtodd', 'Odd Todd', 'Virtual villain'], ['e00_digit', 'Digit', 'Cyber bird'],
  ],
  tvshows: [
    ['tv_spongebob', 'SpongeBob', 'Fry cook'], ['tv_patrick', 'Patrick Star', 'Best friend'],
    ['tv_squidward', 'Squidward', 'Clarinet dreamer'], ['tv_sandy', 'Sandy Cheeks', 'Inventor'],
    ['tv_mrkrabs', 'Mr. Krabs', 'Coin captain'], ['tv_plankton', 'Plankton', 'Tiny schemer'],
    ['tv_bugs', 'Bugs Bunny', 'Wisecracker'], ['tv_daffy', 'Daffy Duck', 'Spotlight seeker'],
    ['tv_tom', 'Tom Cat', 'Chaser'], ['tv_jerry', 'Jerry Mouse', 'Quick thinker'],
    ['tv_scooby', 'Scooby-Doo', 'Snack detective'], ['tv_shaggy', 'Shaggy Rogers', 'Snack detective'],
    ['tv_popeye', 'Popeye', 'Sailor strong'], ['tv_betty', 'Betty Boop', 'Jazz icon'],
    ['tv_mickey', 'Mickey Mouse', 'Toon host'], ['tv_donald', 'Donald Duck', 'Loud heart'],
  ],
  sesame: [
    ['ss_bigbird', 'Big Bird', 'Neighbor'], ['ss_cookie', 'Cookie Monster', 'Cookie fan'],
    ['ss_oscar', 'Oscar the Grouch', 'Grouch'], ['ss_grover', 'Grover', 'Helpful monster'],
    ['ss_count', 'Count von Count', 'Counting host'], ['ss_abby', 'Abby Cadabby', 'Fairy friend'],
    ['ss_bert', 'Bert', 'Paperclip collector'], ['ss_ernie', 'Ernie', 'Rubber duck friend'],
    ['ss_rosita', 'Rosita', 'Bilingual friend'], ['ss_telly', 'Telly', 'Thoughtful monster'],
    ['ss_milli', 'Milli', 'Number hero'], ['ss_geo', 'Geo', 'Shape hero'],
    ['ss_bot', 'Bot', 'Team robot'], ['ss_cleo', 'Cleo', 'Big red dog friend'],
    ['ss_tbone', 'T-Bone', 'Big dog buddy'], ['ss_mac', 'Mac', 'Big dog buddy'],
  ],
  powerpuff: [
    ['pp_blossom', 'Blossom', 'Leader hero'], ['pp_bubbles', 'Bubbles', 'Joy hero'],
    ['pp_buttercup', 'Buttercup', 'Tough hero'], ['pp_professor', 'Professor Utonium', 'Creator'],
    ['pp_keane', 'Ms. Keane', 'Teacher'], ['pp_mojo', 'Mojo Jojo', 'Simian schemer'],
    ['pp_him', 'Him', 'Devilish villain'], ['pp_princess', 'Princess Morbucks', 'Rival heiress'],
    ['pp_sedusa', 'Sedusa', 'Master of disguise'], ['pp_fuzzy', 'Fuzzy Lumpkins', 'Backwoods brawler'],
    ['pp_ace', 'Ace', 'Gang leader'], ['pp_snake', 'Snake', 'Gang member'],
    ['pp_brick', 'Brick', 'Rowdyruff leader'], ['pp_boomer', 'Boomer', 'Rowdyruff'],
    ['pp_butch', 'Butch', 'Rowdyruff'], ['pp_msbellum', 'Ms. Bellum', 'City hall'],
  ],
  toonfoods: [
    ['food_krabby', 'Krabby Patty', 'Undersea burger'], ['food_chumbucket', 'Chum Bucket Special', 'Questionable meal'],
    ['food_scoobysnack', 'Scooby Snack', 'Dog biscuit'], ['food_lasagna', 'Garfield Lasagna', 'Layered classic'],
    ['food_simpsondonut', 'Springfield Donut', 'Pink glazed'], ['food_bobsburger', 'Bob’s Burger', 'Daily special'],
    ['food_cookiecat', 'Cookie Cat', 'Ice cream friend'], ['food_baconpancakes', 'Bacon Pancakes', 'Adventure breakfast'],
    ['food_hotwings', 'Regular Show Wings', 'Hot snack'], ['food_chemicalx', 'Chemical X Cupcake', 'Heroic frosting'],
    ['food_sesamecookie', 'Sesame Street Cookie', 'Neighbor cookie'], ['food_umishake', 'Umi Shake', 'Team treat'],
    ['food_bigbone', 'Clifford Big Bone', 'Big dog snack'], ['food_ichiraku', 'Ichiraku Ramen', 'Ninja noodles'],
    ['food_ponyoham', 'Ponyo Ham', 'Warm movie ham'], ['food_acorn', 'Totoro Acorn', 'Forest snack'],
    ['food_dumpling', 'Spirited Dumpling', 'Spirit kitchen'], ['food_luffymeat', 'Luffy Meat', 'Pirate feast'],
    ['food_totoromilk', 'Totoro Milk', 'Country bottle'], ['food_taiyaki', 'Taiyaki', 'Fish-shaped treat'],
  ],
};

(function registerExpansion2() {
  const groupKeys = Object.keys(EXPANSION2_GROUPS);
  const startIndex = Object.keys(CATALOG_GROUPS).length;
  groupKeys.forEach((groupKey, groupIndex) => {
    const group = EXPANSION2_GROUPS[groupKey];
    const entries = EXPANSION2_DEFS[groupKey] || [];
    const newKeys = [];
    CATALOG_GROUPS[groupKey] = group;
    CATALOG_BY_GROUP[groupKey] = [];
    CATALOG_GROUP_KEYS.push(groupKey);
    entries.forEach((row, index) => {
      const [key, name, tag] = row;
      if (!key || !name || ELEMENTS[key]) return;
      const palette = CATALOG_PALETTES[(startIndex + groupIndex * 3 + index) % CATALOG_PALETTES.length];
      const [primary, light, deep, accent] = palette;
      const gene = CATALOG_GENE_POOL[(startIndex + groupIndex * 2 + index) % CATALOG_GENE_POOL.length];
      const motif = group.motifs[index % group.motifs.length];
      ELEMENTS[key] = {
        name, primary, light, deep, accent,
        trait: `${tag} — ${group.blurb.split('.')[0].toLowerCase()}.`,
        blurb: `${name} is a ${tag.toLowerCase()} signature from ${group.label}. ${group.blurb}`,
        greeting: group.greeting, likes: group.likes,
        catalogGroup: groupKey, catalogType: tag, catalogArt: motif, parentTypes: [group.parentType],
      };
      GENE_POWERS[key] = gene;
      TITAN_NAMES[key] = `${name} Titan`;
      TYPE_EGG_BASE_PRICE[key] = group.price;
      TYPE_EGG_PRICE[key] = discountedEggPrice(group.price);
      NAME_START[key] = [name.split(' ')[0], ...name.split(' ').slice(1, 3), 'Ace', 'Star'];
      group.homes.forEach((scene) => {
        if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
      });
      ELEMENT_KEYS.push(key);
      CATALOG_SPECIES.push(key);
      CATALOG_BY_GROUP[groupKey].push(key);
      newKeys.push(key);
    });
    newKeys.forEach((key, index) => {
      const next = newKeys[(index + 1) % newKeys.length];
      if (!next || next === key) return;
      const first = ELEMENTS[key].name.split(' ')[0];
      const second = ELEMENTS[next].name.split(' ')[0];
      HYBRID_NAMES[pairKey(key, next)] = `${group.hybridPrefix} ${first} & ${second}`;
    });
  });
  CATALOG_TOTAL = CATALOG_SPECIES.length;
  LONG_CATALOG_GUIDES.worldwave = groupKeys.slice();
})();
