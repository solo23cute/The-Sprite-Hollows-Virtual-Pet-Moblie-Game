/* Arcade challenges: one puzzle, one zombie siege, and one fight. */

Object.assign(GAME_INFO, {
  rune: {
    title: 'Rune Slide',
    icon: '🧩',
    tag: 'Puzzle',
    group: 'arcade',
    desc: 'Match the order strip. Slide all eight runes home across three boards in two minutes.',
    g1: '#8b7bff',
    g2: '#38bdf8',
  },
  zombie: {
    title: 'Zombie Siege',
    icon: '🧟',
    tag: 'Zombie',
    group: 'arcade',
    desc: 'Tap the horde before it reaches the lantern. Three hearts, thirty seconds.',
    g1: '#7ee787',
    g2: '#4f6b3a',
  },
  duel: {
    title: 'Hollow Duel',
    icon: '⚔️',
    tag: 'Fight',
    group: 'arcade',
    desc: 'Time strikes in the sweet spot, guard the counterattack, and topple the brute.',
    g1: '#ff8a5c',
    g2: '#c9455c',
  },
});

/* ---------------- RUNE SLIDE ---------------- */
const RUNE_TILES = ['🌙', '🔥', '💧', '🌿', '⚡', '❄️', '🪶', '💎'];
const RUNE_TIME = 120;

function runeShuffledBoard(steps = 22) {
  const board = [...RUNE_TILES, null];
  let blank = 8;
  let previous = -1;
  for (let i = 0; i < steps; i++) {
    const neighbours = [];
    const x = blank % 3;
    const y = Math.floor(blank / 3);
    if (x > 0) neighbours.push(blank - 1);
    if (x < 2) neighbours.push(blank + 1);
    if (y > 0) neighbours.push(blank - 3);
    if (y < 2) neighbours.push(blank + 3);
    const choices = neighbours.filter((n) => n !== previous);
    const next = pick(choices.length ? choices : neighbours);
    [board[blank], board[next]] = [board[next], board[blank]];
    previous = blank;
    blank = next;
  }
  if (board.slice(0, 8).every((v, i) => v === RUNE_TILES[i])) return runeShuffledBoard(steps + 12);
  return board;
}

function openRuneSlideGame() {
  const shell = gameOverlayShell('rune');
  const { board } = shell;
  board.innerHTML = `<div class="rune-wrap">
      <div class="rune-meta"><span data-rune-round>Board 1 / 3</span><span data-rune-moves>0 moves</span></div>
      <div class="rune-goal" aria-label="Target rune order">
        <span class="rune-goal-label">Order</span>
        ${RUNE_TILES.map((rune, i) => `<span>${rune}</span>${i < RUNE_TILES.length - 1 ? '<i>›</i>' : ''}`).join('')}
      </div>
      <div class="rune-board" data-rune-grid></div>
      <div class="tiny muted rune-hint">Tap a rune beside the empty slot. Green runes are already in place.</div>
    </div>${gameMiniSprite()}`;
  const grid = board.querySelector('[data-rune-grid]');
  const roundEl = board.querySelector('[data-rune-round]');
  const movesEl = board.querySelector('[data-rune-moves]');
  const timers = new Set();
  let runeBoard = runeShuffledBoard();
  let round = 1;
  let moves = 0;
  let solved = 0;
  let score = 0;
  let remaining = RUNE_TIME;
  let running = true;
  let locked = false;

  function later(fn, ms) {
    const id = setTimeout(() => { if (running) fn(); }, ms);
    timers.add(id);
    return id;
  }

  function paintRunes() {
    grid.innerHTML = runeBoard.map((rune, i) => rune
      ? `<button class="rune-tile${rune === RUNE_TILES[i] ? ' rune-correct' : ''}" data-rune="${i}" aria-label="Rune ${rune}">${rune}</button>`
      : '<span class="rune-tile rune-blank" aria-hidden="true">✦</span>').join('');
    grid.querySelectorAll('[data-rune]').forEach((tile) => {
      tile.addEventListener('click', () => slideRune(Number(tile.dataset.rune)));
    });
    roundEl.textContent = `Board ${round} / 3`;
    movesEl.textContent = `${moves} move${moves === 1 ? '' : 's'}`;
    shell.scoreEl.textContent = score;
  }

  function adjacentToBlank(index) {
    const blank = runeBoard.indexOf(null);
    const ax = index % 3;
    const ay = Math.floor(index / 3);
    const bx = blank % 3;
    const by = Math.floor(blank / 3);
    return Math.abs(ax - bx) + Math.abs(ay - by) === 1;
  }

  function slideRune(index) {
    if (!running || locked) return;
    if (!adjacentToBlank(index)) {
      const tile = grid.querySelector(`[data-rune="${index}"]`);
      if (tile) {
        tile.classList.add('rune-nudge');
        setTimeout(() => tile.classList.remove('rune-nudge'), 260);
      }
      return;
    }
    const blank = runeBoard.indexOf(null);
    [runeBoard[blank], runeBoard[index]] = [runeBoard[index], runeBoard[blank]];
    moves += 1;
    Sfx.tick();
    paintRunes();
    if (runeBoard.slice(0, 8).every((v, i) => v === RUNE_TILES[i])) {
      locked = true;
      solved += 1;
      const boardScore = Math.max(12, 46 - Math.floor(moves / 4)) + Math.ceil(remaining / 5);
      score += boardScore;
      shell.scoreEl.textContent = score;
      Sfx.win();
      burstOn(grid, ['✨', '🌟', '💎'], 10);
      if (solved >= 3) {
        finish('Every rune is home. Brilliant!');
        return;
      }
      round += 1;
      shell.hintEl.textContent = 'Perfect order! The next board is waking up.';
      later(() => {
        runeBoard = runeShuffledBoard(22 + round * 5);
        moves = 0;
        locked = false;
        shell.hintEl.textContent = 'Slide a rune beside the empty slot.';
        paintRunes();
      }, 720);
    }
  }

  shell.timerEl.textContent = `${RUNE_TIME}s`;
  shell.timerBar.style.width = '100%';
  paintRunes();
  const spawnTimer = setInterval(() => {
    if (!running) return;
    remaining = Math.max(0, remaining - 0.1);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / RUNE_TIME) * 100}%`;
    if (remaining <= 0) finish(solved ? 'The clock caught the last board.' : 'The runes stayed shuffled.');
  }, 100);
  timers.add(spawnTimer);

  function finish(blurb) {
    if (!running) return;
    running = false;
    timers.forEach((id) => { clearTimeout(id); clearInterval(id); });
    const coins = Math.min(130, 20 + score);
    const xp = Math.min(80, 12 + Math.round(score / 2));
    showGameResult(shell, {
      kind: 'rune', score, coins, xp,
      blurb,
    });
  }

  shell.addCleanup(() => {
    running = false;
    timers.forEach((id) => { clearTimeout(id); clearInterval(id); });
  });
}

/* ---------------- ZOMBIE SIEGE ---------------- */
function openZombieSiegeGame() {
  const shell = gameOverlayShell('zombie');
  const { board } = shell;
  board.innerHTML = `<div class="zombie-field">
      <div class="zombie-hud">
        <span data-hearts class="zombie-hearts">💛💛💛</span>
        <span class="tiny muted" data-wave>Wave 1</span>
      </div>
      <div class="zombie-lanes">
        ${[0, 1, 2].map((lane) => `<div class="zombie-lane" data-lane="${lane}">
          <span class="zombie-moon">🌙</span>
          <span class="zombie-gate">🏮</span>
        </div>`).join('')}
      </div>
      <div class="tiny muted zombie-tip">Tap a zombie before it reaches the lantern.</div>
    </div>${gameMiniSprite()}`;
  const lanes = [...board.querySelectorAll('[data-lane]')];
  const heartsEl = board.querySelector('[data-hearts]');
  const waveEl = board.querySelector('[data-wave]');
  const zombies = [];
  let score = 0;
  let hearts = 3;
  let running = true;
  let remaining = 30;
  let spawnClock = 0;
  let lastSpawn = 0;
  let raf = 0;
  let last = performance.now();
  const faces = ['🧟', '🧟‍♂️', '🧟‍♀️'];

  function updateHud() {
    heartsEl.textContent = '💛'.repeat(Math.max(0, hearts)) + '🖤'.repeat(Math.max(0, 3 - hearts));
    shell.scoreEl.textContent = score;
    waveEl.textContent = `Wave ${1 + Math.floor(score / 7)}`;
  }

  function spawnZombie() {
    if (!running) return;
    const lane = lanes
      .map((el) => ({ el, count: zombies.filter((z) => z.lane === el).length }))
      .sort((a, b) => a.count - b.count)[0]?.el;
    if (!lane) return;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'zombie';
    el.textContent = pick(faces);
    el.style.left = `${rand(16, 82)}%`;
    el.style.top = '-14%';
    const zombie = { el, lane, y: -14, speed: rand(10, 15) + Math.min(9, score * 0.28), dead: false, hit: false };
    el.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!running || zombie.dead) return;
      zombie.dead = true;
      score += 1;
      Sfx.coin();
      burstOn(el, ['💥', '✨', '🧟'], 5);
      el.classList.add('zap');
      setTimeout(() => el.remove(), 220);
      updateHud();
    });
    lane.appendChild(el);
    zombies.push(zombie);
  }

  function hurt() {
    hearts -= 1;
    Sfx.error();
    tapHaptic(24);
    const flash = document.createElement('span');
    flash.className = 'zombie-hit';
    flash.textContent = '💥';
    board.querySelector('.zombie-field')?.appendChild(flash);
    setTimeout(() => flash.remove(), 380);
    updateHud();
    if (hearts <= 0) finish('The lantern went dark. The sprites still believe in you.');
  }

  function draw(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    remaining = Math.max(0, remaining - dt);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / 30) * 100}%`;
    spawnClock += dt * 1000;
    if (now - lastSpawn > Math.max(380, 760 - score * 17) && spawnClock > 200) {
      spawnZombie();
      lastSpawn = now;
    }
    zombies.forEach((zombie) => {
      if (zombie.dead) return;
      zombie.y += zombie.speed * dt;
      zombie.el.style.top = `${zombie.y}%`;
      if (zombie.y >= 87) {
        zombie.dead = true;
        zombie.el.remove();
        hurt();
      }
    });
    for (let i = zombies.length - 1; i >= 0; i--) if (zombies[i].dead) zombies.splice(i, 1);
    if (remaining <= 0) finish('You held the lantern until sunrise.');
    if (running) raf = requestAnimationFrame(draw);
  }

  function finish(blurb) {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    zombies.forEach((z) => z.el.remove());
    zombies.length = 0;
    const coins = Math.min(135, 15 + score * 4 + hearts * 8);
    const xp = Math.min(80, 12 + score * 2);
    showGameResult(shell, {
      kind: 'zombie', score, coins, xp,
      blurb,
    });
  }

  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    zombies.forEach((z) => z.el.remove());
  });

  updateHud();
  spawnZombie();
  raf = requestAnimationFrame((now) => {
    last = now;
    lastSpawn = now;
    draw(now);
  });
}

/* ---------------- HOLLOW DUEL ---------------- */
function openHollowDuelGame() {
  const shell = gameOverlayShell('duel');
  const { board } = shell;
  const player = activeSprite();
  board.innerHTML = `<div class="duel-stage">
      <div class="duel-combatants">
        <div class="duel-fighter player">
          <span class="duel-label">${player ? esc(displayName(player)) : 'You'}</span>
          <span class="duel-art">${player ? spriteSVG(player, { expr: 'happy' }) : '✨'}</span>
          <span class="duel-hearts" data-player-hearts>💛💛💛</span>
        </div>
        <span class="duel-vs">VS</span>
        <div class="duel-fighter enemy">
          <span class="duel-label">Bramble Brute</span>
          <span class="duel-art duel-brute">👹</span>
          <span class="duel-bar"><i data-enemy-bar style="width:100%"></i></span>
        </div>
      </div>
      <div class="duel-meter">
        <span class="duel-zone"></span>
        <span class="duel-marker" data-marker></span>
      </div>
      <div class="duel-status" data-duel-status>Find the green window.</div>
      <div class="duel-actions">
        <button class="btn btn-gold" data-strike>Strike</button>
        <button class="btn btn-soft" data-guard>Guard</button>
      </div>
      <div class="tiny muted" style="text-align:center;margin-top:7px">Perfect center = 2 damage · block attacks with Guard</div>
    </div>`;
  const marker = board.querySelector('[data-marker]');
  const status = board.querySelector('[data-duel-status]');
  const enemyBar = board.querySelector('[data-enemy-bar]');
  const heartsEl = board.querySelector('[data-player-hearts]');
  const strikeBtn = board.querySelector('[data-strike]');
  const guardBtn = board.querySelector('[data-guard]');
  let position = 12;
  let direction = 1;
  let enemyHp = 4;
  let playerHp = 3;
  let score = 0;
  let perfects = 0;
  let blocks = 0;
  let running = true;
  let raf = 0;
  let last = performance.now();
  let elapsed = 0;
  let nextEnemy = 4.2;
  let guardUntil = 0;
  let strikeCooldown = 0;
  let lastPosition = 0;

  function updateHud() {
    shell.scoreEl.textContent = score;
    enemyBar.style.width = `${Math.max(0, (enemyHp / 4) * 100)}%`;
    heartsEl.textContent = '💛'.repeat(Math.max(0, playerHp)) + '🖤'.repeat(Math.max(0, 3 - playerHp));
  }

  function pulse(text, tone = 'normal') {
    status.textContent = text;
    status.className = `duel-status ${tone}`;
    setTimeout(() => { if (running) status.className = 'duel-status'; }, 650);
  }

  function strike() {
    if (!running || strikeCooldown > 0) return;
    strikeCooldown = 0.28;
    const dist = Math.abs(position - 50);
    if (dist <= 6) {
      enemyHp -= 2;
      perfects += 1;
      score += 12;
      pulse('Perfect strike! ⚡', 'good');
      Sfx.win();
      burstOn(strikeBtn, ['⚡', '💥', '✨'], 7);
    } else if (dist <= 18) {
      enemyHp -= 1;
      score += 6;
      pulse('Solid hit!', 'good');
      Sfx.pop();
      burstOn(strikeBtn, ['💥', '✨'], 4);
    } else {
      playerHp -= 1;
      pulse('Whiff! The brute counters.', 'bad');
      Sfx.error();
      tapHaptic(22);
    }
    guardUntil = 0;
    updateHud();
    if (enemyHp <= 0) finish(true);
    else if (playerHp <= 0) finish(false);
  }

  function guard() {
    if (!running) return;
    guardUntil = performance.now() + 1400;
    pulse('Guard up — brace for the next hit.', 'guard');
    guardBtn.classList.add('guarding');
    setTimeout(() => guardBtn.classList.remove('guarding'), 750);
    Sfx.tick();
  }

  function draw(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    elapsed += dt;
    strikeCooldown = Math.max(0, strikeCooldown - dt);
    position += direction * 70 * dt;
    if (position >= 88) { position = 88; direction = -1; }
    if (position <= 12) { position = 12; direction = 1; }
    marker.style.left = `${position}%`;
    const remaining = Math.max(0, 60 - elapsed);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / 60) * 100}%`;
    nextEnemy -= dt;
    if (nextEnemy <= 1.4 && nextEnemy > 0) status.textContent = `Incoming in ${nextEnemy.toFixed(1)}s — Guard!`;
    if (nextEnemy <= 0) {
      if (now < guardUntil) {
        blocks += 1;
        score += 4;
        pulse('Blocked! Beautiful footwork.', 'guard');
        Sfx.coin();
      } else {
        playerHp -= 1;
        pulse('The brute lands a hit!', 'bad');
        Sfx.error();
        tapHaptic(24);
      }
      updateHud();
      nextEnemy = 4.2;
      if (playerHp <= 0) finish(false);
    }
    if (remaining <= 0) finish(enemyHp <= 0);
    if (running) raf = requestAnimationFrame(draw);
  }

  function finish(won) {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    const coins = won ? Math.min(155, 50 + score * 2 + playerHp * 12) : Math.min(60, 12 + score);
    const xp = won ? Math.min(90, 20 + score * 2) : Math.min(35, 8 + score);
    showGameResult(shell, {
      kind: 'duel', score, coins, xp, perfect: perfects,
      blurb: won ? 'The Bramble Brute yields. Victory!' : 'Down, but not out. The Hollow is proud.',
    });
  }

  strikeBtn.addEventListener('click', strike);
  guardBtn.addEventListener('click', guard);
  updateHud();
  raf = requestAnimationFrame((now) => {
    last = now;
    draw(now);
  });
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
  });
}
