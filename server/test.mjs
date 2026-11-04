#!/usr/bin/env node
/* End-to-end check for the Sprite Hollow Pet Earn API: open signup, care economy,
   verified minigames, admin settings and anti-tamper guards.
   Run against a live dev server:
     node server/dev.mjs 3999 &
     node server/test.mjs http://127.0.0.1:3999
*/

import { DatabaseSync } from 'node:sqlite';

const BASE = process.argv[2] || 'http://127.0.0.1:3999';
const DB_PATH = process.env.COIN_PETS_DB || '.coinpets/coinpets.sqlite';

let passed = 0;
const failures = [];
function check(name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`  ok  ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
    console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

function client(label) {
  let cookie = '';
  return {
    label,
    async call(path, { method, body, origin, headers = {} } = {}) {
      const res = await fetch(BASE + path, {
        method: method || (body ? 'POST' : 'GET'),
        headers: {
          ...(body ? { 'content-type': 'application/json' } : {}),
          ...(cookie ? { cookie } : {}),
          ...(origin ? { origin } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const setCookies = res.headers.getSetCookie?.() || [];
      const session = setCookies.find((c) => c.startsWith('cp_session='));
      if (session) {
        const value = session.split(';')[0];
        cookie = value === 'cp_session=' ? '' : value;
      }
      const text = await res.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch { /* not JSON, e.g. CSV */ }
      return { status: res.status, data, text, headers: res.headers };
    },
  };
}

const db = new DatabaseSync(DB_PATH);
// Push every run for a player into the past so the per-run cooldown and the
// "played too fast" guard both see a normal, completed session.
const backdateRuns = (username, seconds) => {
  db.prepare(
    'UPDATE game_runs SET started_at = started_at - ? WHERE user_id = (SELECT id FROM users WHERE username = ?)',
  ).run(seconds * 1000, username);
};

const owner = client('owner');
const player = client('player');
const stranger = client('stranger');

console.log(`\nSprite Hollow Pet Earn API checks against ${BASE}\n`);

/* 1. bootstrap + owner signup */
const boot = await owner.call('/api/bootstrap');
check('bootstrap says setup needed', boot.status === 200 && boot.data.needsSetup === true);

/* 1b. no sign-in: a pet is handed out on demand */
const guest = client('guest');
const guestStart = await guest.call('/api/guest', { method: 'POST' });
check('guest pet starts without signing in', guestStart.status === 201 && !!guestStart.data.pet?.name && guestStart.data.wallet?.coins === 250, JSON.stringify(guestStart.data).slice(0, 160));
check('guest session is reused, not duplicated', (await guest.call('/api/guest', { method: 'POST' })).status === 200);
const guestCare = await guest.call('/api/pet/care', { body: { action: 'feed' } });
check('guest earns coins immediately', guestCare.status === 200 && guestCare.data.award > 0, JSON.stringify(guestCare.data).slice(0, 160));

const ownerName = `owner_${Date.now().toString(36).slice(-5)}`;
const ownerSignup = await owner.call('/api/auth/signup', {
  body: { username: ownerName, password: 'hollowpass1', petName: 'Bramble' },
});
check('first account becomes owner', ownerSignup.status === 201 && ownerSignup.data.user.isAdmin === true, JSON.stringify(ownerSignup.data));
check('welcome coins exist', ownerSignup.data.wallet?.coins === 250, `coins=${ownerSignup.data.wallet?.coins}`);

const dupe = await stranger.call('/api/auth/signup', {
  body: { username: ownerName, password: 'hollowpass1', petName: 'Copycat' },
});
check('duplicate name rejected', dupe.status === 409);

/* 2. invites + player signup */
const invite = await owner.call('/api/admin/invites', { body: { count: 1, label: 'test' } });
check('owner can mint an invite code', invite.status === 201 && invite.data.codes.length === 1);
const code = invite.data.codes[0];

const noInvite = await stranger.call('/api/auth/signup', {
  body: { username: `nope_${Date.now().toString(36).slice(-4)}`, password: 'hollowpass1', petName: 'Nobody' },
});
check('signup needs no invite code at all', noInvite.status === 201 && noInvite.data.user.isAdmin === false, `status=${noInvite.status}`);

const playerName = `p_${Date.now().toString(36).slice(-5)}`;
const playerSignup = await player.call('/api/auth/signup', {
  body: { username: playerName, password: 'hollowpass1', petName: 'Mochi', inviteCode: code },
});
check('invited player signs up', playerSignup.status === 201 && playerSignup.data.user.isAdmin === false, JSON.stringify(playerSignup.data));
check('a used invite code is ignored, not refused', (await stranger.call('/api/auth/signup', {
  body: { username: `re_${Date.now().toString(36).slice(-4)}`, password: 'hollowpass1', petName: 'Again', inviteCode: code },
})).status === 201);

/* 3. care economy */
const care1 = await player.call('/api/pet/care', { body: { action: 'feed' } });
check('feeding awards coins', care1.status === 200 && care1.data.award > 0, JSON.stringify(care1.data).slice(0, 160));
check('feeding restores hunger', care1.data.pet.hunger > 80);
check('care applies a cooldown', care1.data.pet.cooldowns.feed > 0);
const care2 = await player.call('/api/pet/care', { body: { action: 'feed' } });
check('feeding again is rate limited', care2.status === 429 && care2.data.retryAfter > 0);

const clean = await player.call('/api/pet/care', { body: { action: 'clean' } });
check('cleaning works independently', clean.status === 200 && clean.data.pet.cleanliness > 80);

/* 4. pet decay */
db.prepare('UPDATE pets SET updated_at = updated_at - 28800000 WHERE name = ?').run('Mochi');
const decayed = await player.call('/api/me');
check('needs decay over time', decayed.data.pet.hunger < 70, `hunger=${decayed.data.pet.hunger}`);
check('decay is persisted', (await player.call('/api/me')).data.pet.hunger <= decayed.data.pet.hunger + 0.2);

/* 5. minigames, server verified */
const run = await player.call('/api/games/start', { body: { game: 'motes' } });
check('mote run starts with rounds', run.status === 200 && run.data.rounds.length === 12);
backdateRuns(playerName, 120);

const honestTaps = run.data.rounds.map((r) => ({ i: r.i, t: r.at + 350, c: r.cell }));
const claim = await player.call('/api/games/claim', { body: { runId: run.data.runId, taps: honestTaps } });
check('honest taps score full', claim.status === 200 && claim.data.score === 12, JSON.stringify(claim.data));
check('minigame pays coins', claim.data.coins > 0);
check('run cannot be claimed twice', (await player.call('/api/games/claim', { body: { runId: run.data.runId, taps: honestTaps } })).status === 409);

const cheatRun = await player.call('/api/games/start', { body: { game: 'guard' } });
check('guard run has both bees and thistles', cheatRun.data.rounds.some((r) => r.kind === 'thistle') && cheatRun.data.rounds.some((r) => r.kind === 'mote'));
backdateRuns(playerName, 120);
const allAtOnce = cheatRun.data.rounds.map((r) => ({ i: r.i, t: 0, c: r.cell }));
const cheatClaim = await player.call('/api/games/claim', { body: { runId: cheatRun.data.runId, taps: allAtOnce } });
check('instant fake taps score zero', cheatClaim.status === 200 && cheatClaim.data.score === 0 && cheatClaim.data.coins === 0, JSON.stringify(cheatClaim.data));

const wrongCellRun = await player.call('/api/games/start', { body: { game: 'motes' } });
backdateRuns(playerName, 120);
const wrongCells = wrongCellRun.data.rounds.map((r) => ({ i: r.i, t: r.at + 400, c: (r.cell + 1) % 9 }));
const wrongClaim = await player.call('/api/games/claim', { body: { runId: wrongCellRun.data.runId, taps: wrongCells } });
check('taps on the wrong plot do not score', wrongClaim.data.score === 0);

/* 6. daily caps and cross-origin guards */
await owner.call('/api/admin/settings', { method: 'PUT', body: { dailyCareCoinCap: 0 } });
const cappedCare = await player.call('/api/pet/care', { body: { action: 'play' } });
check('daily care coin cap is enforced', cappedCare.status === 200 && cappedCare.data.award === 0, JSON.stringify(cappedCare.data));
await owner.call('/api/admin/settings', { method: 'PUT', body: { dailyCareCoinCap: 250 } });

const crossOrigin = await player.call('/api/pet/care', { body: { action: 'play' }, origin: 'http://evil.example' });
check('cross-origin mutation refused', crossOrigin.status === 403);

const anon = await client('anon').call('/api/me');
check('signed-out request is 401', anon.status === 401);
const badLogin = await client('bad').call('/api/auth/login', { body: { username: playerName, password: 'wrong-password' } });
check('wrong password rejected', badLogin.status === 401);
const goodLogin = await client('back').call('/api/auth/login', { body: { username: playerName, password: 'hollowpass1' } });
check('login restores the same account', goodLogin.status === 200 && goodLogin.data.pet.name === 'Mochi');
check('unknown game rejected', (await player.call('/api/games/start', { body: { game: 'cheat-mode' } })).status === 400);

/* 9b. Hollow coins reach the real wallet */
const earner = client('earner');
await earner.call('/api/guest', { method: 'POST' });
const walletBefore = (await earner.call('/api/wallet')).data.wallet.coins;
const banked = await earner.call('/api/earn', { body: { amount: 60, source: 'game', key: 'game-1' } });
check('coins earned in the game reach the wallet', banked.status === 200 && banked.data.award === 60 && banked.data.wallet.coins === walletBefore + 60, JSON.stringify(banked.data).slice(0, 140));
const replay = await earner.call('/api/earn', { body: { amount: 60, source: 'game', key: 'game-1' } });
check('the same win is never paid twice', replay.status === 200 && replay.data.award === 0 && replay.data.wallet.coins === walletBefore + 60);
const questBank = await earner.call('/api/earn', { body: { amount: 40, source: 'quest', key: 'quest-1' } });
check('quest rewards bank too', questBank.status === 200 && questBank.data.award === 40 && questBank.data.wallet.coins === walletBefore + 100);
check('the ledger records the source', (await earner.call('/api/wallet')).data.ledger.some((l) => l.kind === 'earn' && l.source === 'quest'));
check('an unknown source is refused', (await earner.call('/api/earn', { body: { amount: 10, source: 'cheat', key: 'bad-1' } })).status === 400);
check('a zero amount is refused', (await earner.call('/api/earn', { body: { amount: 0, source: 'game', key: 'bad-2' } })).status === 400);
check('an absurd amount is refused', (await earner.call('/api/earn', { body: { amount: 5000, source: 'game', key: 'bad-3' } })).status === 400);
check('a bank request needs an id', (await earner.call('/api/earn', { body: { amount: 10, source: 'game' } })).status === 400);
check('banking needs a session', (await client('anon-earn').call('/api/earn', { body: { amount: 10, source: 'game', key: 'bad-4' } })).status === 401);
const fill = await earner.call('/api/earn', { body: { amount: 500, source: 'game', key: 'game-fill' } });
check('banking tops the wallet up to the daily room', fill.status === 200 && fill.data.award === 500, JSON.stringify(fill.data).slice(0, 120));
const overCap = await earner.call('/api/earn', { body: { amount: 50, source: 'game', key: 'game-over' } });
check('the daily game coin cap is enforced', overCap.status === 429, `status=${overCap.status}`);

/* 10. leaving for good */
const quitter = client('quitter');
const quitSignup = await quitter.call('/api/auth/signup', {
  body: { username: 'todelete', password: 'hollowpass9', petName: 'Pip' },
});
check('a throwaway account can sign up', quitSignup.status === 201, `status=${quitSignup.status}`);
check('deleting asks for the password', (await quitter.call('/api/account', { method: 'DELETE', body: {} })).status === 400);
check('a wrong password cannot delete an account', (await quitter.call('/api/account', { method: 'DELETE', body: { password: 'nope' } })).status === 403);
const deleted = await quitter.call('/api/account', { method: 'DELETE', body: { password: 'hollowpass9' } });
check('the right password deletes the account', deleted.status === 200 && deleted.data.ok === true, `status=${deleted.status} ${deleted.text?.slice(0, 90)}`);
check('its session is gone', (await quitter.call('/api/me')).status === 401);
check('it can no longer sign in', (await client('gone').call('/api/auth/login', { body: { username: 'todelete', password: 'hollowpass9' } })).status === 401);
check('the pet row is gone with it', (await quitter.call('/api/wallet')).status === 401);

const guest2 = client('guestdelete');
const guestJoin = await guest2.call('/api/guest', { method: 'POST' });
check('a guest has a session', guestJoin.status === 201 && typeof guestJoin.data.token === 'string');
check('a guest leaves without a password', (await guest2.call('/api/account', { method: 'DELETE', body: {} })).status === 200);
check('the guest session is dead', (await guest2.call('/api/wallet')).status === 401);

/* the owner still exists after all of that */
check('existing accounts are untouched', (await client('still').call('/api/auth/login', { body: { username: playerName, password: 'hollowpass1' } })).status === 200);

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) console.log(` - ${f}`);
  process.exit(1);
}
