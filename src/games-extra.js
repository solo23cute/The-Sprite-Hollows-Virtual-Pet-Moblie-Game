/* Additional coin games, loaded after the core games. */

Object.assign(GAME_INFO, {
  green: { title: 'Green Toss', icon: '🟢', tag: 'Timing', desc: 'Toss the green ring when the marker crosses the basket.', g1: '#7ee787', g2: '#38bdf8', unlock: 6 },
  candycrunch: { title: 'Candy Crunch', icon: '🍬', tag: 'Reflexes', desc: 'Tap candies, dodge the toothaches.', g1: '#ff8fc8', g2: '#ffd166', unlock: 14 },
  lights: { title: 'Holiday Lights', icon: '🎄', tag: 'Memory', desc: 'Watch the ornaments, then repeat the glow.', g1: '#8b7bff', g2: '#7ee787', unlock: 20 },
});

function openSeasonalGame(kind) {
  if (kind === 'green') openGreenTossGame();
  else if (kind === 'candycrunch') openCandyCrunchGame();
  else if (kind === 'lights') openHolidayLightsGame();
}

function openGreenTossGame() {
  const shell = gameOverlayShell('green');
  const { board } = shell;
  board.innerHTML = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:18px">
      <div style="font-size:40px">🧺</div>
      <div style="position:relative;width:84%;height:54px;border-radius:27px;background:rgba(255,255,255,.07);border:1px solid var(--line);overflow:hidden">
        <div style="position:absolute;left:50%;top:0;width:20%;height:100%;transform:translateX(-50%);background:rgba(126,231,135,.22);border-left:1px dashed rgba(126,231,135,.6);border-right:1px dashed rgba(126,231,135,.6)"></div>
        <div data-marker style="position:absolute;top:4px;left:8%;width:14px;height:46px;border-radius:7px;background:#7ee787;box-shadow:0 0 14px rgba(126,231,135,.7)"></div>
      </div>
      <button class="btn btn-gold btn-block" data-toss style="max-width:230px">Toss the ring</button>
      <div class="tiny muted" data-msg>Toss when the marker is in the green band.</div>
    </div>${gameMiniSprite()}`;
  const marker = board.querySelector('[data-marker]');
  const msg = board.querySelector('[data-msg]');
  let position = 8;
  let direction = 1;
  let tosses = 0;
  let score = 0;
  let running = true;
  let raf = 0;
  let last = performance.now();

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    position += direction * 58 * dt;
    if (position >= 92) { position = 92; direction = -1; }
    if (position <= 8) { position = 8; direction = 1; }
    marker.style.left = `${position}%`;
    raf = requestAnimationFrame(loop);
  }

  function toss() {
    if (!running) return;
    tosses += 1;
    const diff = Math.abs(position - 50);
    const points = diff <= 7 ? 3 : diff <= 16 ? 2 : diff <= 28 ? 1 : 0;
    score += points;
    shell.scoreEl.textContent = score;
    shell.timerEl.textContent = `Toss ${tosses} / 8`;
    shell.timerBar.style.width = `${(tosses / 8) * 100}%`;
    msg.textContent = points === 3 ? 'Swish! Perfect toss.' : points === 2 ? 'Nice — right in the basket.' : points === 1 ? 'Clipped the rim.' : 'Air ball. Try again.';
    if (points) Sfx.coin(); else Sfx.error();
    burstOn(board, points ? ['🟢', '✨', '🪙'] : ['💨'], points ? 6 : 3);
    if (tosses >= 8) {
      running = false;
      cancelAnimationFrame(raf);
      setTimeout(finish, 420);
    }
  }

  board.addEventListener('pointerdown', (e) => { e.preventDefault(); toss(); });
  raf = requestAnimationFrame((now) => { last = now; loop(now); });

  function finish() {
    const coins = Math.min(80, 10 + score * 4);
    const xp = 10 + score * 3;
    showGameResult(shell, {
      kind: 'green', score, coins, xp,
      blurb: score >= 20 ? 'Green-thumbed champion!' : score >= 12 ? 'A steady toss!' : score > 0 ? 'The basket is warming up.' : 'The ring went exploring.',
    });
  }

  shell.addCleanup(() => { running = false; cancelAnimationFrame(raf); });
}

function openCandyCrunchGame() {
  const shell = gameOverlayShell('candycrunch');
  const { board } = shell;
  board.innerHTML = `<div class="nectar-grid">
      ${Array.from({ length: 9 }, (_, i) => `<button class="nectar-pad" data-pad="${i}" aria-label="Candy square"></button>`).join('')}
    </div>${gameMiniSprite()}`;
  const pads = [...board.querySelectorAll('.nectar-pad')];
  const timers = new Set();
  let score = 0;
  let running = true;
  let remaining = 20;

  function clearPad(pad) {
    if (pad._candyTimer) clearTimeout(pad._candyTimer);
    pad._candyTimer = null;
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
      const hazard = score >= 5 && chance(0.2);
      pad.dataset.kind = hazard ? 'tooth' : 'candy';
      pad.textContent = hazard ? pick(['🦷', '🪥']) : pick(['🍬', '🍭', '🍫', '🍩', '🧁']);
      pad.style.fontSize = '22px';
      pad._candyTimer = setTimeout(() => { if (running) clearPad(pad); }, rand(760, 1150));
    }
  }

  pads.forEach((pad) => {
    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!running || !pad.dataset.kind) return;
      if (pad.dataset.kind === 'tooth') {
        score = Math.max(0, score - 1);
        Sfx.error();
        tapHaptic(18);
      } else {
        score += 1;
        Sfx.pop();
        burstOn(pad, ['🍬', '✨'], 4);
      }
      shell.scoreEl.textContent = score;
      clearPad(pad);
    });
  });

  const spawnTimer = setInterval(spawn, 500);
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
      kind: 'candycrunch', score, coins, xp,
      blurb: score >= 22 ? 'Sugar rush champion!' : score >= 12 ? 'A sweet haul!' : score >= 5 ? 'Sticky fingers!' : 'The candy escaped.',
    });
  }

  shell.addCleanup(() => {
    running = false;
    timers.forEach(clearInterval);
    pads.forEach(clearPad);
  });
}

function openHolidayLightsGame() {
  const shell = gameOverlayShell('lights');
  const { board } = shell;
  const TONES = [392, 523, 659, 784];
  board.innerHTML = `<div class="pads">
      ${['#ff6b7a', '#7ee787', '#ffd166', '#8be9ff'].map((color, i) => `<button class="pad" data-light="${i}" aria-label="Holiday light ${i + 1}" style="background:${color}"></button>`).join('')}
    </div>
    <div class="game-msg" data-msg><div><h3>Watch the lights…</h3><p>Repeat the glow pattern.</p></div></div>
    ${gameMiniSprite()}`;
  const pads = [...board.querySelectorAll('.pad')];
  const msg = board.querySelector('[data-msg]');
  const timers = new Set();
  let sequence = [];
  let inputIndex = 0;
  let round = 0;
  let running = true;
  let accepting = false;
  const MAX_ROUNDS = 6;

  function later(fn, ms) {
    const id = setTimeout(() => { if (running) fn(); }, ms);
    timers.add(id);
    return id;
  }

  function flash(index, duration = 400) {
    pads[index].classList.add('lit');
    Sfx.tone(TONES[index], 0.2, 'sine', 0.05, 0, 40);
    later(() => pads[index].classList.remove('lit'), duration);
  }

  function playback() {
    accepting = false;
    msg.innerHTML = '<div><h3>Watch…</h3><p>Round ' + (round + 1) + '</p></div>';
    sequence.forEach((value, i) => later(() => flash(value), 420 + i * 520));
    later(() => {
      msg.innerHTML = '<div><h3>Your turn</h3><p>Repeat the lights</p></div>';
      accepting = true;
      inputIndex = 0;
    }, 420 + sequence.length * 520 + 160);
  }

  function nextRound() {
    round += 1;
    sequence.push(randInt(0, 3));
    shell.scoreEl.textContent = round - 1;
    playback();
  }

  function press(index) {
    if (!running || !accepting) return;
    flash(index, 200);
    if (sequence[inputIndex] !== index) {
      accepting = false;
      pads[index].classList.add('wrong');
      later(() => pads[index].classList.remove('wrong'), 320);
      msg.innerHTML = '<div><h3>Flicker!</h3><p>Wrong light. The ornaments forgive you.</p></div>';
      Sfx.error();
      later(() => finish(false), 750);
      return;
    }
    inputIndex += 1;
    if (inputIndex >= sequence.length) {
      accepting = false;
      shell.scoreEl.textContent = round;
      if (round >= MAX_ROUNDS) {
        msg.innerHTML = '<div><h3>All aglow!</h3><p>Every light remembered.</p></div>';
        later(() => finish(true), 650);
        return;
      }
      msg.innerHTML = '<div><h3>Lovely!</h3><p>Next pattern…</p></div>';
      later(nextRound, 680);
    }
  }

  pads.forEach((pad, index) => {
    pad.addEventListener('pointerdown', (event) => { event.preventDefault(); press(index); });
  });

  function finish(won) {
    if (!running) return;
    running = false;
    timers.forEach(clearTimeout);
    const score = sequence.length - 1 + (won ? 1 : 0);
    const coins = Math.min(80, 10 + score * 9);
    const xp = 12 + score * 4;
    showGameResult(shell, {
      kind: 'lights', score, coins, xp,
      blurb: won ? 'Every light in perfect order!' : score >= 4 ? 'A bright memory!' : 'The lights are shy today.',
    });
  }

  later(() => { msg.innerHTML = ''; nextRound(); }, 1000);
  shell.addCleanup(() => {
    running = false;
    timers.forEach(clearTimeout);
  });
}
