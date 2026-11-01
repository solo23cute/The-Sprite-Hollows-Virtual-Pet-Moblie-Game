/* Game state, persistence, real-time simulation, and all player actions. */

const SAVE_KEY = 'sprite-hollow.save.v2';
const MAX_LEVEL = 1000;
const TRAVEL_COINS = 10;

const CUSTOM_CLOTH_STYLES = {
  cape: { name: 'Cape', icon: '🦸' },
  scarf: { name: 'Scarf', icon: '🧣' },
  hoodie: { name: 'Hoodie', icon: '🧥' },
  vest: { name: 'Vest', icon: '🎽' },
  dress: { name: 'Dress', icon: '👗' },
  armor: { name: 'Armor', icon: '🛡️' },
  hat: { name: 'Hat', icon: '🎩' },
  boots: { name: 'Boots', icon: '👢' },
};
const CUSTOM_CLOTH_STYLE_KEYS = Object.keys(CUSTOM_CLOTH_STYLES);

function safeHexColor(value, fallback) {
  const text = String(value || '').trim();
  return /^#[0-9a-f]{6}$/i.test(text) ? text : fallback;
}

function normalizeCustomCloth(raw) {
  const s = raw && typeof raw === 'object' ? raw : {};
  const name = String(s.name || '').trim().slice(0, 24);
  return {
    id: String(s.id || uid('cloth')).replace(/[^a-zA-Z0-9_-]/g, '') || uid('cloth'),
    name: name || 'Custom outfit',
    style: CUSTOM_CLOTH_STYLES[s.style] ? s.style : 'cape',
    primary: safeHexColor(s.primary, '#8b7bff'),
    secondary: safeHexColor(s.secondary, '#ffd166'),
    createdAt: Number(s.createdAt) || Date.now(),
  };
}

function normalizeCustomScene(raw) {
  const s = raw && typeof raw === 'object' ? raw : {};
  const name = String(s.name || '').trim().slice(0, 28);
  const habitat = String(s.habitat || '').trim().slice(0, 20);
  const id = String(s.id || uid('scene')).replace(/[^a-zA-Z0-9_-]/g, '') || uid('scene');
  return {
    id,
    name: name || 'My Biome',
    habitat: habitat || 'Custom',
    emoji: String(s.emoji || '🌍').trim().slice(0, 4) || '🌍',
    sky: safeHexColor(s.sky, '#3b2f6b'),
    ground: safeHexColor(s.ground, '#35603d'),
    accent: safeHexColor(s.accent, '#ffd166'),
    bonus: s.bonus === 0.4 || s.bonus === 0.45 ? s.bonus : 0.5,
    custom: true,
    allSprites: true,
    unlocked: true,
    species: [],
    blurb: 'A custom environment made by you. Every sprite is welcome here, without a resident limit.',
    createdAt: Number(s.createdAt) || Date.now(),
  };
}

function registerCustomScene(raw) {
  const scene = normalizeCustomScene(raw);
  if (!scene || !scene.id) return null;
  SCENES[scene.id] = scene;
  if (!SCENE_KEYS.includes(scene.id)) SCENE_KEYS.push(scene.id);
  return scene;
}

function unregisterCustomScene(id) {
  delete SCENES[id];
  const idx = SCENE_KEYS.indexOf(id);
  if (idx >= 0) SCENE_KEYS.splice(idx, 1);
}

function freshState() {
  return {
    v: 2,
    started: false,
    createdAt: Date.now(),
    hollowName: 'Mosslight Hollow',
    coins: 160,
    sprites: [],
    activeId: null,
    theme: { ui: 'prism', scene: 'grove', sound: true, motion: true, haptics: true, voice: true, voiceType: 'female', language: 'en', captions: true },
    world: { climate: 'temperate', weather: null },
    wardrobe: [],
    customClothes: [],
    customScenes: [],
    foodUnlocks: [],
    daily: null,
    weekly: null,
    monthly: null,
    weeklyEvents: { weekKey: null, claims: [] },
    arcade: { coins: 0, bonusClaims: 0, monthKey: null, monthCoins: 0, monthClaims: [] },
    checkin: {
      last: null, streak: 0,
      slotsDate: null, slots: [],
      weekKey: null, weekSlots: 0, weekClaims: [], weekStreak: 0,
      monthKey: null, monthDays: 0, monthSlots: 0, monthClaims: [], monthStreak: 0,
      yearKey: null, yearDays: 0, yearSlots: 0, yearClaims: [], yearStreak: 0,
      monthCrateKey: null,
    },
    inventory: { snacks: {}, foods: {} },
    unlockedScenes: SCENE_KEYS.filter((k) => SCENES[k].unlocked),
    homes: {},
    houses: {},
    homeUpgrades: {},
    biomeQuests: {},
    roomLayout: {},
    roomTheme: 'honey',
    customGuardians: [],
    vaultDoors: [],
    guardiansBeaten: {},
    gift: null,
    care: { tokens: 0, gifts: 0 },
    journal: [],
    stats: {
      pets: 0, feeds: 0, baths: 0, naps: 0, chats: 0, games: 0,
      merges: 0, hatches: 0, earned: 0, spent: 0, bestGame: 0, bestStreak: 0,
      checkins: 0, twins: 0, specials: 0, evolves: 0, gifts: 0, wild: 0, tucks: 0, shinies: 0, candyMorphs: 0,
      walks: 0, walkDistance: 0, bestWalk: 0, walkGifts: 0, sports: 0, sportGifts: 0,
      arcadeCoins: 0, arcadeGifts: 0, arcadeMonthGifts: 0, careGifts: 0, quests: 0, duels: 0, travels: 0,
      rubs: 0, throws: 0, catches: 0, tasksClaimed: 0, rebirths: 0,
      dailyEggs: 0, holidayGifts: 0, weekendGifts: 0,
    },
    seen: { intro: false, tour: false },
    secretUnlocks: [],
    codeRedeems: {},
    biomesVisited: [],
    eggGift: null,
    holidayGift: null,
    weekendGift: null,
    lastTick: Date.now(),
  };
}

function normalizeSprite(raw) {
  const s = raw || {};
  const level = clamp(Number(s.level) || 1, 1, MAX_LEVEL);
  return {
    id: s.id || uid('sp'),
    name: s.name || null,
    element: ELEMENTS[s.element] ? s.element : 'bloom',
    hybrid: s.hybrid || null,
    hybridParents: s.hybridParents || null,
    breed: BREEDS[s.breed] ? s.breed : 'puff',
    palette: s.palette || 'native',
    custom: s.custom || null,
    pattern: PATTERNS[s.pattern] ? s.pattern : 'plain',
    accessory: ACCESSORIES[s.accessory] ? s.accessory : 'none',
    outfit: typeof s.outfit === 'string' && s.outfit ? s.outfit : null,
    personality: PERSONALITIES[s.personality] ? s.personality : 'sunny',
    gender: GENDERS[s.gender] ? s.gender : genderFromId(s.id),
    mutation: s.mutation || null,
    variant: FINISHES[s.variant] ? s.variant : null,
    shiny: !!s.shiny,
    size: SIZES[s.size] ? s.size : 'standard',
    diet: {
      hearty: Math.max(0, Number(s.diet?.hearty) || 0),
      sweet: Math.max(0, Number(s.diet?.sweet) || 0),
      eerie: Math.max(0, Number(s.diet?.eerie) || 0),
      wild: Math.max(0, Number(s.diet?.wild) || 0),
    },
    sugar: Math.min(2, Math.max(0, Number(s.sugar) || 0)),
    rarityBoost: Math.max(0, Math.min(RARITY_BOOST_MAX, Math.floor(Number(s.rarityBoost) || 0))),
    form: EVOLUTION_FORMS[s.form] ? s.form : null,
    special: COMBOS.some((c) => c.id === s.special) ? s.special : null,
    evolvedAt: Number(s.evolvedAt) || 0,
    stage: ['egg', 'baby', 'juvenile', 'sprite', 'elder'].includes(s.stage) ? s.stage : 'baby',
    level,
    xp: level >= MAX_LEVEL ? 0 : Math.max(0, Number(s.xp) || 0),
    bond: clamp(Number(s.bond) || 0),
    gen: Number(s.gen) || 0,
    needs: {
      hunger: clamp(Number(s.needs?.hunger) ?? 70),
      energy: clamp(Number(s.needs?.energy) ?? 72),
      joy: clamp(Number(s.needs?.joy) ?? 70),
      clean: clamp(Number(s.needs?.clean) ?? 78),
    },
    hatch: clamp(Number(s.hatch) || 0),
    born: s.born || Date.now(),
    asleep: !!s.asleep,
    sleepUntil: Number(s.sleepUntil) || 0,
    sleepStart: Number(s.sleepStart) || (s.asleep ? Math.max(0, (Number(s.sleepUntil) || 0) - NAP_MS) : 0),
    sleepCycles: s.asleep ? clamp(Number(s.sleepCycles) || 1, 1, SLEEP_CYCLES) : 0,
    lastDream: s.lastDream && typeof s.lastDream === 'object' && s.lastDream.text
      ? { text: String(s.lastDream.text), at: Number(s.lastDream.at) || Date.now(), cycles: Math.max(1, Number(s.lastDream.cycles) || 1) }
      : null,
    lastPet: Number(s.lastPet) || 0,
    lastChatReward: Number(s.lastChatReward) || 0,
    restUntil: Number(s.restUntil) || 0,
    lineage: s.lineage || null,
    starter: !!s.starter,
    retired: !!s.retired,
    retiredAt: Number(s.retiredAt) || 0,
    eggLabel: s.eggLabel || null,
    rebirths: Math.max(0, Number(s.rebirths) || 0),
    atHome: !!s.atHome,
    homeSince: Number(s.homeSince) || 0,
    homeCoins: Math.max(0, Number(s.homeCoins) || 0),
    sharedHouse: typeof s.sharedHouse === 'string' && s.sharedHouse ? s.sharedHouse : null,
  };
}

function loadState() {
  const base = freshState();
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    const merged = { ...base, ...parsed };
    merged.theme = { ...base.theme, ...(parsed.theme || {}) };
    merged.theme.voiceType = ['female', 'male'].includes(merged.theme.voiceType) ? merged.theme.voiceType : 'female';
    merged.theme.language = ['en', 'es', 'fr'].includes(merged.theme.language) ? merged.theme.language : 'en';
    merged.theme.captions = merged.theme.captions !== false;
    merged.customClothes = (Array.isArray(parsed.customClothes) ? parsed.customClothes : []).map(normalizeCustomCloth);
    merged.customScenes = (Array.isArray(parsed.customScenes) ? parsed.customScenes : []).map(normalizeCustomScene);
    merged.customScenes.forEach(registerCustomScene);
    if (!SCENES[merged.theme.scene]) merged.theme.scene = 'grove';
    merged.stats = { ...base.stats, ...(parsed.stats || {}) };
    merged.checkin = { ...base.checkin, ...(parsed.checkin || {}) };
    merged.checkin.slots = Array.isArray(parsed.checkin?.slots) ? parsed.checkin.slots : [];
    merged.checkin.weekClaims = Array.isArray(parsed.checkin?.weekClaims) ? parsed.checkin.weekClaims : [];
    merged.checkin.monthClaims = Array.isArray(parsed.checkin?.monthClaims) ? parsed.checkin.monthClaims : [];
    merged.checkin.yearClaims = Array.isArray(parsed.checkin?.yearClaims) ? parsed.checkin.yearClaims : [];
    merged.seen = { ...base.seen, ...(parsed.seen || {}) };
    merged.secretUnlocks = Array.from(new Set((Array.isArray(parsed.secretUnlocks) ? parsed.secretUnlocks : [])
      .filter((k) => SECRET_SPECIES_META[k])));
    merged.codeRedeems = parsed.codeRedeems && typeof parsed.codeRedeems === 'object' ? parsed.codeRedeems : {};
    merged.biomesVisited = Array.from(new Set((Array.isArray(parsed.biomesVisited) ? parsed.biomesVisited : [])
      .filter((k) => isTypeBiomeScene(k))));
    merged.eggGift = parsed.eggGift && typeof parsed.eggGift === 'object' && parsed.eggGift.date
      ? { date: String(parsed.eggGift.date), key: ELEMENTS[parsed.eggGift.key] ? parsed.eggGift.key : null }
      : null;
    merged.holidayGift = parsed.holidayGift && typeof parsed.holidayGift === 'object' && parsed.holidayGift.date
      ? {
        date: String(parsed.holidayGift.date),
        holiday: HOLIDAYS[parsed.holidayGift.holiday] ? parsed.holidayGift.holiday : null,
        key: ELEMENTS[parsed.holidayGift.key] ? parsed.holidayGift.key : null,
      }
      : null;
    merged.weekendGift = parsed.weekendGift && typeof parsed.weekendGift === 'object' && parsed.weekendGift.week
      ? {
        week: String(parsed.weekendGift.week),
        event: typeof WEEKEND_ADMIN_EVENTS !== 'undefined' && WEEKEND_ADMIN_EVENTS.some((e) => e.key === parsed.weekendGift.event) ? parsed.weekendGift.event : null,
        key: ELEMENTS[parsed.weekendGift.key] ? parsed.weekendGift.key : null,
      }
      : null;
    merged.inventory = {
      snacks: { ...(parsed.inventory?.snacks || {}) },
      foods: { ...(parsed.inventory?.foods || {}) },
    };
    merged.world = {
      climate: CLIMATES[parsed.world?.climate] ? parsed.world.climate : 'temperate',
      weather: WEATHERS[parsed.world?.weather] ? parsed.world.weather : null,
    };
    merged.homes = {};
    Object.entries(parsed.homes && typeof parsed.homes === 'object' ? parsed.homes : {}).forEach(([spriteId, sceneKey]) => {
      if (SCENES[sceneKey]) merged.homes[spriteId] = sceneKey;
    });
    merged.houses = {};
    Object.entries(parsed.houses && typeof parsed.houses === 'object' ? parsed.houses : {}).forEach(([houseId, house]) => {
      if (!house || typeof house !== 'object') return;
      const members = Array.isArray(house.members) ? house.members.filter((id) => typeof id === 'string') : [];
      if (members.length < 2) return;
      merged.houses[houseId] = {
        id: houseId,
        name: house.name ? String(house.name).slice(0, 48) : null,
        scene: SCENES[house.scene] ? house.scene : null,
        members: members.slice(0, 4),
        bond: Math.max(0, Number(house.bond) || 0),
        milestone: Math.max(100, Number(house.milestone) || 100),
        lastBondAt: Number(house.lastBondAt) || 0,
        lastPlayAt: Number(house.lastPlayAt) || 0,
        formedAt: Number(house.formedAt) || Date.now(),
      };
    });
    merged.homeUpgrades = {};
    Object.entries(parsed.homeUpgrades && typeof parsed.homeUpgrades === 'object' ? parsed.homeUpgrades : {}).forEach(([id, on]) => {
      if (on && /^[a-z][a-zA-Z0-9]{1,24}$/.test(id)) merged.homeUpgrades[id] = true;
    });
    merged.guardiansBeaten = {};
    Object.entries(parsed.guardiansBeaten && typeof parsed.guardiansBeaten === 'object' ? parsed.guardiansBeaten : {}).forEach(([id, count]) => {
      if (!ELEMENTS[id]) return;
      merged.guardiansBeaten[id] = Math.max(0, Math.floor(Number(count) || 0));
    });
    merged.roomTheme = typeof HOME_ROOM_THEME_KEYS !== 'undefined' && HOME_ROOM_THEME_KEYS.includes(parsed.roomTheme) ? parsed.roomTheme : 'honey';
    merged.customGuardians = Array.from(new Set((Array.isArray(parsed.customGuardians) ? parsed.customGuardians : [])
      .filter((key) => typeof customGuardianDef === 'function' && customGuardianDef(key))));
    merged.vaultDoors = Array.from(new Set((Array.isArray(parsed.vaultDoors) ? parsed.vaultDoors : [])
      .filter((id) => typeof guardianVaultDoor === 'function' && guardianVaultDoor(id))));
    if (typeof syncCustomGuardians === 'function') syncCustomGuardians(merged.customGuardians);
    merged.roomLayout = {};
    Object.entries(parsed.roomLayout && typeof parsed.roomLayout === 'object' ? parsed.roomLayout : {}).forEach(([id, raw]) => {
      if (!raw || typeof raw !== 'object' || !/^[a-z][a-zA-Z0-9]{1,24}$/.test(id)) return;
      merged.roomLayout[id] = {
        spot: Math.max(0, Math.min(2, Math.floor(Number(raw.spot) || 0))),
        hidden: !!raw.hidden,
      };
    });
    merged.wardrobe = Array.from(new Set((Array.isArray(parsed.wardrobe) ? parsed.wardrobe : []).filter((k) => ACCESSORIES[k]?.price)));
    merged.biomeQuests = {};
    Object.entries(parsed.biomeQuests && typeof parsed.biomeQuests === 'object' ? parsed.biomeQuests : {}).forEach(([sceneKey, raw]) => {
      if (typeof BIOME_QUESTS === 'undefined' || !BIOME_QUESTS[sceneKey] || !raw || typeof raw !== 'object') return;
      const total = BIOME_QUESTS[sceneKey].steps.length;
      const step = Math.max(0, Math.min(total, Math.floor(Number(raw.step) || 0)));
      merged.biomeQuests[sceneKey] = {
        step,
        progress: Math.max(0, Math.floor(Number(raw.progress) || 0)),
        done: !!raw.done || step >= total,
        beaten: !!raw.beaten,
      };
    });
    merged.foodUnlocks = Array.isArray(parsed.foodUnlocks) ? parsed.foodUnlocks.filter((k) => FOODS[k]?.monthly) : [];
    merged.checkin.monthCrateKey = parsed.checkin?.monthCrateKey || null;
    merged.weeklyEvents = {
      weekKey: parsed.weeklyEvents?.weekKey || null,
      claims: Array.isArray(parsed.weeklyEvents?.claims)
        ? Array.from(new Set(parsed.weeklyEvents.claims.filter((key) => WEEKLY_EVENT_BY_KEY[key])))
        : [],
    };
    const savedArcade = parsed.arcade && typeof parsed.arcade === 'object' ? parsed.arcade : {};
    merged.arcade = {
      coins: Math.max(0, Number(savedArcade.coins) || 0),
      bonusClaims: Math.max(0, Number(savedArcade.bonusClaims) || 0),
      monthKey: savedArcade.monthKey || null,
      monthCoins: Math.max(0, Number(savedArcade.monthCoins) || 0),
      monthClaims: Array.isArray(savedArcade.monthClaims)
        ? Array.from(new Set(savedArcade.monthClaims.filter((id) => ARCADE_MONTH_GIFTS.some((gift) => gift.id === id))))
        : [],
    };
    merged.unlockedScenes = Array.from(new Set([
      ...base.unlockedScenes,
      ...SCENE_KEYS.filter((k) => SCENES[k].unlocked),
      ...(Array.isArray(parsed.unlockedScenes) ? parsed.unlockedScenes : []),
      ...merged.customScenes.map((scene) => scene.id),
    ]))
      .filter((k) => SCENES[k]);
    merged.gift = parsed.gift && typeof parsed.gift === 'object' ? parsed.gift : null;
    if (merged.gift && !merged.unlockedScenes.includes(merged.gift.scene)) delete merged.gift.scene;
    const savedCare = parsed.care && typeof parsed.care === 'object' ? parsed.care : {};
    merged.care = {
      tokens: Math.max(0, Number(savedCare.tokens) || 0),
      gifts: Math.max(0, Number(savedCare.gifts) || 0),
    };
    merged.journal = (Array.isArray(parsed.journal) ? parsed.journal : [])
      .filter((e) => e && e.text)
      .slice(0, 100)
      .map((e) => ({
        id: e.id || uid('dr'),
        spriteId: e.spriteId || null,
        spriteName: String(e.spriteName || 'Sprite'),
        element: ELEMENTS[e.element] ? e.element : 'bloom',
        text: String(e.text),
        at: Number(e.at) || Date.now(),
        cycles: Math.max(1, Number(e.cycles) || 1),
      }));
    merged.sprites = Array.isArray(parsed.sprites) ? parsed.sprites.map(normalizeSprite) : [];
    const outfitIds = new Set(merged.customClothes.map((cloth) => cloth.id));
    merged.sprites.forEach((sprite) => {
      if (sprite.outfit && !outfitIds.has(sprite.outfit)) sprite.outfit = null;
    });
    merged.activeId = merged.sprites.some((s) => s.id === merged.activeId && s.stage !== 'egg' && !s.retired)
      ? merged.activeId
      : merged.sprites.find((s) => s.stage !== 'egg' && !s.retired)?.id || null;
    return merged;
  } catch (err) {
    console.warn('Save could not be read, starting fresh.', err);
    return base;
  }
}

const state = loadState();
let saveTimer = null;
/* Set while a restored save is loading, so the pagehide/beforeunload writers
   do not put the old Hollow back over the one that was just imported. */
let saveLocked = false;
function lockSaves() { saveLocked = true; }

function saveState(immediate = false) {
  if (saveLocked) return;
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  const write = () => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Could not save', err);
    }
  };
  if (immediate) write();
  else saveTimer = setTimeout(write, 160);
}

const stateListeners = new Set();
function subscribeState(fn) {
  stateListeners.add(fn);
  return () => stateListeners.delete(fn);
}
function commit(type = 'change', detail = {}) {
  saveState();
  stateListeners.forEach((fn) => {
    try { fn({ type, ...detail }); } catch (err) { console.error(err); }
  });
}

/* ---------------- derived helpers ---------------- */
function findSprite(id) {
  return state.sprites.find((s) => s.id === id) || null;
}
function customClothFor(id) {
  return (state.customClothes || []).find((cloth) => cloth.id === id) || null;
}
function customSceneFor(id) {
  return (state.customScenes || []).find((scene) => scene.id === id) || null;
}
function activeSprite() {
  return findSprite(state.activeId) || state.sprites.find((s) => s.stage !== 'egg' && !s.retired) || null;
}
function grownSprites() {
  return state.sprites.filter((s) => s.stage !== 'egg');
}
function isCareBearElement(key) {
  return !!(ELEMENTS[key] && ELEMENTS[key].careBearGroup);
}
function isCareBearSprite(s) {
  return !!(s && s.stage !== 'egg' && isCareBearElement(s.element));
}
function careBearCount() {
  return new Set(state.sprites.filter((s) => isCareBearElement(s.element)).map((s) => s.element)).size;
}
function carePackageIn() {
  const every = typeof CARE_PACKAGE_EVERY === 'number' ? CARE_PACKAGE_EVERY : 3;
  const tokens = Math.max(0, Number(state.care?.tokens) || 0);
  const left = tokens % every;
  return left === 0 ? every : every - left;
}
function grantCarePackageRaw(s) {
  if (!isCareBearSprite(s)) return null;
  const every = typeof CARE_PACKAGE_EVERY === 'number' ? CARE_PACKAGE_EVERY : 3;
  if (!state.care || typeof state.care !== 'object') state.care = { tokens: 0, gifts: 0 };
  const care = state.care;
  care.tokens = Math.max(0, Number(care.tokens) || 0) + 1;
  if (care.tokens % every !== 0) return null;
  const coins = 120 + Math.min(120, care.tokens * 8);
  const xp = 24 + Math.min(60, care.tokens * 2);
  const snackKey = pick(SNACK_KEYS);
  const foodPool = unlockedFoodKeys();
  const foodKey = foodPool.length ? pick(foodPool) : null;
  addCoinsRaw(coins);
  addXpRaw(s, xp);
  addSnackRaw(snackKey, 1);
  if (foodKey) addFoodRaw(foodKey, 1);
  care.gifts = Math.max(0, Number(care.gifts) || 0) + 1;
  state.stats.careGifts = (Number(state.stats.careGifts) || 0) + 1;
  const gift = { coins, xp, snackKey, foodKey, tokens: care.tokens };
  toast(`🌈 Care Package! +${coins} coins · +${xp} XP · ${SNACKS[snackKey].name}${foodKey ? ` · ${FOODS[foodKey].name}` : ''}`, '🌈');
  return gift;
}
function eggs() {
  return state.sprites.filter((s) => s.stage === 'egg');
}
function displayName(s) {
  if (!s) return 'Sprite';
  if (s.stage === 'egg') {
    const finish = finishOf(s)?.name || '';
    const elementName = (ELEMENTS[s.element] || ELEMENTS.bloom).name;
    const base = s.starter ? `${elementName} Egg` : (s.eggLabel || s.name || 'Mystery Egg');
    const prefix = finish && !base.startsWith(finish) && !elementName.startsWith(finish) ? `${finish} ` : '';
    return `${prefix}${base}`;
  }
  return s.name || 'Sprite';
}
function typeName(s) {
  if (!s) return 'Unknown';
  return s.hybrid || (ELEMENTS[s.element] || ELEMENTS.bloom).name;
}
function spriteRarityKey(s) {
  if (!s) return 'common';
  return rarityTierWithBoost(s.element, s.rarityBoost);
}
function spriteRarity(s) {
  return TYPE_EGG_RARITIES[spriteRarityKey(s)] || TYPE_EGG_RARITIES.common;
}
function spriteRarityBonus(s) {
  return s ? rarityCoinBonus(s.element, s.rarityBoost) : 0;
}
function stageForLevel(level) {
  if (level >= 1000) return 'sensei';
  if (level >= 500) return 'ancient';
  if (level >= 100) return 'elder';
  if (level >= 10) return 'sprite';
  if (level >= 5) return 'juvenile';
  return 'baby';
}
function xpNeeded(level) {
  return 50 + level * 18;
}
const STAGE_ORDER = ['baby', 'juvenile', 'sprite', 'elder', 'ancient', 'sensei'];
const STAGE_LABELS = { baby: 'Baby', juvenile: 'Juvenile', sprite: 'Sprite', elder: 'Elder', ancient: 'Ancient', sensei: 'Sensei' };
const STAGE_LEVEL = { baby: 1, juvenile: 5, sprite: 10, elder: 100, ancient: 500, sensei: 1000 };
const GROWTH_MILESTONES = [5, 10, 100, 250, 500, 1000];
function stageEvolutionInfo(s) {
  if (!s || s.stage === 'egg') return { egg: true, current: 'egg', next: null, nextLabel: 'Egg', required: 1, levelsLeft: 0, ready: false, final: false, progress: 0 };
  const index = STAGE_ORDER.indexOf(s.stage);
  const next = index >= 0 && index < STAGE_ORDER.length - 1 ? STAGE_ORDER[index + 1] : null;
  if (!next) return { egg: false, current: s.stage, next: null, nextLabel: 'Final stage', required: MAX_LEVEL, levelsLeft: Math.max(0, MAX_LEVEL - s.level), ready: false, final: true, progress: s.level >= MAX_LEVEL ? 1 : Math.min(1, (s.xp || 0) / xpNeeded(s.level)) };
  const required = STAGE_LEVEL[next];
  const start = STAGE_LEVEL[s.stage] || 1;
  const xpPart = s.level >= required ? 0 : Math.min(1, (s.xp || 0) / xpNeeded(s.level));
  const raw = required > start ? (s.level - start + xpPart) / (required - start) : 1;
  return { egg: false, current: s.stage, next, nextLabel: STAGE_LABELS[next] || next, required, levelsLeft: Math.max(0, required - s.level), ready: s.level >= required, final: false, progress: Math.max(0, Math.min(1, raw)) };
}
function moodOf(s) {
  if (!s) return { key: 'content', label: 'Content', icon: '🙂' };
  if (s.stage === 'egg') return { key: 'egg', label: 'Cracking', icon: '🥚' };
  if (s.asleep) return { key: 'sleep', label: 'Dreaming', icon: '😴' };
  const n = s.needs;
  const avg = (n.hunger + n.energy + n.joy + n.clean) / 4;
  if (n.hunger < 14) return { key: 'starving', label: 'Starving', icon: '🍽️' };
  if (n.clean < 14) return { key: 'filthy', label: 'Grubby', icon: '🫧' };
  if (n.energy < 14) return { key: 'exhausted', label: 'Sleepy', icon: '💤' };
  if (s.bond >= 85 && avg >= 66) return { key: 'bonded', label: 'Bonded', icon: '💖' };
  if (avg >= 78) return { key: 'radiant', label: 'Radiant', icon: '✨' };
  if (avg >= 62) return { key: 'happy', label: 'Happy', icon: '😊' };
  if (avg >= 45) return { key: 'content', label: 'Content', icon: '🙂' };
  if (avg >= 30) return { key: 'restless', label: 'Restless', icon: '😕' };
  return { key: 'grumpy', label: 'Grumpy', icon: '😾' };
}
function bondTier(s) {
  return bondRankFor(s?.bond || 0).name;
}
function spriteSubtitle(s) {
  if (!s) return '';
  if (s.stage === 'egg') return s.hatch >= 100 ? 'Ready to hatch' : 'Warm it with taps';
  const base = formName(s) || typeName(s);
  const finish = finishOf(s) ? `${finishOf(s).name} · ` : '';
  return `${s.shiny ? '✨ Shiny · ' : ''}${finish}${base} · ${BREEDS[s.breed]?.name || 'Puff'} · Gen ${(s.gen || 0) + 1}`;
}
function restLeft(s) {
  return Math.max(0, (s.restUntil || 0) - Date.now());
}

/* ---------------- bedtime & sleep cycles ---------------- */
function isBedtime(d = new Date()) {
  return timePhase(d).key === 'night';
}

function sleepInfo(s) {
  if (!s || !s.asleep) return null;
  const now = Date.now();
  const end = s.sleepUntil || now;
  const start = s.sleepStart || Math.max(0, end - NAP_MS);
  const total = Math.max(1000, end - start);
  const elapsed = clamp(now - start, 0, total);
  const cycles = Math.max(1, s.sleepCycles || 1);
  const cycleLen = total / cycles;
  const cycle = Math.min(cycles, Math.floor(elapsed / cycleLen) + 1);
  return {
    cycles,
    cycle,
    progress: elapsed / total,
    cycleProgress: cycleLen > 0 ? (elapsed % cycleLen) / cycleLen : 0,
    left: Math.max(0, end - now),
    total,
  };
}

function recordDream(s, cycles) {
  const text = pick(DREAM_LINES);
  const at = Date.now();
  const entry = {
    id: uid('dr'),
    spriteId: s.id,
    spriteName: s.name || (ELEMENTS[s.element] || ELEMENTS.bloom).name,
    element: s.element || 'bloom',
    text,
    at,
    cycles,
  };
  s.lastDream = { text, at, cycles };
  state.journal = [entry, ...(Array.isArray(state.journal) ? state.journal : [])].slice(0, 100);
  return entry;
}

function finishSleep(s) {
  const cycles = Math.max(1, s.sleepCycles || 1);
  s.asleep = false;
  s.sleepUntil = 0;
  s.sleepStart = 0;
  s.sleepCycles = 0;
  s.needs.energy = 100;
  s.needs.joy = clamp(s.needs.joy + 3 * cycles);
  addBondRaw(s, 1.5 * cycles);
  addXpRaw(s, 4 * cycles);
  const dream = recordDream(s, cycles);
  return { cycles, dream };
}

/* ---------------- gender, size, powers & evolution ---------------- */
function rollGender() {
  const r = Math.random();
  return r < 0.46 ? 'female' : r < 0.92 ? 'male' : 'neutral';
}
function genderOf(s) {
  return GENDERS[s && s.gender] ? GENDERS[s.gender] : GENDERS.neutral;
}
/* Older saves have no gender stored, so derive a stable one from the sprite id
   instead of rolling a new one on every load. */
function genderFromId(id) {
  const text = String(id || 'sprite');
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) % 99991;
  const roll = hash % 100;
  return roll < 46 ? 'female' : roll < 92 ? 'male' : 'neutral';
}

function rollSize() {
  const r = Math.random();
  return r < 0.28 ? 'small' : r < 0.8 ? 'standard' : 'large';
}

function specialCombo(s) {
  return s?.special ? COMBOS.find((c) => c.id === s.special) || null : null;
}
function gameCoinPayout(baseCoins = 0) {
  const s = activeSprite();
  let payout = Math.max(0, Number(baseCoins) || 0);
  let effectCoins = 0;
  if (s) {
    const fx = spriteEffects(s);
    effectCoins = fx.gameCoins || 0;
    const phase = timePhase().key;
    if (phase === 'night') effectCoins += fx.nightCoins || 0;
    if (phase === 'day') effectCoins += fx.dayCoins || 0;
  }
  const rarityBonus = s ? spriteRarityBonus(s) : 0;
  const holiday = typeof holidayCoinMult === 'function' ? holidayCoinMult() : 1;
  const weekly = weeklyEventCoinMult();
  payout = Math.round((payout + effectCoins + rarityBonus) * holiday * weekly);
  return { payout, effectCoins, rarityBonus, holiday, weekly };
}
function formOf(s) {
  return s?.form ? EVOLUTION_FORMS[s.form] || null : null;
}
function formName(s) {
  const form = formOf(s);
  if (!form) return null;
  if (form.id === 'titan') return TITAN_NAMES[s.element] || form.label;
  return `${(ELEMENTS[s.element] || ELEMENTS.bloom).name} ${form.label}`;
}
function spriteEffects(s) {
  if (!s) return {};
  const merged = {};
  const add = (effect = {}) => {
    Object.entries(effect).forEach(([key, value]) => {
      if (['gameCoins', 'petCoins', 'chatCoins', 'nightCoins', 'dayCoins', 'checkinCoins', 'taskCoins'].includes(key)) {
        merged[key] = (merged[key] || 0) + value;
      } else if (['xp', 'petBond', 'giftSpeed', 'decay', 'joyDecay', 'hungerDecay', 'energyDecay', 'cleanDecay', 'snackXp'].includes(key)) {
        merged[key] = (merged[key] || 1) * value;
      } else {
        merged[key] = value;
      }
    });
  };
  add(GENE_POWERS[s.element]?.effect);
  add(HABITS[s.breed]?.effect);
  add(FINISHES[s.variant]?.effect);
  add(specialCombo(s)?.power.effect);
  add(formOf(s)?.power.effect);
  add(bondRankFor(s?.bond || 0).effect);
  if (['common', 'uncommon'].includes(spriteRarityKey(s))) {
    merged.giftSpeed = (merged.giftSpeed || 1) * 1.25;
  }
  const rebirths = Math.max(0, Number(s.rebirths) || 0);
  if (rebirths) {
    merged.xp = (merged.xp || 1) * (1 + 0.08 * rebirths);
    merged.gameCoins = (merged.gameCoins || 0) + rebirths;
    merged.giftSpeed = (merged.giftSpeed || 1) * (1 + 0.03 * rebirths);
  }
  return merged;
}
function habitatFor(s, sceneKey = state.theme.scene) {
  const scene = SCENES[sceneKey] || SCENES.grove;
  const match = !!s && (scene.allSprites || (scene.species || []).includes(s.element));
  const bonus = match ? (scene.bonus || 0.4) : 0.1;
  return { scene, match, bonus, percent: Math.round(bonus * 100) };
}
function spritePowers(s) {
  const list = [
    { kind: 'Gene', ...(GENE_POWERS[s.element] || {}) },
    { kind: 'Habit', ...(HABITS[s.breed] || {}) },
  ];
  const combo = specialCombo(s);
  if (combo) list.push({ kind: 'Combo', ...combo.power });
  const form = formOf(s);
  if (form) list.push({ kind: 'Evolution', ...form.power });
  const finish = finishOf(s);
  if (finish) list.push({ kind: 'Finish', name: `${finish.name} finish`, icon: finish.icon, desc: finish.bonus });
  return list;
}
function dietInfo(s) {
  return Object.keys(DIET_PATHS).map((key) => ({
    key,
    ...DIET_PATHS[key],
    points: Math.max(0, s?.diet?.[key] || 0),
    need: EVOLUTION_AFFINITY,
    ready: (s?.diet?.[key] || 0) >= EVOLUTION_AFFINITY,
  }));
}
function dietGainRaw(s, foodId) {
  const diet = FOOD_DIET[foodId];
  if (!s || !diet) return null;
  const before = s.diet[diet.path] || 0;
  s.diet[diet.path] = before + diet.gain;
  return { path: diet.path, before, after: s.diet[diet.path] };
}
function snackCount(key) {
  return Math.max(0, Number(state.inventory?.snacks?.[key]) || 0);
}
function snackTotal() {
  return SNACK_KEYS.reduce((n, key) => n + snackCount(key), 0);
}
function addSnackRaw(key, count = 1) {
  if (!SNACKS[key]) return 0;
  state.inventory = state.inventory || { snacks: {}, foods: {} };
  state.inventory.snacks = state.inventory.snacks || {};
  state.inventory.snacks[key] = Math.max(0, (state.inventory.snacks[key] || 0) + count);
  return state.inventory.snacks[key];
}
function foodCount(key) {
  return Math.max(0, Number(state.inventory?.foods?.[key]) || 0);
}
function foodTotal() {
  return FOOD_KEYS.reduce((n, key) => n + foodCount(key), 0);
}
function unlockedFoodKeys() {
  return FOOD_KEYS.filter((k) => !FOODS[k].giftOnly && (!FOODS[k].monthly || (state.foodUnlocks || []).includes(k)));
}
function candyMorphRaw(s, itemKey) {
  if (!s || s.stage === 'egg' || typeof CANDY_ITEMS === 'undefined' || !CANDY_ITEMS.includes(itemKey)) return null;
  s.sugar = (Number(s.sugar) || 0) + 1;
  if (s.sugar < 3) return null;
  s.sugar = 0;
  const choices = CANDY_SPECIES.filter((key) => key !== s.element);
  if (!choices.length) return null;
  s.element = pick(choices);
  s.hybrid = null;
  s.hybridParents = null;
  state.stats.candyMorphs = (state.stats.candyMorphs || 0) + 1;
  toast(`${displayName(s)} transformed into ${ELEMENTS[s.element].name}!`, '🍬');
  return s.element;
}
function addFoodRaw(key, count = 1) {
  if (!FOODS[key]) return 0;
  state.inventory = state.inventory || { snacks: {}, foods: {} };
  state.inventory.foods = state.inventory.foods || {};
  state.inventory.foods[key] = Math.max(0, (state.inventory.foods[key] || 0) + count);
  return state.inventory.foods[key];
}

/* ---------------- gifts ---------------- */
function scheduleGiftRaw(first = false) {
  if (!state.started) return;
  const candidates = grownSprites();
  if (!candidates.length) {
    state.gift = null;
    return;
  }
  const sprite = activeSprite() || pick(candidates);
  const speed = (spriteEffects(sprite).giftSpeed || 1) * (typeof holidayGiftSpeed === 'function' ? holidayGiftSpeed() : 1) * weeklyEventGiftSpeed();
  const seconds = (first ? rand(45, 110) : rand(150, 360)) / speed;
  state.gift = {
    spriteId: sprite.id,
    createdAt: Date.now(),
    readyAt: Date.now() + seconds * 1000,
    notified: false,
  };
}
function ensureGift() {
  if (!state.started || !grownSprites().length) {
    state.gift = null;
    return;
  }
  if (!state.gift || !findSprite(state.gift.spriteId)) {
    scheduleGiftRaw(!state.stats?.gifts);
    return;
  }
  if (!state.gift.notified && Date.now() >= state.gift.readyAt) {
    state.gift.notified = true;
    const s = findSprite(state.gift.spriteId);
    if (s) toast(`${displayName(s)} has a gift for you in the Hollow.`, '🎁');
    saveState();
  }
}
function giftReady() {
  return !!(state.gift && Date.now() >= state.gift.readyAt && findSprite(state.gift.spriteId));
}

/* ---------------- check-in & calendar periods ---------------- */
function ensureCheckinPeriods() {
  const c = state.checkin;
  const today = dayKey();
  const week = weekKey();
  const month = monthKey();
  const year = yearKey();
  if (!c.weekKey) c.weekKey = week;
  else if (c.weekKey !== week) {
    c.weekStreak = (c.weekSlots || 0) >= 7 ? (c.weekStreak || 0) + 1 : 0;
    c.weekKey = week;
    c.weekSlots = 0;
    c.weekClaims = [];
  }
  if (!c.monthKey) c.monthKey = month;
  else if (c.monthKey !== month) {
    c.monthStreak = (c.monthDays || 0) >= 12 ? (c.monthStreak || 0) + 1 : 0;
    c.monthKey = month;
    c.monthDays = 0;
    c.monthSlots = 0;
    c.monthClaims = [];
  }
  if (!c.yearKey) c.yearKey = year;
  else if (c.yearKey !== year) {
    c.yearStreak = (c.yearDays || 0) >= 120 ? (c.yearStreak || 0) + 1 : 0;
    c.yearKey = year;
    c.yearDays = 0;
    c.yearSlots = 0;
    c.yearClaims = [];
  }
  if (c.slotsDate !== today) {
    c.slotsDate = today;
    c.slots = [];
  }
  if (c.last && c.last !== today && c.last !== yesterdayKey()) c.streak = 0;
  return c;
}
function ensureArcadePeriods() {
  if (!state.arcade) state.arcade = { coins: 0, bonusClaims: 0, monthKey: null, monthCoins: 0, monthClaims: [] };
  const a = state.arcade;
  const month = monthKey();
  a.coins = Math.max(0, Number(a.coins) || 0);
  a.bonusClaims = Math.max(0, Number(a.bonusClaims) || 0);
  a.monthCoins = Math.max(0, Number(a.monthCoins) || 0);
  if (!Array.isArray(a.monthClaims)) a.monthClaims = [];
  if (a.monthKey !== month) {
    a.monthKey = month;
    a.monthCoins = 0;
    a.monthClaims = [];
    saveState();
  }
  return a;
}
function currentCheckinSlot() {
  ensureCheckinPeriods();
  const win = currentCheckinWindow();
  const claimed = state.checkin.slots.includes(win.id);
  return { ...win, claimed };
}

/* ---------------- wild sprite rewards ---------------- */
function randomWildRaw({ rare = false, mythic = false } = {}) {
  const stage = mythic ? 'elder' : pick(rare ? ['juvenile', 'sprite', 'elder'] : ['baby', 'juvenile', 'sprite', 'elder']);
  const level = {
    baby: randInt(1, 4),
    juvenile: randInt(5, 9),
    sprite: randInt(10, 19),
    elder: randInt(100, 149),
  }[stage];
  const combo = rare && chance(0.55) ? pick(COMBOS) : null;
  const mutation = chance(rare ? 0.5 : 0.08) ? pick(MUTATIONS) : null;
  const variant = rollFinish(rare ? 0.4 : 0.12);
  const element = pick(WILD_SPECIES);
  const size = mythic || (rare && chance(0.55)) ? 'large' : rollSize();
  const sprite = makeSprite({
    element,
    breed: pick(BREED_KEYS),
    palette: combo ? combo.palette : mutation ? mutation.palette : chance(0.3) ? pick(PALETTE_KEYS.filter((k) => k !== 'native')) : 'native',
    pattern: combo ? combo.pattern : pick(PATTERN_KEYS),
    accessory: combo ? combo.accessory : chance(0.3) ? pick(FREE_ACCESSORY_KEYS) : 'none',
    personality: pick(PERSONALITY_KEYS),
    mutation: mutation ? mutation.name : null,
    variant,
    special: combo ? combo.id : null,
    stage,
    level,
    size,
    form: mythic ? pick(Object.keys(EVOLUTION_FORMS)) : null,
    gen: randInt(0, 3),
    bond: randInt(8, 34),
    needs: { hunger: randInt(70, 96), energy: randInt(70, 96), joy: randInt(72, 98), clean: randInt(76, 100) },
    hatch: 100,
  });
  sprite.name = makeName(element);
  state.sprites.push(sprite);
  if (!state.activeId) state.activeId = sprite.id;
  return sprite;
}

function grantMilestoneRaw(m) {
  if (!m) return null;
  if (m.kind === 'snacks') {
    const names = [];
    for (let i = 0; i < (m.amount || 2); i++) {
      const key = pick(SNACK_KEYS);
      addSnackRaw(key, 1);
      names.push(SNACKS[key].name);
    }
    return { kind: 'snacks', icon: '🍬', title: m.label, text: names.join(' · ') };
  }
  if (m.kind === 'wild' || m.kind === 'rare' || m.kind === 'mythic') {
    const s = randomWildRaw({ rare: m.kind === 'rare' || m.kind === 'mythic', mythic: m.kind === 'mythic' });
    return { kind: 'sprite', icon: m.icon, title: m.label, text: `${formName(s) || typeName(s)} · ${stageLabel(s)} · ${SIZES[s.size].name}`, spriteId: s.id };
  }
  if (m.kind === 'scene') {
    const locked = GIFT_SCENES.filter((k) => !state.unlockedScenes.includes(k));
    if (!locked.length) {
      addCoinsRaw(80);
      return { kind: 'coins', icon: '🪙', title: m.label, text: '+80 coins' };
    }
    const key = pick(locked);
    state.unlockedScenes.push(key);
    return { kind: 'scene', icon: '🏞️', title: m.label, text: SCENES[key].name, sceneKey: key };
  }
  return null;
}

/* ---------------- daily tasks ---------------- */
function ensureDaily() {
  const today = dayKey();
  if (state.daily && state.daily.date === today) return false;
  const rnd = seedRandom(`hollow-${today}-${state.sprites.length}`);
  const shuffled = TASK_POOL.slice()
    .map((t) => ({ t, k: rnd() }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.t)
    .slice(0, 4);
  state.daily = {
    date: today,
    counters: {},
    tasks: shuffled.map((t) => ({ ...t, claimed: false })),
  };
  saveState();
  return true;
}
function makePeriodTasks(count, goalScale, rewardScale, seed) {
  const rnd = seedRandom(seed);
  const tasks = TASK_POOL.slice()
    .map((t) => ({ t, k: rnd() }))
    .sort((a, b) => a.k - b.k)
    .slice(0, count)
    .map(({ t }) => t);
  return tasks.map((t) => ({
    ...t,
    id: `${seed.startsWith('weekly') ? 'w' : 'm'}-${t.id}`,
    goal: Math.max(2, Math.round(t.goal * goalScale)),
    reward: Math.round(t.reward * rewardScale),
    xp: Math.round(t.xp * rewardScale * 0.7),
    claimed: false,
  }));
}
function ensureQuests() {
  const week = weekKey();
  const month = monthKey();
  if (!state.weekly || state.weekly.key !== week) {
    state.weekly = { key: week, counters: {}, tasks: makePeriodTasks(3, 3, 3, `weekly-${week}`) };
    saveState();
  }
  if (!state.monthly || state.monthly.key !== month) {
    state.monthly = { key: month, counters: {}, tasks: makePeriodTasks(2, 10, 7, `monthly-${month}`) };
    saveState();
  }
}
function bump(stat, n = 1) {
  if (typeof biomeQuestNote === 'function' && (stat === 'games' || stat === 'pets' || stat === 'feeds' || stat === 'baths' || stat === 'rubs')) biomeQuestNote(stat === 'games' ? 'game' : 'care');
  ensureDaily();
  ensureQuests();
  state.daily.counters[stat] = (state.daily.counters[stat] || 0) + n;
  state.weekly.counters[stat] = (state.weekly.counters[stat] || 0) + n;
  state.monthly.counters[stat] = (state.monthly.counters[stat] || 0) + n;
}
function taskCounter(task) {
  return state.daily?.counters?.[task.stat] || 0;
}
function periodCounter(task, period = 'daily') {
  const bucket = period === 'weekly' ? state.weekly : period === 'monthly' ? state.monthly : state.daily;
  return bucket?.counters?.[task.stat] || 0;
}

/* ---------------- weekly events ---------------- */
function ensureWeeklyEvents() {
  const key = weekKey();
  if (!state.weeklyEvents || state.weeklyEvents.weekKey !== key) {
    state.weeklyEvents = { weekKey: key, claims: [] };
  }
  state.weeklyEvents.claims = Array.isArray(state.weeklyEvents.claims)
    ? state.weeklyEvents.claims.filter((claim) => WEEKLY_EVENT_BY_KEY[claim])
    : [];
  return state.weeklyEvents;
}
function activeWeeklyEvent() {
  return weeklyEventForDate();
}
function weeklyEventClaimed(event = activeWeeklyEvent()) {
  return !!event && ensureWeeklyEvents().claims.includes(event.key);
}
function weeklyEventEffects(event = activeWeeklyEvent()) {
  return event?.effects || {};
}
function weeklyEventXpMult() { return weeklyEventEffects().xp || 1; }
function weeklyEventCoinMult() { return weeklyEventEffects().coins || 1; }
function weeklyEventGiftSpeed() { return weeklyEventEffects().giftSpeed || 1; }
function weeklyEventBondMult() { return weeklyEventEffects().bond || 1; }
function weeklyEventMissingVaultKeys() {
  const unlocked = Array.isArray(state.secretUnlocks) ? state.secretUnlocks : [];
  return SECRET_SPECIES.filter((key) => !unlocked.includes(key));
}
function weeklyEventFoodKeys(event = activeWeeklyEvent()) {
  const cats = event?.reward?.foodCats || [];
  if (!cats.length) return [];
  return FOOD_KEYS.filter((key) => {
    const food = FOODS[key];
    return food && cats.includes(food.cat) && !food.rebirth && !food.stageBoost && !food.giftOnly;
  });
}
function weeklyEventMissingCrates(event = activeWeeklyEvent()) {
  const index = WEEKLY_EVENTS.findIndex((item) => item.key === event?.key);
  if (index < 0) return 0;
  const claims = ensureWeeklyEvents().claims;
  let count = 0;
  for (let i = 0; i < index; i++) {
    if (!claims.includes(WEEKLY_EVENTS[i].key)) count += 1;
  }
  if (state.checkin?.monthCrateKey !== monthKey()) count += 1;
  return count;
}

/* ---------------- economy & growth (raw, no commit) ---------------- */
function addCoinsRaw(n) {
  state.coins = Math.max(0, state.coins + n);
  if (n > 0) state.stats.earned += n;
  else state.stats.spent += -n;
}
function addBondRaw(s, amount) {
  const mod = BREEDS[s.breed]?.bondMod || 1;
  s.bond = clamp(s.bond + amount * mod * weeklyEventBondMult());
  if (s.bond >= 100) unlockSecret('heartkeeper');
}
/* A Starpath Feast is deliberately stage-based rather than a flat XP item. */
function stageFeastRaw(s) {
  if (!s || s.stage === 'egg' || s.retired) return { ok: false, reason: 'missing' };
  if (s.level >= MAX_LEVEL) return { ok: false, reason: 'max' };
  const target = GROWTH_MILESTONES.find((n) => n > s.level) || MAX_LEVEL;
  let need = Math.max(0, xpNeeded(s.level) - s.xp);
  for (let level = s.level + 1; level < target; level++) need += xpNeeded(level);
  const factor = (BREEDS[s.breed]?.xpMod || 1)
    * (1 + (s.gen || 0) * 0.05)
    * (spriteEffects(s).xp || 1)
    * (1 + habitatFor(s).bonus);
  const from = s.level;
  addXpRaw(s, Math.max(1, Math.ceil(need / Math.max(0.05, factor))));
  return { ok: true, target, from, to: s.level };
}

function addXpRaw(s, amount) {
  if (!s || s.stage === 'egg' || s.retired) return 0;
  if (s.level >= MAX_LEVEL) {
    s.xp = 0;
    unlockSecret('summitspirit');
    unlockSecret('elderkeeper');
    if (!s.retired) {
      s.retired = true;
      s.retiredAt = Date.now();
      if (state.activeId === s.id) {
        state.activeId = state.sprites.find((x) => x.id !== s.id && x.stage !== 'egg' && !x.retired)?.id || null;
      }
      toast(`${displayName(s)} reached MAX and retired. Feed a Rebirth Meal to begin a new life.`, '🌱');
    }
    return 0;
  }
  const breed = BREEDS[s.breed] || {};
  const habitat = habitatFor(s);
  const holidayXp = typeof holidayXpMult === 'function' ? holidayXpMult() : 1;
  const weekendXp = typeof weekendAdminXpMult === 'function' ? weekendAdminXpMult() : 1;
  const total = amount * weeklyEventXpMult() * holidayXp * weekendXp * (breed.xpMod || 1) * (1 + (s.gen || 0) * 0.05) * (spriteEffects(s).xp || 1) * (1 + habitat.bonus);
  s.xp += total;
  let ups = 0;
  while (s.level < MAX_LEVEL && s.xp >= xpNeeded(s.level)) {
    s.xp -= xpNeeded(s.level);
    s.level += 1;
    ups += 1;
  }
  if (s.level >= MAX_LEVEL) {
    s.xp = 0;
    unlockSecret('summitspirit');
    if (!s.retired) {
      s.retired = true;
      s.retiredAt = Date.now();
      if (state.activeId === s.id) {
        state.activeId = state.sprites.find((x) => x.id !== s.id && x.stage !== 'egg' && !x.retired)?.id || null;
      }
      toast(`${displayName(s)} reached MAX and retired. Feed a Rebirth Meal to begin a new life.`, '🌱');
    }
  }
  if (ups > 0) {
    if (s.level >= MAX_LEVEL) unlockSecret('elderkeeper');
    addCoinsRaw(12 * ups);
    s.needs.joy = clamp(s.needs.joy + 8);
    s.bond = clamp(s.bond + 3);
    const nextStage = stageForLevel(s.level);
    const prevStage = s.stage;
    if (nextStage !== s.stage) {
      s.stage = nextStage;
      const names = STAGE_LABELS;
      toast(`${displayName(s)} grew into a ${names[nextStage]}!`, '🌟');
      if (typeof announceStageEvolution === 'function') announceStageEvolution(s, prevStage, nextStage);
      Sfx.level();
    } else {
      toast(`${displayName(s)} reached level ${s.level}`, '⭐');
      Sfx.level();
    }
    commit('levelup', { spriteId: s.id });
  }
  return ups;
}
function pushLog() { /* reserved for future event history */ }

/* ---------------- genetics ---------------- */
function blendPalettes(pa, pb) {
  const t = rand(0.36, 0.64);
  const body = mix(pa.body, pb.body, t);
  return {
    body,
    light: mix(pa.light, pb.light, 0.5),
    deep: darken(body, 0.28),
    accent: pick([pa.accent, pb.accent, mix(pa.accent, pb.accent, 0.5)]),
    belly: lighten(body, 0.6),
  };
}
function shineChanceForMerge(a, b) {
  let p = 0.16 + Math.min(0.08, (state.stats.merges || 0) * 0.004);
  if (!!a?.shiny !== !!b?.shiny) p += 0.12;
  if (a?.shiny && b?.shiny) p += 0.22;
  if (a && b && hybridFor(a.element, b.element)) p += 0.06;
  if (a?.mutation) p += 0.02;
  if (b?.mutation) p += 0.02;
  p += Math.min(0.04, ((a?.gen || 0) + (b?.gen || 0)) * 0.005);
  return clamp(p, 0, 0.55);
}

function shineChanceForHatch(s) {
  let p = 0.06;
  p += Math.min(0.03, (s.gen || 0) * 0.01);
  if (s.hybrid) p += 0.02;
  if (s.special) p += 0.02;
  if (s.mutation) p += 0.02;
  if (finishOf(s)) p += 0.01;
  return clamp(p, 0, 0.2);
}

function buildChild(a, b) {
  const hybridName = hybridFor(a.element, b.element);
  const mergeCount = state.stats.merges || 0;
  const comboChance = Math.min(0.34, 0.04 + mergeCount * 0.012);
  let combo = null;
  if (chance(comboChance)) {
    const pair = [a.element, b.element].sort().join('+');
    combo = COMBOS.find((c) => c.pair && [c.pair[0], c.pair[1]].sort().join('+') === pair)
      || pick(COMBOS.filter((c) => !c.pair));
  }
  const useHybrid = !!hybridName && (!!combo || chance(0.45));
  const element = chance(0.5) ? a.element : b.element;
  const pa = resolvePalette(a);
  const pb = resolvePalette(b);
  let palette = 'native';
  let custom = null;
  let mutation = null;
  const mutationChance = 0.1 + (hybridName ? 0.08 : 0) + (a.mutation ? 0.04 : 0) + (b.mutation ? 0.04 : 0) + Math.min(0.06, mergeCount * 0.004);
  if (combo) {
    palette = combo.palette;
  } else if (chance(mutationChance)) {
    const m = pick(MUTATIONS);
    mutation = m.name;
    palette = m.palette;
  } else if (chance(0.4)) {
    palette = 'custom';
    custom = blendPalettes(pa, pb);
  } else if (chance(0.22)) {
    palette = pick(['aurora', 'candy', 'matcha', 'deepsea', 'sunset', 'midnight', 'mono']);
  } else {
    const parentPalette = chance(0.5) ? a.palette : b.palette;
    if (parentPalette === 'custom') {
      palette = 'custom';
      custom = chance(0.5) ? { ...a.custom } : { ...b.custom };
    } else if (PALETTES[parentPalette]) {
      palette = parentPalette;
    }
  }
  let breed = chance(0.5) ? a.breed : b.breed;
  if (chance(0.08)) breed = pick(BREED_KEYS);
  const pattern = combo ? combo.pattern : chance(0.45) ? a.pattern : chance(0.72) ? b.pattern : pick(PATTERN_KEYS);
  const accessory = combo ? combo.accessory : chance(0.3) ? (chance(0.5) ? a.accessory : b.accessory) : 'none';
  const personality = chance(0.4) ? a.personality : chance(0.62) ? b.personality : pick(PERSONALITY_KEYS);
  const size = chance(0.2) ? pick(SIZE_KEYS) : chance(0.5) ? a.size || 'standard' : b.size || 'standard';
  const parentFinish = a.variant || b.variant;
  const variant = parentFinish && chance(0.45)
    ? (a.variant && b.variant ? (chance(0.5) ? a.variant : b.variant) : parentFinish)
    : rollFinish(0.07);
  const shiny = chance(shineChanceForMerge(a, b));
  const child = makeSprite({
    element,
    hybrid: useHybrid ? hybridName : null,
    hybridParents: useHybrid ? [a.element, b.element] : null,
    breed,
    palette,
    custom,
    pattern,
    accessory,
    personality,
    size,
    variant,
    shiny,
    special: combo ? combo.id : null,
    stage: 'egg',
    gen: Math.max(a.gen || 0, b.gen || 0) + 1,
    mutation,
    hatch: 0,
    lineage: [a.name || typeName(a), b.name || typeName(b)],
    needs: { hunger: 72, energy: 76, joy: 74, clean: 90 },
  });
  child.name = null;
  return child;
}
function mergeCost(a, b) {
  return 70 + ((a.gen || 0) + (b.gen || 0)) * 25;
}
function mergeOdds(a = null, b = null) {
  const merges = state.stats.merges || 0;
  const baseShine = 0.16 + Math.min(0.08, merges * 0.004);
  return {
    twin: Math.min(38, Math.round((0.05 + merges * 0.015) * 100)),
    combo: Math.min(34, Math.round((0.04 + merges * 0.012) * 100)),
    shine: a && b ? Math.round(shineChanceForMerge(a, b) * 100) : Math.round(baseShine * 100),
  };
}
function makeSprite(opts = {}) {
  const element = opts.element || pick(WILD_SPECIES);
  const forcedFinish = ELEMENTS[element]?.forcedVariant;
  const variant = FINISHES[forcedFinish] ? forcedFinish : FINISHES[opts.variant] ? opts.variant : null;
  return {
    id: opts.id || uid('sp'),
    name: opts.name || null,
    eggLabel: opts.eggLabel || null,
    element,
    hybrid: opts.hybrid || null,
    hybridParents: opts.hybridParents || null,
    breed: opts.breed || pick(BREED_KEYS),
    palette: opts.palette || 'native',
    custom: opts.custom || null,
    pattern: opts.pattern || 'plain',
    accessory: opts.accessory || 'none',
    personality: opts.personality || pick(PERSONALITY_KEYS),
    gender: GENDERS[opts.gender] ? opts.gender : rollGender(),
    mutation: opts.mutation || null,
    variant,
    shiny: !!(opts.shiny || ELEMENTS[element]?.alwaysShiny),
    size: SIZES[opts.size] ? opts.size : rollSize(),
    diet: opts.diet || { hearty: 0, sweet: 0, eerie: 0, wild: 0 },
    sugar: 0,
    rarityBoost: Math.max(0, Math.min(RARITY_BOOST_MAX, Math.floor(Number(opts.rarityBoost) || 0))),
    form: EVOLUTION_FORMS[opts.form] ? opts.form : null,
    special: COMBOS.some((c) => c.id === opts.special) ? opts.special : null,
    evolvedAt: opts.evolvedAt || 0,
    stage: opts.stage || 'baby',
    level: clamp(opts.level || 1, 1, MAX_LEVEL),
    xp: 0,
    bond: opts.bond ?? 0,
    gen: opts.gen || 0,
    needs: opts.needs || { hunger: 68, energy: 72, joy: 70, clean: 78 },
    hatch: opts.hatch ?? 0,
    born: opts.born || Date.now(),
    asleep: false,
    sleepUntil: 0,
    sleepStart: 0,
    sleepCycles: 0,
    lastPet: 0,
    lastChatReward: 0,
    restUntil: 0,
    lineage: opts.lineage || null,
    starter: !!opts.starter,
  };
}

/* ---------------- secrets & biome progression ---------------- */
function unlockSecretRaw(key) {
  const meta = SECRET_SPECIES_META[key];
  if (!meta || state.secretUnlocks.includes(key)) return null;
  state.secretUnlocks.push(key);
  const existing = state.sprites.find((s) => s.element === key);
  if (existing) return existing;
  const sprite = makeSprite({
    element: key,
    name: meta.name,
    stage: meta.master ? 'sensei' : 'baby',
    level: meta.master ? MAX_LEVEL : 1,
    bond: meta.master ? 100 : 55,
    gen: meta.master ? 5 : 0,
    palette: 'native',
    pattern: meta.master ? 'sparkle' : 'star',
    accessory: meta.master ? 'crown' : 'none',
    variant: meta.master ? 'galaxy' : null,
    shiny: !!meta.master,
    needs: meta.master ? { hunger: 100, energy: 100, joy: 100, clean: 100 } : { hunger: 84, energy: 84, joy: 88, clean: 92 },
    hatch: 100,
  });
  sprite.name = meta.name;
  state.sprites.push(sprite);
  if (!state.activeId) state.activeId = sprite.id;
  return sprite;
}

function unlockSecret(key) {
  const sprite = unlockSecretRaw(key);
  if (!sprite) return null;
  commit('secret', { spriteId: sprite.id, secretKey: key });
  toast(`Secret found: ${sprite.name}!`, '🔐');
  return sprite;
}

function checkProgressSecrets() {
  const found = [];
  if (state.sprites.some((s) => s.level >= MAX_LEVEL)) {
    const s = unlockSecret('summitspirit');
    if (s) found.push(s);
  }
  if (state.sprites.some((s) => s.bond >= 100)) {
    const s = unlockSecret('heartkeeper');
    if (s) found.push(s);
  }
  if ((state.stats.hatches || 0) >= 25) {
    const s = unlockSecret('shelloracle');
    if (s) found.push(s);
  }
  if (state.sprites.some((s) => s.retired)) {
    const s = unlockSecret('elderkeeper');
    if (s) found.push(s);
  }
  const collected = state.sprites.filter((s) => s.stage !== 'egg');
  const ownedWithFlag = (flag) => new Set(collected
    .filter((s) => ELEMENTS[s.element]?.[flag])
    .map((s) => s.element)).size;
  Object.entries(SECRET_SPECIES_META).forEach(([key, meta]) => {
    if (!meta.collectionSecret || state.secretUnlocks.includes(key)) return;
    if (ownedWithFlag(meta.collectionSecret.flag) < meta.collectionSecret.count) return;
    const s = unlockSecret(key);
    if (s) found.push(s);
  });
  return found;
}

function recordBiomeVisit(sceneKey) {
  if (!isTypeBiomeScene(sceneKey)) return;
  if (!state.biomesVisited.includes(sceneKey)) state.biomesVisited.push(sceneKey);
  if (BIOME_SCENE_KEYS.every((key) => state.biomesVisited.includes(key))) unlockSecret('atlaskeeper');
}
function rollEgg(tierId, opts = {}) {
  const tier = EGG_TIERS[tierId] || EGG_TIERS.common;
  const mutation = chance(tier.mutation) ? pick(MUTATIONS) : null;
  const palette = mutation
    ? mutation.palette
    : chance(0.32)
      ? pick(['aurora', 'candy', 'matcha', 'deepsea', 'sunset', 'midnight'])
      : 'native';
  return makeSprite({
    element: opts.element || pick(WILD_SPECIES),
    eggLabel: opts.eggLabel || null,
    breed: pick(BREED_KEYS),
    palette,
    pattern: pick(PATTERN_KEYS),
    accessory: chance(0.32) ? pick(FREE_ACCESSORY_KEYS) : 'none',
    personality: pick(PERSONALITY_KEYS),
    variant: rollFinish(0.16),
    size: rollSize(),
    gen: tier.gen || 0,
    mutation: mutation ? mutation.name : null,
    stage: 'egg',
    hatch: 0,
    needs: { hunger: 70, energy: 74, joy: 72, clean: 88 },
  });
}

const TRAIL_STAGE_ORDER = STAGE_ORDER;
const TRAIL_STAGE_LABELS = STAGE_LABELS;
const TRAIL_STAGE_LEVEL = { juvenile: 5, sprite: 10, elder: 100, ancient: 500, sensei: 1000 };

/* Every finished trail resolves one visible reward: a type-tier rise, a stage
   evolution, or a generous coin bonus. Higher trails roll the rare outcomes more often. */
function rollTrailBonus(s, info, payout) {
  if (!s || s.stage === 'egg') return { kind: 'coins', coins: 0 };
  const tierKey = spriteRarityKey(s);
  const tierIndex = RARITY_TIER_ORDER.indexOf(tierKey);
  const stageIndex = TRAIL_STAGE_ORDER.indexOf(s.stage);
  const canTier = tierIndex >= 0 && tierIndex < RARITY_TIER_ORDER.length - 1;
  const canEvolve = stageIndex >= 0 && stageIndex < TRAIL_STAGE_ORDER.length - 1 && !s.retired;
  const evolveChance = Math.max(0, Number(info?.trailEvolveChance) || 0);
  const tierChance = Math.max(0, Number(info?.trailTierChance) || 0);
  const roll = Math.random();
  if (canEvolve && roll < evolveChance) {
    const fromStage = s.stage;
    const toStage = TRAIL_STAGE_ORDER[stageIndex + 1];
    s.stage = toStage;
    s.level = Math.max(s.level, TRAIL_STAGE_LEVEL[toStage] || s.level);
    if (typeof announceStageEvolution === 'function') announceStageEvolution(s, fromStage, toStage);
    return { kind: 'evolve', from: TRAIL_STAGE_LABELS[fromStage] || fromStage, to: TRAIL_STAGE_LABELS[toStage] || toStage, stage: toStage };
  }
  if (canTier && roll < evolveChance + tierChance) {
    const fromRarity = TYPE_EGG_RARITIES[tierKey];
    s.rarityBoost = Math.max(0, Math.min(RARITY_BOOST_MAX, Math.floor(Number(s.rarityBoost) || 0) + 1));
    const toKey = spriteRarityKey(s);
    const toRarity = TYPE_EGG_RARITIES[toKey];
    return { kind: 'tier', from: fromRarity?.name || tierKey, to: toRarity?.name || toKey, tier: toRarity };
  }
  const coins = Math.max(1, Math.round(Math.max(1, Number(payout) || 0) * (Number(info?.trailCoinMult) || 1.5)));
  addCoinsRaw(coins);
  return { kind: 'coins', coins };
}

/* ---------------- actions ---------------- */
const Actions = {
  startGame(element, breed) {
    state.started = true;
    state.seen.intro = true;
    state.coins = Math.max(160, Math.floor(Number(state.coins) || 0));
    const egg = makeSprite({
      element,
      breed,
      stage: 'egg',
      hatch: 0,
      starter: true,
      palette: 'native',
      pattern: 'spots',
      accessory: 'none',
      personality: pick(['sunny', 'goofy', 'shy', 'dreamy']),
    });
    state.sprites.push(egg);
    commit('start', { spriteId: egg.id });
    return egg;
  },

  setActive(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg' || s.retired) return;
    state.activeId = id;
    commit('active', { spriteId: id });
  },

  retire(id) {
    const s = findSprite(id);
    if (!s || s.level < STAGE_LEVEL.elder || STAGE_ORDER.indexOf(s.stage) < STAGE_ORDER.indexOf('elder')) return { ok: false, reason: 'elder' };
    s.retired = true;
    unlockSecret('elderkeeper');
    s.retiredAt = Date.now();
    s.asleep = false;
    s.sleepUntil = 0;
    s.sleepStart = 0;
    s.sleepCycles = 0;
    if (state.activeId === s.id) {
      state.activeId = state.sprites.find((x) => x.id !== s.id && x.stage !== 'egg' && !x.retired)?.id || null;
    }
    commit('retire', { spriteId: s.id });
    return { ok: true };
  },

  unretire(id) {
    const s = findSprite(id);
    if (!s || !s.retired) return { ok: false };
    s.retired = false;
    s.retiredAt = 0;
    commit('unretire', { spriteId: s.id });
    return { ok: true };
  },

  reincarnate(id, foodId = 'rebirthmeal') {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false, reason: 'missing' };
    if (s.level < MAX_LEVEL) {
      toast(`${displayName(s)} must reach MAX level before a Rebirth Meal can begin a new life.`, '🌱');
      return { ok: false, reason: 'level' };
    }
    if (foodCount(foodId) < 1) {
      toast('You need a Rebirth Meal in the pantry. Stock one from the market.', '🌱');
      return { ok: false, reason: 'empty' };
    }
    addFoodRaw(foodId, -1);
    const cycle = (s.rebirths || 0) + 1;
    const carriedBond = Math.max(20, Math.round((s.bond || 0) * 0.5));
    s.rebirths = cycle;
    s.stage = 'egg';
    s.level = 1;
    s.xp = 0;
    s.hatch = 0;
    s.eggLabel = `Rebirth ${cycle} Egg`;
    s.retired = false;
    s.retiredAt = 0;
    s.asleep = false;
    s.sleepUntil = 0;
    s.sleepStart = 0;
    s.sleepCycles = 0;
    s.bond = carriedBond;
    s.needs = { hunger: 78, energy: 82, joy: 86, clean: 95 };
    s.form = null;
    s.special = null;
    s.evolvedAt = 0;
    s.diet = { hearty: 0, sweet: 0, eerie: 0, wild: 0 };
    s.sugar = 0;
    s.restUntil = 0;
    s.born = Date.now();
    const coins = 500 + cycle * 150;
    const pool = FOOD_KEYS.filter((key) => !FOODS[key].rebirth && !FOODS[key].monthly && !FOODS[key].giftOnly);
    const foodKey = pick(pool);
    const snackKey = pick(SNACK_KEYS);
    addCoinsRaw(coins);
    addFoodRaw(foodKey, 2);
    addSnackRaw(snackKey, 2);
    state.stats.rebirths = (state.stats.rebirths || 0) + 1;
    unlockSecret('rebirthkeeper');
    Sfx.win();
    toast(`${displayName(s)} reincarnated into a Rebirth ${cycle} Egg · +${coins} coins, ${FOODS[foodKey].name} ×2, ${SNACKS[snackKey].name} ×2`, '🌱');
    commit('rebirth', { spriteId: s.id, rebirths: cycle, coins });
    return { ok: true, sprite: s, rebirths: cycle, coins, foodKey, snackKey };
  },

  pet(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false };
    if (s.asleep) {
      s.asleep = false;
      s.sleepUntil = 0;
      Sfx.pop();
      toast(`${displayName(s)} woke up.`, '👀');
      commit('wake', { spriteId: id });
      return { ok: true, woke: true, coins: 0 };
    }
    const now = Date.now();
    const cooled = now - (s.lastPet || 0) < 3200;
    if (cooled) {
      commit('pet-warm', { spriteId: id });
      return { ok: true, coins: 0, cooled: true };
    }
    s.lastPet = now;
    const fx = spriteEffects(s);
    s.needs.joy = clamp(s.needs.joy + 3.5);
    addBondRaw(s, 2 * (fx.petBond || 1));
    bump('pets');
    state.stats.pets += 1;
    const coins = 1 + (fx.petCoins || 0);
    addCoinsRaw(coins);
    addXpRaw(s, 1);
    Sfx.purr();
    commit('pet', { spriteId: id, coins });
    return { ok: true, coins, cooled: false };
  },

  feed(id, foodId) {
    const s = findSprite(id);
    const food = FOODS[foodId];
    if (!s || s.stage === 'egg' || !food) return { ok: false, reason: 'missing' };
    if (s.asleep) {
      s.asleep = false;
      s.sleepUntil = 0;
    }
    if (state.coins < food.price) {
      toast('Not enough coins — try an activity!', '🪙');
      Sfx.error();
      return { ok: false, reason: 'coins' };
    }
    if (s.needs.hunger >= 97 && food.hunger > 0) {
      toast(`${displayName(s)} is too full for that.`, '😅');
      return { ok: false, reason: 'full' };
    }
    addCoinsRaw(-food.price);
    s.needs.hunger = clamp(s.needs.hunger + (food.hunger || 0));
    s.needs.energy = clamp(s.needs.energy + (food.energy || 0));
    s.needs.joy = clamp(s.needs.joy + (food.joy || 0));
    s.needs.clean = clamp(s.needs.clean + (food.clean || 0));
    if (food.bond) addBondRaw(s, food.bond);
    addBondRaw(s, 1.2);
    addXpRaw(s, food.xp || 4);
    const diet = dietGainRaw(s, foodId);
    const candy = candyMorphRaw(s, foodId);
    bump('feeds');
    state.stats.feeds += 1;
    Sfx.eat();
    if (food.clean && food.clean < 0) toast('A little messy, but worth it.', '🍲');
    if (diet && diet.before < EVOLUTION_AFFINITY && diet.after >= EVOLUTION_AFFINITY && s.level >= EVOLUTION_LEVEL && !s.form) {
      toast(`${displayName(s)} is ready to evolve! Check their details.`, '🧬');
    }
    commit('feed', { spriteId: id, foodId });
    return { ok: true, food, diet, candy };
  },

  buyFoodStock(foodId) {
    const food = FOODS[foodId];
    if (!food) return { ok: false, reason: 'missing' };
    if (food.giftOnly) return { ok: false, reason: 'gift-only' };
    if (state.coins < food.price) {
      toast('Not enough coins for that.', '🪙');
      Sfx.error();
      return { ok: false, reason: 'coins' };
    }
    addCoinsRaw(-food.price);
    addFoodRaw(foodId, 1);
    commit('stockFood', { foodId });
    return { ok: true, food };
  },

  feedStock(id, foodId) {
    const s = findSprite(id);
    const food = FOODS[foodId];
    if (!s || s.stage === 'egg' || !food) return { ok: false, reason: 'missing' };
    if (foodCount(foodId) < 1) return { ok: false, reason: 'empty' };
    if (food.rebirth) return this.reincarnate(id, foodId);
    if (food.stageBoost && s.level >= MAX_LEVEL) {
      toast(`${displayName(s)} is already at MAX level. Save the feast for someone else.`, '🌟');
      return { ok: false, reason: 'max' };
    }
    if (s.asleep) {
      s.asleep = false;
      s.sleepUntil = 0;
    }
    if (!food.stageBoost && s.needs.hunger >= 97 && food.hunger > 0) {
      toast(`${displayName(s)} is too full for that.`, '😅');
      return { ok: false, reason: 'full' };
    }
    const fx = spriteEffects(s);
    addFoodRaw(foodId, -1);
    s.needs.hunger = clamp(s.needs.hunger + (food.hunger || 0));
    s.needs.energy = clamp(s.needs.energy + (food.energy || 0));
    s.needs.joy = clamp(s.needs.joy + (food.joy || 0));
    s.needs.clean = clamp(s.needs.clean + (food.clean || 0));
    if (food.bond) addBondRaw(s, food.bond);
    addBondRaw(s, 1.2);
    addXpRaw(s, (food.xp || 4) * (fx.xp || 1));
    const stageBoost = food.stageBoost ? stageFeastRaw(s) : null;
    const diet = dietGainRaw(s, foodId);
    const candy = candyMorphRaw(s, foodId);
    bump('feeds');
    state.stats.feeds += 1;
    Sfx.eat();
    if (diet && diet.before < EVOLUTION_AFFINITY && diet.after >= EVOLUTION_AFFINITY && s.level >= EVOLUTION_LEVEL && !s.form) {
      toast(`${displayName(s)} is ready to evolve! Check their details.`, '🧬');
    }
    commit('feedStock', { spriteId: id, foodId });
    return { ok: true, food, diet, candy, stageBoost };
  },

  feedSnack(id, snackId) {
    const s = findSprite(id);
    const snack = SNACKS[snackId];
    if (!s || s.stage === 'egg' || !snack) return { ok: false, reason: 'missing' };
    if (snackCount(snackId) < 1) return { ok: false, reason: 'empty' };
    if (s.asleep) {
      s.asleep = false;
      s.sleepUntil = 0;
    }
    if (s.needs.hunger >= 97 && snack.hunger > 0) {
      toast(`${displayName(s)} is too full for that.`, '😅');
      return { ok: false, reason: 'full' };
    }
    const fx = spriteEffects(s);
    addSnackRaw(snackId, -1);
    s.needs.hunger = clamp(s.needs.hunger + (snack.hunger || 0));
    s.needs.energy = clamp(s.needs.energy + (snack.energy || 0));
    s.needs.joy = clamp(s.needs.joy + (snack.joy || 0));
    s.needs.clean = clamp(s.needs.clean + (snack.clean || 0));
    if (snack.bond) addBondRaw(s, snack.bond);
    addBondRaw(s, 1.2);
    addXpRaw(s, (snack.xp || 6) * (fx.snackXp || 1));
    const diet = dietGainRaw(s, snackId);
    const candy = candyMorphRaw(s, snackId);
    bump('feeds');
    state.stats.feeds += 1;
    Sfx.eat();
    if (diet && diet.before < EVOLUTION_AFFINITY && diet.after >= EVOLUTION_AFFINITY && s.level >= EVOLUTION_LEVEL && !s.form) {
      toast(`${displayName(s)} is ready to evolve! Check their details.`, '🧬');
    }
    commit('feedSnack', { spriteId: id, snackId });
    return { ok: true, snack, diet, candy };
  },

  bathe(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false };
    if (s.asleep) {
      s.asleep = false;
      s.sleepUntil = 0;
    }
    s.needs.clean = clamp(s.needs.clean + 36);
    s.needs.joy = clamp(s.needs.joy + 5);
    addBondRaw(s, 2.5);
    addXpRaw(s, 8);
    addCoinsRaw(3);
    bump('baths');
    state.stats.baths += 1;
    Sfx.bath();
    commit('bath', { spriteId: id });
    return { ok: true };
  },

  nap(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false };
    if (s.asleep) return { ok: false, reason: 'asleep' };
    const start = Date.now();
    s.asleep = true;
    s.sleepStart = start;
    s.sleepCycles = 1;
    s.sleepUntil = start + NAP_MS;
    addBondRaw(s, 2);
    addXpRaw(s, 4);
    bump('naps');
    state.stats.naps += 1;
    Sfx.sleep();
    toast('Shhh… nap time for 30 seconds.', '😴');
    commit('nap', { spriteId: id });
    return { ok: true };
  },

  rubBelly(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false, reason: 'missing' };
    if (s.asleep) {
      s.asleep = false;
      s.sleepUntil = 0;
    }
    const now = Date.now();
    if (now - (s.lastRub || 0) < 5000) return { ok: true, cooled: true, coins: 0 };
    s.lastRub = now;
    const fx = spriteEffects(s);
    s.needs.joy = clamp(s.needs.joy + 10);
    addBondRaw(s, 6 * (fx.petBond || 1));
    addXpRaw(s, 6);
    const coins = 2 + (fx.petCoins || 0);
    addCoinsRaw(coins);
    bump('rubs');
    state.stats.rubs = (state.stats.rubs || 0) + 1;
    Sfx.purr();
    commit('rub', { spriteId: id, coins });
    return { ok: true, coins };
  },

  playCatch(id, mode = 'throw', catches = 5) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false, reason: 'missing' };
    if (s.asleep) {
      s.asleep = false;
      s.sleepUntil = 0;
    }
    const n = clamp(Math.round(Number(catches) || 5), 1, 8);
    const fx = spriteEffects(s);
    const coins = 8 + n * 4 + (fx.gameCoins || 0);
    const xp = 7 + n * 3;
    s.needs.joy = clamp(s.needs.joy + 14);
    s.needs.energy = clamp(s.needs.energy - 4);
    s.needs.hunger = clamp(s.needs.hunger - 2);
    addBondRaw(s, 3 + n * (fx.petBond || 1));
    addXpRaw(s, xp);
    addCoinsRaw(coins);
    bump('games');
    state.stats.games = (Number(state.stats.games) || 0) + 1;
    if (mode === 'catch') state.stats.catches = (Number(state.stats.catches) || 0) + 1;
    else state.stats.throws = (Number(state.stats.throws) || 0) + 1;
    const careGift = grantCarePackageRaw(s);
    Sfx.win();
    commit('fetch', { spriteId: id, mode, catches: n, coins, careGift: !!careGift });
    return { ok: true, coins, xp, catches: n, careGift };
  },

  tuckIn(id, opts = {}) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false };
    if (s.asleep) return { ok: false, reason: 'asleep' };
    const start = Date.now();
    const bedtime = isBedtime();
    s.asleep = true;
    s.sleepStart = start;
    s.sleepCycles = SLEEP_CYCLES;
    s.sleepUntil = start + SLEEP_CYCLE_MS * SLEEP_CYCLES;
    s.needs.joy = clamp(s.needs.joy + 5);
    addBondRaw(s, bedtime ? 5 : 2.5);
    addXpRaw(s, bedtime ? 8 : 4);
    bump('naps');
    state.stats.naps += 1;
    state.stats.tucks = (state.stats.tucks || 0) + 1;
    if (!opts.silent) {
      Sfx.sleep();
      toast(`${displayName(s)} is tucked in${bedtime ? ' for the night' : ''}. ${SLEEP_CYCLES} sleep cycles.`, '🛏️');
    }
    commit('tuck', { spriteId: id });
    return { ok: true, bedtime };
  },

  tuckAllNight() {
    const list = grownSprites().filter((s) => !s.asleep);
    if (!list.length) return { ok: false, reason: 'allAsleep' };
    list.forEach((s) => this.tuckIn(s.id, { silent: true }));
    Sfx.sleep();
    toast(`${list.length === 1 ? displayName(list[0]) + ' is' : list.length + ' sprites are'} tucked in. Goodnight.`, '🌙');
    commit('tuckAll');
    return { ok: true, count: list.length };
  },

  wake(id) {
    const s = findSprite(id);
    if (!s || !s.asleep) return { ok: false };
    const info = sleepInfo(s);
    const res = finishSleep(s);
    commit('wake', { spriteId: id });
    return { ok: true, cycles: res.cycles, dream: res.dream, cyclesBeforeWake: info?.cycle || 1 };
  },

  chat(id, text) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { coins: 0 };
    addBondRaw(s, 0.9);
    addXpRaw(s, 3);
    bump('chats');
    state.stats.chats += 1;
    let coins = 0;
    if (Date.now() - (s.lastChatReward || 0) > 25000) {
      s.lastChatReward = Date.now();
      coins = 2 + (spriteEffects(s).chatCoins || 0);
      addCoinsRaw(coins);
    }
    commit('chat', { spriteId: id });
    return { coins };
  },

  finishGame({ game = 'catch', score = 0, coins = 0, xp = 0, joy = 12 } = {}) {
    const s = activeSprite();
    const reward = gameCoinPayout(coins);
    const payout = reward.payout;
    if (s) {
      s.needs.joy = clamp(s.needs.joy + joy);
      s.needs.energy = clamp(s.needs.energy - 4);
      addBondRaw(s, 4);
      addXpRaw(s, xp);
    }
    addCoinsRaw(payout);
    state.stats.games += 1;
    state.stats.bestGame = Math.max(state.stats.bestGame || 0, score);
    const careGift = grantCarePackageRaw(s);
    let arcade = null;
    if (arcadeGameKind(game)) {
      const a = ensureArcadePeriods();
      a.coins += payout;
      a.monthCoins += payout;
      state.stats.arcadeCoins = (state.stats.arcadeCoins || 0) + payout;
      arcade = { coins: payout, lifetime: a.coins, monthCoins: a.monthCoins, nextBonusAt: arcadeNextBonusAt(a) };
    }
    bump('games');
    commit('game', { game, score, rarityBonus: reward.rarityBonus, arcade, careGift: !!careGift });
    return { sprite: s, coins: payout, rarityBonus: reward.rarityBonus, effectCoins: reward.effectCoins, arcade, careGift };
  },

  finishWalk({ route = 'walk', score = 0, distance = 0, coins = 0, xp = 0, bond = 0, joy = 12, giftTokens = 0 } = {}) {
    const s = activeSprite();
    if (!s || s.stage === 'egg') return { ok: false, reason: 'sprite' };
    const info = typeof WALK_ROUTES !== 'undefined' ? WALK_ROUTES[route] : null;
    if (!info) return { ok: false, reason: 'route' };
    const before = Math.max(0, Number(state.stats.walks) || 0);
    if (before < (info.walkUnlock || 0)) return { ok: false, reason: 'locked' };
    const reward = gameCoinPayout(coins || info.baseCoins);
    const payout = reward.payout;
    const steps = Math.max(0, Math.floor(Number(distance) || Number(score) * (info.stride || 1)));
    const bondGain = Math.max(1, Number(bond) || 1);
    s.needs.joy = clamp(s.needs.joy + Number(joy || 0));
    s.needs.energy = clamp(s.needs.energy - 5);
    s.needs.hunger = clamp(s.needs.hunger - 2);
    s.needs.clean = clamp(s.needs.clean - 3);
    addBondRaw(s, bondGain);
    const ups = addXpRaw(s, Math.max(1, Number(xp) || 1));
    addCoinsRaw(payout);
    const trail = rollTrailBonus(s, info, payout);
    const foodChance = Math.max(0, Math.min(1, Number(info.foodChance) || 0));
    const foodKey = foodChance && chance(foodChance) ? pick(unlockedFoodKeys()) : null;
    if (foodKey) addFoodRaw(foodKey, 1);
    const walks = before + 1;
    state.stats.walks = walks;
    state.stats.walkDistance = (Number(state.stats.walkDistance) || 0) + steps;
    state.stats.bestWalk = Math.max(Number(state.stats.bestWalk) || 0, steps);
    state.stats.games = (state.stats.games || 0) + 1;
    state.stats.bestGame = Math.max(Number(state.stats.bestGame) || 0, score);
    bump('walks');
    bump('games');
    const every = typeof WALK_GIFT_EVERY === 'number' ? WALK_GIFT_EVERY : 3;
    let gift = null;
    if (walks % every === 0) {
      const snackKey = pick(SNACK_KEYS);
      const giftCoins = 45 + Math.min(45, walks * 3);
      addSnackRaw(snackKey, 1);
      addCoinsRaw(giftCoins);
      state.stats.walkGifts = (Number(state.stats.walkGifts) || 0) + 1;
      gift = { snackKey, coins: giftCoins, tokens: Math.max(0, Number(giftTokens) || 0) };
    }
    const unlocked = typeof WALK_ROUTES !== 'undefined'
      ? Object.keys(WALK_ROUTES).filter((key) => WALK_ROUTES[key].walkUnlock === walks)
      : [];
    const careGift = grantCarePackageRaw(s);
    commit('walk', { route, distance: steps, walks, gift: !!gift, careGift: !!careGift });
    return {
      ok: true, sprite: s, coins: payout, xp: Math.max(1, Number(xp) || 1), bond: bondGain,
      distance: steps, walks, foodKey, gift, unlocked, leveled: ups, rarityBonus: reward.rarityBonus, careGift, trail,
    };
  },

  finishSport({ game = 'hoop', score = 0, coins = 0, xp = 0, bond = 0, joy = 14 } = {}) {
    const s = activeSprite();
    if (!s || s.stage === 'egg') return { ok: false, reason: 'sprite' };
    const info = typeof SPORT_GAMES !== 'undefined' ? SPORT_GAMES[game] : null;
    if (!info) return { ok: false, reason: 'game' };
    const reward = gameCoinPayout(coins || info.baseCoins);
    const payout = reward.payout;
    const bondGain = Math.max(1, Number(bond) || 1);
    s.needs.joy = clamp(s.needs.joy + Number(joy || 0));
    s.needs.energy = clamp(s.needs.energy - 6);
    s.needs.hunger = clamp(s.needs.hunger - 3);
    s.needs.clean = clamp(s.needs.clean - 3);
    addBondRaw(s, bondGain);
    const ups = addXpRaw(s, Math.max(1, Number(xp) || 1));
    addCoinsRaw(payout);
    const sports = (Number(state.stats.sports) || 0) + 1;
    state.stats.sports = sports;
    state.stats.bestGame = Math.max(Number(state.stats.bestGame) || 0, score);
    state.stats.games = (state.stats.games || 0) + 1;
    const foodChance = Math.max(0, Math.min(1, Number(info.foodChance) || 1));
    const foodKey = chance(foodChance) ? pick(unlockedFoodKeys()) : null;
    if (foodKey) addFoodRaw(foodKey, 1);
    const every = typeof SPORT_GIFT_EVERY === 'number' ? SPORT_GIFT_EVERY : 2;
    let gift = null;
    if (sports % every === 0) {
      const snackKey = pick(SNACK_KEYS);
      const giftCoins = 60 + Math.min(60, sports * 4);
      addSnackRaw(snackKey, 1);
      addCoinsRaw(giftCoins);
      state.stats.sportGifts = (Number(state.stats.sportGifts) || 0) + 1;
      gift = { snackKey, coins: giftCoins };
    }
    bump('sports');
    bump('games');
    const careGift = grantCarePackageRaw(s);
    commit('sport', { game, score, sports, gift: !!gift, careGift: !!careGift });
    return {
      ok: true, sprite: s, coins: payout, xp: Math.max(1, Number(xp) || 1), bond: bondGain,
      foodKey, gift, sports, leveled: ups, rarityBonus: reward.rarityBonus, careGift,
    };
  },

  claimArcadeBonus() {
    const a = ensureArcadePeriods();
    const nextAt = arcadeNextBonusAt(a);
    if (a.coins < nextAt) return { ok: false, reason: 'progress', nextAt, progress: a.coins };
    const index = a.bonusClaims + 1;
    const coins = 150 + Math.min(300, index * 25);
    const foodPool = FOOD_KEYS.filter((k) => !FOODS[k].giftOnly && !FOODS[k].monthly);
    const foodKey = pick(foodPool);
    const snackKey = pick(SNACK_KEYS);
    const feast = index % ARCADE_BONUS_FEAST_EVERY === 0;
    addCoinsRaw(coins);
    addFoodRaw(foodKey, 1);
    addSnackRaw(snackKey, 1);
    if (feast) addFoodRaw(STARPATH_FOOD_ID, 1);
    a.bonusClaims = index;
    state.stats.arcadeGifts = (state.stats.arcadeGifts || 0) + 1;
    const nextBonusAt = arcadeNextBonusAt(a);
    Sfx.win();
    commit('arcadeBonus', { index, feast, nextAt: nextBonusAt });
    return { ok: true, index, coins, foodKey, snackKey, feast, nextAt: nextBonusAt };
  },

  claimArcadeMonthGift(id) {
    const a = ensureArcadePeriods();
    const gift = arcadeMonthGift(id);
    if (!gift) return { ok: false, reason: 'missing' };
    if (a.monthClaims.includes(gift.id)) return { ok: false, reason: 'claimed' };
    if (a.monthCoins < gift.at) return { ok: false, reason: 'progress', need: gift.at - a.monthCoins };
    const foodPool = FOOD_KEYS.filter((k) => !FOODS[k].giftOnly && !FOODS[k].monthly);
    const foods = [];
    const snacks = [];
    for (let i = 0; i < gift.foods; i++) {
      const key = pick(foodPool);
      foods.push(key);
      addFoodRaw(key, 1);
    }
    for (let i = 0; i < gift.snacks; i++) {
      const key = pick(SNACK_KEYS);
      snacks.push(key);
      addSnackRaw(key, 1);
    }
    if (gift.feasts) addFoodRaw(STARPATH_FOOD_ID, gift.feasts);
    addCoinsRaw(gift.coins);
    a.monthClaims.push(gift.id);
    state.stats.arcadeMonthGifts = (state.stats.arcadeMonthGifts || 0) + 1;
    Sfx.win();
    commit('arcadeMonthGift', { id: gift.id, coins: gift.coins });
    return { ok: true, gift, foods, snacks, feasts: gift.feasts, coins: gift.coins };
  },

  warmEgg(id, amount) {
    const s = findSprite(id);
    if (!s || s.stage !== 'egg' || s.hatch >= 100) return { ok: false };
    s.hatch = clamp(s.hatch + (amount ?? randInt(7, 12)));
    bump('warms');
    if (s.hatch >= 100 && !s.readyAnnounced) {
      s.readyAnnounced = true;
      toast('The egg is ready to hatch!', '🐣');
      Sfx.pop();
    }
    commit('egg', { spriteId: id });
    return { ok: true, hatch: s.hatch };
  },

  hatchEgg(id) {
    const s = findSprite(id);
    if (!s || s.stage !== 'egg' || s.hatch < 100) return { ok: false };
    s.stage = 'baby';
    s.level = 1;
    s.xp = 0;
    s.bond = 10;
    s.born = Date.now();
    s.needs = { hunger: 72, energy: 78, joy: 74, clean: 88 };
    if (!s.name) s.name = makeName(s.element);
    s.hatch = 100;
    const wasShiny = !!s.shiny;
    if (!wasShiny && chance(shineChanceForHatch(s))) {
      s.shiny = true;
      state.stats.shinies = (state.stats.shinies || 0) + 1;
    }
    if (!state.activeId) state.activeId = s.id;
    addCoinsRaw(10);
    addXpRaw(s, 20);
    bump('hatches');
    state.stats.hatches += 1;
    checkProgressSecrets();
    Sfx.hatch();
    commit('hatch', { spriteId: s.id });
    return { ok: true, sprite: s, newShine: !wasShiny && !!s.shiny };
  },

  buyEgg(tierId) {
    const tier = EGG_TIERS[tierId];
    if (!tier) return { ok: false, reason: 'missing' };
    if (state.coins < tier.price) {
      toast('Not enough coins for that egg.', '🪙');
      Sfx.error();
      return { ok: false, reason: 'coins' };
    }
    addCoinsRaw(-tier.price);
    const egg = tier.id === 'mythic'
      ? rollEgg(tierId, { element: rollMythicEggElement(), eggLabel: 'Mythic Egg' })
      : rollEgg(tierId);
    state.sprites.push(egg);
    commit('buyEgg', { spriteId: egg.id });
    return { ok: true, egg };
  },

  buyTypeEgg(elementKey) {
    const price = TYPE_EGG_PRICE[elementKey];
    if (!price || !ELEMENTS[elementKey]) return { ok: false, reason: 'missing' };
    if (state.coins < price) {
      toast('Not enough coins for that egg.', '🪙');
      Sfx.error();
      return { ok: false, reason: 'coins' };
    }
    addCoinsRaw(-price);
    const egg = rollEgg('common', {
      element: elementKey,
      eggLabel: `${ELEMENTS[elementKey].name} Egg`,
    });
    state.sprites.push(egg);
    commit('buyEgg', { spriteId: egg.id });
    return { ok: true, egg };
  },

  previewMerge(aId, bId) {
    const a = findSprite(aId);
    const b = findSprite(bId);
    if (!a || !b) return { error: 'Pick two sprites first.' };
    if (a.id === b.id) return { error: 'Two different sprites, please.' };
    if (a.stage === 'egg' || b.stage === 'egg') return { error: 'Eggs need to hatch before merging.' };
    if (a.level < 3 || b.level < 3) return { error: 'Both sprites must be level 3 to merge.' };
    if (restLeft(a) > 0 || restLeft(b) > 0) return { error: 'One of them is still resting.' };
    const cost = mergeCost(a, b);
    if (state.coins < cost) return { error: `You need ${cost} coins to merge.` };
    const child = buildChild(a, b);
    const twinChance = Math.min(0.38, 0.05 + (state.stats.merges || 0) * 0.015);
    const twins = chance(twinChance);
    const child2 = twins ? buildChild(a, b) : null;
    return { error: null, cost, child, child2, twins, odds: mergeOdds(a, b), a, b };
  },

  completeMerge(aId, bId, child, child2 = null) {
    const a = findSprite(aId);
    const b = findSprite(bId);
    if (!a || !b || !child) return { ok: false };
    const cost = mergeCost(a, b);
    if (state.coins < cost) return { ok: false, reason: 'coins' };
    addCoinsRaw(-cost);
    state.sprites.push(child);
    if (child2) state.sprites.push(child2);
    a.restUntil = Date.now() + 60000;
    b.restUntil = Date.now() + 60000;
    addXpRaw(a, 12);
    addXpRaw(b, 12);
    state.stats.merges += 1;
    if (child.shiny) state.stats.shinies = (state.stats.shinies || 0) + 1;
    if (child2?.shiny) state.stats.shinies = (state.stats.shinies || 0) + 1;
    if (child2) state.stats.twins = (state.stats.twins || 0) + 1;
    if (child.special) state.stats.specials = (state.stats.specials || 0) + 1;
    if (child2?.special) state.stats.specials = (state.stats.specials || 0) + 1;
    bump('merges');
    Sfx.hatch();
    commit('merge', { spriteId: child.id, twins: !!child2 });
    return { ok: true, child, child2, eggs: child2 ? [child, child2] : [child], cost };
  },

  claimTask(taskId, period = 'daily') {
    ensureQuests();
    const bucket = period === 'weekly' ? state.weekly : period === 'monthly' ? state.monthly : state.daily;
    const task = bucket?.tasks.find((t) => t.id === taskId);
    if (!task) return { ok: false };
    if (task.claimed) return { ok: false, reason: 'claimed' };
    if (periodCounter(task, period) < task.goal) return { ok: false, reason: 'progress' };
    task.claimed = true;
    const s = activeSprite();
    const bonusCoins = s ? (spriteEffects(s).taskCoins || 0) : 0;
    const totalReward = task.reward + bonusCoins;
    addCoinsRaw(totalReward);
    state.stats.tasksClaimed = (state.stats.tasksClaimed || 0) + 1;
    if (state.stats.tasksClaimed >= 10) unlockSecret('taskkeeper');
    if (s) addXpRaw(s, task.xp || 15);
    Sfx.coin();
    toast(`${period === 'daily' ? 'Task' : period === 'weekly' ? 'Weekly goal' : 'Monthly quest'} complete +${totalReward} coins${bonusCoins ? ` · pony +${bonusCoins}` : ''}`, '✅');
    commit('task', { taskId, period, reward: totalReward, bonusCoins });
    return { ok: true, reward: totalReward, bonusCoins };
  },

  checkIn() {
    const c = ensureCheckinPeriods();
    const today = dayKey();
    const win = currentCheckinWindow();
    if (c.slots.includes(win.id)) {
      return { ok: false, reason: 'window', window: win, slots: c.slots.slice() };
    }
    const firstToday = c.slots.length === 0;
    let streak = c.streak || 0;
    if (firstToday) {
      streak = c.last === today ? Math.max(1, streak) : c.last === yesterdayKey() ? streak + 1 : 1;
      c.streak = streak;
      c.last = today;
      c.monthDays = (c.monthDays || 0) + 1;
      c.yearDays = (c.yearDays || 0) + 1;
    }
    c.slots.push(win.id);
    c.weekSlots = (c.weekSlots || 0) + 1;
    c.monthSlots = (c.monthSlots || 0) + 1;
    c.yearSlots = (c.yearSlots || 0) + 1;
    state.stats.checkins = (state.stats.checkins || 0) + 1;
    state.stats.bestStreak = Math.max(state.stats.bestStreak || 0, streak);
    if (state.stats.checkins >= 7) unlockSecret('dailykeeper');
    const holiday = typeof activeHoliday === 'function' ? activeHoliday() : null;
    const s = activeSprite();
    const bonusCoins = s ? (spriteEffects(s).checkinCoins || 0) : 0;
    const baseReward = firstToday ? 20 + Math.min(streak, 7) * 5 : 8 + Math.min(streak, 7) * 2;
    const reward = Math.round(baseReward * (holiday?.coinMult || 1) * weeklyEventCoinMult()) + bonusCoins;
    addCoinsRaw(reward);
    if (s) addXpRaw(s, firstToday ? 12 : 5);
    const snackKey = chance(firstToday ? 0.45 : 0.3) ? pick(SNACK_KEYS) : null;
    if (snackKey) addSnackRaw(snackKey, 1);
    const foodKey = firstToday ? pick(unlockedFoodKeys()) : null;
    if (foodKey) addFoodRaw(foodKey, 1);
    const holidayFood = firstToday && holiday?.treat && FOODS[holiday.treat] ? holiday.treat : null;
    if (holidayFood) addFoodRaw(holidayFood, 1);
    const milestones = [];
    WEEK_MILESTONES.forEach((m) => {
      if (c.weekSlots >= m.n && !c.weekClaims.includes(m.id)) {
        c.weekClaims.push(m.id);
        const rewardInfo = grantMilestoneRaw(m);
        if (rewardInfo) milestones.push(rewardInfo);
      }
    });
    MONTH_MILESTONES.forEach((m) => {
      if ((c.monthSlots || 0) >= m.n && !c.monthClaims.includes(m.id)) {
        c.monthClaims.push(m.id);
        const rewardInfo = grantMilestoneRaw(m);
        if (rewardInfo) milestones.push(rewardInfo);
      }
    });
    if ((c.yearSlots || 0) >= YEAR_MILESTONE.n && !c.yearClaims.includes(YEAR_MILESTONE.id)) {
      c.yearClaims.push(YEAR_MILESTONE.id);
      const rewardInfo = grantMilestoneRaw(YEAR_MILESTONE);
      if (rewardInfo) milestones.push(rewardInfo);
    }
    ensureGift();
    Sfx.coin();
    commit('checkin', { streak, reward, window: win.id });
    return {
      ok: true, reward, bonusCoins, streak, window: win, firstToday,
      snackKey, foodKey, holidayFood, holiday: holiday?.key || null, milestones, slots: c.slots.slice(), weekSlots: c.weekSlots,
    };
  },

  claimWeeklyEvent() {
    const event = activeWeeklyEvent();
    if (!event) return { ok: false, reason: 'event' };
    const weekly = ensureWeeklyEvents();
    if (weekly.claims.includes(event.key)) return { ok: false, reason: 'claimed', event };
    const reward = event.reward || {};
    const result = { ok: true, event, coins: reward.coins || 0, snacks: [], foods: [], vault: [], crates: 0, monthly: null };
    if (reward.kind === 'vault') {
      const missing = weeklyEventMissingVaultKeys();
      missing.forEach((key) => {
        const sprite = unlockSecretRaw(key);
        if (sprite) result.vault.push(sprite);
      });
      if (!missing.length) result.coins += 250;
    } else if (reward.kind === 'crates') {
      const index = WEEKLY_EVENTS.findIndex((item) => item.key === event.key);
      const missed = WEEKLY_EVENTS.slice(0, Math.max(0, index)).filter((item) => !weekly.claims.includes(item.key));
      result.crates = missed.length;
      missed.forEach(() => {
        result.coins += 80;
        const snack = pick(SNACK_KEYS);
        addSnackRaw(snack, 1);
        result.snacks.push(snack);
      });
      const c = ensureCheckinPeriods();
      if (c.monthCrateKey !== monthKey()) {
        const coins = 100 + Math.min(50, (c.monthDays || 0) * 5);
        const lockedFoods = MONTHLY_FOOD_KEYS.filter((key) => !(state.foodUnlocks || []).includes(key));
        const newFood = lockedFoods[0] || null;
        if (newFood) {
          state.foodUnlocks = state.foodUnlocks || [];
          state.foodUnlocks.push(newFood);
          addFoodRaw(newFood, 2);
        }
        const bundle = [];
        for (let i = 0; i < 3; i++) {
          const key = pick(unlockedFoodKeys());
          bundle.push(key);
          addFoodRaw(key, 1);
        }
        c.monthCrateKey = monthKey();
        state.stats.monthCrates = (state.stats.monthCrates || 0) + 1;
        result.monthly = { coins, newFood, bundle };
        result.coins += coins;
      }
    } else if (reward.foodCats?.length) {
      const keys = weeklyEventFoodKeys(event);
      keys.forEach((key) => {
        addFoodRaw(key, 1);
        result.foods.push(key);
      });
    }
    const snacks = Math.max(0, Number(reward.snacks) || 0);
    for (let i = 0; i < snacks; i++) {
      const snack = pick(SNACK_KEYS);
      addSnackRaw(snack, 1);
      result.snacks.push(snack);
    }
    addCoinsRaw(result.coins);
    weekly.claims.push(event.key);
    state.stats.weeklyEventClaims = (state.stats.weeklyEventClaims || 0) + 1;
    commit('weekly-event', { event: event.key, coins: result.coins, vault: result.vault.length, foods: result.foods.length, crates: result.crates });
    return result;
  },

  claimMonthly() {
    const c = ensureCheckinPeriods();
    const month = monthKey();
    if (c.monthCrateKey === month) return { ok: false, reason: 'claimed' };
    const coins = 100 + Math.min(50, (c.monthDays || 0) * 5);
    addCoinsRaw(coins);
    const lockedFoods = MONTHLY_FOOD_KEYS.filter((k) => !(state.foodUnlocks || []).includes(k));
    const newFood = lockedFoods[0] || null;
    if (newFood) {
      state.foodUnlocks = state.foodUnlocks || [];
      state.foodUnlocks.push(newFood);
      addFoodRaw(newFood, 2);
    }
    const pool = unlockedFoodKeys();
    const bundle = [];
    for (let i = 0; i < 3; i++) {
      const key = pick(pool);
      bundle.push(key);
      addFoodRaw(key, 1);
    }
    c.monthCrateKey = month;
    state.stats.monthCrates = (state.stats.monthCrates || 0) + 1;
    Sfx.coin();
    commit('monthly', { coins, newFood });
    return { ok: true, coins, newFood, bundle };
  },

  claimWeekendGift() {
    if (typeof weekendAdminActive !== 'function' || !weekendAdminActive()) return { ok: false, reason: 'weekend' };
    const event = weekendAdminEvent();
    const week = weekendAdminDateKey();
    if (weekendAdminClaimed()) return { ok: false, reason: 'claimed', event };
    const pool = weekendAdminEggPool();
    const key = pool.includes(event.egg) ? event.egg : (pool.length ? pick(pool) : dailyEggFeatured());
    const egg = rollEgg('wild', { element: key, eggLabel: `${ELEMENTS[key].name} Event Egg` });
    egg.hatch = 40;
    state.sprites.push(egg);
    const coins = Math.round((event.coins || 300) * (1 + Math.min(0.5, (state.stats.weekendGifts || 0) * 0.02)));
    addCoinsRaw(coins);
    state.weekendGift = { week, event: event.key, key };
    state.stats.weekendGifts = (state.stats.weekendGifts || 0) + 1;
    Sfx.win();
    commit('weekendGift', { event: event.key, element: key, coins });
    return { ok: true, event, egg, element: key, coins, week };
  },

  claimDailyEgg(elementKey) {
    const today = dayKey();
    if (state.eggGift?.date === today) return { ok: false, reason: 'claimed' };
    const pool = dailyEggPool();
    const key = pool.includes(elementKey) ? elementKey : dailyEggFeatured();
    const egg = rollEgg('wild', { element: key, eggLabel: `${ELEMENTS[key].name} Gift Egg` });
    egg.hatch = 40;
    state.sprites.push(egg);
    state.eggGift = { date: today, key };
    state.stats.dailyEggs = (state.stats.dailyEggs || 0) + 1;
    Sfx.hatch();
    commit('dailyEgg', { element: key, spriteId: egg.id });
    return { ok: true, egg, element: key };
  },

  claimHolidayGift() {
    const holiday = typeof activeHoliday === 'function' ? activeHoliday() : null;
    if (!holiday) return { ok: false, reason: 'event' };
    const today = dayKey();
    if (state.holidayGift?.date === today && state.holidayGift.holiday === holiday.key) {
      return { ok: false, reason: 'claimed', holiday };
    }
    const pool = holidayEggPool(holiday);
    const key = pool.length ? pick(pool) : dailyEggFeatured();
    const egg = rollEgg('wild', { element: key, eggLabel: `${ELEMENTS[key].name} ${holiday.name} Egg` });
    egg.hatch = 40;
    state.sprites.push(egg);
    const coins = Math.round(80 * (holiday.coinMult || 1)) + 40;
    addCoinsRaw(coins);
    const snack = pick(SNACK_KEYS);
    addSnackRaw(snack, 1);
    state.holidayGift = { date: today, holiday: holiday.key, key };
    state.stats.holidayGifts = (state.stats.holidayGifts || 0) + 1;
    Sfx.win();
    commit('holidayGift', { holiday: holiday.key, element: key, coins });
    return { ok: true, holiday, egg, element: key, coins, snack };
  },

  claimGift() {
    if (!giftReady()) return { ok: false, reason: 'waiting' };
    const gift = state.gift;
    const s = findSprite(gift.spriteId) || activeSprite();
    if (!s) return { ok: false, reason: 'missing' };
    const lockedScenes = GIFT_SCENES.filter((k) => !state.unlockedScenes.includes(k));
    const roll = Math.random();
    let reward;
    if (lockedScenes.length && roll < 0.24) {
      const key = pick(lockedScenes);
      state.unlockedScenes.push(key);
      reward = { kind: 'scene', icon: '🏞️', title: 'A new environment!', text: `${SCENES[key].name} is now available in the Studio.`, sceneKey: key };
    } else if (roll < 0.44) {
      const key = pick(SNACK_KEYS);
      const amount = randInt(1, 2);
      addSnackRaw(key, amount);
      reward = { kind: 'snack', icon: SNACKS[key].emoji, title: 'A snack gift', text: `${SNACKS[key].name} ×${amount}` };
    } else if (roll < 0.7) {
      const xp = randInt(24, 55);
      addXpRaw(s, xp);
      reward = { kind: 'xp', icon: '⭐', title: 'A burst of XP', text: `+${xp} XP for ${displayName(s)}` };
    } else {
      const coins = randInt(25, 65);
      addCoinsRaw(coins);
      reward = { kind: 'coins', icon: '🪙', title: 'A little coin gift', text: `+${coins} coins` };
    }
    state.stats.gifts = (state.stats.gifts || 0) + 1;
    if (state.stats.gifts >= 20) unlockSecret('giftkeeper');
    state.gift = null;
    scheduleGiftRaw(false);
    Sfx.win();
    commit('gift', { kind: reward.kind, spriteId: s.id });
    return { ok: true, reward, sprite: s, nextAt: state.gift?.readyAt || 0 };
  },

  evolve(id, formId) {
    const s = findSprite(id);
    const form = EVOLUTION_FORMS[formId];
    if (!s || s.stage === 'egg' || !form) return { ok: false, reason: 'missing' };
    if (s.form) return { ok: false, reason: 'already' };
    if (s.level < EVOLUTION_LEVEL) return { ok: false, reason: 'level' };
    if ((s.diet?.[form.diet] || 0) < EVOLUTION_AFFINITY) return { ok: false, reason: 'diet' };
    s.form = form.id;
    s.size = form.size;
    s.evolvedAt = Date.now();
    s.bond = clamp(s.bond + 8);
    addXpRaw(s, 45);
    addCoinsRaw(25);
    state.stats.evolves = (state.stats.evolves || 0) + 1;
    Sfx.level();
    toast(`${displayName(s)} evolved into ${formName(s)}!`, form.icon);
    if (typeof celebrateFormEvolution === 'function') setTimeout(() => celebrateFormEvolution(s, form), 320);
    commit('evolve', { spriteId: s.id, form: form.id });
    return { ok: true, form, sprite: s };
  },

  customize(id, patch) {
    const s = findSprite(id);
    if (!s) return;
    if (patch.palette && (PALETTES[patch.palette] || patch.palette === 'native')) {
      s.palette = patch.palette;
    }
    if (patch.pattern && PATTERNS[patch.pattern]) s.pattern = patch.pattern;
    if (patch.accessory && ACCESSORIES[patch.accessory]) s.accessory = patch.accessory;
    if (patch.breed && BREEDS[patch.breed] && s.stage !== 'egg') s.breed = patch.breed;
    if (patch.element && ELEMENTS[patch.element] && s.stage !== 'egg') {
      s.element = patch.element;
      s.hybrid = null;
      s.hybridParents = null;
    }
    commit('customize', { spriteId: id });
  },

  addCustomClothes(data = {}) {
    const name = String(data.name || '').trim();
    if (!name) return { ok: false, reason: 'name' };
    const cloth = normalizeCustomCloth({ ...data, id: uid('cloth') });
    state.customClothes = state.customClothes || [];
    state.customClothes.unshift(cloth);
    commit('customClothes', { id: cloth.id });
    return { ok: true, cloth };
  },

  wearCustomClothes(spriteId, id) {
    const s = findSprite(spriteId);
    if (!s) return { ok: false, reason: 'missing' };
    if (id && !customClothFor(id)) return { ok: false, reason: 'missing' };
    s.outfit = id || null;
    commit('outfit', { spriteId });
    return { ok: true, outfit: s.outfit };
  },

  deleteCustomClothes(id) {
    const before = (state.customClothes || []).length;
    state.customClothes = (state.customClothes || []).filter((cloth) => cloth.id !== id);
    if (state.customClothes.length === before) return { ok: false, reason: 'missing' };
    state.sprites.forEach((sprite) => {
      if (sprite.outfit === id) sprite.outfit = null;
    });
    commit('customClothes', { removed: id });
    return { ok: true };
  },

  addCustomScene(data = {}) {
    const name = String(data.name || '').trim();
    if (!name) return { ok: false, reason: 'name' };
    const scene = normalizeCustomScene({ ...data, id: uid('scene') });
    registerCustomScene(scene);
    state.customScenes = state.customScenes || [];
    state.customScenes.unshift(scene);
    state.unlockedScenes = Array.from(new Set([...(state.unlockedScenes || []), scene.id]));
    if (data.travel !== false) state.theme.scene = scene.id;
    commit('customScene', { id: scene.id });
    return { ok: true, scene };
  },

  deleteCustomScene(id) {
    const before = (state.customScenes || []).length;
    state.customScenes = (state.customScenes || []).filter((scene) => scene.id !== id);
    if (state.customScenes.length === before) return { ok: false, reason: 'missing' };
    state.unlockedScenes = (state.unlockedScenes || []).filter((key) => key !== id);
    unregisterCustomScene(id);
    if (state.theme.scene === id) state.theme.scene = 'grove';
    commit('customScene', { removed: id });
    return { ok: true };
  },

  rename(id, name) {
    const s = findSprite(id);
    if (!s) return;
    const clean = String(name || '').trim().slice(0, 16);
    s.name = clean || s.name || makeName(s.element);
    commit('rename', { spriteId: id });
  },

  setTheme(patch) {
    const previousScene = state.theme && state.theme.scene;
    let travelled = false;
    state.theme = { ...state.theme, ...patch };
    if (patch.scene) {
      if (!SCENES[patch.scene]) state.theme.scene = 'grove';
      else {
        travelled = previousScene !== patch.scene;
        state.unlockedScenes = Array.from(new Set([...(state.unlockedScenes || []), patch.scene]));
        recordBiomeVisit(patch.scene);
        if (typeof biomeQuestNote === 'function') biomeQuestNote('travel');
      }
    }
    if (travelled) {
      state.stats.travels = (Number(state.stats.travels) || 0) + 1;
      addCoinsRaw(TRAVEL_COINS);
    }
    commit('theme');
    if (travelled) return { ok: true, coins: TRAVEL_COINS, travels: state.stats.travels, scene: state.theme.scene };
    return undefined;
  },

  setHome(spriteId, sceneKey) {
    const s = findSprite(spriteId);
    if (!s) return;
    state.homes = { ...(state.homes || {}) };
    if (sceneKey && SCENES[sceneKey]) state.homes[spriteId] = sceneKey;
    else delete state.homes[spriteId];
    commit('homes', { spriteId });
  },

  /* ---------- sent home & shared houses ---------- */
  sendHome(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg' || s.retired) return { ok: false, reason: 'missing' };
    if (s.atHome) return { ok: false, reason: 'home' };
    s.atHome = true;
    s.homeSince = Date.now();
    s.asleep = false;
    s.sleepUntil = 0;
    s.sleepStart = 0;
    s.sleepCycles = 0;
    if (state.activeId === id) {
      const next = state.sprites.find((x) => x.id !== id && x.stage !== 'egg' && !x.retired && !x.atHome);
      state.activeId = next ? next.id : null;
    }
    commit('sentHome', { spriteId: id });
    return { ok: true };
  },

  callBack(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg' || s.retired) return { ok: false, reason: 'missing' };
    const coins = Math.max(0, Math.floor(Number(s.homeCoins) || 0));
    s.atHome = false;
    s.homeSince = 0;
    s.homeCoins = 0;
    if (coins) addCoinsRaw(coins);
    if (!state.activeId || !findSprite(state.activeId)) state.activeId = s.id;
    commit('sentHome', { spriteId: id, coins });
    return { ok: true, coins };
  },

  collectHome(id) {
    const s = findSprite(id);
    if (!s) return { ok: false, reason: 'missing' };
    const coins = Math.max(0, Math.floor(Number(s.homeCoins) || 0));
    if (!coins) return { ok: false, reason: 'empty' };
    s.homeCoins = 0;
    addCoinsRaw(coins);
    commit('sentHome', { spriteId: id, coins, collected: true });
    return { ok: true, coins };
  },

  homeLongSleep(id) {
    const s = findSprite(id);
    if (!s || s.stage === 'egg') return { ok: false };
    if (s.asleep) return { ok: false, reason: 'asleep' };
    const start = Date.now();
    s.asleep = true;
    s.sleepStart = start;
    s.sleepCycles = 6;
    s.sleepUntil = start + 45 * 60 * 1000;
    s.needs.joy = clamp(s.needs.joy + 4);
    addBondRaw(s, 4);
    addXpRaw(s, 6);
    bump('naps');
    state.stats.naps += 1;
    Sfx.sleep();
    commit('nap', { spriteId: id, long: true });
    return { ok: true, cycles: 6 };
  },

  shareHouse(id, otherId) {
    const a = findSprite(id);
    const b = findSprite(otherId);
    if (!a || !b || a.id === b.id || a.stage === 'egg' || b.stage === 'egg') return { ok: false, reason: 'sprite' };
    state.houses = { ...(state.houses || {}) };
    const existing = Object.values(state.houses).find((h) => (h.members || []).includes(a.id) && (h.members || []).includes(b.id));
    if (existing) return { ok: false, reason: 'together' };
    /* With the Spare Bedroom upgrade a house can hold a third member. */
    const maxBeds = typeof houseMaxMembers === 'function' ? houseMaxMembers() : 2;
    const currentHouse = Object.values(state.houses).find((h) => (h.members || []).includes(a.id));
    if (currentHouse && (currentHouse.members || []).length < maxBeds) {
      const bHouse = Object.values(state.houses).find((h) => h.id !== currentHouse.id && (h.members || []).includes(b.id));
      if (bHouse) {
        bHouse.members = (bHouse.members || []).filter((m) => m !== b.id);
        if (bHouse.members.length < 2) delete state.houses[bHouse.id];
        else bHouse.members.forEach((m) => { const member = findSprite(m); if (member) member.sharedHouse = bHouse.id; });
      }
      currentHouse.members = [...currentHouse.members, b.id];
      currentHouse.name = currentHouse.members
        .map((m) => { const member = findSprite(m); return member ? displayName(member) : ''; })
        .filter(Boolean).join(' & ');
      b.sharedHouse = currentHouse.id;
      b.atHome = true;
      b.homeSince = b.homeSince || Date.now();
      b.asleep = false;
      b.sleepUntil = 0;
      addBondRaw(a, 2);
      addBondRaw(b, 2);
      commit('houseBond', { houseId: currentHouse.id });
      return { ok: true, houseId: currentHouse.id, joined: true };
    }
    Object.keys(state.houses).forEach((key) => {
      const house = state.houses[key];
      if (!(house.members || []).includes(a.id) && !(house.members || []).includes(b.id)) return;
      house.members = (house.members || []).filter((m) => m !== a.id && m !== b.id);
      if (house.members.length < 2) delete state.houses[key];
    });
    const houseId = uid('house');
    state.houses[houseId] = {
      id: houseId,
      name: `${displayName(a)} & ${displayName(b)}`,
      scene: homeSceneFor(a),
      members: [a.id, b.id],
      bond: 0,
      milestone: 100,
      lastBondAt: 0,
      formedAt: Date.now(),
    };
    [a, b].forEach((m) => {
      m.sharedHouse = houseId;
      m.atHome = true;
      m.homeSince = m.homeSince || Date.now();
      m.asleep = false;
      m.sleepUntil = 0;
      addBondRaw(m, 3);
    });
    commit('houseBond', { houseId });
    return { ok: true, houseId };
  },

  leaveHouse(spriteId) {
    state.houses = { ...(state.houses || {}) };
    let removed = false;
    Object.entries(state.houses).forEach(([key, house]) => {
      if (!(house.members || []).includes(spriteId)) return;
      house.members = house.members.filter((m) => m !== spriteId);
      removed = true;
      const left = findSprite(spriteId);
      if (left) left.sharedHouse = null;
      if (house.members.length < 2) delete state.houses[key];
      else house.members.forEach((m) => { const member = findSprite(m); if (member) member.sharedHouse = key; });
    });
    if (!removed) return { ok: false, reason: 'missing' };
    commit('houseBond', { spriteId });
    return { ok: true };
  },

  buyHomeUpgrade(id) {
    const up = typeof HOME_UPGRADES !== 'undefined' ? HOME_UPGRADES[id] : null;
    if (!up) return { ok: false, reason: 'missing' };
    state.homeUpgrades = { ...(state.homeUpgrades || {}) };
    if (state.homeUpgrades[id]) return { ok: false, reason: 'owned' };
    if (up.requires && !state.homeUpgrades[up.requires]) return { ok: false, reason: 'requires', missing: up.requires };
    if (state.coins < up.price) return { ok: false, reason: 'coins', need: up.price - state.coins };
    state.coins -= up.price;
    state.stats.spent = (state.stats.spent || 0) + up.price;
    state.homeUpgrades[id] = true;
    commit('homeUpgrade', { id, price: up.price });
    return { ok: true, upgrade: up };
  },

  setRoomTheme(id) {
    if (typeof HOME_ROOM_THEME_KEYS === 'undefined' || !HOME_ROOM_THEME_KEYS.includes(id)) return { ok: false, reason: 'missing' };
    state.roomTheme = id;
    commit('roomTheme', { id });
    return { ok: true, id };
  },

  openGuardianVault(doorId) {
    const door = typeof guardianVaultDoor === 'function' ? guardianVaultDoor(doorId) : null;
    if (!door) return { ok: false, reason: 'missing' };
    state.vaultDoors = Array.isArray(state.vaultDoors) ? state.vaultDoors.slice() : [];
    if (state.vaultDoors.includes(door.id)) return { ok: false, reason: 'opened' };
    const travels = typeof guardianVaultTravels === 'function' ? guardianVaultTravels() : 0;
    if (travels < door.travels) return { ok: false, reason: 'travels', need: door.travels - travels };
    state.vaultDoors.push(door.id);
    const sprite = typeof unlockSecretRaw === 'function' ? unlockSecretRaw(door.secret) : null;
    if (door.coins) addCoinsRaw(door.coins);
    commit('guardianVault', { id: door.id, coins: door.coins || 0 });
    return { ok: true, coins: door.coins || 0, secret: sprite ? sprite.name : null, spriteId: sprite ? sprite.id : null };
  },

  guardianWin(sceneKey, guardianKey) {
    if (typeof ELEMENTS === 'undefined' || !ELEMENTS[guardianKey]) return { ok: false, reason: 'guardian' };
    const s = typeof activeSprite === 'function' ? activeSprite() : null;
    if (s) {
      s.needs.joy = clamp(s.needs.joy + 12);
      addBondRaw(s, 3);
      addXpRaw(s, 8);
    }
    state.guardiansBeaten = { ...(state.guardiansBeaten || {}) };
    const total = (Number(state.guardiansBeaten[guardianKey]) || 0) + 1;
    state.guardiansBeaten[guardianKey] = total;
    state.stats.duels = (Number(state.stats.duels) || 0) + 1;
    state.customGuardians = Array.isArray(state.customGuardians) ? state.customGuardians.slice() : [];
    const wins = Object.values(state.guardiansBeaten).reduce((sum, n) => sum + (Number(n) || 0), 0);
    const unlocked = [];
    if (typeof customGuardianUnlocksFor === 'function') {
      customGuardianUnlocksFor(wins).forEach((key) => {
        if (state.customGuardians.includes(key)) return;
        state.customGuardians.push(key);
        unlocked.push(key);
      });
      if (unlocked.length && typeof syncCustomGuardians === 'function') syncCustomGuardians(state.customGuardians);
    }
    commit('guardian', { scene: sceneKey, guardian: guardianKey, total, unlocked: unlocked.length });
    return { ok: true, bond: 3, joy: 12, xp: 8, total, unlocked };
  },

  setRoomPiece(id, patch = {}) {
    if (typeof HOME_UPGRADES === 'undefined') return { ok: false, reason: 'missing' };
    const free = typeof freeDecorPiece === 'function' ? freeDecorPiece(id) : null;
    if (!HOME_UPGRADES[id] && !free) return { ok: false, reason: 'missing' };
    state.roomLayout = { ...(state.roomLayout || {}) };
    const cur = state.roomLayout[id] || {};
    const next = {
      spot: patch.spot != null ? Math.max(0, Math.min(2, Math.round(Number(patch.spot) || 0))) : Math.max(0, Math.min(2, Math.round(Number(cur.spot) || 0))),
      hidden: patch.hidden != null ? !!patch.hidden : !!cur.hidden,
    };
    state.roomLayout[id] = next;
    commit('roomLayout', { id, ...next });
    return { ok: true, ...next };
  },

  housePlay(houseId, activity = 'chase', score = 0) {
    const house = state.houses && state.houses[houseId];
    if (!house) return { ok: false, reason: 'missing' };
    const members = (house.members || []).map((id) => findSprite(id)).filter((m) => m && m.stage !== 'egg');
    if (members.length < 2) return { ok: false, reason: 'members' };
    if (Date.now() - (Number(house.lastPlayAt) || 0) < 45 * 1000) return { ok: false, reason: 'cooling' };
    house.lastPlayAt = Date.now();
    const mult = typeof homeHangoutMult === 'function' ? homeHangoutMult() : 1;
    const hits = clamp(Math.round(Number(score) || 0), 0, 30);
    const bondGain = Math.round((5 + hits) * mult);
    const cap = typeof HOUSE_BOND_MAX === 'number' ? HOUSE_BOND_MAX : 600;
    house.bond = Math.min(cap, (Number(house.bond) || 0) + bondGain);
    members.forEach((m) => {
      addBondRaw(m, 2.5 * mult);
      addXpRaw(m, 4);
      m.needs.joy = clamp(m.needs.joy + 10);
    });
    const coins = 8 + Math.floor(hits / 2);
    addCoinsRaw(coins);
    state.stats.games = (Number(state.stats.games) || 0) + 1;
    commit('houseBond', { houseId, activity, score: hits });
    return { ok: true, bond: bondGain, coins, joy: 10, score: hits, names: members.map((m) => displayName(m)).join(' & ') };
  },

  claimBiomeQuest(sceneKey, opts = {}) {
    const def = typeof BIOME_QUESTS !== 'undefined' ? BIOME_QUESTS[sceneKey] : null;
    if (!def) return { ok: false, reason: 'missing' };
    const info = typeof biomeQuestStep === 'function' ? biomeQuestStep(sceneKey) : null;
    if (!info) return { ok: false, reason: 'done' };
    const q = biomeQuestState(sceneKey);
    const have = Math.min(info.step.need, Math.max(0, Number(q.progress) || 0));
    if (have < info.step.need) return { ok: false, reason: 'progress', need: info.step.need - have };
    const finalStep = info.index >= def.steps.length - 1;
    if (finalStep && !opts.won && !q.beaten) return { ok: false, reason: 'guardian' };
    const reward = info.step.reward || {};
    const coins = Math.max(0, Math.floor(Number(reward.coins) || 0));
    const bonus = opts.won ? 150 : 0;
    if (bonus) addCoinsRaw(bonus);
    if (coins) addCoinsRaw(coins);
    const target = (typeof activeSprite === 'function' ? activeSprite() : null)
      || (typeof sentHomeSprites === 'function' ? sentHomeSprites()[0] : null);
    if (target) {
      if (reward.xp) addXpRaw(target, reward.xp);
      if (reward.bond) addBondRaw(target, reward.bond);
    }
    const nextStep = info.index + 1;
    const finished = nextStep >= def.steps.length;
    state.biomeQuests = { ...(state.biomeQuests || {}) };
    state.biomeQuests[sceneKey] = { step: finished ? def.steps.length : nextStep, progress: 0, done: finished, beaten: finalStep ? true : !!q.beaten };
    if (finished) state.stats.quests = (Number(state.stats.quests) || 0) + 1;
    commit('biomeQuest', { scene: sceneKey, finished, coins });
    return { ok: true, coins, bonus, xp: reward.xp || 0, finished, title: def.title };
  },

  bondHouse(houseId) {
    const house = state.houses && state.houses[houseId];
    if (!house) return { ok: false, reason: 'missing' };
    const members = (house.members || []).map((id) => findSprite(id)).filter(Boolean);
    if (members.length < 2) return { ok: false, reason: 'members' };
    if (Date.now() - (Number(house.lastBondAt) || 0) < 30 * 60 * 1000) return { ok: false, reason: 'cooling' };
    house.lastBondAt = Date.now();
    const cap = typeof HOUSE_BOND_MAX === 'number' ? HOUSE_BOND_MAX : 600;
    house.bond = Math.min(cap, (Number(house.bond) || 0) + 8);
    members.forEach((m) => {
      addBondRaw(m, 3);
      m.needs.joy = clamp(m.needs.joy + 6);
    });
    addCoinsRaw(6);
    commit('houseBond', { houseId });
    return { ok: true, bond: 8, coins: 6, names: members.map((m) => displayName(m)).join(' & ') };
  },

  setClimate(key) {
    if (!CLIMATES[key]) return;
    state.world = { ...(state.world || {}), climate: key };
    commit('world', { climate: key });
  },

  setWeather(key) {
    const weather = key && WEATHERS[key] ? key : null;
    state.world = { ...(state.world || {}), weather };
    commit('world', { weather });
    return { ok: true, weather };
  },

  buyGear(key) {
    const item = ACCESSORIES[key];
    if (!item || !item.price) return { ok: true };
    if (state.wardrobe.includes(key)) return { ok: true };
    if (state.coins < item.price) {
      Sfx.error();
      toast(`That costs ${item.price} coins. A few more pets and games will cover it.`, '🪙');
      return { ok: false };
    }
    state.coins -= item.price;
    state.stats.spent = (state.stats.spent || 0) + item.price;
    state.wardrobe.push(key);
    Sfx.coin();
    toast(`${item.name} added to the wardrobe!`, item.icon);
    commit('wardrobe', { key });
    return { ok: true };
  },

  setHollowName(name) {
    const clean = String(name || '').trim().slice(0, 22);
    if (clean) state.hollowName = clean;
    commit('hollowName');
  },

  markTourSeen() {
    if (state.seen.tour) return [];
    state.seen.tour = true;
    const found = checkProgressSecrets();
    commit('tourSeen', { found: found.length });
    return found;
  },

  completeTour() {
    if (!state.seen.tour) state.seen.tour = true;
    const guide = unlockSecret('hollowguide');
    checkProgressSecrets();
    commit('tour', { spriteId: guide?.id || null });
    return guide;
  },

  redeemCode(code) {
    const clean = String(code || '').trim().toUpperCase();
    if (clean === 'MASTER') {
      if (!state.seen.tour) return { ok: false, reason: 'tour' };
      if (state.secretUnlocks.includes(MASTER_CHEAT_SPECIES)) {
        return { ok: true, already: true, sprite: state.sprites.find((s) => s.element === MASTER_CHEAT_SPECIES) || null };
      }
      const sprite = unlockSecret(MASTER_CHEAT_SPECIES);
      return { ok: true, already: false, sprite };
    }
    const dailyCodes = {
      HOLLOW: { coins: 150, snacks: 1, label: 'Hollow supply drop' },
      REBIRTH: { food: 'rebirthmeal', label: 'Rebirth Meal', requiresRebirth: true },
      STARS: { coins: 80, snacks: 2, label: 'Starlight snack pack' },
    };
    const reward = dailyCodes[clean];
    if (!reward) return { ok: false, reason: 'unknown' };
    if (reward.requiresRebirth && !(state.stats.rebirths > 0)) {
      return { ok: false, reason: 'rebirth' };
    }
    const today = dayKey();
    state.codeRedeems = state.codeRedeems || {};
    if (state.codeRedeems[clean] === today) {
      return { ok: true, already: true, daily: true, code: clean };
    }
    state.codeRedeems[clean] = today;
    if (reward.coins) addCoinsRaw(reward.coins);
    if (reward.food) addFoodRaw(reward.food, 1);
    for (let i = 0; i < (reward.snacks || 0); i++) addSnackRaw(pick(SNACK_KEYS), 1);
    commit('code', { code: clean, reward });
    return { ok: true, already: false, daily: true, code: clean, reward };
  },

  ambientBond(ids, amount = 0.4) {
    (ids || []).forEach((id) => {
      const s = findSprite(id);
      if (s && s.stage !== 'egg') addBondRaw(s, amount);
    });
    saveState();
    stateListeners.forEach((fn) => { try { fn({ type: 'ambient' }); } catch {} });
  },

  /* Start a brand-new Hollow but bank the coins: everything else is rebuilt from
     scratch (eggs, sprites, unlocks, streaks, journal), so the player picks a
     starter egg again with the coins they already earned still in their pocket. */
  reset() {
    const banked = Math.max(0, Math.floor(Number(state.coins) || 0));
    const fresh = freshState();
    fresh.coins = banked;
    state.coins = banked;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(fresh));
    } catch (err) {
      console.warn('Could not write the fresh Hollow save', err);
      try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ }
    }
    location.reload();
  },
};

/* District quest progress: only counts inside the biome you are standing in,
   and only for the step currently in front of you. */
function biomeQuestNote(kind) {
  if (typeof BIOME_QUESTS === 'undefined' || typeof biomeQuestStep !== 'function') return;
  const sceneKey = state.theme && state.theme.scene;
  const info = biomeQuestStep(sceneKey);
  if (!info || info.step.kind !== kind) return;
  const have = Math.min(info.step.need, Math.max(0, Number(info.q.progress) || 0));
  if (have >= info.step.need) return;
  state.biomeQuests = { ...(state.biomeQuests || {}) };
  state.biomeQuests[sceneKey] = { step: info.q.step, progress: have + 1, done: !!info.q.done };
  commit('biomeQuestProgress', { scene: sceneKey, kind, progress: have + 1, need: info.step.need });
  if (have + 1 >= info.step.need) toast(`${BIOME_QUESTS[sceneKey].title}: step ready to claim.`, '🗺️');
}

/* ---------------- real-time simulation ---------------- */
let lastAutosave = Date.now();
function tick(force = false) {
  const t = Date.now();
  let sec = (t - (state.lastTick || t)) / 1000;
  if (sec < 0.9 && !force) return;
  sec = Math.min(sec, 4 * 3600);
  state.lastTick = t;
  ensureDaily();
  ensureQuests();
  ensureCheckinPeriods();
  ensureArcadePeriods();
  ensureGift();
  const min = sec / 60;
  let changed = false;
  let woke = [];
  state.sprites.forEach((s) => {
    if (s.stage === 'egg' || s.retired) return;
    if (s.atHome) {
      /* A sprite sent home grazes, relaxes, recovers every need, sleeps long,
         and tucks a few coins away while the keeper is busy. */
      const boost = typeof homeRecoveryMult === 'function' ? homeRecoveryMult() : 1;
      s.needs.hunger = clamp(s.needs.hunger + 3.4 * min * boost);
      s.needs.energy = clamp(s.needs.energy + (s.asleep ? 4.5 : 2.2) * min * boost);
      s.needs.joy = clamp(s.needs.joy + 2.8 * min * boost);
      s.needs.clean = clamp(s.needs.clean + 1.4 * min * boost);
      s.bond = clamp(s.bond + 0.06 * min);
      const coinCap = typeof homeCoinCap === 'function' ? homeCoinCap() : 320;
      const coinBoost = typeof homeCoinRateMult === 'function' ? homeCoinRateMult() : 1;
      const rate = (sec / 42) * coinBoost * (1 + Math.min(3, (Number(s.level) || 1) * 0.01));
      s.homeCoins = Math.min(coinCap, Math.max(0, Number(s.homeCoins) || 0) + rate);
      if (s.asleep && t >= (s.sleepUntil || 0)) {
        finishSleep(s);
        woke.push(s.id);
      }
      changed = true;
      return;
    }
    const breed = BREEDS[s.breed] || {};
    const fx = spriteEffects(s);
    const wx = weatherEffects(s);
    const globalDecay = fx.decay || 1;
    if (s.asleep) {
      if (t >= (s.sleepUntil || 0)) {
        finishSleep(s);
        woke.push(s.id);
        changed = true;
      } else {
        s.needs.energy = clamp(s.needs.energy + (100 / 30) * sec);
        changed = true;
      }
      return;
    }
    s.needs.hunger = clamp(s.needs.hunger - 0.42 * min * (breed.hungerMod || 1) * (fx.hungerDecay || 1) * wx.hunger * globalDecay);
    s.needs.energy = clamp(s.needs.energy - 0.3 * min * (breed.energyMod || 1) * (fx.energyDecay || 1) * wx.energy * globalDecay);
    s.needs.joy = clamp(s.needs.joy - 0.38 * min * (breed.joyMod || 1) * (fx.joyDecay || 1) * wx.joy * globalDecay);
    s.needs.clean = clamp(s.needs.clean - 0.2 * min * (breed.cleanMod || 1) * (fx.cleanDecay || 1) * wx.clean * globalDecay);
    const avg = (s.needs.hunger + s.needs.energy + s.needs.joy + s.needs.clean) / 4;
    if (avg < 30) s.bond = clamp(s.bond - 0.04 * min);
    changed = true;
  });
  Object.values(state.houses || {}).forEach((house) => {
    const members = (house.members || []).map((id) => findSprite(id)).filter((m) => m && m.stage !== 'egg' && !m.retired);
    if (members.length < 2) return;
    const homeTogether = members.filter((m) => m.atHome).length >= 2;
    const gain = 0.02 * min * (homeTogether ? 1.6 : 1) * members.length;
    const cap = typeof HOUSE_BOND_MAX === 'number' ? HOUSE_BOND_MAX : 600;
    house.bond = Math.min(cap, (Number(house.bond) || 0) + gain);
    members.forEach((m) => { m.bond = clamp(m.bond + 0.02 * min); });
    const milestone = Math.max(100, Number(house.milestone) || 100);
    if (house.bond >= milestone) {
      house.milestone = milestone + 100;
      members.forEach((m) => { addBondRaw(m, 3); addXpRaw(m, 5); });
      addCoinsRaw(10);
      const names = members.map((m) => displayName(m)).join(' & ');
      toast(`${names} share a house bond! +10 coins · house bond ${Math.floor(house.bond)}.`, '💞');
    }
    changed = true;
  });
  if (woke.length && sec < 180) {
    const s = findSprite(woke[0]);
    if (s) {
      const dream = s.lastDream?.text || pick(DREAM_LINES);
      toast(`${displayName(s)} woke up from a dream about ${dream}.`, '🌙');
    }
  }
  if (changed && t - lastAutosave > 15000) {
    lastAutosave = t;
    saveState();
  }
}

function applyTheme() {
  setThemeVars(state.theme);
  if (typeof refreshBiomeAmbience === 'function') refreshBiomeAmbience();
}
