/* Collection wave registry. Every wave registers itself here, and the Tour, Wiki,
   and Codex read the registry live so new sprites appear the moment they load. */

const COLLECTION_WAVES = [];

function registerCollectionWave(entry) {
  if (!entry || !entry.key) return;
  const existing = COLLECTION_WAVES.findIndex((wave) => wave.key === entry.key);
  if (existing >= 0) COLLECTION_WAVES[existing] = entry;
  else COLLECTION_WAVES.push(entry);
}

registerCollectionWave({ key: 'ahs', label: 'American Horror Story', icon: '🎬', group: 'TV & film', note: 'Every season, from the Murder House to Provincetown.', count: () => (typeof AHS_KEYS !== 'undefined' ? AHS_KEYS.length : 0) });
registerCollectionWave({ key: 'memes', label: 'Internet memes', icon: '🌐', group: 'Internet', note: 'Forty legends with genes, Titans, and Meme Core homes.', count: () => (typeof MEME_KEYS !== 'undefined' ? MEME_KEYS.length : 0) });
registerCollectionWave({ key: 'event', label: 'Special event sprites', icon: '☄️', group: 'Events', note: 'Weekend-only visitors that arrive with an event egg.', count: () => (typeof EVENT_KEYS !== 'undefined' ? EVENT_KEYS.length : 0) });
registerCollectionWave({ key: 'admin', label: 'Admin sprites', icon: '🛠️', group: 'Events', note: 'The weekend Admin Event team, complete with root access.', count: () => (typeof ADMIN_KEYS !== 'undefined' ? ADMIN_KEYS.length : 0) });
registerCollectionWave({ key: 'seasonal', label: 'Seasonal gift sprites', icon: '🍂', group: 'Events', note: 'Holiday-only eggs from the seasonal gift pool.', count: () => (typeof SEASONAL_KEYS !== 'undefined' ? SEASONAL_KEYS.length : 0) });
registerCollectionWave({ key: 'heroes', label: 'Heroes & villains', icon: '🦸', group: 'Comics', note: 'Marvel, DC, and beyond, with publisher and role filters.', count: () => (typeof HERO_SPECIES !== 'undefined' ? HERO_SPECIES.length : 0) });
registerCollectionWave({ key: 'disney', label: 'Disney', icon: '🏰', group: 'Animation', note: 'Classics, princesses, Pixar, villains, and modern favorites.', count: () => (typeof DISNEY_TOTAL === 'number' ? DISNEY_TOTAL : 0) });
registerCollectionWave({ key: 'fairies', label: 'Pixie Hollow fairies', icon: '🧚', group: 'Animation', note: 'Every Tinker Bell film fairy, season minister, and fairy friend from other cartoons.', count: () => (typeof FAIRY_KEYS !== 'undefined' ? FAIRY_KEYS.length : 0) });
registerCollectionWave({ key: 'neverland', label: 'Neverland & Peter Pan', icon: '🏴‍☠️', group: 'Animation', note: 'Peter, Wendy, the Lost Boys, pirates, mermaids, and the crocodile.', count: () => (typeof NEVERLAND_KEYS !== 'undefined' ? NEVERLAND_KEYS.length : 0) });
registerCollectionWave({ key: 'adultswim', label: 'Adult Swim', icon: '📡', group: 'TV & film', note: 'Late-night cartoons, from Rick and Morty to Smiling Friends.', count: () => (typeof ADULTSWIM_KEYS !== 'undefined' ? ADULTSWIM_KEYS.length : 0) });
registerCollectionWave({ key: 'babylooney', label: 'Baby Looney Tunes', icon: '🍼', group: 'Animation', note: 'The nursery years: Bugs, Daffy, Tweety, Lola, Taz, and friends.', count: () => (typeof BABY_LOONEY_KEYS !== 'undefined' ? BABY_LOONEY_KEYS.length : 0) });
registerCollectionWave({ key: 'carebears', label: 'Care Bears & Cousins', icon: '🌈', group: 'Animation', note: 'Classic bears, Cousins, and extended family.', count: () => (typeof CARE_BEAR_TOTAL === 'number' ? CARE_BEAR_TOTAL : 0) });
registerCollectionWave({ key: 'netflix', label: 'Netflix Anime & Toons', icon: '📺', group: 'Animation', note: 'Twenty shows with three characters each.', count: () => (typeof NETFLIX_TOTAL === 'number' ? NETFLIX_TOTAL : 0) });
registerCollectionWave({ key: 'fortnite', label: 'Fortnite Legacy', icon: '🪂', group: 'Games', note: 'Headliners from every chapter and season.', count: () => (typeof FORTNITE_LEGACY_TOTAL === 'number' ? FORTNITE_LEGACY_TOTAL : 0) });
registerCollectionWave({ key: 'wwe', label: 'WWE locker room', icon: '🤼', group: 'Sports', note: 'Golden, Attitude, Ruthless Aggression, PG, Women’s, Tag, and NXT eras.', count: () => (typeof WWE_TOTAL === 'number' ? WWE_TOTAL : 0) });
registerCollectionWave({ key: 'catalog', label: 'Cross-media catalog', icon: '🗂️', group: 'Animation', note: 'PBS Kids, Nickelodeon, Discovery, comics, and game genres.', count: () => (typeof CATALOG_TOTAL === 'number' ? CATALOG_TOTAL : 0) });
registerCollectionWave({ key: 'legends', label: 'Crossover legends', icon: '🌟', group: 'Crossover', note: 'FNAF, Mario, Zelda, horror, and video-game icons.', count: () => (typeof LEGEND_TOTAL === 'number' ? LEGEND_TOTAL : 0) });
registerCollectionWave({ key: 'vault', label: 'Secret Vault', icon: '🔐', group: 'Secrets', note: 'Not sold in the Nest; opened by milestones and codes.', count: () => (typeof SECRET_SPECIES !== 'undefined' ? SECRET_SPECIES.length : 0) });

function collectionWaves() {
  return COLLECTION_WAVES.filter((wave) => wave.count() > 0);
}

function collectionWaveTotal(label) {
  return collectionWaves().reduce((sum, wave) => sum + wave.count(), 0);
}

function collectionWaveRowsHTML() {
  return collectionWaves().map((wave) => `<div class="wiki-habitat-row">
      <span class="wh-emoji">${wave.icon}</span>
      <span class="wh-copy"><b>${esc(wave.label)} · ${wave.count()}</b><span>${esc(wave.note)}</span></span>
    </div>`).join('');
}

function collectionWaveChipsHTML() {
  return collectionWaves().map((wave) => `<span class="chip">${wave.icon} ${esc(wave.label)} · ${wave.count()}</span>`).join('');
}
