#!/usr/bin/env bash
# Assemble the Freebuff Sites bundle: server modules, game assets, manifest.
# Usage: bash tools/deploy-bundle.sh     (then deploy with deploy/manifest.json)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/deploy"

rm -rf "$OUT"
mkdir -p "$OUT/public"
cp "$ROOT"/index.html "$ROOT"/styles.css "$ROOT"/styles-arcade.css "$ROOT"/styles-hollow-home.css \
   "$ROOT"/manifest.webmanifest "$ROOT"/icon.svg "$OUT/public/"
cp -R "$ROOT/src" "$OUT/public/src"
cp "$ROOT/server/core.js" "$ROOT/server/store.js" "$OUT/"

python3 - "$ROOT" <<'PY'
import json, sys
root = sys.argv[1]
sql = open(f'{root}/server/schema.sql', encoding='utf-8').read()
# One statement per entry: D1's exec() is not available in every runtime, but
# prepare().run() always is. Line comments are stripped first, because a ';'
# inside a comment would otherwise split a CREATE in half.
body = '\n'.join(line for line in sql.splitlines() if not line.strip().startswith('--'))
statements = [chunk.strip() + ';' for chunk in body.split(';') if chunk.strip()]
statements = [s for s in statements if s.lstrip().upper().startswith('CREATE')]
assert len(statements) >= 12, f'only {len(statements)} statements parsed from schema.sql'
migration_sql = open(f'{root}/server/migrations.sql', encoding='utf-8').read()
migration_body = '\n'.join(line for line in migration_sql.splitlines() if not line.strip().startswith('--'))
migrations = [chunk.strip() + ';' for chunk in migration_body.split(';') if chunk.strip()]
open(f'{root}/deploy/schema.js', 'w', encoding='utf-8').write(
    '/* Generated from server/schema.sql and server/migrations.sql by tools/deploy-bundle.sh. */\n'
    'export const SCHEMA_STATEMENTS = ' + json.dumps(statements, ensure_ascii=False) + ';\n'
    'export const MIGRATIONS = ' + json.dumps(migrations, ensure_ascii=False) + ';\n'
)
PY

cat > "$OUT/worker.js" <<'JS'
/* Sprite Hollow — API first, static game after.
   Bindings: DB (D1), ASSETS (static files). The schema is created by the first
   API request, so a fresh preview or production database needs no manual step. */

import { createCore } from './core.js';
import { d1Store } from './store.js';
import { MIGRATIONS, SCHEMA_STATEMENTS } from './schema.js';

let schemaReady = null;

function jsonError(status, message, extra = {}) {
  return new Response(JSON.stringify({ error: message, ...extra }), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

function ensureSchema(env) {
  if (!schemaReady) {
    schemaReady = (async () => {
      const table = await env.DB.prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'ledger'",
      ).first();
      if (!table) {
        for (const statement of SCHEMA_STATEMENTS) {
          try {
            await env.DB.prepare(statement).run();
          } catch (err) {
            if (!/already exists/i.test(String((err && err.message) || ''))) throw err;
          }
        }
      }
      /* Migrations run even when the tables already exist: returning early on an
         existing schema skipped them, which left an upgraded database missing a
         column that the queries already select. */
      for (const migration of MIGRATIONS) {
        try {
          await env.DB.prepare(migration).run();
        } catch (err) {
          if (!/duplicate column|no such column/i.test(String((err && err.message) || ''))) throw err;
        }
      }
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      if (!env.DB) return jsonError(503, 'No database is bound to this deployment.');
      try {
        await ensureSchema(env);
      } catch (err) {
        console.error('[schema]', err && err.message);
        return jsonError(503, 'The coin database is not ready.', {
          detail: String((err && err.message) || '').slice(0, 240),
          statements: SCHEMA_STATEMENTS.length,
        });
      }
      const core = createCore({ store: d1Store(env.DB), env });
      const api = await core.handle(request);
      if (api) return api;
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not found', { status: 404 });
  },
};
JS

python3 - "$OUT" <<'PY'
import json, sys
out = sys.argv[1]
manifest = {
    "entrypoint": "worker.js",
    "compatibilityDate": "2025-09-01",
    "modules": [
        {"name": "worker.js", "type": "esm", "path": "./worker.js"},
        {"name": "core.js", "type": "esm", "path": "./core.js"},
        {"name": "store.js", "type": "esm", "path": "./store.js"},
        {"name": "schema.js", "type": "esm", "path": "./schema.js"},
    ],
    "assetsDirectory": "./public",
}
open(f'{out}/manifest.json', 'w', encoding='utf-8').write(json.dumps(manifest, indent=2) + '\n')
print('manifest written')
PY

chmod -R a+r "$OUT"
echo "bundle: $(find "$OUT" -type f | wc -l) files, $(du -sh "$OUT" | cut -f1)"
