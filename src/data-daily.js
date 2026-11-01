/* Daily events: the Daily Egg Gift lets you choose any sprite egg once a day. */

const DAILY_EGG_GIFT = {
  name: 'Daily Egg Gift',
  icon: '🥚',
  blurb: 'Every day the Hollow leaves one wrapped egg on the doorstep, and you choose the sprite inside.',
};

function dailyEggPool() {
  return ELEMENT_KEYS.filter((key) => ELEMENTS[key] && !isSecretSpecies(key));
}

function dailyEggFeatured(date = new Date()) {
  const pool = dailyEggPool();
  if (!pool.length) return 'bloom';
  const rnd = seedRandom(`daily-egg-${dayKey(date)}`);
  return pool[Math.floor(rnd() * pool.length)] || pool[0];
}

function dailyEggClaimed(date = new Date()) {
  return state?.eggGift?.date === dayKey(date);
}

function dailyEggClaimedKey(date = new Date()) {
  return dailyEggClaimed(date) ? state.eggGift.key : null;
}
