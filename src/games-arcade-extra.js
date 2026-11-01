/* Extra arcade challenges: Hollow Beat, Lantern Maze, and Moon Tower.
   Loaded after games-arcade.js and games.js so GAME_INFO exists. */

Object.assign(GAME_INFO, {
  beat: {
    title: 'Hollow Beat',
    icon: '🎶',
    tag: 'Rhythm',
    group: 'arcade',
    desc: 'Tap each lane as the note crosses the line. Keep the Hollow’s song alive.',
    g1: '#ff7ac8',
    g2: '#8b7bff',
  },
  maze: {
    title: 'Lantern Maze',
    icon: '🏮',
    tag: 'Puzzle',
    group: 'arcade',
    desc: 'Walk the hedge maze, gather three lanterns, and find the gate before the light dies.',
    g1: '#ffd166',
    g2: '#7ee787',
  },
  tower: {
    title: 'Moon Tower',
    icon: '🌙',
    tag: 'Timing',
    group: 'arcade',
    desc: 'Drop each block as it slides over the tower. Miss the stack and the moon slips away.',
    g1: '#8be9ff',
    g2: '#4b3f9e',
  },
});

/* ---------------- HOLLOW BEAT ---------------- */

const BEAT_LANES = ['🌸', '💧', '🔥', '🌿'];
const BEAT_TIME = 30;

function openBeatGame() {
  const shell = gameOverlayShell('beat');
  const { board } = shell;
  board.innerHTML = `<div class="beat-wrap">
      <div class="beat-stage" data-beat-stage>
        <div class="beat-line"></div>
        <div class="beat-lanes">
          ${BEAT_LANES.map((icon, i) => `<button class="beat-lane" data-beat-lane="${i}" aria-label="Lane ${i + 1}">${icon}</button>`).join('')}
        </div>
      </div>
      <div class="beat-hud"><span data-beat-combo>Combo x1</span><span data-beat-hits>0 hits</span></div>
      <div class="beat-pads">
        ${BEAT_LANES.map((icon, i) => `<button class="beat-pad" data-beat-pad="${i}" aria-label="Tap lane ${i + 1}">${icon}</button>`).join('')}
      </div>
    </div>${gameMiniSprite()}`;
  const stage = board.querySelector('[data-beat-stage]');
  const lanesEl = [...board.querySelectorAll('[data-beat-lane]')];
  const comboEl = board.querySelector('[data-beat-combo]');
  const hitsEl = board.querySelector('[data-beat-hits]');
  const pads = [...board.querySelectorAll('[data-beat-pad]')];
  const notes = [];
  let score = 0;
  let hits = 0;
  let combo = 1;
  let running = true;
  let remaining = BEAT_TIME;
  let spawnClock = 0;
  let raf = 0;
  let last = performance.now();

  function paintHud() {
    comboEl.textContent = `Combo x${combo}`;
    hitsEl.textContent = `${hits} hit${hits === 1 ? '' : 's'}`;
    shell.scoreEl.textContent = score;
  }

  function spawnNote() {
    if (!running) return;
    const lane = Math.floor(Math.random() * BEAT_LANES.length);
    const el = document.createElement('span');
    el.className = 'beat-note';
    el.textContent = BEAT_LANES[lane];
    el.style.left = `${lane * 25 + 12.5}%`;
    stage.appendChild(el);
    notes.push({ el, lane, y: -8, speed: 34 + Math.min(26, score * 0.35), dead: false });
  }

  function tapLane(lane) {
    if (!running) return;
    const pad = pads[lane];
    if (pad) {
      pad.classList.add('on');
      setTimeout(() => pad.classList.remove('on'), 120);
    }
    const target = notes
      .filter((n) => !n.dead && n.lane === lane && n.y > 62)
      .sort((a, b) => b.y - a.y)[0];
    if (target && target.y >= 72 && target.y <= 96) {
      target.dead = true;
      target.el.classList.add('hit');
      setTimeout(() => target.el.remove(), 200);
      const perfect = target.y >= 78 && target.y <= 90;
      const gain = perfect ? 12 : 7;
      score += gain + combo * 2;
      hits += 1;
      combo = Math.min(9, combo + 1);
      if (perfect) Sfx.win(); else Sfx.coin();
      burstOn(pad || lanesEl[lane], ['✨', '🎶'], 5);
    } else {
      combo = 1;
      Sfx.error();
    }
    paintHud();
  }

  function draw(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    remaining = Math.max(0, remaining - dt);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / BEAT_TIME) * 100}%`;
    spawnClock += dt * 1000;
    if (spawnClock > Math.max(360, 700 - score * 4)) {
      spawnNote();
      spawnClock = 0;
    }
    notes.forEach((note) => {
      if (note.dead) return;
      note.y += note.speed * dt * 2.2;
      note.el.style.top = `${note.y}%`;
      if (note.y > 104) {
        note.dead = true;
        note.el.remove();
        combo = 1;
        paintHud();
      }
    });
    for (let i = notes.length - 1; i >= 0; i--) if (notes[i].dead) notes.splice(i, 1);
    if (remaining <= 0) finish();
    if (running) raf = requestAnimationFrame(draw);
  }

  function finish() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    notes.forEach((n) => n.el.remove());
    const coins = Math.min(140, 22 + score * 2);
    const xp = Math.min(85, 14 + Math.round(score / 2));
    showGameResult(shell, {
      kind: 'beat', score, coins, xp,
      blurb: hits >= 22 ? 'The Hollow is dancing!' : hits >= 12 ? 'A solid groove.' : 'The song got away from you.',
    });
  }

  pads.forEach((pad, i) => pad.addEventListener('click', () => tapLane(i)));
  lanesEl.forEach((lane, i) => lane.addEventListener('click', () => tapLane(i)));
  paintHud();
  raf = requestAnimationFrame((now) => { last = now; draw(now); });
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    notes.forEach((n) => n.el.remove());
  });
}

/* ---------------- LANTERN MAZE ---------------- */

const MAZE_GRID = [
  '#########',
  '#.......#',
  '#.###.#.#',
  '#.#...#.#',
  '#.#.###.#',
  '#...#...#',
  '###.#.###',
  '#...#...#',
  '#########',
];
const MAZE_TIME = 45;

function openMazeGame() {
  const shell = gameOverlayShell('maze');
  const { board } = shell;
  const start = { x: 1, y: 1 };
  const lanterns = [{ x: 7, y: 1 }, { x: 1, y: 7 }, { x: 7, y: 7 }];
  const gate = { x: 5, y: 7 };
  let pos = { ...start };
  let collected = 0;
  let moves = 0;
  let score = 0;
  let remaining = MAZE_TIME;
  let running = true;

  board.innerHTML = `<div class="maze-wrap">
      <div class="maze-grid" data-maze-grid role="grid" aria-label="Lantern maze"></div>
      <div class="maze-hud"><span data-maze-lanterns>🏮 0 / 3</span><span data-maze-gate>Gate sealed</span></div>
      <div class="maze-pad">
        <button class="maze-key" data-maze-move="up" aria-label="Up">▲</button>
        <div class="maze-pad-mid">
          <button class="maze-key" data-maze-move="left" aria-label="Left">◀</button>
          <button class="maze-key" data-maze-move="down" aria-label="Down">▼</button>
          <button class="maze-key" data-maze-move="right" aria-label="Right">▶</button>
        </div>
      </div>
      <div class="tiny muted maze-tip">Gather all three lanterns, then reach the glowing gate.</div>
    </div>${gameMiniSprite()}`;

  const grid = board.querySelector('[data-maze-grid]');
  const lanternsEl = board.querySelector('[data-maze-lanterns]');
  const gateEl = board.querySelector('[data-maze-gate]');

  function isWall(x, y) {
    return MAZE_GRID[y]?.[x] !== '.';
  }

  function paint() {
    let html = '';
    for (let y = 0; y < MAZE_GRID.length; y++) {
      for (let x = 0; x < MAZE_GRID[y].length; x++) {
        const wall = isWall(x, y);
        const here = pos.x === x && pos.y === y;
        const lanternIndex = lanterns.findIndex((l) => l.x === x && l.y === y);
        const isGate = gate.x === x && gate.y === y;
        const cls = wall ? 'wall' : here ? 'here' : isGate ? 'gate' : 'floor';
        const content = here ? '🐾' : (lanternIndex >= 0 && lanternIndex < lanterns.length) ? '🏮' : isGate ? (collected >= 3 ? '🚪' : '🔒') : '';
        html += `<span class="maze-cell ${cls}${lanternIndex >= 0 && lanternIndex < lanterns.length ? ' lantern' : ''}">${content}</span>`;
      }
    }
    grid.innerHTML = html;
    lanternsEl.textContent = `🏮 ${collected} / 3`;
    gateEl.textContent = collected >= 3 ? 'Gate open' : 'Gate sealed';
    gateEl.className = collected >= 3 ? 'maze-open' : '';
    shell.scoreEl.textContent = score;
  }

  function move(dir) {
    if (!running) return;
    const next = { ...pos };
    if (dir === 'up') next.y -= 1;
    if (dir === 'down') next.y += 1;
    if (dir === 'left') next.x -= 1;
    if (dir === 'right') next.x += 1;
    if (isWall(next.x, next.y)) {
      Sfx.error();
      return;
    }
    pos = next;
    moves += 1;
    Sfx.tick();
    const index = lanterns.findIndex((l) => l.x === pos.x && l.y === pos.y);
    if (index >= 0) {
      lanterns.splice(index, 1);
      collected += 1;
      score += 90;
      Sfx.coin();
      toast(`Lantern ${collected} / 3 lit.`, '🏮');
      burstOn(grid, ['🏮', '✨'], 6);
    }
    if (collected >= 3 && pos.x === gate.x && pos.y === gate.y) {
      score += Math.max(30, 220 - moves * 4) + Math.round(remaining * 4);
      finish('Every lantern is home and the gate swings wide. Beautifully done.');
      return;
    }
    paint();
  }

  function finish(blurb) {
    if (!running) return;
    running = false;
    clearInterval(timer);
    const coins = Math.min(135, 20 + Math.round(score / 5));
    const xp = Math.min(80, 12 + Math.round(score / 9));
    showGameResult(shell, { kind: 'maze', score, coins, xp, blurb: blurb || 'The hedge kept its lanterns tonight.' });
  }

  board.querySelectorAll('[data-maze-move]').forEach((btn) => {
    btn.addEventListener('click', () => move(btn.dataset.mazeMove));
  });
  const keyMap = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' };
  const onKey = (e) => {
    const dir = keyMap[e.key];
    if (!dir) return;
    e.preventDefault();
    move(dir);
  };
  document.addEventListener('keydown', onKey);

  const timer = setInterval(() => {
    if (!running) return;
    remaining = Math.max(0, remaining - 0.1);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / MAZE_TIME) * 100}%`;
    if (remaining <= 0) finish(collected >= 2 ? 'So close. Two lanterns made it home.' : 'The lanterns went out in the hedge.');
  }, 100);

  paint();
  shell.addCleanup(() => {
    running = false;
    clearInterval(timer);
    document.removeEventListener('keydown', onKey);
  });
}

/* ---------------- MOON TOWER ---------------- */

function openTowerGame() {
  const shell = gameOverlayShell('tower');
  const { board } = shell;
  board.innerHTML = `<div class="tower-wrap">
      <div class="tower-sky" data-tower-sky>
        <span class="tower-moon">🌙</span>
        <div class="tower-stack" data-tower-stack></div>
        <div class="tower-mover" data-tower-mover></div>
      </div>
      <div class="tower-hud"><span data-tower-height>0 blocks</span><span data-tower-best>Best 0</span></div>
      <button class="btn btn-gold btn-block" data-tower-drop>Drop block</button>
      <div class="tiny muted tower-tip">Tap when the sliding block lines up with the tower.</div>
    </div>${gameMiniSprite()}`;
  const stackEl = board.querySelector('[data-tower-stack]');
  const moverEl = board.querySelector('[data-tower-mover]');
  const heightEl = board.querySelector('[data-tower-height]');
  const bestEl = board.querySelector('[data-tower-best]');
  let width = 62;
  let x = 18;
  let dir = 1;
  let speed = 0.5;
  let height = 0;
  let score = 0;
  let best = 0;
  let running = true;
  let raf = 0;
  let last = performance.now();
  let cooling = false;

  function paintMover() {
    moverEl.style.left = `${x}%`;
    moverEl.style.width = `${width}%`;
  }

  function paintHud() {
    heightEl.textContent = `${height} block${height === 1 ? '' : 's'}`;
    bestEl.textContent = `Best ${best}`;
    shell.scoreEl.textContent = score;
  }

  function draw(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    x += dir * speed * dt * 42;
    if (x + width >= 96) { x = 96 - width; dir = -1; }
    if (x <= 4) { x = 4; dir = 1; }
    paintMover();
    raf = requestAnimationFrame(draw);
  }

  function drop() {
    if (!running || cooling) return;
    cooling = true;
    const center = x + width / 2;
    const previousCenter = height ? (stackEl.lastElementChild ? Number(stackEl.lastElementChild.dataset.center) : 50) : 50;
    const diff = Math.abs(center - previousCenter);
    const tolerance = Math.max(9, width * 0.55);
    if (height > 0 && diff > tolerance) {
      score += height * 6;
      Sfx.error();
      finish(height);
      return;
    }
    const perfect = diff < tolerance * 0.32;
    height += 1;
    best = Math.max(best, height);
    score += perfect ? 34 : 16;
    const block = document.createElement('span');
    block.className = 'tower-block';
    block.dataset.center = String(center);
    block.style.width = `${width}%`;
    block.style.left = `${center - width / 2}%`;
    stackEl.appendChild(block);
    if (perfect) {
      Sfx.win();
      burstOn(stackEl, ['✨', '🌙'], 6);
    } else {
      Sfx.coin();
    }
    width = Math.max(16, width - (perfect ? 1.5 : 5));
    x = 4;
    dir = 1;
    speed += 0.055;
    paintHud();
    paintMover();
    setTimeout(() => { cooling = false; }, 140);
  }

  function finish(finalHeight) {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    const coins = Math.min(150, 25 + score);
    const xp = Math.min(85, 14 + finalHeight * 5);
    showGameResult(shell, {
      kind: 'tower', score, coins, xp,
      blurb: finalHeight >= 8 ? 'A tower that touches the moon!' : finalHeight >= 4 ? 'A respectable stack!' : 'The tower slipped. Try again!',
    });
  }

  board.querySelector('[data-tower-drop]').addEventListener('click', drop);
  paintHud();
  paintMover();
  raf = requestAnimationFrame((now) => { last = now; draw(now); });
  shell.timerEl.textContent = '∞';
  shell.timerBar.style.width = '100%';
  shell.hintEl.textContent = 'Moon Tower · stack as high as you can';
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
  });
}
