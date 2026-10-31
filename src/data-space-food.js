/* Space Kitchen foods. Loaded after data.js and merged into the normal pantry. */

const SPACE_FOODS = {
  space_meteor: { id: 'space_meteor', name: 'Meteor Meatball', emoji: '☄️', price: 24, hunger: 48, energy: 12, joy: 8, xp: 18, desc: '+48 food · +12 rest · orbital spice', cat: 'space' },
  space_nebula: { id: 'space_nebula', name: 'Nebula Noodles', emoji: '🍜', price: 28, hunger: 52, energy: 14, joy: 12, xp: 20, desc: '+52 food · +14 rest · starlight broth', cat: 'space' },
  space_lunar: { id: 'space_lunar', name: 'Lunar Loaf', emoji: '🍞', price: 20, hunger: 42, joy: 10, xp: 16, desc: '+42 food · +10 joy · moonrise crust', cat: 'space' },
  space_starsorbet: { id: 'space_starsorbet', name: 'Star Sorbet', emoji: '🍧', price: 26, hunger: 22, joy: 34, xp: 19, desc: '+22 food · +34 joy · comet chill', cat: 'space' },
  space_saturn: { id: 'space_saturn', name: 'Saturn Ring', emoji: '🍩', price: 22, hunger: 28, joy: 28, xp: 17, desc: '+28 food · +28 joy · ring-shaped', cat: 'space' },
  space_comet: { id: 'space_comet', name: 'Comet Pop', emoji: '🍭', price: 18, joy: 34, bond: 2, xp: 15, desc: '+34 joy · +bond · fizzing tail', cat: 'space' },
  space_asteroid: { id: 'space_asteroid', name: 'Asteroid Stew', emoji: '🍲', price: 32, hunger: 58, energy: 16, joy: 8, xp: 22, desc: '+58 food · +16 rest · meteor herbs', cat: 'space' },
  space_galaxy: { id: 'space_galaxy', name: 'Galaxy Dumpling', emoji: '🥟', price: 30, hunger: 44, joy: 20, xp: 21, desc: '+44 food · +20 joy · spiral filling', cat: 'space' },
  space_rocket: { id: 'space_rocket', name: 'Rocket Ramen', emoji: '🍜', price: 34, hunger: 56, energy: 18, joy: 12, xp: 23, desc: '+56 food · +18 rest · launch-day noodles', cat: 'space' },
  space_cosmiccurry: { id: 'space_cosmiccurry', name: 'Cosmic Curry', emoji: '🍛', price: 36, hunger: 60, energy: 14, joy: 10, xp: 24, desc: '+60 food · +14 rest · nebula spice', cat: 'space' },
  space_berry: { id: 'space_berry', name: 'Nebula Berries', emoji: '🫐', price: 16, hunger: 24, joy: 18, clean: 4, xp: 14, desc: '+24 food · +18 joy · zero-g sweetness', cat: 'space' },
  space_solar: { id: 'space_solar', name: 'Solar Flare Soup', emoji: '🌞', price: 38, hunger: 54, energy: 22, joy: 14, xp: 26, desc: '+54 food · +22 rest · warm corona', cat: 'space' },
  space_alienfruit: { id: 'space_alienfruit', name: 'Alien Fruit', emoji: '🍈', price: 17, hunger: 26, energy: 12, joy: 16, xp: 15, desc: '+26 food · +16 joy · impossible seeds', cat: 'space' },
  space_mooncheese: { id: 'space_mooncheese', name: 'Moon Cheese', emoji: '🧀', price: 21, hunger: 30, energy: 10, joy: 20, xp: 17, desc: '+30 food · +20 joy · crater-aged', cat: 'space' },
  space_zerogcake: { id: 'space_zerogcake', name: 'Zero-G Cake', emoji: '🎂', price: 29, hunger: 28, joy: 32, bond: 3, xp: 20, desc: '+28 food · +32 joy · floats slightly', cat: 'space' },
  space_orbitomelet: { id: 'space_orbitomelet', name: 'Orbit Omelet', emoji: '🍳', price: 25, hunger: 46, energy: 16, xp: 18, desc: '+46 food · +16 rest · breakfast in orbit', cat: 'space' },
};

Object.assign(FOODS, SPACE_FOODS);
FOOD_KEYS.push(...Object.keys(SPACE_FOODS));
FOOD_CATEGORIES.space = { name: 'Space Kitchen', icon: '🚀' };
const SPACE_FOOD_KEYS = Object.keys(SPACE_FOODS);
