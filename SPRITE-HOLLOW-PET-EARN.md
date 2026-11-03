# Sprite Hollow Pet Earn

A play-to-earn virtual pet inside Sprite Hollow. Players care for one pet, play
two short minigames for coins, and request PayPal payouts that the owner reviews
by hand. Any coins you earn can be cashed out to PayPal, whether you joined with
an invite or own the place. Every coin, pet need and payout status is computed
on the server — the browser only asks for actions.

Earn inside Sprite Hollow: feeding, bathing, belly rubs, fetch and play in the
Hollow all pay server-side coins. Cash out whenever you like from **Settings →
Coins & wallet → Wallet**, with your coin amount and PayPal email. The owner
reviews requests in the same sheet through **Payout review**. There is no
separate coin-pets screen and players never sign up.

## Run it locally

No dependencies. Node 22.5+ (for `node:sqlite`), which the dev server uses in
place of Cloudflare D1:

```bash
node server/dev.mjs 3003
# open http://127.0.0.1:3003
```

The database is created at `.coinpets/coinpets.sqlite` (gitignored) from
`server/schema.sql`. Delete that folder to start fresh.

**Nobody signs in to play.** Opening Pet Earn starts a guest pet on the spot —
no name, no password, no invite code. Its coins, care streak and payout history
follow that browser's session cookie, and every action is still recorded in the
server-side ledger.

**The owner seat needs no account and no code.** The first session to open
Wallet → Owner tools takes it, and every session after that is an ordinary
player. It is only needed to review payouts, change payout settings and mint
invite codes for older account-based signups. Deleting the owner's guest account
frees the seat for the next session.

Set `ADMIN_INVITE_CODE` before boot if you would rather protect the first admin
account with a secret:

```bash
ADMIN_INVITE_CODE=your-secret node server/dev.mjs 3003
```

## What the player gets

Earning happens in the game. Feed, bath, belly-rub, fetch and minigames all pay
server-side coins, and caring on the main Hollow screen pays them too; the
server's cooldowns and daily caps still apply. The top bar shows two labelled
pills — **cash** for the withdrawable balance and **shop** for Hollow coins.

- **Pet screen** — animated pet with four moods (happy, hungry, mucky, sad),
  hunger / cleanliness / happiness bars, a care streak and today's earnings.
- **Care** — feed, clean and play. Each restores its need and pays coins. A
  happier pet pays more (×0.6–×1.5) and a streak adds up to +35%.
- **Games** — *Mote Tap* (12 targets, shrinking windows) and *Garden Guard* (14
  calls: tap the bees, leave the thistles). Scores are recomputed from a
  server-issued seed, so a claimed score must match a run that could actually
  have been played, on the right plots, at the right times.
- **Wallet** — balance, coin→cash estimate, signed withdrawal history with
  pending / approved / paid / rejected, and an earning ledger. Every player can
  request a payout from the coins they earned.
- **Admin** — pending queue with approve / reject / mark paid, all players with
  balances and moods, coins in circulation, payout settings, invite codes, and a
  **CSV payout export** of every approved and paid request (PayPal email, coins,
  USD, timestamps) ending in a USD total row for bookkeeping.

Coins are held the moment a withdrawal is requested. Rejecting returns them
automatically; marking paid records the manual PayPal transfer. The app never
moves money itself.

## Two balances, both real

The top bar shows two labelled pills so the pools never get confused:

- **cash** — server-side coins from care and minigames. This is the wallet
  balance and the only pool that cashes out to PayPal.
- **shop** — the Hollow's own coins, spent on food, eggs, merges and upgrades.

## Mystery Shop

The Hollow screen has a **❓ Mystery shop** chip. It sells unknown sprite eggs
for shop coins — Meadow 45, Wild 85, Prism 135, Mythic 210 — with the element,
breed, colorway and mutation risk rolled on purchase. Nothing is revealed until
the egg hatches in the Nest, and Mythic eggs always hatch a Legendary or Mythic
type.

## Economy defaults (adjustable in Admin)

| Setting | Default |
| --- | --- |
| Coins per $1 | 1,000 |
| Minimum withdrawal | 5,000 coins |
| Daily care coins | 250 |
| Daily minigame coins | 600 |
| Care actions / day | 40 |
| Minigame runs / day | 20 |
| Withdrawal requests / day | 2 |
| Welcome coins | 250 |
| Care cooldowns | feed 20s, clean 30s, play 25s |

Pet needs decay while away (hunger 5.5/hr, cleanliness 4.2/hr, happiness
4.6/hr, faster when neglected). Streaks count a care action on consecutive UTC
days.

## Anti-abuse

- Balances are a server-side ledger (`SUM(amount)`); no endpoint accepts a
  balance, an award or a score the server did not derive.
- Care and minigame cooldowns, plus daily caps on actions, runs and coins.
- Withdrawals insert the request only if the ledger balance covers it, in one
  atomic statement, and there is at most one open request per player.
- Minigame claims are single-use, time-bound, and scored from the seed; taps
  must land inside the round window, on the correct plot, and no faster than a
  human could react.
- Login attempts are rate limited; sessions are HttpOnly `SameSite=Lax`
  cookies stored as SHA-256 hashes; mutations from other origins are refused;
  passwords use PBKDF2-SHA256 (150k iterations).
- Only `is_admin` accounts can read the player list or change payout settings.
- Payouts are open to every player, invited or not: the coins they earned are
  theirs. Nothing but the ledger balance, the minimum and the daily cap stands
  between a player and a request.

## Deploy (Cloudflare Workers + D1)

The API is a Workers handler (`server/worker.js`) and the game is served as
static assets from the same Worker, so browser fetches stay same-origin.

```bash
npx wrangler d1 create coin-pets
# put the returned database_id into wrangler.jsonc
npx wrangler d1 execute coin-pets --file=server/schema.sql --remote
npx wrangler secret put ADMIN_INVITE_CODE   # optional but recommended
npx wrangler deploy

## PayPal payouts

A player's cash-out is sent by the server itself — there is no approval step.
Set the REST app credentials as secrets on the deployment:

```bash
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_CLIENT_SECRET
# optional, defaults to live
npx wrangler secret put PAYPAL_MODE       # sandbox
```

The daily ceiling is the `payout_daily_budget_cents` setting (default 500 = $5).
A payout above the remaining budget waits for review; an address PayPal refuses
for good is rejected and the coins are refunded; an outage leaves the request
pending. Without the keys the Wallet takes requests for review and says so.
```

`wrangler.jsonc` routes `/api/*` to the Worker first and falls back to the
static game files, excluding `server/`, `.coinpets/` and the APK archives.

## API

| Method | Path | Who |
| --- | --- | --- |
| GET | `/api/bootstrap` | anyone |
| POST | `/api/auth/signup` | anyone (the first account becomes owner) |
| POST | `/api/owner/claim` | player (takes a free owner seat; no body) |
| POST | `/api/owner/login` | alias of `/api/owner/claim` for older installs |
| POST | `/api/auth/login`, `/api/auth/logout` | anyone |
| GET | `/api/me` | player |
| POST | `/api/pet/care` | player |
| POST | `/api/games/start`, `/api/games/claim` | player |
| GET | `/api/wallet` | player |
| POST | `/api/wallet/withdraw` | player |
| GET | `/api/admin/overview` | admin |
| GET | `/api/admin/withdrawals?status=` | admin |
| GET | `/api/admin/withdrawals/export` | admin (CSV download) |
| POST | `/api/admin/withdrawals/:id/decide` | admin |
| PUT | `/api/admin/settings` | admin |
| GET/POST | `/api/admin/invites` | admin |

## Tests

```bash
node server/dev.mjs 3999 &
COIN_PETS_DB=.coinpets/coinpets.sqlite node server/test.mjs http://127.0.0.1:3999
```

The suite covers signup and invites, care payouts and cooldowns, decay,
honest/cheating minigame claims, withdrawal holds, approval, payment,
rejection refunds, daily caps, cross-origin and role guards (49 checks).

## Android note

The APK loads the game from bundled `file://` assets, so it has no server to
talk to. Sprite Hollow Pet Earn shows a "cannot reach its server" notice there. Ship the web
build behind the Worker (or point the WebView at that origin) for the pet and
payout features to work on phones.
