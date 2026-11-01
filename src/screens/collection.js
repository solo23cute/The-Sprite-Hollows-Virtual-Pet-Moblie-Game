/* Collection: every sprite you've raised, plus the detail sheet. */

function collectionScreen(root) {
  let filter = 'all';
  let query = '';
  /* Only offer filters for elements you actually own. */
  const owned = new Set(state.sprites.map((s) => s.element));
  const elKeys = ['all', ...ELEMENT_KEYS.filter((k) => owned.has(k))];

  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Your collection</div><h1>Sprites</h1><p data-count></p></div>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <button class="btn btn-sm btn-soft" data-goto-roster>🧭 Roster</button>
        <button class="btn btn-sm btn-soft" data-goto-foods>🍱 Food guide</button>
        <button class="btn btn-sm btn-soft" data-goto-nest>${icon('nest')} Nest</button>
      </div>
    </div>
    <div class="type-tools" style="margin-bottom:10px">
      <input class="type-search" type="search" data-sprite-search placeholder="Search sprites, types, secret, exotic…" aria-label="Search your sprites" autocomplete="off">
    </div>
    <div class="style-picker" data-filters style="margin-bottom:12px">
      ${elKeys.map((k) => `<button class="style-opt ${k === 'all' ? 'on' : ''}" data-filter="${k}">
        <span class="sw" style="${k === 'all' ? 'background:linear-gradient(135deg,var(--accent),var(--accent-2))' : `background:${ELEMENTS[k].primary}`}"></span>
        ${k === 'all' ? 'All' : ELEMENTS[k].name}</button>`).join('')}
    </div>
    <div class="collection-grid" data-grid></div>
    <div data-eggs></div>
    <div data-retired></div>
    <div class="section-title"><h2>Hollow notes</h2></div>
    <div class="card" style="padding:13px;font-size:11.5px;line-height:1.6;color:var(--muted)">
      Sprites are born from eggs and grow through <b style="color:var(--text)">Baby → Juvenile → Sprite → Elder</b> as they level, up to the cap of <b style="color:var(--text)">level 1,000</b>. Open any sprite to see its next stage and the exact level it needs.
      Merge two level-3+ sprites in the Nest to blend their elements, colors and personalities into a brand new egg.
    </div>`;

  root.querySelector('[data-goto-roster]').onclick = () => {
    App.rosterReturn = 'collection';
    App.go('roster');
  };
  root.querySelector('[data-goto-nest]').onclick = () => App.go('nest');
  root.querySelector('[data-goto-foods]').onclick = () => App.go('foods');
  const search = root.querySelector('[data-sprite-search]');
  search.addEventListener('input', () => {
    query = search.value;
    paint();
  });

  root.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter;
      root.querySelectorAll('[data-filter]').forEach((b) => b.classList.toggle('on', b === btn));
      paint();
      Sfx.click();
    });
  });

  function paint() {
    const grid = root.querySelector('[data-grid]');
    const grown = grownSprites().slice().sort((a, b) => b.level - a.level);
    const active = grown.filter((s) => !s.retired);
    const retired = grown.filter((s) => s.retired);
    const q = query.trim().toLowerCase();
    const matchesQuery = (s) => {
      if (!q) return true;
      const el = ELEMENTS[s.element] || ELEMENTS.bloom;
      const text = [
        displayName(s), s.name, s.element, el.name, el.trait, el.blurb,
        GENE_POWERS[s.element]?.name,
        isExoticSpecies(s.element) ? 'exotic signature' : '',
        isSecretSpecies(s.element) ? 'secret vault' : '',
      ].join(' ').toLowerCase();
      return q.split(/\s+/).filter(Boolean).every((part) => text.includes(part));
    };
    const filtered = (filter === 'all' ? active : active.filter((s) => s.element === filter)).filter(matchesQuery);
    root.querySelector('[data-count]').textContent = `${active.length} sprite${active.length === 1 ? '' : 's'} · ${retired.length} retired · ${eggs().length} egg${eggs().length === 1 ? '' : 's'}`;
    if (!filtered.length) {
      grid.innerHTML = `<div class="card empty-state" style="grid-column:1/-1">
        <div style="font-size:30px">🫧</div>
        <p>${q ? `No sprites match “${esc(query.trim())}”. Try a name, a type, or “exotic”.` : active.length ? 'No sprites with that element yet. Try merging for hybrids!' : grown.length ? 'Everyone is retired right now. Bring someone back from the retirement home below.' : 'No sprites yet. Warm an egg in the Nest to meet your first friend.'}</p>
        <button class="btn btn-primary" data-empty-nest style="margin-top:12px">Open the Nest</button>
      </div>`;
      grid.querySelector('[data-empty-nest]')?.addEventListener('click', () => App.go('nest'));
    } else {
      grid.innerHTML = filtered.map(spriteCardHTML).join('');
      grid.querySelectorAll('[data-sprite]').forEach((card) => {
        card.addEventListener('click', () => openSpriteDetail(card.dataset.sprite));
      });
    }
    const eggBox = root.querySelector('[data-eggs]');
    if (eggs().length) {
      eggBox.innerHTML = `<div class="section-title" style="margin-top:18px"><h2>Eggs</h2><span>tap to warm</span></div>
        <div class="egg-row">${eggs().map((e) => `<button class="egg-card" data-egg="${e.id}">
          ${eggSVG(e, { progress: e.hatch })}
          <div class="ec-name">${esc(displayName(e))}</div>
          <div class="ec-sub">${e.hatch >= 100 ? 'Ready to hatch!' : `${Math.round(e.hatch)}% warm`}</div>
          <div class="egg-progress"><i style="width:${e.hatch}%"></i></div>
        </button>`).join('')}</div>`;
      eggBox.querySelectorAll('[data-egg]').forEach((b) => {
        b.addEventListener('click', () => App.openHatch(b.dataset.egg));
      });
    } else {
      eggBox.innerHTML = '';
    }
    const retiredBox = root.querySelector('[data-retired]');
    if (retired.length) {
      retiredBox.innerHTML = `<div class="section-title" style="margin-top:18px"><h2>Retirement home</h2><span>${retired.length} resting</span></div>
        <div class="collection-grid retired-grid">${retired.map(spriteCardHTML).join('')}</div>
        <div class="card" style="padding:12px;margin-top:8px;font-size:11px;line-height:1.6;color:var(--muted)">Retired elders stay home. Their needs stop fading and they stop earning XP, but you can still pet, feed, and visit them. Tap one to bring them back.</div>`;
      retiredBox.querySelectorAll('[data-sprite]').forEach((card) => {
        card.addEventListener('click', () => openSpriteDetail(card.dataset.sprite));
      });
    } else {
      retiredBox.innerHTML = '';
    }
  }

  const unsub = subscribeState(() => paint());
  paint();
  return () => unsub();
}

function spriteCardHTML(s) {
  const el = ELEMENTS[s.element] || ELEMENTS.bloom;
  const active = state.activeId === s.id;
  const combo = specialCombo(s);
  const form = formOf(s);
  const finish = finishOf(s);
  return `<button class="sprite-card ${active ? 'is-active' : ''} ${s.retired ? 'is-retired' : ''}" data-sprite="${s.id}" style="--card-accent:${el.primary}">
    <span class="lv">Lv ${s.level}${s.level >= MAX_LEVEL ? ' · MAX' : ''}</span>
    <div class="sc-badges">
      ${isExoticSpecies(s.element) ? '<span class="chip" title="Exotic signature">✦ Exotic</span>' : ''}
      ${isSecretSpecies(s.element) ? '<span class="chip" title="Secret Vault">🔐 Secret</span>' : ''}
      ${s.shiny ? '<span class="chip chip-shine" title="A rare, permanent sparkle">✨ Shiny</span>' : ''}
      ${finish ? `<span class="chip" title="${esc(finish.desc)}">${finish.icon} ${esc(finish.name)}</span>` : ''}
      ${combo ? `<span class="chip chip-mut" title="${esc(combo.name)}">✦ ${esc(combo.name)}</span>` : s.mutation ? `<span class="chip chip-mut" title="${esc(s.mutation)} mutation">✦ ${esc(s.mutation)}</span>` : ''}
      ${form ? `<span class="chip chip-form">${form.icon} ${esc(formName(s))}</span>` : ''}
      ${s.retired ? '<span class="chip">🏡 Retired</span>' : ''}
      ${active ? '<span class="chip"><span class="active-dot"></span>Active</span>' : ''}
    </div>
    <div class="sc-art">${spriteSVG(s, { expr: expressionFor(s) })}</div>
    <div class="sc-name">${esc(displayName(s))} <span class="gender-mark" style="color:${genderOf(s).color}" title="${esc(genderOf(s).name)}">${genderOf(s).symbol}</span> ${s.asleep ? '<span class="tiny muted">💤</span>' : ''}</div>
    <div class="sc-meta">${typeName(s)} · ${BREEDS[s.breed]?.name || 'Puff'}<br>${stageLabel(s)} · ${SIZES[s.size]?.name || 'Standard'} · ${bondTier(s)}</div>
    ${restLeft(s) > 0 ? '<span class="chip" style="position:absolute;bottom:8px;right:8px;font-size:8px">resting</span>' : ''}
  </button>`;
}

function openSpriteDetail(id) {
  const s = findSprite(id);
  if (!s) return;
  Sfx.spriteBabble(s);
  const el = ELEMENTS[s.element] || ELEMENTS.bloom;
  const tier = spriteRarity(s);
  const breed = BREEDS[s.breed];
  const persona = PERSONALITIES[s.personality];
  const isActive = state.activeId === s.id && !s.retired;
  const xp = s.stage === 'egg' ? 0 : s.level >= MAX_LEVEL ? 100 : Math.min(100, (s.xp / xpNeeded(s.level)) * 100);
  const powers = spritePowers(s);
  const combo = specialCombo(s);
  const form = formOf(s);
  const finish = finishOf(s);
  const diet = dietInfo(s);
  const readyDiet = diet.filter((d) => d.points >= d.need);
  const evo = stageEvolutionInfo(s);
  const bondRank = bondRankFor(s.bond || 0);
  const formForDiet = (key) => Object.values(EVOLUTION_FORMS).find((f) => f.diet === key);
  const evolutionLabel = (f) => f.id === 'titan' ? (TITAN_NAMES[s.element] || 'Titan') : `${el.name} ${f.label}`;
  const body = `
    <div class="detail-hero"><div class="glow" style="background:radial-gradient(circle, ${el.primary}66, transparent 65%)"></div>
      ${s.stage === 'egg' ? eggSVG(s, { progress: s.hatch }) : spriteSVG(s, { expr: expressionFor(s) })}
    </div>
    <div style="text-align:center">
      <h2 style="font-size:22px">${esc(displayName(s))}</h2>
      <p class="sub" style="margin-top:2px">${typeName(s)} · ${breed?.name || 'Puff'} · ${stageLabel(s)}</p>
      <div class="row" style="justify-content:center;flex-wrap:wrap;gap:5px;margin-top:8px">
        <span class="chip">Lv ${s.level}${s.level >= MAX_LEVEL ? ' · MAX' : ''}</span>
        <span class="chip gender-chip" style="color:${genderOf(s).color}" title="${esc(genderOf(s).blurb)}">${genderOf(s).symbol} ${esc(genderOf(s).name)}</span>
        <span class="chip">${s.hybrid ? 'Hybrid' : ELEMENTS[s.element].name}</span>
        <span class="chip">${SIZES[s.size]?.name || 'Standard'}</span>
        <span class="chip">Gen ${(s.gen || 0) + 1}</span>
        <span class="chip chip-tier" style="--tier:${tier.color}">${tier.name}</span>
        ${s.rarityBoost ? `<span class="chip" title="Earned by finishing trails">🥾 Trail +${s.rarityBoost}</span>` : ''}
        ${s.sugar ? `<span class="chip">🍬 Sugar ${s.sugar}/3</span>` : ''}
        ${s.shiny ? '<span class="chip chip-shine" title="A rare, permanent sparkle">✨ Shiny</span>' : ''}
        ${finish ? `<span class="chip" title="${esc(finish.desc)}">${finish.icon} ${esc(finish.name)} finish</span>` : ''}
        ${form ? `<span class="chip chip-form">${form.icon} ${esc(formName(s))}</span>` : ''}
        ${s.retired ? '<span class="chip">🏡 Retired</span>' : ''}
        ${combo ? `<span class="chip chip-mut">✦ ${esc(combo.name)}</span>` : s.mutation ? `<span class="chip chip-mut">✦ ${esc(s.mutation)}</span>` : ''}
      </div>
    </div>
    ${s.retired ? `<div class="card" style="padding:10px;margin-top:10px;font-size:11px;line-height:1.55;color:var(--muted)">🏡 <b style="color:var(--text)">Retired.</b> Needs are paused and XP is off. Petting, feeding, and visits still work.</div>` : ''}
    ${s.stage === 'egg' ? `
      <div class="card" style="padding:12px;margin-top:14px">
        <div class="between"><span class="small"><b>${s.hatch >= 100 ? 'Ready to hatch' : 'Warm this egg'}</b></span><span class="tiny muted">${Math.round(s.hatch)}%</span></div>
        <div class="egg-progress" style="margin-top:8px"><i style="width:${s.hatch}%"></i></div>
        <button class="btn btn-primary btn-block" data-warm style="margin-top:12px">${s.hatch >= 100 ? 'Hatch now' : 'Warm it'}</button>
      </div>`
      : `
      <div class="detail-stats">
        <div class="dstat"><span class="lbl">Bond</span><div class="bar bond"><i style="width:${s.bond}%"></i></div><b>${Math.round(s.bond)}</b></div>
        ${needBlock('hunger', s.needs.hunger)}
        ${needBlock('energy', s.needs.energy)}
        ${needBlock('joy', s.needs.joy)}
        ${needBlock('clean', s.needs.clean)}
        <div class="dstat"><span class="lbl">XP</span><div class="bar" style="background:rgba(255,255,255,.1)"><i style="width:${xp}%;background:linear-gradient(90deg,var(--accent),var(--accent-2))"></i></div><b>${Math.round(xp)}%</b></div>
      </div>
      <div class="card evolution-next-card" style="padding:12px;margin-top:12px">
        <div class="between"><div class="tiny muted" style="font-weight:800;letter-spacing:.08em">NEXT EVOLUTION</div><span class="chip">${evo.final ? `Lv ${MAX_LEVEL.toLocaleString()} cap` : `Lv ${evo.required}`}</span></div>
        <div class="evo-next-main">
          <span class="evo-next-icon">${evo.final ? '🏆' : evo.ready ? '🌟' : '🌱'}</span>
          <div><b>${evo.final ? `${STAGE_LABELS[STAGE_ORDER[STAGE_ORDER.length - 1]]} is the final stage` : `${STAGE_LABELS[s.stage]} → ${evo.nextLabel}`}</b><p>${evo.final ? `Every age tier is complete. Keep growing toward level ${MAX_LEVEL.toLocaleString()}.` : evo.ready ? `${esc(displayName(s))} is ready to become a ${evo.nextLabel}.` : `${evo.levelsLeft} level${evo.levelsLeft === 1 ? '' : 's'} and ${Math.max(0, Math.ceil(xpNeeded(s.level) - (s.xp || 0))).toLocaleString()} XP to ${evo.nextLabel}.`}</p></div>
        </div>
        <div class="bar" style="height:8px;margin-top:9px"><i style="width:${Math.round(evo.progress * 100)}%;background:linear-gradient(90deg,var(--accent),var(--accent-2))"></i></div>
        <div class="between tiny muted" style="margin-top:6px"><span>${bondRank.icon} ${esc(bondRank.name)} · ${Math.round(s.bond)} bond</span><span>${Math.round(evo.progress * 100)}%</span></div>
        <button class="btn btn-soft btn-block" data-evo-open style="margin-top:9px">View full evolution path</button>
      </div>
      <div class="card" style="padding:12px;margin-top:12px">
        <div class="tiny muted" style="font-weight:800;letter-spacing:.08em">BREED PERK</div>
        <div class="small" style="margin-top:3px"><b>${breed?.perk || ''}</b></div>
        <div class="tiny muted" style="margin-top:6px">Personality: <b style="color:var(--text)">${persona?.name || 'Sunny'}</b> — ${persona?.desc || ''}</div>
        ${s.lineage ? `<div class="tiny muted" style="margin-top:6px">Merged from <b style="color:var(--text)">${esc(s.lineage[0])}</b> + <b style="color:var(--text)">${esc(s.lineage[1])}</b></div>` : ''}
      </div>
      <div class="card power-card" style="padding:12px;margin-top:10px">
        <div class="tiny muted" style="font-weight:800;letter-spacing:.08em;margin-bottom:7px">GENES, HABITS & POWERS</div>
        ${powers.map((p) => `<div class="power-row">
          <span class="power-ico">${p.icon || '✨'}</span>
          <span style="flex:1;min-width:0"><b>${esc(p.name || p.kind)}</b><span class="power-kind">${p.kind}</span><div class="tiny muted" style="margin-top:1px">${esc(p.desc || '')}</div></span>
        </div>`).join('')}
      </div>
      <div class="card" style="padding:12px;margin-top:10px">
        <div class="between"><div class="tiny muted" style="font-weight:800;letter-spacing:.08em">PARENTS &amp; BREEDING</div><span class="chip">${breedingPairsFor(s.element).length} pairs</span></div>
        ${s.hybridParents ? `<div class="tiny muted" style="margin-top:6px">Hybrid of <b style="color:var(--text)">${esc(ELEMENTS[s.hybridParents[0]]?.name || s.hybridParents[0])}</b> × <b style="color:var(--text)">${esc(ELEMENTS[s.hybridParents[1]]?.name || s.hybridParents[1])}</b></div>` : ''}
        <div class="tiny muted" style="margin-top:6px">Gene power: <b style="color:var(--text)">${GENE_POWERS[s.element]?.icon || ''} ${esc(GENE_POWERS[s.element]?.name || 'None')}</b></div>
        <div class="tiny muted" style="margin-top:2px">Breed habit: <b style="color:var(--text)">${HABITS[s.breed]?.icon || ''} ${esc(HABITS[s.breed]?.name || 'None')}</b></div>
        <button class="btn btn-soft btn-block" data-breed-open style="margin-top:9px">See ${esc(el.name)} breeding pairs</button>
      </div>
      <div class="card evolution-card" style="padding:12px;margin-top:10px">
        <div class="between"><div class="tiny muted" style="font-weight:800;letter-spacing:.08em">EVOLUTION</div><span class="chip">${form ? `${form.icon} evolved` : `Level ${EVOLUTION_LEVEL}+`}</span></div>
        ${form ? `
          <div class="evo-current"><span class="evo-icon">${form.icon}</span><div><b>${esc(formName(s))}</b><div class="tiny muted">${esc(form.desc)}</div><div class="tiny" style="color:var(--accent);margin-top:3px">${form.power.icon} ${esc(form.power.name)} — ${esc(form.power.desc)}</div></div></div>
        ` : `
          <p class="tiny muted" style="margin:7px 0 8px;line-height:1.55">Food builds four diet affinities. At level 10, fill a path to 12 and choose an evolution.</p>
          <div class="diet-list">${diet.map((d) => `<div class="diet-row ${d.points >= d.need ? 'ready' : ''}">
            <span class="dr-ico">${d.icon}</span>
            <span style="flex:1;min-width:0"><div class="between" style="margin-bottom:4px"><span class="tiny">${d.label}</span><b class="tiny">${d.points}/${d.need}</b></div><div class="bar" style="height:6px"><i style="width:${Math.min(100, (d.points / d.need) * 100)}%;background:linear-gradient(90deg,var(--accent),var(--accent-2))"></i></div></span>
          </div>`).join('')}</div>
          ${s.level >= EVOLUTION_LEVEL && readyDiet.length ? readyDiet.map((d) => {
            const f = formForDiet(d.key);
            return f ? `<button class="btn btn-gold btn-block" data-evolve="${f.id}" style="margin-top:7px">${f.icon} Evolve into ${evolutionLabel(f)}</button>` : '';
          }).join('') : s.level < EVOLUTION_LEVEL ? `<div class="tiny muted" style="margin-top:8px">Reach level ${EVOLUTION_LEVEL} to take a path. Keep feeding to prepare.</div>` : `<div class="tiny muted" style="margin-top:8px">Fill any affinity bar to 12 to unlock its evolution.</div>`}
        `}
      </div>
      ${s.stage !== 'egg' ? `<div class="card" style="padding:12px;margin-top:10px;font-size:11.5px;line-height:1.6;color:var(--muted)">🍬 <b style="color:var(--text)">Candy sugar ${s.sugar || 0}/3.</b> Feeding candy treats builds sugar. At 3, this sprite transforms into a random candy species.</div>` : ''}
      <div class="detail-actions">
        <button class="btn ${isActive ? 'btn-ghost' : 'btn-primary'}" data-set-active ${isActive || s.retired ? 'disabled' : ''}>${s.retired ? 'Retired' : isActive ? 'Currently active' : 'Set active'}</button>
        ${STAGE_ORDER.indexOf(s.stage) >= STAGE_ORDER.indexOf('elder') ? `<button class="btn btn-soft" data-retire>${s.retired ? 'Bring back' : 'Retire'}</button>` : ''}
        ${s.stage !== 'egg' && s.level >= MAX_LEVEL ? `<button class="btn btn-gold" data-rebirth>🌱 Rebirth (${foodCount('rebirthmeal')})</button>` : ''}
        <button class="btn btn-soft" data-talk>${icon('chat')} Talk</button>
        <button class="btn" data-style>${icon('palette')} Style</button>
        <button class="btn" data-rename>${icon('dice')} Rename</button>
      </div>
      <button class="btn btn-ghost btn-block" data-pet style="margin-top:8px">${icon('heart')} Pet ${esc(displayName(s))}</button>
    `}
  `;

  const { overlay } = openSheet({
    title: s.stage === 'egg' ? 'Egg' : 'Sprite details',
    sub: s.stage === 'egg' ? 'Warm it with taps or leave it cozy in the nest.' : 'Everything you’ve grown together.',
    body,
    onMount: (root, close) => {
      root.querySelector('[data-warm]')?.addEventListener('click', () => { close(); App.openHatch(s.id); });
      root.querySelector('[data-set-active]')?.addEventListener('click', () => {
        Actions.setActive(s.id);
        Sfx.pop();
        toast(`${displayName(s)} is now exploring the Hollow.`, '🏡');
        close();
        App.refresh();
      });
      root.querySelector('[data-talk]')?.addEventListener('click', () => { close(); App.openChat(s.id); });
      root.querySelector('[data-style]')?.addEventListener('click', () => { close(); App.openStudio({ spriteId: s.id }); });
      root.querySelector('[data-evo-open]')?.addEventListener('click', () => { close(); setTimeout(() => openEvolutionForecast(s.id), 160); });
      root.querySelector('[data-breed-open]')?.addEventListener('click', () => { close(); setTimeout(() => openBreedingCodex(s.element), 40); });
      root.querySelector('[data-retire]')?.addEventListener('click', () => {
        const wasRetired = s.retired;
        const res = wasRetired ? Actions.unretire(s.id) : Actions.retire(s.id);
        if (res && res.ok === false) { toast(res.reason === 'elder' ? 'Only elders can retire.' : 'That did not work.', '🏡'); Sfx.error(); return; }
        close();
        toast(wasRetired ? `${displayName(s)} is back in the Hollow.` : `${displayName(s)} retired to a cozy home.`, '🏡');
        Sfx.pop();
        App.refresh();
      });
      root.querySelector('[data-rebirth]')?.addEventListener('click', () => {
        const res = Actions.feedStock(s.id, 'rebirthmeal');
        if (!res.ok) {
          toast(res.reason === 'empty' ? 'A Rebirth Meal is waiting in the market for 600 coins.' : res.reason === 'level' ? 'Only a MAX sprite can reincarnate.' : 'The rebirth could not begin.', '🌱');
          Sfx.error();
          return;
        }
        close();
        App.refresh();
      });
      root.querySelector('[data-rename]')?.addEventListener('click', () => {
        close();
        openRenameModal(s.id);
      });
      root.querySelectorAll('[data-evolve]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const res = Actions.evolve(s.id, btn.dataset.evolve);
          if (!res.ok) {
            toast(res.reason === 'level' ? `Reach level ${EVOLUTION_LEVEL} first.` : res.reason === 'diet' ? 'That diet path is not full yet.' : 'That evolution is not available.', '🧬');
            Sfx.error();
            return;
          }
          close();
          toast(`${displayName(s)} evolved into ${formName(res.sprite)}!`, res.form.icon);
          Sfx.win();
          setTimeout(() => openSpriteDetail(s.id), 380);
        });
      });
      root.querySelector('[data-pet]')?.addEventListener('click', (e) => {
        const r = Actions.pet(s.id);
        Sfx.spriteCry(s);
        if (r.coins) coinFly(e.currentTarget, 1);
        burstOn(e.currentTarget, ['💛', '💗'], 5);
        toast(reactionLine(s, 'pet'), '💗');
      });
    },
  });
  return overlay;
}

function openEvolutionForecast(id) {
  const s = findSprite(id);
  if (!s) return;
  const evo = stageEvolutionInfo(s);
  const rank = bondRankFor(s.bond || 0);
  const diet = dietInfo(s);
  const form = formOf(s);
  const forms = Object.values(EVOLUTION_FORMS);
  const stageRows = STAGE_ORDER.map((stage, index) => {
    const reached = STAGE_ORDER.indexOf(s.stage) >= index;
    const current = s.stage === stage;
    return `<div class="evo-stage ${reached ? 'reached' : ''} ${current ? 'on' : ''}">
      <span class="evo-stage-dot">${reached ? '✓' : index + 1}</span>
      <span><b>${STAGE_LABELS[stage]}</b><span class="tiny muted">Level ${STAGE_LEVEL[stage]}+</span></span>
      ${current ? '<span class="chip">CURRENT</span>' : ''}
    </div>`;
  }).join('');
  const dietRows = diet.map((d) => {
    const ready = s.level >= EVOLUTION_LEVEL && d.points >= d.need && !form;
    const f = forms.find((item) => item.diet === d.key);
    return `<div class="evo-diet ${ready ? 'ready' : ''}">
      <span class="evo-next-icon">${d.icon}</span>
      <span style="flex:1;min-width:0"><span class="between"><b>${esc(d.label)}</b><span class="chip">${d.points}/${d.need}</span></span><span class="tiny muted">${f ? esc(f.label) : 'Diet path'} · ${ready ? 'Ready to evolve' : `Reach level ${EVOLUTION_LEVEL} and ${d.need} points`}</span><div class="bar" style="height:6px;margin-top:5px"><i style="width:${Math.min(100, (d.points / d.need) * 100)}%"></i></div></span>
    </div>`;
  }).join('');
  openSheet({
    title: '🌟 Evolution path',
    sub: `${displayName(s)} · ${evo.final ? 'Elder' : `${STAGE_LABELS[s.stage]} → ${evo.nextLabel}`}`,
    body: `<div class="card evolution-next-card">
        <div class="between"><span class="tiny muted" style="font-weight:800;letter-spacing:.08em">NEXT STAGE</span><span class="chip">Level ${s.level}${s.level >= MAX_LEVEL ? ' · MAX' : ''}</span></div>
        <div class="evo-next-main"><span class="evo-next-icon">${evo.final ? '🏆' : evo.ready ? '🌟' : '🌱'}</span><div><b>${evo.final ? `${STAGE_LABELS[STAGE_ORDER[STAGE_ORDER.length - 1]]} is the final stage` : `${STAGE_LABELS[s.stage]} → ${evo.nextLabel}`}</b><p>${evo.final ? `Every age tier is complete. The long road runs to level ${MAX_LEVEL.toLocaleString()}.` : evo.ready ? `Ready now: ${esc(displayName(s))} can become a ${evo.nextLabel}.` : `Needs ${evo.levelsLeft} more level${evo.levelsLeft === 1 ? '' : 's'} (level ${evo.required}) to reach ${evo.nextLabel}.`}</p></div></div>
        <div class="bar" style="height:8px;margin-top:9px"><i style="width:${Math.round(evo.progress * 100)}%;background:linear-gradient(90deg,var(--accent),var(--accent-2))"></i></div>
      </div>
      <h3>Life stages</h3>
      <div class="evo-stage-list">${stageRows}</div>
      <h3>Bond rank</h3>
      <div class="card bond-now-card" style="padding:11px"><div class="between"><span class="tiny muted">${rank.icon} ${esc(rank.name)}</span><span class="chip">${Math.round(s.bond)} / 100</span></div><p class="tiny muted" style="margin:6px 0 0;line-height:1.5">${esc(rank.blurb)} · ${esc(bondEffectBits(rank.effect))}</p><button class="btn btn-soft btn-block" data-evo-bond style="margin-top:8px">Open Bond Codex</button></div>
      <h3>Diet evolutions</h3>
      <p class="tiny muted">At level ${EVOLUTION_LEVEL}, fill any path to ${EVOLUTION_AFFINITY} for a permanent form.</p>
      <div class="evo-diet-list">${dietRows}</div>
      <button class="btn btn-soft btn-block" data-evo-world style="margin-top:9px">🧬 World evolution atlas for ${esc(s.element)}</button>
      ${form ? `<div class="card" style="padding:11px;margin-top:10px"><b>${form.icon} ${esc(formName(s))}</b><p class="tiny muted" style="margin:4px 0 0">${esc(form.desc)}</p></div>` : ''}
      <button class="btn btn-ghost btn-block" data-evo-back style="margin-top:10px">Back to sprite details</button>`,
    onMount: (sheet, close) => {
      sheet.querySelector('[data-evo-bond]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBondCodex({ spriteId: s.id }), 160);
      });
      sheet.querySelector('[data-evo-world]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openWorldEvolutionAtlas({ speciesKey: s.element, form: s.form || 'all' }), 160);
      });
      sheet.querySelector('[data-evo-back]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openSpriteDetail(s.id), 160);
      });
    },
  });
}

function openRenameModal(id) {
  const s = findSprite(id);
  if (!s) return;
  const modal = openModal({
    title: 'Rename sprite',
    sub: 'Up to 16 characters. Names are forever (unless you rename again).',
    body: `<div style="margin-top:14px"><input id="rename-input" maxlength="16" value="${esc(s.name || '')}" placeholder="Name your sprite" style="width:100%;padding:13px 15px;border-radius:14px;background:rgba(255,255,255,.07);border:1px solid var(--line);color:var(--text);outline:none;font-size:15px;font-weight:800"></div>
      <div class="actions" style="display:flex;gap:8px;margin-top:14px">
        <button class="btn btn-ghost" data-close>Cancel</button>
        <button class="btn btn-primary" data-save>Save name</button>
      </div>`,
    onMount: (root, close) => {
      const input = root.querySelector('#rename-input');
      setTimeout(() => input.focus(), 120);
      root.querySelector('[data-save]').addEventListener('click', () => {
        Actions.rename(id, input.value);
        close();
        toast('Name saved.', '✍️');
        App.refresh();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') root.querySelector('[data-save]').click();
      });
    },
  });
  return modal;
}
