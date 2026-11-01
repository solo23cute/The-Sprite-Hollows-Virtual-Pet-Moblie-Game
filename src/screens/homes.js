/* Sprite Homes: a multi-window neighbourhood where every sprite has its own
   room in its own biome — including retired elders and sprites that went back
   to their egg after a Rebirth Meal. The main Hollow keeps everyone together. */

/* Scenes that can hold a window. Locked scenes stay out of the picker until
   their gift/unlock lands, but an already-assigned home keeps working. */
function homeScenePool() {
  return SCENE_KEYS.filter((key) => {
    const scene = SCENES[key];
    if (!scene) return false;
    return scene.unlocked !== false || (state.unlockedScenes || []).includes(key);
  });
}

/* Every species leans toward one type biome: the first type biome whose
   species list already holds it, so a fire sprite wakes up in the caldera. */
function defaultHomeScene(s) {
  const element = s && s.element;
  /* A Hollow exotic wakes up in its own signature biome before any type biome. */
  if (element && typeof exoticBiomeFor === 'function') {
    const exotic = exoticBiomeFor(element);
    if (exotic) return exotic;
  }
  /* GTA sprites start in the district their game belongs to. */
  const gtaHome = element && ELEMENTS[element] && ELEMENTS[element].gtaHome;
  if (gtaHome && SCENES[gtaHome]) return gtaHome;
  if (element) {
    const type = Object.keys(TYPE_BIOMES || {}).find((key) => {
      const biome = TYPE_BIOMES[key];
      const scene = biome && SCENES[biome.key];
      return !!(scene && (scene.species || []).includes(element));
    });
    if (type) return TYPE_BIOMES[type].key;
    const habitat = SCENE_KEYS.find((key) => SCENES[key] && (SCENES[key].species || []).includes(element));
    if (habitat) return habitat;
  }
  return 'grove';
}

function homeSceneFor(s) {
  const assigned = state.homes && state.homes[s.id];
  if (assigned && SCENES[assigned]) return assigned;
  return defaultHomeScene(s);
}

function homeIsCustom(s) {
  return !!(state.homes && state.homes[s.id] && SCENES[state.homes[s.id]]);
}

/* ---------- the three shelves of the neighbourhood ---------- */

function homesLiving() {
  return state.sprites
    .filter((s) => s.stage !== 'egg' && !s.retired)
    .sort((a, b) => {
      if (a.id === state.activeId) return -1;
      if (b.id === state.activeId) return 1;
      return (a.born || 0) - (b.born || 0);
    });
}

function homesRetired() {
  return state.sprites
    .filter((s) => s.stage !== 'egg' && s.retired)
    .sort((a, b) => (b.retiredAt || 0) - (a.retiredAt || 0));
}

/* Sprites that finished a life and came back as a Rebirth egg. */
function homesReturning() {
  return state.sprites
    .filter((s) => s.stage === 'egg' && (Number(s.rebirths) || 0) > 0)
    .sort((a, b) => (Number(b.rebirths) || 0) - (Number(a.rebirths) || 0) || (a.born || 0) - (b.born || 0));
}

function homesOtherEggs() {
  return state.sprites.filter((s) => s.stage === 'egg' && !(Number(s.rebirths) > 0));
}

/* ---------- one window ---------- */

function homeWindowHTML(s) {
  const key = homeSceneFor(s);
  const scene = SCENES[key] || SCENES.grove;
  const tint = sceneTint(key);
  const custom = homeIsCustom(s);
  const isEgg = s.stage === 'egg';
  const rebirths = Math.max(0, Number(s.rebirths) || 0);
  const expr = typeof expressionFor === 'function' ? expressionFor(s) : 'happy';
  const stage = typeof stageLabel === 'function' ? stageLabel(s) : '';
  const art = isEgg ? eggSVG(s, { progress: s.hatch }) : spriteSVG(s, { expr });
  const ribbon = isEgg
    ? `<span class="home-ribbon">🥚 ${rebirths ? `Rebirth ${rebirths}` : 'Egg'}</span>`
    : s.retired ? '<span class="home-ribbon">🌿 Retired</span>' : '';
  /* The carried-over bond and the permanent rebirth multipliers are what a
     reborn sprite brings back with it when it hatches again. */
  const bonus = isEgg && rebirths
    ? `<span class="home-bonus" title="Carried over from their last life">Welcome back · ⚡ +${8 * rebirths}% XP · 🪙 +${rebirths} per game · 🎁 +${3 * rebirths}% gifts · 💗 ${Math.round(s.bond || 0)} bond kept</span>`
    : '';
  const sub = isEgg
    ? `${Math.round(s.hatch)}% warm · ${rebirths ? `life ${rebirths + 1}` : 'new life'}`
    : `${esc(stage)} · Lv ${s.level}${s.retired ? ' · resting' : ''}`;
  const action = isEgg
    ? `<button class="home-visit" type="button" data-home-warm="${s.id}">Warm this egg</button>`
    : `<button class="home-visit" type="button" data-home-visit="${s.id}">Visit ${esc(scene.habitat || 'biome')}</button>`;
  const care = isEgg ? '' : homeCareHTML(s);
  const kind = isEgg ? 'egg' : s.retired ? 'retired' : 'living';
  return `<article class="home-window ${isEgg ? 'is-egg' : ''} ${s.retired ? 'is-retired' : ''} ${s.id === state.activeId ? 'active' : ''}" data-home-card="${s.id}" data-home-kind="${kind}" style="--home-a:${tint.b1};--home-b:${tint.b2}">
    <div class="home-pane scene-${key}" style="background:linear-gradient(180deg, ${tint.b2} 0%, ${tint.b1} 56%, ${tint.b2} 100%)">
      <div class="scene-decor">${buildSceneDecor(key)}</div>
      <span class="home-window-shine"></span>
      ${ribbon}
      <div class="home-actor">${art}</div>
      <button class="home-change" type="button" data-home-change="${s.id}"${custom ? ' data-custom="1"' : ''} title="Change ${esc(displayName(s))}’s biome" aria-label="Change ${esc(displayName(s))}’s biome">${scene.emoji}</button>
    </div>
    <div class="home-plate">
      <b>${esc(displayName(s))} <span class="gender-mark" style="color:${genderOf(s).color}" title="${esc(genderOf(s).name)}">${genderOf(s).symbol}</span></b>
      <span class="home-biome">${scene.emoji} ${esc(scene.name)}</span>
      <span class="home-sub">${sub}</span>
      ${bonus}
      ${care}
      ${action}
    </div>
  </article>`;
}

/* Care controls live inside each window, so a sprite can be rubbed, fed,
   bathed or tucked in without leaving its own room. */
function homeCareHTML(s) {
  const needs = ['hunger', 'energy', 'joy', 'clean'].map((key) => {
    const value = Math.round(Number(s.needs?.[key]) || 0);
    const label = key === 'hunger' ? 'Food' : key === 'energy' ? 'Rest' : key === 'joy' ? 'Joy' : 'Clean';
    return `<span class="home-need ${key}" title="${label} ${value}/100" aria-label="${label} ${value} of 100"><i style="width:${value}%"></i></span>`;
  }).join('');
  const name = esc(displayName(s));
  const napLabel = s.asleep ? 'Wake up' : 'Nap';
  return `<div class="home-needs" title="Food · Rest · Joy · Clean">${needs}</div>
    <div class="home-care" role="group" aria-label="Care for ${name}">
      <button class="home-care-btn" type="button" data-home-care="rub" data-home-id="${s.id}" title="Rub belly" aria-label="Rub ${name}’s belly">🤲</button>
      <button class="home-care-btn" type="button" data-home-care="feed" data-home-id="${s.id}" title="Feed" aria-label="Feed ${name}">🍎</button>
      <button class="home-care-btn" type="button" data-home-care="bath" data-home-id="${s.id}" title="Bath" aria-label="Bathe ${name}">🛁</button>
      <button class="home-care-btn" type="button" data-home-care="nap" data-home-id="${s.id}" title="${napLabel}" aria-label="${napLabel} ${name}">${s.asleep ? '☀️' : '🌙'}</button>
    </div>`;
}

function homeCareAction(spriteId, kind, repaint) {
  const s = findSprite(spriteId);
  if (!s || s.stage === 'egg') return;
  if (kind === 'feed') {
    openHomeFeedPicker(spriteId, repaint);
    return;
  }
  if (kind === 'rub') {
    const res = Actions.rubBelly(spriteId);
    if (res && res.cooled) toast(`${displayName(s)} is still blissed out from the last belly rub.`, '💗');
    else toast(`${displayName(s)} flops over in their window for a belly rub.`, '🤲');
  } else if (kind === 'bath') {
    Actions.bathe(spriteId);
    toast(`${displayName(s)} is squeaky clean again.`, '🛁');
  } else if (kind === 'nap') {
    if (s.asleep) {
      Actions.wake(spriteId);
      toast(`${displayName(s)} blinks awake in their window.`, '☀️');
    } else {
      Actions.nap(spriteId);
      toast(`${displayName(s)} curls up among their own hills.`, '😴');
    }
  }
  Sfx.click();
  if (repaint) repaint();
}

/* A pantry-only feed picker: enough to care for a sprite from its window
   without walking back to the Hollow's market. */
function openHomeFeedPicker(spriteId, onDone) {
  const s = findSprite(spriteId);
  if (!s) return;
  const snacks = Object.keys(state.inventory?.snacks || {}).filter((k) => SNACKS[k] && state.inventory.snacks[k] > 0);
  const foods = Object.keys(state.inventory?.foods || {}).filter((k) => FOODS[k] && state.inventory.foods[k] > 0);
  const row = (kind, key, item, count) => `<button class="home-feed-row" type="button" data-home-feed="${kind}" data-feed-key="${key}">
      <span class="hfr-emoji">${item.emoji || (kind === 'snack' ? '🍬' : '🍲')}</span>
      <span class="hfr-copy"><b>${esc(item.name)}</b><span>${count} in the pantry${kind === 'snack' ? (item.joy ? ` · joy +${item.joy}` : '') : ''}</span></span>
    </button>`;
  const rows = [
    ...snacks.map((key) => row('snack', key, SNACKS[key], state.inventory.snacks[key])),
    ...foods.map((key) => row('stock', key, FOODS[key], state.inventory.foods[key])),
  ].join('');
  const { close } = openSheet({
    title: `Feed ${esc(displayName(s))}`,
    sub: `Food ${Math.round(s.needs.hunger)}/100 · Joy ${Math.round(s.needs.joy)}/100 — straight from the pantry.`,
    body: rows
      ? `<div class="home-feed-grid">${rows}</div>`
      : `<div class="card empty-state"><div style="font-size:32px">🧺</div><h3 style="font-size:14px;margin:6px 0 4px">The pantry is empty</h3><p class="small muted">Stock snacks and meals from the Hollow’s Feed sheet, then come back to this window.</p></div>`,
    onMount: (root) => {
      root.querySelectorAll('[data-home-feed]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const res = btn.dataset.homeFeed === 'snack'
            ? Actions.feedSnack(spriteId, btn.dataset.feedKey)
            : Actions.feedStock(spriteId, btn.dataset.feedKey);
          close();
          if (res && res.ok) Sfx.click();
          if (onDone) onDone();
        });
      });
    },
  });
}

function homesSection(title, note, list) {
  if (!list.length) return '';
  return `<div class="section-title homes-section"><h2>${title}</h2><span>${note}</span></div>
    <div class="homes-grid">${list.map(homeWindowHTML).join('')}</div>`;
}

function homesBody() {
  const living = homesLiving();
  const retired = homesRetired();
  const returning = homesReturning();
  const total = living.length + retired.length + returning.length;
  if (!total) {
    return `<div class="card empty-state">
      <div style="font-size:38px">🪟</div>
      <h3 style="font-size:15px;margin:8px 0 4px">No windows yet</h3>
      <p class="small muted">Hatch a sprite and its own room appears here, ready in the biome it belongs to.</p>
    </div>`;
  }
  const biomes = new Set([...living, ...retired, ...returning].map(homeSceneFor));
  const otherEggs = homesOtherEggs();
  const chips = [
    `🪟 ${total} window${total === 1 ? '' : 's'}`,
    living.length ? `🏡 ${living.length} at home` : '',
    retired.length ? `🌿 ${retired.length} retired` : '',
    returning.length ? `🥚 ${returning.length} returning` : '',
    `🌍 ${biomes.size} biome${biomes.size === 1 ? '' : 's'}`,
  ].filter(Boolean).map((label) => `<span class="chip">${label}</span>`).join('');
  return `<div class="homes-intro">${chips}</div>
    ${homesSection('Living rooms', `${living.length} sprites at home`, living)}
    ${homesSection('Retirement home', `${retired.length} resting on past glories`, retired)}
    ${homesSection('Returning', `${returning.length} back in an egg, with their old life still in them`, returning)}
    <p class="tiny muted homes-foot">Tap a window to open that sprite${returning.length ? ', or to warm a returning egg' : ''}. Tap the biome badge in a window’s corner to move them somewhere else — each room is theirs alone.${otherEggs.length ? ` ${otherEggs.length} other egg${otherEggs.length === 1 ? '' : 's'} still warming in the Nest will get a window once hatched.` : ''}</p>`;
}

function openHomeScenePicker(spriteId, onDone) {
  const s = findSprite(spriteId);
  if (!s) return;
  const current = homeSceneFor(s);
  const auto = defaultHomeScene(s);
  const autoScene = SCENES[auto] || SCENES.grove;
  const pool = homeScenePool();
  const cards = pool.map((key) => {
    const scene = SCENES[key];
    const tint = sceneTint(key);
    return `<button class="home-pick ${key === current ? 'on' : ''}" data-home-scene="${key}" style="--pick-a:${tint.b1};--pick-b:${tint.b2}">
      <span class="home-pick-art">${scene.emoji}</span>
      <span class="home-pick-copy"><b>${esc(scene.name)}</b><span>${esc(scene.habitat || 'Biome')}</span></span>
    </button>`;
  }).join('');
  const { close } = openSheet({
    title: `Move ${esc(displayName(s))}`,
    sub: 'Pick the biome behind their window. The room stays theirs alone either way.',
    body: `<div class="home-pick-actions">
        <button class="btn btn-soft btn-sm" data-home-auto>${autoScene.emoji} Type home · ${esc(autoScene.name)}</button>
      </div>
      <div class="home-pick-grid">${cards}</div>`,
    onMount: (root) => {
      root.querySelector('[data-home-auto]')?.addEventListener('click', () => {
        Actions.setHome(spriteId, null);
        Sfx.click();
        close();
        if (onDone) onDone();
      });
      root.querySelectorAll('[data-home-scene]').forEach((btn) => {
        btn.addEventListener('click', () => {
          Actions.setHome(spriteId, btn.dataset.homeScene);
          Sfx.click();
          close();
          if (onDone) onDone();
        });
      });
    },
  });
}

function openHomesSheet() {
  const total = homesLiving().length + homesRetired().length + homesReturning().length;
  const { close } = openSheet({
    title: '🪟 Sprite Homes',
    sub: total
      ? `${total} window${total === 1 ? '' : 's'} — everyone keeps their own room and biome while the main Hollow stays shared, including retired elders and sprites that came back as eggs.`
      : 'Every sprite gets its own room and biome here.',
    body: `<button class="btn btn-soft btn-block" data-homes-senthome style="margin-bottom:10px">🏠 Sent Home rooms</button>
      <div data-homes-body>${homesBody()}</div>`,
    onMount: (root) => {
      const repaint = () => {
        const body = root.querySelector('[data-homes-body]');
        if (body) body.innerHTML = homesBody();
      };
      root.querySelector('[data-homes-senthome]')?.addEventListener('click', () => { close(); App.go('senthome'); });
      // The sheet element stops propagation, so delegate from it, not the overlay.
      const sheetEl = root.querySelector('.sheet') || root;
      sheetEl.addEventListener('click', (e) => {
        const change = e.target.closest('[data-home-change]');
        if (change) {
          e.stopPropagation();
          openHomeScenePicker(change.dataset.homeChange, repaint);
          return;
        }
        const care = e.target.closest('[data-home-care]');
        if (care) {
          e.stopPropagation();
          homeCareAction(care.dataset.homeId, care.dataset.homeCare, repaint);
          return;
        }
        const warm = e.target.closest('[data-home-warm]');
        if (warm) {
          e.stopPropagation();
          const id = warm.dataset.homeWarm;
          close();
          setTimeout(() => App.openHatch(id), 40);
          return;
        }
        const visit = e.target.closest('[data-home-visit]');
        if (visit) {
          e.stopPropagation();
          const sprite = findSprite(visit.dataset.homeVisit);
          if (!sprite) return;
          const key = homeSceneFor(sprite);
          const scene = SCENES[key];
          if (!scene) return;
          if (!homeScenePool().includes(key) && !(state.unlockedScenes || []).includes(key)) {
            toast(`${scene.name} has not opened yet.`, '🔒');
            return;
          }
          Actions.setTheme({ scene: key });
          close();
          App.go('hollow');
          toast(`${scene.emoji} ${scene.name} · ${displayName(sprite)}’s home biome.`, '🪟');
          return;
        }
        const card = e.target.closest('[data-home-card]');
        if (card) {
          const id = card.dataset.homeCard;
          close();
          if (card.dataset.homeKind === 'egg') {
            setTimeout(() => App.openHatch(id), 40);
            return;
          }
          setTimeout(() => App.openDetail(id), 40);
        }
      });
    },
  });
}
