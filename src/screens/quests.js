/* District quest cards, the Hollow quest tracker, guardian duels, and the
   guardian gallery that lets any biome host an unlimited run of challengers. */

function biomeQuestRewardText(step) {
  const reward = step.reward || {};
  return [
    `🪙 ${reward.coins || 0}`,
    reward.xp ? `✨ ${reward.xp} XP` : '',
    reward.bond ? `💗 +${reward.bond}` : '',
  ].filter(Boolean).join(' · ');
}

function biomeQuestCard(sceneKey) {
  const def = BIOME_QUESTS[sceneKey];
  const scene = SCENES[sceneKey];
  if (!def || !scene) return '';
  const info = biomeQuestStep(sceneKey);
  if (!info) {
    return `<article class="quest-card done">
      <div class="quest-head"><span class="quest-icon">${def.icon}</span><b>${esc(scene.name)}</b><span class="chip">✓</span></div>
      <span class="quest-title">${esc(def.title)} · complete</span>
      <p class="quest-step">All three steps claimed and the guardian bested. ${esc(scene.name)} remembers you kindly.</p>
    </article>`;
  }
  const have = Math.min(info.step.need, Number(info.q.progress) || 0);
  const ready = have >= info.step.need;
  const pct = Math.round((have / Math.max(1, info.step.need)) * 100);
  const here = state.theme.scene === sceneKey;
  const finale = info.index >= def.steps.length - 1;
  const guardian = finale ? guardianForScene(sceneKey) : null;
  const guardianName = guardian ? ELEMENTS[guardian].name : 'the guardian';
  const action = !ready
    ? `<button class="btn btn-ghost btn-sm" disabled>In progress</button>`
    : finale
      ? `<button class="btn btn-gold btn-sm" data-quest-duel="${sceneKey}">⚔️ Face ${esc(guardianName)}</button>`
      : `<button class="btn btn-gold btn-sm" data-quest-claim="${sceneKey}">Claim</button>`;
  return `<article class="quest-card ${ready ? 'ready' : ''}">
    <div class="quest-head"><span class="quest-icon">${def.icon}</span><b>${esc(scene.name)}</b><span class="chip">${have}/${info.step.need}</span></div>
    <span class="quest-title">${esc(def.title)} · step ${info.index + 1} of ${def.steps.length}${finale ? ' · finale' : ''}</span>
    <p class="quest-step">${esc(info.step.text)}${here ? ' <span class="tiny muted">(you are here)</span>' : ''}</p>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <div class="quest-foot">
      <span class="tiny muted">${biomeQuestRewardText(info.step)}${finale ? ` · ⚔️ ${esc(guardianName)} · free boss` : ''}</span>
      ${here ? '' : `<button class="btn btn-ghost btn-sm" data-quest-travel="${sceneKey}">Travel · +${TRAVEL_COINS} 🪙</button>`}
      ${action}
    </div>
  </article>`;
}

function biomeQuestBadge(sceneKey) {
  if (!BIOME_QUESTS[sceneKey]) return '';
  const info = biomeQuestStep(sceneKey);
  if (!info) return '<span class="quest-badge done">✓ quest</span>';
  const progress = biomeQuestProgress(sceneKey);
  return `<span class="quest-badge">🗺️ ${progress.have}/${progress.need}</span>`;
}

function activeQuestKey() {
  const current = state.theme && state.theme.scene;
  if (current && BIOME_QUESTS[current] && biomeQuestStep(current)) return current;
  return BIOME_QUEST_KEYS.find((key) => biomeQuestStep(key)) || null;
}

function questTrackHtml() {
  if (typeof BIOME_QUEST_KEYS === 'undefined' || !BIOME_QUEST_KEYS.length) return '';
  const key = activeQuestKey();
  if (!key) {
    return `<button class="quest-track done" type="button" data-quest-tracker>
      <span class="qt-icon">🏆</span>
      <span class="qt-copy"><b>All district quest lines complete</b><span>Every guardian has been faced.</span></span>
      <span class="qt-progress">${BIOME_QUEST_KEYS.length}/${BIOME_QUEST_KEYS.length}</span>
    </button>`;
  }
  const def = BIOME_QUESTS[key];
  const scene = SCENES[key];
  const info = biomeQuestStep(key);
  const progress = biomeQuestProgress(key);
  const finale = info.index >= def.steps.length - 1;
  return `<button class="quest-track" type="button" data-quest-tracker title="Open district quests">
    <span class="qt-icon">${def.icon}</span>
    <span class="qt-copy"><b>${esc(def.title)} · ${esc(scene.name)}</b><span>${esc(info.step.text)}${finale ? ' · guardian finale' : ''}</span></span>
    <span class="qt-progress">${progress.have}/${progress.need}</span>
  </button>`;
}

function openDistrictQuests() {
  openSheet({
    title: '🗺️ District quests',
    sub: 'Seven GTA districts and six exotic biomes, each with a three-step line. Free entry, free travel, free finale.',
    body: `<p class="quest-intro">Travel to a district, play its games, and look after a sprite on location. Travel is free and pays ${TRAVEL_COINS} coins; every step pays coins, XP, and bond — and the finale pits you against that biome’s guardian at no cost.</p>
      <button class="btn btn-soft btn-block" data-quest-gallery style="margin-bottom:8px">⚔️ Guardian gallery · every biome, unlimited bouts</button>
      <div class="quest-grid" data-quest-grid>${BIOME_QUEST_KEYS.map(biomeQuestCard).join('')}</div>`,
    onMount: (overlay) => {
      if (typeof wireBiomeQuests === 'function') wireBiomeQuests(overlay);
      overlay.querySelector('[data-quest-gallery]')?.addEventListener('click', () => {
        Sfx.click();
        openGuardianGallery();
      });
    },
  });
}

/* ---------------- guardians ---------------- */

const DUEL_WINDOW_SECONDS = 20;

function guardianForScene(sceneKey, index = 0) {
  const scene = SCENES[sceneKey];
  if (!scene) return null;
  /* The named guardian always answers first; the wider roster is for the
     gallery and for "another guardian" after that. */
  if (scene.guardian && ELEMENTS[scene.guardian]) return scene.guardian;
  if (typeof guardianPick === 'function') {
    const picked = guardianPick(sceneKey, index);
    if (picked) return picked;
  }
  let key = (scene.species || [])[0] || null;
  if (!key && scene.gtaBiome && typeof ELEMENT_KEYS !== 'undefined') {
    key = ELEMENT_KEYS.find((k) => ELEMENTS[k] && ELEMENTS[k].gtaHome === sceneKey) || null;
  }
  return key && ELEMENTS[key] ? key : null;
}

function guardianTierChip(key) {
  if (typeof typeEggRarity !== 'function' || typeof TYPE_EGG_RARITIES === 'undefined') return '';
  const tier = TYPE_EGG_RARITIES[typeEggRarity(key)];
  if (!tier) return '';
  return `<span class="chip guardian-tier" style="--tier:${tier.color}">${tier.name}</span>`;
}

function guardianSample(key, stage = 'elder') {
  return {
    id: `guardian-${key}`, element: key, stage, breed: 'puff',
    palette: 'native', pattern: 'plain', accessory: 'none', level: 60, size: 'large',
    name: (ELEMENTS[key] && ELEMENTS[key].name) || 'Guardian',
  };
}

function guardianBiomeRow(sceneKey) {
  const scene = SCENES[sceneKey];
  if (!scene) return '';
  const pool = guardianPoolForScene(sceneKey);
  if (!pool.length) return '';
  const bested = pool.filter((key) => state.guardiansBeaten && state.guardiansBeaten[key]).length;
  return `<button class="guardian-row" data-guardian-biome="${sceneKey}">
    <span class="gr-icon">${scene.emoji}</span>
    <span class="gr-copy"><b>${esc(scene.name)}</b><span class="tiny muted">${pool.length.toLocaleString()} guardians · ${bested} bested</span></span>
    <span class="chip">View</span>
  </button>`;
}

function guardianBiomeIndex() {
  const questKeys = typeof BIOME_QUEST_KEYS !== 'undefined' ? BIOME_QUEST_KEYS : [];
  const others = SCENE_KEYS.filter((key) => !questKeys.includes(key) && guardianPoolForScene(key).length);
  return `<p class="quest-intro">Every creature in the Hollow can guard a place. Bouts are always free — no coins, no energy — and unlimited. Pick an environment, then challenge as many of its guardians as you like.</p>
    ${guardianVaultHtml()}${guardianCustomHtml()}
    <div class="guardian-list">
      ${questKeys.map(guardianBiomeRow).join('')}
      ${others.length ? '<div class="guardian-split">Every other environment</div>' : ''}
      ${others.map(guardianBiomeRow).join('')}
    </div>`;
}

function guardianVaultHtml() {
  if (typeof GUARDIAN_VAULT_DOORS === 'undefined') return '';
  const travels = typeof guardianVaultTravels === 'function' ? guardianVaultTravels() : 0;
  const openCount = GUARDIAN_VAULT_DOORS.filter((door) => guardianVaultOpened(door.id)).length;
  return `<div class="guardian-split">Secret vault doors · ${openCount}/${GUARDIAN_VAULT_DOORS.length} opened · ${travels} travels · free</div>
    <div class="vault-doors">
      ${GUARDIAN_VAULT_DOORS.map((door) => {
        const opened = guardianVaultOpened(door.id);
        const ready = travels >= door.travels;
        return `<div class="vault-door ${opened ? 'opened' : ready ? 'ready' : ''}">
          <span class="vd-icon">${opened ? '📖' : door.icon}</span>
          <span class="vd-copy"><b>${esc(door.name)}</b><span class="tiny muted">${opened ? 'Opened · sprite collected' : `${door.travels} travels · 🪙 ${door.coins}`}</span></span>
          ${opened ? '<span class="chip">✓</span>' : `<button class="btn btn-gold btn-sm" data-vault-door="${door.id}" ${ready ? '' : 'disabled'}>${ready ? 'Open free' : `${travels}/${door.travels}`}</button>`}
        </div>`;
      }).join('')}
    </div>`;
}

function guardianCustomHtml() {
  if (typeof CUSTOM_GUARDIANS === 'undefined') return '';
  const unlocked = (state.customGuardians || []).filter((key) => typeof customGuardianDef === 'function' && customGuardianDef(key));
  const wins = typeof guardianVaultWins === 'function' ? guardianVaultWins() : 0;
  const next = CUSTOM_GUARDIANS.find((guardian) => !unlocked.includes(guardian.key));
  const cards = unlocked.map((key) => {
    const bested = Number(state.guardiansBeaten && state.guardiansBeaten[key]) || 0;
    return `<button class="guardian-card custom" data-guardian-duel="${key}">
      <span class="gc-art">${spriteSVG(guardianSample(key), { expr: 'happy' })}</span>
      <b>${esc(ELEMENTS[key].name)}</b>
      ${guardianTierChip(key)}
      <span class="tiny muted">${bested ? `bested ×${bested}` : 'yours to call'}</span>
    </button>`;
  }).join('');
  return `<div class="guardian-split">Custom guardians · earned free</div>
    ${unlocked.length ? `<div class="guardian-grid">${cards}</div>` : '<p class="tiny muted" style="margin:4px 0">Win two practice bouts and your first custom guardian joins the roster.</p>'}
    ${next ? `<p class="tiny muted" style="margin:6px 0 2px">Next: <b>${esc(next.name)}</b> at ${next.wins} duel wins (${Math.max(0, next.wins - wins)} to go).</p>` : '<p class="tiny muted" style="margin:6px 0 2px">Every custom guardian has joined you.</p>'}`;
}

function guardianBiomeView(sceneKey, limit = 24) {
  const scene = SCENES[sceneKey];
  if (!scene) return guardianBiomeIndex();
  const pool = guardianPoolForScene(sceneKey);
  const visible = Math.max(1, Math.min(pool.length, Number(limit) || 24));
  const sampleKeys = pool.slice(0, visible);
  const rows = sampleKeys.map((key) => {
    const bested = Math.max(0, Number(state.guardiansBeaten && state.guardiansBeaten[key]) || 0);
    return `<button class="guardian-card" data-guardian-duel="${key}">
      <span class="gc-art">${spriteSVG(guardianSample(key), { expr: 'happy' })}</span>
      <b>${esc(ELEMENTS[key].name)}</b>
      ${guardianTierChip(key)}
      <span class="tiny muted">${bested ? `bested ×${bested}` : 'unchallenged'}</span>
    </button>`;
  }).join('');
  const rest = pool.length - sampleKeys.length;
  return `<button class="btn btn-ghost btn-sm" data-guardian-back style="margin-bottom:8px">← All environments</button>
    <div class="between" style="margin-bottom:6px"><b>${scene.emoji} ${esc(scene.name)}</b><span class="chip">${pool.length.toLocaleString()} guardians</span></div>
    <p class="tiny muted" style="margin:0 0 8px;line-height:1.5">Practice bouts here are free and unlimited: win or lose, you can call the next guardian. Wins lift bond and joy.</p>
    <button class="btn btn-gold btn-block" data-guardian-random style="margin-bottom:8px">🎲 Random guardian · free</button>
    <div class="guardian-grid">${rows}</div>
    ${rest > 0 ? `<button class="btn btn-soft btn-block" data-guardian-more style="margin-top:8px">Show ${Math.min(24, rest)} more · ${rest.toLocaleString()} remaining</button>` : '<p class="tiny muted" style="margin-top:8px">Every guardian in this environment is available.</p>'}`;
}

function openGuardianGallery(sceneKey = null) {
  let view = sceneKey && SCENES[sceneKey] ? sceneKey : null;
  let shown = 24;
  openSheet({
    title: '⚔️ Guardian gallery',
    sub: 'Every biome guards a roster. Free, unlimited bouts — no coins, no energy.',
    body: '<div data-guardian-gallery></div>',
    onMount: (overlay, close) => {
      const root = overlay.querySelector('.sheet') || overlay;
      const box = overlay.querySelector('[data-guardian-gallery]');
      const paint = () => { if (box) box.innerHTML = view ? guardianBiomeView(view, shown) : guardianBiomeIndex(); };
      root.addEventListener('click', (event) => {
        const door = event.target.closest('[data-vault-door]');
        if (door) {
          event.preventDefault();
          const res = Actions.openGuardianVault(door.dataset.vaultDoor);
          if (res.ok) {
            Sfx.win();
            burstOn(door, ['🔐', '📖', '✨'], 10);
            toast(`Vault opened · ${res.secret || 'a secret sprite'} + ${res.coins} coins`, '🔐');
          } else {
            Sfx.error();
            toast(res.reason === 'opened' ? 'That door is already open.' : `Travel ${res.need} more time${res.need === 1 ? '' : 's'} to open this door.`, '🔐');
          }
          paint();
          return;
        }
        const biome = event.target.closest('[data-guardian-biome]');
        if (biome) {
          event.preventDefault();
          view = biome.dataset.guardianBiome;
          shown = 24;
          Sfx.click();
          paint();
          return;
        }
        if (event.target.closest('[data-guardian-back]')) {
          event.preventDefault();
          view = null;
          shown = 24;
          Sfx.click();
          paint();
          return;
        }
        const more = event.target.closest('[data-guardian-more]');
        if (more) {
          event.preventDefault();
          shown += 24;
          Sfx.click();
          paint();
          return;
        }
        const random = event.target.closest('[data-guardian-random]');
        if (random) {
          event.preventDefault();
          const pool = view ? guardianPoolForScene(view) : [];
          if (!pool.length) return;
          const guardianKey = pool[Math.floor(Math.random() * pool.length)];
          const scene = view;
          close();
          setTimeout(() => openGuardianDuel(scene, null, { guardianKey, practice: true }), 40);
          return;
        }
        const duel = event.target.closest('[data-guardian-duel]');
        if (duel) {
          event.preventDefault();
          const guardianKey = duel.dataset.guardianDuel;
          /* Custom guardians are not tied to one biome. In the index view they
             fight in the player's current scene instead of a null scene. */
          const scene = view || (state.theme && SCENES[state.theme.scene] ? state.theme.scene : 'grove');
          close();
          setTimeout(() => openGuardianDuel(scene, null, { guardianKey, practice: true }), 40);
        }
      });
      paint();
    },
  });
}

/* ---------------- guardian duel ---------------- */

function openGuardianDuel(sceneKey, onWin, opts = {}) {
  const def = BIOME_QUESTS[sceneKey] || null;
  const scene = SCENES[sceneKey];
  if (!scene) return null;
  const practice = !!opts.practice;
  const guardianKey = opts.guardianKey && ELEMENTS[opts.guardianKey]
    ? opts.guardianKey
    : guardianForScene(sceneKey, opts.index || 0);
  if (!guardianKey) { toast('No guardian answers here yet.', '⚔️'); return null; }
  const guardian = ELEMENTS[guardianKey];
  const tint = sceneTint(sceneKey);
  const active = activeSprite();
  const mine = active && active.stage !== 'egg' && !active.retired
    ? active
    : (typeof hollowSprites === 'function' ? hollowSprites()[0] : active);
  const greeting = (Array.isArray(guardian.greeting) ? guardian.greeting[0] : guardian.greeting) || 'The guardian steps forward.';
  const lines = [
    'The ground answers them.',
    'A clean hit. They barely blink.',
    'They test your footing and find it solid.',
    'The room smells of ozone and old banners.',
    'They nod, almost impressed.',
  ];
  let hp = 100;
  let resolve = 100;
  let windowLeft = DUEL_WINDOW_SECONDS;
  let over = false;
  let timer = null;

  openSheet({
    title: `⚔️ ${esc(guardian.name)}`,
    sub: `${practice ? 'Practice bout' : 'Quest finale'} · free · guardian of ${scene.emoji} ${esc(scene.name)}${def && !practice ? ` · ${esc(def.title)}` : ''}`,
    body: `<div class="guardian-duel-stage" style="background:linear-gradient(180deg, ${tint.b2}, ${tint.b1})">
        <div class="scene-decor">${buildSceneDecor(sceneKey)}</div>
        <span class="duel-guardian">${spriteSVG(guardianSample(guardianKey, 'ancient'), { expr: 'happy' })}<b>${esc(guardian.name)}</b></span>
        ${mine ? `<span class="duel-challenger">${spriteSVG(mine, { expr: 'happy' })}<b>${esc(displayName(mine))}</b></span>` : ''}
      </div>
      <div class="duel-bars">
        <div class="duel-bar"><span>Guardian resolve</span><div class="bar"><i data-duel-hp style="width:100%"></i></div></div>
        <div class="duel-bar"><span>${mine ? esc(displayName(mine)) : 'Your sprite'}</span><div class="bar"><i data-duel-resolve style="width:100%"></i></div></div>
      </div>
      <div class="duel-line" data-duel-line>${esc(greeting)}</div>
      <button class="btn btn-primary btn-block" data-duel-strike>⚔️ Strike</button>
      <div class="row" style="gap:8px;margin-top:8px">
        <button class="btn btn-soft btn-block" data-duel-next>🔄 Another guardian</button>
        <button class="btn btn-ghost btn-block" data-duel-gallery>🧭 Gallery</button>
      </div>
      <div class="hg-result" data-duel-result hidden></div>
      <p class="tiny muted" style="margin-top:8px;line-height:1.5">Free — no coins, no energy. Tap Strike to wear the guardian down inside ${DUEL_WINDOW_SECONDS} seconds. ${practice ? 'Practice bouts are unlimited and pay bond and joy.' : 'Win and the line pays out with a <b>150 coin guardian bonus</b>. If the clock runs out, they offer you another round.'}</p>`,
    onClose: () => { over = true; if (timer) clearInterval(timer); },
    onMount: (overlay, close) => {
      const root = overlay.querySelector('.sheet') || overlay;
      const hpEl = overlay.querySelector('[data-duel-hp]');
      const resolveEl = overlay.querySelector('[data-duel-resolve]');
      const lineEl = overlay.querySelector('[data-duel-line]');
      const resultEl = overlay.querySelector('[data-duel-result]');
      const strikeBtn = overlay.querySelector('[data-duel-strike]');
      const paintBars = () => {
        if (hpEl) hpEl.style.width = `${hp}%`;
        if (resolveEl) resolveEl.style.width = `${resolve}%`;
      };
      const restart = (message) => {
        hp = 100;
        resolve = 100;
        windowLeft = DUEL_WINDOW_SECONDS;
        paintBars();
        if (lineEl) lineEl.textContent = message;
      };
      const win = () => {
        if (over) return;
        over = true;
        if (timer) clearInterval(timer);
        if (strikeBtn) strikeBtn.disabled = true;
        if (practice) {
          const res = Actions.guardianWin(sceneKey, guardianKey);
          if (!res || !res.ok) {
            if (lineEl) lineEl.textContent = 'That guardian cannot answer right now.';
            if (resultEl) {
              resultEl.hidden = false;
              resultEl.innerHTML = '<b>The bout fizzled.</b><span>Close the gallery and try again.</span>';
            }
            Sfx.error();
            return;
          }
          if (lineEl) lineEl.textContent = `${guardian.name} yields. A good bout.`;
          if (resultEl) {
            resultEl.hidden = false;
            resultEl.innerHTML = `<b>Bout won</b><span>💗 +${res.bond} bond · ✨ +${res.xp} XP · joy up · bested ×${res.total}</span>`;
          }
          Sfx.win();
          burstOn(strikeBtn, ['⚔️', '✨', '💗'], 10);
          toast(`${guardian.name} bested in ${scene.name} · bond +${res.bond}.`, '⚔️');
          return;
        }
        const res = Actions.claimBiomeQuest(sceneKey, { won: true });
        if (!res.ok) {
          if (resultEl) {
            resultEl.hidden = false;
            resultEl.innerHTML = '<b>The line is already settled.</b><span>Try a practice bout instead.</span>';
          }
          return;
        }
        const total = res.coins + res.bonus;
        if (lineEl) lineEl.textContent = `${guardian.name} bows. ${scene.name} is yours.`;
        if (resultEl) {
          resultEl.hidden = false;
          resultEl.innerHTML = `<b>Guardian bested!</b><span>🪙 +${total} coins (includes +${res.bonus} guardian bonus) · ✨ +${res.xp} XP</span>`;
        }
        Sfx.win();
        burstOn(strikeBtn, ['⚔️', '✨', '🏆'], 12);
        toast(`${res.title} complete — ${guardian.name} bested · +${total} coins.`, '⚔️');
        if (onWin) onWin();
      };
      timer = setInterval(() => {
        windowLeft -= 1;
        if (windowLeft <= 0 && !over) restart(`${guardian.name} lets the clock run out. They offer you another round.`);
      }, 1000);
      strikeBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (over) return;
        hp = Math.max(0, hp - rand(9, 16));
        resolve = Math.max(0, resolve - rand(2, 5));
        paintBars();
        if (lineEl) lineEl.textContent = pick(lines);
        Sfx.pop();
        burstOn(strikeBtn, ['⚔️', '✨'], 4);
        if (hp <= 0) win();
        else if (resolve <= 0) restart(`${guardian.name} steadies you. Take a breath and strike again.`);
      });
      root.querySelector('[data-duel-next]')?.addEventListener('click', (event) => {
        event.stopPropagation();
        const pool = guardianPoolForScene(sceneKey);
        const next = pool.length > 1 ? pool[(pool.indexOf(guardianKey) + 1) % pool.length] : guardianKey;
        close();
        setTimeout(() => openGuardianDuel(sceneKey, onWin, { guardianKey: next, practice }), 40);
      });
      root.querySelector('[data-duel-gallery]')?.addEventListener('click', (event) => {
        event.stopPropagation();
        close();
        setTimeout(() => openGuardianGallery(sceneKey), 40);
      });
    },
  });
  return true;
}

function wireBiomeQuests(root) {
  const grid = root.querySelector('[data-quest-grid]');
  if (!grid || grid.dataset.questWired) return;
  grid.dataset.questWired = '1';
  const paint = () => { grid.innerHTML = BIOME_QUEST_KEYS.map(biomeQuestCard).join(''); };
  /* The sheet stops propagation at its own boundary. Listen on the grid so
     claim, travel, and finale clicks still reach the quest handlers. */
  grid.addEventListener('click', (event) => {
    event.stopPropagation();
    const travel = event.target.closest('[data-quest-travel]');
    if (travel) {
      event.preventDefault();
      const key = travel.dataset.questTravel;
      const trip = Actions.setTheme({ scene: key });
      Sfx.click();
      toast(`${SCENES[key].emoji} ${SCENES[key].name} · quest line active${trip && trip.coins ? ` · +${trip.coins} coins` : ''}.`, '🗺️');
      /* Travel should actually land in the destination, not leave the player
         staring at the old screen with a new scene selected behind it. */
      if (trip) App.go('hollow');
      else paint();
      return;
    }
    const duel = event.target.closest('[data-quest-duel]');
    if (duel) {
      event.preventDefault();
      Sfx.click();
      openGuardianDuel(duel.dataset.questDuel, paint);
      return;
    }
    const claim = event.target.closest('[data-quest-claim]');
    if (claim) {
      const res = Actions.claimBiomeQuest(claim.dataset.questClaim);
      if (!res.ok) {
        if (res.reason === 'guardian') {
          openGuardianDuel(claim.dataset.questClaim, paint);
          return;
        }
        toast(res.reason === 'progress' ? `${res.need} more to go on this step.` : 'That quest line is already complete.', '🗺️');
        Sfx.error();
        return;
      }
      Sfx.level();
      burstOn(claim, ['🗺️', '🪙', '✨'], 9);
      toast(`${res.title}${res.finished ? ' complete!' : ' step claimed.'} +${res.coins} coins${res.xp ? ` · +${res.xp} XP` : ''}`, '🗺️');
      paint();
    }
  });
}
