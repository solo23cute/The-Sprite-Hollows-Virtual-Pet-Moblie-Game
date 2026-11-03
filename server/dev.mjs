#!/usr/bin/env node
/* Dependency-free dev server for the whole Sprite Hollow app + Sprite Hollow Pet Earn API.
   Uses node:sqlite so the same server/core.js that runs on Workers also runs
   locally. Start with:  node server/dev.mjs [port] */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

import { createCore } from './core.js';
import { sqliteStore } from './store.js';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PORT = Number(process.argv[2] || process.env.PORT || 3003);
const HOST = process.env.HOST || '0.0.0.0';
const DB_PATH = process.env.COIN_PETS_DB || join(ROOT, '.coinpets', 'coinpets.sqlite');

mkdirSync(dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(readFileSync(join(ROOT, 'server', 'schema.sql'), 'utf8'));
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

const store = sqliteStore(db);
const core = createCore({
  store,
  env: { ADMIN_INVITE_CODE: process.env.ADMIN_INVITE_CODE || '' },
});

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.apk': 'application/vnd.android.package-archive',
};

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 2 * 1024 * 1024) {
        reject(new Error('Body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolveBody(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function serveStatic(pathname, res) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  const target = normalize(join(ROOT, rel));
  if (!target.startsWith(ROOT) || target.includes(`${ROOT}/server`) || target.includes(`${ROOT}/.coinpets`)) {
    res.writeHead(404).end('Not found');
    return;
  }
  try {
    const info = await stat(target);
    if (info.isDirectory()) {
      return serveStatic(`${rel}/index.html`, res);
    }
    const body = await readFile(target);
    res.writeHead(200, {
      'content-type': MIME[extname(target).toLowerCase()] || 'application/octet-stream',
      'content-length': body.length,
      'cache-control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}

const server = createServer(async (req, res) => {
  const host = req.headers.host || `127.0.0.1:${PORT}`;
  const url = `http://${host}${req.url}`;

  if (req.url.startsWith('/api/')) {
    const headers = new Headers();
    const skip = new Set(['host', 'connection', 'content-length', 'transfer-encoding', 'keep-alive']);
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined || skip.has(key)) continue;
      headers.set(key, Array.isArray(value) ? value.join(', ') : value);
    }
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') body = await readBody(req);
    const request = new Request(url, { method: req.method, headers, body, duplex: 'half' });
    try {
      const response = await core.handle(request);
      if (!response) {
        res.writeHead(404, { 'content-type': 'application/json' }).end('{"error":"Not found."}');
        return;
      }
      const out = {};
      for (const [key, value] of response.headers) {
        if (key !== 'set-cookie') out[key] = value;
      }
      if (!out['content-type']) out['content-type'] = 'application/json';
      const cookies = response.headers.getSetCookie?.() || [];
      if (cookies.length) out['set-cookie'] = cookies;
      res.writeHead(response.status, out).end(Buffer.from(await response.arrayBuffer()));
    } catch (err) {
      console.error('[pet-earn] dev server error', err);
      res.writeHead(500, { 'content-type': 'application/json' }).end('{"error":"Server error."}');
    }
    return;
  }

  await serveStatic(new URL(url).pathname, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Sprite Hollow Pet Earn dev server on http://${HOST}:${PORT}  (db: ${DB_PATH})`);
});
