## 3.13.0 Adult Swim, Baby Looney Tunes, the Tooth Fairy, and Periwinkle Bell

- **Adult Swim wave — 58 sprites.** The late-night roster: Rick Sanchez, Morty, Summer, Beth, Jerry, Mr. Meeseeks, Squanchy, Birdperson, Pickle Rick, Master Shake, Frylock, Meatwad, Carl, Space Ghost, Zorak, Moltar, Brak, Harvey Birdman, Rusty Venture, Brock Samson, The Monarch, Dr. Girlfriend, Captain Murphy, Stormy Waters, Killface, Nathan Explosion, Skwisgaar, Toki, Pickles, William Murderface, The Warden, Huey, Riley, Granddad Freeman, Black Dynamite, Samurai Jack, Aku, Spear, Fang, Robot Chicken, Orel, Early Cuyler, Mr. Pickles, Pim, Charlie, Glep, Eric Andre, Brendon Small, Xavier, Mouse Fitzgerald, Stan, Roger, Francine, Steve, Hayley, Klaus, Gary Goodspeed, and Mooncake. Each has a late-night gene (Mad Science, Chaos, Muscle, Weird, Flex, Deadpan…), a Titan, an egg, a habitat, and named hybrids.
- **Baby Looney Tunes wave — 9 sprites.** The nursery years: Baby Bugs, Baby Daffy, Baby Tweety, Baby Sylvester, Baby Lola, Baby Taz, Baby Porky, Baby Foghorn, and Baby Pepé, with toddler genes (Mischief, Naptime, Song, Zoomies, Snack Time, Tantrum, Tiny, Charm) and their own playpen hybrids.
- **The Tooth Fairy arrives.** A proper pillow-side fairy joins the Pixie Hollow wave with a wish gene, her own egg, and a shared hybrid with Toothiana.
- **Periwinkle Bell.** Tinker Bell’s frost-talent sister is now listed under her full winter-fairy name, and Wiki search understands `periwinkle bell`, `winter fairy`, `tooth fairy`, `adult swim`, and `baby looney tunes`.
- Both new waves register in the collection registry, so the Tour, Wiki, and Codex counts pick them up automatically (18 waves total).
- Android build: **versionName 3.13.0 / versionCode 62** — release-signed `SpriteHollow-3.13.0-v62-release.apk` (628 KB) plus a debug-signed `SpriteHollow-3.13.0-v62.apk` (651 KB).
- Verified with the jsdom suite: 100 scripts boot clean, 58 Adult Swim + 9 Baby Looney Tunes + 53 Pixie Hollow sprites register with genes, Titans, eggs, and habitats, every new wave reports a live count, and Wiki search finds Rick, Baby Bugs, the Tooth Fairy, and Periwinkle Bell.

## 3.12.0 Evolution in progress, Hollow loading screen, and every fairy + Neverland

- **Evolution now plays as a sequence.** Evolving a sprite opens a full transformation screen: the old silhouette sits inside a spinning dust ring, a progress bar and phase captions run through the change, and at the halfway mark the art morphs into the new stage or diet form. When the bar fills, the same screen becomes the result panel with the new tier, its bonus, the six-step age ladder, and the next-tier hint. Age-tier crossings and diet forms (Dragon, Fairy, Ghoul, Titan) both use it, and multiple evolutions queue instead of stacking overlays.
- **Hollow loading screen.** Leaving any other tab for the Hollow now plays a short pixie-dust load: your active sprite bobbing inside a glow, a progress bar, and rotating lines (sweeping the meadow, warming the lanterns, shaking out the pixie dust, calling your sprite home) before the Hollow fades in. The same transition plays the first time you arrive after hatching your starter, tapping the screen skips it, and reduced-motion skips it entirely.
- **Pixie Hollow fairy wave — 52 sprites.** Every Tinker Bell film fairy: Tinker Bell, Rosetta, Silvermist, Iridessa, Fawn, Vidia, Terence, Queen Clarion, Fairy Mary, Clank, Bobble, Periwinkle, Lord Milori, Spike, Glimmer, Sled, Zarina, Nyx, Fury, Chase, Lizzy Griffiths, all four season ministers, Rani, Prilla, Beck, Lily, Fira, Fairy Gary, Gruff the NeverBeast, the Blue Fairy, Cinderella’s Fairy Godmother, Flora, Fauna, Merryweather, Shrek’s Fairy Godmother, Toothiana, Wanda, Cosmo, Jorgen Von Strangle, Bloom, Stella, Musa, Tecna, Aisha, Flora of the Winx Club, Crysta, Thumbelina, Maleficent, and Titania. Each has a talent gene, Titan, egg price, habitat, and named hybrid.
- **Neverland wave — 25 sprites.** Peter Pan, Wendy, John, Michael, Captain Hook, Mr. Smee, Tiger Lily, Nana, Tick-Tock Croc, Peter’s Shadow, Tootles, Nibs, Slightly, Curly, the Twins, Jane Darling, Mary and George Darling, Rufio, Jake, Izzy, Cubby, Skully, young James Hook, and a lagoon mermaid.
- Both waves register as their own collection waves, so the tour, Wiki, and Codex counts update automatically, and Wiki search understands `fairy`, `pixie hollow`, `tinker bell`, `peter pan`, `neverland`, and `lost boys`.
- Verified with a jsdom suite: 98 scripts boot with zero console errors, 52 fairy and 25 Neverland sprites register with genes, Titans, eggs, habitats, and hybrids, the evolution sequence reaches its result panel with a six-step ladder, the Hollow loading screen appears on tab entry and removes itself, and 16 collection waves report live counts.

## 3.11.0 Horror icons, evolution screens, Sensei tier, and weekend Admin Events

- **American Horror Story wave.** 41 characters across every season — Tate Langdon, Violet Harmon, Constance Langdon, Rubber Man, Moira O’Hara, Addie, Sister Jude, Kit Walker, Lana Winters, Dr. Arden, Bloody Face, Sister Mary Eunice, Pepper, Fiona and Cordelia Goode, Marie Laveau, Myrtle Snow, Madison Montgomery, Misty Day, Queenie, Kyle Spencer, Elsa Mars, Twisty, Dandy Mott, Jimmy Darling, the Countess, James Patrick March, Liz Taylor, Sally, the Butcher, Scáthach, Kai Anderson, Ally Mayfair-Richards, Michael Langdon, Mallory, Dinah Stevens, Brooke Thompson, Mr. Jingles, Montana Duke, Karen and Tuberose. Each has a gene power, Titan, type egg, habitat, and named hybrid, with original procedural art.
- **Evolution screens.** Crossing an age tier now opens a celebration sheet: the sprite at its new size, the stage bonus, and the full age ladder. Diet evolutions (Dragon, Fairy, Ghoul, Titan) get the same treatment.
- **Six age tiers.** Baby 1 → Juvenile 5 → Sprite 10 → Elder 20 → **Ancient 45** → **Sensei 100**. Sensei is the final tier and replaces the old stand-in “master” label; Sensei sprites can retire at level 100, and the level cap and Rebirth Meal path are unchanged.
- **Weekend Admin Event.** Every Saturday and Sunday one of five Admin events runs (Root Sprint, Hotfix Jam, Log Dive, Cache Clear, Ship It) with an XP multiplier, a coin payout, and one free event egg per weekend.
- **Special event and Admin sprites.** Five event-only sprites (Meteor Pup, Aurora Owl, Confetti Goat, Comet Bunny, Sundial Turtle) and six Admin sprites (Admin Aura, Root Rabbit, Dev Drake, Patch Pup, Log Lynx, Cache Cat). None are sold as normal eggs; they arrive through the weekend gift, the daily egg gift, or a holiday pool.
- **Live Codex, Wiki, and Tour.** A `COLLECTION_WAVES` registry now feeds the tour, the Wiki’s new Collection waves panel, and a Codex wave strip, so every count updates automatically whenever a new sprite wave is added. The tour gains an Evolution & Codex step and reads the age tiers live.
- **Tour size fix.** Heading, body, points, tip, and icon sizes were reduced so a step fits a phone screen without oversized text, and the new evolution sheet scales down on small displays.
- Verified with a jsdom suite: all 96 scripts boot with zero console errors, 41 AHS sprites, 5 event and 6 Admin sprites, the six-tier ladder resolves at levels 1/5/10/20/45/100, the weekend gift pays coins plus a 40%-warmed event egg and rejects a second claim, the evolution sheet opens on a tier crossing, and the Wiki and Codex wave panels render live counts.

## 3.10.0 Habitat picker repair, meme wave, daily egg gifts, and holiday bonuses

- Fixed the Studio habitat picker. Every **core habitat** and **biome** tile now uses a guaranteed inline palette, so the 18 worldwide habitats and the 18 type biomes can no longer render as invisible buttons on WebViews that reject `color-mix()`. Biome tiles also show their **species count** and locked state.
- Added **8 new biome habitats** to the picker, the Biome Atlas, and the Wiki: **Meme Core**, **Sakura Vale**, **Mushroom Hollow**, **Sunken Temple**, **Cyber Grid**, **Sky Isles**, **Lantern Bay**, and **Starfall Basin**. Each has its own palette, habitat label, species list, and XP bonus, and Hollow stages render a matching tinted sky.
- Added the **meme wave**: **40 meme legends** such as Doge, Cheems, Nyan Cat, Trollface, Rickroll, Big Chungus, Stonks, Grumpy Cat, Giga Chad, This Is Fine, Skibidi, and the Rizzler. Every one has a gene power, Titan, type-egg price, home habitats, named hybrids, and the shared procedural sprite art.
- Added the **Daily Egg Gift** on Today: one wrapped egg every day, and you choose **any sprite in the game** from a searchable picker (or accept the featured pick). Gift eggs arrive **40% warmed** in the Nest and are tracked per calendar day.
- Every holiday now grants a **season gift egg** every day of the event, plus bonus coins, a pantry snack, and a holiday **XP bonus**. Egg pools are themed: Halloween hands out scarecrow, witch, mummy, and cauldron eggs; Winterlight hands out elf, reindeer, and gingerbread eggs, and so on.
- Added **5 new holidays**: **Lantern Festival** (Feb 1–6), **Prank Day** (Apr 1–5), **Spring Egg Hunt** (Apr 6–19), **Sunfest** (Jun 20–Jul 7), and **Harvest Moon** (Nov 1–30). Bloom Festival now ends March 31 so the April events each get their own window.
- Added **6 season-only species** that arrive through holiday eggs: **Spring Chick**, **Egg Hunt Bunny**, **Sunspark**, **Beach Ball**, **Lantern Fox**, and **Jester Prank**.
- Holiday XP now stacks with weekly events, genes, habits, bonds, and habitat bonuses, and every holiday card shows its coin, gift, and XP multipliers plus the season egg pool.
- Android version **3.10.0 / versionCode 61**.
- Verified with a jsdom boot suite plus a new daily/holiday suite: 92 scripts boot with zero runtime errors, 2,900+ species registered, 40 meme species present with genes/Titans/eggs/homes, 26 biome tiles and 29 core habitat tiles render in Studio with inline palettes, Hollow stages tint correctly for the new habitats, the Biome Atlas travels to them, the Daily Egg Gift grants one egg per day for the species you pick and refuses a second claim, and season gift eggs resolve for all 11 holidays including the five new ones.

## 3.9.0 Every sprite finds its voice — animal cries and babbles

- Added a synthesized voice to every one of the **2,888 sprite types** — no audio files, no downloads, and fully offline.
- **23 animal and creature profiles:** meow, yip, bark, howl, growl, roar, chirp, hoot, croak, moo, oink, squeak, hiss, buzz, clank, chime, wail, babble, splash, rumble, spark, neigh, and trumpet.
- Known creatures map to fitting calls: wolves howl, cats meow, dogs bark, birds chirp, dragons roar, frogs croak, ghosts wail, robots clank, fish splash, and more. Everything else falls back to one of the **18 element/type families**.
- Each sprite's voice is deterministic from its **species, breed, hybrid, palette, pattern, finish, mutation, size, and form**, so different sprites of the same type still have their own pitch and phrasing.
- Cries play when a sprite is **tapped or petted**, when it **wakes up**, when an egg **hatches** (after the shell fanfare), and softly when a **detail card opens**. Eggs stay quiet until they hatch.
- Respects the Studio **sound toggle** and posts a descriptive **closed caption** such as “Luna meows” or “Ember roars”.
- Android version **3.9.0 / versionCode 60**.
- Verified with a dedicated Web Audio suite across all **2,888 element keys**: **7,776 oscillator notes scheduled**, zero missing voices, deterministic seeds, muted audio correctly silent, eggs correctly silent, and zero console/runtime errors. All prior 3.9 DOM suites also pass. Live Chromium screenshots remain unavailable in this VM because the NSS libraries are missing and there is no root access; the preview panel is the available visual check.

## 3.8.0 Weekly Hollow events, Friday Vault rescue, and free food days

- Added a seven-day weekly event calendar on **Today**, with one claim per event per week and a live seven-day strip showing claimed, current, and upcoming days.
- **Momentum Monday:** +50% XP, +25% coins, and a starter event crate.
- **Meal Train Tuesday:** every meal in the game is stocked free — **91 meal items** — with +10% XP and +20% bond.
- **Dessert Moon Wednesday:** every dessert is stocked free, with +15% XP.
- **Thirsty Thursday:** all **29 drinks** are stocked free, and gifts arrive 35% sooner.
- **Vault Rescue Friday:** claims **every missing Secret Vault sprite**, including the Master Vault if missing. A complete Vault pays a 250-coin crown instead.
- **Crate Catch-Up Saturday:** opens every unclaimed event crate from earlier in the week and the monthly crate if it is still sealed, plus +25% coins.
- **Grand Feast Sunday:** free meals, desserts, and drinks, **double XP**, +50% coins, +25% bond, and gifts 20% sooner.
- XP, game coins, check-in coins, gift timers, and bond gains now read the active day's live multiplier.
- Android version **3.8.0 / versionCode 59**.
- Verified with the weekly-event suite plus all prior 3.8 DOM suites: all 7 events registered, Saturday claimed its missing crates and monthly crate, Friday granted all **35** missing Vault sprites, all 91 meals and 29 drinks passed category checks, Monday's 1.5× XP and 1.25× coin multipliers resolved, Thursday's 1.35× gift speed resolved, and there were zero console/runtime errors. Live Chromium screenshots remain unavailable in this VM because the NSS libraries are missing and there is no root access; the preview panel is the available visual check.

## 3.7.0 World evolution atlas, every biome, and the free Vault codex

- Added the free **World Evolution Atlas**: **2,888 types × 4 forms = 11,552 evolution paths**, generated from the same live gene, biome, breeding, diet, and Vault tables the game uses.
- Every path records its rarity tier, home biome or Hollow scene, type-egg/Vault source, gene power, parent types, signature habit, personality, finish, size, Titan name, and the four-form diet recipe.
- Covers all **18 type biomes**, all **47 Hollow habitats**, and every **Secret Vault / Master Vault** species. **140 Vault evolution paths are readable for free**; owning the Vault sprite still requires its door.
- Added filters for all **12 tiers**, all four forms, every environment, type eggs, exotic eggs, the Secret Vault, and the Master Vault, plus free-text search across genes, parents, personalities, and environments.
- The Breeding Codex now has an **All type evolutions** section, the full form matrix, a free atlas launcher, and a per-parent “Every evolution path for this species” link.
- The Bond Codex now carries the same four-form world summary and atlas launcher. The Types screen has a dedicated **World Evolution Atlas** feature card, and every sprite's evolution screen links directly to its type's paths.
- The Wiki has a new **World evolution atlas** guide with tier coverage, all environments, parent inheritance, and the free Vault explanation; the Types guide now correctly says twelve tiers.
- Android version **3.7.0 / versionCode 58**.
- Verified with the new atlas suite plus the existing 3.7 DOM suites: 11,552 generated paths, all 18 biome buckets populated, 140 Vault/Master paths, correct Master Console/Vault gating labels, working environment and form filters, all three codex entry points, zero console/runtime errors. Live Chromium screenshots remain unavailable in this VM because the NSS libraries are missing and there is no root access; the preview panel is the available visual check.

## 3.6.0 Biome picker repair, twelve tiers, Bond Codex, and level 1,000

- Fixed the Studio scene picker: it now has separate **Core habitats**, **Type biomes**, and **Custom biomes** sections instead of one flat 47-button row. All **18 type biomes are always visible and selectable**, with palette tiles, emoji, habitat labels, and a direct **Biome Atlas** button.
- Repaired biome availability and travel. Biome scenes are recognized as unlocked from live scene data, visits are recorded when selected, and the Atlas, Wiki, and Studio all switch to the same scene.
- Expanded the ladder from nine to **twelve rarity tiers**: **Common → Uncommon → Rare → Epic → Legendary → Mythic → Secret → Exotic → Master → Celestial → Divine → Eternal**. The three apex ranks are trail-only and add **35,000 / 50,000 / 75,000** game coins.
- Added the **Bond Codex** from the Types screen, the Wiki, and every sprite's evolution screen. It documents all six bond ranks — New Friend, Warming Up, Friendly, Close, Inseparable, and Heartbound — with their live passive XP, gift, coin, and need-decay bonuses.
- Added a **NEXT EVOLUTION** card to every grown sprite with its next stage, required level, XP remaining, progress bar, and bond rank. The full evolution screen shows the four-stage timeline, current bond, and all four diet forms.
- Increased the sprite level cap from 30 to **1,000**. Starpath Feasts now advance to the next milestone (**5, 10, 20, 100, 250, 500, 1,000**) instead of overshooting to the cap. Existing saves and retired sprites remain valid.
- Updated the Wiki's habitat, Types, growth, and rebirth guides, plus the induction tour, for all 18 biomes, twelve tiers, six bonds, the evolution preview, and level 1,000.
- Android version **3.6.0 / versionCode 57**.
- Verified with the full DOM suite: 18 biome buttons with none disabled, all 12 tiers resolve, apex boosts cap at Eternal, all six bond ranks render with passive effects, the NEXT EVOLUTION screen opens, a level-20 Starpath Feast lands at milestone 100, the existing care-dock/tier suite passes, and there are zero console/runtime errors. Live Chromium screenshots remain unavailable in this VM because the NSS libraries are missing and there is no root access; the preview panel is the available visual check.

## 3.5.0 Trail upgrades, faster scrolling, and mobile readability

- Every finished **walk, jog, Moonlit Stroll, run, or Summit Scramble** now rolls one visible **Trail Upgrade**: raise this sprite's type tier, evolve it one stage, or take a bonus-coin payout. Higher trails roll the rare outcomes more often.
- Type-tier upgrades are stored per sprite, stack on the base nine-tier rarity, increase that sprite's game payout and common/uncommon gift speed, and appear as a **Trail +N** chip in sprite details and Activities.
- Stage upgrades advance the active sprite to its next life stage and raise its level to that stage's minimum. A maxed Elder or Master sprite falls back to the coin reward.
- The coin fallback pays **2×–3×** the trail payout depending on the route. Trail cards and the walk sheet now preview the upgrade roll.
- Faster scrolling: a passive mobile swipe boost plus a 1.45× wheel step for desktop/trackpad, with contained overscroll on screens, sheets, modals, and game boards.
- Mobile readability pass: larger body, chip, tab, game, need, and care labels; 46px buttons; 16px screen gutters; wider result cards; and text-size adjustment enabled.
- Android version **3.5.0 / versionCode 56**.
- Verified with deterministic DOM tests: low roll → Juvenile stage-up at level 5; Elder roll → Uncommon to Rare tier with a higher coin bonus; maxed Elder → coin fallback; all nine rarity tiers, the 10-button dock, and the existing UI suite still pass with zero console/runtime errors. Live Chromium screenshots remain unavailable in this VM because the NSS libraries are missing and there is no root access; the preview panel is the available visual check.

## 3.4.4 Care dock placement fix

- Moved the care dock out of the floating overlay and into the Hollow’s normal screen flow, directly above the tab bar. It no longer covers the scene or floats high over the page.
- Kept the two labeled 5-button rows, reduced the buttons to 48px and the dock to about 138px, and removed the extra 252px bottom reservation. The Hollow now reserves only the 76px tab bar.
- The Hollow stays scrollable with a 170px stage minimum, so short screens scroll instead of squashing the page from top to bottom.
- Android version **3.4.4 / versionCode 55**.
- Verified with the DOM suite: the dock is `position: relative`, follows the stage inside the screen, renders ten buttons in 5 + 5 labeled groups, the Hollow reserves only the tab bar, and there are zero console/runtime errors. A live Chromium screenshot remains unavailable because the cloud VM lacks the NSS libraries and has no root access; the app is available in the preview panel.

## 3.4.3 Tier ladder and Hollow layout repair

- Rarity is now a **nine-tier ladder**: **Common → Uncommon → Rare → Epic → Legendary → Mythic → Secret → Exotic → Master**. Secret, Exotic, and Master override the old egg-price band; Master is the single Master secret above Exotic.
- The Codex and Wiki list all nine tiers, Nest filters only show sellable type-egg tiers, owned sprite details show a tier chip, and game payouts extend through **Secret 13,500**, **Exotic 18,000**, and **Master 25,000**.
- Rebuilt the care dock as **two labeled rows**: **Care** (Feed, Rub Belly, Bath, Nap, Bed) and **Play & social** (Play, Walk, Throw Ball, Play Catch, Talk). It is pinned above the tab bar with compact 54px buttons, 5px gaps, and no wrapped or crushed labels.
- Fixed the Hollow squash: the main screen scrolls instead of compressing, the scene keeps a 190px minimum, and the pinned dock and tab bar are reserved with bottom padding.
- Android version **3.4.3 / versionCode 54**.
- Verified with the DOM suite: nine tiers resolve correctly, Codex shows All + nine tiers, Nest shows All + seven sellable tiers, the dock renders ten buttons in 5 + 5 labeled groups, the dock is absolutely pinned at 84px, article and sprite-detail tiers render, and there are zero console/runtime errors. A live Chromium screenshot remains unavailable because the cloud VM lacks the NSS libraries and has no root access; the app is available in the preview panel.

## 3.4.2 Netflix animation wing

- Added a **60-character Netflix animation wing under TV Legends**: **30 Netflix Anime** and **30 Netflix Toons** across **20 shows**, with **three characters per show**.
- **Netflix Anime:** Castlevania, Castlevania: Nocturne, Cyberpunk: Edgerunners, Blue Eye Samurai, Delicious in Dungeon, Pluto, Scott Pilgrim Takes Off, Devil May Cry, Sakamoto Days, and Beastars.
- **Netflix Toons:** Arcane, Hilda, Kipo and the Age of Wonderbeasts, She-Ra and the Princesses of Power, The Dragon Prince, Carmen Sandiego, Voltron: Legendary Defender, Trollhunters: Tales of Arcadia, The Cuphead Show!, and Sonic Prime.
- A duplicate audit against all **2,828 existing species** replaced eight collisions while keeping the wing at 60: Alucard → Carmilla; Scott Pilgrim and Ramona Flowers → Wallace Wells and Lucas Lee; Hilda → Alfur; Wolf → Dave; Carmen Sandiego → Zack; Sonic and Shadow → Nine and Rusty Rose. Dread completes the Sonic Prime trio.
- Every character has **original procedural art** (a unique hair, prop, and crest combination), a show gene, trait, rarity band, Titan, type egg, habitats, named hybrid, and a short original Wiki article. No show frames or traced character art are used.
- Added **Netflix Anime** and **Netflix Toons** roster tabs, a filter for every one of the 20 shows, owned counts and progress for the wing and each show, and search across names, shows, groups, genes, traits, blurbs, and articles. Cards open the correct Wiki article, and Back returns to the roster.
- Added **closed captions (CC)** for sound effects and spoken lines, plus **language settings** (English, Español, Français) and a language picker inside the induction tour with translated tour steps.
- All prior rosters, saves, art, genes, Titans, eggs, habitats, hybrids, guides, and collections are preserved. The Hollow now holds **2,888 species** and **2,882 named hybrids**. Android uses `versionName=3.4.2` and `versionCode=53`.
- Verified with a DOM test suite: six roster tabs, both Netflix tabs, all show filters, owned progress, search, article links, back navigation, language switching, CC captions, and zero console/runtime errors. A real Chromium run was blocked in the cloud VM by missing NSS system libraries (no root); the same source and events were exercised in jsdom instead.

## 3.4.1 Collection discovery: the roster browser

- Added a **Roster browser** for the four large widening collections: **92 ponies, 32 Care Bears, 100 TV Legends, and 90 Kingdom Hearts characters**.
- Four collection tabs keep the full roster compact. Filter ponies and Care Bears by family, TV Legends by show, and Kingdom Hearts by world, with live counts for every filter.
- Search works across names, groups, shows, worlds, genes, traits, and blurbs. Every card shows original art, its group label, its gene, and an **owned** marker; the active sprite is highlighted with a gold outline.
- Every roster card opens the full Wiki species file, including Titan, egg price, habitats, hybrids, and the Nest shortcut. Owned progress is shown per collection and per filter.
- The browser is available from the Wiki’s **Roster browser** launcher and the **🧭 Roster** button in Sprites. Back returns to the screen that opened it.
- This is a discovery layer only: all **2,828 species**, **2,825 named hybrids**, saves, and the 3.4.0 rosters are unchanged. Android uses `versionName=3.4.1` and `versionCode=52`.

## 3.4.0 Collection widening: ponies, Care Bears, TV & Disney worlds

- Expanded **My Little Pony from 32 to 92 ponies** with **60 additions**: 50 background favourites and 10 royal leaders. New entries include Doctor Whooves, Vinyl Scratch, Octavia, Spitfire, Silverstream, Ocellus, Yona, Diamond Tiara, Cheese Sandwich, Princess Flurry Heart, King Thorax, Queen Novo, Dragon Lord Ember, Nightmare Moon, and Daybreaker.
- Expanded **Care Bears from 17 to 32** with a **15-character Extended Care Family**: True Heart, Noble Heart, Grams, Baby Hugs, Baby Tugs, Champ, Secret, Share, Surprise, Harmony, Daydream, Take Care, Me, Messy, and Thanks-a-Lot.
- Expanded **TV Legends from 40 to 100** with **60 full-show roster additions** across Breaking Bad, Better Call Saul, Stranger Things, The Walking Dead, Dexter, House, Sherlock, The Office, Friends, The Big Bang Theory, Star Trek, The X-Files, Battlestar Galactica, Game of Thrones, Wednesday, The Addams Family, Futurama, and Pokémon.
- Expanded **Kingdom Hearts from 40 to 90** with **50 Disney-world characters** across Mickey’s castle, the princess worlds, Agrabah, Atlantica, Olympus, Wonderland, Neverland, Halloween Town, the Pride Lands, Hawaii, Andy’s room, Monstropolis, Arendelle, San Fransokyo, and the Grid.
- Every new entry has a gene, Titan, type egg, habitat, named hybrid, Wiki file, and original procedural art. The Hollow now has **2,828 species**, **2,825 named hybrids**, and **45 Wiki guides**.
- Existing saves, the 3.3.0 Legacy/WWE rosters, Vault progress, pony/Care-Bear bonuses, and care-dock games are preserved. Android uses `versionName=3.4.0` and `versionCode=51`.

## 3.3.0 Fortnite Legacy & WWE roster widening

- Expanded **Fortnite Legacy from 59 to 134 headliners**, adding 75 more Battle Pass outfits across every chapter and season grouping. New entries include Blue Squire, Midas, Meowscles, Iron Man, Spider-Man, Doctor Strange, Eren Jaeger, Miles Morales, Nisha, Korra, Wolverine, and more. The full Fortnite collection is now **177 sprites**.
- Expanded **WWE from 20 to 68 superstars** with 48 additions across seven new groups: **Golden Era, Attitude Era, Ruthless Aggression, PG Era, Women’s Legends, Tag Team Division, and NXT**. New entries include Hulk Hogan, André the Giant, Macho Man, Mankind, Kane, Batista, Rey Mysterio, Edge, Daniel Bryan, Chyna, Trish Stratus, Lita, The Road Warriors, The Usos, Johnny Gargano, and Adam Cole.
- Every new Legacy outfit has its chapter and season label, gene, Titan, type egg, habitats, and a named hybrid. Every new WWE superstar has an era group, nickname, gene, Titan, type egg, habitats, and named hybrid.
- Updated the Wiki rosters, entry counts, induction-tour text, and breeding-codex totals. The Hollow now has **2,643 species**, **2,640 named hybrids**, and **45 Wiki guides**.
- Existing 3.2.x saves, the original 59 Legacy and 20 WWE entries, pony/TV/realm/Kingdom Hearts waves, Vault progress, and care-dock controls are preserved. Android uses `versionName=3.3.0` and `versionCode=50`.

## 3.2.2 Care-dock layout fix

- Fixed the care-dock layout after adding Bed. The Bed button had inherited the bedroom’s global `.bed` component style, which made the entire second row 200px tall. The new actions now use namespaced classes: `care-rub`, `care-throw`, `care-catch`, and `care-bed`.
- The care dock is back to two compact rows: all ten buttons are 64px tall and the dock is 134px total, with no horizontal overflow at the tested phone viewport.
- Bed still opens the bedroom sheet with tuck-in, tuck-in-all, wake, and dream-journal controls.

## 3.2.1 Bed on the care dock

- Added **Bed** as the tenth care-dock action. It opens the existing bedroom sheet, where you can tuck in the active sprite, tuck in the whole Hollow, wake everyone, and read the dream journal.
- Updated the care guide and the first two induction-tour steps to include Bed alongside Feed, Play, Walk, Rub Belly, Throw Ball, Play Catch, Bath, Nap, and Talk.
- Existing saves, the four new collections, pony check-in/task bonuses, fetch game, breeding codex, and Vault progress are preserved. Android uses `versionName=3.2.1` and `versionCode=48`.

## 3.2.0 Ponies, TV, four realms, Kingdom Hearts & care play

- Added **32 My Little Pony friends**: the Mane Six, Cutie Mark Crusaders, royal alicorns, Ponyville regulars, sweethearts, and ponyvillains. Every pony has a cutie mark, pony type, gene, Titan, type egg, habitats, and named hybrid.
- Added **check-in and task bonuses** for ponies. While a pony is active, its gene adds bonus coins to every check-in and every completed daily, weekly, or monthly task. The Today screen shows the active pony bonus before you claim.
- Added **40 TV Legends** across five eras: prestige drama, sitcoms, sci-fi, fantasy, and animated television. The collection includes Breaking Bad, Stranger Things, The Walking Dead, The Office, Friends, Star Trek, The X-Files, Game of Thrones, Wednesday, Futurama, Avatar, and more.
- Added **32 realm sprites**: 8 Horror, 8 Dark Horror, 8 Light, and 8 Darkness. Each family has its own aura, gene, Titan, egg, habitat, and named hybrid.
- Added **40 Kingdom Hearts characters**: Destiny Islands, the full Organization XIII, the Sea-Salt trio, the Wayfinder trio, Seekers of Darkness, and Keyblade legacy.
- Added **Rub Belly**, **Throw Ball**, and **Play Catch** to the care dock alongside Feed, Play, Walk, Bath, Nap, and Talk. The two ball actions open a five-catch fetch game with coins, XP, bond, and Care Package progress.
- Added **four Wiki guides**, new recent cards, species infobox fields, search terms, breeding-codex links, and two new induction-tour steps covering the care games and all four collections.
- The Hollow now has **2,520 species**, **2,517 named hybrids**, and **45 Wiki guides**. Existing saves, sprites, Care Bears, Fortnite Legacy, WWE, Vault progress, and the 3.1.15 rewards are preserved. Android uses `versionName=3.2.0` and `versionCode=47`.

## 3.1.15 Fortnite Legacy, WWE & collection exotics

- Added **59 Fortnite Legacy headliners** covering every past season from Chapter 1 through Chapter 5, from Renegade Raider and Black Knight through Drift, Peely, Skye, Darth Vader, Geralt, Optimus Prime, Peter Griffin, Zeus, Gwenpool, and the Chapter 5 Remix.
- Added **20 WWE superstars**: The Undertaker, Stone Cold, The Rock, Triple H, Shawn Michaels, Bret Hart, John Cena, Roman Reigns, Cody Rhodes, Seth Rollins, Randy Orton, CM Punk, Drew McIntyre, AJ Styles, Becky Lynch, Charlotte Flair, Rhea Ripley, Bianca Belair, Sasha Banks, and Asuka.
- Every new species has original procedural ring gear or season gear, a gene, Titan, type egg, habitats, and a named hybrid. The type eggs and breeding pairs are live in the Nest and codex.
- Added four Vault milestones: **Season Keeper** at 8 Legacy species, **Ring Keeper** at 6 WWE species, the exotic **Rift Champion** at 16 Legacy species, and the exotic **Grand Slam** at 12 WWE species. The Hollow now has **24 exotic signatures**.
- The Wiki has a rebuilt **Fortnite current & legacy** guide covering every past season, a new **WWE superstars** guide, updated collection indexes, and live species infoboxes. The breeding codex now names the Legacy and WWE parent pools and their named hybrids.
- Existing saves, current Chapter 6/7 Fortnite species, Care Bears, roster, habitats, and Vault progress are preserved.

## 3.1.14 Care Bears & Cousins

- Added all **17 Care Bears & Cousins**: Cheer, Grumpy, Tenderheart, Good Luck, Funshine, Love-a-Lot, Wish, Bedtime, Birthday, Friend, Brave Heart Lion, Bright Heart Raccoon, Cozy Heart Penguin, Lotsa Heart Elephant, Swift Heart Rabbit, Treat Heart Pig, and Playful Heart Monkey.
- Every Care Bear and Cousin is a full collectible with original vector badge art, its own Care gene, a Legendary type egg, habitat homes, a Titan, and a named hybrid.
- Their genes always add **game coins** and speed up **normal gifts**, with extra joy, bond, snack, rest, or XP bonuses.
- Added **Care Packages**: with a Care Bear or Cousin active, every 3 completed activities — Hollow classics, Arcade challenges, trail walks, or sports — pays bonus coins, XP, a pantry food, and a snack. The meter is saved and persists across friends.
- Added a Care Package progress card to Activities, a full Wiki collection guide, species entries, and an induction-tour note. Existing saves, sprites, and progress are preserved.

## 3.1.13 Goal Kick & the sports court

- Added **Goal Kick** soccer to the sports court. Pick your moment while the keeper slides across the goal: open corners score 3, close shots score 2, and a save scores nothing.
- The Activities sports section now shows games played and the countdown to the next Sport Gift. Both Hoop Shot and Goal Kick always award pantry food, coins, XP, and bond.
- Updated the induction tour and release notes for 19 games and trails: 9 Hollow classics, 3 Arcade challenges, 5 trail activities, and 2 sports.
- Existing saves, sports progress, roster, lineage, Vault, and all previous rewards are preserved.

## 3.1.12 Jog, run, and Hoop Shot

- Added **Sunrise Jog** and **Wind Sprint** trail activities. Jog is open immediately; Run unlocks after 5 outings. Both pay higher coin, XP, and bond bonuses, with an increased chance of pantry food.
- Added **Hoop Shot** basketball in Activities: time the moving shot meter, sink baskets, and earn a guaranteed pantry food plus bonus coins and a sport gift every two games.
- Every movement activity now feeds the care loop: coins, XP, extra bond, joy, food chances, Trail Gifts every three outings, and Sport Gifts every two sports games.
- Fixed the trail loop with a visible countdown, an always-available **Head home** finish, a hard end timer, and reliable Reward collection.
- The induction tour now covers Jog, Run, Hoop Shot, food rewards, and sport gifts. Activities now lists **18 games and trails**.

## 3.1.11 Trail walks & a complete care tour

- Added **Walk** to the Hollow care dock and three playable trail routes: **Hollow Stroll**, **Moonlit Stroll**, and **Summit Scramble**.
- Walks are a real mini-game: tap pawprints, coins, and gift tokens, dodge puddles, and move the active sprite down the trail. Rewards include coins, XP toward levels, extra bond, joy, and a Trail Gift every three walks.
- Two routes unlock through play: **Moonlit Stroll after 3 walks** and **Summit Scramble after 8 walks**. Walk progress, distance, best walk, gifts, and unlocks are saved.
- Expanded the induction tour with a dedicated **Care & Trail Walks** step, plus updated Nest, growth, games, Vault, secrets, and final steps covering care, walking, retirement, rebirth, cross-type Vault previews, and all game routes.
- 15 games and trails, 31 secrets, 39 Wiki guides, and 2,276 species files.

## 3.1.10 Nest Vault, all-type merges & child previews

- Added a **Secret Vault** button directly in the Nest. Every unlocked secret now shows its parent types and named hybrids, with one-tap access to the full combination tree.
- Added a live **Possible child preview** to every species. Pick any other species or roll a random mate; the breeder generates a possible egg with its element, hybrid, breed, palette, finish, and shiny status.
- Removed the retired-parent restriction: **retired sprites can bond and merge**, and any two types can merge. Retired sprites still count toward Vault progress.
- Added the **Elder Keeper** secret for retiring a MAX sprite. The Vault now holds **31 secrets**; the Wiki has **39 guides** and **2,276 species files**.
- Existing saves, roster, collection slots, reincarnation, Space Kitchen, 18 biome guardians, and update lineage are preserved. Android uses `versionName=3.1.10` and `versionCode=41`.

# Sprite Hollow

A cozy mobile creature-collector about hatching, raising, talking to, and fusing wild little sprites. Built as an offline-first web game and packaged as an installable Android APK. No accounts, no network calls, no external assets — every sprite is drawn from its own genetics in SVG.

## Play

- **Hollow** — tap a sprite to pet it and switch who you're hanging out with. Sprites wander, emote at each other, and leave little ambient notes. Feed, play, bathe, nap, and talk from the care dock. Needs decay in real time, including while you're away. Your sprite greets you out loud when you arrive, says goodbye when you leave, and tells you what changed while you were gone; it also pipes up when a need gets low.
- **Bedroom** — a quiet room with a bed for everyone, reached from the 🛏️ Bedroom chip in the Hollow. Tuck a sprite in, tuck the whole Hollow in at once, or wake everyone up. Each bedtime runs two 90-second sleep cycles with a dream at the end; night tuck-ins build extra bond. The room's window follows the real sky, season, and weather. The **💭 Dream journal** keeps the last 100 dreams, filterable by sprite, so you can reread what everyone dreamed about.
- **Types** — the type encyclopedia. All 1,669 Nest-visible types with art, gene power, egg price, rarity, Titan name, and named hybrids (six more secrets live in the Vault). Search by name, filter by rarity (Common through Mythic), and tap any card for the full detail sheet. A **Finishes** strip below the grid shows the seven rare finishes any type can hatch with.
- **Wiki** — the **Sprite Wiki** / Spritepedia, reached from the callout at the top of Types or from any type's detail sheet. Search all species by name, trait, gene power, or habitat; read 2,197 cross-linked species articles with an infobox, behavior, home habitats, growth path, hybrids, and care notes; and browse thirty-eight system guides covering Hollow exotics, video games & FNAF, new & recent sprites, eggs, the Mythic Egg, habitats, animal field notes, candy and holidays, the Fortnite roster, the Fortnite Sprite field guide, merging, breeding, shines, evolution, care, check-ins, food, the World Kitchen, the Anime & Trainer Kitchen, crossover sprites, DC hero sprites, Marvel, myths, anime & cartoons, Marvel & DC villains, heroes & anti-heroes, the Disney signature collection, crossover legends, weather, the Pokédex wave, games, and gifts. The home page features **LIT-LadyBear**, plus live indexes for **video games & FNAF** and every recent wave.
- **Sprites** — your whole collection. Tap a card for needs, XP, bond, breed perk, personality, and lineage. Rename, style, or set the active sprite. Search the collection by name, element, **secret**, or **exotic**. Eggs and wild visitors can be any of 1,675 element types — the classic elements, the food and animal lines, the candy line (Cotton Candy, Lollipop, Gumball, Jellybean, Choco Bunny, Peppermint, Toffee Taffy, Candy Corn), the Halloween line (Scarecrow, Pumpkin Witch, Mummy, Frankenpal, Black Cat, Candy Cauldron), the Christmas line (Holiday Elf, Tinsel Reindeer, Gingerbread, Nutcracker, Snowman, Holly), the seasonal sprites (Pumpkin, Santa, Cupid, Charm), Snow, Zombie, Undead, Starfish, Pika, Unicorn, Devil, Yoga, Shark, White Whale, Dragon, Darker Joker, Jack Skull, Sally, Keke, Bestie, Dog, Karen, Mother Earth, ThatLadyBear, Werewolf, Normal, Gummy Bear, Muddy, Spot, Frozen, 67, Creeper, Sheep, Bull, Boss Baby, Hero6, and named character sprites like Batman, Superman, Sonic, Tails, Shadow, Ghost, Grim Reaper, One Wish Willow, Klombo, Crown, Meowscles, Peeky Peely, Boss, Vini Jr., Pollo, John Wick, plus animal sprites like Firefang Wolf, Beast Tamer, Sky Falcon, Night Raven, Ember Moth, Glass Dragonfly, Lantern Firefly, Moon Fox, River Otter, Stone Badger, Thistle Hare, and Aurora Elk.
- **Nest** — warm eggs with taps, hatch them into babies, buy wild eggs, or merge two level-3+ sprites into a new egg. Elements can blend into hybrids (Steam, Eclipse, Twilight…), colors mix, and rerolled breeds, patterns, accessories, personalities, and rare mutations can appear. Parents rest for a minute after. Wild eggs now cost 45 / 85 / 135 coins, and the **Mythic Egg** is 210 coins: every shell holds a Legendary or Mythic type, with Dragon and Mother Earth featured in its 33-type pool. Type eggs are 35% off their base prices. When a Mythic Egg is ready, an animated rarity reveal announces its fate before you break the shell. **Type eggs** then sell every element outright at its own price — a Water Egg always hatches Water, a Demon Egg always hatches Demon. Search any of the 1,669 type eggs or filter the strip by rarity (Common, Uncommon, Rare, Epic, Legendary, Mythic). The shop shows 60 type eggs at a time and loads more on demand.
- **Play** — nineteen games and trails, including three Arcade challenges, five trail activities, Hoop Shot basketball, and Goal Kick soccer. Treat Catch, Pulse Match, Sprite Says, and Coin Dig are always open; Nectar Pop unlocks at 4 check-ins, Green Toss at 6, Moon Match at 12, Candy Crunch at 14, and Holiday Lights at 20. Rune Slide, Zombie Siege, and Hollow Duel are always open and feed the arcade bonus and month-gift tracks. Each pays coins and XP to the active sprite, plus joy and bond, scaled by score. Common and Uncommon active sprites add **1,500 coins** to each completed game and make gifts arrive **25% sooner**. Rare, Epic, Legendary, and Mythic sprites add **2,700 / 4,000 / 6,750 / 10,000 coins**. Special sprites earn the normal payout plus their species' rarity bonus, and existing gene, habit, finish, and phase bonuses still stack.
- **Trail walks, jogs & runs** — tap Walk in the Hollow care dock to move with the active sprite. Hollow Stroll and Sunrise Jog are open immediately; Moonlit Stroll unlocks after 3 walks, Wind Sprint after 5, and Summit Scramble after 8. Tap pawprints, coins, and gift tokens while avoiding puddles. Every outing pays coins and XP, adds extra bond, restores joy, has a chance of pantry food, and moves toward a Trail Gift every three outings. Hoop Shot basketball and Goal Kick soccer are in Activities: time the shot meter or kick past the sliding keeper, and earn a guaranteed pantry food plus a Sport Gift every two games. Movement spends a little energy and hunger.
- **Today** — four check-in windows per day (morning, afternoon, evening, night), and daily, weekly, and monthly goals. A holiday card shows the current event, days remaining, coin and gift bonuses, and the daily themed treat; between events it counts down to the next holiday. Check-ins feed a weekly reward track (snacks at 4, a wild sprite at 8, a rare elder at 16), plus monthly milestones and a yearly mythic elder. Week, month, and year streaks track consistency over time.
- **Studio** (bottom **Settings** tab or the palette button) — five UI themes, 29 built-in hollow scenes (including 18 type biomes, each boosting its species' XP; Aurora Ridge and Crystal Caverns are gift unlocks), climate (free to switch), sound/motion/haptics toggles, a **voice picker (Off / Female / Male)**, your hollow's name, and full sprite styling: body breed, thirteen colorways, twelve patterns, twenty-two accessories (including warm clothes you buy once for the whole Hollow), plus a randomizer. The **unlimited custom wardrobe** adds named, two-colour outfits in eight procedural styles, and the **unlimited custom biome** builder names a habitat, picks its sky/ground/glow colors and XP bonus, and welcomes every species with no resident cap.

Growth: **Egg → Baby → Juvenile → Sprite → Elder** at levels 1 / 5 / 10 / 20, with a maximum level of **30**. Every level pays 12 coins. Talking is powered by a local personality + mood engine (seven personalities, needs-aware replies, jokes, and context keywords), not a cloud LLM.

- **Anime & Trainer Kitchen** — 42 anime meals, drinks, and desserts plus 18 Trainer foods, all with prices, need effects, and diet affinity. The market now has **264 foods**. Sixteen free snacks, including anime festival treats and Trainer berries, join the 32-snack pantry. The Food & snacks guide has dedicated **🍥 Anime** and **⚡ Trainer** filters, and the Wiki has a new Kitchen guide.
- **Heroes, villains & anti-heroes** — **61 new signature species** (28 heroes, 21 villains, and 12 anti-heroes) with original procedural masks, capes, emblems, flames, weapons, and tech motifs. Each has a gene power, Titan name, type egg, named hybrid, and habitat. The Marvel section also includes Deadpool and Gwenpool, with classic Spider-Man listed alongside them. Every character is available in the Nest and linked in the Wiki hero-wave guide.
- **Disney signature collection** — **75 Disney characters** across seven story families: **10 Mickey & Friends**, **10 Disney classics**, **11 princesses & heroes**, **12 animals & adventure**, **12 Pixar pals**, **10 villains**, and **10 modern Disney** characters. Mickey, Simba, and Stitch join from the existing cartoon wave. Each has a gene, Titan, type egg, habitat, named hybrid, and original procedural art. Every entry is available in the Nest and linked in the Wiki Disney guide.
- **Crossover legends** — **160 new characters** across nine curated families: **16 Five Nights at Freddy's**, **20 Super Mario Bros.**, **12 Spore creatures**, **11 new Tom & Jerry** plus Tom and Jerry, **17 new Looney Tunes** plus Bugs Bunny, **24 The Legend of Zelda**, **24 The Walking Dead**, **12 horror icons**, and **24 video game icons** plus Sonic, Tails, Shadow, Crash, Mega Man, Kirby, and Jazz Jackrabbit. Each new entry has a gene, Titan, type egg, habitat, named hybrid, and original procedural art.
- **Hollow exotics** — **YeallingZebra81**, **Supernora**, **WildTricky-JokerWolf**, and **LIT-LadyBear** are one-of-one exotic signatures with original procedural art. YeallingZebra81 has the pink-bob-and-headphones portrait and **Backstage Pass**; Supernora brings a star crown, comet trail, and **Supernova Heart**; WildTricky-JokerWolf has split purple-green ears, a jester grin, and **Wildcard Howl**; LIT-LadyBear has red-and-black tiger stripes, glowing gold eyes, a white fur hood, and a teal **LIT-LADYBEAR** plaque, with **LIT Roar**. Each has a 260-coin Mythic type egg (170 coins with the standard discount), a Titan, and three habitats. Search **exotic** in Sprites to surface them, or open their cards in the Biome Atlas.

## Deeper systems

- **Check-ins & rewards** — each of the four daily windows pays coins (the first of the day keeps the streak alive) and can drop one of 32 free pantry snacks. Weekly check-in count unlocks snack bundles, wild sprites at random ages and sizes, and rare elders. Month and year counters unlock bigger milestone creatures.
- **Habitats & leveling** — 29 built-in environments give every one of the 1,675 species a place to grow. Matching species earn **+40–50% XP**; visitors still earn **+10%**. **Sunny Grove** (Meadow), **Moon Hollow** (Moonlit), **Tidepool** (Tidal), **Neon Den** (Arcade), **Aurora Ridge** (Aurora), **Crystal Caverns** (Cavern), **Ember Forge** (Ember), **Sugar Kitchen** (Sugar), and **Dream Conservatory** (Dream) each have their own decor and species list. The 18 type biomes add a further +50% for their matching Pokémon and gather every Pokémon by standard type. The Hollow chip shows the active sprite's current bonus, and Studio lists exactly which species thrive in the selected habitat.
- **Sleep cycles** — a tuck-in sets two 90-second cycles and fills the bed with Zzzs. Every completed cycle restores energy and pays bond and XP when the sprite wakes; waking early keeps whatever energy was already recovered. Night tuck-ins give a bigger bond and XP bonus, and every wake leaves a dream that is saved to that sprite and the bedroom's dream journal. Quick 30-second naps are still available from the Hollow care dock.
- **Gifts** — your active sprite wraps a gift every few minutes. Open it in the Hollow for XP, coins, snacks, or a brand-new environment. Gale sprites and some combos speed gifts up.
- **Seasons & weather** — the real calendar drives **Spring, Summer, Autumn, and Winter**, layered over the dawn/day/dusk/night clock. Each season has its own sky tint, ground colours, and weather pool: spring petals and rain, summer heat and storms, autumn leaves and fog, winter snow and frost. Weather changes every three hours and is drawn on the Hollow stage. You can pick a **climate** (Temperate, Tropical, Arid, Arctic, Highland) in the Studio to shift the odds and even change what a season is called (Tropical winter becomes the wet season).
- **Candy & holidays** — ten candy-tagged foods build a sprite's **Sugar** (0–3). At 3, the sprite transforms into a random candy species, sugar resets, and the Hollow records the morph. Seven real-calendar events — New Year Spark, Sweetheart Week, Bloom Festival, Candy Carnival, Hollow Halloween, Harvest Homecoming, and Winterlight — boost coin payouts and gift speed, while the first check-in of each event day stocks a themed treat. The calendar adds **20 species**: 8 candy and 6 each for Halloween and Christmas, all with genes, Titans, type eggs, habitats, and signature art.
- **Pokédex wave** — all **1,025 base Pokémon species** across the 18 standard types, from Bulbasaur to Pecharunt. Each species is a full collectible with its own type egg, gene power, Titan name, habitat list, greeting, and **Bond** hybrid, drawn as original procedural vector art rather than imported sprites. The encyclopedia now holds **1,675 species** (1,669 Nest-visible plus six secrets); type eggs page through 60 at a time, and search reaches every name.
- **Custom wardrobe & biomes** — the Studio can create unlimited named outfits in eight styles, each with its own main and trim colours, and unlimited custom biomes with a name, habitat label, emoji, sky/ground/glow palette, and XP bonus. Every custom biome welcomes every species and displays the entire grown collection at once, with no resident cap.
- **Warm clothes** — cold and wet weather drains energy, joy, and cleanliness faster. A scarf, wool beanie, mittens, or snow parka keeps a sprite cozy; the Hollow shows a Chilly/Cozy chip and tapping it opens the Studio wardrobe. Scarves are free, the other three are bought once with coins and then wearable by anyone.
- **Breeding bonuses** — every merge slightly raises the odds of twins and of a signature combo (Steam Sovereign, Eclipse Crown, Twilight Halo, Storm Chime, Glacier Bloom, Solstice Song, Prismheart). Combos bring their own palette, pattern, accessory, and power.
- **Genes, habits & powers** — every sprite carries an element gene and a breed habit. Genes grant active perks (extra game coins, sooner gifts, slower needs decay) and habits add quieter ones. These stack with combo and evolution powers.
- **Market & pantry** — the feed sheet's market sells 264 items across produce, meat, vegetables, drinks, desserts, meals, and treats — including horchata, berry shakes, churros, macarons, tres leches, s'mores, bao, noodles, pot pie, candy apples, cotton candy, candy canes, and holiday cookies — at lowered prices; buying stocks the pantry. Feed from the pantry to consume what you bought, alongside free snacks from check-ins and gifts.
- **Finishes** — about 15% of eggs hatch with a rare finish: **Gold**, **Gummy**, **Galaxy**, **Holofoil**, **Cube**, **Quack**, or **Gem**. A finish retints the whole sprite, adds its own overlay and bonus, and can be passed to eggs through merging. Each finish stacks with gene powers, habits, combos, and evolutions.
- **Food evolutions** — feeding builds four diet affinities (Hearty, Sweet, Eerie, Wild). At level 10, a sprite with 12 affinity in a path can evolve into a **Dragon**, **Fairy**, **Ghoul**, or elemental **Titan**, with its own silhouette, size, and superpower.

## Run the web version

```bash
python -m http.server 5173
# open http://localhost:5173
```

Any static file server works. The game saves to `localStorage` after every action.

## Android APK

**Download:** [`SpriteHollow-3.13.0-v62-release.apk`](SpriteHollow-3.13.0-v62-release.apk) — 628 KB, signed with the project release key and its rotation lineage, fully offline, `versionName 3.13.0` / `versionCode 62`. SHA-256 `9744efbb854f218bde960efe520b598124d7c32664bec8c82f9f682664d96a9c`. It installs in place over earlier release-key builds; a debug-signed [`SpriteHollow-3.13.0-v62.apk`](SpriteHollow-3.13.0-v62.apk) (651 KB, SHA-256 `3dc1162e7d51a90db53212e87eefbcca350ec6c3f63761f072881de7cbb78f9c`) is kept for sideloading onto clean devices.

**Release build (3.9.0):** [`SpriteHollow-release.apk`](SpriteHollow-release.apk) — 579 KB, signed with the project release key. SHA-256 `ad03d06073b644ab2974dc8b8b7244813b05120f34d71aa21d9722827cdf6b0e`.

- Minimum Android 8.0 (API 26); targets Android 14 (API 34).
- Install: open the APK on the phone and allow installation from this source, or use `adb install -r SpriteHollow.apk`.
- The APK bundles the exact same game inside an Android WebView. A tiny asset interceptor serves it from an `https://appassets…` origin so `localStorage` saves persist across app restarts.
- Spoken lines use the device's offline text-to-speech engine through a small Java bridge, so voice works with no network and no audio files.
- Android back closes an open sheet/chat/game, then exits the game.

### Rebuild the APK

Requirements: Android SDK with build-tools 34+, platform `android-35`, a JDK, and Python.

```bash
bash android/build.sh
# writes SpriteHollow.apk to the project root
```

The build copies the current web assets into `android/assets/www`, compiles resources, dexes the three Java classes, aligns, signs with `android/debug.keystore` (auto-created on first run), and verifies the APK.

For a release-signed build, first build the aligned APK, then sign it with the release key and its rotation lineage so devices running the debug build can update in place:

```bash
bash android/build.sh   # leaves android/build/app-aligned.apk behind
KEYPASS=$(sed -n 's/^storePassword=//p' android/release-key.properties)
java -jar "$ANDROID_HOME/build-tools/34.0.0/lib/apksigner.jar" sign \
  --ks android/release.keystore --ks-pass "pass:$KEYPASS" --key-pass "pass:$KEYPASS" \
  --ks-key-alias spritehollow-release \
  --next-signer --ks android/debug.keystore --ks-pass pass:spritehollow --key-pass pass:spritehollow --ks-key-alias spritehollow \
  --lineage android/release-lineage.bin --v1-signing-enabled false \
  --out SpriteHollow-release.apk android/build/app-aligned.apk
```

Keep `android/release.keystore`, `android/release-key.properties`, and `android/release-lineage.bin` backed up: Android requires the same key for every future update to an installed app. An AES-256 encrypted archive of all four signing files (including `debug.keystore`) lives in `Documents/SpriteHollow-signing-backup`; its passphrase is the `backupPassphrase` entry in `android/release-key.properties`.

When signed with the lineage, apksigner puts the original key in the v2 block and the rotated key in the v3/v3.1 blocks. That means Android 8.0-8.1 (API 26-27), which does not support key rotation, still installs the release APK as an in-place update over the debug build; Android 9-12 verify the same original key, and Android 13+ uses the release key through the lineage.

### Restoring the signing material

The encrypted archive in `Documents/SpriteHollow-signing-backup` contains `android/release.keystore`, `android/release-key.properties`, `android/release-lineage.bin`, and `android/debug.keystore` under their normal `android/` paths.

```bash
cd /path/to/sprite-hollow
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 \
  -in SpriteHollow-signing-2026-10-30.tar.gz.enc | tar xzf -
```

Use the `backupPassphrase` value that was stored in `android/release-key.properties` when the archive was made; keep that value somewhere other than the archive itself. After extraction, rebuild with `bash android/build.sh` and sign the aligned APK using the documented release command.

## Structure

```
index.html, styles.css        app shell + all UI styling
src/data.js                   elements, breeds, colorways, hybrids, foods, tasks, themes
src/state.js                  save data, needs simulation, growth, genetics, economy
src/sprites.js                parametric SVG sprite/egg art (1,675 species × 6 breeds × stages…)
src/data-disney.js            Disney signature collection and character art hooks
src/data-legends.js           160-character crossover legends wave and family data
src/legend-art.js             original procedural accents for the crossover legends
src/data-biomes.js            18 type biomes, exotic guardians, the Hollow exotic, and secret species
src/biome-art.js              original signature art for biome guardians, the Hollow exotic, and secrets
src/chat.js                   personality and mood dialogue engine
src/games.js                  core minigames
src/games-extra.js            Green Toss, Candy Crunch, and Holiday Lights
src/games-arcade.js           Rune Slide, Zombie Siege, and Hollow Duel
src/data-arcade.js            arcade bonus/month gifts and the Starpath Feast
src/data-candy.js             candy species, genes, foods, and hybrids
src/data-holidays.js          Halloween/Christmas species and the holiday calendar
src/data-fortnite.js          current Fortnite Chapter 6/7 roster
src/data-fortnite-legacy.js  59 past-season headliners, every season from Chapter 1 to Chapter 5
src/data-wwe.js               20 WWE legends, superstars, and women’s champions
src/data-franchise-waves.js 32 ponies, 40 TV legends, 32 realm sprites, 40 Kingdom Hearts characters
src/franchise-art.js          pony, TV, realm, and Keyblade signature art
src/data-netflix.js           60-character Netflix anime/toon wing, show genes, and Wiki notes
src/netflix-art.js            unique procedural hair, prop, and crest art for all 60
src/i18n.js                   English, Spanish, and French settings + tour translations
src/captions.js               closed captions for sounds and spoken lines
src/fortnite-art.js            signature art for the current Fortnite wave
src/fortnite-legacy-art.js    original season and chapter accents for the Legacy roster
src/wwe-art.js                 original ring gear, masks, and title belts for WWE
src/data-crossovers.js         Fall Guys, Among Us, pocket monsters, and brick builders
src/data-dc.js                 DC hero species, genes, Titans, prices, and habitats
src/data-waves.js              Marvel, myths, anime, cartoons, villains, and the Hollow legend
src/data-heroes.js            60 heroes, villains, and anti-heroes with genes and hybrids
src/hero-art.js               original signature art for the hero wave
src/data-anime-food.js        anime kitchen and Trainer pantry foods + snacks
src/data-pokedex.js           1,025 base Pokémon species, types, genes, Titans, habitats, and Bond hybrids
src/pokedex-art.js            original procedural art for the Pokédex wave
src/crossover-art.js           signature art for the crossover wave
src/dc-art.js                 signature art for the DC hero wave
src/wave-art.js               signature art for the 61-species multiverse wave
src/seasonal-art.js           signature art for the 20 seasonal species
src/screens/                  hollow, collection, codex, wiki, nest, play, today, studio, chat, hatch, intro
android/                      Android WebView shell, offline TTS bridge, and APK build pipeline
```

## Notes

- Creature designs, names, and art are original; no Fortnite assets or code are used.
- Pokémon names are used for identification in this offline fan project; every sprite is original procedural vector work, and no official Pokémon artwork or sprites are included.
- Hero, villain, and Trainer names are used for identification in this offline fan project. All silhouettes, garments, and signature overlays are original procedural vector work; no official character artwork is included.
- To start over, open **Studio → Start a brand-new Hollow**. This erases the save on that device.
- Reinstalling the APK with a different signing key will not update over an existing install; delete the old app first if you regenerate the keystore.

## Breeding codex (1.2.0)

`src/screens/breeding.js` derives every hybrid pair from `HYBRID_NAMES` and `COMBOS`, so the codex cannot drift from the merge logic. Open it from the Wiki guide list, any species article, or the breeding panel on a sprite's detail sheet.

## Fortnite roster (1.3.0)

Chapter 7 Season 4 "Override": Wrixel, Phantom, Mali, Bastian, K1TTYW1NS, Grace Crowne, and Geno (Sonic already existed). Treasure Hunters mini-season: Nico Robin, Portgas D. Ace, Cuddle Team Leader, Charlotte, and Captain X (Jonesy already existed). Each has its own palette, gene power, Titan name, egg price, habitat, and signature silhouette.

### Chapter 6 & Chapter 7 Season 3 (2.1.0)

The Guardian and The Voidblade are the two original Chapter 7 Season 3 headliners. Chapter 6 is covered end to end: Hunters, Lawless, the Galactic Battle mini-season, Super, Shock ’N Awesome, and The Simpsons. The bonus/mid-season outfits — Godzilla Evolved, Outlaw Midas, Dino Megazord, and Springfielder Peely — are included. Superman and Killswitch already had species files, so they complete the pass without duplicates. Each new species has its own palette, gene, Titan, type egg, habitat, and original silhouette.

## 1.4.0 additions

- 24 new hybrid pairs for the Fortnite roster, plus four signature combos: Steam Fist, Team Hug, High Tide, and Blackout.
- Coin Dig mini-game: twelve buried tiles, coins worth 1, gems worth 3, bombs cost 2. Always unlocked and pays up to 85 coins.
- Three climates: Coastal, Savanna, and Monsoon.
- Two gift-unlockable locations: Coral Reef and Golden Savanna, each with their own species family and scene palette.

## 1.5.0 additions

- Kirby species: Copy Ability gene (+20% XP, +1 coin per pet), Star Warrior Titan, legendary 175-price egg, Sugar Kitchen habitat, and a star silhouette.
- Retirement: elders can be retired from their detail sheet and live in a Retirement home section of the Sprites screen. Retired sprites stop losing needs and stop earning XP, cannot be active or merged, and can still be petted, fed, and brought back.


## 1.6.0 additions

- Monthly check-in on Today: one crate per calendar month, paying 100 coins plus 5 per check-in day that month (up to 150), three pantry foods, and one brand-new monthly food (stocked x2).
- The first daily check-in now always stocks one pantry food alongside its coins and snack chance.
- Eight monthly foods: Honeycomb Cake, Moonberry Shake, Starfruit Pie, Dumpling Boat, Lagoon Stew, Aurora Bun, Solar Curry, and Cloud Sorbet. Locked monthly foods stay hidden from the market until their crate is claimed; the market notes how many remain.


## 1.7.0 additions

- 42 new foods bring the market to 100 items across all seven categories: produce, meat, vegetables, drinks, desserts, meals, and treats. New lines include steak, shrimp, crab, sushi, burgers, pizza, tacos, pasta, espresso, chai, brownies, donuts, cupcakes, berry tarts, pretzels, popcorn, and cocoa truffles.
- 12 new free snacks bring the snack pool to 16: fruit gummies, golden crackers, moon cheese, night olives, kettle pop, berry juice boxes, warm milk, trail nuts, toasted rice cakes, moon chocolate, starfruit gummies, and fizzy dew.
- A new **Food & snacks** field guide on the Sprites screen lists every food and snack with search, category filters, an in-pantry filter, effects, diet affinity, stock, source, and monthly-crate lock status. Tap any entry for the full detail sheet.
- Every new item has a diet affinity, so the expanded pantry feeds all four evolution paths.


## 1.8.0 additions

- 12 animal species: Firefang Wolf, Beast Tamer, Sky Falcon, Night Raven, Ember Moth, Glass Dragonfly, Lantern Firefly, Moon Fox, River Otter, Stone Badger, Thistle Hare, and Aurora Elk. Each has its own palette, gene power, Titan name, type-egg price and rarity, at least one habitat, and a signature silhouette.
- New hybrids: Moonfox, Stormwing, Cinderfang, Lanternwing, Glasswing, Riverbank, Burrowstone, Thistlehop, Froststag, Storm Omen, Packbond, and Glowflight.
- The type encyclopedia now carries 171 species; the old 146 count in this README was stale and is corrected here.


## 3.1.8 Retirement, reincarnation, codes & milestone secrets

- **MAX sprites now retire automatically.** Retirement pauses needs and XP, and can be undone, but the new path is the **Rebirth Meal**: a 600-coin pantry food that returns a MAX sprite to an egg at level 1 while keeping identity, finish, palette, breed, and collection slot.
- Each rebirth permanently adds **+8% XP, +1 game coin, and +3% gift speed**. A rebirth pays **500 + 150 × cycle coins**, two pantry foods, two snacks, and unlocks the **Rebirth Keeper** secret.
- Added four milestone Vault keepers: **Daily Keeper** at seven check-ins, **Task Keeper** at ten claimed goals, **Gift Keeper** at twenty opened gifts, and **Rebirth Keeper** after a rebirth. The Vault now holds **31 secrets**.
- Added reusable daily codes in the Vault console: **HOLLOW** (+150 coins and a snack), **STARS** (+80 coins and two snacks), and **REBIRTH** (one Rebirth Meal after the first rebirth). **MASTER** still unlocks the Master after the tour. Codes reset each day.
- Added the **Retirement & reincarnation** Wiki guide and a Rebirth quick jump. The app is **2,197 species**, **498 catalog species**, and **38 Wiki guides**. Android uses `versionName=3.1.8` and `versionCode=39`.
- Existing saves, roster, collection slots, 18 biome guardians, and update lineage are preserved.

## 3.1.7 Films, anime, Cartoon Network & world habitats

- Added **216 species**: **12 FNAF movie**, **24 Disney movie**, **14 Nickelodeon movie**, **12 PBS movie**, **30 anime**, **24 Cartoon Network**, **16 90s cartoon**, **16 early-2000s cartoon**, **16 classic TV**, **16 Sesame/Team Umizoomi/Clifford**, **16 Powerpuff hero/villain**, and **20 cartoon/anime food** signatures.
- Added **18 worldwide habitat scenes**: Serengeti, Amazon, Great Barrier Reef, Himalaya, Arctic, Sahara, Alps, Galápagos, Madagascar, Borneo, Okavango, Patagonia, Iceland, Tasmania, Bavaria, Nile, Kerala, and Hokkaido. They are in Studio and the Wiki, without replacing the 18 biome guardians.
- Added the **Movies, anime, CN & world habitats** Wiki guide and a **Movies & anime** Quick jump. Every new species is in the Type encyclopedia and Wiki, and every new parent is in the breeder.
- The breeder now has a dedicated **Secrets & Vault hybrids** section listing all 26 secret keepers as parents, alongside the full parent-type index.
- The app is **2,193 species** with **498 catalog species**, **37 Wiki guides**, and **216 new-wave species**. Android uses `versionName=3.1.7` and `versionCode=38`.

## 3.1.6 Cartoon multiverse, Vault calendar & type parents

- Added **282 new species**: **30 PBS Kids**, **14 Monster Jam**, **24 Nickelodeon**, **27 Nick Jr.**, **16 Nicktoons**, **18 Discovery Kids & Family**, **30 animated-movie**, **30 comic-book**, **20 Disney Jr.**, **24 Disney XD**, **12 Disney classics**, **18 video-game genre mascots**, **18 world type variants**, and the **Shortcut** pathfinder.
- Added **six Wiki guides** for cartoon worlds, comics and Disney, game genres, world variants, the Vault calendar, and shortcuts. The Wiki now exposes **2,197 species files**, including secret keepers, and a **Quick jump** row reaches every new collection, the Vault, and the breeder.
- The **Breeding codex** now includes **all 1,977 parent species** with search and **54 parent-type filters**, plus named hybrid cards and a parent-type profile for every species.
- The **Type encyclopedia** filters All, Exotic, Secret, and Master, while retaining rarity and search filters. Secret and Master species open the Vault instead of an egg purchase.
- The **Secret Vault** now has **26 keepers**: six progress doors, **12 monthly keepers**, and **8 twice-weekly relays** with Monday–Wednesday and Thursday–Sunday windows. Open the Vault during a live window and claim the keeper before it rotates.
- The induction tour covers the cartoon/comic/game catalog, world variants, Shortcut, and the rotating Vault windows.
- Existing collections, saves, 18 biome guardians, and update lineage are preserved. Android uses `versionName=3.1.6` and `versionCode=37`.

## 3.1.5 video games, FNAF & recent arrivals

- The Wiki adds a **Video games & FNAF** guide with all **103 video-game signatures** linked from the live rosters: **16 Five Nights at Freddy’s**, **20 Super Mario Bros.**, **12 Spore**, **24 The Legend of Zelda**, and **31 Video game icons** including seven classics.
- Every FNAF character—from Freddy, Bonnie, Chica, and Foxy through Springtrap, Circus Baby, Glamrock Freddy, and Vanny—now opens directly from the guide. Search **FNAF** in the Wiki to filter the full 16-character roster.
- A new **New & recent sprites** index links every recent family: Hollow exotics, video games & FNAF, heroes and villains, Disney, crossover legends, Pokémon, Fortnite, seasonal species, animals, crossovers, and DC heroes.
- Game species articles now include an **Open the video games & FNAF guide** backlink. The Wiki has **thirty guides** and all **2,197 species files** remain searchable.
- Existing collections, saves, habitats, and the 18 biome guardians are unchanged. The app shows **v3.1.5**; Android uses `versionName=3.1.5` with `versionCode=36` for an in-place update over build 35.

## 3.1.4 Sprite Wiki: LIT-LadyBear

- The **Sprite Wiki** home page now features **LIT-LadyBear** with original portrait art and a direct link to its species file.
- A new **Hollow exotics** guide covers all four one-of-one signatures: YeallingZebra81, Supernora, WildTricky-JokerWolf, and LIT-LadyBear. It documents their genes, eggs, habitats, hybrids, and the difference between a Hollow exotic and a biome guardian.
- Every exotic species article now includes an **Open the Hollow exotics guide** link. The Wiki search finds the guide under “Hollow exotics” and the species under `lit-ladybear`, `ladybear`, or `exotic`.
- The Wiki still holds **1,675 species** (1,669 Nest-visible plus six secrets); no roster, save, habitat, or guardian data changed.
- The app shows **v3.1.4**; Android uses `versionName=3.1.4` with `versionCode=35` for an in-place update over build 34.

## 3.1.3 LIT-LadyBear

- **LIT-LadyBear** joins as a fourth Hollow exotic with original procedural art: black tiger stripes over scarlet fur, glowing gold eyes, a white-and-pink fur hood, teal mantle, and a **LIT-LADYBEAR** plaque.
- **LIT Roar** pays **+6 game coins** and makes gifts arrive **20% sooner**. **LadyBear Titan**; a **260-coin Mythic type egg** (170 coins discounted); habitats **Ember Forge, Moon Hollow, and Neon Den**.
- The Biome Atlas now lists **four Hollow exotics** and **22 exotic signatures** total. The Sprites search finds it by name, “exotic”, and “ladybear”.
- The encyclopedia holds **1,675 species** (1,669 Nest-visible plus six secrets). Existing collections, unlocks, saves, and the 18 biome guardians remain untouched.
- The app shows **v3.1.3**; Android uses `versionName=3.1.3` with `versionCode=34` for an in-place update over build 33.

## 3.1.2 more Hollow exotics

- **Supernora** joins as a cosmic exotic signature: star crown, comet trail, and a gold-lined cape in original procedural art. **Supernova Heart** grants **+32% XP** and **+4 game coins**; **Supernova Titan**; habitats Aurora Ridge, Neon Den, and Dream Conservatory.
- **WildTricky-JokerWolf** joins as a wild trickster exotic: split purple-and-green ears, jester bells, a playing-card grin, and a bushy tail. **Wildcard Howl** grants **+5 game coins** and gifts **20% sooner**; **Jokerwolf Titan**; habitats Neon Den, Ember Forge, and Moon Hollow.
- The **Sprites** collection now has search. Match names, elements, genes, **secret**, and **exotic** tags, with visible **✦ Exotic** and **🔐 Secret** badges on matching cards.
- The Biome Atlas lists all **21 exotic signatures**, and species articles retain the **Exotic signature** class. The encyclopedia holds **1,674 species** (1,668 Nest-visible plus six secrets).
- Existing collections, unlocks, saves, and the 18 biome guardians remain untouched. The app shows **v3.1.2**; Android uses `versionName=3.1.2` with `versionCode=33` for an in-place update over build 32.

## 3.1.1 Hollow exotic

- **YeallingZebra81** joins as a one-of-one **exotic signature** with original procedural portrait art: a hot-pink bob, purple headphones with green-lit cups, teal eyes, and a green-trimmed purple top.
- **Backstage Pass** brings gifts **28% sooner** and pays **+3 chat coins**. The species also has the **Backstage Titan**, a **260-coin Mythic type egg**, and **Neon Den / Aurora Ridge / Sugar Kitchen** habitats.
- The **Biome Atlas** now includes a **Hollow exotic** card, and species articles show an **Exotic signature** class. The encyclopedia holds **1,672 species** (1,666 Nest-visible plus six secrets), with **19 exotic signatures**.
- Existing collections, unlocks, saves, and the 18 biome guardians remain untouched. The app shows **v3.1.1**; Android uses `versionName=3.1.1` with `versionCode=32` for an in-place update over build 31.

## 3.1.0 crossover legends

- **160 new signature species** join the encyclopedia across five nights, mushroom kingdoms, spore worlds, cartoon alleys, Hyrule, the zombie apocalypse, horror marathons, and save files everywhere.
- **Nine curated family rosters:** 16 Five Nights at Freddy's, 20 Super Mario Bros., 12 Spore creatures, 13 Tom & Jerry, 18 Looney Tunes, 24 The Legend of Zelda, 24 The Walking Dead, 12 horror icons, and 31 video game icons.
- **Ten existing Hollow icons are folded into the new families:** Tom, Jerry, Bugs Bunny, Sonic, Tails, Shadow, Crash Bandicoot, Mega Man, Kirby, and Jazz Jackrabbit keep their original genes and signature art and are marked **classic**.
- Every new character has its own palette, original procedural accent art, gene power, Titan name, type egg, at least one habitat, and named hybrid. No imported character sprites, screenshots, or film assets are used.
- The Spritepedia adds the **Crossover legends** guide, grouped by family and searchable by Mario, Zelda, FNAF, Looney, Walking Dead, horror, or video game.
- The encyclopedia now holds **1,671 species** (1,665 Nest-visible plus six secrets). Existing collections, unlocks, and saves remain untouched.
- The app now shows **v3.1.0**. The Android package uses `versionName=3.1.0` with `versionCode=31` so it installs in place over build 30 and keeps saves.

## 3.0.0 additions

- **18 type biomes & exotic guardians:** every standard type now has its own environment — Wildmeadow, Cinder Caldera, Azure Lagoon, Static Spire, Verdant Terrace, Frostglint Fjord, Iron Dojo, Miasma Marsh, Dustbadge Canyon, Cloudstep Aerie, Mindveil Observatory, Honeyshell Hive, Granite Amphitheater, Wispveil Cemetery, Wyrmbone Peak, Moonshade Bazaar, Alloy Foundry, and Wishbloom Court. Each gathers every Pokémon of that type, grants **+50% XP** to matching species, and has an original **exotic guardian** available through its type egg. Open the **Biome Atlas** in Types or pick a scene in Studio.
- **Secret Vault:** six hidden sprites are not sold in the Nest. Complete the induction tour, reach level 30, visit all 18 biomes, reach 100 bond, hatch 25 eggs, and decode the Master's name. The vault tracks every clue and unlocks each sprite directly into your collection.
- **Master Cheat:** the sixth secret arrives fully grown at level 30 with the Cheat Code gene — double XP, +10 game coins, double gifts, and needs that fade half as fast.
- **Hero, villain & anti-hero wave:** 61 new signature species — **28 heroes**, **21 villains**, and **12 anti-heroes** — sorted into **32 Marvel**, **22 DC**, and **7 Beyond Marvel & DC** characters. Every one has original procedural art, a gene power, Titan name, type egg, habitat, and signature hybrid. The Spritepedia adds a publisher-grouped **Heroes, villains & anti-heroes** guide with Deadpool, Spider-Man, and Gwenpool in the Marvel section, and species articles show publisher and role.
- **Disney signature collection:** 75 characters across seven groups, including 72 new species plus Mickey, Simba, and Stitch. The collection has its own Spritepedia guide, searchable group labels, and a Disney infobox row on every species article.
- **Induction tour:** a thirteen-step narrated first-run walkthrough covers the Hollow and care dock, daily care, trail walks, jogging, running, Hoop Shot basketball, Goal Kick soccer, Care Bears & Cousins, Care Packages, food and gift rewards, route unlocks, Nest and Vault merging, growth, retirement and rebirth, collection and food, 18 type biomes, all nine classic games, three Arcade challenges, two sports, Today and weather, the hero/villain/anti-hero wave, secrets, and Studio. Large read-along type highlights each spoken line, with Read aloud and Stop controls, and the tour can be replayed from Studio. Finishing it awards the Hollow Guide secret.
- **Level cap 30:** growth now ends at level 30 instead of continuing to 40. Existing sprites above the cap are safely brought down to 30; the UI shows **MAX** at the cap.

- The app now shows its version as **v3.0.0** in the top bar, the intro screen, and the Studio footer. The Android package reports `versionName=3.0.0` with `versionCode=30`.
- **All 1,025 base Pokémon species:** every species from Bulbasaur (#001) to Pecharunt (#1,025), covering all 18 standard types. The encyclopedia grows from 329 to **1,511 species** (1,505 Nest-visible plus six secrets), and existing saves are untouched.
- Every Pokémon is a full collectible: original procedural vector art, its own type egg, gene power, Titan name, at least one habitat, greeting, and **Bond** hybrid. No official Pokémon artwork, sprites, or external assets are used.
- The Nest type-egg shop now renders 60 cards at a time with a **Show more** button; name search covers all 1,505 Nest-visible species. The Types archive and Spritepedia search the entire roster too.
- Spritepedia adds a **Pokédex: 1,025 species** guide with all-type counts and sample entries, bringing the guide count to **23**. Existing collections, unlocks, and saves continue unchanged.

## 3.0.0 arcade update

- **Three Arcade challenges:** Rune Slide (a three-board sliding puzzle), Zombie Siege (a three-lane horde defense with three hearts), and Hollow Duel (a timed strike-and-guard fight). All are always open from Play.
- **Rune Slide difficulty pass:** the order strip shows the target sequence, correctly placed runes glow green, shuffles are gentler, and the three-board run now has two minutes.
- **Coin-powered bonus gifts:** every 5,000 coins earned in the Arcade challenges fills a claimable gift with coins, a pantry food, and a snack. Every third gift also contains a Starpath Feast.
- **Month gifts:** three monthly tiers at 5,000 / 12,000 / 25,000 Arcade coins pay coins, food, snacks, and up to two Starpath Feasts. The track resets on the first of each month.
- **Starpath Feast:** a gift-only pantry food that advances the active sprite to its next growth milestone (5, 10, 20, or 30). It is not sold in the market and is never consumed by a max-level sprite.
- The Android build remains **v3.0.0** and now uses `versionCode=30` so it installs in place over versionCode 29 and keeps saves.

## 2.9.0 additions

- **ThatLadyBear:** a rare signature **Mythic Hollow Legend** joins the encyclopedia as species **329**. Its original vector art is a red tiger-striped bear with oversized fangs and a teal **THATLADYBEAR** plaque, with a distinct face instead of a recolored base sprite.
- **Den Mother gene:** pets build **40% more bond** and needs fade **12% slower**. Its Titan is **ThatLadyBear Titan**, its type egg costs **180 coins**, and it thrives in **Dream Conservatory, Crystal Caverns, and Ember Forge**.
- **Ladybear Legacy:** its signature breeding pair with **Bear**. ThatLadyBear can hatch from its own type egg or appear in wild eggs, and existing saves keep every sprite and unlock. It is searchable in Types and the Spritepedia, with its own generated species article.

## 2.8.0 additions

- **Multiverse wave:** 60 new species arrive together. There are 10 **Marvel heroes**, 10 **mythical creatures**, 10 **anime legends**, 10 **cartoon pals**, 10 **Marvel villains**, and 10 **DC villains**. The encyclopedia now holds **328 species** and the Spritepedia has **22 guides**, including the new **Marvel, myths, anime & cartoons** and **Marvel & DC villains** guides.
- **Marvel heroes:** Spider-Man, Iron Man, Captain America, Thor, Hulk, Black Widow, Doctor Strange, Black Panther, Scarlet Witch, and Wolverine.
- **Mythical creatures:** Phoenix, Griffin, Kraken, Pegasus, Minotaur, Centaur, Mermaid, Cerberus, Chimera, and Sphinx.
- **Anime legends:** Goku, Naruto, Luffy, Sailor Moon, Ichigo, Sasuke, Hinata, Levi, Vegeta, and Tanjiro.
- **Cartoon pals:** Mickey Mouse, Bugs Bunny, Tom Cat, Jerry Mouse, SpongeBob, Patrick Star, Scooby-Doo, Shaggy, Simba, and Stitch.
- **Villains:** Thanos, Loki, Magneto, Doctor Octopus, Green Goblin, Venom, Mysterio, Ultron, Red Skull, Killmonger, The Joker, Harley Quinn, Catwoman, Poison Ivy, Lex Luthor, Darkseid, Deathstroke, Bane, Sinestro, and Cheetah.
- Every new species has a unique palette, trait, gene power, Titan, type egg, at least one habitat, a named hybrid, and original signature art. They are available in the Type encyclopedia, Nest, habitats, breeding codex, wild visits, and the two new wiki guides.

## 2.7.0 additions

- **DC hero wave:** 20 new DC heroes join Batman and Superman for a **22-hero roster**. The new species are Wonder Woman, The Flash, Green Lantern, Aquaman, Cyborg, Martian Manhunter, Green Arrow, Black Canary, Supergirl, Batgirl, Nightwing, Shazam, Zatanna, Raven, Starfire, Beast Boy, Blue Beetle, Static, John Constantine, and Swamp Thing.
- **Full collectible support:** every DC hero has its own palette, gene power, Titan name, type egg, at least one thriving habitat, a named hybrid, and original signature art. The new hybrids include Amazon Star, Speed Surge, Emerald Dawn, Ocean Crown, Boom Circuit, Mars Dust, Arrow Spark, Sonic Cry, Solar Kryptonian, Bat Signal, Acrobat Dash, Shazam Spark, Backwards Dream, Raven’s Shadow, Starbolt, Wild Green, Scarab Gem, Static Surge, Hellblazer, and Green Mire.
- The encyclopedia now holds **268 species** and the Spritepedia has **20 guides**, including the new **DC hero sprites** guide. Existing saves keep their collections and unlocks; the new species are available through type eggs and can appear in the wild.

## 2.6.0 additions

- **Common and Uncommon payouts:** both rarities now add **1,500 coins** to each completed game, and their gifts arrive **25% sooner** while they are the active sprite.
- **Gift bonus:** the faster gift timer stacks with holiday gift speed, gene powers, habits, finishes, and combo bonuses. The Play screen shows the active sprite's gift bonus.
- **Climate stays free:** switching between Temperate, Tropical, Arid, Arctic, and Highland costs no coins. The Studio labels it clearly.

## 2.5.0 additions

- **Crossover wave:** 14 new species. The **Fall Guys-inspired** trio is Fall Bean, Crown Bean, and Hurdle Bean; the **Among Us-inspired** trio is Crewmate, Impostor, and Ghostmate; the **pocket monsters** are Voltling, Emberling, Bulblet, and Bubblet; the **brick builders** are Brickling, Minipal, Brick Dragon, and Space Builder.
- Each crossover has its own palette, gene power, Titan name, type egg, habitat list, hybrid pairs, and original vector silhouette.
- The encyclopedia now holds **248 species** and the Spritepedia has **19 guides**, including the new Crossover sprites guide.

## 2.4.0 additions

- **Rarity play payouts:** a completed game with an active **Rare** sprite adds **2,700 coins**, **Epic** adds **4,000**, **Legendary** adds **6,750**, and **Mythic** adds **10,000**. The game result shows the base coins, rarity bonus, and total separately.
- **Normal and special sprites:** Common and Uncommon sprites keep their normal score payouts; special combos, mutations, and shinies earn the normal payout plus the rarity bonus for their species. Existing gene, habit, finish, day/night, and holiday bonuses still stack.
- The Play screen now shows the active sprite's rarity payout and the full rarity table.

## 2.3.0 additions

- **World Kitchen:** 96 new foods from Africa, Asia, the Middle East, Europe, Latin America, North America, the Caribbean, and Oceania, each with its own price, needs effects, category, and diet affinity. The market now carries **264 foods**.
- **World Kitchen guide:** a new Spritepedia guide groups every regional dish by cuisine and links each one to its pantry card. The Spritepedia now has **18 guides**.
- Existing saves keep their pantry and unlocks; the new dishes are ordinary market stock and require no migration.

## 2.2.0 additions

- **Dash Sprite:** the last missing base Fortnite Sprite item joins the encyclopedia as a normal type egg, with the Three Dashes gene, Afterimage Titan, Neon/Aurora/Grove habitats, and its own silhouette.
- **Fortnite Sprite field guide:** the Spritepedia now catalogs all 27 base sprites and all 189 Gold, Gummy, Galaxy, Holofoil, Cube, Quack, and Gem variants. The variants use the existing finish system rather than duplicating 189 species.
- The encyclopedia now holds **234 species**, and the Spritepedia has **17 guides**.

## 2.1.0 additions

- **Fortnite Chapter 7 Season 3:** The Guardian and The Voidblade, two original Runners headliners.
- **Fortnite Chapter 6:** 40 new species covering all six pass groups — Hunters, Lawless, Galactic Battle, Super, Shock ’N Awesome, and The Simpsons — including the Godzilla Evolved, Outlaw Midas, Dino Megazord, and Springfielder Peely bonus outfits. Superman and Killswitch were already in the encyclopedia. Every new entry has a gene, Titan, type egg, habitat, and signature art.
- The encyclopedia now holds **233 species**, and the Spritepedia has **16 guides**, including a linked Fortnite roster guide for all 42 new sprites.

## 2.0.0 additions

- **Candy sprites & sugar:** 8 candy species (Cotton Candy, Lollipop, Gumball, Jellybean, Choco Bunny, Peppermint, Toffee Taffy, Candy Corn) with genes, Titans, type eggs, habitats, hybrids, and signature art. Ten candy-tagged items build Sugar; at 3 the sprite morphs into a random candy species.
- **Holiday species:** 6 Halloween sprites (Scarecrow, Pumpkin Witch, Mummy, Frankenpal, Black Cat, Candy Cauldron) and 6 Christmas sprites (Holiday Elf, Tinsel Reindeer, Gingerbread, Nutcracker, Snowman, Holly), plus 8 themed foods.
- **Holiday events:** 7 real-calendar holidays with coin multipliers, faster gifts, a daily themed treat on the first check-in, and a Today card showing the active event and countdown to the next.
- **Three new games:** Green Toss (6 check-ins), Candy Crunch (14), and Holiday Lights (20), bringing Play to 9 games. A new Spritepedia guide covers candy, holidays, and all 20 seasonal species; the encyclopedia now holds 191 species and the market 108 foods.

## 1.9.0 additions

- Spritepedia refresh: a new **Animal field notes** guide links all 12 animal species, and species files continue to generate from the same live element data.
- The check-in guide now documents the guaranteed daily pantry food and the monthly crate (coins, three pantry items, and one new monthly food).
- The food guide now lists all 265 foods (264 market foods plus the Starpath Feast) and 32 free snacks across all seven categories. The current Anime & Trainer pack adds 60 dishes and 16 snacks.
