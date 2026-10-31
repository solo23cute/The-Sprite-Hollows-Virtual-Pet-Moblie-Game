/* Touch-first minigames, all built from DOM so they work anywhere. */

const GAME_INFO = {
  catch: { title: 'Treat Catch', icon: '🍓', tag: 'Reflexes', desc: 'Tap falling treats. Dodge the pebbles.', g1: '#ff9a5a', g2: '#ff5e8a' },
  pulse: { title: 'Pulse Match', icon: '🎯', tag: 'Timing', desc: 'Tap when the rings line up. Chase perfects.', g1: '#8b7bff', g2: '#56c8e8' },
  copycat: { title: 'Sprite Says', icon: '🎵', tag: 'Memory', desc: 'Watch the pads, then repeat the pattern.', g1: '#ffd84d', g2: '#ff8a4c' },
  nectar: { title: 'Nectar Pop', icon: '🌸', tag: 'Reflexes', desc: 'Tap blooming flowers. Dodge grumpy bees.', g1: '#ff8fc8', g2: '#a3e635', unlock: 4 },
  match: { title: 'Moon Match', icon: '🌙', tag: 'Memory', desc: 'Flip moon cards and find every pair.', g1: '#8b7bff', g2: '#38bdf8', unlock: 12 },
  dig: { title: 'Coin Dig', icon: '🪙', tag: 'Reflexes & risk', desc: 'Tap buried coins and gems. Dodge the bombs.', g1: '#ffd166', g2: '#f2a23c' },
};

function gameOverlayShell(kind) {
  const info = GAME_INFO[kind];
  const app = document.getElementById('app');
  const wrap = document.createElement('div');
  wrap.className = 'game-overlay';
  wrap.innerHTML = `
    <div class="game-top">
      <button class="icon-btn" data-quit aria-label="Quit game">${icon('close')}</button>
      <div>
        <h2>${info.title}</h2>
        <div class="tiny muted">${info.tag}</div>
      </div>
      <div class="gstat"><b data-score>0</b><span>Score</span></div>
    </div>
    <div class="game-board" data-board></div>
    <div class="game-foot">
      <div class="between tiny muted" style="margin-bottom:6px"><span data-hint>${info.desc}</span><span data-timer>—</span></div>
      <div class="game-timer"><i data-timerbar style="width:100%"></i></div>
    </div>`;
  app.appendChild(wrap);
  let closed = false;
  let cleanup = [];
  const close = () => {
    if (closed) return;
    closed = true;
    cleanup.forEach((fn) => { try { fn(); } catch {} });
    wrap.remove();
  };
  wrap.querySelector('[data-quit]').addEventListener('click', () => {
    close();
    toast('Game ended early — no reward this time.', '🎮');
  });
  return {
    wrap,
    board: wrap.querySelector('[data-board]'),
    scoreEl: wrap.querySelector('[data-score]'),
    timerEl: wrap.querySelector('[data-timer]'),
    timerBar: wrap.querySelector('[data-timerbar]'),
    hintEl: wrap.querySelector('[data-hint]'),
    addCleanup: (fn) => cleanup.push(fn),
    close,
    isClosed: () => closed,
  };
}

function gameMiniSprite() {
  const s = activeSprite();
  if (!s) return '';
  return `<div class="game-pet-mini">${spriteSVG(s, { expr: 'happy' })}</div>`;
}

function showGameResult(shell, { kind, score, coins, xp, blurb, perfect = 0 }) {
  const s = activeSprite();
  const used = shell.wrap.querySelector('.game-result');
  if (used) return;
  const preview = typeof gameCoinPayout === 'function' ? gameCoinPayout(coins) : { payout: coins, rarityBonus: 0 };
  const result = document.createElement('div');
  result.className = 'game-result';
  result.innerHTML = `
    <div class="gr-inner">
      <div class="gr-emoji">${score > 0 ? '🎉' : '🌱'}</div>
      <h3>${blurb || 'Nice run!'}</h3>
      <p class="muted small">${s ? `${displayName(s)} had a great time.` : 'The Hollow cheers for you.'}${perfect ? ` ${perfect} perfect${perfect > 1 ? 's' : ''}!` : ''}</p>
      <div class="gr-rewards">
        <span class="chip">🪙 +${preview.payout.toLocaleString()}</span>
        ${preview.rarityBonus ? `<span class="chip chip-mut">✦ +${preview.rarityBonus.toLocaleString()} rarity</span>` : ''}
        <span class="chip">⭐ +${xp} XP</span>
        <span class="chip">💗 +bond</span>
        ${typeof arcadeGameKind === 'function' && arcadeGameKind(kind) ? `<span class="chip">🏟️ +${preview.payout.toLocaleString()} arcade progress</span>` : ''}
      </div>
      <button class="btn btn-gold btn-block" data-collect style="margin-top:14px">Collect rewards</button>
    </div>`;
  shell.board.appendChild(result);
  let collected = false;
  result.querySelector('[data-collect]').addEventListener('click', () => {
    if (collected) return;
    collected = true;
    const res = Actions.finishGame({ game: kind, score, coins, xp, joy: 14 });
    Sfx.win();
    toast(`+${(res?.coins || preview.payout).toLocaleString()} coins · +${xp} XP`, '🏆');
    burstOn(result.querySelector('[data-collect]'), ['🪙', '✨', '💗'], 8);
    shell.close();
    if (typeof App !== 'undefined' && App.refresh) App.refresh();
  });
  shell.addCleanup(() => {});
}

/* ---------------- TREAT CATCH ---------------- */
function openCatchGame() {
  const shell = gameOverlayShell('catch');
  const { board } = shell;
  board.innerHTML = `<div class="game-msg"><div><h3>Catch the treats!</h3><p>Tap snacks before they land. Avoid pebbles.</p></div></div>
    <div class="catch-zone"></div>${gameMiniSprite()}`;
  const zone = board.querySelector('.catch-zone');
  const treats = ['🍓', '🍯', '🍭', '🍰', '🍒', '🥝'];
  const bombs = ['🪨', '🌰', '🦴'];
  let score = 0;
  let running = true;
  let items = [];
  let lastSpawn = 0;
  let startedAt = performance.now();
  const DURATION = 20000;
  const stateObj = { score };

  setTimeout(() => {
    const msg = board.querySelector('.game-msg');
    if (msg) msg.remove();
  }, 1300);

  function spawn() {
    const isBomb = score >= 4 && chance(0.22);
    const el = document.createElement('button');
    el.className = `falling${isBomb ? ' bomb' : ''}`;
    el.type = 'button';
    el.textContent = isBomb ? pick(bombs) : pick(treats);
    el.style.left = `${rand(12, 88)}%`;
    el.style.top = '-8%';
    const item = { el, y: -8, speed: rand(24, 36), bomb: isBomb, dead: false };
    el.addEventListener('pointerdown', (ev) => {
      ev.stopPropagation();
      if (!running || item.dead) return;
      item.dead = true;
      if (item.bomb) {
        score = Math.max(0, score - 2);
        Sfx.error();
        el.classList.add('pop-bad');
        const float = document.createElement('div');
        float.className = 'float-score';
        float.style.left = el.style.left;
        float.style.top = `${item.y}%`;
        float.style.color = '#ff7597';
        float.textContent = '-2';
        board.appendChild(float);
        setTimeout(() => float.remove(), 800);
        setTimeout(() => el.remove(), 220);
      } else {
        score += 1;
        Sfx.tick();
        el.style.transform = 'translate(-50%, -50%) scale(1.4)';
        el.style.opacity = '0';
        const float = document.createElement('div');
        float.className = 'float-score';
        float.style.left = el.style.left;
        float.style.top = `${item.y}%`;
        float.textContent = '+1';
        board.appendChild(float);
        setTimeout(() => float.remove(), 800);
        setTimeout(() => el.remove(), 260);
      }
      shell.scoreEl.textContent = score;
    });
    zone.appendChild(el);
    items.push(item);
    lastSpawn = performance.now();
  }

  let raf = 0;
  let last = performance.now();
  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (now - lastSpawn > Math.max(320, 650 - score * 18)) spawn();
    items.forEach((item) => {
      if (item.dead) return;
      item.y += item.speed * dt;
      item.el.style.top = `${item.y}%`;
      if (item.y > 100) {
        item.dead = true;
        item.el.remove();
      }
    });
    items = items.filter((i) => !i.dead);
    const left = Math.max(0, DURATION - (now - startedAt));
    shell.timerEl.textContent = `${(left / 1000).toFixed(1)}s`;
    shell.timerBar.style.width = `${(left / DURATION) * 100}%`;
    if (left <= 0) {
      running = false;
      shell.timerEl.textContent = '0.0s';
      finish();
      return;
    }
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame((t) => {
    startedAt = t;
    last = t;
    loop(t);
  });

  function finish() {
    const coins = Math.min(70, 8 + score * 3);
    const xp = 10 + score * 2;
    showGameResult(shell, {
      kind: 'catch', score, coins, xp,
      blurb: score >= 18 ? 'Snack legend!' : score >= 10 ? 'Great catching!' : score > 0 ? 'Not bad!' : 'The treats won this time.',
    });
  }
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
    items.forEach((i) => i.el.remove());
  });
}

/* ---------------- PULSE MATCH ---------------- */
function openPulseGame() {
  const shell = gameOverlayShell('pulse');
  const { board } = shell;
  const TARGET = 62;
  board.innerHTML = `<div class="pulse-wrap">
      <div class="pulse-ring" style="width:${TARGET * 2}px;height:${TARGET * 2}px"></div>
      <div class="pulse-fill" data-fill></div>
      <div class="pulse-core" style="width:30px;height:30px"></div>
      <div class="pulse-label" data-label>Get ready…</div>
      <div class="pulse-tap" data-taps>Tap anywhere</div>
    </div>${gameMiniSprite()}`;
  const fill = board.querySelector('[data-fill]');
  const label = board.querySelector('[data-label]');
  const tapsEl = board.querySelector('[data-taps]');
  let round = 0;
  let score = 0;
  const ROUNDS = 8;
  let running = true;
  let radius = 132;
  let shrinking = false;
  let shrankAt = 0;
  let raf = 0;
  let paused = false;
  let last = 0;
  let bonus = 0;

  const PRAISE = ['Perfect!', 'Beautiful.', 'Right on.', 'Chef’s kiss.', 'So smooth.'];

  function setRing(r) {
    radius = r;
    fill.style.width = `${r * 2}px`;
    fill.style.height = `${r * 2}px`;
  }

  function startRound() {
    if (!running) return;
    paused = false;
    shrinking = true;
    setRing(132);
    shrankAt = performance.now();
    tapsEl.textContent = 'Tap!';
    label.textContent = `Pulse ${round + 1} / ${ROUNDS}`;
    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function loop(now) {
    if (!running) return;
    if (!paused && shrinking) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const next = radius - 92 * dt;
      setRing(next);
      if (next <= 18) {
        shrinking = false;
        paused = true;
        label.textContent = 'Missed!';
        tapsEl.textContent = 'Too slow';
        Sfx.error();
        setTimeout(nextRound, 550);
        return;
      }
    }
    raf = requestAnimationFrame(loop);
  }

  function tap() {
    if (!running || paused || !shrinking) return;
    const diff = Math.abs(radius - TARGET);
    let points = 0;
    let text = '';
    if (diff <= 8) {
      points = 3;
      bonus += 1;
      text = pick(PRAISE);
      Sfx.coin();
    } else if (diff <= 18) {
      points = 2;
      text = 'Good!';
      Sfx.click();
    } else if (diff <= 30) {
      points = 1;
      text = 'Close';
      Sfx.tick();
    } else {
      points = 0;
      text = 'Way off';
      Sfx.error();
    }
    score += points;
    shell.scoreEl.textContent = score;
    label.textContent = text;
    tapsEl.textContent = `+${points}`;
    shrinking = false;
    paused = true;
    setTimeout(nextRound, 420);
  }

  function nextRound() {
    if (!running) return;
    round += 1;
    if (round >= ROUNDS) {
      finish();
      return;
    }
    startRound();
  }

  board.addEventListener('pointerdown', tap);

  function finish() {
    running = false;
    cancelAnimationFrame(raf);
    const coins = Math.min(70, 8 + score * 3);
    const xp = 10 + score * 2;
    showGameResult(shell, {
      kind: 'pulse', score, coins, xp, perfect: bonus,
      blurb: bonus >= 5 ? 'Timing wizard!' : bonus >= 2 ? 'Locked in!' : 'Keep practicing!',
    });
  }

  setTimeout(() => { if (running) startRound(); }, 650);
  shell.addCleanup(() => {
    running = false;
    cancelAnimationFrame(raf);
  });
}

/* ---------------- SPRITE SAYS ---------------- */
function openCopycatGame() {
  const shell = gameOverlayShell('copycat');
  const { board } = shell;
  const PAD_TONES = [392, 523, 659, 784];
  board.innerHTML = `<div class="pads">
      <button class="pad" data-pad="0" aria-label="Rose pad"></button>
      <button class="pad" data-pad="1" aria-label="Tide pad"></button>
      <button class="pad" data-pad="2" aria-label="Leaf pad"></button>
      <button class="pad" data-pad="3" aria-label="Sun pad"></button>
    </div>
    <div class="game-msg" data-msg><div><h3>Watch closely…</h3><p>The sprite will play a pattern. Repeat it.</p></div></div>
    ${gameMiniSprite()}`;
  const pads = [...board.querySelectorAll('.pad')];
  const msg = board.querySelector('[data-msg]');
  let sequence = [];
  let inputIndex = 0;
  let round = 0;
  let running = true;
  let accepting = false;
  const timers = [];
  const MAX_ROUNDS = 7;

  function later(fn, ms) {
    const id = setTimeout(() => { if (running) fn(); }, ms);
    timers.push(id);
    return id;
  }

  function flash(padIndex, duration = 420) {
    const pad = pads[padIndex];
    pad.classList.add('lit');
    Sfx.tone(PAD_TONES[padIndex], 0.22, 'sine', 0.05, 0, 40);
    later(() => pad.classList.remove('lit'), duration);
  }

  function playback() {
    accepting = false;
    msg.innerHTML = '<div><h3>Watch…</h3><p>Round ' + (round + 1) + '</p></div>';
    sequence.forEach((val, i) => {
      later(() => flash(val), 480 + i * 540);
    });
    later(() => {
      msg.innerHTML = '<div><h3>Your turn</h3><p>Repeat the pattern</p></div>';
      accepting = true;
      inputIndex = 0;
    }, 480 + sequence.length * 540 + 180);
  }

  function nextRound() {
    round += 1;
    sequence.push(randInt(0, 3));
    shell.scoreEl.textContent = round - 1;
    playback();
  }

  function press(idx) {
    if (!running || !accepting) return;
    flash(idx, 220);
    if (sequence[inputIndex] !== idx) {
      accepting = false;
      pads[idx].classList.add('wrong');
      later(() => pads[idx].classList.remove('wrong'), 350);
      msg.innerHTML = '<div><h3>Oops!</h3><p>Wrong pad. The sprite is very forgiving.</p></div>';
      Sfx.error();
      later(() => finish(false), 800);
      return;
    }
    inputIndex += 1;
    if (inputIndex >= sequence.length) {
      accepting = false;
      shell.scoreEl.textContent = round;
      if (round >= MAX_ROUNDS) {
        msg.innerHTML = '<div><h3>Flawless!</h3><p>You remembered everything.</p></div>';
        later(() => finish(true), 700);
        return;
      }
      msg.innerHTML = '<div><h3>Nice!</h3><p>Next pattern…</p></div>';
      later(nextRound, 750);
    }
  }

  pads.forEach((pad, idx) => {
    pad.addEventListener('pointerdown', (e) => { e.preventDefault(); press(idx); });
  });

  function finish(won) {
    if (!running) return;
    running = false;
    timers.forEach(clearTimeout);
    const score = sequence.length - 1 + (won ? 1 : 0);
    const coins = Math.min(80, 10 + score * 8);
    const xp = 12 + score * 4;
    showGameResult(shell, {
      kind: 'copycat', score, coins, xp,
      blurb: won ? 'Perfect memory!' : score >= 4 ? 'Sharp memory!' : 'Good start!',
    });
  }

  later(() => {
    msg.innerHTML = '';
    nextRound();
  }, 1200);

  shell.addCleanup(() => {
    running = false;
    timers.forEach(clearTimeout);
  });
}

/* ---------------- NECTAR POP ---------------- */
function openNectarGame() {
  const shell = gameOverlayShell('nectar');
  const { board } = shell;
  board.innerHTML = `<div class="nectar-grid">
      ${Array.from({ length: 12 }, (_, i) => `<button class="nectar-pad" data-pad="${i}" aria-label="Nectar flower"></button>`).join('')}
    </div>${gameMiniSprite()}`;
  const pads = [...board.querySelectorAll('.nectar-pad')];
  const timers = new Set();
  let score = 0;
  let running = true;
  let remaining = 22;

  function clearPad(pad) {
    if (pad._bloomTimer) clearTimeout(pad._bloomTimer);
    pad._bloomTimer = null;
    pad.className = 'nectar-pad';
    pad.textContent = '';
    delete pad.dataset.state;
  }

  function spawn() {
    if (!running) return;
    const idle = pads.filter((p) => !p.dataset.state);
    for (let n = 0; n < 2 && idle.length; n++) {
      const index = randInt(0, idle.length - 1);
      const pad = idle.splice(index, 1)[0];
      const bee = score >= 6 && chance(0.18);
      pad.dataset.state = bee ? 'bee' : 'flower';
      pad.classList.add(bee ? 'bee' : 'lit');
      pad.textContent = bee ? '🐝' : pick(['🌸', '🌼', '🌺', '💠']);
      pad._bloomTimer = setTimeout(() => { if (running) clearPad(pad); }, rand(720, 1180));
    }
  }

  pads.forEach((pad) => {
    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!running || !pad.dataset.state) return;
      if (pad.dataset.state === 'flower') {
        score += 1;
        Sfx.pop();
        burstOn(pad, ['✨', '🌼', '💛'], 4);
      } else {
        score = Math.max(0, score - 1);
        Sfx.error();
        tapHaptic(18);
      }
      shell.scoreEl.textContent = score;
      clearPad(pad);
    });
  });

  const spawnTimer = setInterval(spawn, 520);
  const clock = setInterval(() => {
    if (!running) return;
    remaining = Math.max(0, remaining - 0.1);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / 22) * 100}%`;
    if (remaining <= 0) finish();
  }, 100);
  timers.add(spawnTimer);
  timers.add(clock);
  spawn();

  function finish() {
    if (!running) return;
    running = false;
    timers.forEach(clearInterval);
    pads.forEach(clearPad);
    const coins = Math.min(90, 8 + score * 4);
    const xp = 10 + score * 2;
    showGameResult(shell, {
      kind: 'nectar', score, coins, xp,
      blurb: score >= 18 ? 'Nectar everywhere!' : score >= 10 ? 'Pollinator pro!' : score >= 4 ? 'Sweet reflexes!' : 'The bees win this one.',
    });
  }

  shell.addCleanup(() => {
    running = false;
    timers.forEach(clearInterval);
    pads.forEach(clearPad);
  });
}

/* ---------------- MOON MATCH ---------------- */
function openMatchGame() {
  const shell = gameOverlayShell('match');
  const { board } = shell;
  const faces = ['🌙', '⭐', '🌸', '🍓', '💧'];
  const deck = shuffle([...faces, ...faces]);
  board.innerHTML = `<div class="match-grid">
      ${deck.map((face, i) => `<button class="match-card" data-card="${i}" data-face="${face}" aria-label="Moon card ${i + 1}"><span>✦</span></button>`).join('')}
    </div>${gameMiniSprite()}`;
  const cards = [...board.querySelectorAll('.match-card')];
  const timers = new Set();
  let first = null;
  let locked = false;
  let pairs = 0;
  let remaining = 40;
  let running = true;

  function later(fn, ms) {
    const id = setTimeout(() => { if (running) fn(); }, ms);
    timers.add(id);
    return id;
  }

  function hide(card) {
    card.classList.remove('flipped');
    card.innerHTML = '<span>✦</span>';
  }

  cards.forEach((card) => {
    card.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!running || locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
      card.classList.add('flipped');
      card.textContent = card.dataset.face;
      Sfx.tone(520, 0.1, 'sine', 0.04, 0, 30);
      if (!first) {
        first = card;
        return;
      }
      if (first.dataset.face === card.dataset.face) {
        first.classList.add('matched');
        card.classList.add('matched');
        first = null;
        pairs += 1;
        shell.scoreEl.textContent = pairs;
        Sfx.pop();
        burstOn(card, ['✨', '🌙', '💛'], 4);
        if (pairs === faces.length) finish(true);
      } else {
        locked = true;
        const a = first;
        const b = card;
        first = null;
        later(() => {
          hide(a);
          hide(b);
          locked = false;
        }, 720);
      }
    });
  });

  const clock = setInterval(() => {
    if (!running) return;
    remaining = Math.max(0, remaining - 0.1);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / 40) * 100}%`;
    if (remaining <= 0) finish(false);
  }, 100);
  timers.add(clock);

  function finish(won) {
    if (!running) return;
    running = false;
    timers.forEach((id) => { clearTimeout(id); clearInterval(id); });
    const coins = 10 + pairs * 7;
    const xp = 8 + pairs * 4;
    showGameResult(shell, {
      kind: 'match', score: pairs, coins, xp,
      blurb: won ? 'Every pair found!' : pairs >= 3 ? 'A sharp moon-memory!' : 'The cards are shy today.',
    });
    Sfx[won ? 'win' : 'pop']();
  }

  shell.addCleanup(() => {
    running = false;
    timers.forEach((id) => { clearTimeout(id); clearInterval(id); });
  });
}

/* ---------------- COIN DIG ---------------- */
function openDigGame() {
  const shell = gameOverlayShell('dig');
  const { board } = shell;
  board.innerHTML = `<div class="nectar-grid">
      ${Array.from({ length: 12 }, (_, i) => `<button class="nectar-pad" data-pad="${i}" aria-label="Buried treasure"></button>`).join('')}
    </div>${gameMiniSprite()}`;
  const pads = [...board.querySelectorAll('.nectar-pad')];
  const timers = new Set();
  let score = 0;
  let running = true;
  let remaining = 20;

  function clearPad(pad) {
    if (pad._digTimer) clearTimeout(pad._digTimer);
    pad._digTimer = null;
    pad.className = 'nectar-pad';
    pad.textContent = '';
    delete pad.dataset.kind;
  }

  function spawn() {
    if (!running) return;
    const idle = pads.filter((p) => !p.dataset.kind);
    for (let n = 0; n < 3 && idle.length; n++) {
      const index = randInt(0, idle.length - 1);
      const pad = idle.splice(index, 1)[0];
      const roll = Math.random();
      const kind = score >= 6 && roll < 0.2 ? 'bomb' : roll > 0.9 ? 'gem' : 'coin';
      pad.dataset.kind = kind;
      pad.textContent = kind === 'bomb' ? '💣' : kind === 'gem' ? '💎' : '🪙';
      pad.style.fontSize = '22px';
      pad._digTimer = setTimeout(() => { if (running) clearPad(pad); }, rand(780, 1250));
    }
  }

  pads.forEach((pad) => {
    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!running || !pad.dataset.kind) return;
      if (pad.dataset.kind === 'bomb') {
        score = Math.max(0, score - 2);
        Sfx.error();
        tapHaptic(20);
      } else if (pad.dataset.kind === 'gem') {
        score += 3;
        Sfx.win();
        burstOn(pad, ['💎', '✨', '🪙'], 5);
      } else {
        score += 1;
        Sfx.coin();
        burstOn(pad, ['🪙', '✨'], 3);
      }
      shell.scoreEl.textContent = score;
      clearPad(pad);
    });
  });

  const spawnTimer = setInterval(spawn, 520);
  const clock = setInterval(() => {
    if (!running) return;
    remaining = Math.max(0, remaining - 0.1);
    shell.timerEl.textContent = `${Math.ceil(remaining)}s`;
    shell.timerBar.style.width = `${(remaining / 20) * 100}%`;
    if (remaining <= 0) finish();
  }, 100);
  timers.add(spawnTimer);
  timers.add(clock);
  spawn();

  function finish() {
    if (!running) return;
    running = false;
    timers.forEach(clearInterval);
    pads.forEach(clearPad);
    const coins = Math.min(85, 10 + score * 4);
    const xp = 10 + score * 2;
    showGameResult(shell, {
      kind: 'dig', score, coins, xp,
      blurb: score >= 24 ? 'Buried treasure legend!' : score >= 12 ? 'A rich haul!' : score >= 5 ? 'Pocket full of coins!' : 'The chest was empty.',
    });
  }

  shell.addCleanup(() => {
    running = false;
    timers.forEach(clearInterval);
    pads.forEach(clearPad);
  });
}

function openGame(kind) {
  Sfx.init();
  if (typeof SPORT_GAME_KEYS !== 'undefined' && SPORT_GAME_KEYS.includes(kind)) {
    openSportGame(kind);
    return;
  }
  if (typeof WALK_GAME_KEYS !== 'undefined' && WALK_GAME_KEYS.includes(kind)) {
    openWalkGame(kind);
    return;
  }
  if (!activeSprite()) {
    toast('Hatch a sprite first to play together.', '🥚');
    return;
  }
  const info = GAME_INFO[kind];
  if (info?.unlock && (state.stats.checkins || 0) < info.unlock) {
    toast(`Check in ${info.unlock - (state.stats.checkins || 0)} more time${info.unlock - (state.stats.checkins || 0) === 1 ? '' : 's'} to unlock ${info.title}.`, '🔒');
    Sfx.error();
    return;
  }
  if (kind === 'catch') openCatchGame();
  else if (kind === 'pulse') openPulseGame();
  else if (kind === 'copycat') openCopycatGame();
  else if (kind === 'nectar') openNectarGame();
  else if (kind === 'match') openMatchGame();
  else if (kind === 'dig') openDigGame();
  else if (kind === 'rune') openRuneSlideGame();
  else if (kind === 'zombie') openZombieSiegeGame();
  else if (kind === 'duel') openHollowDuelGame();
  else if (typeof openSeasonalGame === 'function') openSeasonalGame(kind);
}
