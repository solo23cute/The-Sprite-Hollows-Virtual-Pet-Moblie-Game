/* World Evolution Atlas: every species, every form, every biome, and every Vault path.
   This is a reference layer. It reads the live gene, biome, breeding, and evolution
   tables so the Wiki, Bond Codex, and Breeding Codex never drift apart. */

const WORLD_EVOLUTION_FORM_KEYS = Object.keys(EVOLUTION_FORMS);
const WORLD_EVOLUTION_TOTAL = ELEMENT_KEYS.length * WORLD_EVOLUTION_FORM_KEYS.length;

const WORLD_EVOLUTION_ENVIRONMENTS = (() => {
  const list = SCENE_KEYS.map((key) => {
    const scene = SCENES[key] || {};
    return {
      key,
      name: scene.name || key,
      emoji: scene.emoji || '🏡',
      biome: !!scene.biome,
      vault: false,
    };
  });
  list.push({ key: 'vault', name: 'Secret Vault', emoji: '🔐', biome: false, vault: true });
  return list;
})();

const WORLD_EVOLUTION_ENV_BY_SPECIES = (() => {
  const byScene = {};
  SCENE_KEYS.forEach((sceneKey) => {
    (SCENES[sceneKey]?.species || []).forEach((key) => {
      if (!byScene[key]) byScene[key] = sceneKey;
    });
  });
  const map = {};
  ELEMENT_KEYS.forEach((key) => {
    if (isSecretSpecies(key)) {
      map[key] = 'vault';
      return;
    }
    const el = ELEMENTS[key];
    if (el.biomeType) {
      map[key] = `biome-${el.biomeType}`;
      return;
    }
    const types = typeof POKEDEX_META !== 'undefined' ? POKEDEX_META[key]?.types : null;
    if (types) {
      const type = types.find((t) => BIOME_KEYS.includes(t));
      if (type) {
        map[key] = `biome-${type}`;
        return;
      }
    }
    map[key] = byScene[key] || 'grove';
  });
  return map;
})();

const WORLD_EVOLUTION_INDEX = ELEMENT_KEYS.flatMap((key) =>
  WORLD_EVOLUTION_FORM_KEYS.map((formId) => ({ key, formId }))
);

function worldEvolutionHash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function worldEvolutionEnvironment(key) {
  const envKey = WORLD_EVOLUTION_ENV_BY_SPECIES[key] || 'grove';
  return WORLD_EVOLUTION_ENVIRONMENTS.find((env) => env.key === envKey)
    || { key: 'grove', name: SCENES.grove?.name || 'The Hollow', emoji: SCENES.grove?.emoji || '🏡', biome: false, vault: false };
}

function worldEvolutionSourceKey(key) {
  if (key === MASTER_CHEAT_SPECIES) return 'master';
  if (isSecretSpecies(key)) return 'vault';
  if (isExoticSpecies(key)) return 'exotic';
  return 'type';
}

function worldEvolutionSourceLabel(key) {
  const source = worldEvolutionSourceKey(key);
  if (source === 'master') return 'Master Vault';
  if (source === 'vault') return 'Secret Vault';
  if (source === 'exotic') return 'Exotic type egg';
  return 'Type egg';
}

function worldEvolutionSignature(key) {
  const breed = BREEDS[BREED_KEYS[worldEvolutionHash(`${key}:breed`) % BREED_KEYS.length]];
  const personality = PERSONALITIES[PERSONALITY_KEYS[worldEvolutionHash(`${key}:personality`) % PERSONALITY_KEYS.length]];
  const finish = FINISHES[FINISH_KEYS[worldEvolutionHash(`${key}:finish`) % FINISH_KEYS.length]];
  return { breed, personality, finish };
}

function worldEvolutionName(key, formId) {
  const form = EVOLUTION_FORMS[formId];
  if (!form) return ELEMENTS[key]?.name || key;
  if (form.id === 'titan') return TITAN_NAMES[key] || `${ELEMENTS[key].name} Titan`;
  return `${ELEMENTS[key].name} ${form.label}`;
}

function worldEvolutionEntry(key, formId) {
  const el = ELEMENTS[key];
  const form = EVOLUTION_FORMS[formId];
  if (!el || !form) return null;
  const env = worldEvolutionEnvironment(key);
  const tierKey = typeEggRarity(key);
  const gene = GENE_POWERS[key] || { name: 'Unknown gene', icon: '🧬', desc: 'No gene record yet.', effect: {} };
  const parentTypes = typeof parentTypesForSpecies === 'function' ? parentTypesForSpecies(key) : ['Hollow'];
  return {
    key,
    formId,
    el,
    form,
    env,
    tierKey,
    tier: TYPE_EGG_RARITIES[tierKey] || TYPE_EGG_RARITIES.common,
    gene,
    parentTypes,
    signature: worldEvolutionSignature(key),
    sourceKey: worldEvolutionSourceKey(key),
    source: worldEvolutionSourceLabel(key),
    name: worldEvolutionName(key, formId),
  };
}

function worldEvolutionStats() {
  const tiers = {};
  const environments = {};
  const sources = { type: 0, exotic: 0, vault: 0, master: 0 };
  RARITY_TIER_ORDER.forEach((key) => { tiers[key] = 0; });
  WORLD_EVOLUTION_ENVIRONMENTS.forEach((env) => { environments[env.key] = 0; });
  ELEMENT_KEYS.forEach((key) => {
    const tier = typeEggRarity(key);
    tiers[tier] = (tiers[tier] || 0) + WORLD_EVOLUTION_FORM_KEYS.length;
    const env = WORLD_EVOLUTION_ENV_BY_SPECIES[key] || 'grove';
    environments[env] = (environments[env] || 0) + WORLD_EVOLUTION_FORM_KEYS.length;
    sources[worldEvolutionSourceKey(key)] += WORLD_EVOLUTION_FORM_KEYS.length;
  });
  return {
    species: ELEMENT_KEYS.length,
    forms: WORLD_EVOLUTION_FORM_KEYS.length,
    total: WORLD_EVOLUTION_TOTAL,
    scenes: SCENE_KEYS.length,
    biomes: BIOME_KEYS.length,
    vaultSpecies: SECRET_SPECIES.length,
    tiers,
    environments,
    sources,
  };
}

function worldEvolutionRows(opts = {}) {
  const q = String(opts.query || '').trim().toLowerCase();
  const environment = opts.environment || 'all';
  const formId = opts.form || 'all';
  const tier = opts.tier || 'all';
  const source = opts.source || 'all';
  const speciesKey = opts.speciesKey || 'all';
  return WORLD_EVOLUTION_INDEX.filter((row) => {
    if (speciesKey !== 'all' && row.key !== speciesKey) return false;
    if (formId !== 'all' && row.formId !== formId) return false;
    if (tier !== 'all' && typeEggRarity(row.key) !== tier) return false;
    if (source !== 'all' && worldEvolutionSourceKey(row.key) !== source) return false;
    if (environment !== 'all' && (WORLD_EVOLUTION_ENV_BY_SPECIES[row.key] || 'grove') !== environment) return false;
    if (!q) return true;
    const entry = worldEvolutionEntry(row.key, row.formId);
    return `${entry.name} ${entry.el.name} ${row.key} ${entry.form.label} ${entry.env.name} ${entry.tier.name} ${entry.gene.name} ${entry.gene.desc} ${entry.parentTypes.join(' ')} ${entry.signature.breed.name} ${entry.signature.personality.name} ${entry.signature.finish.name} ${entry.source}`.toLowerCase().includes(q);
  });
}

function worldEvolutionFormSummaryHTML() {
  return `<div class="world-evo-form-grid">${WORLD_EVOLUTION_FORM_KEYS.map((formId) => {
    const form = EVOLUTION_FORMS[formId];
    return `<div class="world-evo-form-card">
      <span class="wef-icon">${form.icon}</span>
      <span><b>${esc(form.label)}</b><span>${esc(DIET_PATHS[form.diet]?.label || form.diet)} · ${EVOLUTION_AFFINITY} pts at level ${EVOLUTION_LEVEL}+</span><span class="tiny muted">${esc(form.power.name)} · ${esc(form.power.desc)}</span></span>
    </div>`;
  }).join('')}</div>`;
}

function worldEvolutionStatHTML() {
  const stats = worldEvolutionStats();
  return `<div class="world-evo-stats">
    <div><b>${stats.total.toLocaleString()}</b><span>type × form paths</span></div>
    <div><b>${stats.species.toLocaleString()}</b><span>types, including Vault</span></div>
    <div><b>${stats.biomes} + ${stats.scenes - stats.biomes}</b><span>biomes + Hollow scenes</span></div>
    <div><b>${stats.vaultSpecies}</b><span>Vault species, free to read</span></div>
  </div>`;
}

function worldEvolutionWikiBody() {
  const stats = worldEvolutionStats();
  return `<p class="wiki-lede">The whole world is in one free atlas: <b>${stats.species.toLocaleString()} types × ${stats.forms} forms = ${stats.total.toLocaleString()} evolution paths</b>. Every path is readable for free, including all <b>${stats.vaultSpecies} Secret Vault species</b>. Owning a Vault sprite still requires its door, but its genes, parents, environment, and evolution recipe are never hidden.</p>
    ${worldEvolutionStatHTML()}
    <p class="tiny muted">The atlas is generated from the same live tables the Hollow uses: type biomes, genes, parent types, breeding inheritance, diet affinity, and the four permanent forms. Nothing here is a mock-up or a separate lore list.</p>
    <h3>The four forms</h3>
    ${worldEvolutionFormSummaryHTML()}
    <h3>What shapes an evolution</h3>
    <ul class="wiki-list">
      <li><b>Gene:</b> the species' always-on gene power, inherited through the egg.</li>
      <li><b>Egg environment:</b> a type egg from the Nest, an exotic egg, or a Secret Vault door.</li>
      <li><b>Parents:</b> the child picks an element from either parent, then inherits breed, palette, pattern, accessory, personality, size, and finish through the merge rules.</li>
      <li><b>Diet affinity:</b> reach level ${EVOLUTION_LEVEL} and ${EVOLUTION_AFFINITY} points in Hearty, Sweet, Eerie, or Wild. The form is permanent and does not stack.</li>
      <li><b>Personality &amp; characteristics:</b> temperament, habit, finish, size, Titan name, and biome home all appear on every atlas card.</li>
    </ul>
    <h3>Every environment</h3>
    <p>Choose any of the <b>${stats.biomes} type biomes</b>, any of the <b>${stats.scenes - stats.biomes} Hollow habitats</b>, or the <b>Secret Vault</b>. Each card links back to its full species, parent, and bond records.</p>
    <div class="world-evo-env-strip">${WORLD_EVOLUTION_ENVIRONMENTS.map((env) => `<button class="world-evo-env" data-world-evo-env="${env.key}"><b>${env.emoji} ${esc(env.name)}</b><span>${(stats.environments[env.key] || 0).toLocaleString()} paths${env.vault ? ' · free to read' : ''}</span></button>`).join('')}</div>
    <h3>All twelve tiers</h3>
    <p>The atlas filters the full ladder: ${RARITY_TIER_ORDER.map((key) => `<b>${TYPE_EGG_RARITIES[key].name}</b>`).join(' · ')}. Celestial, Divine, and Eternal are still trail-only apex ranks, so they appear as tier knowledge rather than egg paths.</p>
    <button class="btn btn-primary btn-block" data-world-evo-open style="margin-top:12px">🧬 Open the free World Evolution Atlas</button>
    <p class="tiny muted" style="text-align:center;margin-top:8px">Free reference · Vault ownership is separate · no unlock required to read</p>`;
}

function worldEvolutionCardHTML(row) {
  const entry = worldEvolutionEntry(row.key, row.formId);
  return `<button class="world-evo-card" data-world-key="${row.key}" data-world-form="${row.formId}">
    <span class="we-icon">${entry.form.icon}</span>
    <span class="we-copy">
      <span class="between"><b>${esc(entry.name)}</b><span class="chip" style="color:${entry.tier.color}">${entry.tier.name}</span></span>
      <span>${entry.env.emoji} ${esc(entry.env.name)} · ${esc(entry.form.label)} form · ${esc(entry.source)}</span>
      <span>${entry.gene.icon} ${esc(entry.gene.name)} · ${esc(entry.parentTypes.slice(0, 3).join(' · '))}</span>
    </span>
    <span class="we-arrow">›</span>
  </button>`;
}

function openWorldEvolutionAtlas(opts = {}) {
  const speciesKey = opts.speciesKey || 'all';
  const species = speciesKey !== 'all' ? ELEMENTS[speciesKey] : null;
  let query = opts.query || '';
  let environment = opts.environment || 'all';
  let form = opts.form || 'all';
  let tier = opts.tier || 'all';
  let source = opts.source || 'all';
  let limit = 18;
  const coreScenes = WORLD_EVOLUTION_ENVIRONMENTS.filter((env) => !env.biome && !env.vault);
  const biomeScenes = WORLD_EVOLUTION_ENVIRONMENTS.filter((env) => env.biome);
  openSheet({
    title: '🧬 World Evolution Atlas',
    sub: `${species ? `${species.name} · ` : ''}${WORLD_EVOLUTION_TOTAL.toLocaleString()} paths · free reference`,
    body: `<div class="wiki-article">
      ${worldEvolutionStatHTML()}
      <p class="tiny muted" style="line-height:1.55">Every type, all four forms, every biome and Hollow scene, and every Secret Vault path. This reference is free; Vault ownership is separate.</p>
      <div class="type-tools" style="margin-top:8px">
        <input class="type-search" data-we-search type="search" placeholder="Search type, gene, parent, personality, environment…" value="${esc(query)}" autocomplete="off">
        <select class="type-search" data-we-env aria-label="Filter by environment">
          <option value="all">All environments (${WORLD_EVOLUTION_ENVIRONMENTS.length})</option>
          <optgroup label="Type biomes">${biomeScenes.map((env) => `<option value="${env.key}"${environment === env.key ? ' selected' : ''}>${env.emoji} ${esc(env.name)}</option>`).join('')}</optgroup>
          <optgroup label="Hollow habitats">${coreScenes.map((env) => `<option value="${env.key}"${environment === env.key ? ' selected' : ''}>${env.emoji} ${esc(env.name)}</option>`).join('')}</optgroup>
          <optgroup label="Secret Vault"><option value="vault"${environment === 'vault' ? ' selected' : ''}>🔐 Secret Vault · free to read</option></optgroup>
        </select>
        <select class="type-search" data-we-form aria-label="Filter by evolution form">
          <option value="all">All four forms</option>
          ${WORLD_EVOLUTION_FORM_KEYS.map((formId) => `<option value="${formId}"${form === formId ? ' selected' : ''}>${EVOLUTION_FORMS[formId].icon} ${EVOLUTION_FORMS[formId].label}</option>`).join('')}
        </select>
        <select class="type-search" data-we-tier aria-label="Filter by tier">
          <option value="all">All twelve tiers</option>
          ${RARITY_TIER_ORDER.map((key) => `<option value="${key}"${tier === key ? ' selected' : ''}>${TYPE_EGG_RARITIES[key].name}${RARITY_APEX_KEYS.includes(key) ? ' · trail only' : ''}</option>`).join('')}
        </select>
        <select class="type-search" data-we-source aria-label="Filter by source">
          <option value="all">All sources</option>
          <option value="type"${source === 'type' ? ' selected' : ''}>Type eggs</option>
          <option value="exotic"${source === 'exotic' ? ' selected' : ''}>Exotic eggs</option>
          <option value="vault"${source === 'vault' ? ' selected' : ''}>Secret Vault</option>
          <option value="master"${source === 'master' ? ' selected' : ''}>Master Vault</option>
        </select>
      </div>
      <div class="between" style="margin-top:9px"><span class="tiny muted" data-we-count></span><span class="chip">FREE</span></div>
      <div class="world-evo-list" data-we-list></div>
      <p class="tiny muted" data-we-empty hidden style="text-align:center;margin:14px 4px">No evolution path matches those filters.</p>
      <button class="btn btn-soft btn-block" data-we-more hidden style="margin-top:10px"></button>
      <p class="tiny muted" style="text-align:center;margin-top:10px">Vault genes and recipes are public. Vault sprites still need their Vault door.</p>
    </div>`,
    onMount: (sheet, close) => {
      const search = sheet.querySelector('[data-we-search]');
      const envSelect = sheet.querySelector('[data-we-env]');
      const formSelect = sheet.querySelector('[data-we-form]');
      const tierSelect = sheet.querySelector('[data-we-tier]');
      const sourceSelect = sheet.querySelector('[data-we-source]');
      const list = sheet.querySelector('[data-we-list]');
      const empty = sheet.querySelector('[data-we-empty]');
      const more = sheet.querySelector('[data-we-more]');
      const count = sheet.querySelector('[data-we-count]');
      const paint = () => {
        const rows = worldEvolutionRows({ query, environment, form, tier, source, speciesKey });
        const shown = rows.slice(0, limit);
        list.innerHTML = shown.map(worldEvolutionCardHTML).join('');
        list.querySelectorAll('[data-world-key]').forEach((btn) => btn.addEventListener('click', () => {
          const key = btn.dataset.worldKey;
          const formId = btn.dataset.worldForm;
          close();
          setTimeout(() => openWorldEvolutionEntry(key, formId), 30);
        }));
        count.textContent = `${rows.length.toLocaleString()} path${rows.length === 1 ? '' : 's'}${species ? ` for ${species.name}` : ''}`;
        empty.hidden = rows.length !== 0;
        const left = rows.length - shown.length;
        more.hidden = left <= 0;
        more.textContent = left > 0 ? `Show ${Math.min(18, left)} more · ${left.toLocaleString()} left` : '';
      };
      const reset = () => { limit = 18; paint(); };
      search.addEventListener('input', () => { query = search.value; reset(); });
      envSelect.addEventListener('change', () => { environment = envSelect.value; reset(); });
      formSelect.addEventListener('change', () => { form = formSelect.value; reset(); });
      tierSelect.addEventListener('change', () => { tier = tierSelect.value; reset(); });
      sourceSelect.addEventListener('change', () => { source = sourceSelect.value; reset(); });
      more.addEventListener('click', () => { limit += 18; paint(); });
      paint();
    },
  });
}

function openWorldEvolutionEntry(key, formId) {
  const entry = worldEvolutionEntry(key, formId);
  if (!entry) return;
  const sample = {
    id: `world-evo-${key}-${formId}`,
    element: key,
    breed: BREED_KEYS[worldEvolutionHash(`${key}:breed`) % BREED_KEYS.length],
    stage: 'sprite',
    level: EVOLUTION_LEVEL,
    form: formId,
    pattern: 'plain',
    palette: 'native',
    accessory: 'none',
    name: entry.name,
    size: entry.form.size || 'standard',
  };
  const foods = Object.entries(FOODS)
    .filter(([id, food]) => FOOD_DIET[id]?.path === entry.form.diet && !food.giftOnly)
    .slice(0, 6);
  const foodChips = foods.length
    ? foods.map(([, food]) => `<span class="chip">${food.emoji || '🍲'} ${esc(food.name)}</span>`).join('')
    : '<span class="tiny muted">Any food on this diet path.</span>';
  openSheet({
    title: `${entry.form.icon} ${entry.name}`,
    sub: `${entry.el.name} · ${entry.form.label} form · ${entry.tier.name}`,
    body: `<div class="wiki-article">
      <div class="world-evo-hero">
        <div class="world-evo-portrait">${spriteSVG(sample, { expr: 'happy' })}</div>
        <div class="world-evo-hero-copy">
          <div class="row" style="flex-wrap:wrap;gap:4px"><span class="chip" style="color:${entry.tier.color}">${entry.tier.name}</span><span class="chip">${entry.env.emoji} ${esc(entry.env.name)}</span><span class="chip">${esc(entry.source)}</span>${entry.sourceKey !== 'type' && entry.sourceKey !== 'exotic' ? '<span class="chip">🔓 free to read</span>' : ''}</div>
          <p>${esc(entry.el.blurb)}</p>
        </div>
      </div>
      <div class="breeding-facts">
        <div><span>Base type</span><b>${esc(entry.el.name)}</b></div>
        <div><span>Evolution</span><b>${esc(entry.form.label)} · ${esc(entry.form.power.name)}</b></div>
        <div><span>Environment</span><b>${entry.env.emoji} ${esc(entry.env.name)}</b></div>
        <div><span>Egg source</span><b>${esc(entry.source)}</b></div>
        <div><span>Gene power</span><b>${entry.gene.icon} ${esc(entry.gene.name)}</b></div>
        <div><span>Parent types</span><b>${esc(entry.parentTypes.join(' · '))}</b></div>
        <div><span>Signature habit</span><b>${entry.signature.breed.name} · ${esc(entry.signature.breed.perk)}</b></div>
        <div><span>Signature personality</span><b>${entry.signature.personality.name} · ${esc(entry.signature.personality.desc)}</b></div>
        <div><span>Signature finish</span><b>${entry.signature.finish.icon} ${esc(entry.signature.finish.name)} · ${esc(entry.signature.finish.bonus)}</b></div>
        <div><span>Titan name</span><b>${esc(TITAN_NAMES[key] || entry.name)}</b></div>
        <div><span>Characteristic</span><b>${esc(entry.el.trait)}</b></div>
        <div><span>Size</span><b>${esc(entry.form.size || 'standard')}</b></div>
      </div>
      <h3>Evolution recipe</h3>
      <div class="card" style="padding:12px;text-align:left">
        <div class="between"><b>${entry.form.icon} ${esc(entry.form.label)}</b><span class="chip">${EVOLUTION_AFFINITY} pts</span></div>
        <p class="tiny muted" style="margin:5px 0 0;line-height:1.55">Reach level <b>${EVOLUTION_LEVEL}</b>, then build <b>${esc(DIET_PATHS[entry.form.diet]?.label || entry.form.diet)}</b> affinity to <b>${EVOLUTION_AFFINITY}</b>. The form is permanent and does not stack with another form.</p>
        <div class="row" style="flex-wrap:wrap;gap:5px;margin-top:7px">${foodChips}</div>
      </div>
      <h3>What the child inherits</h3>
      <ul class="wiki-list">
        <li><b>Element:</b> a 50/50 pick from either parent. This decides the base gene and biome family.</li>
        <li><b>Gene:</b> ${entry.gene.icon} <b>${esc(entry.gene.name)}</b> — ${esc(entry.gene.desc)}</li>
        <li><b>Habit, personality, size:</b> inherited from either parent, with a small random reroll. The signature shown here is this type’s field-guide expression, not a fixed lock.</li>
        <li><b>Colours, pattern, accessory, finish:</b> blended or inherited through the live merge odds; a finish can pass at 45% when a parent carries one.</li>
        <li><b>Combo:</b> a named parent pair can roll its signature power in addition to the gene and evolution power.</li>
      </ul>
      <div class="breeding-power"><span class="bpw-icon">${entry.form.power.icon}</span><span><b>${esc(entry.form.power.name)}</b><br><span>${esc(entry.form.power.desc)}</span></span></div>
      <div class="actions" style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
        <button class="btn btn-primary btn-block" data-we-species>📖 Open the ${esc(entry.el.name)} wiki file</button>
        <button class="btn btn-soft btn-block" data-we-breeding>🧬 Open the breeding codex</button>
        <button class="btn btn-soft btn-block" data-we-bonds>💞 Open the Bond Codex</button>
      </div>
      <p class="tiny muted" style="text-align:center;margin-top:9px">Free reference. Vault ownership still requires its Vault door.</p>
    </div>`,
    onMount: (sheet, close) => {
      sheet.querySelector('[data-we-species]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openWikiArticle(key), 30);
      });
      sheet.querySelector('[data-we-breeding]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBreedingCodex(key), 30);
      });
      sheet.querySelector('[data-we-bonds]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBondCodex(), 30);
      });
    },
  });
}
