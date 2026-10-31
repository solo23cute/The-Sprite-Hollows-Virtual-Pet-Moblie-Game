/* Original vector silhouettes for the Fortnite-inspired roster wave. */

function signatureFortnite(el, c) {
  switch (el) {
    case 'guardian':
      return `
        <path d="M42 22 60 10l18 12" fill="${c.light}" opacity=".55" stroke="${c.accent}" stroke-width="1.4"/>
        <path d="M46 20h28l-4-8H50Z" fill="${c.accent}" opacity=".85"/>
        <rect x="36" y="44" width="48" height="7" rx="3.5" fill="${c.deep}" opacity=".55"/>
        <path d="M34 60 24 68v14M86 60l10 8v14" stroke="${c.accent}" stroke-width="3" fill="none" opacity=".7"/>
        <circle cx="60" cy="34" r="3" fill="${c.light}"/>`;
    case 'voidblade':
      return `
        <path d="M34 38c2-18 14-28 26-28s24 10 26 28l-8-4H42Z" fill="${c.deep}" opacity=".7"/>
        <path d="M60 4 50 34h20Z" fill="${c.accent}" opacity=".9"/>
        <path d="M28 54h64" stroke="${c.light}" stroke-width="2" opacity=".5"/>
        <path d="M96 62l16 42-9-4-7 8-5-46Z" fill="${c.body}" opacity=".75" stroke="${c.accent}" stroke-width="1"/>
        <circle cx="60" cy="48" r="3" fill="${c.accent}"/>`;
    case 'dash':
      return `
        <path d="M24 34h22M18 46h20M26 58h14" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
        <path d="M88 24c8-4 14 0 16 6-6 2-12 2-16-1Z" fill="${c.light}" opacity=".7"/>
        <path d="M92 56c8 4 10 10 6 16-6-2-9-7-9-12-3 3-7 2-8-1 2-3 6-4 11-3Z" fill="${c.light}" opacity=".45"/>
        <circle cx="84" cy="42" r="3" fill="${c.light}" opacity=".85"/>`;
    case 'nyanja':
      return `
        <path d="M40 30 34 6l20 14Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M80 30 86 6 66 20Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M42 24 39 14l8 5Z" fill="${c.accent}" opacity=".8"/>
        <path d="M78 24 81 14l-8 5Z" fill="${c.accent}" opacity=".8"/>
        <path d="M90 78c12 0 16 8 12 16-8 0-12-4-14-9-4 5-10 5-13 0 4-4 8-7 15-7Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M32 76c-10 2-14 10-10 17 7 0 11-4 13-9 3 4 7 4 9 0-2-4-6-7-12-8Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>`;
    case 'jade':
      return `
        <path d="M36 28h48l-6-10H42Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M32 28h56" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <path d="M88 66v22M82 76h12M85 82h6" stroke="${c.accent}" stroke-width="1.5" opacity=".8"/>
        <circle cx="92" cy="80" r="2" fill="${c.light}" opacity=".8"/>
        <path d="M40 44c-4 8-2 18 4 26" stroke="${c.light}" stroke-width="2" fill="none" opacity=".5"/>`;
    case 'kendo':
      return `
        <path d="M34 30 60 8l26 22Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M28 30h64" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <path d="M94 52 108 92l-8-3-5 6Z" fill="#b98a5e" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 30c0 10 2 18 6 24M78 30c0 10-2 18-6 24" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".5"/>`;
    case 'shadowbladehope':
      return `
        <path d="M34 34c4-14 14-22 26-22s22 8 26 22l-8 4H42Z" fill="${c.deep}" opacity=".75"/>
        <path d="M40 38h40" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M60 48v18" stroke="${c.light}" stroke-width="2" opacity=".6"/>
        <path d="M96 48l12 10-8 4-10-8" fill="${c.accent}" opacity=".85"/>
        <circle cx="60" cy="28" r="2" fill="${c.light}"/>`;
    case 'daigo':
      return `
        <path d="M38 30c2-12 10-20 22-20s20 8 22 20Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M40 24 28 10l16 2 6 12M80 24 92 10l-16 2-6 12" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M36 36h48" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <path d="M28 62l-8 18M92 62l8 18" stroke="${c.light}" stroke-width="4" opacity=".6"/>
        <circle cx="60" cy="27" r="2.5" fill="${c.light}"/>`;
    case 'herobaymax':
      return `
        <path d="M38 34c0-12 10-21 22-21s22 9 22 21Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M42 34h36" stroke="${c.deep}" stroke-width="2" opacity=".6"/>
        <circle cx="60" cy="18" r="3" fill="${c.accent}" opacity=".8"/>
        <path d="M50 74c4-7 16-7 20 0" stroke="${c.accent}" stroke-width="3" fill="none"/>
        <path d="M24 58c-6 4-7 12-2 18M96 58c6 4 7 12 2 18" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".5"/>`;
    case 'nightrose':
      return `
        <path d="M60 6c-4 8-14 10-14 18 0 6 6 8 6 14-4-2-8-6-8-12 0-8 8-10 10-18 2 8 10 10 10 18 0 6-4 10-8 12 0-6 6-8 6-14 0-8-10-10-14-18Z" fill="${c.accent}" opacity=".85"/>
        <path d="M36 50c8-6 16-8 24-8s16 2 24 8" stroke="${c.light}" stroke-width="2.4" fill="none" opacity=".7"/>
        <path d="M40 62l-6 8 8-2M80 62l6 8-8-2" stroke="${c.accent}" stroke-width="1.5" fill="none"/>
        <circle cx="60" cy="26" r="2.4" fill="${c.light}"/>`;
    case 'godzilla':
      return `
        <path d="M38 36 30 18l12 6 4-12 6 10 8-14 6 14 8-10 4 12 12-6-8 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 60c4 8 10 12 18 12s14-4 18-12" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".6"/>
        <path d="M36 88c8 4 16 5 24 5s16-1 24-5" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".45"/>
        <circle cx="60" cy="48" r="2.6" fill="${c.light}"/>`;
    case 'cassidy':
      return `
        <path d="M34 28c8-4 18-6 26-6s18 2 26 6" fill="${c.deep}" opacity=".8"/>
        <path d="M24 28h72" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M50 14h20l-3-8H53Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <rect x="84" y="30" width="14" height="20" rx="2" fill="${c.light}" transform="rotate(12 84 30)" stroke="${c.deep}" stroke-width="1"/>
        <path d="M90 36l2 5 5 1-5 2-2 5-1-5-5-2 5-1Z" fill="${c.accent}" opacity=".8"/>`;
    case 'joss':
      return `
        <path d="M40 24c0-8 8-14 20-14s20 6 20 14" fill="${c.deep}" opacity=".7"/>
        <path d="M40 24h40" stroke="${c.accent}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M92 44c8 2 12 8 10 14" stroke="${c.light}" stroke-width="2" fill="none" opacity=".7"/>
        <path d="M86 58l-10 6 6 4" stroke="${c.accent}" stroke-width="2" fill="none"/>
        <path d="M34 84c8 3 16 5 26 5" stroke="${c.accent}" stroke-width="2" opacity=".55"/>`;
    case 'fletcher':
      return `
        <path d="M34 28c8-6 18-9 26-9s18 3 26 9" fill="${c.deep}" opacity=".85"/>
        <path d="M28 28h64" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M50 12h20l-3-8H53Z" fill="${c.deep}"/>
        <path d="M88 54c8 0 12 4 14 10-6 2-10-1-12-4Z" fill="${c.light}" opacity=".4"/>
        <path d="M40 66 30 92M80 66l10 26" stroke="${c.accent}" stroke-width="2" opacity=".5"/>`;
    case 'valentina':
      return `
        <path d="M28 26c10-5 21-7 32-7s22 2 32 7" fill="${c.deep}" opacity=".8"/>
        <path d="M18 26h84" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M96 44 108 88M96 44c8 2 12 8 12 15" stroke="${c.light}" stroke-width="2" fill="none" opacity=".75"/>
        <circle cx="60" cy="20" r="2.5" fill="${c.light}"/>
        <path d="M44 60c6-4 12-5 16-5s10 1 16 5" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".55"/>`;
    case 'bigdill':
      return `
        <path d="M40 28c0-12 8-20 20-20s20 8 20 20" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M44 16c2-6 6-10 10-12M60 6v10M76 16c-2-6-6-10-10-12" stroke="${c.light}" stroke-width="2" opacity=".7"/>
        <path d="M84 58 96 50v18l-12-4Z" fill="${c.accent}" opacity=".85"/>
        <path d="M96 50c4 2 5 6 3 10" stroke="${c.deep}" stroke-width="1.4" fill="none"/>
        <path d="M38 82c8 5 16 7 24 7" stroke="${c.accent}" stroke-width="2" opacity=".6"/>`;
    case 'keisha':
      return `
        <path d="M38 30c4-12 12-20 22-20s18 8 22 20" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 30h36" stroke="${c.light}" stroke-width="2.4" opacity=".8"/>
        <circle cx="92" cy="66" r="12" fill="${c.light}" opacity=".45" stroke="${c.accent}" stroke-width="2"/>
        <path d="M86 66h12" stroke="${c.accent}" stroke-width="2"/>
        <path d="M30 82c8 2 16 4 24 7" stroke="${c.accent}" stroke-width="2.4" opacity=".7"/>`;
    case 'subzero':
      return `
        <path d="M36 32c4-14 12-22 24-22s20 8 24 22Z" fill="${c.deep}" opacity=".8"/>
        <path d="M40 34h40" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M86 44v16M78 52h16M81 47l10 10M91 47 81 57" stroke="${c.light}" stroke-width="1.5" opacity=".8"/>
        <path d="M28 68c-4 8-2 16 4 22M92 68c4 8 2 16-4 22" stroke="${c.light}" stroke-width="2" fill="none" opacity=".45"/>
        <circle cx="60" cy="50" r="2.4" fill="${c.accent}"/>`;
    case 'midas':
      return `
        <path d="M36 26 44 8l8 10 8-14 8 14 8-10 8 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="90" cy="50" r="10" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M86 50h8M90 46v8" stroke="${c.deep}" stroke-width="1.5"/>
        <path d="M32 70c8 6 18 9 28 9s20-3 28-9" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".5"/>`;
    case 'evie':
      return `
        <path d="M32 36c4-16 14-24 28-24s24 8 28 24l-10-4H42Z" fill="${c.deep}" opacity=".85"/>
        <path d="M60 6 52 34h16Z" fill="${c.accent}" opacity=".8"/>
        <path d="M96 46 108 58 96 70 84 58Z" fill="${c.accent}" opacity=".55"/>
        <path d="M96 50v16" stroke="${c.light}" stroke-width="2" opacity=".8"/>
        <circle cx="60" cy="40" r="2.2" fill="${c.light}"/>`;
    case 'poe':
      return `
        <path d="M36 32c2-12 10-20 24-20s22 8 24 20Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M40 32h40" stroke="${c.deep}" stroke-width="2" opacity=".55"/>
        <path d="M90 48c8-8 16-10 20-6-6 6-12 10-20 12Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M30 76 14 88M34 84 22 98" stroke="${c.accent}" stroke-width="3" opacity=".6"/>
        <circle cx="60" cy="22" r="2.2" fill="${c.accent}"/>`;
    case 'wookiee':
      return `
        <path d="M36 30c-4-10 0-18 8-20 2 6 6 9 10 10M84 30c4-10 0-18-8-20-2 6-6 9-10 10" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M38 58h44M44 64h32" stroke="${c.accent}" stroke-width="3" opacity=".8"/>
        <circle cx="46" cy="72" r="2" fill="${c.accent}"/><circle cx="60" cy="74" r="2" fill="${c.accent}"/><circle cx="74" cy="72" r="2" fill="${c.accent}"/>
        <path d="M30 86c8 4 16 6 30 6s22-2 30-6" stroke="${c.deep}" stroke-width="2" opacity=".4"/>`;
    case 'palpatine':
      return `
        <path d="M28 40c2-22 16-34 32-34s30 12 32 34l-12-6H40Z" fill="${c.deep}" opacity=".9"/>
        <path d="M38 52c-6 10-8 22-4 34M82 52c6 10 8 22 4 34" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".7"/>
        <path d="M92 24 84 40l10-2 4 8 4-8 10 2-8-16" stroke="${c.accent}" stroke-width="1.5" fill="none" opacity=".8"/>
        <circle cx="60" cy="38" r="2.2" fill="${c.accent}"/>`;
    case 'grievous':
      return `
        <path d="M34 34c4-16 12-24 26-24s22 8 26 24l-10 4H44Z" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 38h36" stroke="${c.accent}" stroke-width="2.2"/>
        <path d="M32 58 18 48M32 66 18 66M32 74 18 84M88 58l14-10M88 66h14M88 74l14 10" stroke="${c.light}" stroke-width="2" opacity=".7"/>
        <path d="M50 48l4 6M70 48l-4 6" stroke="${c.deep}" stroke-width="1.4" opacity=".6"/>`;
    case 'robin':
      return `
        <path d="M34 34c4-14 14-22 26-22s22 8 26 22l-8 6H42Z" fill="${c.deep}" opacity=".75"/>
        <path d="M40 36h18v10H40Z" fill="${c.accent}" opacity=".85"/>
        <path d="M84 44c10 0 16 6 16 16-8 0-14-4-16-10Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M30 70c-8 8-10 16-8 24 8-4 14-10 16-18" fill="${c.accent}" opacity=".6"/>
        <circle cx="60" cy="26" r="2" fill="${c.light}"/>`;
    case 'haylee':
      return `
        <path d="M36 32c4-14 12-22 24-22s20 8 24 22l-10 2H46Z" fill="${c.deep}" opacity=".75"/>
        <path d="M84 26l8-12 4 14 10 2-10 6 4 12-12-6-8 8 2-14Z" fill="${c.accent}" opacity=".85"/>
        <path d="M30 64c-8 10-8 22 0 30M90 64c8 10 8 22 0 30" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".65"/>
        <circle cx="60" cy="42" r="2.4" fill="${c.light}"/>`;
    case 'ziggy':
      return `
        <path d="M40 38c-6-10-4-22 6-28 4 8 10 12 18 12s14-4 18-12c10 6 12 18 6 28" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="40" cy="22" r="9" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="82" cy="22" r="5" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="30" cy="60" r="3" fill="${c.accent}" opacity=".8"/><circle cx="90" cy="66" r="2.4" fill="${c.light}" opacity=".8"/><circle cx="82" cy="82" r="3" fill="${c.accent}" opacity=".6"/>`;
    case 'synthwave':
      return `
        <path d="M34 34c4-14 12-22 26-22s22 8 26 22Z" fill="${c.deep}" opacity=".8"/>
        <path d="M38 34h44" stroke="${c.accent}" stroke-width="4" stroke-linecap="round"/>
        <path d="M84 56v18M90 50v28M96 58v14M102 54v20" stroke="${c.accent}" stroke-width="2" opacity=".8"/>
        <path d="M30 72h60" stroke="${c.light}" stroke-width="1.4" opacity=".4"/>
        <circle cx="60" cy="46" r="2.4" fill="${c.light}"/>`;
    case 'lightrider':
      return `
        <path d="M34 34c4-14 12-22 26-22s22 8 26 22Z" fill="${c.light}" opacity=".6" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 34h44" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M28 58 8 52M28 68H6M28 78 8 84" stroke="${c.accent}" stroke-width="2.4" opacity=".7"/>
        <path d="M92 44l10-6M94 54h12" stroke="${c.accent}" stroke-width="2" opacity=".6"/>
        <circle cx="60" cy="50" r="2.4" fill="${c.accent}"/>`;
    case 'morganmyst':
      return `
        <path d="M34 36c4-16 14-24 26-24s22 8 26 24l-8 4H42Z" fill="${c.deep}" opacity=".8"/>
        <path d="M96 44v48" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="96" cy="40" r="9" fill="${c.light}" opacity=".7" stroke="${c.accent}" stroke-width="1.5"/>
        <path d="M30 60l-6 8 6 8 6-8Z" fill="${c.accent}" opacity=".55"/>
        <circle cx="60" cy="40" r="2.2" fill="${c.light}"/>`;
    case 'spartan':
      return `
        <path d="M36 32c4-16 12-24 24-24s20 8 24 24Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M40 34h40" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M28 60 18 78v12M92 60l10 18v12" stroke="${c.deep}" stroke-width="4" opacity=".6"/>
        <path d="M84 20l6 6M78 14l4 4" stroke="${c.light}" stroke-width="1.4" opacity=".5"/>`;
    case 'yoomi':
      return `
        <path d="M38 34c2-14 10-22 22-22s20 8 22 22Z" fill="${c.light}" opacity=".6" stroke="${c.deep}" stroke-width="1"/>
        <path d="M34 30h16M70 30h16" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M92 40l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="${c.accent}"/>
        <path d="M88 68c8 0 14 4 16 10" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".6"/>
        <circle cx="60" cy="48" r="2.2" fill="${c.accent}"/>`;
    case 'agentpatch':
      return `
        <path d="M36 30c4-12 12-18 24-18s20 6 24 18Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M34 30h52" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <rect x="72" y="50" width="18" height="14" rx="2" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M76 54h10M76 58h7" stroke="${c.accent}" stroke-width="1.2"/>
        <path d="M34 68 22 84M90 68l10 14" stroke="${c.light}" stroke-width="2" opacity=".5"/>`;
    case 'mae':
      return `
        <path d="M38 30c4-12 12-18 22-18s18 6 22 18" fill="${c.deep}" opacity=".8"/>
        <path d="M34 30h14M72 30h14" stroke="${c.accent}" stroke-width="4" stroke-linecap="round"/>
        <path d="M94 38c8 0 12 6 10 12" stroke="${c.accent}" stroke-width="2" fill="none"/>
        <rect x="82" y="62" width="24" height="12" rx="6" fill="${c.light}" opacity=".7" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="88" cy="68" r="2" fill="${c.accent}"/><circle cx="100" cy="68" r="2" fill="${c.accent}"/>`;
    case 'ripp':
      return `
        <path d="M34 32c4-14 12-22 26-22s22 8 26 22Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M40 34h40" stroke="${c.accent}" stroke-width="2.4"/>
        <path d="M80 22l8-10M82 30l12-4" stroke="${c.light}" stroke-width="1.6" opacity=".7"/>
        <path d="M92 58c8-4 14 0 16 8-6 2-12 0-16-4Z" fill="${c.accent}" opacity=".7"/>
        <path d="M30 78c8 4 18 6 30 6" stroke="${c.accent}" stroke-width="2" opacity=".55"/>`;
    case 'onyxwinter':
      return `
        <path d="M34 34c4-16 12-24 26-24s22 8 26 24Z" fill="${c.deep}" opacity=".9"/>
        <path d="M88 36v20M78 46h20M81 39l14 14M95 39 81 53" stroke="${c.light}" stroke-width="1.5" opacity=".8"/>
        <path d="M36 62c8-4 16-5 24-5s16 1 24 5" stroke="${c.light}" stroke-width="2" fill="none" opacity=".5"/>
        <circle cx="60" cy="46" r="2.2" fill="${c.accent}"/>`;
    case 'greenranger':
      return `
        <path d="M36 32c4-16 12-24 24-24s20 8 24 24Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M40 34h40" stroke="${c.accent}" stroke-width="2.4"/>
        <path d="M88 56c8-4 14 0 16 6-6 2-12 0-16-3Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="96" cy="64" r="3" fill="${c.deep}"/>
        <path d="M32 72 20 88M34 82 26 96" stroke="${c.accent}" stroke-width="2" opacity=".6"/>`;
    case 'megazord':
      return `
        <path d="M36 30 60 8l24 22Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M42 30h36" stroke="${c.light}" stroke-width="3"/>
        <rect x="24" y="56" width="10" height="16" fill="#ff6b4a"/><rect x="36" y="56" width="10" height="16" fill="#4f89c9"/>
        <rect x="74" y="56" width="10" height="16" fill="#ffd166"/><rect x="86" y="56" width="10" height="16" fill="#ff8fc8"/>
        <circle cx="60" cy="62" r="4" fill="${c.light}" opacity=".8"/>`;
    case 'marge':
      return `
        <path d="M38 26c0-16 8-24 22-24s22 8 22 24c0 8-4 14-10 16H48c-6-2-10-8-10-16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M44 42c4-6 10-8 16-8s12 2 16 8" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="50" cy="64" r="3" fill="#ff5e6c"/><circle cx="60" cy="68" r="3" fill="#ff5e6c"/><circle cx="70" cy="64" r="3" fill="#ff5e6c"/>
        <path d="M32 78c8 4 18 6 28 6s20-2 28-6" stroke="${c.light}" stroke-width="2" opacity=".7"/>`;
    case 'blinkyfish':
      return `
        <path d="M38 32c8-8 18-10 26-6 6-8 14-10 20-6-2 8-8 12-14 14 6 4 8 10 6 16-8 0-14-4-17-9-7 5-17 4-23-2Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="50" cy="34" r="7" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="50" cy="34" r="2.4" fill="${c.deep}"/>
        <path d="M30 60c-8 2-12 8-10 14 6 0 10-4 12-8" fill="${c.accent}" opacity=".75"/>
        <path d="M78 62c6 4 8 10 6 16" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".7"/>`;
    case 'ned':
      return `
        <path d="M38 30c2-12 10-20 22-20s20 8 22 20Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="46" cy="38" r="7" fill="none" stroke="${c.accent}" stroke-width="2"/>
        <circle cx="74" cy="38" r="7" fill="none" stroke="${c.accent}" stroke-width="2"/>
        <path d="M53 38h14" stroke="${c.accent}" stroke-width="1.4"/>
        <path d="M34 62c6-6 14-8 26-8s20 2 26 8" fill="${c.accent}" opacity=".7"/>
        <path d="M60 64v12" stroke="${c.deep}" stroke-width="1.4" opacity=".5"/>`;
    case 'homer':
      return `
        <path d="M38 32c0-12 8-20 22-20s22 8 22 20Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M42 16c2-6 6-10 9-12M78 16c-2-6-6-10-9-12" stroke="${c.deep}" stroke-width="1.8" fill="none"/>
        <path d="M46 38h8M66 38h8" stroke="${c.deep}" stroke-width="2" opacity=".7"/>
        <path d="M44 66c4-5 10-7 16-7s12 2 16 7" stroke="${c.accent}" stroke-width="2.4" fill="none"/>
        <path d="M30 82c8 4 18 6 30 6s22-2 30-6" stroke="${c.deep}" stroke-width="2" opacity=".4"/>`;
    case 'springfieldpeely':
      return `
        <path d="M48 10c0-8 6-12 12-8 4-4 12 0 12 8-4 0-8 2-12 6-4-4-8-6-12-6Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 26c6-8 30-8 36 0" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".6"/>
        <rect x="76" y="56" width="28" height="20" rx="3" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M80 56v-6h12v6M88 60v12" stroke="${c.accent}" stroke-width="1.6" fill="none"/>
        <path d="M34 78c8 5 18 8 26 8" stroke="${c.accent}" stroke-width="2" opacity=".6"/>`;
  }
  return '';
}
