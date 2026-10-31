/* Arcade rewards: bonus gifts, monthly gift tiers, and the stage-up feast. */

const ARCADE_GAME_KEYS = ['rune', 'zombie', 'duel'];
const ARCADE_BONUS_STEP = 5000;
const ARCADE_BONUS_FEAST_EVERY = 3;
const STARPATH_FOOD_ID = 'starpath';

const ARCADE_MONTH_GIFTS = [
  {
    id: 'month-trail',
    label: 'Trail Gift',
    icon: '🎁',
    at: 5000,
    coins: 250,
    foods: 2,
    snacks: 2,
    feasts: 0,
    blurb: 'A pantry bundle for the road.',
  },
  {
    id: 'month-starpath',
    label: 'Starpath Gift',
    icon: '🌟',
    at: 12000,
    coins: 450,
    foods: 2,
    snacks: 2,
    feasts: 1,
    blurb: 'Includes a Starpath Feast for one growth stage.',
  },
  {
    id: 'month-grand',
    label: 'Grand Month Gift',
    icon: '👑',
    at: 25000,
    coins: 900,
    foods: 3,
    snacks: 3,
    feasts: 2,
    blurb: 'The big monthly haul, with two Starpath Feasts.',
  },
];

const ARCADE_FOODS = {
  [STARPATH_FOOD_ID]: {
    id: STARPATH_FOOD_ID,
    name: 'Starpath Feast',
    emoji: '🌟',
    price: 0,
    hunger: 20,
    joy: 24,
    bond: 2,
    xp: 0,
    desc: 'Feeds one full growth stage · +20 food · +24 joy',
    cat: 'meal',
    giftOnly: true,
    stageBoost: true,
  },
};

Object.assign(FOODS, ARCADE_FOODS);
FOOD_DIET[STARPATH_FOOD_ID] = { path: 'sweet', gain: 2 };
if (!FOOD_KEYS.includes(STARPATH_FOOD_ID)) FOOD_KEYS.push(STARPATH_FOOD_ID);

function arcadeGameKind(kind) {
  return typeof ARCADE_GAME_KEYS !== 'undefined' && ARCADE_GAME_KEYS.includes(kind);
}

function arcadeNextBonusAt(arcade = state.arcade) {
  const claims = Math.max(0, Number(arcade?.bonusClaims) || 0);
  return ARCADE_BONUS_STEP * (claims + 1);
}

function arcadeMonthGift(id) {
  return ARCADE_MONTH_GIFTS.find((gift) => gift.id === id) || null;
}
