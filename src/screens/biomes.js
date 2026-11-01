/* Type Biome Atlas and the Secret Vault. */

function extraBiomeCards(activeScene) {
  if (typeof EXTRA_BIOME_KEYS === 'undefined') return '';
  return EXTRA_BIOME_KEYS.map((key) => {
    const scene = SCENES[key];
    if (!scene) return '';
    const tint = sceneTint(key);
    const sampleKey = (scene.species || [])[0] || 'bloom';
    const sample = {
      id: `extra-${key}`, element: sampleKey, breed: 'puff', stage: 'sprite',
      palette: 'native', pattern: 'plain', accessory: 'none', name: scene.name, level: 3, size: 'standard',
    };
    return `<button class="biome-card ${activeScene === key ? 'on' : ''}" data-biome-travel="${key}" style="--biome:${tint.b1};--biome-deep:${tint.b2}">
      <span class="biome-card-top"><span class="biome-icon">${scene.emoji}</span><span>${esc(scene.habitat)}</span></span>
      <span class="biome-card-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <b>${esc(scene.name)}</b>
      <span class="biome-card-meta">${(scene.species || []).length.toLocaleString()} species · +${Math.round((scene.bonus || 0.46) * 100)}% XP</span>
      <span class="biome-card-guardian">Biome habitat</span>
    </button>`;
  }).join('');
}

function exoticBiomeCards(activeScene) {
  if (typeof EXOTIC_BIOME_KEYS === 'undefined') return '';
  return EXOTIC_BIOME_KEYS.map((key) => {
    const scene = SCENES[key];
    if (!scene) return '';
    const tint = sceneTint(key);
    const speciesKey = (scene.species || [])[0];
    const meta = ELEMENTS[speciesKey] || {};
    const sample = {
      id: `exotic-${key}`, element: speciesKey, breed: 'puff', stage: 'elder',
      palette: 'native', pattern: 'plain', accessory: 'none', name: meta.name || scene.name, level: 30, size: 'standard',
    };
    return `<button class="biome-card ${activeScene === key ? 'on' : ''}" data-biome-travel="${key}" style="--biome:${tint.b1};--biome-deep:${tint.b2}">
      <span class="biome-card-top"><span class="biome-icon">${scene.emoji}</span><span>${esc(scene.habitat)}</span></span>
      <span class="biome-card-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <b>${esc(scene.name)}</b>
      <span class="biome-card-meta">Hollow exotic · +${Math.round((scene.bonus || 0.55) * 100)}% XP</span>
      <span class="biome-card-guardian">${esc(meta.name || 'Exotic')}’s own biome</span>
      ${typeof biomeQuestBadge === 'function' ? biomeQuestBadge(key) : ''}
    </button>`;
  }).join('');
}

function openBiomeAtlas() {
  const visited = new Set(state.biomesVisited || []);
  const activeScene = state.theme.scene;
  const cards = BIOME_KEYS.map((type) => {
    const biome = TYPE_BIOMES[type];
    const palette = PDX_TYPES[type];
    const scene = SCENES[biome.key];
    const guardian = ELEMENTS[biome.guardian];
    const sample = {
      id: `atlas-${type}`, element: biome.guardian, breed: 'puff', stage: 'sprite',
      palette: 'native', pattern: 'plain', accessory: 'none', name: guardian.name, level: 3, size: 'standard',
    };
    const isVisited = visited.has(biome.key);
    return `<button class="biome-card ${activeScene === biome.key ? 'on' : ''}" data-biome-travel="${biome.key}" style="--biome:${palette.primary};--biome-deep:${palette.deep}">
      <span class="biome-card-top"><span class="biome-icon">${scene.emoji}</span><span>${esc(palette.name)}</span>${isVisited ? '<span class="biome-visited">visited</span>' : ''}</span>
      <span class="biome-card-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <b>${esc(scene.name)}</b>
      <span class="biome-card-meta">${biome.speciesCount.toLocaleString()} species · +50% XP</span>
      <span class="biome-card-guardian">Exotic · ${esc(guardian.name)}</span>
    </button>`;
  }).join('');

  const specialCards = SPECIAL_EXOTIC_SPECIES.map((key) => {
    const special = ELEMENTS[key];
    const sample = {
      id: `special-${key}`, element: key, breed: 'puff', stage: 'sprite',
      palette: 'native', pattern: 'plain', accessory: 'none', name: special.name, level: 3, size: 'standard',
    };
    return `<div class="card" style="display:flex;gap:10px;align-items:center;padding:11px;margin-top:8px">
      <span style="width:82px;height:82px;flex:0 0 82px">${spriteSVG(sample, { expr: 'happy' })}</span>
      <span style="flex:1;min-width:0"><b style="display:block">${esc(special.name)}</b><span class="tiny muted" style="display:block">Not tied to a biome. ${esc(special.trait)}</span></span>
      <button class="btn btn-sm btn-soft" data-special-exotic="${key}">Open</button>
    </div>`;
  }).join('');

  openSheet({
    title: '🧭 Type Biome Atlas',
    sub: `${BIOME_KEYS.length} standard-type environments, each with its own guardian. Matching sprites earn +50% XP.`,
    body: `<div class="biome-summary">
        <span class="chip">${visited.size} / ${BIOME_KEYS.length} visited</span>
        <span class="chip">${EXOTIC_SPECIES.length} exotic signatures</span>
        <span class="chip">1,025 Pokémon sorted by type</span>
      </div>
      <div class="biome-grid">${cards}</div>
      <div class="section-title" style="margin-top:14px"><h2>Biome habitats</h2><span>${typeof EXTRA_BIOME_KEYS !== 'undefined' ? EXTRA_BIOME_KEYS.length : 0} more built-in scenes</span></div>
      <div class="biome-grid">${extraBiomeCards(activeScene)}</div>
      <div class="section-title" style="margin-top:14px"><h2>Hollow exotic biomes</h2><span>${typeof EXOTIC_BIOME_KEYS !== 'undefined' ? EXOTIC_BIOME_KEYS.length : 0} signature environments</span></div>
      <div class="biome-grid">${exoticBiomeCards(activeScene)}</div>
      <div class="section-title" style="margin-top:14px"><h2>Hollow exotics</h2><span>${SPECIAL_EXOTIC_SPECIES.length} signatures</span></div>
      ${specialCards}
      <div class="section-title" style="margin-top:14px"><h2>🗺️ District quests</h2><span>${typeof BIOME_QUEST_KEYS !== 'undefined' ? BIOME_QUEST_KEYS.length : 0} three-step lines</span></div>
      <p class="quest-intro">Every GTA district and every Hollow exotic biome has a short story line. Travel there for free — each trip pays ${TRAVEL_COINS} coins — play its games, and look after a sprite on location. Each step also pays coins, XP, and bond.</p>
      <div class="quest-grid" data-quest-grid>${typeof BIOME_QUEST_KEYS !== 'undefined' ? BIOME_QUEST_KEYS.map(biomeQuestCard).join('') : ''}</div>
      <div class="card" style="padding:12px;margin-top:12px;font-size:11px;line-height:1.6;color:var(--muted)">
        <b style="color:var(--text)">How biomes work</b><br>
        Choose any biome here or in Studio. Every species whose standard type matches the biome earns the full <b style="color:var(--gold)">+50% XP</b>; visitors still get +10%. Visit all 18 to awaken the <b style="color:var(--text)">Atlas Keeper</b>.
      </div>`,
    onMount: (sheet, close) => {
      sheet.querySelectorAll('[data-biome-travel]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.biomeTravel;
          const type = key.replace('biome-', '');
          const biome = TYPE_BIOMES[type] || null;
          const trip = Actions.setTheme({ scene: key });
          close();
          App.go('hollow');
          const travelled = SCENES[key];
          toast(`${travelled.emoji} ${travelled.name} · ${(travelled.species || []).length.toLocaleString()} species thriving${trip && trip.coins ? ` · +${trip.coins} coins` : ''}.`, '🧭');
          Sfx.click();
        });
      });
      if (typeof wireBiomeQuests === 'function') wireBiomeQuests(sheet);
      sheet.querySelectorAll('[data-special-exotic]').forEach((btn) => {
        btn.addEventListener('click', () => {
          close();
          setTimeout(() => openWikiArticle(btn.dataset.specialExotic), 30);
        });
      });
    },
  });
}

function openSecretVault() {
  if (typeof checkProgressSecrets === 'function') checkProgressSecrets();
  const unlocked = new Set(state.secretUnlocks || []);
  const found = SECRET_SPECIES.filter((key) => unlocked.has(key));
  const masterFound = unlocked.has(MASTER_CHEAT_SPECIES);
  const rotating = SECRET_SPECIES.filter((key) => SECRET_SPECIES_META[key].vaultWindow);
  const vaultBreedCard = (key) => {
    const meta = SECRET_SPECIES_META[key];
    const types = parentTypesForSpecies(key);
    const pairs = typeof breedingPairsFor === 'function' ? breedingPairsFor(key).length : 0;
    const sample = { id: `vault-breed-${key}`, element: key, breed: 'puff', stage: 'sprite', palette: 'native', pattern: 'plain', accessory: 'none', name: meta.name, level: 20, size: 'standard', shiny: !!ELEMENTS[key]?.alwaysShiny };
    return `<button class="secret-card found" data-vault-parent="${key}" style="text-align:left">
      <span class="secret-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <span class="secret-copy"><b>${esc(meta.name)}</b><span>${esc(types.join(' · '))}</span><span>${pairs} named hybrid${pairs === 1 ? '' : 's'} · every type compatible</span><span class="secret-found-note">Combinations & possible children ›</span></span>
    </button>`;
  };
  const monthly = SECRET_SPECIES.filter((key) => SECRET_SPECIES_META[key].vaultWindow?.kind === 'month');
  const weekly = SECRET_SPECIES.filter((key) => SECRET_SPECIES_META[key].vaultWindow?.kind === 'week');
  const progress = SECRET_SPECIES.filter((key) => !SECRET_SPECIES_META[key].vaultWindow);
  const openNow = rotating.filter((key) => vaultOpen(key));
  const calendar = typeof currentVaultKeys === 'function' ? currentVaultKeys() : null;
  const secretCard = (key) => {
    const meta = SECRET_SPECIES_META[key];
    const isFound = unlocked.has(key);
    const available = meta.vaultWindow ? vaultOpen(key) : false;
    const sample = {
      id: `secret-${key}`, element: key, breed: 'puff', stage: key === MASTER_CHEAT_SPECIES && isFound ? 'elder' : 'sprite',
      palette: 'native', pattern: 'plain', accessory: key === MASTER_CHEAT_SPECIES && isFound ? 'crown' : 'none',
      name: meta.name, level: isFound ? 30 : 3, size: 'standard', variant: key === MASTER_CHEAT_SPECIES && isFound ? 'galaxy' : null,
    };
    return `<article class="secret-card ${isFound ? 'found' : 'locked'} ${available ? 'available' : ''}" data-secret="${key}">
      <span class="secret-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <span class="secret-copy">
        <span class="tiny secret-kicker">${isFound ? 'FOUND' : available ? 'OPEN NOW' : meta.vaultWindow ? 'ROTATING' : 'SEALED'}</span>
        <b>${isFound || available ? esc(meta.name) : '???'}</b>
        <span>${esc(meta.vaultWindow ? vaultWindowLabel(key) : meta.clue)}</span>
        ${isFound ? `<span class="secret-found-note">${esc(meta.title)} · ${esc(meta.gene[0])}</span>` : available ? `<button class="btn btn-primary btn-sm" data-claim-secret="${key}" style="margin-top:4px;justify-self:start">Claim this window</button>` : `<span class="secret-found-note">${esc(meta.clue)}</span>`}
      </span>
    </article>`;
  };
  openSheet({
    title: '🔐 Secret Vault',
    sub: `${found.length} of ${SECRET_SPECIES.length} secrets found · ${rotating.length} calendar keepers`,
    body: `<div class="secret-vault-head">
        <span class="secret-vault-icon">🗝️</span>
        <div><b>${found.length === SECRET_SPECIES.length ? 'Vault complete' : 'Progress doors & calendar windows'}</b>
        <p>${calendar ? `${esc(calendar.label)}.` : ''} One monthly keeper and two weekly relay windows open on the real calendar. Progress secrets stay available once their clue is complete.</p></div>
      </div>
      <h3>Open this window</h3>
      <p>${openNow.length ? 'These doors are open now. Claim them before the window turns.' : 'No calendar door is open right now.'}</p>
      <div class="secret-grid">${openNow.map(secretCard).join('') || '<p class="tiny muted">The next monthly or weekly window is still sealed.</p>'}</div>
      <h3>Monthly keepers</h3>
      <p>Twelve doors, one for each real-world month. A missed month returns next year.</p>
      <div class="secret-grid">${monthly.map(secretCard).join('')}</div>
      <h3>Twice-weekly relays</h3>
      <p>Two relay windows every week: Monday–Wednesday and Thursday–Sunday. The pair rotates through eight keepers.</p>
      <div class="secret-grid">${weekly.map(secretCard).join('')}</div>
      <h3>Progress secrets</h3>
      <p>These ${progress.length} keepers follow milestones, not the calendar. Daily check-ins, tasks, gifts, and rebirth all feed this shelf.</p>
      <div class="secret-grid">${progress.map(secretCard).join('')}</div>
      <h3>🧬 Combinations & possible children</h3>
      <p>Every unlocked keeper can bond and merge with <b>every type and variant</b>, including retired parents. Open one for its parent types, named hybrids, and a live child preview with any species in the Hollow.</p>
      <div class="secret-grid">${found.length ? found.map(vaultBreedCard).join('') : '<p class="tiny muted">Find a secret first — its full combination tree unlocks here.</p>'}</div>
      <button class="btn btn-soft btn-block" data-vault-all-children style="margin:8px 0 10px">Browse all parent combinations & possible children</button>
      <div class="secret-code-card ${masterFound ? 'found' : ''}">
        <div class="between"><b>${masterFound ? '🕹️ Master Cheat unlocked' : '🕹️ Unlisted entry'}</b><span class="chip">${masterFound ? 'LV 30' : 'CHEAT'}</span></div>
        <p>${masterFound ? 'The Master Cheat is in your collection, already at level 1,000. Try not to break the Hollow.' : 'One secret ignores every normal rule. Finish the tour, then speak the Master’s name into the console.'}</p>
        <form class="secret-code-row" data-secret-form>
          <input name="code" maxlength="18" autocomplete="off" placeholder="Enter cheat code" aria-label="Cheat code">
          <button class="btn btn-primary btn-sm" type="submit">Unlock</button>
        </form>
        <p class="tiny muted" style="margin:6px 0 0;line-height:1.5">Reusable daily codes: <b>HOLLOW</b> · <b>STARS</b> · <b>REBIRTH</b> (after your first rebirth). <b>MASTER</b> still unlocks the Master after the tour.</p>
        <span class="tiny muted" data-secret-status></span>
      </div>
      <p class="tiny muted" style="text-align:center;margin-top:12px">Secret sprites arrive as babies at level 1. The Master Cheat arrives fully grown.</p>`,
    onMount: (sheet, close) => {
      sheet.querySelectorAll('[data-vault-parent]').forEach((btn) => btn.addEventListener('click', () => {
        const key = btn.dataset.vaultParent;
        close();
        setTimeout(() => openBreedingParent(key), 30);
      }));
      sheet.querySelector('[data-vault-all-children]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBreedingCodex(), 30);
      });
      sheet.querySelectorAll('[data-claim-secret]').forEach((btn) => btn.addEventListener('click', () => {
        const key = btn.dataset.claimSecret;
        if (!vaultOpen(key)) { toast('That Vault window has closed.', '🔐'); return; }
        const sprite = unlockSecret(key);
        if (!sprite) { toast('That secret is already in your Hollow.', '🔐'); return; }
        Sfx.level();
        close();
        setTimeout(() => openSecretVault(), 500);
      }));
      const form = sheet.querySelector('[data-secret-form]');
      const status = sheet.querySelector('[data-secret-status]');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = form.querySelector('input').value;
        const res = Actions.redeemCode(code);
        if (!res.ok) {
          status.textContent = res.reason === 'tour'
            ? 'Finish or skip the induction tour first. The Master is listening.'
            : res.reason === 'rebirth' ? 'Complete your first Rebirth Meal to wake this code.'
            : res.reason === 'found' ? 'That secret is already in your collection.' : 'The console rejects that phrase. The Master is listening for its own name.';
          status.style.color = 'var(--warn)';
          Sfx.error();
          return;
        }
        status.textContent = res.already
          ? (res.daily ? `${res.code} was already used today. Come back tomorrow.` : 'The Master is already here.')
          : res.reward ? `${res.reward.label} delivered. Daily codes reset tomorrow.` : 'Access granted. The Master Cheat joined your Hollow.';
        status.style.color = 'var(--good)';
        Sfx.level();
        if (!res.already) setTimeout(() => { close(); openSecretVault(); }, 900);
      });
    },
  });
}
