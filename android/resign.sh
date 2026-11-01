#!/usr/bin/env bash
# Re-sign an already-built Sprite Hollow APK with a chosen keystore.
#
# Use this to update a phone that still trusts an older signing key: the game
# code and versionCode stay exactly as built, only the signature changes, so the
# installed app (and its save) is replaced in place instead of being wiped.
#
# Usage:
#   KEYSTORE=path/to/release.keystore ALIAS=key-alias PASS=secret \
#     android/resign.sh SpriteHollow-4.1.1-v70-release.apk SpriteHollow-old-key.apk
#
# Optional environment:
#   APKSIGNER=path/to/apksigner   otherwise .tools/android-sdk, then PATH
#   LINEAGE=path/to/lineage.bin   only when adding a NEW rotation on top of the
#                                 signing key; not needed to match an existing key
#
# Which keystore to use: the one holding the certificate the phone's Android
# version trusts for com.spritehollow.game.
#   Android 12 and below  -> 107d75b5...  (the pre-rotation release key)
#   Android 13 and above  -> a64c2b04...  (the 2026-11 rotated key)
# A build signed with the pre-rotation key will NOT install on Android 13+, and
# one signed with the rotated key will NOT install on Android 12 or below.
set -euo pipefail

usage() {
  sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//'
  exit 2
}

[[ $# -ge 1 ]] || usage
IN_APK=$1
OUT_APK=${2:-}

[[ -n ${KEYSTORE:-} ]] || { echo "Set KEYSTORE to the keystore file to sign with." >&2; exit 2; }
[[ -n ${ALIAS:-}    ]] || { echo "Set ALIAS to the key alias inside that keystore." >&2; exit 2; }
[[ -n ${PASS:-}     ]] || { echo "Set PASS to the keystore/key password." >&2; exit 2; }

[[ -f $IN_APK ]]   || { echo "No such APK: $IN_APK" >&2; exit 2; }
[[ -f $KEYSTORE ]] || { echo "No such keystore: $KEYSTORE" >&2; exit 2; }
[[ -n $OUT_APK ]] || OUT_APK="${IN_APK%.apk}-resigned.apk"

here=$(cd "$(dirname "$0")" && pwd)
repo=$(dirname "$here")

if [[ -z ${APKSIGNER:-} ]]; then
  if [[ -x "$repo/.tools/android-sdk/build-tools/34.0.0/apksigner" ]]; then
    APKSIGNER="$repo/.tools/android-sdk/build-tools/34.0.0/apksigner"
  elif command -v apksigner >/dev/null 2>&1; then
    APKSIGNER=$(command -v apksigner)
  else
    echo "Could not find apksigner. Set APKSIGNER=/path/to/apksigner." >&2
    exit 2
  fi
fi

if [[ -x "$repo/.tools/jdk-17.0.21+9/bin/java" ]]; then
  export JAVA_HOME="$repo/.tools/jdk-17.0.21+9"
  export PATH="$JAVA_HOME/bin:$PATH"
fi

sign_flags=(--ks "$KEYSTORE" --ks-key-alias "$ALIAS" --ks-pass "pass:$PASS" --key-pass "pass:$PASS"
            --v1-signing-enabled false --v2-signing-enabled true --v3-signing-enabled true)
if [[ -n ${LINEAGE:-} ]]; then
  [[ -f $LINEAGE ]] || { echo "No such lineage file: $LINEAGE" >&2; exit 2; }
  sign_flags+=(--lineage "$LINEAGE")
  echo "Continuing a rotation with $LINEAGE"
fi

echo "Signing   $IN_APK"
echo "     with $KEYSTORE (alias $ALIAS)"
if ! "$APKSIGNER" sign "${sign_flags[@]}" --out "$OUT_APK" "$IN_APK"; then
  echo >&2
  echo "Signing failed. The usual causes:" >&2
  echo "  * the keystore or key password is wrong (PASS)" >&2
  echo "  * the alias does not exist in that keystore (ALIAS)" >&2
  echo "  * LINEAGE points at a lineage that does not belong to this key" >&2
  rm -f "$OUT_APK"
  exit 1
fi

echo
echo "Verifying $OUT_APK"
"$APKSIGNER" verify --print-certs -v "$OUT_APK" >/dev/null
"$APKSIGNER" verify --print-certs "$OUT_APK"

digest=$("$APKSIGNER" verify --print-certs "$OUT_APK" | sed -n 's/^Signer #1 certificate SHA-256 digest: //p')
case "$digest" in
  107d75b5*) note="pre-rotation release key - installs over 3.18.0 on Android 12 and below" ;;
  a64c2b04*) note="2026-11 rotated key - installs over 3.18.0 on Android 13 and above" ;;
  799ec735*) note="current key - installs over 3.19.0 and later, NOT over 3.18.0" ;;
  503f86d0*) note="debug key - only installs over a debug build" ;;
  *)         note="unrecognised key - it will only install over an app signed with this same key" ;;
esac

echo
echo "Signature: $digest"
echo "Meaning:   $note"
echo "Wrote:     $OUT_APK"
