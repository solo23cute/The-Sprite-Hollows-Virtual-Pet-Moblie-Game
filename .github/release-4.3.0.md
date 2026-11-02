# Sprite Hollow 4.3.0 — Medical TV: Grey’s Anatomy and Scrubs

**Android 7.0 and up** · `versionName 4.3.0` / `versionCode 78` · package `com.spritehollow.game` · minSdk 24 · targetSdk 34

## Downloads

- [`SpriteHollow-4.3.0-v78-release.apk`](SpriteHollow-4.3.0-v78-release.apk) — 764,065 bytes · SHA-256 `c929251d6746277c8c083fc2909359937922fb0f4999a989a23557ee2fda4a12`
- [`SpriteHollow-4.3.0-v78-debug.apk`](SpriteHollow-4.3.0-v78-debug.apk) — SHA-256 `2d151a50be69e11b0c247dd43d6fab2f79256d4b3036a63cb9ce7284ea342fe3`

## Medical-TV wing

- **76 Grey’s Anatomy characters**, with season ranges covering every season from 1 through 23.
- **30 Scrubs characters**, with season ranges covering all nine seasons.
- Each character has an original procedural portrait built from the Hollow’s body plan, medical props, and show palettes: coats, scrubs, stethoscopes, badges, charts, masks, caps, clipboards, and role-specific silhouettes. No broadcast frames or traced character art are used.
- Every signature has a show gene, Titan, type egg, habitat, named hybrid, and Wiki file.
- The new **Medical TV** roster tab filters by show and displays each character’s season range.
- The Wiki’s new **Medical TV: Grey’s & Scrubs** guide includes live counts and a season-by-season index for both shows.
- The induction tour’s new-collections step introduces the medical wing; the collection-wave registry and Codex counts include it automatically.

## Verification

- All source JavaScript passes `node --check`.
- 106/106 medical art signatures render in the data/art smoke test.
- Every Grey’s season 1–23 and Scrubs season 1–9 has at least one character.
- APK package metadata reports `versionCode 78`, `versionName 4.3.0`, minSdk 24, targetSdk 34.
- ZIP 4-byte alignment passes.
- APK signatures verify as v2 + v3 under `6466cb8f05718b524eca196ebaa58b66b593bd7e29dcf41b306ab771323894e9`.
- Packaged assets include `data-medical-tv.js`, `medical-art.js`, and `wiki-medical.js`.

## Signing note

The 4.2.0 APK carries two signers: `6466cb8f` for Android 13+ and `107d75b5` for Android 7–12. This checkout does not include the 107d75b5 private key, so the dual-signer lineage cannot be reproduced. This build is signed by the available `6466cb8f` key with v2 + v3:

- **Android 13+:** updates in place over 4.2.0.
- **Android 7–12:** installs cleanly, but cannot update a 4.2.0 install in place; uninstall the old build first. Uninstalling clears the app’s local save, so export a rescue code first.

A physical Android install test remains pending.
