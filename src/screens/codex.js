/* Type encyclopedia: every element's art, power, egg price, rarity, and hybrids. */

const TYPE_HYBRID_INDEX = {};
Object.entries(HYBRID_NAMES).forEach(([pair, name]) => {
  const [a, b] = pair.split('+');
  if (ELEMENTS[a]) (TYPE_HYBRID_INDEX[a] = TYPE_HYBRID_INDEX[a] || []).push({ name, element: b });
  if (ELEMENTS[b]) (TYPE_HYBRID_INDEX[b] = TYPE_HYBRID_INDEX[b] || []).push({ name, element: a });
});
Object.keys(TYPE_HYBRID_INDEX).forEach((key) => {
  TYPE_HYBRID_INDEX[key].sort((x, y) => x.name.localeCompare(y.name));
});

function hybridsFor(key) {
  return TYPE_HYBRID_INDEX[key] || [];
}

function codexScreen(root) {
  let query = '';
  let rarity = 'all';
  let category = 'all';
  let limit = 12;
  const all = ELEMENT_KEYS.slice().sort((a, b) => ELEMENTS[a].name.localeCompare(ELEMENTS[b].name));

  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Field guide</div><h1>Type encyclopedia</h1><p>Art, powers, eggs, and hybrids.</p></div>
      <span class="chip" data-codex-count></span>
    </div>
    <div class="wiki-callout">
      <span class="wc-icon">📖</span>
      <span class="wc-copy"><b>The Sprite Wiki</b><span>Species files, habitats, and guides.</span></span>
      <button class="btn btn-sm btn-soft" data-open-wiki>Open</button>
    </div>
    <div class="type-feature-grid">
      <button class="type-feature" data-open-biomes>
        <span class="tf-icon">🧭</span>
        <span class="tf-copy"><b>Type Biome Atlas</b><span>${BIOME_KEYS.length} environments · 1,025 Pokémon · ${EXOTIC_SPECIES.length} exotic signatures</span></span>
        <span class="tf-arrow">›</span>
      </button>
      <button class="type-feature secret-feature" data-open-secrets>
        <span class="tf-icon">🔐</span>
        <span class="tf-copy"><b>Secret Vault</b><span>${(state.secretUnlocks || []).length} / ${SECRET_SPECIES.length} found · not sold in the Nest</span></span>
        <span class="tf-arrow">›</span>
      </button>
    </div>
    <div class="type-tools" style="margin-top:2px">
      <input class="type-search" type="search" data-codex-search placeholder="Search types…" aria-label="Search sprite types" autocomplete="off">
      <div class="type-rarities">
        <button class="chip type-rarity on" data-codex-rarity="all">All</button>
        ${Object.entries(TYPE_EGG_RARITIES).map(([key, r]) => `<button class="chip type-rarity" data-codex-rarity="${key}"><span class="te-dot" style="background:${r.color}"></span>${r.name}</button>`).join('')}
      </div>
      <div class="type-rarities" style="margin-top:6px">
        <button class="chip on" data-codex-category="all">All species</button>
        <button class="chip" data-codex-category="exotic">✦ Exotic</button>
        <button class="chip" data-codex-category="secret">🔐 Secret</button>
        <button class="chip" data-codex-category="master">🕹️ Master</button>
        <button class="chip" data-codex-category="prismatic">🌈 Prismatic</button>
      </div>
    </div>
    <div class="type-grid" data-codex-grid></div>
    <p class="tiny muted" data-codex-empty hidden style="text-align:center;margin:14px 4px">No type matches that search.</p>
    <button class="btn btn-soft btn-block" data-codex-more hidden style="margin-top:12px"></button>
    <div class="section-title" style="margin-top:16px"><h2>Finishes</h2><span>any type can hatch shiny</span></div>
    <div class="finish-strip" data-finish-strip></div>
    <p class="tiny muted" style="text-align:center;margin:6px 4px 0">About 15% of eggs carry a finish. The rest hatch in their natural colors.</p>
    <div class="card" style="padding:12px;margin-top:14px;font-size:11px;line-height:1.6;color:var(--muted)">
      Every type can be bought as its own egg in the Nest. Base tiers follow egg price; Secret, Exotic, and Master outrank them. The gene power is always active while that sprite is in your Hollow.
    </div>`;

  const grid = root.querySelector('[data-codex-grid]');
  const empty = root.querySelector('[data-codex-empty]');
  const more = root.querySelector('[data-codex-more]');
  const count = root.querySelector('[data-codex-count]');
  const search = root.querySelector('[data-codex-search]');
  root.querySelector('[data-open-wiki]').addEventListener('click', () => App.go('wiki'));
  root.querySelector('[data-open-biomes]').addEventListener('click', openBiomeAtlas);
  root.querySelector('[data-open-secrets]').addEventListener('click', openSecretVault);

  function matches(key) {
    const q = query.trim().toLowerCase();
    const el = ELEMENTS[key];
    const family = typeof parentTypesForSpecies === 'function' ? parentTypesForSpecies(key).join(' ') : '';
    const catalog = el.catalogGroup && typeof CATALOG_GROUPS !== 'undefined' ? CATALOG_GROUPS[el.catalogGroup]?.label || '' : '';
    const categoryOk = category === 'all' || category === 'prismatic'
      || (category === 'exotic' && isExoticSpecies(key))
      || (category === 'secret' && isSecretSpecies(key) && key !== MASTER_CHEAT_SPECIES)
      || (category === 'master' && key === MASTER_CHEAT_SPECIES);
    const prismaticOk = category !== 'prismatic' || !!el.alwaysShiny;
    return categoryOk && prismaticOk
      && (!q || `${el.name} ${key} ${family} ${catalog} ${el.catalogType || ''} ${el.alwaysShiny ? 'prismatic always shiny multiverse' : ''}`.toLowerCase().includes(q))
      && (rarity === 'all' || typeEggRarity(key) === rarity);
  }

  function cardHTML(key) {
    const el = ELEMENTS[key];
    const exotic = isExoticSpecies(key);
    const tier = TYPE_EGG_RARITIES[typeEggRarity(key)];
    const power = GENE_POWERS[key];
    const price = TYPE_EGG_PRICE[key];
    const hybrids = hybridsFor(key);
    const secret = isSecretSpecies(key);
    const master = key === MASTER_CHEAT_SPECIES;
    const badge = master ? '<span class="tc-exotic">MASTER</span> ' : secret ? '<span class="tc-exotic">SECRET</span> ' : el.alwaysShiny ? '<span class="tc-exotic">PRISMATIC</span> ' : exotic ? '<span class="tc-exotic">EXOTIC</span> ' : '';
    const sample = {
      id: `codex-${key}`, element: key, breed: 'puff', stage: 'sprite',
      pattern: 'plain', palette: 'native', accessory: 'none', name: el.name, level: 3, size: 'standard', shiny: !!el.alwaysShiny,
    };
    return `<button class="type-card" data-type="${key}">
      <span class="tc-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <span class="tc-top"><b>${el.name}</b><i class="te-dot" style="background:${tier.color}"></i></span>
      <span class="tc-power">${badge}${power.icon} ${power.name}</span>
      <span class="tc-meta">${secret || master ? `${tier.name} · Vault only` : `${tier.name} · ${price || '—'} 🪙`} · ${hybrids.length} hybrid${hybrids.length === 1 ? '' : 's'}</span>
    </button>`;
  }

  function paint() {
    const list = all.filter(matches);
    const shown = list.slice(0, limit);
    grid.innerHTML = shown.map(cardHTML).join('');
    grid.querySelectorAll('[data-type]').forEach((btn) => {
      btn.addEventListener('click', () => openTypeDetail(btn.dataset.type));
    });
    count.textContent = `${list.length} type${list.length === 1 ? '' : 's'}`;
    empty.hidden = list.length !== 0;
    const left = list.length - shown.length;
    more.hidden = left <= 0;
    more.textContent = left > 0 ? `Show ${Math.min(12, left)} more · ${left} left` : '';
  }

  function reset() {
    limit = 12;
    paint();
  }

  search.addEventListener('input', () => {
    query = search.value;
    reset();
  });
  root.querySelectorAll('[data-codex-rarity]').forEach((btn) => {
    btn.addEventListener('click', () => {
      rarity = btn.dataset.codexRarity;
      root.querySelectorAll('[data-codex-rarity]').forEach((b) => b.classList.toggle('on', b === btn));
      reset();
    });
  });
  root.querySelectorAll('[data-codex-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      category = btn.dataset.codexCategory;
      root.querySelectorAll('[data-codex-category]').forEach((b) => b.classList.toggle('on', b === btn));
      reset();
    });
  });
  more.addEventListener('click', () => {
    limit += 12;
    paint();
  });

  const strip = root.querySelector('[data-finish-strip]');
  strip.innerHTML = FINISH_KEYS.map((key) => {
    const f = FINISHES[key];
    const sample = {
      id: `finish-${key}`, element: 'bloom', breed: 'puff', stage: 'sprite', variant: key,
      pattern: 'plain', palette: 'native', accessory: 'none', name: f.name, level: 3, size: 'standard',
    };
    return `<button class="finish-card" data-finish="${key}">
      <span class="fc-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <b>${f.icon} ${f.name}</b>
      <span>${f.bonus}</span>
    </button>`;
  }).join('');
  strip.querySelectorAll('[data-finish]').forEach((btn) => {
    btn.addEventListener('click', () => openFinishDetail(btn.dataset.finish));
  });

  paint();
}

function openFinishDetail(key) {
  const f = FINISHES[key];
  if (!f) return;
  const sample = {
    id: `finish-detail-${key}`, element: 'bloom', breed: 'puff', stage: 'sprite', variant: key,
    pattern: 'plain', palette: 'native', accessory: 'none', name: f.name, level: 3, size: 'standard',
  };
  openSheet({
    title: `${f.icon} ${f.name} finish`,
    sub: 'A rare shell that can appear on any type.',
    body: `<div class="preview-box" style="margin-top:12px">
        <div style="width:150px;margin:0 auto">${spriteSVG(sample, { expr: 'happy' })}</div>
        <div class="row" style="flex-wrap:wrap;justify-content:center;gap:4px">
          <span class="chip">${f.name}</span>
          <span class="chip">~15% of eggs</span>
        </div>
      </div>
      <div class="card" style="padding:12px;margin-top:10px;text-align:left;font-size:12px;line-height:1.6">${f.desc}</div>
      <div class="card" style="padding:12px;margin-top:10px;text-align:left">
        <div class="tiny muted" style="font-weight:800;letter-spacing:.08em">FINISH BONUS</div>
        <div class="small" style="margin-top:4px">${f.icon} <b>${f.bonus}</b></div>
        <div class="tiny muted" style="margin-top:6px">Finishes stack with gene powers, breed habits, combos, and evolution powers.</div>
      </div>
      <div class="actions" style="display:flex;gap:8px;margin-top:14px">
        <button class="btn btn-primary btn-block" data-finish-nest>Look for one in the Nest</button>
      </div>`,
    onMount: (sheet, close) => {
      sheet.querySelector('[data-finish-nest]').addEventListener('click', () => {
        close();
        App.go('nest');
      });
    },
  });
}

function openTypeDetail(key) {
  const el = ELEMENTS[key];
  if (!el) return;
  const tier = TYPE_EGG_RARITIES[typeEggRarity(key)];
  const power = GENE_POWERS[key];
  const price = TYPE_EGG_PRICE[key];
  const hybrids = hybridsFor(key);
  const exotic = isExoticSpecies(key);
  const secret = isSecretSpecies(key);
  const master = key === MASTER_CHEAT_SPECIES;
  const vaulted = secret || master;
  const biome = biomeForSpecies(key);
  const pal = resolvePalette({ element: key, palette: 'native' });
  const sample = {
    id: `type-detail-${key}`, element: key, breed: 'puff', stage: 'sprite',
    pattern: 'plain', palette: 'native', accessory: 'none', name: el.name, level: 3, size: 'standard',
  };
  openSheet({
    title: el.name,
    sub: `${tier.name} tier · ${el.trait}`,
    body: `<div class="preview-box" style="margin-top:12px">
        <div class="glow" style="position:absolute;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle, ${pal.body}55, transparent 65%);filter:blur(12px)"></div>
        <div style="width:150px;margin:0 auto">${spriteSVG(sample, { expr: 'happy' })}</div>
        <div class="row" style="flex-wrap:wrap;justify-content:center;gap:4px">
          <span class="chip">${tier.name}</span>
          <span class="chip">${vaulted ? 'Vault only' : `${price || '—'} 🪙 egg`}</span>
          <span class="chip">Titan · ${TITAN_NAMES[key]}</span>
          ${master ? '<span class="chip chip-exotic">🕹️ Master secret</span>' : secret ? '<span class="chip chip-exotic">🔐 Secret Vault</span>' : el.alwaysShiny ? '<span class="chip chip-exotic">🌈 Prismatic · always shiny</span>' : exotic ? '<span class="chip chip-exotic">✦ Exotic guardian</span>' : ''}
          ${biome ? `<span class="chip">${biome.emoji} ${esc(biome.name)}</span>` : ''}
        </div>
      </div>
      <div class="card" style="padding:12px;margin-top:10px;text-align:left;font-size:12px;line-height:1.6">${el.blurb}</div>
      <div class="section-title" style="margin-top:12px"><h2>Gene power</h2></div>
      <div class="card" style="padding:12px;display:flex;gap:10px;align-items:center;text-align:left">
        <span style="font-size:24px">${power.icon}</span>
        <span><b style="font-size:12.5px">${power.name}</b><br><span class="tiny muted">${power.desc}</span></span>
      </div>
      <div class="section-title" style="margin-top:12px"><h2>Hybrids</h2><span>${hybrids.length}</span></div>
      <div class="row" style="flex-wrap:wrap;gap:6px;justify-content:flex-start">
        ${hybrids.length
          ? hybrids.map((h) => `<span class="chip">${h.name} <span class="tiny muted">× ${ELEMENTS[h.element].name}</span></span>`).join('')
          : '<span class="tiny muted">No signature hybrids yet — it still blends colors like any parent.</span>'}
      </div>
      <div class="actions" style="display:flex;flex-direction:column;gap:8px;margin-top:14px">
        ${vaulted
          ? '<button class="btn btn-primary btn-block" data-codex-vault>Open the Secret Vault</button>'
          : '<button class="btn btn-primary btn-block" data-codex-nest>Find its egg in the Nest</button>'}
        <button class="btn btn-soft btn-block" data-codex-wiki>📖 Read the wiki article</button>
      </div>`,
    onMount: (sheet, close) => {
      sheet.querySelector('[data-codex-nest]')?.addEventListener('click', () => {
        close();
        App.go('nest');
      });
      sheet.querySelector('[data-codex-vault]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openSecretVault(), 30);
      });
      sheet.querySelector('[data-codex-wiki]').addEventListener('click', () => {
        close();
        App.go('wiki');
        openWikiArticle(key);
      });
    },
  });
}
