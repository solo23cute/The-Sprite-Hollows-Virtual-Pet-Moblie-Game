# Signing key

The APK signing key is **not** in this repository. It is a local file at
`android/signing/spritehollow-release.keystore` with its password in
`android/signing/.pass`; both are gitignored. `android/build.sh` reads them
automatically and falls back to `KEYSTORE` / `KEYPASS` from the environment.

Why: 4.3.4 accidentally published a keystore together with its password. Anyone
could have signed an APK that installs over it, so that key is retired. 4.3.5
is signed with a fresh RSA-3072 key.

## The lineage

`lineage.bin` is public and safe to commit. It is an apksigner
SigningCertificateLineage recording that the new key descends from the old one,
which lets a device that trusts the old certificate accept builds signed by the
new one. apksigner applies it by API level: phones on Android 7-12 (API
24-32) keep the old certificate, Android 13+ (API 33+) get the new one. Every build signed here
passes `--lineage android/signing/lineage.bin`.

If you rotate again:

    apksigner rotate --in android/signing/lineage.bin \
      --out android/signing/lineage.bin \
      --old-signer --ks <current>.keystore --ks-pass pass:<pass> --ks-key-alias spritehollow \
      --new-signer --ks <new>.keystore --ks-pass pass:<pass2> --ks-key-alias spritehollow

Then sign with the newest key and the same lineage file.

## Back it up

Losing the keystore means every installed copy must be uninstalled (clearing
saves) before another build can be installed. Keep `spritehollow-release.keystore`
and `.pass` in a password manager or private backup, never in this repository.
