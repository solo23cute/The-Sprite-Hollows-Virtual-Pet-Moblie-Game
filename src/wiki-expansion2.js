/* Wiki guide for the 3.1.7 film, anime, food, and world-habitat wave. */

function expansion2GuideBody() {
  const ids = Object.keys(EXPANSION2_GROUPS);
  const habitats = Object.entries(WORLD_HABITATS).map(([key, scene]) => `<button class="wiki-link" data-wiki-scene="${key}"><b>${scene.emoji} ${esc(scene.name)}</b><span>${esc(scene.habitat)} · worldwide habitat · +${Math.round(scene.bonus * 100)}% XP</span></button>`).join('');
  return catalogGuideBody(ids, `This wave adds <b>${ids.reduce((total, id) => total + (CATALOG_BY_GROUP[id] || []).length, 0)} new species</b> for FNAF movies, Disney films, Nickelodeon and PBS movies, anime, Cartoon Network, 90s and early-2000s cartoons, classic TV, Sesame Street / Team Umizoomi / Clifford, Powerpuff heroes and villains, and legendary cartoon foods.`) +
    `<h3>🌍 Worldwide habitats</h3>
     <p>Eighteen new environments are live in the Studio and in species files: Serengeti, Amazon, Great Barrier Reef, Himalaya, Arctic, Sahara, Alps, Galápagos, Madagascar, Borneo, Okavango, Patagonia, Iceland, Tasmania, Bavaria, Nile, Kerala, and Hokkaido. They add habitat variety without changing the fixed eighteen guardians.</p>
     <div class="wiki-hybrid-list">${habitats}</div>
     <div class="wiki-footnote">World habitat keys are save-safe and appear in the Studio scene picker after this update.</div>`;
}

WIKI_GUIDES.push({
  id: 'worldwave', icon: '🌏', title: 'Movies, anime, CN & world habitats',
  summary: 'FNAF films, Disney and Nick movies, anime, Cartoon Network, classic TV, food sprites, Powerpuff, and 18 new habitats.',
  body: expansion2GuideBody,
});

const expansion2OpenGuide = openWikiGuide;
openWikiGuide = function (id) {
  const result = expansion2OpenGuide(id);
  const overlay = document.querySelector('.overlay:last-of-type');
  overlay?.querySelectorAll('[data-wiki-scene]').forEach((btn) => btn.addEventListener('click', () => {
    const scene = SCENES[btn.dataset.wikiScene];
    if (!scene) return;
    closeAllOverlays();
    setTimeout(() => openSheet({
      title: `${scene.emoji} ${scene.name}`,
      sub: `${scene.habitat} · +${Math.round(scene.bonus * 100)}% XP`,
      body: `<div class="wiki-article"><p class="wiki-lede">${esc(scene.blurb)}</p><div class="breeding-facts"><div><span>Habitat</span><b>${esc(scene.habitat)}</b></div><div><span>Residents</span><b>${scene.species.length} species</b></div><div><span>Status</span><b>Unlocked world habitat</b></div><div><span>XP bonus</span><b>+${Math.round(scene.bonus * 100)}%</b></div></div><p class="tiny muted">Choose this habitat in Studio to change the Hollow background. It does not add or replace a biome guardian.</p><button class="btn btn-primary btn-block" data-world-scene-studio style="margin-top:12px">Choose it in Studio</button></div>`,
      onMount: (sheet, close) => sheet.querySelector('[data-world-scene-studio]').addEventListener('click', () => { close(); App.go('studio'); }),
    }), 30);
  }));
  return result;
};
