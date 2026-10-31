/* Sports activities: Hoop Shot basketball. */

Object.assign(GAME_INFO, SPORT_GAMES);

function sportCount() {
  return Math.max(0, Number(state.stats?.sports) || 0);
}

function sportGiftIn() {
  return SPORT_GIFT_EVERY - (sportCount() % SPORT_GIFT_EVERY);
}

function openSportGame(kind = 'hoop') {
  if (kind === 'goal') openGoalGame(kind);
  else openBasketballGame(kind);
}

function openBasketballGame(kind = 'hoop') {
  const info = SPORT_GAMES[kind];
  if (!info) return;
  const s = activeSprite();
  if (!s) {
    toast('Hatch a sprite first to play sports together.', '🥚');
    return;
  }
  if (s.stage === 'egg') {
    toast('Hatch this egg before heading to the court.', '🥚');
    return;
  }
  Sfx.init();
  const shell = gameOverlayShell(kind);
  const { board } = shell;
  let running = true;
  let shots = 0;
  let made = 0;
  let score = 0;
  let position = 0.1;
  let direction = 1;
  let last = performance.now();
  let raf = 0;
  let tick = 0;
  let endTimer = 0;
  const startedAt = performance.now();

  board.innerHTML = `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#1b2038,#34233b 52%,#6b3f2c 53%,#432b25)">
      <div style="position:absolute;left:9%;top:12%;font-size:42px;filter:drop-shadow(0 8px 10px rgba(0,0,0,.3))">${spriteSVG(s, { expr: 'happy' })}</div>
      <div style="position:absolute;right:8%;top:9%;width:112px;height:88px;border:4px solid #ffb15c;border-radius:50% 50% 8px 8px;background:rgba(255,177,92,.08);box-shadow:0 0 24px rgba(255,177,92,.2)">
        <div style="position:absolute;left:8px;right:8px;top:52%;height:2px;background:rgba(255,255,255,.35)"></div>
        <div style="position:absolute;left:8px;right:8px;top:63%;height:18px;border-left:1px dashed rgba(255,255,255,.35);border-right:1px dashed rgba(255,255,255,.35);border-bottom:1px dashed rgba(255,255,255,.35)"></div>
      </div>
      <div style="position:absolute;left:50%;top:11%;font-size:52px;transform:translateX(-50%);filter:drop-shadow(0 8px 12px rgba(0,0,0,.35))">🏀</div>
      <div style="position:absolute;left:12%;right:12%;bottom:31%;height:24px;border-radius:12px;background:rgba(8,12,24,.62);border:1px solid rgba(255,255,255,.2);overflow:hidden">
        <div style="position:absolute;left:43%;top:0;width:14%;height:100%;background:rgba(255,209,102,.45);border-left:1px solid rgba(255,209,102,.8);border-right:1px solid rgba(255,209,102,.8)"></div>
        <div data-sport-marker style="position:absolute;left:10%;top:-4px;width:7px;height:30px;border-radius:4px;background:#fff;box-shadow:0 0 12px rgba(255,255,255,.75)"></div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:14%;display:flex;flex-direction:column;align-items:center;gap:7px">
        <button class="btn btn-gold" data-shoot style="min-width:180px">Shoot</button>
        <div class="tiny" data-sport-message style="font-weight:750;color:#fff">Tap Shoot in the gold window.</div>
        <div class="tiny muted" data-sport-count>0 / ${info.shots} shots · 0 points</div>
      </div>
      <div style="position:absolute;left:10%;bottom:5%;right:10%;font-size:11px;color:rgba(255,255,255,.7);text-align:center">Perfect window = 3 points · clean window = 2 points</div>
    </div>`;

  const marker = board.querySelector('[data-sport-marker]');
  const message = board.querySelector('[data-sport-message]');
  const count = board.querySelector('[data-sport-count]');
  const shootBtn = board.querySelector('[data-shoot]');
  const goldStart = 0.43;
  const goldEnd = 0.57;
  const cleanStart = 0.3;
  const cleanEnd = 0.7;

  shell.hintEl.textContent = 'Basketball · release at the right moment';
  shell.timerEl.textContent = `${Math.ceil(info.duration / 1000)}s`;
  shell.timerBar.style.width = '100%';

  function paintMeter() {
    marker.style.left = `${Math.max(1, Math.min(99, position * 100))}%`;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    position += direction * 0.52 * dt;
    if (position >= 0.96) {
      position = 0.96;
      direction = -1;
    }
    if (position <= 0.04) {
      position = 0.04;
      direction = 1;
    }
    paintMeter();
    raf = requestAnimationFrame(loop);
  }

  function updateCount() {
    count.textContent = `${shots} / ${info.shots} shots · ${score} points`;
  }

  function finish() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    clearInterval(tick);
    clearTimeout(endTimer);
    const coins = info.baseCoins + score * 4;
    const xp = info.baseXp + score * 2;
    const bond = info.baseBond + made;
    showSportResult(shell, {
      kind,
      score,
      made,
      coins,
      xp,
      bond,
      joy: 14,
    });
  }

  function shoot() {
    if (!running) return;
    shots += 1;
    let points = 0;
    let text = 'Off the rim. Shake it off.';
    if (position >= goldStart && position <= goldEnd) {
      points = 3;
      made += 1;
      text = 'Swish! Perfect release.';
      Sfx.win();
    } else if (position >= cleanStart && position <= cleanEnd) {
      points = 2;
      made += 1;
      text = 'Clean basket!';
      Sfx.coin();
    } else {
      Sfx.error();
    }
    score += points;
    message.textContent = text;
    updateCount();
    paintMeter();
    if (shots >= info.shots) endTimer = setTimeout(finish, 380);
  }

  shootBtn.addEventListener('click', shoot);
  paintMeter();
  raf = requestAnimationFrame(loop);
  tick = setInterval(() => {
    const left = Math.max(0, info.duration - (performance.now() - startedAt));
    shell.timerEl.textContent = `${Math.ceil(left / 1000)}s`;
    shell.timerBar.style.width = `${Math.max(0, (left / info.duration) * 100)}%`;
    if (left <= 0) finish();
  }, 100);
  endTimer = setTimeout(finish, info.duration + 100);

  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    clearInterval(tick);
    clearTimeout(endTimer);
  });
}

function openGoalGame(kind = 'goal') {
  const info = SPORT_GAMES[kind];
  if (!info) return;
  const s = activeSprite();
  if (!s) {
    toast('Hatch a sprite first to play sports together.', '🥚');
    return;
  }
  if (s.stage === 'egg') {
    toast('Hatch this egg before stepping onto the pitch.', '🥚');
    return;
  }
  Sfx.init();
  const shell = gameOverlayShell(kind);
  const { board } = shell;
  let running = true;
  let shots = 0;
  let made = 0;
  let score = 0;
  let position = 0.18;
  let direction = 1;
  let keeperPos = 0.78;
  let keeperDir = -1;
  let last = performance.now();
  let raf = 0;
  let tick = 0;
  let endTimer = 0;
  let resetTimer = 0;
  let cooling = false;
  const startedAt = performance.now();

  board.innerHTML = `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#101b33,#17343a 55%,#2d5c3b 56%,#1c3b28)">
      <div style="position:absolute;left:8%;top:8%;font-size:42px;filter:drop-shadow(0 8px 10px rgba(0,0,0,.3))">${spriteSVG(s, { expr: 'happy' })}</div>
      <div style="position:absolute;right:7%;top:7%;font-size:46px;filter:drop-shadow(0 8px 12px rgba(0,0,0,.35))">⚽</div>
      <div style="position:absolute;left:10%;right:10%;top:15%;height:31%;border:5px solid #f8fafc;border-bottom:0;border-radius:4px 4px 0 0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 1px,transparent 1px 24px),repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0 1px,transparent 1px 24px),rgba(9,22,20,.34);box-shadow:0 0 28px rgba(126,231,135,.14)">
        <div data-goal-keeper style="position:absolute;left:78%;bottom:5%;font-size:42px;transform:translateX(-50%);filter:drop-shadow(0 8px 10px rgba(0,0,0,.35))">🧤</div>
        <div data-goal-ball style="position:absolute;left:18%;bottom:-16px;font-size:26px;transform:translateX(-50%);filter:drop-shadow(0 8px 10px rgba(0,0,0,.4))">⚽</div>
      </div>
      <div style="position:absolute;left:10%;right:10%;top:52%;display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.62)"><span>◀ wide</span><span>KICK PAST THE KEEPER</span><span>wide ▶</span></div>
      <div style="position:absolute;left:0;right:0;bottom:12%;display:flex;flex-direction:column;align-items:center;gap:7px">
        <button class="btn btn-gold" data-kick style="min-width:180px">Kick</button>
        <div class="tiny" data-goal-message style="font-weight:750;color:#fff;text-align:center;max-width:280px">Kick when the ball is away from the keeper.</div>
        <div class="tiny muted" data-goal-count>0 / ${info.shots} kicks · 0 points</div>
      </div>
      <div style="position:absolute;left:10%;bottom:4%;right:10%;font-size:11px;color:rgba(255,255,255,.7);text-align:center">Open space = 3 points · close = 2 points · saved = 0</div>
    </div>`;

  const ball = board.querySelector('[data-goal-ball]');
  const keeper = board.querySelector('[data-goal-keeper]');
  const message = board.querySelector('[data-goal-message]');
  const count = board.querySelector('[data-goal-count]');
  const kickBtn = board.querySelector('[data-kick]');

  shell.hintEl.textContent = 'Soccer · find the open corner';
  shell.timerEl.textContent = `${Math.ceil(info.duration / 1000)}s`;
  shell.timerBar.style.width = '100%';

  function paint() {
    ball.style.left = `${Math.max(4, Math.min(96, position * 100))}%`;
    keeper.style.left = `${Math.max(4, Math.min(96, keeperPos * 100))}%`;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    position += direction * 0.42 * dt;
    keeperPos += keeperDir * 0.54 * dt;
    if (position >= 0.94) { position = 0.94; direction = -1; }
    if (position <= 0.06) { position = 0.06; direction = 1; }
    if (keeperPos >= 0.9) { keeperPos = 0.9; keeperDir = -1; }
    if (keeperPos <= 0.1) { keeperPos = 0.1; keeperDir = 1; }
    paint();
    raf = requestAnimationFrame(loop);
  }

  function updateCount() {
    count.textContent = `${shots} / ${info.shots} kicks · ${score} points`;
  }

  function finish() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    clearInterval(tick);
    clearTimeout(endTimer);
    clearTimeout(resetTimer);
    showSportResult(shell, {
      kind, score, made,
      coins: info.baseCoins + score * 4,
      xp: info.baseXp + score * 2,
      bond: info.baseBond + made,
      joy: 14,
    });
  }

  function kick() {
    if (!running || cooling) return;
    cooling = true;
    kickBtn.disabled = true;
    shots += 1;
    const gap = Math.abs(position - keeperPos);
    let points = 0;
    let text = 'Saved! The keeper read the shot.';
    if (gap >= 0.24) {
      points = 3; made += 1;
      text = 'Top corner! The keeper had no chance.';
      Sfx.win();
    } else if (gap >= 0.12) {
      points = 2; made += 1;
      text = 'Squeezed it past the keeper!';
      Sfx.coin();
    } else {
      Sfx.error();
    }
    score += points;
    message.textContent = text;
    updateCount();
    paint();
    if (shots >= info.shots) {
      endTimer = setTimeout(finish, 700);
    } else {
      resetTimer = setTimeout(() => {
        if (!running) return;
        cooling = false;
        kickBtn.disabled = false;
        message.textContent = 'Kick when the ball is away from the keeper.';
      }, 620);
    }
  }

  kickBtn.addEventListener('click', kick);
  paint();
  raf = requestAnimationFrame(loop);
  tick = setInterval(() => {
    const left = Math.max(0, info.duration - (performance.now() - startedAt));
    shell.timerEl.textContent = `${Math.ceil(left / 1000)}s`;
    shell.timerBar.style.width = `${Math.max(0, (left / info.duration) * 100)}%`;
    if (left <= 0) finish();
  }, 100);
  endTimer = setTimeout(finish, info.duration + 100);

  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    clearInterval(tick);
    clearTimeout(endTimer);
    clearTimeout(resetTimer);
  });
}

function showSportResult(shell, data) {
  const info = SPORT_GAMES[data.kind];
  const preview = gameCoinPayout(data.coins);
  const total = Math.max(1, Number(info.shots) || 1);
  const heading = data.made >= Math.ceil(total * 0.7)
    ? (data.kind === 'goal' ? 'Golden boots!' : 'Sharpshooter!')
    : data.made >= Math.ceil(total * 0.4)
      ? (data.kind === 'goal' ? 'Nice footwork!' : 'Nice buckets!')
      : (data.kind === 'goal' ? 'Final whistle' : 'Final buzzer');
  const unit = info.unit || 'basket';
  const result = document.createElement('div');
  result.className = 'game-result';
  result.innerHTML = `<div class="gr-inner">
      <div class="gr-emoji">${info.icon}</div>
      <h3>${heading}</h3>
      <p class="muted small">${displayName(activeSprite())} scored ${data.score} points with ${data.made} ${unit}${data.made === 1 ? '' : 's'}.</p>
      <div class="gr-rewards">
        <span class="chip">🪙 +${preview.payout.toLocaleString()}</span>
        <span class="chip">⭐ +${data.xp} XP</span>
        <span class="chip">💗 +${Math.round(data.bond)} bond</span>
        <span class="chip">🍲 +1 pantry food</span>
        <span class="chip">🎁 sport gift progress</span>
      </div>
      <p class="tiny muted" style="margin:8px 0 0;line-height:1.5;text-align:center">Every ${SPORT_GIFT_EVERY} sports games earns a bonus gift with coins and a snack.</p>
      <button class="btn btn-gold btn-block" data-collect style="margin-top:14px">Collect rewards</button>
    </div>`;
  shell.board.appendChild(result);
  let collected = false;
  result.querySelector('[data-collect]').addEventListener('click', (event) => {
    if (collected) return;
    collected = true;
    const res = Actions.finishSport(data);
    if (!res.ok) {
      toast('That game could not be saved. Try again from Activities.', '🏀');
      shell.close();
      return;
    }
    let text = `+${res.coins.toLocaleString()} coins · +${res.xp} XP · +${Math.round(res.bond)} bond`;
    if (res.foodKey) text += ` · ${FOODS[res.foodKey].emoji} ${FOODS[res.foodKey].name}`;
    if (res.gift) text += ` · 🎁 +${res.gift.coins} coins & ${SNACKS[res.gift.snackKey].name}`;
    if (res.careGift) text += ` · 🌈 Care Package: +${res.careGift.coins} coins, +${res.careGift.xp} XP, ${SNACKS[res.careGift.snackKey].name}${res.careGift.foodKey ? ` & ${FOODS[res.careGift.foodKey].name}` : ''}`;
    toast(text, info.icon);
    burstOn(event.currentTarget, [info.icon, '🪙', '✨', '🍲'], 10);
    Sfx.win();
    shell.close();
    if (typeof App !== 'undefined' && App.refresh) App.refresh();
  });
}
