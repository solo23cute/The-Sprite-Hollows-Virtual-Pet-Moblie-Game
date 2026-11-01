/* Breeding codex: every hybrid pair, its signature child, and the genes a merge passes on. */

const BREEDING_PAIRS = (() => {
  const byKey = new Map();
  const add = (a, b, fallbackName, combo) => {
    if (!ELEMENTS[a] || !ELEMENTS[b] || a === b) return;
    const key = pairKey(a, b);
    const row = byKey.get(key) || {
      key, a, b,
      name: hybridFor(a, b) || fallbackName,
      combo: null,
    };
    if (combo && !row.combo) row.combo = combo;
    if (!row.name) row.name = fallbackName;
    byKey.set(key, row);
  };
  Object.entries(HYBRID_NAMES).forEach(([key, name]) => {
    const [a, b] = key.split('+');
    add(a, b, name, COMBOS.find((c) => c.pair && pairKey(c.pair[0], c.pair[1]) === key));
  });
  COMBOS.filter((c) => c.pair).forEach((c) => add(c.pair[0], c.pair[1], c.name, c));
  return [...byKey.values()].sort((x, y) => x.name.localeCompare(y.name) || ELEMENTS[x.a].name.localeCompare(ELEMENTS[y.a].name));
})();

function breedingPairsFor(key) {
  return BREEDING_PAIRS.filter((p) => p.a === key || p.b === key);
}

function breedingParentSample(element, id) {
  return {
    id, element, breed: 'puff', stage: 'sprite', pattern: 'plain', palette: 'native',
    accessory: 'none', name: ELEMENTS[element].name, level: 3, size: 'standard',
  };
}

function breedingChildSample(pair) {
  return {
    id: `breed-child-${pair.key}`, element: pair.a, breed: 'puff', stage: 'sprite',
    palette: pair.combo?.palette || 'native',
    pattern: pair.combo?.pattern || 'plain',
    accessory: pair.combo?.accessory || 'none',
    name: pair.name, level: 3, size: 'standard',
  };
}

function breedingPairArt(pair) {
  return `${spriteSVG(breedingParentSample(pair.a, `breed-a-${pair.key}`), { expr: 'happy' })}
    <span class="bp-plus">+</span>
    ${spriteSVG(breedingParentSample(pair.b, `breed-b-${pair.key}`), { expr: 'happy' })}`;
}

function breedingOwnedCount(key) {
  return state.sprites.filter((s) => s.stage !== 'egg' && s.element === key).length;
}

function breedingParentTypes(key) {
  if (typeof parentTypesForSpecies === 'function') return parentTypesForSpecies(key);
  return [ELEMENTS[key]?.biomeType || 'Hollow'];
}

function breedingTypeLabel(key) {
  return breedingParentTypes(key).join(' · ');
}

function breedingEntryBody(pair) {
  const a = ELEMENTS[pair.a];
  const b = ELEMENTS[pair.b];
  const combo = pair.combo;
  const odds = mergeOdds();
  const child = breedingChildSample(pair);
  const ownA = breedingOwnedCount(pair.a);
  const ownB = breedingOwnedCount(pair.b);
  return `
    <div class="breeding-hero">
      <div class="bh-side">
        ${spriteSVG(breedingParentSample(pair.a, `entry-a-${pair.key}`), { expr: 'happy' })}
        <b>${esc(a.name)}</b>
        <span class="breeding-parent-type">${esc(breedingTypeLabel(pair.a))}</span>
      </div>
      <span class="bh-plus">+</span>
      <div class="bh-side">
        ${spriteSVG(breedingParentSample(pair.b, `entry-b-${pair.key}`), { expr: 'happy' })}
        <b>${esc(b.name)}</b>
        <span class="breeding-parent-type">${esc(breedingTypeLabel(pair.b))}</span>
      </div>
      <span class="bh-arrow">→</span>
      <div class="bh-side bh-child">
        ${spriteSVG(child, { expr: 'happy' })}
        <b>${esc(pair.name)}</b>
      </div>
    </div>
    <p class="wiki-lede">Merge a <b>${esc(a.name)}</b> with a <b>${esc(b.name)}</b> and the child can carry the <b>${esc(pair.name)}</b> hybrid name, with its own palette, pattern, and accessory.</p>
    <div class="breeding-facts">
      <div><span>Hybrid</span><b>${esc(pair.name)}</b></div>
      <div><span>Signature combo</span><b>${combo ? esc(combo.name) : 'None recorded'}</b></div>
      <div><span>Merge cost</span><b>${mergeCost({ gen: 0 }, { gen: 0 })} 🪙 + 25 per parent gen</b></div>
      <div><span>Parents</span><b>Level 3+ and rested</b></div>
      <div><span>Parent types</span><b>${esc(breedingTypeLabel(pair.a))} × ${esc(breedingTypeLabel(pair.b))}</b></div>
    </div>
    ${combo ? `<div class="breeding-power">
      <span class="bpw-icon">${combo.power.icon}</span>
      <span><b>${esc(combo.power.name)}</b><br><span>${esc(combo.power.desc)}</span></span>
    </div>` : ''}
    <h3>What the child inherits</h3>
    <ul class="wiki-list">
      <li><b>Element:</b> a 50/50 pick of ${esc(a.name)} or ${esc(b.name)}. The hybrid name appears when the merge rolls it.</li>
      <li><b>Breed:</b> 50/50 from either parent, with an 8% chance of a random breed.</li>
      <li><b>Gender:</b> a fresh roll for every child — ♀ female, ♂ male, or ⚲ neutral.</li>
      <li><b>Colours:</b> a blend of both palettes, a mutation, or one parent's palette.</li>
      <li><b>Shiny:</b> about ${odds.shine}% before shiny parents, finishes, and generation push it higher.</li>
      <li><b>Signature combo:</b> ${odds.combo}%, rising with every merge you have ever done.</li>
      <li><b>Finish:</b> 45% inherited when a parent carries one, otherwise a small hatch roll.</li>
    </ul>
    <h3>Your Hollow</h3>
    <p>You have <b>${ownA}</b> ${esc(a.name)} and <b>${ownB}</b> ${esc(b.name)} sprite${ownA + ownB === 1 ? '' : 's'}. Both parents rest for 60 seconds after the egg appears.</p>
    <button class="btn btn-primary btn-block" data-breed-nest style="margin-top:10px">Open the Nest to merge</button>
    <div class="wiki-footnote">Breeding entry · generated from the live hybrid table</div>`;
}

function openBreedingEntry(key) {
  const pair = BREEDING_PAIRS.find((p) => p.key === key);
  if (!pair) return;
  openSheet({
    title: `${pair.name} · breeding`,
    sub: `${ELEMENTS[pair.a].name} × ${ELEMENTS[pair.b].name}`,
    body: `<div class="wiki-article">${breedingEntryBody(pair)}</div>`,
    onMount: (sheet, close) => {
      sheet.querySelector('[data-breed-nest]')?.addEventListener('click', () => {
        close();
        App.go('nest');
      });
    },
  });
}

function openBreedingParent(key) {
  const el = ELEMENTS[key];
  if (!el) return;
  const types = breedingParentTypes(key);
  const pairs = breedingPairsFor(key);
  const sample = breedingParentSample(key, `breed-parent-${key}`);
  openSheet({
    title: `${el.name} · parent types`,
    sub: types.join(' · '),
    body: `<div class="wiki-article">
      <div class="preview-box" style="margin-top:10px">
        <div style="width:130px;margin:0 auto">${spriteSVG(sample, { expr: 'happy' })}</div>
        <div class="row" style="flex-wrap:wrap;justify-content:center;gap:5px">${types.map((type) => `<span class="chip">${esc(type)}</span>`).join('')}</div>
      </div>
      <p class="wiki-lede">Every level 3+ species can merge with any other element. <b>${pairs.length}</b> named hybrid${pairs.length === 1 ? '' : 's'} are recorded for ${esc(el.name)}; the rest still blend palette, pattern, breed, and traits.</p>
      ${pairs.length ? `<div class="breeding-grid">${pairs.map((p) => `<button class="breeding-card" data-breed-pair="${p.key}">
        <span class="bc-art">${breedingPairArt(p)}</span>
        <span class="bc-copy"><b>${esc(p.name)}</b><span>${esc(ELEMENTS[p.a].name)} × ${esc(ELEMENTS[p.b].name)}</span><span>${esc(breedingTypeLabel(p.a))} × ${esc(breedingTypeLabel(p.b))}</span></span>
      </button>`).join('')}</div>` : '<p class="tiny muted">No named hybrid pair yet. This species is still a valid parent with any other element.</p>'}
      <div class="breeding-facts" style="margin-top:12px">
        <div><span>Parent type</span><b>${esc(types[0] || 'Hollow')}</b></div>
        <div><span>All types</span><b>${esc(types.join(' · '))}</b></div>
        <div><span>Named pairs</span><b>${pairs.length}</b></div>
        <div><span>Requirement</span><b>Level 3+ and rested</b></div>
      </div>
      <div class="card" style="padding:12px;margin-top:12px;text-align:left">
        <div class="tiny muted" style="font-weight:800;letter-spacing:.08em">POSSIBLE CHILD PREVIEW</div>
        <p class="tiny muted" style="margin:6px 0 8px;line-height:1.55">Any two types can bond and merge, including retired sprites. Search any species, or roll a random mate, to see a possible egg.</p>
        <input class="type-search" type="search" data-mate-search placeholder="Search any species…" autocomplete="off">
        <div class="row" style="gap:6px;margin-top:7px"><button class="btn btn-soft btn-sm" data-mate-random>🎲 Random mate</button><button class="btn btn-primary btn-sm" data-mate-preview>Preview child</button></div>
        <div data-mate-result></div>
      </div>
      <button class="btn btn-soft btn-block" data-world-evo-species="${key}" style="margin-top:10px">🧬 Every evolution path for ${esc(el.name)}</button>
      <button class="btn btn-primary btn-block" data-breed-full style="margin-top:8px">Browse every parent in the codex</button>
      <div class="wiki-footnote">Parent type index · ${ELEMENT_KEYS.length} species</div>
    </div>`,
    onMount: (sheet, close) => {
      sheet.querySelectorAll('[data-breed-pair]').forEach((btn) => btn.addEventListener('click', () => {
        const pair = btn.dataset.breedPair;
        close();
        setTimeout(() => openBreedingEntry(pair), 30);
      }));
      const mateSearch = sheet.querySelector('[data-mate-search]');
      const mateResult = sheet.querySelector('[data-mate-result]');
      const buildPreviewMate = (mateKey) => {
        if (!ELEMENTS[mateKey]) return;
        const a = makeSprite({ element: key, breed: 'puff', stage: 'elder', level: 10, name: el.name, palette: 'native', pattern: 'plain', shiny: !!el.alwaysShiny });
        const b = makeSprite({ element: mateKey, breed: 'puff', stage: 'elder', level: 10, name: ELEMENTS[mateKey].name, palette: 'native', pattern: 'plain', shiny: !!ELEMENTS[mateKey].alwaysShiny });
        const child = buildChild(a, b);
        mateResult.innerHTML = `<div class="preview-box" style="margin-top:8px"><div style="width:110px;margin:0 auto">${eggSVG(child, { progress: 100 })}</div><div class="row" style="flex-wrap:wrap;justify-content:center;gap:4px"><span class="chip">${esc(ELEMENTS[child.element].name)}</span>${child.hybrid ? `<span class="chip">${esc(child.hybrid)}</span>` : ''}<span class="chip">${esc(BREEDS[child.breed]?.name || 'Puff')}</span><span class="chip">${esc(child.palette || 'native')}</span>${child.shiny ? '<span class="chip">✨ shiny</span>' : ''}</div><div class="tiny muted" style="text-align:center;margin-top:5px">${esc(el.name)} × ${esc(ELEMENTS[mateKey].name)} · all types compatible</div></div>`;
      };
      const findMate = () => {
        const q = mateSearch.value.trim().toLowerCase();
        if (!q) return null;
        return ELEMENT_KEYS.find((k) => k !== key && (k.toLowerCase().includes(q) || ELEMENTS[k].name.toLowerCase().includes(q))) || null;
      };
      sheet.querySelector('[data-mate-preview]')?.addEventListener('click', () => {
        const mateKey = findMate();
        if (!mateKey) { mateResult.innerHTML = '<p class="tiny muted" style="margin-top:8px">Type a species name, then preview the possible child.</p>'; return; }
        buildPreviewMate(mateKey);
      });
      sheet.querySelector('[data-mate-random]')?.addEventListener('click', () => {
        const pool = ELEMENT_KEYS.filter((k) => k !== key);
        buildPreviewMate(pick(pool));
      });
      sheet.querySelector('[data-world-evo-species]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openWorldEvolutionAtlas({ speciesKey: key }), 30);
      });
      sheet.querySelector('[data-breed-full]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBreedingCodex(), 30);
      });
    },
  });
}

function openBreedingCodex(filterKey) {
  const allSpecies = ELEMENT_KEYS.slice().sort((a, b) => ELEMENTS[a].name.localeCompare(ELEMENTS[b].name));
  const primaryType = (key) => breedingParentTypes(key)[0] || 'Hollow';
  const typeOptions = [...new Set(allSpecies.map(primaryType))].sort((a, b) => a.localeCompare(b));
  let query = '';
  let typeFilter = 'all';
  let limit = 18;
  let pairLimit = 36;
  const focusedPair = filterKey ? ELEMENTS[filterKey]?.name || '' : '';
  const legacyPairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.fortniteLegacy || ELEMENTS[p.b]?.fortniteLegacy).length;
  const wwePairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.wwe || ELEMENTS[p.b]?.wwe).length;
  const ponyPairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.pony || ELEMENTS[p.b]?.pony).length;
  const tvPairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.tvLegacy || ELEMENTS[p.b]?.tvLegacy).length;
  const realmPairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.realmWave || ELEMENTS[p.b]?.realmWave).length;
  const khPairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.kingdomHearts || ELEMENTS[p.b]?.kingdomHearts).length;
  const pairHTML = (p) => `<button class="breeding-card" data-breed-pair="${p.key}">
    <span class="bc-art">${breedingPairArt(p)}</span>
    <span class="bc-copy"><b>${esc(p.name)}</b><span>${esc(ELEMENTS[p.a].name)} × ${esc(ELEMENTS[p.b].name)}</span><span>${esc(breedingTypeLabel(p.a))} × ${esc(breedingTypeLabel(p.b))}</span></span>
  </button>`;
  const parentHTML = (key) => {
    const el = ELEMENTS[key];
    const types = breedingParentTypes(key);
    return `<button class="breed-parent-card" data-breed-parent="${key}">
      <b>${esc(el.name)}</b>
      <span>${esc(types.join(' · '))}</span>
      <span>${breedingPairsFor(key).length} named hybrid${breedingPairsFor(key).length === 1 ? '' : 's'}</span>
    </button>`;
  };
  openSheet({
    title: 'Breeding codex',
    sub: `${BREEDING_PAIRS.length} named hybrids · ${allSpecies.length} parent species${focusedPair ? ` · ${focusedPair}` : ''}`,
    body: `<div class="wiki-article">
      <p class="wiki-lede">The codex now lists <b>${BREEDING_PAIRS.length} named hybrids</b>, the parent types of <b>${allSpecies.length} species</b>, and <b>${WORLD_EVOLUTION_TOTAL.toLocaleString()} type × form evolution paths</b> across every biome and the Secret Vault. Named hybrids are special results; every two level 3+ sprites can still merge and blend.</p>
      <div class="type-tools" style="margin-top:8px">
        <input class="type-search" data-breed-search type="search" placeholder="Search any species or parent type…" autocomplete="off">
        <select class="type-search" data-breed-type-filter aria-label="Filter parent species by type">
          <option value="all">All parent types</option>
          ${typeOptions.map((type) => `<option value="${esc(type)}">${esc(type)}</option>`).join('')}
        </select>
      </div>
      <h3>Named hybrids</h3>
      <p>Tap a pair for its signature child, parent types, combo power, and inheritance rules.</p>
      <div class="breeding-grid" data-breed-pairs></div>
      <p class="tiny muted" data-breed-pairs-empty hidden>No named hybrid matches that search.</p>
      <button class="btn btn-soft btn-block" data-breed-pairs-more hidden style="margin-top:10px"></button>
      <h3>🧬 All type evolutions</h3>
      <p>Every type has ${EVOLUTION_FORM_KEYS.length} possible permanent forms. The free atlas adds the full world map: <b>${ELEMENT_KEYS.length.toLocaleString()} types × ${EVOLUTION_FORM_KEYS.length} forms</b>, all ${BIOME_KEYS.length} type biomes, every Hollow habitat, parent genes, signature personality, and every Secret Vault species.</p>
      ${worldEvolutionFormSummaryHTML()}
      <button class="btn btn-primary btn-block" data-world-evo-open style="margin-top:10px">🧬 Open the free World Evolution Atlas</button>
      <p class="tiny muted" style="text-align:center;margin-top:6px">Vault genes and evolution recipes are free to read. Vault ownership is separate.</p>
      <h3>All parent types</h3>
      <p>Every species is listed by its primary parent type. Open one to see every named pair and its full compatibility notes.</p>
      <div class="breed-parent-grid" data-breed-parents></div>
      <p class="tiny muted" data-breed-parents-empty hidden>No parent species matches those filters.</p>
      <h3>🪂 Fortnite Legacy &amp; WWE pairs</h3>
      <p>The past-season and squared-circle waves are first-class parents, with <b>${legacyPairCount} named Legacy hybrids</b> and <b>${wwePairCount} named WWE hybrids</b>. Every character also inherits its chapter or division as a parent type.</p>
      <div class="wiki-hybrid-list">
        <button class="wiki-link" data-breed-guide="fortnite"><b>🎮 Fortnite current &amp; legacy · ${FORTNITE_TOTAL}</b><span>${FORTNITE_LEGACY_TOTAL} past-season headliners plus the current pass roster.</span></button>
        <button class="wiki-link" data-breed-guide="wwe"><b>🏆 WWE superstars · ${WWE_TOTAL}</b><span>Legends, current superstars, and the women’s division.</span></button>
      </div>
      <h3>🦄 Pony, TV, realm &amp; Kingdom Hearts pairs</h3>
      <p>The newest waves add <b>${ponyPairCount} pony hybrids</b>, <b>${tvPairCount} TV hybrids</b>, <b>${realmPairCount} horror/light/darkness hybrids</b>, and <b>${khPairCount} Kingdom Hearts hybrids</b>. Every pony’s gene also pays extra coins on check-ins and completed tasks.</p>
      <div class="wiki-hybrid-list">
        <button class="wiki-link" data-breed-guide="ponies"><b>🦄 My Little Pony · ${PONY_TOTAL}</b><span>Mane Six, Cutie Mark Crusaders, royalty, Ponyville, 50 background favourites, sweethearts, and villains.</span></button>
        <button class="wiki-link" data-breed-guide="tvlegends"><b>📺 TV Legends · ${TV_LEGACY_TOTAL}</b><span>Prestige, sitcom, sci-fi, fantasy, and animated television signatures.</span></button>
        <button class="wiki-link" data-breed-guide="fourrealms"><b>🌗 Horror, Light &amp; Darkness · ${REALM_TOTAL}</b><span>Horror, dark horror, light, and darkness species.</span></button>
        <button class="wiki-link" data-breed-guide="kingdomhearts"><b>🗝️ Kingdom Hearts · ${KH_TOTAL}</b><span>Destiny Islands, Organization XIII, Wayfinders, villains, Disney worlds, and Keyblade legacy.</span></button>
      </div>
      <h3>🔐 Secrets, exotics &amp; Vault hybrids</h3>
      <p>Every Secret Vault keeper is a valid parent, including the collection-reward exotics <b>Rift Champion</b> and <b>Grand Slam</b>. Open one to see its parent types and named Vault-compatible hybrids; all species remain mergeable even when no signature pair is recorded.</p>
      <div class="breed-parent-grid" data-breed-secrets></div>
      <button class="btn btn-soft btn-block" data-breed-more hidden style="margin-top:10px"></button>
      <div class="wiki-footnote">${BREEDING_PAIRS.length} named pairs · ${allSpecies.length} species · levels 3+, 60s rest</div>
    </div>`,
    onMount: (sheet, close) => {
      const search = sheet.querySelector('[data-breed-search]');
      const typeSelect = sheet.querySelector('[data-breed-type-filter]');
      const pairsBox = sheet.querySelector('[data-breed-pairs]');
      const pairsEmpty = sheet.querySelector('[data-breed-pairs-empty]');
      const pairsMore = sheet.querySelector('[data-breed-pairs-more]');
      const parentsBox = sheet.querySelector('[data-breed-parents]');
      const secretsBox = sheet.querySelector('[data-breed-secrets]');
      const parentsEmpty = sheet.querySelector('[data-breed-parents-empty]');
      const more = sheet.querySelector('[data-breed-more]');
      sheet.querySelectorAll('[data-breed-guide]').forEach((btn) => btn.addEventListener('click', () => {
        const guide = btn.dataset.breedGuide;
        close();
        setTimeout(() => openWikiGuide(guide), 30);
      }));
      sheet.querySelectorAll('[data-world-evo-open]').forEach((btn) => btn.addEventListener('click', () => {
        close();
        setTimeout(() => openWorldEvolutionAtlas(), 30);
      }));
      const bindPairButtons = () => pairsBox.querySelectorAll('[data-breed-pair]').forEach((btn) => btn.addEventListener('click', () => {
        const pair = btn.dataset.breedPair;
        close();
        setTimeout(() => openBreedingEntry(pair), 30);
      }));
      const paint = () => {
        const q = query.trim().toLowerCase();
        const pairs = (filterKey ? breedingPairsFor(filterKey) : BREEDING_PAIRS).filter((p) => !q || `${p.name} ${ELEMENTS[p.a].name} ${ELEMENTS[p.b].name} ${breedingTypeLabel(p.a)} ${breedingTypeLabel(p.b)}`.toLowerCase().includes(q));
        const pairShown = pairs.slice(0, pairLimit);
        pairsBox.innerHTML = pairShown.map(pairHTML).join('');
        pairsEmpty.hidden = pairs.length !== 0;
        const pairLeft = pairs.length - pairShown.length;
        pairsMore.hidden = pairLeft <= 0;
        pairsMore.textContent = pairLeft > 0 ? `Show ${Math.min(36, pairLeft)} more hybrids · ${pairLeft} left` : '';
        bindPairButtons();
        const parents = allSpecies.filter((key) => {
          const types = breedingParentTypes(key);
          return (typeFilter === 'all' || types.includes(typeFilter))
            && (!q || `${ELEMENTS[key].name} ${types.join(' ')} ${ELEMENTS[key].trait}`.toLowerCase().includes(q));
        });
        const shown = parents.slice(0, limit);
        parentsBox.innerHTML = shown.map(parentHTML).join('');
        parentsBox.querySelectorAll('[data-breed-parent]').forEach((btn) => btn.addEventListener('click', () => {
          const key = btn.dataset.breedParent;
          close();
          setTimeout(() => openBreedingParent(key), 30);
        }));
        secretsBox.innerHTML = allSpecies.filter(isSecretSpecies).map(parentHTML).join('');
        secretsBox.querySelectorAll('[data-breed-parent]').forEach((btn) => btn.addEventListener('click', () => {
          const key = btn.dataset.breedParent;
          close();
          setTimeout(() => openBreedingParent(key), 30);
        }));
        parentsEmpty.hidden = parents.length !== 0;
        const left = parents.length - shown.length;
        more.hidden = left <= 0;
        more.textContent = left > 0 ? `Show ${Math.min(18, left)} more parents · ${left} left` : '';
      };
      search.addEventListener('input', () => { query = search.value; limit = 18; pairLimit = 36; paint(); });
      typeSelect.addEventListener('change', () => { typeFilter = typeSelect.value; limit = 18; pairLimit = 36; paint(); });
      pairsMore.addEventListener('click', () => { pairLimit += 36; paint(); });
      more.addEventListener('click', () => { limit += 18; paint(); });
      paint();
    },
  });
}

function breedingGuideBody() {
  const comboPairs = BREEDING_PAIRS.filter((p) => p.combo);
  const legacyPairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.fortniteLegacy || ELEMENTS[p.b]?.fortniteLegacy).length;
  const wwePairCount = BREEDING_PAIRS.filter((p) => ELEMENTS[p.a]?.wwe || ELEMENTS[p.b]?.wwe).length;
  return `<p class="wiki-lede">The breeding codex lists all <b>${BREEDING_PAIRS.length} hybrid pairs</b> the Hollow knows about, including <b>${legacyPairCount} Fortnite Legacy pairs</b> and <b>${wwePairCount} WWE pairs</b>. It is generated from the same hybrid and combo tables the merge screen uses, so the names, palettes, and powers here are the live values.</p>
    <h3>Every type, every parent</h3>
    <p>There are no type restrictions: any two level 3+ sprites can bond and merge, and <b>retired sprites are valid parents</b>. Open the Vault from the Nest to see every unlocked secret’s combinations, named hybrids, and a live possible-child preview for any species.</p>
    <h3>How a merge works</h3>
    <p>Two grown sprites at <b>level 3 or higher</b> combine for <b>70 coins plus 25 per parent generation</b>. The child is always an egg, and both parents rest for 60 seconds afterwards.</p>
    <h3>What passes on</h3>
    <p>Element, breed, palette, pattern, accessory, personality, and size are all inherited in different ways. The pair page breaks down the exact rules and odds for that specific cross.</p>
    <h3>Signature combos</h3>
    <p><b>${comboPairs.length}</b> pairs also have a named combo with its own power, such as ${comboPairs.slice(0, 3).map((p) => esc(p.combo.name)).join(', ')}. Combo odds rise with every merge you complete.</p>
    <h3>World evolution atlas</h3>
    <p>The free atlas covers every species and all ${EVOLUTION_FORM_KEYS.length} forms, including all <b>${SECRET_SPECIES.length} Secret Vault species</b>. Use it to check a type's biome, gene, parent family, signature habit, personality, finish, and diet recipe before you merge.</p>
    ${worldEvolutionFormSummaryHTML()}
    <button class="btn btn-primary btn-block" data-world-evo-open style="margin-top:10px">🧬 Open the free World Evolution Atlas</button>
    <button class="btn btn-soft btn-block" data-breeding-open style="margin-top:8px">Open the breeding codex</button>`;
}
