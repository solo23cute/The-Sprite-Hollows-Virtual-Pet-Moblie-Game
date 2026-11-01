#!/usr/bin/env python3
"""Rescue a Sprite Hollow save out of an old install.

Use this when the phone has an older build (3.18.0 or similar) that cannot be
updated in place, so the Hollow has to be carried across a manual
uninstall/reinstall. The game keeps everything in WebView localStorage under the
key `sprite-hollow.save.v2`; this script digs that JSON back out and writes it in
the format the current app's Save backup screen accepts.

Feed it either:

  * a rooted pull of the app's private storage, e.g.
      adb shell su -c 'cp -r /data/data/com.spritehollow.game/app_webview \
        /sdcard/hollow-pull'
      adb pull /sdcard/hollow-pull
    (a directory works; LevelDB .log/.ldb files are scanned as raw bytes)

  * an Android backup archive made on Android 11 or older (the 3.18.0 build sets
    allowBackup=true, so this is allowed):
      adb backup -f hollow.ab -noapk com.spritehollow.game

  * a plain save file that is already JSON

Output: sprite-hollow-save-rescue.txt (an `SH-save-1:` code - paste it into
4.1.1 under Save backup -> Restore) and sprite-hollow-save-rescue.json.

Requires Python 3.8+ only. Encrypted .ab archives are not supported; make the
backup without a password.
"""

from __future__ import annotations

import argparse
import base64
import io
import json
import os
import sys
import tarfile
import zlib

MARKER = b"sprite-hollow.save.v2"
MAX_FILE = 128 * 1024 * 1024


def looks_like_save(obj) -> bool:
    return (
        isinstance(obj, dict)
        and isinstance(obj.get("sprites"), list)
        and isinstance(obj.get("theme"), dict)
    )


def balanced_object(blob: bytes, start: int):
    """Return the complete {...} run beginning at `start`, honouring strings."""
    depth = 0
    i = start
    in_str = False
    esc = False
    limit = len(blob)
    while i < limit:
        c = blob[i]
        if in_str:
            if esc:
                esc = False
            elif c == 0x5C:  # backslash
                esc = True
            elif c == 0x22:  # quote
                in_str = False
        elif c == 0x22:
            in_str = True
        elif c == 0x7B:  # {
            depth += 1
        elif c == 0x7D:  # }
            depth -= 1
            if depth == 0:
                return blob[start : i + 1]
        i += 1
    return None


def candidates_in(blob: bytes):
    """Yield save dicts found in a raw byte blob."""
    seen = set()

    def fresh(obj):
        key = json.dumps(obj, sort_keys=True)
        if key in seen:
            return None
        seen.add(key)
        return obj

    # The file may already be the save itself.
    if blob.lstrip()[:1] == b"{":
        try:
            obj = json.loads(blob.decode("utf-8", "replace"))
        except ValueError:
            obj = None
        if obj is not None and looks_like_save(obj) and fresh(obj) is not None:
            yield obj

    # LevelDB stores UTF-16 values on some builds; dropping NULs recovers the ASCII.
    variants = [blob]
    if blob.count(0) > len(blob) // 8:
        variants.append(blob.replace(b"\x00", b""))

    for data in variants:
        # Preferred: the value that sits right after the localStorage key.
        pos = 0
        while True:
            hit = data.find(MARKER, pos)
            if hit < 0:
                break
            pos = hit + len(MARKER)
            brace = data.find(b"{", pos, pos + 96)
            if brace < 0:
                continue
            run = balanced_object(data, brace)
            if not run:
                continue
            try:
                obj = json.loads(run.decode("utf-8", "replace"))
            except ValueError:
                continue
            if looks_like_save(obj):
                better = fresh(obj)
                if better is not None:
                    yield better

        # Fallback: any object in the blob that carries sprites + theme. Pretty
        # printed saves start with a brace followed by whitespace.
        for needle in (b'{"', b"{\n", b"{\r", b"{ ", b"{\t"):
            pos = 0
            while True:
                hit = data.find(needle, pos)
                if hit < 0:
                    break
                pos = hit + 1
                run = balanced_object(data, hit)
                if not run or b'"sprites"' not in run:
                    continue
                try:
                    obj = json.loads(run.decode("utf-8", "replace"))
                except ValueError:
                    continue
                if looks_like_save(obj):
                    better = fresh(obj)
                    if better is not None:
                        yield better


def blobs_from_path(path: str):
    """Yield (label, bytes) for everything worth scanning under `path`."""
    if os.path.isdir(path):
        for root, _dirs, files in os.walk(path):
            for name in sorted(files):
                full = os.path.join(root, name)
                try:
                    if os.path.getsize(full) > MAX_FILE:
                        continue
                    with open(full, "rb") as fh:
                        yield os.path.relpath(full, path), fh.read()
                except OSError as err:
                    print(f"  ! skipped {full}: {err}", file=sys.stderr)
        return

    with open(path, "rb") as fh:
        raw = fh.read()
    if raw[:14] == b"ANDROID BACKUP":
        yield from blobs_from_android_backup(raw)
    else:
        yield os.path.basename(path), raw


def _inflate(raw: bytes) -> bytes:
    """adb backup wraps the tar in deflate; the flavour varies by version."""
    for wbits in (-15, 15, 31):
        try:
            return zlib.decompressobj(wbits).decompress(raw)
        except zlib.error:
            continue
    raise ValueError(
        "Could not decompress that backup. Re-make it without a password, "
        "or pull the folder from a rooted phone instead."
    )


def blobs_from_android_backup(raw: bytes):
    """Yield (name, bytes) out of an `adb backup` archive."""
    stream = io.BytesIO(raw)
    magic = stream.readline()
    stream.readline()  # version
    compressed = stream.readline().strip() == b"1"
    encryption = stream.readline().strip()
    if magic.strip() != b"ANDROID BACKUP":
        raise ValueError("Not an Android backup file.")
    if encryption not in (b"none", b""):
        raise ValueError(
            "That backup is encrypted. Re-make it with -nopassword, or pull the "
            "app folder from a rooted phone instead."
        )

    body = stream.read()
    if compressed:
        body = _inflate(body)

    try:
        tar = tarfile.open(fileobj=io.BytesIO(body), mode="r:")
    except tarfile.TarError:
        # Some writers pad the deflate stream; try the tolerant reader.
        tar = tarfile.open(fileobj=io.BytesIO(body), mode="r|")
    with tar:
        for member in tar:
            if not member.isfile() or member.size > MAX_FILE:
                continue
            handle = tar.extractfile(member)
            if handle is None:
                continue
            yield member.name, handle.read()


def describe(save: dict) -> str:
    sprites = [s for s in save.get("sprites", []) if isinstance(s, dict)]
    eggs = sum(1 for s in sprites if s.get("stage") == "egg")
    coins = save.get("coins")
    name = save.get("hollowName") or "(unnamed hollow)"
    return (
        f"{name}: {len(sprites)} sprite{'' if len(sprites) == 1 else 's'} "
        f"({eggs} in egg{'' if eggs == 1 else 's'}), {coins if coins is not None else '?'} coins"
    )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Recover a Sprite Hollow save from an old install.",
    )
    parser.add_argument("source", help="rooted pull directory, .ab backup, or save file")
    parser.add_argument(
        "-o", "--out-prefix", default="sprite-hollow-save-rescue",
        help="output file prefix (default: sprite-hollow-save-rescue)",
    )
    args = parser.parse_args()

    if not os.path.exists(args.source):
        print(f"No such file or folder: {args.source}", file=sys.stderr)
        return 2

    found = []
    scanned = 0
    try:
        for label, blob in blobs_from_path(args.source):
            scanned += 1
            if MARKER not in blob and b'"sprites"' not in blob:
                continue
            for save in candidates_in(blob):
                found.append((label, save))
    except ValueError as err:
        print(str(err), file=sys.stderr)
        return 1
    except (OSError, tarfile.TarError) as err:
        print(f"Could not read {args.source}: {err}", file=sys.stderr)
        return 1

    if not found:
        print(
            "No Sprite Hollow save found.\n"
            "\n"
            "Things worth trying:\n"
            "  * pull the whole folder, not just one file - the newest writes live in\n"
            "    the .log file inside 'Local Storage/leveldb'\n"
            "  * on Android 12+ `adb backup` cannot read app data, so a rooted pull is\n"
            "    needed (or re-sign the update with the original key instead)\n"
            f"  * scanned {scanned} file(s) from {args.source}",
            file=sys.stderr,
        )
        return 1

    # The richest save wins: several LevelDB generations are usually present.
    found.sort(key=lambda pair: (len(pair[1].get("sprites") or []), len(json.dumps(pair[1]))))
    label, save = found[-1]

    text = json.dumps(save, separators=(",", ":"), ensure_ascii=False)
    code = "SH-save-1:" + base64.b64encode(text.encode("utf-8")).decode("ascii")

    json_path = f"{args.out_prefix}.json"
    code_path = f"{args.out_prefix}.txt"
    with open(json_path, "w", encoding="utf-8", newline="") as fh:
        fh.write(text)
    with open(code_path, "w", encoding="utf-8", newline="") as fh:
        fh.write(code)

    print(f"Recovered from: {label}")
    print(f"  {describe(save)}")
    if len(found) > 1:
        print(f"  ({len(found)} save generations found; the fullest one was taken)")
    print()
    print(f"Wrote {json_path} and {code_path}")
    print()
    print("On 4.1.1: 💾 Save backup -> Restore, paste the code from")
    print(f"  {code_path}")
    print("or use 'Choose a file' and pick the .json.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
