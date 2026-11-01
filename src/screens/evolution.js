/* Evolution theatre: a transformation sequence that plays while a sprite evolves,
   then reveals the new age tier or permanent diet form. */

const EVO_STAGE_ICONS = { baby: '🐣', juvenile: '🌱', sprite: '✨', elder: '🌳', ancient: '🗿', sensei: '🥋' };

const EVO_PHASES = [
  'Gathering pixie dust…',
  'Folding new wings…',
  'Reshaping the silhouette…',
  'Settling the new form…',
];

let evoBusy = false;
const evoQueue = [];

function stageBonusLine(stage) {
  return {
    baby: 'A brand-new Hollow resident.',
    juvenile: 'Grown enough to explore the Hollow on their own.',
    sprite: 'Old enough to show their true colours and patterns.',
    elder: 'A steady elder: bigger art, calmer needs, and a wiser bond.',
    ancient: 'An ancient form: rarer sparkle and stronger presence.',
    sensei: 'A Sensei — the final age tier at level 1,000. Retirement unlocks at Elder level 100.',
  }[stage] || 'A new stage begins.';
}

function evolutionLadderHTML(current) {
  return `<div class="evo-pop-ladder">${STAGE_ORDER.map((stage) => {
    const index = STAGE_ORDER.indexOf(stage);
    const currentIndex = STAGE_ORDER.indexOf(current);
    const reached = currentIndex >= index;
    return `<div class="evo-pop-step ${reached ? 'reached' : ''} ${stage === current ? 'on' : ''}">
      <span class="evo-pop-ico">${EVO_STAGE_ICONS[stage] || '✨'}</span>
      <b>${STAGE_LABELS[stage]}</b>
      <span class="tiny muted">Lv ${STAGE_LEVEL[stage]}+</span>
    </div>`;
  }).join('')}</div>`;
}

function nextStageHint(s) {
  const info = stageEvolutionInfo(s);
  if (info.egg) return 'Warm the egg to meet your sprite.';
  if (info.final) return `This is the final age tier. Keep growing toward level ${MAX_LEVEL.toLocaleString()} and retire whenever you like.`;
  return `Next up: <b>${info.nextLabel}</b> at level ${info.required} — ${info.levelsLeft} level${info.levelsLeft === 1 ? '' : 's'} to go.`;
}

function stageResultHTML(s, to) {
  const el = ELEMENTS[s.element] || ELEMENTS.bloom;
  const toLabel = STAGE_LABELS[to] || 'Sprite';
  return `<div class="evo-result-head">
      <span class="evo-result-kicker">Evolution complete</span>
      <h2>${esc(displayName(s))} is now a <b>${esc(toLabel)}</b>.</h2>
      <p class="sub">${esc(stageBonusLine(to))}</p>
    </div>
    <div class="evo-pop">
      <div class="evo-pop-art" style="--evo-glow:${el.primary}">
        <span class="evo-pop-burst">✨</span>
        ${spriteSVG(s, { expr: 'happy' })}
      </div>
      <div class="evo-pop-copy">
        <div class="row" style="flex-wrap:wrap;justify-content:center;gap:5px">
          <span class="chip">${EVO_STAGE_ICONS[to] || '✨'} ${esc(toLabel)}</span>
          <span class="chip">Level ${s.level}</span>
          <span class="chip">${esc(typeName(s))}</span>
        </div>
      </div>
      ${evolutionLadderHTML(to)}
      <div class="evo-pop-note">${nextStageHint(s)}</div>
      <button class="btn btn-primary btn-block" data-evo-pop-ok style="margin-top:12px">Keep growing</button>
    </div>`;
}

function formResultHTML(sprite, form) {
  const el = ELEMENTS[sprite.element] || ELEMENTS.bloom;
  const power = form.power || { icon: '🧬', name: 'New form', desc: 'A permanent new shape.' };
  return `<div class="evo-result-head">
      <span class="evo-result-kicker">Evolution complete</span>
      <h2>${form.icon || '🧬'} ${esc(formName(sprite))}</h2>
      <p class="sub">${esc(form.desc)}</p>
    </div>
    <div class="evo-pop">
      <div class="evo-pop-art" style="--evo-glow:${el.primary}">
        <span class="evo-pop-burst">🧬</span>
        ${spriteSVG(sprite, { expr: 'happy' })}
      </div>
      <div class="evo-pop-copy">
        <div class="row" style="flex-wrap:wrap;justify-content:center;gap:5px">
          <span class="chip">${power.icon} ${esc(power.name)}</span>
          <span class="chip">${esc(power.desc)}</span>
          <span class="chip">Permanent</span>
        </div>
      </div>
      <button class="btn btn-primary btn-block" data-evo-pop-ok style="margin-top:12px">Amazing</button>
    </div>`;
}

/* The transformation itself: a progress screen with the old silhouette morphing
   into the new one, then the result panel in the same overlay. */
function runEvolutionSequence(opts) {
  const isStage = opts.kind === 'stage';
  const s = isStage ? findSprite(opts.spriteId) : (opts.sprite || findSprite(opts.spriteId));
  if (!s) {
    evoBusy = false;
    evoDrain();
    return;
  }
  const el = ELEMENTS[s.element] || ELEMENTS.bloom;
  const fromStage = isStage ? (opts.from || s.stage) : s.stage;
  const toStage = isStage ? (opts.to || s.stage) : s.stage;
  const fromLabel = STAGE_LABELS[fromStage] || 'Egg';
  const toLabel = isStage ? (STAGE_LABELS[toStage] || 'Sprite') : (formName(s) || 'New form');
  const before = isStage ? { ...s, stage: fromStage } : { ...s, form: null };
  const after = isStage ? { ...s, stage: toStage } : s;
  const fast = document.body.classList.contains('reduce-motion');
  const duration = fast ? 420 : 2400;

  const inner = `<div class="evo-seq" style="--evo-glow:${el.primary}">
    <div class="evo-seq-kicker">Evolution in progress</div>
    <div class="evo-seq-art">
      <span class="evo-seq-ring"></span>
      <span class="evo-seq-old" data-evo-old>${spriteSVG(before, { expr: 'idle' })}</span>
      <span class="evo-seq-new" data-evo-new>${spriteSVG(after, { expr: 'happy' })}</span>
    </div>
    <h2 class="evo-seq-title">${esc(displayName(s))}</h2>
    <div class="evo-seq-sub">${esc(fromLabel)} → <b>${esc(toLabel)}</b></div>
    <div class="evo-seq-bar"><i data-evo-fill></i></div>
    <div class="evo-seq-phase"><span data-evo-phase>${esc(EVO_PHASES[0])}</span><b data-evo-pct>0%</b></div>
    <button class="btn btn-ghost btn-block" data-evo-skip style="margin-top:10px">Skip animation</button>
  </div>`;

  const { overlay, close } = buildOverlay(inner, {
    center: true,
    dismissible: false,
    onClose: () => {
      evoBusy = false;
      setTimeout(evoDrain, 140);
    },
  });
  const box = overlay.querySelector('.evo-seq');
  const fill = overlay.querySelector('[data-evo-fill]');
  const pctEl = overlay.querySelector('[data-evo-pct]');
  const phaseEl = overlay.querySelector('[data-evo-phase]');
  const start = Date.now();
  let timer = null;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (timer) clearTimeout(timer);
    if (!box) return close();
    box.classList.add('is-result');
    box.innerHTML = isStage ? stageResultHTML(s, toStage) : formResultHTML(s, opts.form);
    box.querySelector('[data-evo-pop-ok]')?.addEventListener('click', () => {
      close();
      if (typeof App !== 'undefined') App.refresh();
    });
    if (typeof Sfx !== 'undefined' && Sfx.win) Sfx.win();
  };

  const step = () => {
    if (finished) return;
    const t = Math.min(1, (Date.now() - start) / duration);
    if (fill) fill.style.width = `${Math.round(t * 100)}%`;
    if (pctEl) pctEl.textContent = `${Math.round(t * 100)}%`;
    if (phaseEl) phaseEl.textContent = EVO_PHASES[Math.min(EVO_PHASES.length - 1, Math.floor(t * EVO_PHASES.length))];
    if (box && t > 0.45) box.classList.add('is-morph');
    if (t >= 1) return finish();
    timer = setTimeout(step, 45);
  };

  overlay.querySelector('[data-evo-skip]')?.addEventListener('click', finish);
  timer = setTimeout(step, 45);
}

function evoDrain() {
  const next = evoQueue.shift();
  if (next) playEvolution(next);
}

function playEvolution(opts) {
  if (typeof buildOverlay !== 'function' || !document.getElementById('portal')) return;
  if (evoBusy) {
    evoQueue.push(opts);
    return;
  }
  evoBusy = true;
  try {
    runEvolutionSequence(opts);
  } catch (err) {
    evoBusy = false;
    console.error(err);
    evoDrain();
  }
}

function celebrateStageEvolution({ spriteId, from, to }) {
  playEvolution({ kind: 'stage', spriteId, from, to });
}

function celebrateFormEvolution(sprite, form) {
  if (!sprite || !form) return;
  playEvolution({ kind: 'form', spriteId: sprite.id, form });
}

/* Called by growth helpers when a level-up crosses a stage threshold. */
function announceStageEvolution(s, fromStage, toStage) {
  if (!s || fromStage === toStage) return;
  try {
    setTimeout(() => celebrateStageEvolution({ spriteId: s.id, from: fromStage, to: toStage }), 260);
  } catch (err) { /* celebrations are cosmetic; never break growth */ }
}
