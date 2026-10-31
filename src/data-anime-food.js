/* Anime kitchen and Trainer pantry: 60 foods plus 16 free snacks. */

const ANIME_FOODS = [
  { key: 'anime_shoyuramen', name: 'Shoyu Ramen', emoji: '🍜', price: 18, hunger: 50, energy: 10, joy: 8, xp: 16, cat: 'meal', anime: true },
  { key: 'anime_tonkotsuramen', name: 'Tonkotsu Ramen', emoji: '🍜', price: 19, hunger: 54, energy: 10, joy: 8, xp: 17, cat: 'meal', anime: true },
  { key: 'anime_misoramen', name: 'Miso Ramen', emoji: '🍜', price: 17, hunger: 48, energy: 10, joy: 8, xp: 15, cat: 'meal', anime: true },
  { key: 'anime_udon', name: 'Moon Udon', emoji: '🍜', price: 16, hunger: 46, energy: 12, joy: 8, xp: 14, cat: 'meal', anime: true },
  { key: 'anime_zarusoba', name: 'Zaru Soba', emoji: '🍜', price: 14, hunger: 38, energy: 12, joy: 6, clean: 4, xp: 12, cat: 'meal', anime: true },
  { key: 'anime_yakisoba', name: 'Festival Yakisoba', emoji: '🍜', price: 15, hunger: 44, energy: 8, joy: 10, xp: 13, cat: 'meal', anime: true },
  { key: 'anime_onigiri', name: 'Triangle Onigiri', emoji: '🍙', price: 7, hunger: 20, joy: 12, bond: 1, xp: 8, cat: 'treat', anime: true },
  { key: 'anime_japanesecurry', name: 'Anime Curry', emoji: '🍛', price: 18, hunger: 54, energy: 12, joy: 8, xp: 16, cat: 'meal', anime: true },
  { key: 'anime_katsucurry', name: 'Katsu Curry', emoji: '🍛', price: 20, hunger: 58, energy: 10, joy: 10, xp: 18, cat: 'meal', anime: true },
  { key: 'anime_omurice', name: 'Omurice', emoji: '🍳', price: 16, hunger: 46, energy: 10, joy: 14, xp: 15, cat: 'meal', anime: true },
  { key: 'anime_takoyaki', name: 'Takoyaki', emoji: '🐙', price: 8, hunger: 16, joy: 18, xp: 9, cat: 'treat', anime: true },
  { key: 'anime_okonomiyaki', name: 'Okonomiyaki', emoji: '🥞', price: 17, hunger: 48, energy: 8, joy: 12, xp: 15, cat: 'meal', anime: true },
  { key: 'anime_taiyaki', name: 'Taiyaki', emoji: '🐟', price: 7, hunger: 14, joy: 20, bond: 1, xp: 9, cat: 'dessert', anime: true },
  { key: 'anime_dorayaki', name: 'Dorayaki', emoji: '🥞', price: 7, hunger: 16, joy: 18, bond: 1, xp: 9, cat: 'dessert', anime: true },
  { key: 'anime_mochi', name: 'Mochi Trio', emoji: '🍡', price: 8, hunger: 12, joy: 22, xp: 10, cat: 'dessert', anime: true },
  { key: 'anime_hanamidango', name: 'Hanami Dango', emoji: '🍡', price: 7, hunger: 12, joy: 20, bond: 2, xp: 9, cat: 'treat', anime: true },
  { key: 'anime_tempura', name: 'Tempura Basket', emoji: '🍤', price: 16, hunger: 42, energy: 8, joy: 10, xp: 14, cat: 'meal', anime: true },
  { key: 'anime_tonkatsu', name: 'Tonkatsu', emoji: '🍖', price: 17, hunger: 48, energy: 8, joy: 8, xp: 15, cat: 'meat', anime: true },
  { key: 'anime_karaage', name: 'Karaage', emoji: '🍗', price: 13, hunger: 36, energy: 6, joy: 10, xp: 12, cat: 'meat', anime: true },
  { key: 'anime_gyoza', name: 'Gyoza', emoji: '🥟', price: 12, hunger: 34, energy: 6, joy: 12, xp: 11, cat: 'meal', anime: true },
  { key: 'anime_yakitori', name: 'Yakitori', emoji: '🍢', price: 11, hunger: 30, energy: 6, joy: 10, xp: 10, cat: 'meat', anime: true },
  { key: 'anime_katsudon', name: 'Katsudon', emoji: '🍚', price: 18, hunger: 52, energy: 10, joy: 10, xp: 16, cat: 'meal', anime: true },
  { key: 'anime_oyakodon', name: 'Oyakodon', emoji: '🍚', price: 17, hunger: 50, energy: 10, joy: 10, xp: 15, cat: 'meal', anime: true },
  { key: 'anime_chahan', name: 'Chahan Fried Rice', emoji: '🍚', price: 14, hunger: 44, energy: 8, joy: 8, xp: 13, cat: 'meal', anime: true },
  { key: 'anime_mapotofu', name: 'Mapo Tofu', emoji: '🌶️', price: 16, hunger: 46, energy: 8, joy: 8, clean: -2, xp: 14, cat: 'meal', anime: true },
  { key: 'anime_hotpot', name: 'Anime Hot Pot', emoji: '🍲', price: 20, hunger: 60, energy: 12, joy: 12, bond: 1, xp: 18, cat: 'meal', anime: true },
  { key: 'anime_bento', name: 'Hero Bento', emoji: '🍱', price: 19, hunger: 55, energy: 12, joy: 14, xp: 17, cat: 'meal', anime: true },
  { key: 'anime_melonpan', name: 'Melon Pan', emoji: '🍈', price: 9, hunger: 20, energy: 4, joy: 18, xp: 10, cat: 'dessert', anime: true },
  { key: 'anime_creampan', name: 'Cream Pan', emoji: '🥐', price: 9, hunger: 20, energy: 4, joy: 18, xp: 10, cat: 'dessert', anime: true },
  { key: 'anime_croquette', name: 'Croquette', emoji: '🥔', price: 10, hunger: 28, energy: 6, joy: 10, xp: 9, cat: 'treat', anime: true },
  { key: 'anime_matcha', name: 'Matcha Latte', emoji: '🍵', price: 9, energy: 28, joy: 12, clean: 4, xp: 9, cat: 'drink', anime: true },
  { key: 'anime_ramune', name: 'Ramune Fizz', emoji: '🥤', price: 8, energy: 24, joy: 16, clean: 2, xp: 8, cat: 'drink', anime: true },
  { key: 'anime_melonsoda', name: 'Melon Soda', emoji: '🥤', price: 8, energy: 24, joy: 18, xp: 8, cat: 'drink', anime: true },
  { key: 'anime_strawberrymilk', name: 'Strawberry Milk', emoji: '🥛', price: 9, hunger: 10, energy: 20, joy: 16, xp: 9, cat: 'drink', anime: true },
  { key: 'anime_royalpudding', name: 'Royal Pudding', emoji: '🍮', price: 10, hunger: 18, joy: 24, bond: 1, xp: 11, cat: 'dessert', anime: true },
  { key: 'anime_parfait', name: 'Anime Parfait', emoji: '🍨', price: 12, hunger: 20, joy: 30, xp: 13, cat: 'dessert', anime: true },
  { key: 'anime_honeytoast', name: 'Honey Toast', emoji: '🍞', price: 11, hunger: 26, joy: 24, xp: 12, cat: 'dessert', anime: true },
  { key: 'anime_fruitsando', name: 'Fruit Sando', emoji: '🥪', price: 10, hunger: 24, joy: 20, clean: 2, xp: 11, cat: 'dessert', anime: true },
  { key: 'anime_crepe', name: 'Strawberry Crepe', emoji: '🥞', price: 11, hunger: 20, joy: 26, xp: 12, cat: 'dessert', anime: true },
  { key: 'anime_mochiice', name: 'Mochi Ice Cream', emoji: '🍧', price: 9, hunger: 12, joy: 24, clean: 4, xp: 10, cat: 'dessert', anime: true },
  { key: 'anime_herocake', name: 'Hero Cake Slice', emoji: '🍰', price: 13, hunger: 26, joy: 28, xp: 14, cat: 'dessert', anime: true },
  { key: 'anime_souffle', name: 'Souffle Pancakes', emoji: '🥞', price: 15, hunger: 40, energy: 10, joy: 22, xp: 14, cat: 'dessert', anime: true },
];

const TRAINER_FOODS = [
  { key: 'trainer_pokepuff', name: 'Poké Puff', emoji: '🧁', price: 8, hunger: 16, joy: 18, bond: 1, xp: 9, cat: 'treat', trainer: true },
  { key: 'trainer_poffin', name: 'Berry Poffin', emoji: '🍪', price: 9, hunger: 18, energy: 8, joy: 16, bond: 1, xp: 10, cat: 'treat', trainer: true },
  { key: 'trainer_malasada', name: 'Alolan Malasada', emoji: '🍩', price: 10, hunger: 24, joy: 20, xp: 11, cat: 'dessert', trainer: true },
  { key: 'trainer_bigmalasada', name: 'Big Malasada', emoji: '🍩', price: 16, hunger: 44, joy: 24, xp: 15, cat: 'dessert', trainer: true },
  { key: 'trainer_casteliacone', name: 'Casteliacone', emoji: '🍦', price: 8, hunger: 12, joy: 24, clean: 4, xp: 10, cat: 'dessert', trainer: true },
  { key: 'trainer_lumiosegalette', name: 'Lumiose Galette', emoji: '🥮', price: 11, hunger: 22, joy: 22, xp: 12, cat: 'dessert', trainer: true },
  { key: 'trainer_oldgateau', name: 'Old Gateau', emoji: '🍫', price: 12, hunger: 20, joy: 26, bond: 1, xp: 13, cat: 'dessert', trainer: true },
  { key: 'trainer_ragecandybar', name: 'Rage Candy Bar', emoji: '🍫', price: 6, hunger: 16, energy: 8, joy: 18, xp: 8, cat: 'treat', trainer: true },
  { key: 'trainer_lavacookie', name: 'Lava Cookie', emoji: '🍪', price: 8, hunger: 16, joy: 20, clean: 2, xp: 9, cat: 'dessert', trainer: true },
  { key: 'trainer_pewtercrunchies', name: 'Pewter Crunchies', emoji: '🍘', price: 7, hunger: 22, joy: 12, xp: 9, cat: 'treat', trainer: true },
  { key: 'trainer_shaloursable', name: 'Shalour Sable', emoji: '🍪', price: 9, hunger: 18, joy: 20, xp: 10, cat: 'dessert', trainer: true },
  { key: 'trainer_moomoomilk', name: 'Moomoo Milk', emoji: '🥛', price: 10, hunger: 14, energy: 26, joy: 10, clean: 4, xp: 10, cat: 'drink', trainer: true },
  { key: 'trainer_freshwater', name: 'Fresh Water', emoji: '💧', price: 5, energy: 20, clean: 4, xp: 5, cat: 'drink', trainer: true },
  { key: 'trainer_sodapop', name: 'Soda Pop', emoji: '🥤', price: 7, energy: 24, joy: 12, clean: -2, xp: 7, cat: 'drink', trainer: true },
  { key: 'trainer_berryjuice', name: 'Berry Juice', emoji: '🧃', price: 8, hunger: 8, energy: 22, joy: 10, xp: 8, cat: 'drink', trainer: true },
  { key: 'trainer_sweetheart', name: 'Sweet Heart', emoji: '💗', price: 6, hunger: 8, joy: 20, bond: 1, xp: 8, cat: 'treat', trainer: true },
  { key: 'trainer_energyroot', name: 'Energy Root', emoji: '🌱', price: 9, hunger: 30, energy: 12, xp: 8, cat: 'veg', trainer: true },
  { key: 'trainer_revivalherb', name: 'Revival Herb', emoji: '🌿', price: 12, hunger: 26, energy: 20, clean: 4, xp: 9, cat: 'veg', trainer: true },
];

const ANIME_SNACKS = [
  { key: 'anime_senbei', name: 'Anime Senbei', emoji: '🍘', hunger: 14, joy: 8, xp: 9, desc: '+14 food · +8 joy', cat: 'savory', anime: true },
  { key: 'anime_sakuramochi', name: 'Sakura Mochi', emoji: '🌸', hunger: 10, joy: 14, bond: 1, xp: 10, desc: '+10 food · +14 joy', cat: 'sweet', anime: true },
];

const TRAINER_SNACKS = [
  { key: 'trainer_oranberry', name: 'Oran Berry', emoji: '🫐', hunger: 12, joy: 4, xp: 8, desc: '+12 food · +4 joy', cat: 'fresh', trainer: true },
  { key: 'trainer_sitrusberry', name: 'Sitrus Berry', emoji: '🍊', hunger: 18, energy: 8, joy: 2, xp: 10, desc: '+18 food · +8 rest', cat: 'fresh', trainer: true },
  { key: 'trainer_cheriberry', name: 'Cheri Berry', emoji: '🍒', hunger: 8, energy: 8, joy: 6, xp: 9, desc: '+8 food · +8 rest', cat: 'fresh', trainer: true },
  { key: 'trainer_pechaberry', name: 'Pecha Berry', emoji: '🍑', hunger: 10, joy: 8, xp: 9, desc: '+10 food · +8 joy', cat: 'fresh', trainer: true },
  { key: 'trainer_rawstberry', name: 'Rawst Berry', emoji: '🫐', hunger: 10, clean: 4, xp: 9, desc: '+10 food · +4 clean', cat: 'fresh', trainer: true },
  { key: 'trainer_aspearberry', name: 'Aspear Berry', emoji: '🍐', hunger: 10, energy: 6, clean: 2, xp: 9, desc: '+10 food · +6 rest', cat: 'fresh', trainer: true },
  { key: 'trainer_leppaberry', name: 'Leppa Berry', emoji: '🍎', energy: 16, joy: 4, xp: 10, desc: '+16 rest · +4 joy', cat: 'fresh', trainer: true },
  { key: 'trainer_lumberry', name: 'Lum Berry', emoji: '🍈', hunger: 14, joy: 6, clean: 8, xp: 12, desc: '+14 food · +8 clean', cat: 'fresh', trainer: true },
  { key: 'trainer_nomelberry', name: 'Nomel Berry', emoji: '🍋', hunger: 12, energy: 4, joy: 4, xp: 9, desc: '+12 food · +4 rest', cat: 'fresh', trainer: true },
  { key: 'trainer_tamatoberry', name: 'Tamato Berry', emoji: '🍅', hunger: 14, energy: 8, clean: -2, xp: 10, desc: '+14 food · +8 rest', cat: 'fresh', trainer: true },
  { key: 'trainer_starfberry', name: 'Starf Berry', emoji: '⭐', hunger: 8, joy: 20, bond: 2, xp: 14, desc: '+8 food · +20 joy', cat: 'sweet', trainer: true },
  { key: 'trainer_enigmaberry', name: 'Enigma Berry', emoji: '🔮', hunger: 10, energy: 12, joy: 8, xp: 14, desc: '+10 food · +12 rest', cat: 'sweet', trainer: true },
  { key: 'trainer_pokebean', name: 'Poké Bean', emoji: '🫘', hunger: 16, joy: 8, bond: 1, xp: 10, desc: '+16 food · +bond', cat: 'savory', trainer: true },
  { key: 'trainer_pokeblock', name: 'Pokéblock', emoji: '🍬', hunger: 10, joy: 14, bond: 1, xp: 11, desc: '+10 food · +14 joy', cat: 'sweet', trainer: true },
];

function foodGuideDesc(item) {
  const bits = [];
  if (item.hunger) bits.push(`+${item.hunger} food`);
  if (item.energy) bits.push(`+${item.energy} rest`);
  if (item.joy) bits.push(`+${item.joy} joy`);
  if (item.clean) bits.push(`${item.clean > 0 ? '+' : ''}${item.clean} clean`);
  if (item.bond) bits.push('+bond');
  return bits.length ? bits.join(' · ') : 'A tiny, perfect snack.';
}

function foodDietPath(item) {
  if (item.cat === 'meal' || item.cat === 'meat' || item.cat === 'veg') return 'hearty';
  if (item.cat === 'dessert' || item.cat === 'treat') return 'sweet';
  return 'wild';
}

const ANIME_TRAINER_FOOD_KEYS = [];
[...ANIME_FOODS, ...TRAINER_FOODS].forEach((entry) => {
  if (FOODS[entry.key]) return;
  const food = { ...entry, id: entry.key, desc: foodGuideDesc(entry) };
  delete food.key;
  FOODS[entry.key] = food;
  FOOD_DIET[entry.key] = { path: foodDietPath(food), gain: food.price >= 16 ? 2 : 1 };
  FOOD_KEYS.push(entry.key);
  ANIME_TRAINER_FOOD_KEYS.push(entry.key);
});

const ANIME_TRAINER_SNACK_KEYS = [];
[...ANIME_SNACKS, ...TRAINER_SNACKS].forEach((entry) => {
  if (SNACKS[entry.key]) return;
  const snack = { ...entry, id: entry.key };
  delete snack.key;
  SNACKS[entry.key] = snack;
  SNACK_KEYS.push(entry.key);
  ANIME_TRAINER_SNACK_KEYS.push(entry.key);
});

const ANIME_KITCHEN_KEYS = ANIME_TRAINER_FOOD_KEYS.filter((key) => FOODS[key].anime);
const TRAINER_KITCHEN_KEYS = ANIME_TRAINER_FOOD_KEYS.filter((key) => FOODS[key].trainer);
const ANIME_TRAINER_SNACK_TOTAL = ANIME_TRAINER_SNACK_KEYS.length;
