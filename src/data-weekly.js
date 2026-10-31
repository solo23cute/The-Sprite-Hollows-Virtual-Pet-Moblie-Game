/* Weekly Hollow events. One claim per event per calendar week.
   The Today screen and the XP/coin/gift helpers read these live. */

const WEEKLY_EVENTS = [
  {
    day: 1, key: 'monday-momentum', dayLabel: 'Monday',
    name: 'Momentum Monday', icon: '⚡', color: '#ffd166',
    blurb: 'A bright start to the week: extra XP, a little extra coin, and a starter crate.',
    effects: { xp: 1.5, coins: 1.25 },
    reward: { kind: 'boost', coins: 90, snacks: 2 },
  },
  {
    day: 2, key: 'tuesday-meals', dayLabel: 'Tuesday',
    name: 'Meal Train Tuesday', icon: '🍲', color: '#8fe07a',
    blurb: 'Every meal in the pantry becomes free for the day, with a small XP and bond lift.',
    effects: { xp: 1.1, bond: 1.2 },
    reward: { kind: 'food', foodCats: ['meal'], coins: 60 },
  },
  {
    day: 3, key: 'wednesday-desserts', dayLabel: 'Wednesday',
    name: 'Dessert Moon Wednesday', icon: '🍰', color: '#ff9ec7',
    blurb: 'Every dessert is free, and the whole Hollow gets a softer XP boost.',
    effects: { xp: 1.15 },
    reward: { kind: 'food', foodCats: ['dessert'], coins: 60 },
  },
  {
    day: 4, key: 'thursday-drinks', dayLabel: 'Thursday',
    name: 'Thirsty Thursday', icon: '🥤', color: '#8be9ff',
    blurb: 'All drinks are free, and gifts arrive sooner while the bar is open.',
    effects: { giftSpeed: 1.35 },
    reward: { kind: 'food', foodCats: ['drink'], coins: 60 },
  },
  {
    day: 5, key: 'friday-vault', dayLabel: 'Friday',
    name: 'Vault Rescue Friday', icon: '🔐', color: '#ff7597',
    blurb: 'Every missing Secret Vault sprite comes home. If the Vault is already complete, take a coin crown instead.',
    effects: { xp: 1.25 },
    reward: { kind: 'vault', coins: 100 },
  },
  {
    day: 6, key: 'saturday-crates', dayLabel: 'Saturday',
    name: 'Crate Catch-Up Saturday', icon: '📦', color: '#c9a6ff',
    blurb: 'Open every unclaimed event crate from this week, plus the monthly crate if it is still sealed.',
    effects: { coins: 1.25 },
    reward: { kind: 'crates', coins: 100, snacks: 2 },
  },
  {
    day: 0, key: 'sunday-feast', dayLabel: 'Sunday',
    name: 'Grand Feast Sunday', icon: '🌟', color: '#ffd166',
    blurb: 'The week ends with double XP, faster gifts, and every meal, dessert, and drink free.',
    effects: { xp: 2, coins: 1.5, giftSpeed: 1.2, bond: 1.25 },
    reward: { kind: 'food', foodCats: ['meal', 'dessert', 'drink'], coins: 200 },
  },
];

const WEEKLY_EVENT_BY_KEY = Object.fromEntries(WEEKLY_EVENTS.map((event) => [event.key, event]));

function weeklyEventForWeekday(weekday) {
  return WEEKLY_EVENTS.find((event) => event.day === weekday) || null;
}

function weeklyEventForDate(date = new Date()) {
  return weeklyEventForWeekday(date.getDay());
}

function weeklyEventFor(index) {
  return WEEKLY_EVENTS[index] || null;
}
