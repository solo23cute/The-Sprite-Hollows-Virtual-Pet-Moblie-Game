/* Rewards — the Hollow economy in one sheet: your numbers, the daily spin and
   every quest the game already tracks (daily, weekly, monthly). Native to the
   app: same sheet, same palette, same state and the same Actions that pay. */
(function () {
  'use strict';

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
  const PERIODS = [
    { key: 'daily', label: 'Today' },
    { key: 'weekly', label: 'This week' },
    { key: 'monthly', label: 'This month' },
  ];
  const todayKey = () => (typeof dayKey === 'function' ? dayKey() : new Date().toISOString().slice(0, 10));

  function tasksFor(period) {
    const bucket = period === 'weekly' ? state.weekly : period === 'monthly' ? state.monthly : state.daily;
    const tasks = Array.isArray(bucket?.tasks) ? bucket.tasks : [];
    return tasks;
  }

  function allQuests() {
    const rows = [];
    PERIODS.forEach((p) => tasksFor(p.key).forEach((t) => rows.push({ t, period: p.key, label: p.label })));
    return rows;
  }

  function progressOf(task, period) {
    const raw = typeof periodCounter === 'function' ? periodCounter(task, period) : 0;
    return Math.max(0, Math.min(Number(task.goal) || 1, Number(raw) || 0));
  }

  function summary() {
    const sprites = Array.isArray(state.sprites) ? state.sprites : [];
    const bestLevel = sprites.reduce((top, s) => Math.max(top, Number(s.level) || 1), 0);
    const quests = allQuests();
    const ready = quests.filter(({ t, period }) => !t.claimed && progressOf(t, period) >= t.goal).length;
    const claimed = quests.filter(({ t }) => t.claimed).length;
    return {
      coins: Math.max(0, Number(state.coins) || 0),
      streak: Math.max(0, Number(state.checkin?.streak) || 0),
      bestLevel,
      hatched: sprites.filter((s) => s.stage !== 'egg').length,
      ready,
      claimed,
      total: quests.length,
      spun: state.spin?.date === todayKey(),
      spinReward: Math.max(0, Number(state.spin?.reward) || 0),
    };
  }

  function statCard(label, value, hint, tint) {
    return `<div class="card" style="padding:12px 14px;background:linear-gradient(150deg, ${tint}2b, var(--panel));border:1px solid ${tint}3d">
      <div class="tiny muted" style="letter-spacing:.08em;text-transform:uppercase">${esc(label)}</div>
      <div style="font-size:23px;font-weight:800;line-height:1.2;margin-top:3px;color:${tint}">${esc(value)}</div>
      <div class="tiny muted">${esc(hint)}</div>
    </div>`;
  }

  function spinCard(s) {
    const prizes = typeof SPIN_PRIZES !== 'undefined' ? SPIN_PRIZES : [25, 50, 100, 250, 500];
    const chips = prizes.map((p) => `<span class="chip" style="font-variant-numeric:tabular-nums">${p}</span>`).join(' ');
    const result = s.spun
      ? `<p class="tiny" style="margin:8px 0 0;color:var(--gold)">Today's spin paid <b>+${s.spinReward}</b> coins. A fresh spin unlocks tomorrow.</p>`
      : '<p class="tiny muted" style="margin:8px 0 0">One spin a day. Land anywhere from 25 to 500 Hollow coins.</p>';
    return `<div class="card" style="padding:14px;margin-top:14px;background:linear-gradient(150deg, var(--accent)22, var(--panel))">
      <div class="between" style="gap:10px">
        <div><b>Daily spin</b><div class="tiny muted">Every outcome is a win</div></div>
        <span class="chip" style="color:var(--gold)">${s.spun ? 'Spun today' : 'Ready'}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">${chips}</div>
      ${result}
      <button class="btn btn-gold btn-block" data-spin style="margin-top:10px" ${s.spun ? 'disabled' : ''}>
        ${s.spun ? 'Come back tomorrow' : 'Spin the wheel'}
      </button>
    </div>`;
  }

  function questRow(task, period) {
    const have = progressOf(task, period);
    const goal = Math.max(1, Number(task.goal) || 1);
    const ready = !task.claimed && have >= goal;
    const width = Math.round((Math.min(have, goal) / goal) * 100);
    const label = typeof taskLabel === 'function' ? taskLabel(task) : (task.label || task.id);
    const action = task.claimed
      ? '<span class="chip" style="color:var(--good)">Claimed</span>'
      : `<button class="btn ${ready ? 'btn-gold' : 'btn-ghost'}" data-claim="${esc(period)}:${esc(task.id)}" ${ready ? '' : 'disabled'}>${ready ? `Claim +${esc(task.reward)}` : 'In progress'}</button>`;
    return `<div class="card" style="padding:12px 14px;margin-top:8px">
      <div class="between" style="gap:10px;align-items:flex-start">
        <div><b>${esc(label)}</b><div class="tiny muted">${esc(task.xp ? `+${task.xp} sprite XP` : 'care in the Hollow')}</div></div>
        <span class="chip" style="color:var(--gold)">+${esc(task.reward)}</span>
      </div>
      <div class="bar" style="margin-top:9px"><i style="width:${width}%"></i></div>
      <div class="between" style="margin-top:8px;align-items:center">
        <span class="tiny muted" style="font-variant-numeric:tabular-nums">${have} / ${goal}</span>
        ${action}
      </div>
    </div>`;
  }

  function bodyHTML() {
    const s = summary();
    const quests = allQuests();
    const groups = PERIODS.map((p) => {
      const rows = quests.filter((q) => q.period === p.key);
      if (!rows.length) return '';
      const claimed = rows.filter((q) => q.t.claimed).length;
      return `<div style="margin-top:16px">
        <div class="between"><b style="font-size:14px">${esc(p.label)}</b><span class="tiny muted">${claimed}/${rows.length} claimed</span></div>
        ${rows.map((q) => questRow(q.t, q.period)).join('')}
      </div>`;
    }).join('');

    return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${statCard('Coins', s.coins.toLocaleString(), 'spend in the shop', 'var(--gold)')}
      ${statCard('Streak', `${s.streak} day${s.streak === 1 ? '' : 's'}`, 'daily check-ins', 'var(--warn)')}
      ${statCard('Best level', s.bestLevel ? `Lv ${s.bestLevel}` : '—', `${s.hatched} sprite${s.hatched === 1 ? '' : 's'} hatched`, 'var(--accent)')}
      ${statCard('Quests', `${s.claimed}/${s.total}`, s.ready ? `${s.ready} ready to claim` : 'claim rewards below', 'var(--good)')}
    </div>
    ${spinCard(s)}
    ${groups}
    <p class="tiny muted" style="margin-top:16px;text-align:center">Quests reset on their own. Coins here are Hollow coins — your wallet is in the pill at the top.</p>`;
  }

  function bind(host, redraw) {
    if (!host || typeof host.querySelectorAll !== 'function') return;
    host.querySelectorAll('[data-claim]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const [period, id] = String(btn.dataset.claim || '').split(':');
        if (!period || !id) return;
        const res = Actions.claimTask(id, period);
        if (res && res.ok) {
          redraw();
          if (typeof updateBadges === 'function') updateBadges();
        } else if (typeof toast === 'function') {
          toast(res?.reason === 'claimed' ? 'That one is already claimed.' : 'Keep going — this one is not finished yet.', '🎯');
        }
      });
    });
    const spinBtn = host.querySelector('[data-spin]');
    if (spinBtn) {
      spinBtn.addEventListener('click', () => {
        const res = Actions.spinWheel();
        if (res && res.ok) {
          redraw();
          if (typeof updateTopbar === 'function') updateTopbar();
        } else if (typeof toast === 'function') {
          toast(res?.reason === 'spun' ? 'Come back tomorrow for another spin.' : 'The wheel is resting.', '🎡');
        }
      });
    }
  }

  function open() {
    let root = null;
    const redraw = () => {
      const body = root && root.querySelector ? root.querySelector('.sheet-body') : null;
      if (!body) return;
      body.innerHTML = bodyHTML();
      bind(root, redraw);
    };
    const sheet = openSheet({
      title: 'Rewards',
      sub: 'Quests, your numbers and the daily spin — all earned in the Hollow.',
      body: bodyHTML(),
      onMount: (host) => { root = host; bind(host, redraw); },
    });
    return sheet;
  }

  window.Economy = { open, summary, body: bodyHTML, refresh: () => { if (typeof updateBadges === 'function') updateBadges(); } };
})();
