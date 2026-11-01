## Sprite Hollow 4.2.0 — build 77

### Download

[**SpriteHollow-4.2.0-v77-release.apk**](https://github.com/solo23cute/The-Sprite-Hollows-Virtual-Pet-Moblie-Game/releases/download/v4.2.0-v77/SpriteHollow-4.2.0-v77-release.apk) — attached below.

- Package: `com.spritehollow.game`
- Version: `versionName 4.2.0` / `versionCode 77`
- Minimum Android: 7.0 (API 24)
- Target Android: 14 (API 34)
- Size: 759,739 bytes
- SHA-256: `1a994712b6a1f0c2b780e55bcc9a53b96f56ac33c180790a56104235627efdf3`
- Release-signed with the existing 4.1.3 lineage: v2, v3, and v3.1 signatures verify.
- Cumulative with hotfixes 1–11.

### Season Charge

- Every guardian win and every completed district now adds **1 Season Charge**.
- At **3 charges**, a random event or Admin sprite egg is added automatically.
- The egg arrives **40% warmed** and is labelled as a Season Event Egg.
- The district sheet, guardian gallery, and every guardian environment show the current charge, next-egg countdown, and total event eggs earned.

### Easier district quests

- All **13 GTA district and exotic biome lines** now need **one action per step**.
- Each line is travel → one game win → one care action → the guardian finale.
- Travel remains free and pays 10 coins.
- Reward copy, the induction tour, the Biome Atlas, and the Wiki all describe the one-action flow.

### Easier guardian duels

- The duel window is now **40 seconds** instead of 20.
- Each Strike deals **22–30 damage** instead of 9–16, so most guardians yield in about four hits.
- Guardian return hits drain only 0–1 resolve.
- Bouts remain free, unlimited, and retryable after a timeout.
- Practice wins also add Season Charge and lift bond and joy.

### Induction tour and Wiki

- Added a dedicated **District quests & guardians** tour step covering one-action steps, 40-second bouts, Season Charge, event eggs, and the unlimited guardian gallery.
- Expanded the Wiki's **District quests & Season Charge** guide with the exact travel/game/care loop, guardian tuning, rewards, 40%-warmed eggs, and the shared charge meter.
- Updated the Biome Atlas and guardian-gallery copy to match.

### Merged hotfixes

- Quest claim and guardian-finale click handling inside the district sheet.
- At-home sprite and Hollow Duel fallbacks.
- Short-viewport game overlays, board sizing, and touch handling.
- Base forms, Trick-or-Treat costumes, Hacker forms, Secret variants, and live roster counts across the Codex, Gender Codex, Breeding Codex, Biome Atlas, and World Evolution Atlas.
- Vault combination-list scrolling.
- Fresh cache keys for every changed asset.

### Upgrade notes

This APK updates **4.1.3, 4.1.4, and 4.1.5 in place** and keeps the saved Hollow because the package and signer lineage match.

It is **not compatible with 3.20.0 / 4.1.2 v71** because their original private signing key is unavailable. Back up the save in Studio before uninstalling those builds.

### Verification

- All changed JavaScript passes `node --check`.
- All **124 page-order scripts** load and boot in the VM harness, with state, tour, Wiki, quest, and guardian entry points present.
- The 13 quest lines have `need: 1`; none still says “2 games” or “twice”.
- Three charges grant one 40%-warmed Season Event Egg.
- Completing a district and winning a guardian duel each advance Season Charge.
- The dedicated tour step and expanded Wiki section render their new copy.
- APK ZIP integrity and 4-byte alignment pass.
- Package metadata reports 4.2.0 / 77.
- Every packaged web asset matches the current source tree.
- v2, v3, and v3.1 signatures verify with the existing API 24–32 and API 33+ certificates.

A physical Android install test is still pending; this cloud workspace has no connected phone. The WebView UI was exercised through the page-order VM harness, not a live browser.
