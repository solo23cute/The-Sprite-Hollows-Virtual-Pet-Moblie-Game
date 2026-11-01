/* Save codes: pack the whole Hollow into one line of text so a collection can
   move to a new phone, or survive an uninstall. Codes are base64 of the save
   JSON, deflated when the device supports CompressionStream. */

const SAVE_CODE_PLAIN = 'SH-save-1:';
const SAVE_CODE_PACKED = 'SH-save-2:';
const SAVE_CODE_MAX = 12 * 1024 * 1024;

function saveBytesToBase64(bytes) {
  let bin = '';
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + step));
  }
  return btoa(bin);
}

function saveBase64ToBytes(text) {
  const bin = atob(text);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function buildSaveCode(source = state) {
  const raw = new TextEncoder().encode(JSON.stringify(source));
  if (typeof CompressionStream === 'function') {
    try {
      const packed = await new Response(
        new Blob([raw]).stream().pipeThrough(new CompressionStream('deflate-raw'))
      ).arrayBuffer();
      const bytes = new Uint8Array(packed);
      if (bytes.length < raw.length) return SAVE_CODE_PACKED + saveBytesToBase64(bytes);
    } catch (err) {
      console.warn('Could not compress the save code, writing the plain one.', err);
    }
  }
  return SAVE_CODE_PLAIN + saveBytesToBase64(raw);
}

async function parseSaveCode(text) {
  const clean = String(text || '').trim().replace(/\s+/g, '');
  if (!clean) throw new Error('Paste a save code, or choose a file, first.');
  if (clean.length > SAVE_CODE_MAX) throw new Error('That code is far too big to be a Hollow save.');
  let json = clean;
  if (!clean.startsWith('{')) {
    const packed = clean.startsWith(SAVE_CODE_PACKED);
    const plain = clean.startsWith(SAVE_CODE_PLAIN);
    if (packed && typeof DecompressionStream !== 'function') {
      throw new Error('This device cannot unpack that code. Update the app and try again.');
    }
    let bytes;
    try {
      bytes = saveBase64ToBytes((packed || plain) ? clean.slice(clean.indexOf(':') + 1) : clean);
    } catch (err) {
      throw new Error('That save code is not readable. Copy the whole code and try again.');
    }
    if (packed) {
      bytes = new Uint8Array(await new Response(
        new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
      ).arrayBuffer());
    }
    json = new TextDecoder().decode(bytes);
  }
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch (err) {
    throw new Error('That save code is damaged. Copy the whole code and try again.');
  }
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.sprites) || !parsed.theme || typeof parsed.theme !== 'object') {
    throw new Error('That is not a Sprite Hollow save.');
  }
  return parsed;
}

function saveSpriteCounts(source) {
  const sprites = Array.isArray(source?.sprites) ? source.sprites : [];
  const eggs = sprites.filter((s) => s && s.stage === 'egg').length;
  return { total: sprites.length, eggs, grown: sprites.length - eggs };
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard write refused, falling back to the selection copy.', err);
  }
  return false;
}

function copyFromField(field) {
  if (!field) return false;
  try {
    field.focus();
    field.select();
    return document.execCommand('copy');
  } catch (err) {
    return false;
  }
}

function downloadSaveCode(text) {
  try {
    const stamp = new Date().toISOString().slice(0, 10);
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `sprite-hollow-save-${stamp}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return true;
  } catch (err) {
    console.warn('Could not offer the save file.', err);
    return false;
  }
}

async function applySaveCode(parsed) {
  const incoming = saveSpriteCounts(parsed);
  const current = saveSpriteCounts(state);
  const ok = await confirmModal(
    'Replace this Hollow?',
    `Restoring brings in ${incoming.total} sprite${incoming.total === 1 ? '' : 's'} (${incoming.eggs} still in eggs) and ${Number(parsed.coins) || 0} coins. The ${current.total} sprite${current.total === 1 ? '' : 's'} on this device now are replaced, and that cannot be undone.`,
    'Restore this save',
    { danger: true }
  );
  if (!ok) return false;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(parsed));
  } catch (err) {
    console.error(err);
    toast('This device could not store that save.', '⚠️');
    return false;
  }
  lockSaves();
  toast('Save restored. Waking the Hollow…', '💾');
  setTimeout(() => location.reload(), 320);
  return true;
}

function openSaveBackup() {
  const counts = saveSpriteCounts(state);
  const field = 'width:100%;min-height:96px;padding:10px 12px;border-radius:13px;background:rgba(255,255,255,.06);border:1px solid var(--line);color:var(--text);font-size:11px;line-height:1.5;word-break:break-all;resize:vertical;outline:none';
  const { close } = openSheet({
    title: '💾 Save backup',
    sub: `${counts.total} sprite${counts.total === 1 ? '' : 's'} · ${counts.eggs} egg${counts.eggs === 1 ? '' : 's'} · ${state.coins} coins · v${APP_VERSION}`,
    body: `
      <div class="card" style="padding:12px">
        <div class="between"><b>${esc(state.hollowName)}</b><span class="chip">${state.coins} coins</span></div>
        <p class="tiny muted" style="margin:5px 0 0;line-height:1.5">${counts.grown} grown · ${counts.eggs} still in eggs — all of it lives on this device only.</p>
      </div>

      <div class="section-title"><h2>Back up</h2><span data-save-size>packing…</span></div>
      <textarea data-save-code readonly aria-label="Your save code" placeholder="Building your save code…" style="${field}"></textarea>
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px">
        <button class="btn btn-primary btn-sm" data-save-copy disabled>Copy code</button>
        <button class="btn btn-soft btn-sm" data-save-download disabled>Download file</button>
      </div>
      <p class="tiny muted" style="margin:8px 2px 0;line-height:1.5">The code carries every sprite, egg, coin, streak, quest, guardian win, vault door and room theme. Paste it below on the new device, or keep it somewhere safe.</p>

      <div class="section-title"><h2>Restore</h2><span>replaces this device's Hollow</span></div>
      <textarea data-save-input aria-label="Paste a save code" placeholder="Paste a save code here…" style="${field}"></textarea>
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px">
        <button class="btn btn-gold btn-sm" data-save-restore>Restore this save</button>
        <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0">Choose a file<input type="file" accept=".txt,.json,text/plain,application/json" data-save-file hidden></label>
      </div>
      <p class="tiny muted" data-save-note style="margin:8px 2px 0;line-height:1.5">Restoring overwrites what is on this device, so copy your own code first if you might want it back.</p>`,
    onMount: (root) => {
      const out = root.querySelector('[data-save-code]');
      const copyBtn = root.querySelector('[data-save-copy]');
      const fileBtn = root.querySelector('[data-save-download]');
      const size = root.querySelector('[data-save-size]');
      const input = root.querySelector('[data-save-input]');
      const restoreBtn = root.querySelector('[data-save-restore]');
      const note = root.querySelector('[data-save-note]');
      let code = '';

      buildSaveCode().then((text) => {
        code = text;
        out.value = text;
        size.textContent = `${Math.max(1, Math.round(text.length / 1024))} KB`;
        copyBtn.disabled = false;
        fileBtn.disabled = false;
      }).catch((err) => {
        console.error(err);
        size.textContent = 'could not pack';
        note.textContent = 'This device could not build a save code. Reload the app and try again.';
      });

      copyBtn.addEventListener('click', async () => {
        if (!code) return;
        const copied = await copyToClipboard(code);
        if (copied || copyFromField(out)) toast('Save code copied.', '📋');
        else toast('Select the code and copy it by hand.', '📋');
      });

      fileBtn.addEventListener('click', () => {
        if (!code) return;
        if (!downloadSaveCode(code)) toast('This device will not save files. Use Copy code instead.', '⚠️');
      });

      restoreBtn.addEventListener('click', async () => {
        restoreBtn.disabled = true;
        try {
          const parsed = await parseSaveCode(input.value);
          const incoming = saveSpriteCounts(parsed);
          note.textContent = `Code read: ${incoming.total} sprites · ${incoming.eggs} eggs · ${Number(parsed.coins) || 0} coins.`;
          if (!await applySaveCode(parsed)) restoreBtn.disabled = false;
        } catch (err) {
          note.textContent = err.message || 'That save code did not work.';
          toast(note.textContent, '⚠️');
          restoreBtn.disabled = false;
        }
      });

      root.querySelector('[data-save-file]').addEventListener('change', async (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        try {
          await applySaveCode(await parseSaveCode(await file.text()));
        } catch (err) {
          note.textContent = err.message || 'That file is not a Sprite Hollow save.';
          toast(note.textContent, '⚠️');
        } finally {
          event.target.value = '';
        }
      });
    },
  });
  return { close };
}
