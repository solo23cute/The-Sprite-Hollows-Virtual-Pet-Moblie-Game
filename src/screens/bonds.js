/* Bond Codex: every bond rank, its passive bonus, and every evolution path. */

function bondEffectBits(effect = {}) {
  const bits = [];
  if (effect.xp) bits.push(`+${Math.round((effect.xp - 1) * 100)}% XP`);
  if (effect.giftSpeed) bits.push(`gifts ${Math.round((effect.giftSpeed - 1) * 100)}% sooner`);
  if (effect.gameCoins) bits.push(`+${effect.gameCoins} game coin${effect.gameCoins === 1 ? '' : 's'}`);
  if (effect.decay) bits.push(`needs fade ${Math.round((1 - effect.decay) * 100)}% slower`);
  return bits.length ? bits.join(' · ') : 'No passive bonus yet';
}

function bondRankTable(s = null) {
  const current = s ? bondRankFor(s.bond || 0) : null;
  return BOND_RANKS.map((rank, index) => {
    const next = BOND_RANKS[index + 1];
    const active = current && current.key === rank.key;
    return `<div class="bond-rank-row ${active ? 'on' : ''}">
      <span class="bond-rank-icon">${rank.icon}</span>
      <span class="bond-rank-copy">
        <span class="between"><b>${esc(rank.name)}</b><span class="chip">${rank.min}${next ? `–${next.min - 1}` : '+'} bond</span></span>
        <span class="tiny muted">${esc(rank.blurb)}</span>
        <span class="tiny bond-effect">${esc(bondEffectBits(rank.effect))}</span>
      </span>
      ${active ? '<span class="bond-current">NOW</span>' : ''}
    </div>`;
  }).join('');
}

function bondEvolutionPath(s = null) {
  const currentIndex = s ? STAGE_ORDER.indexOf(s.stage) : -1;
  return `<div class="bond-stage-list">
    ${STAGE_ORDER.map((stage, index) => {
      const reached = currentIndex >= index;
      const current = s?.stage === stage;
      return `<div class="bond-stage-row ${reached ? 'reached' : ''} ${current ? 'on' : ''}">
        <span class="bond-stage-dot">${reached ? '✓' : index + 1}</span>
        <span><b>${STAGE_LABELS[stage]}</b><span class="tiny muted">Level ${STAGE_LEVEL[stage]}+</span></span>
        ${current ? '<span class="chip">CURRENT</span>' : ''}
      </div>`;
    }).join('')}
    <div class="bond-stage-row ${s?.level >= MAX_LEVEL ? 'reached on' : ''}">
      <span class="bond-stage-dot">${s?.level >= MAX_LEVEL ? '✓' : '★'}</span>
      <span><b>Level ${MAX_LEVEL.toLocaleString()} cap</b><span class="tiny muted">The end of the long road</span></span>
    </div>
  </div>`;
}

function bondDietTable(s = null) {
  const rows = Object.values(EVOLUTION_FORMS).map((form) => {
    const points = s?.diet?.[form.diet] || 0;
    const ready = s && s.level >= EVOLUTION_LEVEL && points >= EVOLUTION_AFFINITY && !s.form;
    return `<div class="bond-diet-row ${ready ? 'ready' : ''}">
      <span class="bond-rank-icon">${form.icon}</span>
      <span class="bond-rank-copy"><b>${esc(form.label)}</b><span class="tiny muted">${esc(DIET_PATHS[form.diet]?.label || form.diet)} · ${EVOLUTION_AFFINITY} points at level ${EVOLUTION_LEVEL}+</span><span class="tiny bond-effect">${esc(form.desc)}</span></span>
      <span class="chip">${s ? `${points}/${EVOLUTION_AFFINITY}` : `${EVOLUTION_AFFINITY} pts`}</span>
    </div>`;
  }).join('');
  return rows;
}

function bondWikiBody() {
  return `<p class="wiki-lede">Bond is the trust meter on every sprite. It rises from petting, belly rubs, feeding, games, trails, chats, baths, naps, and quiet time. The six ranks below are live: each one adds its passive bonus while that sprite is active.</p>
    <h3>All six bond ranks</h3>
    <div class="bond-rank-table">${bondRankTable()}</div>
    <h3>Bond &amp; evolution</h3>
    <p>Bond does not gate the four life stages. Stages follow level: <b>Baby 1, Juvenile 5, Sprite 10, Elder 20</b>. The level cap is now <b>${MAX_LEVEL.toLocaleString()}</b>. At level ${EVOLUTION_LEVEL}, a full diet path also unlocks a permanent Dragon, Fairy, Ghoul, or Titan form.</p>
    ${bondEvolutionPath()}
    <h3>Diet evolutions</h3>
    <div class="bond-diet-list">${bondDietTable()}</div>
    <h3>World evolution paths</h3>
    <p>All <b>${WORLD_EVOLUTION_TOTAL.toLocaleString()} type × form paths</b> are in the free atlas, covering all ${BIOME_KEYS.length} type biomes, every Hollow habitat, and every Secret Vault gene. Vault ownership is separate; the reference is free.</p>
    ${worldEvolutionFormSummaryHTML()}
    <button class="btn btn-soft btn-block" data-world-evo-open style="margin-top:9px">🧬 Open the free World Evolution Atlas</button>
    <p class="tiny muted">At 100 bond, the Heart Keeper secret joins the Vault. Bond also appears on every sprite card and detail sheet, so you can always see the next rank.</p>`;
}

function openBondCodex(opts = {}) {
  const sprite = findSprite(opts.spriteId) || activeSprite();
  const bond = sprite ? Math.round(sprite.bond || 0) : 0;
  const rank = bondRankFor(bond);
  const next = BOND_RANKS[BOND_RANKS.indexOf(rank) + 1] || null;
  const evo = sprite ? stageEvolutionInfo(sprite) : null;
  const progress = next ? Math.max(0, Math.min(100, ((bond - rank.min) / (next.min - rank.min)) * 100)) : 100;
  openSheet({
    title: '💞 Bond Codex',
    sub: 'Every bond rank, every passive bonus, and every way a sprite evolves.',
    body: `<div class="card bond-now-card">
        <div class="between"><span class="tiny muted" style="font-weight:800;letter-spacing:.08em">CURRENT BOND</span><span class="chip">${sprite ? `${esc(displayName(sprite))} · ${bond}/100` : 'No active sprite'}</span></div>
        <div class="bond-now-main"><span class="bond-now-icon">${rank.icon}</span><div><b>${esc(rank.name)}</b><p>${esc(rank.blurb)}</p><span class="tiny bond-effect">${esc(bondEffectBits(rank.effect))}</span></div></div>
        <div class="bar bond" style="margin-top:10px"><i style="width:${progress}%"></i></div>
        <div class="between tiny muted"><span>${sprite ? `${bond} bond` : 'Start caring for a sprite'}</span><span>${next ? `${next.name} at ${next.min}` : 'Maximum bond'}</span></div>
      </div>
      <h3>All six bond ranks</h3>
      <div class="bond-rank-table">${bondRankTable(sprite)}</div>
      <h3>Evolution stages</h3>
      ${sprite ? `<p class="tiny muted">${evo.final ? `${esc(displayName(sprite))} is an Elder. The four stages are complete; the long road now runs to level ${MAX_LEVEL.toLocaleString()}.` : `${esc(displayName(sprite))} reaches ${evo.nextLabel} at level ${evo.required} — ${evo.levelsLeft} level${evo.levelsLeft === 1 ? '' : 's'} to go.`}</p>` : '<p class="tiny muted">Pick an active sprite to see live stage progress.</p>'}
      ${bondEvolutionPath(sprite)}
      <h3>Diet evolutions</h3>
      <p class="tiny muted">Feeding builds Hearty, Sweet, Eerie, and Wild. At level ${EVOLUTION_LEVEL}, a path with ${EVOLUTION_AFFINITY} points unlocks its permanent form.</p>
      <div class="bond-diet-list">${bondDietTable(sprite)}</div>
      <h3>World evolution paths</h3>
      <p class="tiny muted">Every type, all four forms, every biome, and every Vault path. The atlas stays free even when the sprite does not.</p>
      ${worldEvolutionFormSummaryHTML()}
      <button class="btn btn-primary btn-block" data-bond-world-evo style="margin-top:10px">🧬 Open the free World Evolution Atlas</button>
      ${sprite ? `<button class="btn btn-soft btn-block" data-bond-evo style="margin-top:8px">View ${esc(displayName(sprite))}'s full evolution screen</button>` : ''}
      <p class="tiny muted" style="text-align:center;margin-top:10px">Bond rises from care, games, trails, chats, and sleep. The Heart Keeper secret unlocks at 100 bond.</p>`,
    onMount: (sheet, close) => {
      sheet.querySelector('[data-bond-world-evo]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openWorldEvolutionAtlas({ speciesKey: sprite?.element || 'all', form: sprite?.form || 'all' }), 160);
      });
      sheet.querySelector('[data-bond-evo]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openEvolutionForecast(sprite.id), 160);
      });
    },
  });
}
