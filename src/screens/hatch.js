/* Egg warming and hatch reveal. */

function openHatchFlow(spriteId, opts = {}) {
  let sprite = findSprite(spriteId);
  if (!sprite || sprite.stage !== 'egg') {
    toast('That egg is already hatched.', '🐣');
    return;
  }

  const { overlay, close } = buildOverlay(`<div class="modal" style="max-width:350px"></div>`, { center: true, dismissible: false });
  const modal = overlay.querySelector('.modal');
  let finished = false;
  let mythicRevealed = false;

  function render() {
    sprite = findSprite(spriteId) || sprite;
    const ready = sprite.hatch >= 100;
    const hatched = sprite.stage !== 'egg';
    if (hatched) {
      renderHatched();
      return;
    }
    if (sprite.eggLabel === 'Mythic Egg' && ready && !mythicRevealed) {
      renderMythicReveal();
      return;
    }
    modal.innerHTML = `
      <div class="between" style="align-items:flex-start;margin-bottom:2px">
        <div style="text-align:left">
          <div class="eyebrow">${opts.starter ? 'Your first friend' : 'In the nest'}</div>
          <h2 style="font-size:20px;margin-top:3px">${opts.starter ? 'Say hello to your egg' : esc(displayName(sprite))}</h2>
        </div>
        <button class="icon-btn" data-later aria-label="Close">${icon('close')}</button>
      </div>
      <div class="hatch-stage">
        <button class="egg-big" data-warm aria-label="Warm the egg" style="border:0;background:none;padding:0">
          ${eggSVG(sprite, { progress: sprite.hatch })}
        </button>
      </div>
      <div class="bar" style="height:9px"><i style="width:${sprite.hatch}%;background:linear-gradient(90deg,#ffd166,#ff9f43)"></i></div>
      <div class="hatch-hint">${ready
        ? 'Cracks are glowing. It’s ready!'
        : sprite.hatch > 0
          ? `Keep tapping the shell — ${Math.max(1, Math.ceil((100 - sprite.hatch) / 9))} more taps`
          : 'Tap the egg to warm it. Eggs hatch when they’re ready.'}</div>
      <button class="btn ${ready ? 'btn-gold' : 'btn-soft'} btn-block" data-hatch ${ready ? '' : 'disabled'} style="margin-top:12px">
        ${ready ? 'Hatch the egg' : `Warm · ${Math.round(sprite.hatch)}%`}
      </button>
      <button class="btn btn-ghost btn-block" data-later style="margin-top:8px">Later — keep it cozy</button>
    `;
    modal.querySelectorAll('[data-later]').forEach((b) => b.addEventListener('click', close));
    modal.querySelector('[data-warm]').addEventListener('click', warm);
    modal.querySelector('[data-hatch]').addEventListener('click', hatch);
  }

  function warm(ev) {
    if (sprite.hatch >= 100) {
      hatch();
      return;
    }
    const before = sprite.hatch;
    Actions.warmEgg(sprite.id);
    sprite = findSprite(sprite.id);
    Sfx.init();
    Sfx.pop();
    tapHaptic(10);
    const egg = modal.querySelector('.egg-big');
    if (egg) {
      egg.classList.remove('egg-shake');
      void egg.offsetWidth;
      egg.classList.add('egg-shake');
    }
    if (sprite.hatch >= 100 && before < 100) {
      Sfx.level();
      const r = modal.querySelector('.hatch-stage')?.getBoundingClientRect();
      if (r) burstAt(r.left + r.width / 2, r.top + r.height / 2, ['✨', '💛', '🌟'], 10);
      render();
      return;
    }
    render();
  }

  function renderMythicReveal() {
    const rarity = TYPE_EGG_RARITIES[typeEggRarity(sprite.element)];
    modal.innerHTML = `
      <div class="between" style="align-items:flex-start;margin-bottom:2px">
        <div style="text-align:left">
          <div class="eyebrow">Mythic egg</div>
          <h2 style="font-size:21px;margin-top:3px">Something ancient is stirring</h2>
        </div>
        <button class="icon-btn" data-later aria-label="Close">${icon('close')}</button>
      </div>
      <div class="hatch-stage mythic-stage">
        <div class="mythic-aura"></div>
        ${eggSVG(sprite, { progress: 100 })}
      </div>
      <div class="mythic-rarity" style="--rarity:${rarity.color}">✦ ${rarity.name} fate</div>
      <p class="hatch-hint">The shell is holding a ${rarity.name.toLowerCase()}-rarity legend. Reveal it before you break the shell.</p>
      <button class="btn btn-gold btn-block" data-reveal style="margin-top:12px">Reveal the mythic</button>
      <button class="btn btn-ghost btn-block" data-later style="margin-top:8px">Later — keep it sealed</button>
    `;
    modal.querySelectorAll('[data-later]').forEach((b) => b.addEventListener('click', close));
    modal.querySelector('[data-reveal]').addEventListener('click', () => {
      mythicRevealed = true;
      Sfx.init();
      Sfx.level();
      tapHaptic(18);
      playMythicRarityReveal();
    });
  }

  function playMythicRarityReveal() {
    const rarity = TYPE_EGG_RARITIES[typeEggRarity(sprite.element)];
    modal.innerHTML = `
      <div class="mythic-rarity-reveal" style="--rarity:${rarity.color}">
        <div class="mythic-rarity-rings"></div>
        <div class="mythic-rarity-word">${rarity.name}</div>
        <div class="mythic-rarity-sub">A ${rarity.name.toLowerCase()} legend answers</div>
      </div>`;
    const r = modal.getBoundingClientRect();
    burstAt(r.left + r.width / 2, r.top + r.height / 2, ['✨', '🌌', '🌟', '💫'], 24);
    setTimeout(() => {
      if (!document.body.contains(modal)) return;
      renderMythicType();
    }, 900);
  }

  function renderMythicType() {
    const s = findSprite(spriteId) || sprite;
    const type = typeName(s);
    const rarity = TYPE_EGG_RARITIES[typeEggRarity(s.element)];
    const power = GENE_POWERS[s.element];
    const finish = finishOf(s);
    modal.innerHTML = `
      <div class="eyebrow" style="text-align:center">Mythic reveal</div>
      <h2 style="font-size:25px;margin-top:4px;text-align:center">It’s ${article(type)} ${type}!</h2>
      <div class="hatch-stage mythic-stage">
        <div class="mythic-aura"></div>
        <div class="mythic-pop">${spriteSVG({ ...s, stage: 'adult' }, { expr: 'love' })}</div>
      </div>
      <div class="row" style="justify-content:center;flex-wrap:wrap;gap:5px">
        <span class="rarity-pill" style="--rarity:${rarity.color}">${rarity.name}</span>
        <span class="chip">${power.icon} ${esc(power.name)}</span>
        ${finish ? `<span class="chip chip-mut">${finish.icon} ${esc(finish.name)} finish</span>` : ''}
      </div>
      <p class="sub" style="text-align:center;margin-top:9px">${ELEMENTS[s.element].blurb}</p>
      <button class="btn btn-gold btn-block" data-break style="margin-top:14px">Break the shell</button>
      <button class="btn btn-ghost btn-block" data-later style="margin-top:8px">Later</button>
    `;
    modal.querySelectorAll('[data-later]').forEach((b) => b.addEventListener('click', close));
    modal.querySelector('[data-break]').addEventListener('click', hatch);
  }

  function hatch() {
    sprite = findSprite(spriteId) || sprite;
    if (sprite.hatch < 100 || sprite.stage !== 'egg') return;
    const res = Actions.hatchEgg(sprite.id);
    if (!res.ok) return;
    finished = true;
    sprite = res.sprite;
    renderHatched();
    const stage = modal.querySelector('.hatch-stage');
    if (stage) {
      const r = stage.getBoundingClientRect();
      burstAt(r.left + r.width / 2, r.top + r.height / 2, res.newShine ? ['✨', '🌟', '💎', '💛'] : ['🎉', '✨', '💛', '🌟'], res.newShine ? 22 : 14);
    }
    if (res.newShine) toast(`${displayName(res.sprite)} hatched shiny!`, '✨');
    Sfx.hatch();
    Sfx.spriteCry(res.sprite, { delay: 0.38 });
    tapHaptic(24);
  }

  function renderHatched() {
    const s = findSprite(spriteId) || sprite;
    const type = typeName(s);
    const finish = finishOf(s);
    const shiny = !!s.shiny;
    modal.innerHTML = `
      <div class="eyebrow" style="text-align:center">${opts.starter ? 'Welcome home' : shiny ? '✨ A shiny hatch!' : 'It hatched!'}</div>
      <h2 style="font-size:24px;margin-top:4px;text-align:center">${shiny ? `It’s a shiny ${type}!` : `It’s ${article(type)} ${type}!`}</h2>
      <div class="hatch-stage">
        <div class="hatched">${spriteSVG(s, { expr: 'happy' })}</div>
      </div>
      <div class="row" style="justify-content:center;flex-wrap:wrap;gap:5px">
        <span class="chip">${BREEDS[s.breed]?.name || 'Puff'} breed</span>
        <span class="chip gender-chip" style="color:${genderOf(s).color}">${genderOf(s).symbol} ${esc(genderOf(s).name)}</span>
        <span class="chip">${PERSONALITIES[s.personality]?.name || 'Sunny'} soul</span>
        <span class="chip">${PATTERNS[s.pattern]?.name || 'Plain'}</span>
        <span class="chip">${SIZES[s.size]?.name || 'Standard'} size</span>
        ${shiny ? '<span class="chip chip-shine">✨ Shiny</span>' : ''}
        ${finish ? `<span class="chip chip-mut">${finish.icon} ${esc(finish.name)} finish</span>` : ''}
        ${s.special ? `<span class="chip chip-mut">✦ ${esc(COMBOS.find((c) => c.id === s.special)?.name || 'Special combo')}</span>` : s.mutation ? `<span class="chip chip-mut">✦ ${esc(s.mutation)}</span>` : ''}
      </div>
      <p class="sub" style="text-align:center;margin-top:9px">${ELEMENTS[s.element].blurb}</p>
      <div class="row" style="gap:7px;margin-top:14px">
        <input id="hatch-name" maxlength="16" value="${esc(s.name || '')}" placeholder="Name your sprite" style="flex:1;min-width:0;padding:12px 14px;border-radius:13px;background:rgba(255,255,255,.07);border:1px solid var(--line);color:var(--text);outline:none;font-size:14px;font-weight:800">
        <button class="icon-btn" data-reroll aria-label="Random name" style="width:43px;height:43px;border-radius:13px">${icon('dice')}</button>
      </div>
      <button class="btn btn-gold btn-block" data-adopt style="margin-top:12px">Adopt ${esc(s.name || 'sprite')}</button>
      <button class="btn btn-ghost btn-block" data-later style="margin-top:8px">Later</button>
    `;
    modal.querySelector('[data-later]').addEventListener('click', () => {
      close();
      if (opts.onDone) opts.onDone(s);
      else App.go('hollow');
    });
    modal.querySelector('[data-reroll]').addEventListener('click', () => {
      modal.querySelector('#hatch-name').value = makeName(s.element);
      Sfx.pop();
    });
    modal.querySelector('[data-adopt]').addEventListener('click', () => {
      const name = modal.querySelector('#hatch-name').value;
      Actions.rename(s.id, name);
      Sfx.win();
      close();
      toast(`${esc(displayName(findSprite(s.id)))} joined the Hollow!`, '🎉');
      if (opts.onDone) opts.onDone(findSprite(s.id));
      else App.go('hollow');
    });
    const input = modal.querySelector('#hatch-name');
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') modal.querySelector('[data-adopt]').click();
    });
  }

  render();
  return { close, overlay };
}
