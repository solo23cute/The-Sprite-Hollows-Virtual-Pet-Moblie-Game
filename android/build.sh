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
cp "$ROOT/index.html" "$ROOT/styles.css" "$ROOT/styles-arcade.css" "$ROOT/manifest.webmanifest" "$ROOT/icon.svg" "$HERE/assets/www/"
cp -R "$ROOT/src" "$HERE/assets/www/src"

echo "==> Compiling Android resources"
rm -rf "$HERE/build"
mkdir -p "$HERE/build/gen" "$HERE/build/classes" "$HERE/build/dex"
"$BT/aapt2$EXE" compile --dir "$HERE/res" -o "$HERE/build/res.zip"

echo "==> Linking APK shell"
"$BT/aapt2$EXE" link \
  -o "$HERE/build/app-unsigned.apk" \
  -I "$AJ" \
  --manifest "$HERE/AndroidManifest.xml" \
  -A "$HERE/assets" \
  --java "$HERE/build/gen" \
  --min-sdk-version 26 \
  --target-sdk-version 34 \
  --version-code 62 \
  --version-name 3.13.0 \
  "$HERE/build/res.zip"

echo "==> Compiling Java"
"$JAVA_BIN/javac$EXE" --release 8 -Xlint:-options -classpath "$AJ" \
  -d "$HERE/build/classes" "$HERE"/src/com/spritehollow/game/*.java

echo "==> Dexing"
(
  cd "$HERE"
  "$JAVA_BIN/java$EXE" -cp "$BT/lib/d8.jar" com.android.tools.r8.D8 \
    --lib "$AJ" --release --min-api 26 --output build/dex \
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
"$JAVA_BIN/java$EXE" -jar "$BT/lib/apksigner.jar" sign \
  --ks "$KEYSTORE" --ks-pass "pass:$KEYPASS" --key-pass "pass:$KEYPASS" \
  --ks-key-alias "$KS_ALIAS" \
  --out "$OUT" "$HERE/build/app-aligned.apk"

echo "==> Verifying"
"$JAVA_BIN/java$EXE" -jar "$BT/lib/apksigner.jar" verify --print-certs "$OUT"
"$BT/aapt2$EXE" dump badging "$OUT" | head -4

echo ""
echo "APK ready: $OUT"
