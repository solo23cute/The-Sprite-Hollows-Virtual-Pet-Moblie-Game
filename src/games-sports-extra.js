/* Extra sports: Tennis Rally, Bowling, Home Run Derby, and Volleyball.
   Loaded after games-sports.js so the shared result screen is available. */

function sportShellSetup(shell, kind, hint) {
  const info = SPORT_GAMES[kind];
  shell.hintEl.textContent = hint;
  shell.timerEl.textContent = `${Math.ceil(info.duration / 1000)}s`;
  shell.timerBar.style.width = '100%';
}

function sportCountdown(shell, info, onEnd) {
  const startedAt = performance.now();
  const tick = setInterval(() => {
    const left = Math.max(0, info.duration - (performance.now() - startedAt));
    shell.timerEl.textContent = `${Math.ceil(left / 1000)}s`;
    shell.timerBar.style.width = `${Math.max(0, (left / info.duration) * 100)}%`;
    if (left <= 0) onEnd();
  }, 100);
  shell.addCleanup(() => clearInterval(tick));
  return tick;
}

/* ---------------- TENNIS RALLY ---------------- */
function openTennisGame(kind = 'tennis') {
  const info = SPORT_GAMES[kind];
  const s = activeSprite();
  if (!s || s.stage === 'egg') {
    toast('Hatch a sprite first to play sports together.', '🥚');
    return;
  }
  Sfx.init();
  const shell = gameOverlayShell(kind);
  const { board } = shell;
  let running = true;
  let swings = 0;
  let made = 0;
  let score = 0;
  let position = 0.15;
  let direction = 1;
  let side = -1;
  let raf = 0;
  let last = performance.now();
  let endTimer = 0;

  board.innerHTML = `<div class="sport-court" style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#122b1f,#1f5c3a 52%,#2d7d4c)">
      <div style="position:absolute;left:50%;top:0;bottom:0;width:3px;background:rgba(255,255,255,.4)"></div>
      <div style="position:absolute;left:6%;right:6%;top:44%;height:2px;background:rgba(255,255,255,.3);border-top:1px dashed rgba(255,255,255,.35)"></div>
      <div style="position:absolute;left:8%;top:8%;width:42px">${spriteSVG(s, { expr: 'happy' })}</div>
      <div style="position:absolute;right:8%;top:8%;width:36px;transform:scaleX(-1)">${spriteSVG({ ...s, id: `${s.id}-foe` }, { expr: 'idle' })}</div>
      <div data-tennis-ball style="position:absolute;left:30%;top:40%;font-size:26px;transform:translate(-50%,-50%)">🎾</div>
      <div style="position:absolute;left:10%;right:10%;bottom:31%;height:26px;border-radius:13px;background:rgba(6,18,12,.6);border:1px solid rgba(255,255,255,.22);overflow:hidden">
        <div style="position:absolute;left:34%;top:0;width:32%;height:100%;background:rgba(126,231,135,.35);border-left:1px solid #7ee787;border-right:1px solid #7ee787"></div>
        <div data-tennis-marker style="position:absolute;left:15%;top:-4px;width:7px;height:34px;border-radius:4px;background:#fff;box-shadow:0 0 12px rgba(255,255,255,.8)"></div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:12%;display:flex;flex-direction:column;align-items:center;gap:7px">
        <button class="btn btn-gold" data-tennis-hit style="min-width:190px">Return</button>
        <div class="tiny" data-tennis-msg style="font-weight:750;color:#fff;text-align:center;max-width:280px">Return when the ball crosses the green zone.</div>
        <div class="tiny muted" data-tennis-count>0 / ${info.shots} returns · 0 points</div>
      </div>
      <div style="position:absolute;left:10%;bottom:4%;right:10%;font-size:10.5px;color:rgba(255,255,255,.7);text-align:center">Centre of the zone = 3 points · edge = 2</div>
    </div>`;

  const ball = board.querySelector('[data-tennis-ball]');
  const marker = board.querySelector('[data-tennis-marker]');
  const message = board.querySelector('[data-tennis-msg]');
  const count = board.querySelector('[data-tennis-count]');
  const hitBtn = board.querySelector('[data-tennis-hit]');

  sportShellSetup(shell, kind, 'Tennis · keep the rally alive');

  function paint() {
    marker.style.left = `${Math.max(2, Math.min(98, position * 100))}%`;
    const sway = side < 0 ? 1 - position : position;
    ball.style.left = `${18 + sway * 58}%`;
    ball.style.top = `${32 + Math.sin(position * Math.PI) * 22}%`;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    position += direction * 0.5 * dt;
    if (position >= 0.95) { position = 0.95; direction = -1; }
    if (position <= 0.05) { position = 0.05; direction = 1; }
    paint();
    raf = requestAnimationFrame(loop);
  }

  function paintCount() {
    count.textContent = `${swings} / ${info.shots} returns · ${score} points`;
  }

  function finish() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
    showSportResult(shell, {
      kind, score, made,
      coins: info.baseCoins + score * 4,
      xp: info.baseXp + score * 2,
      bond: info.baseBond + made,
      joy: 15,
    });
  }

  function returnBall() {
    if (!running) return;
    swings += 1;
    const dist = Math.abs(position - 0.5);
    let points = 0;
    let text = 'Long! The ball sails past the baseline.';
    if (dist <= 0.09) {
      points = 3; made += 1;
      text = 'Clean winner down the line!';
      Sfx.win();
    } else if (dist <= 0.19) {
      points = 2; made += 1;
      text = 'Rally saved!';
      Sfx.coin();
    } else {
      Sfx.error();
    }
    score += points;
    side *= -1;
    message.textContent = text;
    paintCount();
    if (swings >= info.shots) endTimer = setTimeout(finish, 420);
  }

  hitBtn.addEventListener('click', returnBall);
  paint();
  paintCount();
  raf = requestAnimationFrame(loop);
  sportCountdown(shell, info, finish);
  endTimer = setTimeout(finish, info.duration + 100);
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
  });
}

/* ---------------- BOWLING ---------------- */
function openBowlingGame(kind = 'bowling') {
  const info = SPORT_GAMES[kind];
  const s = activeSprite();
  if (!s || s.stage === 'egg') {
    toast('Hatch a sprite first to play sports together.', '🥚');
    return;
  }
  Sfx.init();
  const shell = gameOverlayShell(kind);
  const { board } = shell;
  let running = true;
  let frames = 0;
  let pins = 0;
  let score = 0;
  let stage = 'aim';
  let aim = 0.5;
  let power = 0.35;
  let direction = 1;
  let raf = 0;
  let last = performance.now();
  let endTimer = 0;

  board.innerHTML = `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#151326,#241a3d 50%,#4a2a1a 51%,#2a1610)">
      <div style="position:absolute;left:8%;bottom:14%;width:44px">${spriteSVG(s, { expr: 'happy' })}</div>
      <div style="position:absolute;left:8%;right:8%;top:14%;display:flex;justify-content:space-around;font-size:24px;opacity:.95">
        ${'🎳'.repeat(3)}<span style="font-size:30px">🎳</span>${'🎳'.repeat(3)}
      </div>
      <div style="position:absolute;left:16%;right:16%;top:38%;height:16px;border-radius:8px;background:rgba(8,8,16,.55);border:1px solid rgba(255,255,255,.16);overflow:hidden">
        <div data-bowl-aim style="position:absolute;left:47%;top:0;width:6%;height:100%;background:#8be9ff"></div>
      </div>
      <div style="position:absolute;left:16%;right:16%;top:47%;height:14px;border-radius:7px;background:rgba(8,8,16,.55);border:1px solid rgba(255,255,255,.16);overflow:hidden">
        <div data-bowl-power style="position:absolute;left:0;top:0;width:35%;height:100%;background:linear-gradient(90deg,#7ee787,#ffd166,#ff8a5c)"></div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:16%;display:flex;flex-direction:column;align-items:center;gap:7px">
        <button class="btn btn-gold" data-bowl-btn style="min-width:200px">Lock the aim</button>
        <div class="tiny" data-bowl-msg style="font-weight:750;color:#fff;text-align:center;max-width:290px">Pick the lane first, then lock in the power.</div>
        <div class="tiny muted" data-bowl-count>Frame 1 / ${info.shots} · 0 pins</div>
      </div>
    </div>`;

  const aimBar = board.querySelector('[data-bowl-aim]');
  const powerBar = board.querySelector('[data-bowl-power]');
  const message = board.querySelector('[data-bowl-msg]');
  const count = board.querySelector('[data-bowl-count]');
  const actionBtn = board.querySelector('[data-bowl-btn]');

  sportShellSetup(shell, kind, 'Bowling · two taps, one lane');

  function paint() {
    aimBar.style.left = `${Math.max(0, Math.min(94, aim * 100))}%`;
    powerBar.style.width = `${Math.round(power * 100)}%`;
  }

  function countPaint() {
    count.textContent = `Frame ${Math.min(info.shots, frames + 1)} / ${info.shots} · ${score} pins`;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (stage === 'aim') {
      aim += direction * 0.42 * dt;
      if (aim >= 0.94) { aim = 0.94; direction = -1; }
      if (aim <= 0.04) { aim = 0.04; direction = 1; }
    } else if (stage === 'power') {
      power += direction * 0.75 * dt;
      if (power >= 1) { power = 1; direction = -1; }
      if (power <= 0.12) { power = 0.12; direction = 1; }
    }
    paint();
    raf = requestAnimationFrame(loop);
  }

  function finish() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
    showSportResult(shell, {
      kind, score, made: Math.min(info.shots, frames),
      coins: info.baseCoins + score * 3,
      xp: info.baseXp + score,
      bond: info.baseBond + Math.min(info.shots, frames),
      joy: 15,
    });
  }

  function throwBall() {
    if (!running) return;
    if (stage === 'aim') {
      stage = 'power';
      power = 0.15;
      direction = 1;
      actionBtn.textContent = 'Throw!';
      message.textContent = 'Now lock the power while it is in the sweet range.';
      Sfx.tick();
      return;
    }
    if (stage !== 'power') return;
    frames += 1;
    const aimScore = 1 - Math.abs(0.5 - aim) * 2;
    const powerScore = 1 - Math.abs(0.72 - power) * 1.35;
    const quality = Math.max(0, aimScore * 0.6 + powerScore * 0.4);
    let knocked = Math.round(10 * Math.min(1, quality * 1.15));
    if (quality > 0.92) knocked = 10;
    knocked = Math.max(0, Math.min(10, knocked));
    pins += knocked;
    score += knocked;
    const strike = knocked === 10;
    message.textContent = strike
      ? 'STRIKE! The whole rack goes down.'
      : knocked >= 7 ? `${knocked} pins. Strong frame.` : knocked >= 3 ? `${knocked} pins, right down the middle.` : 'Gutter ball. The pins never flinched.';
    if (strike) Sfx.win(); else if (knocked >= 3) Sfx.coin(); else Sfx.error();
    stage = 'aim';
    direction = 1;
    power = 0.35;
    actionBtn.textContent = 'Lock the aim';
    countPaint();
    if (frames >= info.shots) endTimer = setTimeout(finish, 640);
  }

  actionBtn.addEventListener('click', throwBall);
  paint();
  countPaint();
  raf = requestAnimationFrame(loop);
  sportCountdown(shell, info, finish);
  endTimer = setTimeout(finish, info.duration + 100);
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
  });
}

/* ---------------- HOME RUN DERBY ---------------- */
function openHomerunGame(kind = 'homerun') {
  const info = SPORT_GAMES[kind];
  const s = activeSprite();
  if (!s || s.stage === 'egg') {
    toast('Hatch a sprite first to play sports together.', '🥚');
    return;
  }
  Sfx.init();
  const shell = gameOverlayShell(kind);
  const { board } = shell;
  let running = true;
  let swings = 0;
  let made = 0;
  let score = 0;
  let position = 0;
  let raf = 0;
  let last = performance.now();
  let endTimer = 0;
  let resetTimer = 0;
  let cooling = false;

  board.innerHTML = `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#0f2140,#1d3f63 46%,#2c6b3c 47%,#1b4227)">
      <div style="position:absolute;left:8%;top:9%;width:44px">${spriteSVG(s, { expr: 'happy' })}</div>
      <div style="position:absolute;right:8%;top:8%;font-size:44px">⚾</div>
      <div style="position:absolute;left:8%;right:8%;top:26%;height:40%;border:3px dashed rgba(255,255,255,.28);border-radius:6px;background:rgba(8,20,14,.28)"></div>
      <div data-homer-ball style="position:absolute;right:16%;top:30%;font-size:26px">⚾</div>
      <div style="position:absolute;left:12%;right:12%;bottom:31%;height:22px;border-radius:11px;background:rgba(6,14,10,.62);border:1px solid rgba(255,255,255,.2);overflow:hidden">
        <div style="position:absolute;left:52%;top:0;width:22%;height:100%;background:rgba(255,209,102,.42);border-left:1px solid #ffd166;border-right:1px solid #ffd166"></div>
        <div data-homer-marker style="position:absolute;left:0;top:-4px;width:6px;height:30px;border-radius:4px;background:#fff"></div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:13%;display:flex;flex-direction:column;align-items:center;gap:7px">
        <button class="btn btn-gold" data-homer-swing style="min-width:190px">Swing</button>
        <div class="tiny" data-homer-msg style="font-weight:750;color:#fff;text-align:center;max-width:280px">Swing when the pitch reaches the gold window.</div>
        <div class="tiny muted" data-homer-count>0 / ${info.shots} swings · 0 points</div>
      </div>
    </div>`;

  const ballEl = board.querySelector('[data-homer-ball]');
  const marker = board.querySelector('[data-homer-marker]');
  const message = board.querySelector('[data-homer-msg]');
  const count = board.querySelector('[data-homer-count]');
  const swingBtn = board.querySelector('[data-homer-swing]');

  sportShellSetup(shell, kind, 'Home Run Derby · time the pitch');

  function paint() {
    marker.style.left = `${Math.max(1, Math.min(99, position * 100))}%`;
    ballEl.style.right = `${8 + (1 - position) * 58}%`;
    ballEl.style.top = `${30 + Math.sin(position * Math.PI * 0.6) * 12}%`;
    ballEl.style.transform = `scale(${1 + position * 0.5})`;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    position += 0.62 * dt;
    if (position > 1) position = 0;
    paint();
    raf = requestAnimationFrame(loop);
  }

  function paintCount() {
    count.textContent = `${swings} / ${info.shots} swings · ${score} points`;
  }

  function finish() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
    clearTimeout(resetTimer);
    showSportResult(shell, {
      kind, score, made,
      coins: info.baseCoins + score * 4,
      xp: info.baseXp + score * 2,
      bond: info.baseBond + made,
      joy: 15,
    });
  }

  function swing() {
    if (!running || cooling) return;
    cooling = true;
    swingBtn.disabled = true;
    swings += 1;
    const dist = Math.abs(position - 0.62);
    let points = 0;
    let text = 'Pop fly. Easy catch.';
    if (dist <= 0.07) {
      points = 3; made += 1;
      text = 'WALK-OFF! That one left the Hollow.';
      Sfx.win();
    } else if (dist <= 0.16) {
      points = 2; made += 1;
      text = 'Line drive into the gap!';
      Sfx.coin();
    } else {
      Sfx.error();
    }
    score += points;
    message.textContent = text;
    paintCount();
    if (swings >= info.shots) {
      endTimer = setTimeout(finish, 620);
      return;
    }
    resetTimer = setTimeout(() => {
      if (!running) return;
      cooling = false;
      swingBtn.disabled = false;
      message.textContent = 'Swing when the pitch reaches the gold window.';
    }, 560);
  }

  swingBtn.addEventListener('click', swing);
  paint();
  paintCount();
  raf = requestAnimationFrame(loop);
  sportCountdown(shell, info, finish);
  endTimer = setTimeout(finish, info.duration + 100);
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
    clearTimeout(resetTimer);
  });
}

/* ---------------- VOLLEYBALL ---------------- */
function openVolleyGame(kind = 'volley') {
  const info = SPORT_GAMES[kind];
  const s = activeSprite();
  if (!s || s.stage === 'egg') {
    toast('Hatch a sprite first to play sports together.', '🥚');
    return;
  }
  Sfx.init();
  const shell = gameOverlayShell(kind);
  const { board } = shell;
  let running = true;
  let touches = 0;
  let made = 0;
  let score = 0;
  let height = 0.45;
  let velocity = 0.55;
  let rally = 0;
  let raf = 0;
  let last = performance.now();
  let endTimer = 0;

  board.innerHTML = `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#0f2b3a,#1c5566 46%,#d9b56b 47%,#a87c3f)">
      <div style="position:absolute;left:50%;top:20%;bottom:53%;width:2px;background:rgba(255,255,255,.5)"></div>
      <div style="position:absolute;left:64%;top:22%;width:40px;transform:scaleX(-1)">${spriteSVG({ ...s, id: `${s.id}-volley` }, { expr: 'idle' })}</div>
      <div style="position:absolute;left:14%;top:26%;width:44px">${spriteSVG(s, { expr: 'happy' })}</div>
      <div data-volley-ball style="position:absolute;left:50%;top:40%;font-size:30px;transform:translate(-50%,-50%)">🏐</div>
      <div style="position:absolute;left:10%;right:10%;bottom:30%;height:24px;border-radius:12px;background:rgba(6,16,22,.6);border:1px solid rgba(255,255,255,.22);overflow:hidden">
        <div style="position:absolute;left:30%;top:0;width:40%;height:100%;background:rgba(139,233,255,.35);border-left:1px solid #8be9ff;border-right:1px solid #8be9ff"></div>
        <div data-volley-marker style="position:absolute;left:0;top:-4px;width:6px;height:32px;border-radius:4px;background:#fff"></div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:12%;display:flex;flex-direction:column;align-items:center;gap:7px">
        <button class="btn btn-gold" data-volley-bump style="min-width:190px">Bump</button>
        <div class="tiny" data-volley-msg style="font-weight:750;color:#fff;text-align:center;max-width:285px">Bump when the ball is in the pale band.</div>
        <div class="tiny muted" data-volley-count>0 / ${info.shots} touches · rally 0</div>
      </div>
    </div>`;

  const ballEl = board.querySelector('[data-volley-ball]');
  const marker = board.querySelector('[data-volley-marker]');
  const message = board.querySelector('[data-volley-msg]');
  const count = board.querySelector('[data-volley-count]');
  const bumpBtn = board.querySelector('[data-volley-bump]');

  sportShellSetup(shell, kind, 'Volleyball · keep the rally alive');

  function paint() {
    marker.style.left = `${Math.max(1, Math.min(99, height * 100))}%`;
    ballEl.style.top = `${14 + (1 - height) * 52}%`;
    ballEl.style.left = `${18 + height * 58}%`;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    velocity += 0.62 * dt;
    height -= velocity * dt;
    if (height <= 0.02) {
      height = 0.02;
      velocity = 0;
      if (rally > 0) {
        message.textContent = 'The ball hit the sand. Rally over.';
        Sfx.error();
      }
      rally = 0;
      setTimeout(() => {
        if (!running) return;
        height = 0.45;
        velocity = 0.4;
        paint();
      }, 500);
    }
    paint();
    raf = requestAnimationFrame(loop);
  }

  function paintCount() {
    count.textContent = `${touches} / ${info.shots} touches · rally ${rally}`;
  }

  function finish() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
    showSportResult(shell, {
      kind, score, made,
      coins: info.baseCoins + score * 4,
      xp: info.baseXp + score * 2,
      bond: info.baseBond + made,
      joy: 15,
    });
  }

  function bump() {
    if (!running) return;
    touches += 1;
    const inBand = height >= 0.12 && height <= 0.42;
    const perfect = height >= 0.2 && height <= 0.34;
    if (inBand) {
      rally += 1;
      const points = perfect ? 3 : 2;
      score += points;
      if (rally >= 2) made += 1;
      velocity = -(0.45 + Math.min(0.35, rally * 0.05));
      height = Math.min(0.95, height + 0.2);
      message.textContent = perfect ? `Perfect touch! Rally ${rally}.` : `Kept it up! Rally ${rally}.`;
      if (perfect) Sfx.win(); else Sfx.coin();
    } else {
      rally = 0;
      message.textContent = 'Out of reach. The ball drops.';
      Sfx.error();
    }
    paintCount();
    if (touches >= info.shots) endTimer = setTimeout(finish, 520);
  }

  bumpBtn.addEventListener('click', bump);
  paint();
  paintCount();
  raf = requestAnimationFrame(loop);
  sportCountdown(shell, info, finish);
  endTimer = setTimeout(finish, info.duration + 100);
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(endTimer);
  });
}
