## Sprite Hollow 4.1.5 — build 76

### Download

[**SpriteHollow-4.1.5-v76-release.apk**](https://github.com/solo23cute/The-Sprite-Hollows-Virtual-Pet-Moblie-Game/releases/download/v4.1.5-v76/SpriteHollow-4.1.5-v76-release.apk) — attached below.

- Package: `com.spritehollow.game`
- Version: `versionName 4.1.5` / `versionCode 76`
- Minimum Android: 7.0 (API 24)
- Target Android: 14 (API 34)
- Size: 762,859 bytes
- SHA-256: `36541ccf432ca5c983041a0ff95ebc27704259d60828723862205b68892cf8cc`
- Rebuilt from source and re-signed with the existing 4.1.3 lineage.
- v2, v3, and v3.1 signatures verify.

### Added

- **26 Hacker variants**, one for every favorite sprite, with neon visors, circuit traces, and code-bracket overlays.
- **26 Secret Hacker variants**, included automatically through the existing Secret snapshot.
- Hacker eggs are **Epic**: 160 coins, or 105 with the usual discount.
- The complete **Base** and **Trick-or-Treat** rosters remain included, including Mega Man and Trick or Treat X-Ray.

### Fixed

- **Biome and district quest claims:** the quest sheet stops clicks at its boundary, so the claim, travel, and guardian-finale handlers now listen inside the quest grid.
- **Guardian finales:** the finale button now opens and starts the duel instead of being swallowed by the sheet boundary.
- **Duels with sprites at home:** Hollow Duel and guardian duels fall back to the active at-home sprite when no sprite is out in the Hollow.
- **Mini-game menus:** the game overlay scrolls and respects short viewport heights, the board can shrink correctly, and touch handling works on game boards and the duel picker.
- **Cache busting:** quest, arcade, and layout assets use fresh cache keys so an upgrade does not keep the broken cached files.
- **Save recovery:** the first-run restore button, save-import flow, and rescue tooling from `main` are included.

### Upgrade notes

This APK updates **4.1.3 and 4.1.4 in place** and keeps their saved Hollow because the package and signer certificates match.

It is **not compatible with 3.20.0 / 4.1.2 v71** because their original private signing key is unavailable. Back up the save in Studio before uninstalling those builds.

### Verification

- All source JavaScript parses.
- APK ZIP integrity and 4-byte alignment pass.
- Package metadata reports 4.1.5 / 76.
- The rebuilt APK has the same entry list, dex, manifest, resources, and web assets as the verified hotfix9 build.
- Every packaged web asset matches the current source tree.
- APK signatures use the same `107d75b5…` (API 24–32) and `6466cb8f…` (API 33+) certificates as 4.1.4.

A physical Android install test is still pending; this cloud workspace has no connected phone.
