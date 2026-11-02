/* The Hollow: a living room for your whole collection. */

function buildSceneDecor(scene) {
  const el = (cls, style = '') => `<span class="${cls}" style="${style}"></span>`;
  const sceneMeta = SCENES[scene];
  if (sceneMeta?.custom) {
    const motes = Array.from({ length: 12 }, (_, i) => `<span class="biome-mote" style="left:${rand(4, 96)}%;top:${rand(18, 80)}%;animation-delay:${rand(0, 5)}s;color:${sceneMeta.accent}">${sceneMeta.emoji}</span>`).join('');
    return `<span class="sun" style="background:radial-gradient(circle, #fff8dc, ${sceneMeta.accent} 62%, transparent 72%);box-shadow:0 0 54px ${sceneMeta.accent}77"></span>
      <span class="hill h1" style="background:${sceneMeta.sky};opacity:.8"></span>
      <span class="hill h2" style="background:${sceneMeta.accent};opacity:.35"></span>
      <span class="ground" style="background:radial-gradient(120% 100% at 50% 0%, ${sceneMeta.ground}, ${sceneMeta.sky} 90%)"></span>
      ${motes}`;
  }
  if (sceneMeta?.biome) {
    const tint = sceneTint(scene);
    const palette = PDX_TYPES[sceneMeta.type] || { light: tint.b3, primary: tint.b1, deep: tint.b2 };
    const motes = Array.from({ length: 12 }, () => `<span class="biome-mote" style="left:${rand(4, 96)}%;top:${rand(18, 78)}%;animation-delay:${rand(0, 5)}s;color:${palette.light}">${sceneMeta.emoji}</span>`).join('');
    return `<span class="sun" style="background:radial-gradient(circle, ${palette.light}, ${palette.primary} 62%, transparent 72%);box-shadow:0 0 54px ${palette.primary}77"></span>
      <span class="hill h1" style="background:${palette.deep};opacity:.7"></span><span class="hill h2" style="background:${palette.primary};opacity:.45"></span><span class="ground" style="background:${palette.deep}"></span>
      ${motes}`;
  }
  if (sceneMeta?.exoticBiome || sceneMeta?.gtaBiome || sceneMeta?.extraBiome) {
    const tint = sceneTint(scene);
    const motes = Array.from({ length: 12 }, () => `<span class="biome-mote" style="left:${rand(4, 96)}%;top:${rand(18, 78)}%;animation-delay:${rand(0, 5)}s;color:${tint.b3}">${sceneMeta.emoji}</span>`).join('');
    return `<span class="sun" style="background:radial-gradient(circle, ${tint.b3}, ${tint.b1} 62%, transparent 72%);box-shadow:0 0 54px ${tint.b1}77"></span>
      <span class="hill h1" style="background:${tint.b2};opacity:.75"></span><span class="hill h2" style="background:${tint.b1};opacity:.5"></span><span class="ground" style="background:${tint.b2}"></span>
      ${motes}${typeof buildBiomeExtras === 'function' ? buildBiomeExtras(scene) : ''}`;
  }
  if (scene === 'night' || scene === 'neon') {
    const stars = Array.from({ length: 16 }, () => el('star', `left:${rand(3, 97)}%;top:${rand(4, 48)}%;animation-delay:${rand(0, 4)}s;opacity:${rand(0.3, 0.9)}`)).join('');
    return `${el('sun')}${stars}<span class="hill h1"></span><span class="hill h2"></span><span class="ground"></span>
      ${scene === 'neon' ? '<span class="grid-floor"></span>' : ''}
      ${Array.from({ length: 5 }, () => el('firefly', `left:${rand(6, 94)}%;top:${rand(40, 88)}%;animation-delay:${rand(0, 4)}s`)).join('')}`;
  }
  if (scene === 'aurora') {
    const stars = Array.from({ length: 20 }, () => el('star', `left:${rand(3, 97)}%;top:${rand(3, 50)}%;animation-delay:${rand(0, 4)}s;opacity:${rand(0.3, 0.9)}`)).join('');
    return `${el('sun')}${stars}
      <span class="aurora-ribbon a1"></span><span class="aurora-ribbon a2"></span>
      <span class="hill h1" style="background:#4f7fa3;opacity:.65"></span><span class="hill h2" style="background:#6d8fb5;opacity:.5"></span><span class="ground"></span>
      ${Array.from({ length: 5 }, () => el('firefly', `left:${rand(6, 94)}%;top:${rand(42, 84)}%;animation-delay:${rand(0, 4)}s`)).join('')}`;
  }
  if (scene === 'crystal') {
    const shards = Array.from({ length: 8 }, (_, i) => `<span class="crystal-shard" style="left:${8 + i * 12}%;bottom:${8 + rand(0, 8)}%;height:${rand(18, 52)}px;animation-delay:${rand(0, 3)}s"></span>`).join('');
    return `${el('sun')}<span class="hill h1" style="background:#4b3b70;opacity:.7"></span><span class="hill h2" style="background:#3d315f;opacity:.6"></span><span class="ground"></span>
      ${shards}
      ${Array.from({ length: 8 }, () => el('firefly', `left:${rand(5, 95)}%;top:${rand(30, 80)}%;animation-delay:${rand(0, 4)}s`)).join('')}`;
  }
  if (scene === 'ember') {
    const sparks = Array.from({ length: 14 }, () => el('ember-spark', `left:${rand(4, 96)}%;bottom:${rand(8, 46)}%;animation-delay:${rand(-4, 0)}s;animation-duration:${rand(2.4, 5)}s`)).join('');
    return `${el('sun')}<span class="hill h1" style="background:#5a241e;opacity:.8"></span><span class="hill h2" style="background:#43191a;opacity:.7"></span><span class="ground"></span>${sparks}`;
  }
  if (scene === 'sugar') {
    const candies = Array.from({ length: 12 }, (_, i) => el('candy-dot', `left:${5 + i * 8}%;bottom:${rand(8, 30)}%;width:${rand(8, 16)}px;height:${rand(8, 16)}px;background:${['#ff8fb2', '#8fe07a', '#ffd166', '#8be9ff'][i % 4]};animation-delay:${rand(0, 3)}s`)).join('');
    return `${el('sun')}<span class="hill h1" style="background:#f4a6c8;opacity:.8"></span><span class="hill h2" style="background:#d98bb5;opacity:.7"></span><span class="ground"></span>${candies}`;
  }
  if (scene === 'dream') {
    const clouds = Array.from({ length: 5 }, () => el('dream-puff', `left:${rand(4, 86)}%;top:${rand(20, 52)}%;width:${rand(38, 78)}px;opacity:${rand(0.18, 0.38)};animation-delay:${rand(-8, 0)}s`)).join('');
    const stars = Array.from({ length: 10 }, () => el('star', `left:${rand(4, 96)}%;top:${rand(6, 36)}%;animation-delay:${rand(0, 4)}s`)).join('');
    return `${el('sun')}${stars}${clouds}<span class="hill h1" style="background:#5b4d9c;opacity:.65"></span><span class="hill h2" style="background:#43397e;opacity:.6"></span><span class="ground"></span>`;
  }
  if (scene === 'tide') {
    return `${el('sun')}<span class="hill h1" style="background:#7fc7a3;opacity:.5"></span><span class="hill h2" style="background:#6bb69a;opacity:.4"></span>
      <span class="wave" style="top:52%;animation:floaty 5s ease-in-out infinite"></span>
      <span class="wave" style="top:57%;opacity:.6"></span>
      <span class="ground"></span>
      <span class="mushroom" style="left:12%;bottom:10%;background:#ffd6a5"></span>
      <span class="mushroom" style="left:80%;bottom:16%;width:12px;height:10px;background:#ffb3d9"></span>
      <span class="firefly" style="left:70%;top:44%"></span>`;
  }
  return `${el('sun')}<span class="hill h1"></span><span class="hill h2"></span><span class="ground"></span>
    ${Array.from({ length: 6 }, () => el('firefly', `left:${rand(5, 95)}%;top:${rand(40, 84)}%;animation-delay:${rand(0, 4)}s`)).join('')}
    <span class="mushroom" style="left:9%;bottom:9%"></span>
    <span class="mushroom" style="left:84%;bottom:14%;background:#ffd166"></span>
    <span class="mushroom" style="left:72%;bottom:6%;width:11px;height:9px;background:#b79cff"></span>`;
}

/* Weather particles layered over the scene, under the sprites. */
function buildWeatherFx(key) {
  const span = (cls, style, text = '') => `<span class="${cls}" style="${style}">${text}</span>`;
  if (key === 'snow') {
    return Array.from({ length: 30 }, () => span('flake', `left:${rand(0, 100)}%;width:${rand(2, 5)}px;height:${rand(2, 5)}px;animation-duration:${rand(6, 12)}s;animation-delay:${rand(-12, 0)}s;--drift:${rand(-28, 28)}px;opacity:${rand(0.45, 0.95)}`)).join('');
  }
  if (key === 'rain' || key === 'storm') {
    const drops = Array.from({ length: 26 }, () => span('raindrop', `left:${rand(0, 100)}%;animation-duration:${rand(0.55, 1.1)}s;animation-delay:${rand(-1.2, 0)}s;opacity:${rand(0.35, 0.75)}`)).join('');
    return drops + (key === 'storm' ? '<span class="storm-flash"></span>' : '');
  }
  if (key === 'petals') {
    return Array.from({ length: 14 }, () => span('petal', `left:${rand(0, 100)}%;animation-duration:${rand(7, 13)}s;animation-delay:${rand(-13, 0)}s;--drift:${rand(-50, 50)}px`, '🌸')).join('');
  }
  if (key === 'leaves') {
    return Array.from({ length: 14 }, () => span('petal leaf', `left:${rand(0, 100)}%;animation-duration:${rand(7, 14)}s;animation-delay:${rand(-14, 0)}s;--drift:${rand(-60, 60)}px`, '🍂')).join('');
  }
  if (key === 'fog') {
    return Array.from({ length: 5 }, () => span('fog-band', `top:${rand(20, 72)}%;animation-duration:${rand(16, 28)}s;animation-delay:${rand(-20, 0)}s;opacity:${rand(0.22, 0.5)}`)).join('');
  }
  if (key === 'heat') {
    return span('sun-haze', '') + Array.from({ length: 4 }, () => span('heat-band', `top:${rand(30, 80)}%;animation-delay:${rand(0, 4)}s`)).join('');
  }
  if (key === 'frost') {
    return Array.from({ length: 12 }, () => span('frost-spark', `left:${rand(4, 96)}%;top:${rand(40, 92)}%;animation-delay:${rand(0, 3)}s`)).join('');
  }
  if (key === 'breeze') {
    return Array.from({ length: 10 }, () => span('breeze-dot', `left:${rand(0, 100)}%;top:${rand(20, 80)}%;animation-delay:${rand(0, 5)}s;animation-duration:${rand(4, 8)}s`)).join('');
  }
  return '';
}

function openWeatherSheet() {
  const selected = state.world?.weather || 'auto';
  const wx = currentWeather();
  const options = [
    `<button class="style-opt ${selected === 'auto' ? 'on' : ''}" data-weather-key="auto"><span class="sw acc">🔄</span>Auto</button>`,
    ...WEATHER_KEYS.map((key) => {
      const weather = WEATHERS[key];
      return `<button class="style-opt ${selected === key ? 'on' : ''}" data-weather-key="${key}"><span class="sw acc">${weather.icon}</span>${weather.name}</button>`;
    }),
  ].join('');
  const { close } = openSheet({
    title: 'Hollow weather',
    sub: 'Change the sky for free. Auto follows the real season and climate.',
    body: `<div class="style-picker weather-picker">${options}</div>
      <div class="card" style="padding:11px;margin-top:10px;font-size:11px;line-height:1.55;color:var(--muted)">
        <b style="color:var(--text)">${wx.icon} ${wx.name}</b> — ${wx.blurb}
        <div class="tiny" style="margin-top:5px">Manual weather overrides each biome's local ambience until you choose Auto.</div>
      </div>`,
    onMount: (root) => {
      root.querySelectorAll('[data-weather-key]').forEach((button) => {
        button.addEventListener('click', () => {
          const key = button.dataset.weatherKey;
          Actions.setWeather(key === 'auto' ? null : key);
          Sfx.click();
          close();
          toast(key === 'auto' ? 'Weather is following the season again.' : `${WEATHERS[key].icon} ${WEATHERS[key].name} — the Hollow sky changes now.`, key === 'auto' ? '🔄' : WEATHERS[key].icon);
          if (typeof App !== 'undefined' && App.refresh) App.refresh();
        });
      });
    },
  });
}

function spriteSize(stage, size = 'standard') {
  const base = { baby: 132, juvenile: 146, sprite: 160, youngadult: 166, midadult: 170, highadult: 172, elder: 174, ancient: 184, sensei: 192 }[stage] || 132;
  return Math.round(base * (SIZES[size]?.scale || 1));
}

function hollowScreen(root) {
  ensureDaily();
  const active = activeSprite();
  const outside = (typeof hollowSprites === 'function' ? hollowSprites() : grownSprites())
    .filter((s) => s.stage !== 'egg' && !s.retired && !s.atHome);
  const s0 = active && active.stage !== 'egg' && !active.retired && !active.atHome ? active : outside[0];
  const atHomeCount = state.sprites.filter((s) => s.stage !== 'egg' && s.atHome).length;

  if (!s0) {
    const homeCopy = atHomeCount ? 'Everyone is home' : 'Your Hollow is quiet';
    const bodyCopy = atHomeCount
      ? `${atHomeCount} sprite${atHomeCount === 1 ? ' is' : 's are'} resting in their own biome. Call someone back, or visit a room to spend time together.`
      : 'Hatch your first egg in the Nest, then come back and say hello.';
    root.innerHTML = `<div class="screen-head"><div><div class="eyebrow">Your hollow</div><h1>${esc(state.hollowName)}</h1></div></div>
      <div class="card empty-state">
        <div style="font-size:38px">${atHomeCount ? '🏡' : '🥚'}</div>
        <h3 style="font-size:16px;margin:8px 0 4px">${homeCopy}</h3>
        <p>${bodyCopy}</p>
        <div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap;margin-top:14px">
          ${atHomeCount ? '<button class="btn btn-primary" data-go-homes>Open Homes</button>' : ''}
          <button class="btn ${atHomeCount ? 'btn-soft' : 'btn-primary'}" data-go-nest>${atHomeCount ? 'Visit the Nest' : 'Go to the Nest'}</button>
        </div>
      </div>`;
    root.querySelector('[data-go-nest]').onclick = () => App.go('nest');
    root.querySelector('[data-go-homes]')?.addEventListener('click', () => { Sfx.click(); openHomesSheet(); });
    return () => {};
  }

  const hab0 = habitatFor(s0);

  const activeScene = SCENES[state.theme.scene] || SCENES.grove;
  const customSceneStyle = activeScene.custom
    ? ` style="background:linear-gradient(180deg, ${activeScene.sky} 0%, ${activeScene.sky} 55%, ${activeScene.ground} 56%, ${activeScene.ground} 100%)"`
    : '';

  root.innerHTML = `
    <div class="hollow-top">
      <div class="hollow-id">
        <div class="avatar-chip" data-avatar>${spriteSVG(s0, { expr: expressionFor(s0) })}</div>
        <div style="min-width:0;flex:1">
          <h2><span data-name>${esc(displayName(s0))}</span><span data-mood>${moodChip(s0)}</span></h2>
          <div class="meta" data-meta>${spriteSubtitle(s0)} · Lv ${s0.level}${s0.level >= MAX_LEVEL ? ' · MAX' : ''}</div>
        </div>
        <button class="icon-btn" data-open-detail aria-label="Sprite details">${icon('chevron')}</button>
      </div>
      <div class="hollow-quick">
        <button class="chip" type="button" data-world title="Season and climate">${seasonOf().icon} ${esc(seasonLabel(seasonOf(), state.world?.climate))} · ${esc(CLIMATES[state.world?.climate]?.name || 'Temperate')}</button>
        <button class="chip weather-chip" type="button" data-weather title="Change the Hollow weather">${currentWeather().icon} ${currentWeather().name} · change</button>
        <button class="chip habitat-chip" type="button" data-habitat title="${esc(hab0.scene.habitat)} habitat — ${hab0.scene.name}">${hab0.scene.emoji} ${esc(hab0.scene.habitat)} · +${hab0.percent}% XP</button>
        <button class="chip" type="button" data-warm title="Warm clothes" hidden></button>
        <span class="chip" data-phase>${timePhase().icon} ${timePhase().label}</span>
        <span class="chip" data-size-chip>${SIZES[s0.size]?.name || 'Standard'} ${formName(s0) ? `· ${esc(formName(s0))}` : ''}</span>
        <button class="chip bedroom-chip" type="button" data-bedroom>🛏️ Bedroom</button>
        <button class="chip homes-chip" type="button" data-homes title="Every sprite in its own biome window">🪟 Homes${atHomeCount ? ` · ${atHomeCount} home` : ''}</button>
        <button class="chip" type="button" data-senthome-link title="Visit the room where sprites rest and earn">🏠 Home</button>
        <button class="chip guardians-chip" type="button" data-guardians-link title="Every biome has guardians — challenge as many as you like">⚔️ Guardians</button>
        <button class="chip duel-chip" type="button" data-duel-link title="Spar with another sprite in your Hollow">⚔️ Duel</button>
        <button class="chip gift-chip" data-gift-chip>🎁 Gift</button>
      </div>
      ${typeof questTrackHtml === 'function' ? questTrackHtml() : ''}
      <div class="needs-strip" data-needs>
        ${['hunger', 'energy', 'joy', 'clean'].map((k) => `<div class="need"><div class="need-label"><span>${k === 'hunger' ? 'Food' : k === 'energy' ? 'Rest' : k === 'joy' ? 'Joy' : 'Clean'}</span><b data-need-val="${k}">0</b></div><div class="bar ${k}"><i data-need-bar="${k}" style="width:0%"></i></div></div>`).join('')}
      </div>
    </div>
    <div class="stage-wrap">
      <div class="stage scene-${state.theme.scene} phase-${timePhase().key} season-${seasonOf().key} weather-${currentWeather().key}"${customSceneStyle} data-stage>
        <div class="sky-orb" data-sky>${timePhase().key === 'night' ? '🌙' : timePhase().key === 'day' ? '☀️' : timePhase().key === 'dawn' ? '🌅' : '🌇'}</div>
        <div class="season-wash"></div>
        <div class="time-tint"></div>
        <div class="scene-decor" data-decor>${buildSceneDecor(state.theme.scene)}</div>
        <div class="weather-fx" data-weather-fx></div>
        <div data-actors></div>
        <div class="hollow-hint">Tap a sprite to pet · hold still and they’ll come say hi</div>
      </div>
      <div class="whisper">${icon('sparkle')}<span data-whisper>${esc(idleLine(s0))}</span></div>
    </div>
    <div class="care-dock" role="group" aria-label="Care and play actions" tabindex="0">
      <div class="dock-group">
        <span class="dock-label">Care</span>
        <div class="dock-row">
          <button class="care-btn feed" data-care="feed"><span class="cb-ico">${icon('food')}</span><span class="cb-label">Feed</span></button>
          <button class="care-btn care-rub" data-care="rub"><span class="cb-ico">🤲</span><span class="cb-label">Rub Belly</span></button>
          <button class="care-btn bath" data-care="bath"><span class="cb-ico">${icon('bath')}</span><span class="cb-label">Bath</span></button>
          <button class="care-btn nap" data-care="nap"><span class="cb-ico">${icon('moon')}</span><span class="cb-label" data-nap-label>Nap</span></button>
          <button class="care-btn care-bed" data-care="bed"><span class="cb-ico">🛏️</span><span class="cb-label">Bed</span></button>
        </div>
      </div>
      <div class="dock-group">
        <span class="dock-label">Play &amp; social</span>
        <div class="dock-row">
          <button class="care-btn play" data-care="play"><span class="cb-ico">${icon('play')}</span><span class="cb-label">Play</span></button>
          <button class="care-btn walk" data-care="walk"><span class="cb-ico">🥾</span><span class="cb-label">Walk</span></button>
          <button class="care-btn care-throw" data-care="throw"><span class="cb-ico">🎾</span><span class="cb-label">Throw Ball</span></button>
          <button class="care-btn care-catch" data-care="catch"><span class="cb-ico">🧤</span><span class="cb-label">Play Catch</span></button>
          <button class="care-btn chat" data-care="chat"><span class="cb-ico">${icon('chat')}</span><span class="cb-label">Talk</span></button>
        </div>
      </div>
    </div>`;

  root.querySelector('[data-world]')?.addEventListener('click', () => { Sfx.click(); openStudioSheet(); });
  root.querySelector('[data-weather]')?.addEventListener('click', () => { Sfx.click(); openWeatherSheet(); });
  root.querySelector('[data-habitat]')?.addEventListener('click', () => { Sfx.click(); openStudioSheet(); });
  root.querySelector('[data-warm]')?.addEventListener('click', () => { Sfx.click(); openStudioSheet(); });
  root.querySelector('[data-bedroom]')?.addEventListener('click', () => { Sfx.click(); openBedroomSheet(); });
  root.querySelector('[data-homes]')?.addEventListener('click', () => { Sfx.click(); openHomesSheet(); });
  root.querySelector('[data-senthome-link]')?.addEventListener('click', () => { Sfx.click(); App.go('senthome'); });
  root.querySelector('[data-quest-tracker]')?.addEventListener('click', () => { Sfx.click(); if (typeof openDistrictQuests === 'function') openDistrictQuests(); });
  root.querySelector('[data-guardians-link]')?.addEventListener('click', () => { Sfx.click(); if (typeof openGuardianGallery === 'function') openGuardianGallery(); });
  root.querySelector('[data-duel-link]')?.addEventListener('click', () => { Sfx.click(); if (typeof openHollowDuelGame === 'function') openHollowDuelGame(); });

  const stageEl = root.querySelector('[data-stage]');
  if (stageEl && sceneUsesTint(state.theme.scene) && !SCENES[state.theme.scene]?.custom) {
    const tint = sceneTint(state.theme.scene);
    stageEl.style.background = `linear-gradient(180deg, ${tint.b2} 0%, ${tint.b1} 58%, ${tint.b2} 100%)`;
  }
  const decorEl = root.querySelector('[data-decor]');
  const actorsEl = root.querySelector('[data-actors]');
  const whisperEl = root.querySelector('[data-whisper]');
  const avatarEl = root.querySelector('[data-avatar]');
  const actors = new Map();
  let rosterSignature = '';
  let visualSignatures = new Map();
  let lastWhisper = 0;

  const setWhisper = (text) => {
    whisperEl.textContent = text;
    lastWhisper = Date.now();
  };

  function roster() {
    const all = (typeof hollowSprites === 'function' ? hollowSprites() : grownSprites())
      .filter((s) => s.stage !== 'egg' && !s.retired && !s.atHome);
    const current = activeSprite();
    const list = current && all.some((s) => s.id === current.id)
      ? [current, ...all.filter((s) => s.id !== current.id)]
      : all.slice();
    /* Every sprite that is not at home shares the Hollow. Custom and open
       scenes have no resident cap, so do not silently hide the rest. */
    return list;
  }

  function currentSprite() {
    const current = activeSprite();
    if (current && current.stage !== 'egg' && !current.retired && !current.atHome) return current;
    return roster()[0] || null;
  }

  function renderRoster() {
    const list = roster();
    const sig = list.map((s) => s.id).join('|');
    const activeId = currentSprite()?.id;
    if (sig === rosterSignature) {
      // update active highlight and tags only
      actors.forEach((node, id) => {
        node.classList.toggle('active', id === activeId);
      });
      return;
    }
    rosterSignature = sig;
    actorsEl.innerHTML = '';
    actors.clear();
    visualSignatures.clear();
    const placed = [];
    list.forEach((sprite, index) => {
      const actor = document.createElement('button');
      actor.type = 'button';
      actor.className = `sprite-actor${sprite.id === activeId ? ' active' : ''}${sprite.asleep ? ' sleeping' : ''}${sprite.form ? ` form-${sprite.form}` : ''}`;
      actor.dataset.id = sprite.id;
      actor.style.setProperty('--w', `${spriteSize(sprite.stage, sprite.size)}px`);
      let cx;
      let cy;
      if (index === 0) {
        cx = 50;
        cy = 62;
      } else {
        let best = { x: 50, y: 60 };
        let bestDist = -1;
        for (let attempt = 0; attempt < 8; attempt++) {
          const px = rand(14, 86);
          const py = rand(38, 82);
          const dist = placed.length
            ? Math.min(...placed.map((p) => Math.hypot(p.x - px, p.y - py)))
            : 99;
          if (dist > bestDist) {
            bestDist = dist;
            best = { x: px, y: py };
          }
        }
        cx = best.x;
        cy = best.y;
      }
      placed.push({ x: cx, y: cy });
      actor.style.left = `${cx}%`;
      actor.style.top = `${cy}%`;
      const giftHere = state.gift && state.gift.spriteId === sprite.id && giftReady();
      actor.innerHTML = `<span class="ground-shadow"></span>
        <div class="sprite-body">${spriteSVG(sprite, { expr: expressionFor(sprite) })}</div>
        <span class="sprite-tag">${esc(displayName(sprite))}${sprite.asleep ? ' 💤' : ''}</span>
        ${sprite.asleep ? '<span class="sprite-zzz">💤</span>' : ''}
        ${giftHere ? '<span class="gift-bubble">🎁</span>' : ''}`;
      actor.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        const fresh = findSprite(sprite.id);
        if (!fresh) return;
        if (giftReady() && state.gift?.spriteId === fresh.id) {
          openGiftModal();
          return;
        }
        if (fresh.asleep) {
          Actions.wake(fresh.id);
          Sfx.spriteBabble(fresh);
          setWhisper(`${displayName(fresh)} stretches and blinks awake.`);
          paint();
          return;
        }
        if (activeSprite()?.id !== fresh.id) Actions.setActive(fresh.id);
        const result = Actions.pet(fresh.id);
        Sfx.spriteCry(fresh);
        const rect = actor.getBoundingClientRect();
        burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, ['💛', '💗', '✨'], 5);
        if (result.coins) coinFly(actor, 1);
        actor.classList.remove('react-hop');
        void actor.offsetWidth;
        actor.classList.add('react-hop');
        setTimeout(() => actor.classList.remove('react-hop'), 720);
        setWhisper(reactionLine(fresh, 'pet'));
        paint();
      });
      actorsEl.appendChild(actor);
      actors.set(sprite.id, actor);
      visualSignatures.set(sprite.id, stageSig(sprite));
    });
  }

  function stageSig(s) {
    return [s.stage, s.element, s.hybrid, s.breed, s.palette, s.pattern, s.accessory, s.outfit, s.custom?.body, s.size, s.form, s.special, s.asleep, moodOf(s).key].join(',');
  }

  function refreshActor(s) {
    const node = actors.get(s.id);
    if (!node) return;
    node.classList.toggle('sleeping', s.asleep);
    const sig = stageSig(s);
    if (visualSignatures.get(s.id) !== sig) {
      visualSignatures.set(s.id, sig);
      const body = node.querySelector('.sprite-body');
      body.innerHTML = spriteSVG(s, { expr: expressionFor(s) });
      const tag = node.querySelector('.sprite-tag');
      tag.textContent = `${displayName(s)}${s.asleep ? ' 💤' : ''}`;
      let zzz = node.querySelector('.sprite-zzz');
      if (s.asleep && !zzz) {
        zzz = document.createElement('span');
        zzz.className = 'sprite-zzz';
        zzz.textContent = '💤';
        node.appendChild(zzz);
      } else if (!s.asleep && zzz) {
        zzz.remove();
      }
      node.style.setProperty('--w', `${spriteSize(s.stage, s.size)}px`);
    }
    node.classList.toggle('form-dragon', s.form === 'dragon');
    node.classList.toggle('form-fairy', s.form === 'fairy');
    node.classList.toggle('form-ghoul', s.form === 'ghoul');
    node.classList.toggle('form-titan', s.form === 'titan');
    const shouldGift = state.gift && state.gift.spriteId === s.id && giftReady();
    let bubble = node.querySelector('.gift-bubble');
    if (shouldGift && !bubble) {
      bubble = document.createElement('span');
      bubble.className = 'gift-bubble';
      bubble.textContent = '🎁';
      node.appendChild(bubble);
    } else if (!shouldGift && bubble) {
      bubble.remove();
    }
  }

  function paintGiftChip() {
    const chip = root.querySelector('[data-gift-chip]');
    if (!chip) return;
    const phase = timePhase();
    const phaseEl = root.querySelector('[data-phase]');
    if (phaseEl) phaseEl.textContent = `${phase.icon} ${phase.label}`;
    if (!state.gift) {
      chip.classList.remove('ready');
      chip.textContent = '🎁 Wrapping…';
      return;
    }
    if (giftReady()) {
      chip.classList.add('ready');
      chip.textContent = '🎁 Gift ready!';
    } else {
      chip.classList.remove('ready');
      chip.textContent = `🎁 ${fmtTime(state.gift.readyAt - Date.now())}`;
    }
  }

  let lastWorldSig = '';
  function applyStageLook() {
    if (!stageEl) return;
    const phase = timePhase();
    const season = seasonOf();
    const wx = currentWeather();
    const localWeather = state.world?.weather ? null : (typeof sceneWeatherKey === 'function' ? sceneWeatherKey(state.theme.scene) : null);
    const wxKey = localWeather || wx.key;
    const climate = state.world?.climate || 'temperate';
    stageEl.className = `stage scene-${state.theme.scene} phase-${phase.key} season-${season.key} weather-${wxKey}`;
    const scene = SCENES[state.theme.scene];
    stageEl.style.background = scene?.custom
      ? `linear-gradient(180deg, ${scene.sky} 0%, ${scene.sky} 55%, ${scene.ground} 56%, ${scene.ground} 100%)`
      : '';
    if (scene && !scene.custom && sceneUsesTint(state.theme.scene)) {
      const tint = sceneTint(state.theme.scene);
      stageEl.style.background = `linear-gradient(180deg, ${tint.b2} 0%, ${tint.b1} 58%, ${tint.b2} 100%)`;
    }
    const sky = root.querySelector('[data-sky]');
    if (sky) sky.textContent = phase.key === 'night' ? '🌙' : phase.key === 'day' ? '☀️' : phase.key === 'dawn' ? '🌅' : '🌇';
    const worldChip = root.querySelector('[data-world]');
    if (worldChip) {
      worldChip.textContent = `${season.icon} ${seasonLabel(season, climate)} · ${CLIMATES[climate]?.name || 'Temperate'}`;
      worldChip.title = `Season and climate. ${CLIMATES[climate]?.blurb || ''}`;
    }
    const weatherChip = root.querySelector('[data-weather]');
    if (weatherChip) {
      weatherChip.textContent = `${wx.icon} ${wx.name}${state.world?.weather ? ' · set' : ' · change'}`;
      weatherChip.title = `${wx.blurb} ${state.world?.weather ? 'Tap to change it or return to Auto.' : 'Tap to change the weather.'}`;
    }
    const warmChip = root.querySelector('[data-warm]');
    if (warmChip) {
      const warm = warmScore(activeSprite());
      if (wx.chill > 0) {
        warmChip.hidden = false;
        warmChip.textContent = warm >= 2 ? '🧣 Cozy' : warm === 1 ? '🧣 Warm-ish' : '🥶 Chilly';
        warmChip.title = warm >= 2
          ? 'Warm clothes keep the cold from draining energy and joy.'
          : 'Cold weather drains energy and joy faster. Try a scarf, beanie, mittens or parka in the Studio.';
      } else {
        warmChip.hidden = true;
      }
    }
    const sig = `${season.key}:${wxKey}:${state.theme.scene}`;
    const weatherEl = root.querySelector('[data-weather-fx]');
    if (weatherEl && sig !== lastWorldSig) {
      lastWorldSig = sig;
      weatherEl.innerHTML = buildWeatherFx(wxKey);
    }
  }

  function paint() {
    const s = currentSprite();
    if (!s) return;
    root.querySelector('[data-name]').textContent = displayName(s);
    root.querySelector('[data-mood]').innerHTML = moodChip(s);
    root.querySelector('[data-meta]').textContent = `${spriteSubtitle(s)} · Lv ${s.level}${s.level >= MAX_LEVEL ? ' · MAX' : ''}`;
    const sizeChip = root.querySelector('[data-size-chip]');
    if (sizeChip) sizeChip.textContent = `${SIZES[s.size]?.name || 'Standard'}${formName(s) ? ` · ${formName(s)}` : ''}`;
    const habitatChip = root.querySelector('[data-habitat]');
    if (habitatChip) {
      const habitat = habitatFor(s);
      habitatChip.textContent = `${habitat.scene.emoji} ${habitat.scene.habitat} · +${habitat.percent}% XP`;
      habitatChip.title = `${habitat.scene.habitat} habitat — ${habitat.scene.name}${habitat.match ? ' · thriving' : ' · visitor bonus'}`;
    }
    ['hunger', 'energy', 'joy', 'clean'].forEach((k) => {
      const v = Math.round(s.needs[k]);
      root.querySelector(`[data-need-val="${k}"]`).textContent = v;
      root.querySelector(`[data-need-bar="${k}"]`).style.width = `${v}%`;
    });
    const napLabel = root.querySelector('[data-nap-label]');
    if (napLabel) napLabel.textContent = s.asleep ? 'Wake' : 'Nap';
    if (avatarEl.dataset.sig !== stageSig(s)) {
      avatarEl.dataset.sig = stageSig(s);
      avatarEl.innerHTML = spriteSVG(s, { expr: expressionFor(s) });
    }
    roster().forEach(refreshActor);
    actors.forEach((node, id) => node.classList.toggle('active', id === s.id));
    paintGiftChip();
  }

  function moveSprites() {
    const list = roster().filter((s) => !s.asleep);
    if (!list.length) return;
    list.forEach((s) => {
      const node = actors.get(s.id);
      if (!node) return;
      if (chance(0.35)) return;
      let best = null;
      let bestDist = -1;
      for (let i = 0; i < 4; i++) {
        const x = rand(14, 86);
        const y = rand(36, 80);
        let nearest = 999;
        list.forEach((o) => {
          if (o.id === s.id) return;
          const on = actors.get(o.id);
          if (!on) return;
          const ox = parseFloat(on.style.left);
          const oy = parseFloat(on.style.top);
          nearest = Math.min(nearest, Math.hypot(ox - x, oy - y));
        });
        if (nearest > bestDist) {
          bestDist = nearest;
          best = { x, y };
        }
      }
      if (best && bestDist > 22) {
        const oldX = parseFloat(node.style.left);
        node.style.setProperty('--flip', best.x < oldX ? '-1' : '1');
        node.style.left = `${best.x}%`;
        node.style.top = `${best.y}%`;
      }
    });
  }

  function emote(id, char) {
    const node = actors.get(id);
    if (!node) return;
    const span = document.createElement('span');
    span.className = 'emote';
    span.textContent = char;
    node.appendChild(span);
    setTimeout(() => span.remove(), 1800);
  }

  function ambientInteraction() {
    const list = roster().filter((s) => !s.asleep);
    if (list.length < 2) return;
    const a = pick(list);
    const b = pick(list.filter((s) => s.id !== a.id));
    if (!b) return;
    const na = actors.get(a.id);
    const nb = actors.get(b.id);
    if (!na || !nb) return;
    const dist = Math.hypot(parseFloat(na.style.left) - parseFloat(nb.style.left), parseFloat(na.style.top) - parseFloat(nb.style.top));
    if (dist > 30) {
      // sidle up beside them rather than through them
      const nbX = parseFloat(nb.style.left);
      const nbY = parseFloat(nb.style.top);
      const naX = parseFloat(na.style.left);
      const nx = clamp(nbX + (naX < nbX ? -30 : 30), 14, 86);
      const ny = clamp(nbY + rand(8, 15), 38, 82);
      na.style.setProperty('--flip', nx < naX ? '-1' : '1');
      na.style.left = `${nx}%`;
      na.style.top = `${ny}%`;
      return;
    }
    const kind = pick(['💛', '✨', '🎵', '💫', '🌸']);
    emote(a.id, kind);
    setTimeout(() => emote(b.id, kind), 240);
    Actions.ambientBond([a.id, b.id], 0.5);
    const lines = [
      `${displayName(a)} and ${displayName(b)} bumped noses. That’s legally a friendship now.`,
      `${displayName(a)} showed ${displayName(b)} a really good leaf.`,
      `${displayName(a)} and ${displayName(b)} are having a stare-off. Nobody is winning.`,
      `${displayName(a)} chased ${displayName(b)} in a circle for no reason.`,
      `${displayName(b)} shared a snack with ${displayName(a)}. A whole snack.`,
      `${displayName(a)} and ${displayName(b)} are doing a tiny dance.`,
    ];
    setWhisper(pick(lines));
  }

  function ambientWhisper() {
    if (Date.now() - lastWhisper < 9000) return;
    const s = currentSprite();
    if (!s) return;
    const line = idleLine(pick(roster()));
    setWhisper(line);
  }

  // caretakers
  root.querySelector('[data-care="feed"]').addEventListener('click', openFeedSheet);
  root.querySelector('[data-care="play"]').addEventListener('click', () => App.go('play'));
  root.querySelector('[data-care="walk"]').addEventListener('click', () => openWalkSheet());
  root.querySelector('[data-care="rub"]').addEventListener('click', () => {
    const s = currentSprite();
    if (!s) return;
    const res = Actions.rubBelly(s.id);
    if (res.cooled) {
      setWhisper(`${displayName(s)} is still blissed out from the last belly rub. Give them a second.`);
      return;
    }
    const node = actors.get(s.id);
    if (node) {
      const r = node.getBoundingClientRect();
      burstAt(r.left + r.width / 2, r.top + r.height / 2, ['💗', '✨', '💛'], 8);
      node.classList.remove('react-hop');
      void node.offsetWidth;
      node.classList.add('react-hop');
      setTimeout(() => node.classList.remove('react-hop'), 720);
    }
    emote(s.id, '💗');
    Sfx.purr();
    setWhisper(`${displayName(s)} flops over for a belly rub. Ten out of ten.`);
    paint();
  });
  root.querySelector('[data-care="throw"]').addEventListener('click', () => openFetchGame('throw'));
  root.querySelector('[data-care="catch"]').addEventListener('click', () => openFetchGame('catch'));
  root.querySelector('[data-care="bath"]').addEventListener('click', openBathModal);
  root.querySelector('[data-care="nap"]').addEventListener('click', () => {
    const s = currentSprite();
    if (!s) return;
    if (s.asleep) {
      Actions.wake(s.id);
      setWhisper(`${displayName(s)} blinks awake and stretches.`);
      Sfx.pop();
    } else {
      Actions.nap(s.id);
      setWhisper('Shhh. Thirty seconds of the best nap ever.');
      emote(s.id, '💤');
    }
    paint();
  });
  root.querySelector('[data-care="bed"]').addEventListener('click', () => {
    Sfx.click();
    openBedroomSheet();
  });
  root.querySelector('[data-care="chat"]').addEventListener('click', () => {
    const s = currentSprite();
    if (s) App.openChat(s.id);
  });
  root.querySelector('[data-open-detail]').addEventListener('click', () => {
    const s = currentSprite();
    if (s) App.openDetail(s.id);
  });
  root.querySelector('[data-gift-chip]').addEventListener('click', () => {
    if (giftReady()) openGiftModal();
    else if (state.gift) {
      const s = findSprite(state.gift.spriteId);
      toast(`${s ? displayName(s) : 'Someone'} is still wrapping it — ${fmtTime(state.gift.readyAt - Date.now())} to go.`, '🎁');
    } else {
      toast('No gift is being wrapped right now. Pet a sprite and check back soon.', '🎁');
    }
  });

  function openFeedSheet() {
    const s = currentSprite();
    if (!s) return;
    const dietLine = dietInfo(s).filter((d) => d.points > 0)
      .map((d) => `${d.icon} ${d.points}/${d.need}`).join(' · ');
    const dietTag = (key) => {
      const diet = FOOD_DIET[key];
      return diet ? ` · ${DIET_PATHS[diet.path].icon} ${DIET_PATHS[diet.path].label}` : '';
    };
    const feedSuccess = (res) => {
      close();
      const item = res.food || res.snack;
      const node = actors.get(s.id);
      if (node) {
        const r = node.getBoundingClientRect();
        burstAt(r.left + r.width / 2, r.top + r.height / 2, [item.emoji, '✨', '💛'], 7);
        node.classList.add('react-hop');
        setTimeout(() => node.classList.remove('react-hop'), 720);
        emote(s.id, item.emoji);
      }
      setWhisper(reactionLine(s, 'feed'));
      toast(`${displayName(s)} loved the ${item.name}`, item.emoji);
      paint();
    };

    function pantryHTML() {
      const foodKeys = FOOD_KEYS.filter((key) => foodCount(key) > 0);
      const snackKeys = SNACK_KEYS.filter((key) => snackCount(key) > 0);
      const rows = [
        ...foodKeys.map((key) => {
          const f = FOODS[key];
          return `<button class="food-card" data-stock-feed="${key}">
            <span class="food-emoji">${f.emoji}</span>
            <span style="flex:1"><h4>${f.name}</h4><p>${f.desc}${dietTag(key)}</p></span>
            <span class="price snack-count">×${foodCount(key)}</span>
          </button>`;
        }),
        ...snackKeys.map((key) => {
          const snack = SNACKS[key];
          return `<button class="food-card" data-snack="${key}">
            <span class="food-emoji">${snack.emoji}</span>
            <span style="flex:1"><h4>${snack.name}</h4><p>${snack.desc}${dietTag(key)}</p></span>
            <span class="price snack-count">×${snackCount(key)}</span>
          </button>`;
        }),
      ];
      const total = foodTotal() + snackTotal();
      return `<div class="section-title" style="margin-top:4px"><h2>Pantry</h2><span>${total} item${total === 1 ? '' : 's'}</span></div>
        ${rows.length
          ? `<div class="list-gap">${rows.join('')}</div>`
          : '<div class="tiny muted">The pantry is empty. Stock food from the market or earn snacks from check-ins.</div>'}`;
    }

    function marketHTML() {
      const groups = Object.entries(FOOD_CATEGORIES).map(([id, cat]) => {
        const keys = FOOD_KEYS.filter((key) => !FOODS[key].giftOnly && FOODS[key].cat === id && (!FOODS[key].monthly || (state.foodUnlocks || []).includes(key)));
        if (!keys.length) return '';
        const rows = keys.map((key) => {
          const f = FOODS[key];
          return `<button class="food-card" data-buy-food="${key}" ${state.coins < f.price ? 'disabled style="opacity:.5"' : ''}>
            <span class="food-emoji">${f.emoji}</span>
            <span style="flex:1"><h4>${f.name}</h4><p>${f.desc}${dietTag(key)}</p></span>
            <span class="price">${icon('coin')}${f.price}</span>
          </button>`;
        }).join('');
        return `<div class="food-cat">${cat.icon} ${cat.name}</div><div class="list-gap">${rows}</div>`;
      }).join('');
      const lockedMonthly = MONTHLY_FOOD_KEYS.filter((k) => !(state.foodUnlocks || []).includes(k)).length;
      return `<div class="section-title"><h2>Market</h2><span>stock your pantry</span></div>${groups}
        ${lockedMonthly ? `<div class="tiny muted" style="margin-top:10px;line-height:1.5">${lockedMonthly} monthly food${lockedMonthly === 1 ? '' : 's'} still locked. Claim the monthly crate on Today to unlock one each month.</div>` : ''}
        <div class="between" style="margin-top:12px"><span class="tiny muted">You have <b>${state.coins}</b> coins</span>
        <button class="btn btn-sm btn-soft" data-earn>Earn coins</button></div>`;
    }

    const { close } = openSheet({
      title: `Feed ${displayName(s)}`,
      sub: `Food ${Math.round(s.needs.hunger)}/100 · Joy ${Math.round(s.needs.joy)}/100.${dietLine ? ` Diet: ${dietLine}` : ''}`,
      body: '<div data-feed-body></div>',
      onMount: (overlay) => {
        const body = overlay.querySelector('[data-feed-body]');
        const draw = () => {
          body.innerHTML = pantryHTML() + marketHTML();
          body.querySelectorAll('[data-stock-feed]').forEach((btn) => {
            btn.addEventListener('click', () => {
              const res = Actions.feedStock(s.id, btn.dataset.stockFeed);
              if (res.ok) feedSuccess(res);
            });
          });
          body.querySelectorAll('[data-snack]').forEach((btn) => {
            btn.addEventListener('click', () => {
              const res = Actions.feedSnack(s.id, btn.dataset.snack);
              if (res.ok) feedSuccess(res);
            });
          });
          body.querySelectorAll('[data-buy-food]').forEach((btn) => {
            btn.addEventListener('click', () => {
              const res = Actions.buyFoodStock(btn.dataset.buyFood);
              if (res.ok) {
                Sfx.coin();
                toast(`${res.food.name} stocked in the pantry.`, '🧺');
                draw();
              }
            });
          });
          body.querySelector('[data-earn]').addEventListener('click', () => {
            close();
            App.go('play');
          });
        };
        draw();
      },
    });
  }

  function openGiftModal() {
    if (!giftReady()) {
      toast('Not quite ready yet — the wrapping is still rustling.', '🎁');
      return;
    }
    const giver = findSprite(state.gift?.spriteId) || activeSprite();
    if (!giver) return;
    openModal({
      title: `A gift from ${displayName(giver)}`,
      sub: 'They wrapped this themself. Mostly.',
      body: `<div style="text-align:center;padding:14px 0 4px">
          <div style="font-size:64px;line-height:1;filter:drop-shadow(0 8px 24px rgba(255,209,102,.35))">🎁</div>
          <div class="tiny muted" style="margin-top:10px">Saved up over the last little while.</div>
        </div>
        <button class="btn btn-gold btn-block" data-open-gift style="margin-top:12px">Open the gift</button>`,
      onMount: (root, close) => {
        root.querySelector('[data-open-gift]').addEventListener('click', (e) => {
          const res = Actions.claimGift();
          if (!res.ok) {
            close();
            paint();
            return;
          }
          const body = root.querySelector('.modal-body');
          body.innerHTML = `<div class="gift-reward">
            <div class="gr-emoji">${res.reward.icon}</div>
            <h3>${esc(res.reward.title)}</h3>
            <p class="muted small">${esc(res.reward.text)}</p>
            <div class="row" style="justify-content:center;gap:6px;flex-wrap:wrap;margin-top:10px">
              <span class="chip">from ${esc(displayName(res.sprite))}</span>
              <span class="chip">next gift wraps soon</span>
            </div>
          </div>
          <button class="btn btn-primary btn-block" data-gift-done style="margin-top:12px">Lovely</button>`;
          burstOn(e.currentTarget, ['🎁', '✨', '💛'], 10);
          body.querySelector('[data-gift-done]').addEventListener('click', () => {
            close();
            paint();
            App.refresh();
          });
          paint();
        });
      },
    });
  }

  function openBathModal() {
    const s = currentSprite();
    if (!s) return;
    let scrubs = 0;
    const total = 8;
    const { close } = openModal({
      title: 'Bubble bath',
      sub: `Rub the bubbles into ${displayName(s)}. Eight good scrubs.`,
      dismissible: true,
      body: `<div class="hatch-stage" data-scrub style="min-height:150px;cursor:pointer">
          <div class="hatched" data-bath-sprite style="width:150px;height:150px">${spriteSVG(s, { expr: 'happy' })}</div>
        </div>
        <div class="bar clean" style="height:9px"><i data-scrub-bar style="width:0%"></i></div>
        <div class="hatch-hint" data-scrub-hint>0 / ${total} scrubs</div>`,
      onMount: (overlay) => {
        const target = overlay.querySelector('[data-scrub]');
        const bar = overlay.querySelector('[data-scrub-bar]');
        const hint = overlay.querySelector('[data-scrub-hint]');
        target.addEventListener('pointerdown', (e) => {
          if (scrubs >= total) return;
          scrubs++;
          bar.style.width = `${(scrubs / total) * 100}%`;
          hint.textContent = `${scrubs} / ${total} scrubs`;
          burstAt(e.clientX, e.clientY, ['🫧', '✨', '💙'], 3);
          if (scrubs % 2 === 0) Sfx.bath();
          if (scrubs >= total) {
            Actions.bathe(s.id);
            toast(`${displayName(s)} is squeaky clean!`, '🫧');
            Sfx.win();
            const rect = target.getBoundingClientRect();
            burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, ['🫧', '✨', '💛'], 10);
            setWhisper(reactionLine(s, 'bath'));
            paint();
            setTimeout(close, 550);
          }
        });
      },
    });
  }

  function openFetchGame(mode) {
    const s = currentSprite();
    if (!s) return;
    if (s.asleep) Actions.wake(s.id);
    const total = 5;
    const isCatch = mode === 'catch';
    let caught = 0;
    let finished = false;
    const { close } = openModal({
      title: isCatch ? `Play catch with ${displayName(s)}` : `Throw ball with ${displayName(s)}`,
      sub: isCatch ? 'Tap the ball as it comes back. Five clean catches.' : 'Tap the ball to send it flying. Five good throws.',
      dismissible: true,
      body: `<div class="fetch-stage" data-fetch-stage>
          <div class="fetch-sun"></div>
          <div class="fetch-sprite">${spriteSVG(s, { expr: 'happy' })}</div>
          <button class="fetch-ball" type="button" data-fetch-ball aria-label="Catch the ball">🎾</button>
          <span class="fetch-spark a">✨</span><span class="fetch-spark b">✨</span>
        </div>
        <div class="bar joy" style="height:9px"><i data-fetch-bar style="width:0%"></i></div>
        <div class="hatch-hint" data-fetch-hint>0 / ${total} ${isCatch ? 'catches' : 'throws'}</div>`,
      onMount: (overlay) => {
        const ball = overlay.querySelector('[data-fetch-ball]');
        const bar = overlay.querySelector('[data-fetch-bar]');
        const hint = overlay.querySelector('[data-fetch-hint]');
        const body = overlay.querySelector('.modal-body');
        const tap = (e) => {
          if (finished) return;
          caught += 1;
          bar.style.width = `${(caught / total) * 100}%`;
          hint.textContent = `${caught} / ${total} ${isCatch ? 'catches' : 'throws'}`;
          burstAt(e.clientX, e.clientY, ['🎾', '✨', '💛'], 5);
          Sfx.pop();
          ball.style.animationPlayState = 'paused';
          setTimeout(() => { if (!finished) ball.style.animationPlayState = 'running'; }, 180);
          if (caught >= total) {
            finished = true;
            ball.disabled = true;
            const res = Actions.playCatch(s.id, mode, total);
            if (!res.ok) {
              close();
              return;
            }
            body.innerHTML = `<div class="gift-reward" style="text-align:center">
              <div class="gr-emoji">${isCatch ? '🧤' : '🎾'}</div>
              <h3>${isCatch ? 'Five clean catches!' : 'Five good throws!'}</h3>
              <p class="muted small">${esc(displayName(s))} is delighted${res.careGift ? ' — and the Care Package is full!' : '.'}</p>
              <div class="row" style="justify-content:center;gap:6px;flex-wrap:wrap;margin-top:10px">
                <span class="chip">🪙 +${res.coins}</span><span class="chip">⭐ +${res.xp} XP</span><span class="chip">💗 bond</span>
              </div>
            </div>
            <button class="btn btn-primary btn-block" data-fetch-done style="margin-top:12px">Lovely</button>`;
            body.querySelector('[data-fetch-done]').addEventListener('click', () => {
              close();
              setWhisper(`${displayName(s)} is ready for another round whenever you are.`);
              paint();
            });
            setWhisper(`${displayName(s)} brings the ball back with a very proud expression.`);
            paint();
          }
        };
        ball.addEventListener('pointerdown', tap);
      },
    });
    return close;
  }

  applyStageLook();
  renderRoster();
  paint();

  const unsub = subscribeState((detail) => {
    if (detail.type === 'ambient') return;
    const ids = roster().map((s) => s.id).join('|');
    if (ids !== rosterSignature) renderRoster();
    paint();
  });

  const moveTimer = setInterval(() => { moveSprites(); paint(); }, 3000);
  const ambientTimer = setInterval(ambientInteraction, 9000);
  const whisperTimer = setInterval(ambientWhisper, 12000);
  const sceneSig = () => state.theme.scene;
  let lastScene = sceneSig();
  const sceneTimer = setInterval(() => {
    if (sceneSig() !== lastScene) {
      lastScene = sceneSig();
      applyStageLook();
      decorEl.innerHTML = buildSceneDecor(lastScene);
    }
  }, 800);
  const clockTimer = setInterval(() => {
    applyStageLook();
    paintGiftChip();
  }, 1000);

  const cleanup = () => {
    unsub();
    clearInterval(moveTimer);
    clearInterval(ambientTimer);
    clearInterval(whisperTimer);
    clearInterval(sceneTimer);
    clearInterval(clockTimer);
  };
  return cleanup;
}
