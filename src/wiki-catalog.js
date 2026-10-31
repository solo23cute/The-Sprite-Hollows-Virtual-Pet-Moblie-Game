/* Wiki guides for the cross-media catalog and calendar systems. Loaded after
   wiki.js so the shared WIKI_GUIDES array already exists. */

function catalogWikiLink(key) {
  const el = ELEMENTS[key];
  if (!el) return '';
  return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`;
}

function catalogGroupSection(groupKey) {
  const group = CATALOG_GROUPS[groupKey];
  const keys = CATALOG_BY_GROUP[groupKey] || [];
  return `<h3>${group.icon} ${esc(group.label)} · ${keys.length}</h3>
    <p>${esc(group.blurb)}</p>
    <div class="wiki-hybrid-list">${keys.map(catalogWikiLink).join('')}</div>`;
}

function catalogGuideBody(groupKeys, intro) {
  return `<p class="wiki-lede">${intro}</p>
    <p>Every card opens a live species file with its gene, Titan, egg, habitats, parent types, and named hybrid. The art is original procedural work—no imported character sprites, screenshots, or film frames are used.</p>
    ${groupKeys.map(catalogGroupSection).join('')}`;
}

function catalogGameGenreBody() {
  const genreKeys = CATALOG_BY_GROUP.gamegenres || [];
  const gameCount = VIDEO_GAME_LEGEND_GROUPS.reduce((total, group) => total + LEGEND_BY_GROUP[group].length, 0);
  return `<p class="wiki-lede">Every way to play now has a mascot: <b>${genreKeys.length} original video-game genre sprites</b>, alongside the <b>${gameCount} crossover game signatures</b>, <b>${POKEDEX_SPECIES.length} Pokémon</b>, and the <b>${FORTNITE_TOTAL}</b>-sprite Fortnite roster.</p>
    <p>The genre set covers platformers, RPGs, shooters, fighting games, racing, puzzle, sports, horror, strategy, MOBA, battle royale, sandbox, rhythm, visual novels, roguelikes, simulation, adventure, and MMOs.</p>
    ${catalogGroupSection('gamegenres')}
    <h3>More game worlds</h3>
    <div class="wiki-hybrid-list">
      <button class="wiki-link" data-wiki-guide="videogames"><b>🎮 Video games &amp; FNAF · ${gameCount}</b><span>All crossover game signatures, including every FNAF animatronic.</span></button>
      <button class="wiki-link" data-wiki-guide="pokedex"><b>🔴 Pokédex · ${POKEDEX_SPECIES.length}</b><span>Every base Pokémon across all 18 types.</span></button>
      <button class="wiki-link" data-wiki-guide="fortnite"><b>🎮 Fortnite current &amp; legacy · ${FORTNITE_TOTAL}</b><span>${FORTNITE_SPECIES.length} current pass sprites and ${FORTNITE_LEGACY_TOTAL} past-season headliners.</span></button>
      <button class="wiki-link" data-wiki-guide="wwe"><b>🏆 WWE superstars · ${WWE_TOTAL}</b><span>Legends, current superstars, and the women’s division.</span></button>
    </div>`;
}

function catalogWorldTypesBody() {
  const keys = CATALOG_BY_GROUP.worldtypes || [];
  const rows = keys.map((key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${esc(el.worldRegion)} · ${esc(el.variantType)} variant · ${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`;
  }).join('');
  return `<p class="wiki-lede">The Hollow now has <b>${keys.length} world type variants</b>, one for each of the 18 standard types. Each is a regional expression shaped by a real part of the world, from a Highland Normal to an Irish Fairy.</p>
    <p>They are normal collectible type eggs with their own genes, Titans, habitats, and named hybrids. Search a region or a type in the Wiki to find them. The <b>Shortcut</b> sprite is the pathfinder for this world tour.</p>
    <div class="wiki-hybrid-list">${rows}</div>
    <h3>⚡ Shortcut</h3>
    <p><b>Shortcut</b> is the quick-jump signature: a rare pathfinder with a clock sigil, three homes, and the <b>Shortcut Step</b>-style route magic. Use the Wiki quick jumps to reach any collection in one tap.</p>
    <div class="wiki-hybrid-list">${catalogWikiLink('shortcut')}</div>`;
}

function catalogCartoonBody() {
  const ids = ['pbs', 'monsterjam', 'nick', 'nickjr', 'nicktoons', 'discovery', 'toonmovies'];
  const count = ids.reduce((total, id) => total + (CATALOG_BY_GROUP[id] || []).length, 0);
  return catalogGuideBody(ids, `A <b>${count}-sprite cartoon, arena, and animated-film wave</b> has arrived. It covers PBS Kids, Monster Jam, Nickelodeon, Nick Jr., Nicktoons, Discovery Kids &amp; Family, and animated movies, with a live species file for every character.`);
}

function catalogComicBody() {
  const ids = ['comics', 'disneyjr', 'disneyxd', 'disneyextra'];
  const count = ids.reduce((total, id) => total + (CATALOG_BY_GROUP[id] || []).length, 0);
  return catalogGuideBody(ids, `A <b>${count}-sprite comics and Disney wave</b> lands beside the existing ${HERO_SPECIES.length}-hero and ${DISNEY_TOTAL}-Disney collections. It adds comic-book signatures, Disney Jr., Disney XD, and the House of Mouse classics.`);
}

function catalogVaultBody() {
  const monthly = SECRET_SPECIES.filter((key) => SECRET_SPECIES_META[key].vaultWindow?.kind === 'month');
  const weekly = SECRET_SPECIES.filter((key) => SECRET_SPECIES_META[key].vaultWindow?.kind === 'week');
  const progress = SECRET_SPECIES.filter((key) => !SECRET_SPECIES_META[key].vaultWindow);
  const cal = currentVaultKeys();
  const link = (key) => {
    const meta = SECRET_SPECIES_META[key];
    const open = meta.vaultWindow ? vaultOpen(key) : false;
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${open || state.secretUnlocks.includes(key) ? esc(meta.name) : '???'}</b><span>${esc(vaultWindowLabel(key))} · ${esc(meta.gene[0])}</span></button>`;
  };
  return `<p class="wiki-lede">The Secret Vault now has <b>${SECRET_SPECIES.length} doors</b>: ${progress.length} milestone secrets, <b>12 monthly keepers</b>, and <b>8 twice-weekly relays</b>.</p>
    <div class="card" style="padding:12px;margin:10px 0;text-align:left">
      <b>This window</b>
      <p class="small" style="margin:5px 0 0">${cal.monthName} monthly keeper · ${cal.slotWindow} relay. Claim a door while it is open; found secrets stay forever.</p>
    </div>
    <h3>Monthly keepers</h3>
    <div class="wiki-hybrid-list">${monthly.map(link).join('')}</div>
    <h3>Twice-weekly relays</h3>
    <div class="wiki-hybrid-list">${weekly.map(link).join('')}</div>
    <h3>Progress secrets</h3>
    <div class="wiki-hybrid-list">${progress.map(link).join('')}</div>
    <button class="btn btn-primary btn-block" data-vault-open style="margin-top:12px">Open the Secret Vault</button>`;
}

function catalogShortcutBody() {
  return `<p class="wiki-lede">The Wiki now has a <b>Quick jump</b> row and a <b>Shortcut sprite</b>. Use the row to jump straight to cartoons, comics, game genres, world variants, the Vault, and the breeder without hunting through tabs.</p>
    <p><b>Shortcut</b> is a real collectible species: a pathfinder with clock artwork, the <b>Clockwork Path</b> gene, three habitats, and a named hybrid in the breeder codex.</p>
    <div class="wiki-hybrid-list">${catalogWikiLink('shortcut')}</div>
    <h3>Every shortcut</h3>
    <div class="wiki-hybrid-list">
      <button class="wiki-link" data-wiki-guide="cartoonworlds"><b>📺 Cartoon worlds</b><span>PBS, Monster Jam, Nick, Nick Jr., Nicktoons, Discovery, animated movies.</span></button>
      <button class="wiki-link" data-wiki-guide="comicworlds"><b>💥 Comics &amp; Disney</b><span>Comic books, Disney Jr., Disney XD, Disney classics.</span></button>
      <button class="wiki-link" data-wiki-guide="gamegenres"><b>🕹️ Game genres</b><span>Every kind of video game as a sprite.</span></button>
      <button class="wiki-link" data-wiki-guide="worldtypes"><b>🌍 World type variants</b><span>18 regional expressions of the standard types.</span></button>
      <button class="wiki-link" data-wiki-guide="vault"><b>🔐 Vault calendar</b><span>Monthly keepers and twice-weekly relays.</span></button>
    </div>`;
}

WIKI_GUIDES.push(
  { id: 'cartoonworlds', icon: '📺', title: 'Cartoons, arenas & animated movies', summary: 'PBS Kids, Monster Jam, Nickelodeon, Nick Jr., Nicktoons, Discovery, and movie characters.', body: catalogCartoonBody },
  { id: 'comicworlds', icon: '💥', title: 'Comics, Disney Jr. & Disney XD', summary: 'Comic-book signatures, Disney Jr., Disney XD, and House of Mouse classics.', body: catalogComicBody },
  { id: 'gamegenres', icon: '🕹️', title: 'Every kind of video game', summary: '18 genre mascots plus the full crossover game, Pokémon, and Fortnite rosters.', body: catalogGameGenreBody },
  { id: 'worldtypes', icon: '🌍', title: 'World type variants & Shortcut', summary: '18 regional type expressions and the Shortcut pathfinder.', body: catalogWorldTypesBody },
  { id: 'vault', icon: '🔐', title: 'Vault calendar', summary: '12 monthly keepers, 8 twice-weekly relays, and the progress doors.', body: catalogVaultBody },
  { id: 'shortcuts', icon: '⚡', title: 'Quick jumps & Shortcut', summary: 'One-tap routes through the Wiki and the Shortcut sprite.', body: catalogShortcutBody },
);

/* Wire guide-local action buttons after openWikiGuide builds a sheet. */
const originalCatalogWikiOpenGuide = openWikiGuide;
openWikiGuide = function (id) {
  const result = originalCatalogWikiOpenGuide(id);
  const overlay = document.querySelector('.overlay:last-of-type');
  overlay?.querySelector('[data-vault-open]')?.addEventListener('click', () => {
    closeAllOverlays();
    setTimeout(() => openSecretVault(), 30);
  });
  return result;
};
