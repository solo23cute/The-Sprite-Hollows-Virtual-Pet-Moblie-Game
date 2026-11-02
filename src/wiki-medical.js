/* Wiki guide for the medical-TV wing. Loaded after the main Wiki so the guide
   registry and all shared helpers already exist. */

function medicalTvWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${esc(el.medicalRole)} · S${el.medicalSeasons[0]}${el.medicalSeasons.length > 1 ? `–${el.medicalSeasons[el.medicalSeasons.length - 1]}` : ''}</span></button>`;
  };
  const owned = typeof state !== 'undefined' ? new Set(state.sprites.map((sprite) => sprite.element)) : new Set();
  const seasonBlock = (showKey, seasons) => seasons.map((season) => {
    const keys = MEDICAL_BY_SEASON[showKey][season] || [];
    return `<div class="wiki-show-block"><h4>Season ${season} · ${keys.length} signature${keys.length === 1 ? '' : 's'}</h4><div class="wiki-hybrid-list">${keys.map(link).join('')}</div></div>`;
  }).join('');
  return `<p class="wiki-lede">The medical-TV wing adds <b>${MEDICAL_TOTAL} original signatures</b>: <b>${GREYS_TOTAL} Grey’s Anatomy characters spanning all 23 seasons</b> and <b>${SCRUBS_TOTAL} Scrubs characters spanning all nine seasons</b>. Each has a show gene, Titan, type egg, habitat, named hybrid, season range, and original procedural portrait.</p>
    <p>You own <b>${MEDICAL_SPECIES.filter((key) => owned.has(key)).length} of ${MEDICAL_TOTAL}</b> medical signatures. They live under TV Legends, appear in the Nest as normal type eggs, can breed with any classic element, and have their own <b>🩺 Medical TV</b> roster tab.</p>
    ${MEDICAL_SHOW_ORDER.map((showKey) => {
      const show = MEDICAL_SHOWS[showKey];
      const keys = MEDICAL_BY_SHOW[showKey];
      return `<h3>${show.icon} ${esc(show.label)} · ${keys.length}</h3>
        <p>${esc(show.note)} Gene: <b>${show.gene[1]} ${esc(show.gene[0])}</b> — ${esc(show.gene[2])}</p>
        <div class="wiki-hybrid-list">${keys.map(link).join('')}</div>`;
    }).join('')}
    <h3>Grey’s Anatomy season index</h3>
    <p>Every season from the first intern year through the current staff is represented. Characters with long runs appear in each season they span.</p>
    ${seasonBlock('greys', MEDICAL_SEASONS)}
    <h3>Scrubs season index</h3>
    <p>All nine Sacred Heart seasons, from the first day of internship to the final shift.</p>
    ${seasonBlock('scrubs', SCRUBS_SEASONS)}
    <h3>How they play</h3>
    <p>Grey’s genes favour night games, XP, and slower needs. Scrubs genes favour chat and pet coins, check-ins, and a cozy ward. Both shows share the TV Legends parent type, so their eggs, habitats, breeding pairs, and collection counts all use the same live systems as every other wave.</p>
    <p class="wiki-footnote">Original procedural art only. The show names and character roles are used as inspiration; no broadcast frames, promotional images, or traced character art are included.</p>`;
}

if (typeof WIKI_GUIDES !== 'undefined') {
  WIKI_GUIDES.push({
    id: 'medicaltv', icon: '🩺', title: 'Medical TV: Grey’s & Scrubs',
    summary: `${GREYS_TOTAL} Grey’s Anatomy characters across all 23 seasons and ${SCRUBS_TOTAL} Scrubs characters across all nine.`,
    body: medicalTvWaveBody,
  });
}
