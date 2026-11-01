/* Guardian rosters: every biome and environment draws challengers from its own
   residents, its district family, and a shared roaming pool. Any scene can host
   any number of guardians, and custom scenes fall back to the roaming pool. */

const GUARDIAN_ROAMING = [];
const GUARDIAN_POOLS = {};

(function buildGuardianPools() {
  if (typeof SCENE_KEYS === 'undefined' || typeof ELEMENT_KEYS === 'undefined') return;
  const byHome = {};
  ELEMENT_KEYS.forEach((key) => {
    const element = ELEMENTS[key];
    if (!element || !element.gtaHome || !SCENES[element.gtaHome]) return;
    if (!byHome[element.gtaHome]) byHome[element.gtaHome] = [];
    byHome[element.gtaHome].push(key);
  });

  const roam = [];
  const addRoam = (key) => {
    if (key && ELEMENTS[key] && !roam.includes(key)) roam.push(key);
  };
  Object.values(SCENES).forEach((scene) => {
    if (scene && scene.exoticBiome && scene.guardian) addRoam(scene.guardian);
  });
  (typeof GTA_BIOME_KEYS !== 'undefined' ? GTA_BIOME_KEYS : []).forEach((key) => {
    if (byHome[key] && byHome[key][0]) addRoam(byHome[key][0]);
  });
  /* A wide sample of the roster so every environment has a deep bench. */
  for (let i = 0; i < ELEMENT_KEYS.length; i += 97) addRoam(ELEMENT_KEYS[i]);
  GUARDIAN_ROAMING.push(...roam);

  SCENE_KEYS.forEach((sceneKey) => {
    const scene = SCENES[sceneKey];
    if (!scene) return;
    const pool = [];
    const add = (key) => {
      if (key && ELEMENTS[key] && !pool.includes(key)) pool.push(key);
    };
    (scene.species || []).forEach(add);
    (byHome[sceneKey] || []).forEach(add);
    if (scene.guardian) add(scene.guardian);
    roam.forEach(add);
    GUARDIAN_POOLS[sceneKey] = pool;
  });
})();

function guardianPoolForScene(sceneKey) {
  return GUARDIAN_POOLS[sceneKey] || GUARDIAN_ROAMING;
}

function guardianPick(sceneKey, index = 0) {
  const pool = guardianPoolForScene(sceneKey);
  if (!pool.length) return null;
  const size = pool.length;
  const safe = ((Math.round(Number(index) || 0) % size) + size) % size;
  return pool[safe];
}

function guardianTotalForScene(sceneKey) {
  return guardianPoolForScene(sceneKey).length;
}
