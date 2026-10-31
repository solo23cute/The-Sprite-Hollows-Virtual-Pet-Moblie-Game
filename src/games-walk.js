/* Trail walks: take the active sprite outside for coins, XP, bond, and gifts. */

Object.assign(GAME_INFO, WALK_ROUTES);

function walkCount() {
  return Math.max(0, Number(state.stats?.walks) || 0);
}

function walkRouteUnlocked(kind) {
  const route = WALK_ROUTES[kind];
  return !!route && walkCount() >= (route.walkUnlock || 0);
}

function walkGiftIn() {
  return WALK_GIFT_EVERY - (walkCount() % WALK_GIFT_EVERY);
}

function walkRouteCards() {
  const walks = walkCount();
  return WALK_GAME_KEYS.map((key) => {
    const route = WALK_ROUTES[key];
    const missing = Math.max(0, (route.walkUnlock || 0) - walks);
    const locked = missing > 0;
    return `<button class="card" data-walk-route="${key}" ${locked ? 'disabled' : ''} style="display:flex;gap:12px;align-items:center;text-align:left;padding:12px;margin-top:8px;width:100%;${locked ? 'opacity:.58' : ''}">
      <span style="font-size:30px;flex:none">${locked ? '🔒' : route.icon}</span>
      <span style="flex:1;min-width:0">
        <b style="display:block;font-size:13px">${esc(route.title)}</b>
        <span class="tiny muted" style="display:block;line-height:1.45">${locked ? `Take ${missing} more walk${missing === 1 ? '' : 's'} to unlock this trail.` : esc(route.desc)}</span>
        <span class="row" style="gap:4px;flex-wrap:wrap;margin-top:5px">
          <span class="chip">🪙 +${route.baseCoins}</span>
          <span class="chip">⭐ +${route.baseXp} XP</span>
          <span class="chip">💗 +${route.baseBond} bond</span>
          <span class="chip">🎲 trail upgrade</span>
          ${locked ? `<span class="chip">🔒 ${route.walkUnlock} walks</span>` : ''}
        </span>
      </span>
      <span class="go">${locked ? '' : icon('chevron')}</span>
    </button>`;
  }).join('');
}

function openWalkSheet() {
  const s = activeSprite();
  if (!s) {
    toast('Hatch a sprite first, then you can take them walking.', '🥾');
    return;
  }
  if (s.stage === 'egg') {
    toast('Warm and hatch this egg before taking a walk.', '🥚');
    return;
  }
  const walks = walkCount();
  const distance = Math.round(Number(state.stats?.walkDistance) || 0);
  const giftIn = walkGiftIn();
  openSheet({
    title: '🥾 Take a walk',
    sub: `${displayName(s)} is ready for the trail. ${walks} walk${walks === 1 ? '' : 's'} · ${distance.toLocaleString()} m traveled.`,
    body: `<div class="card" style="padding:12px;margin-bottom:8px">
        <div class="between"><b>Fresh air, full hearts</b><span class="chip">🎁 Trail gift in ${giftIn} walk${giftIn === 1 ? '' : 's'}</span></div>
        <p class="tiny muted" style="margin:6px 0 0;line-height:1.55">Walking restores joy and builds extra bond, pays coins and XP, and works toward a Trail Gift every ${WALK_GIFT_EVERY} walks. Every finished trail also rolls a <b style="color:var(--text)">Trail Upgrade</b>: raise this sprite's type tier, evolve it to its next stage, or take a big coin bonus. Longer trails unlock as you walk and roll upgrades more often.</p>
      </div>
      <div class="tiny muted" style="margin:10px 0 0;font-weight:800;letter-spacing:.08em">CHOOSE A TRAIL</div>
      ${walkRouteCards()}
      <p class="tiny muted" style="margin:12px 0 0;line-height:1.5;text-align:center">Walks spend a little energy and hunger. A snack and a nap afterward are good care.</p>`,
    onMount: (sheet, close) => {
      sheet.querySelectorAll('[data-walk-route]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.walkRoute;
          if (!walkRouteUnlocked(key)) {
            const route = WALK_ROUTES[key];
            toast(`Take ${Math.max(0, route.walkUnlock - walkCount())} more walk${route.walkUnlock - walkCount() === 1 ? '' : 's'} to unlock ${route.title}.`, '🔒');
            Sfx.error();
            return;
          }
          close();
          setTimeout(() => openWalkGame(key), 40);
        });
      });
    },
  });
}

function openWalkGame(kind) {
  const route = WALK_ROUTES[kind];
  if (!route) return;
  if (!walkRouteUnlocked(kind)) {
    toast(`Take ${Math.max(0, route.walkUnlock - walkCount())} more walk${route.walkUnlock - walkCount() === 1 ? '' : 's'} to unlock ${route.title}.`, '🔒');
    Sfx.error();
    return;
  }
  const s = activeSprite();
  if (!s) {
    toast('Hatch a sprite first to walk together.', '🥚');
    return;
  }
  if (s.stage === 'egg') {
    toast('Hatch this egg before taking a walk.', '🥚');
    return;
  }
  Sfx.init();
  const shell = gameOverlayShell(kind);
  const { board } = shell;
  let score = 0;
  let bonusCoins = 0;
  let giftTokens = 0;
  let running = true;
  let spawnTimer = 0;
  let tickTimer = 0;
  let endTimer = 0;
  const startedAt = performance.now();
  const targetTypes = [
    ['paw', '🐾', 62],
    ['coin', '🪙', 17],
    ['gift', '🎁', 11],
    ['puddle', '💧', 10],
  ];

  board.innerHTML = `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#162b4a 0%,#24485a 42%,#3b6846 74%,#244b35 100%)">
      <div style="position:absolute;left:10%;top:11%;font-size:24px;opacity:.8">☁️</div>
      <div style="position:absolute;right:12%;top:17%;font-size:18px;opacity:.65">☁️</div>
      <div style="position:absolute;left:4%;right:4%;bottom:4%;height:42%;border-radius:48% 52% 0 0;background:rgba(126,231,135,.16);border-top:2px dashed rgba(255,255,255,.2)"></div>
      <div style="position:absolute;left:9%;bottom:10%;width:78%;height:2px;background:rgba(255,255,255,.22);border-radius:2px"></div>
      <div style="position:absolute;left:9%;bottom:9%;font-size:13px;opacity:.7">🌱</div>
      <div style="position:absolute;left:38%;bottom:9%;font-size:13px;opacity:.7">🌿</div>
      <div style="position:absolute;left:68%;bottom:9%;font-size:13px;opacity:.7">🌼</div>
      <div data-walk-pet style="position:absolute;left:6%;bottom:12%;width:82px;height:82px;transition:left .28s ease;filter:drop-shadow(0 8px 12px rgba(0,0,0,.3))">${spriteSVG(s, { expr: 'happy' })}</div>
      <div data-walk-targets style="position:absolute;inset:0"></div>
      <div style="position:absolute;left:10px;right:10px;bottom:6px;display:flex;justify-content:space-between;align-items:center;gap:6px;padding:7px 9px;border-radius:12px;background:rgba(8,12,24,.52);backdrop-filter:blur(8px)">
        <b data-walk-message style="font-size:10.5px;line-height:1.35;flex:1">Tap pawprints, coins, and gifts. Puddles trip you.</b>
        <span class="chip" style="flex:none">${route.icon} ${esc(route.title)}</span>
        <button class="btn btn-ghost btn-sm" data-walk-end style="flex:none;font-size:10px;padding:6px 7px">Head home</button>
      </div>
    </div>`;

  const pet = board.querySelector('[data-walk-pet]');
  const targetArea = board.querySelector('[data-walk-targets]');
  const message = board.querySelector('[data-walk-message]');
  shell.hintEl.textContent = 'Tap the trail. Every pawprint is a step.';
  shell.timerEl.textContent = `${Math.ceil(route.duration / 1000)}s`;
  shell.timerBar.style.width = '100%';

  function paint() {
    shell.scoreEl.textContent = String(score);
    pet.style.left = `${6 + Math.min(78, (score / route.goal) * 78)}%`;
  }

  function finishWalkRound() {
    if (!running) return;
    running = false;
    clearInterval(spawnTimer);
    clearInterval(tickTimer);
    clearTimeout(endTimer);
    targetArea.innerHTML = '';
    const distance = Math.round(score * route.stride);
    const coins = route.baseCoins + score * route.coinStep + bonusCoins;
    const xp = route.baseXp + score * route.xpStep;
    const bond = route.baseBond + Math.floor(score * route.bondStep);
    showWalkResult(shell, {
      route: kind,
      score,
      distance,
      coins,
      xp,
      bond,
      joy: 12 + Math.min(8, Math.floor(score / 5)),
      giftTokens,
    });
  }

  function addTarget() {
    if (!running) return;
    const roll = Math.random() * 100;
    let cursor = 0;
    let type = targetTypes[0];
    for (const candidate of targetTypes) {
      cursor += candidate[2];
      if (roll <= cursor) {
        type = candidate;
        break;
      }
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'walk-token';
    btn.dataset.kind = type[0];
    btn.setAttribute('aria-label', type[0] === 'puddle' ? 'Puddle — do not tap' : type[0] === 'gift' ? 'Gift token' : type[0] === 'coin' ? 'Coin token' : 'Pawprint');
    btn.textContent = type[1];
    btn.style.left = `${8 + Math.random() * 76}%`;
    btn.style.top = `${12 + Math.random() * 50}%`;
    btn.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!running || btn.dataset.hit) return;
      btn.dataset.hit = '1';
      if (type[0] === 'puddle') {
        score = Math.max(0, score - 2);
        message.textContent = 'Splash! Shake it off and keep going.';
        Sfx.error();
      } else if (type[0] === 'gift') {
        score += 3;
        bonusCoins += 9;
        giftTokens += 1;
        message.textContent = 'A gift token! The trail is generous today.';
        Sfx.coin();
      } else if (type[0] === 'coin') {
        score += 2;
        bonusCoins += 5;
        message.textContent = 'A shiny coin for the walk home.';
        Sfx.coin();
      } else {
        score += 1;
        message.textContent = 'Nice pawprint. Keep the rhythm.';
        Sfx.pop();
      }
      btn.remove();
      paint();
    }, { once: true });
    targetArea.appendChild(btn);
    setTimeout(() => { if (btn.isConnected) btn.remove(); }, 1500);
  }

  spawnTimer = setInterval(addTarget, route.spawnMs || 560);
  tickTimer = setInterval(() => {
    const left = Math.max(0, route.duration - (performance.now() - startedAt));
    shell.timerEl.textContent = `${Math.ceil(left / 1000)}s`;
    shell.timerBar.style.width = `${Math.max(0, (left / route.duration) * 100)}%`;
    if (left <= 0) finishWalkRound();
  }, 100);
  endTimer = setTimeout(finishWalkRound, route.duration + 120);
  board.querySelector('[data-walk-end]')?.addEventListener('click', finishWalkRound);
  setTimeout(addTarget, 500);
  paint();

  shell.addCleanup(() => {
    running = false;
    clearInterval(spawnTimer);
    clearInterval(tickTimer);
    clearTimeout(endTimer);
  });
}

function showWalkResult(shell, data) {
  const route = WALK_ROUTES[data.route];
  const preview = gameCoinPayout(data.coins);
  const result = document.createElement('div');
  result.className = 'game-result';
  result.innerHTML = `<div class="gr-inner">
      <div class="gr-emoji">🥾</div>
      <h3>${esc(route.title)} complete!</h3>
      <p class="muted small">${displayName(activeSprite())} walked ${data.distance.toLocaleString()} m and came home glowing.</p>
      <div class="gr-rewards">
        <span class="chip">🪙 +${preview.payout.toLocaleString()}</span>
        <span class="chip">⭐ +${data.xp} XP</span>
        <span class="chip">💗 +${Math.round(data.bond)} bond</span>
        ${route.foodChance ? '<span class="chip">🍲 food chance</span>' : ''}
        <span class="chip">🎲 tier · evolve · coins</span>
        ${data.giftTokens ? `<span class="chip">🎁 ${data.giftTokens} trail token${data.giftTokens === 1 ? '' : 's'}</span>` : ''}
      </div>
      <p class="tiny muted" style="margin:8px 0 0;line-height:1.5;text-align:center">Every ${WALK_GIFT_EVERY} walks opens a Trail Gift. Every third walk also pays bonus coins and a snack. Trail Upgrades can raise a type tier, evolve a stage, or add a coin bonus.</p>
      <button class="btn btn-gold btn-block" data-collect style="margin-top:14px">Collect rewards</button>
    </div>`;
  shell.board.appendChild(result);
  let collected = false;
  result.querySelector('[data-collect]').addEventListener('click', (event) => {
    if (collected) return;
    collected = true;
    const res = Actions.finishWalk(data);
    if (!res.ok) {
      toast('That walk could not be saved. Try again from the Hollow.', '🥾');
      shell.close();
      return;
    }
    let message = `+${res.coins.toLocaleString()} coins · +${res.xp} XP · +${Math.round(res.bond)} bond · ${res.distance} m`;
    if (res.foodKey) message += ` · ${FOODS[res.foodKey].emoji} ${FOODS[res.foodKey].name}`;
    if (res.gift) message += ` · 🎁 Trail Gift: +${res.gift.coins} coins & ${SNACKS[res.gift.snackKey].name}`;
    if (res.unlocked?.length) message += ` · Unlocked ${res.unlocked.map((key) => WALK_ROUTES[key].title).join(' & ')}!`;
    if (res.trail?.kind === 'tier') message += ` · ✨ Tier up: ${res.trail.from} → ${res.trail.to}!`;
    else if (res.trail?.kind === 'evolve') message += ` · 🌟 Evolved: ${res.trail.from} → ${res.trail.to}!`;
    else if (res.trail?.kind === 'coins' && res.trail.coins) message += ` · 🎲 Trail bonus +${res.trail.coins} coins`;
    if (res.careGift) message += ` · 🌈 Care Package: +${res.careGift.coins} coins, +${res.careGift.xp} XP, ${SNACKS[res.careGift.snackKey].name}${res.careGift.foodKey ? ` & ${FOODS[res.careGift.foodKey].name}` : ''}`;
    toast(message, '🥾');
    burstOn(event.currentTarget, ['🥾', '🪙', '✨', '💗'], 10);
    Sfx.win();
    shell.close();
    if (typeof App !== 'undefined' && App.refresh) App.refresh();
  });
}
