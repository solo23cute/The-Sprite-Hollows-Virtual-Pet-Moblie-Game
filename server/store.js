/* Storage adapters. Both expose the same four async methods so server/core.js
   runs unchanged on Cloudflare D1 and on the local node:sqlite dev server.
   Every call takes positional `?` parameters. */

export function d1Store(db) {
  const bind = (sql, params = []) => db.prepare(sql).bind(...params);
  return {
    async all(sql, params = []) {
      const out = await bind(sql, params).all();
      return out.results || [];
    },
    async get(sql, params = []) {
      const row = await bind(sql, params).first();
      return row ?? null;
    },
    async run(sql, params = []) {
      const res = await bind(sql, params).run();
      return {
        changes: res?.meta?.changes ?? 0,
        lastRowId: res?.meta?.last_row_id ?? null,
      };
    },
    async batch(statements) {
      const prepared = statements.map((s) => bind(s.sql, s.params));
      const results = await db.batch(prepared);
      return results.map((res) => ({
        changes: res?.meta?.changes ?? 0,
        lastRowId: res?.meta?.last_row_id ?? null,
      }));
    },
  };
}

export function sqliteStore(db) {
  return {
    async all(sql, params = []) {
      return db.prepare(sql).all(...params);
    },
    async get(sql, params = []) {
      return db.prepare(sql).get(...params) ?? null;
    },
    async run(sql, params = []) {
      const res = db.prepare(sql).run(...params);
      return { changes: Number(res.changes || 0), lastRowId: Number(res.lastInsertRowid || 0) };
    },
    async batch(statements) {
      const out = [];
      db.exec('BEGIN');
      try {
        for (const s of statements) {
          const res = db.prepare(s.sql).run(...(s.params || []));
          out.push({ changes: Number(res.changes || 0), lastRowId: Number(res.lastInsertRowid || 0) });
        }
        db.exec('COMMIT');
      } catch (err) {
        try { db.exec('ROLLBACK'); } catch { /* ignore */ }
        throw err;
      }
      return out;
    },
  };
}
