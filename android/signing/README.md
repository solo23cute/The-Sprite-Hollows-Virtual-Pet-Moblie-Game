# Project signing key

`spritehollow-release.keystore` is the key every Sprite Hollow build is signed
with. It is committed on purpose: Android only installs an update over an app
signed with the *same* certificate, so keeping the key in the repository is what
lets a new APK replace the old one and keep the player's saved Hollow. If the
key is lost, every installed copy has to be uninstalled (which clears saves)
before another build can be installed.

- alias: `spritehollow`
- store and key password: `spritehollow`
- RSA 2048, validity 10,000 days
- SHA-256: `40b1de4951c631ec8349687ed9d3065984677a050f91bb96710c745620a15d37`

This is a sideloaded game, not a Play Store app, so the key is not used to prove
identity to anyone — it exists so updates chain. Do not reuse it for anything
else, and do not publish builds signed with any other key under the same
package name.

`android/build.sh` picks this file up automatically. To sign with something else
(for example to match a phone that still trusts an older key):

    KEYSTORE=/path/other.keystore KEYPASS=secret bash android/build.sh out.apk
