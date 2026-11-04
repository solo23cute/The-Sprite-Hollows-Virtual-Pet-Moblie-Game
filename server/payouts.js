/* PayPal Payouts: sends a player's cash-out straight to their PayPal email.
   This runs inside the same worker as the game, so a payout never needs a human
   in the dashboard. Credentials come from the deployment's secrets:

     PAYPAL_CLIENT_ID       PayPal REST app client id
     PAYPAL_CLIENT_SECRET   PayPal REST app secret
     PAYPAL_MODE            'live' (default) or 'sandbox'
     PAYPAL_API_BASE        optional override, used by the payout tests

   A batch id is the withdrawal id, so a retried send can never pay twice.
   `sendPayout` answering PENDING only means PayPal accepted the batch; the money
   lands later, so fetchPayoutStatus asks PayPal where a batch actually got to. */

const LIVE_BASE = 'https://api-m.paypal.com';
const SANDBOX_BASE = 'https://api-m.sandbox.paypal.com';

export class PayoutError extends Error {
  /* permanent: PayPal will refuse this payout however often it is retried
     (a bad receiver, an amount it will not send), so the coins go back. */
  constructor(message, { permanent = false, status = 0, detail = '' } = {}) {
    super(message);
    this.name = 'PayoutError';
    this.permanent = permanent;
    this.status = status;
    this.detail = detail;
  }
}

export function payoutsConfig(env = {}) {
  const id = String(env.PAYPAL_CLIENT_ID || '').trim();
  const secret = String(env.PAYPAL_CLIENT_SECRET || '').trim();
  const mode = String(env.PAYPAL_MODE || 'live').toLowerCase();
  const base = String(env.PAYPAL_API_BASE || '').trim() || (mode === 'sandbox' ? SANDBOX_BASE : LIVE_BASE);
  return { id, secret, base, mode, configured: Boolean(id && secret) };
}

async function accessToken(cfg) {
  let res;
  try {
    res = await fetch(`${cfg.base}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${cfg.id}:${cfg.secret}`)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
  } catch (err) {
    throw new PayoutError('PayPal could not be reached.', { detail: String(err && err.message).slice(0, 200) });
  }
  if (!res.ok) {
    /* 401 here means the keys are wrong, not the player's address: never refund
       coins for our own misconfiguration. */
    throw new PayoutError('PayPal sign-in failed — check the payout keys.', { status: res.status });
  }
  const data = await res.json().catch(() => ({}));
  if (!data?.access_token) throw new PayoutError('PayPal returned no access token.');
  return data.access_token;
}

/* Answers "do these keys work?" without ever exposing them: it asks PayPal for a
   token with the configured pair and reports only the verdict, so a bad secret
   can be told apart from a bad player address without a browser in the loop. */
export async function verifyCredentials(env = {}) {
  const cfg = payoutsConfig(env);
  if (!cfg.configured) return { configured: false, mode: cfg.mode, ok: false, status: 0, code: 'not_configured' };
  try {
    await accessToken(cfg);
    return { configured: true, mode: cfg.mode, ok: true, status: 200, code: 'ok' };
  } catch (err) {
    const status = Number(err && err.status) || 0;
    return { configured: true, mode: cfg.mode, ok: false, status, code: status === 401 ? 'invalid_client' : 'unreachable' };
  }
}

export async function sendPayout(env, { email, cents, withdrawalId, note = '' }) {
  const cfg = payoutsConfig(env);
  if (!cfg.configured) {
    throw new PayoutError('PayPal payouts are not configured on this deployment.');
  }
  const token = await accessToken(cfg);

  const payload = {
    sender_batch_header: {
      sender_batch_id: String(withdrawalId).slice(0, 250),
      email_subject: 'Your Sprite Hollow payout',
      email_message: 'Thanks for playing Sprite Hollow — your coins have been cashed out.',
    },
    items: [{
      recipient_type: 'EMAIL',
      amount: { value: (cents / 100).toFixed(2), currency: 'USD' },
      receiver: email,
      sender_item_id: String(withdrawalId).slice(0, 250),
      note: (note || 'Sprite Hollow payout').slice(0, 400),
    }],
  };

  let res;
  try {
    res = await fetch(`${cfg.base}/v1/payments/payouts`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new PayoutError('PayPal did not answer the payout call.', { detail: String(err && err.message).slice(0, 200) });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const permanent = res.status === 400 || res.status === 422;
    throw new PayoutError(
      data?.message || data?.name || `PayPal refused the payout (${res.status}).`,
      { permanent, status: res.status, detail: JSON.stringify(data).slice(0, 300) },
    );
  }

  return {
    batchId: data?.batch_header?.payout_batch_id || '',
    status: data?.batch_header?.batch_status || 'PENDING',
  };
}

/* Where the money actually ended up. PayPal reports a batch as PENDING or
   PROCESSING while it is on its way and SUCCESS/FAILED/RETURNED once it settles;
   the first item's status is the useful detail for a single-recipient payout.
   Throws a PayoutError on transport or auth trouble so the caller can keep the
   last known state instead of inventing one. */
export async function fetchPayoutStatus(env, batchId) {
  const cfg = payoutsConfig(env);
  if (!cfg.configured) throw new PayoutError('PayPal payouts are not configured on this deployment.');
  if (!batchId) throw new PayoutError('There is no payout batch to check.');
  const token = await accessToken(cfg);

  let res;
  try {
    res = await fetch(`${cfg.base}/v1/payments/payouts/${encodeURIComponent(batchId)}`, {
      headers: { authorization: `Bearer ${token}` },
    });
  } catch (err) {
    throw new PayoutError('PayPal did not answer the status call.', { detail: String(err && err.message).slice(0, 200) });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new PayoutError(
      data?.message || `PayPal would not report that batch (${res.status}).`,
      { status: res.status, detail: JSON.stringify(data).slice(0, 300) },
    );
  }

  const item = Array.isArray(data?.items) ? data.items[0] || {} : {};
  const batch = String(data?.batch_header?.batch_status || '').toUpperCase();
  const single = String(item?.transaction_status || '').toUpperCase();
  return {
    status: batch || single || 'UNKNOWN',
    itemStatus: single,
    reason: String(item?.errors?.message || item?.errors?.name || '').slice(0, 200),
  };
}

/* ---------- "Log in with PayPal" ----------
   A player signs in once and PayPal tells us which account it is. The address we
   store comes from PayPal's identity endpoint, never from a form, so a cash-out
   pays the account the player actually signed in with. The payout itself still
   moves on this deployment's own credentials - the player's token is read once
   for their identity and is not kept. */

/* the payer id and the verified email both live behind paypalattributes */
export const PAYPAL_LINK_SCOPE = 'openid email https://uri.paypal.com/services/paypalattributes';

export function paypalLoginBase(env = {}) {
  const mode = String(env.PAYPAL_MODE || 'live').toLowerCase();
  return mode === 'sandbox' ? 'https://www.sandbox.paypal.com' : 'https://www.paypal.com';
}

export function authorizeUrl(env, { state, redirectUri }) {
  const cfg = payoutsConfig(env);
  const url = new URL(`${paypalLoginBase(env)}/signin/oauth/consent`);
  url.searchParams.set('flowEntry', 'static');
  url.searchParams.set('client_id', cfg.id);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', PAYPAL_LINK_SCOPE);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('state', state);
  return url.toString();
}

export async function fetchLinkedAccount(env, { code, redirectUri }) {
  const cfg = payoutsConfig(env);
  if (!cfg.configured) throw new PayoutError('PayPal is not configured on this deployment.');
  if (!code) throw new PayoutError('PayPal did not send an authorization code.');

  let res;
  try {
    res = await fetch(`${cfg.base}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${cfg.id}:${cfg.secret}`)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }).toString(),
    });
  } catch (err) {
    throw new PayoutError('PayPal could not be reached.', { detail: String(err && err.message).slice(0, 200) });
  }
  const token = await res.json().catch(() => ({}));
  if (!res.ok || !token?.access_token) {
    throw new PayoutError('PayPal would not confirm that sign-in.', { status: res.status, detail: JSON.stringify(token).slice(0, 200) });
  }

  let who;
  try {
    who = await fetch(`${cfg.base}/v1/identity/oauth2/userinfo?schema=paypalv1.1`, {
      headers: { authorization: `Bearer ${token.access_token}` },
    });
  } catch (err) {
    throw new PayoutError('PayPal did not answer the account call.', { detail: String(err && err.message).slice(0, 200) });
  }
  const data = await who.json().catch(() => ({}));
  if (!who.ok) {
    throw new PayoutError('PayPal would not share that account.', { status: who.status, detail: JSON.stringify(data).slice(0, 200) });
  }
  return {
    email: String(data.email || data.email_address || '').trim(),
    payerId: String(data.payer_id || data.user_id || data.sub || '').trim(),
    name: String(data.name || '').trim(),
    verified: data.verified_account === true,
  };
}
