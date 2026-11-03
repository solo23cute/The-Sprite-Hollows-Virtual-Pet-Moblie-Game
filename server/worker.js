/* Cloudflare Worker entry point: API first, static game files after.
   Bindings: DB (D1), ASSETS (static), optional ADMIN_INVITE_CODE secret. */

import { createCore } from './core.js';
import { d1Store } from './store.js';

export default {
  async fetch(request, env, ctx) {
    const core = createCore({ store: d1Store(env.DB), env });
    const api = await core.handle(request);
    if (api) return api;
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not found', { status: 404 });
  },
};
