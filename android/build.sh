#!/usr/bin/env bash
# Build Sprite Hollow into an installable debug-signed APK.
# Requires: Android SDK build-tools 34+, platform android-35, a JDK, python.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
SDK="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-$HOME/AppData/Local/Android/Sdk}}"
JAVA_BIN="${JAVA_BIN:-/c/Program Files/Android/Android Studio/jbr/bin}"
BT="${ANDROID_BUILD_TOOLS:-$SDK/build-tools/34.0.0}"
AJ="${ANDROID_JAR:-$SDK/platforms/android-35/android.jar}"
OUT="${1:-$ROOT/SpriteHollow.apk}"
MANIFEST="${MANIFEST:-$HERE/AndroidManifest.xml}"
MIN_SDK="${MIN_SDK:-24}"
VERSION_CODE="${VERSION_CODE:-70}"
VERSION_NAME="${VERSION_NAME:-4.1.1}"
SIGN_V1="${SIGN_V1:-false}"
KEYSTORE="${KEYSTORE:-$HERE/debug.keystore}"
KEYPASS="${KEYPASS:-spritehollow}"
KS_ALIAS="${KS_ALIAS:-spritehollow}"
PYTHON="${PYTHON:-python}"
EXE=""
case "$(uname -s)" in MINGW*|MSYS*|CYGWIN*) EXE=".exe" ;; esac

for tool in "$JAVA_BIN/java$EXE" "$JAVA_BIN/javac$EXE" "$JAVA_BIN/keytool$EXE" "$BT/aapt2$EXE" "$BT/zipalign$EXE" "$BT/lib/d8.jar" "$BT/lib/apksigner.jar" "$AJ"; do
  if [ ! -e "$tool" ]; then
    echo "Missing required tool: $tool" >&2
    exit 1
  fi
done

echo "==> Copying web game into assets"
rm -rf "$HERE/assets/www"
mkdir -p "$HERE/assets/www"
cp "$ROOT/index.html" "$ROOT/styles.css" "$ROOT/styles-arcade.css" "$ROOT/styles-hollow-home.css" "$ROOT/manifest.webmanifest" "$ROOT/icon.svg" "$HERE/assets/www/"
cp -R "$ROOT/src" "$HERE/assets/www/src"

echo "==> Compiling Android resources"
rm -rf "$HERE/build"
mkdir -p "$HERE/build/gen" "$HERE/build/classes" "$HERE/build/dex"
"$BT/aapt2$EXE" compile --dir "$HERE/res" -o "$HERE/build/res.zip"

echo "==> Linking APK shell"
"$BT/aapt2$EXE" link \
  -o "$HERE/build/app-unsigned.apk" \
  -I "$AJ" \
  --manifest "$MANIFEST" \
  -A "$HERE/assets" \
  --java "$HERE/build/gen" \
  --min-sdk-version "$MIN_SDK" \
  --target-sdk-version 34 \
  --version-code "$VERSION_CODE" \
  --version-name "$VERSION_NAME" \
  "$HERE/build/res.zip"

echo "==> Compiling Java"
"$JAVA_BIN/javac$EXE" --release 8 -Xlint:-options -classpath "$AJ" \
  -d "$HERE/build/classes" "$HERE"/src/com/spritehollow/game/*.java

echo "==> Dexing"
(
  cd "$HERE"
  "$JAVA_BIN/java$EXE" -cp "$BT/lib/d8.jar" com.android.tools.r8.D8 \
    --lib "$AJ" --release --min-api "$MIN_SDK" --output build/dex \
    $(find build/classes -name '*.class')
)

echo "==> Packaging classes.dex"
"$PYTHON" - "$HERE/build/app-unsigned.apk" "$HERE/build/dex/classes.dex" <<'PY'
import shutil, sys, zipfile
src, dex = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(src, 'a', zipfile.ZIP_DEFLATED) as z:
    z.write(dex, 'classes.dex')
PY

echo "==> Aligning"
"$BT/zipalign$EXE" -f 4 "$HERE/build/app-unsigned.apk" "$HERE/build/app-aligned.apk"

if [ ! -f "$KEYSTORE" ]; then
  if [ "$KEYSTORE" != "$HERE/debug.keystore" ]; then
    echo "Missing release keystore: $KEYSTORE" >&2
    exit 1
  fi
  echo "==> Creating local signing key"
  "$JAVA_BIN/keytool$EXE" -genkeypair -noprompt \
    -keystore "$KEYSTORE" -storepass "$KEYPASS" -keypass "$KEYPASS" \
    -alias spritehollow -keyalg RSA -keysize 2048 -validity 10000 \
    -dname "CN=Sprite Hollow, O=Sprite Hollow, C=US"
fi

echo "==> Signing"
SIGN_FLAGS=()
if [ "$SIGN_V1" = "true" ]; then
  # Android 5-6 (below API 24) only understands JAR signing.
  SIGN_FLAGS+=(--v1-signing-enabled true --v2-signing-enabled true)
fi

# Optional signing-certificate lineage, so a build signed with a newer key still
# updates in place over installs carrying an older one. Needs the lineage file and
# the keystore holding its newest key.
LINEAGE="${LINEAGE:-}"
if [ -n "$LINEAGE" ]; then
  if [ ! -f "$LINEAGE" ]; then
    echo "Missing signing lineage: $LINEAGE" >&2
    exit 1
  fi
  SIGN_FLAGS+=(--lineage "$LINEAGE")
fi
"$JAVA_BIN/java$EXE" -jar "$BT/lib/apksigner.jar" sign \
  --ks "$KEYSTORE" --ks-pass "pass:$KEYPASS" --key-pass "pass:$KEYPASS" \
  --ks-key-alias "$KS_ALIAS" \
  ${SIGN_FLAGS[@]+"${SIGN_FLAGS[@]}"} \
  --out "$OUT" "$HERE/build/app-aligned.apk"

echo "==> Verifying"
"$JAVA_BIN/java$EXE" -jar "$BT/lib/apksigner.jar" verify --print-certs "$OUT"
"$BT/aapt2$EXE" dump badging "$OUT" | head -4

echo ""
echo "APK ready: $OUT"
