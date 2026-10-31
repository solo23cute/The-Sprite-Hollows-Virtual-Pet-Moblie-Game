/* Signature silhouettes for candy, Halloween, and Christmas species. */

function signatureSeasonal(el, c) {
  switch (el) {
    case 'cottoncandy':
      return `
        <circle cx="32" cy="52" r="14" fill="${c.light}" opacity=".55"/>
        <circle cx="88" cy="52" r="14" fill="${c.light}" opacity=".55"/>
        <circle cx="40" cy="38" r="10" fill="${c.light}" opacity=".4"/>
        <circle cx="80" cy="38" r="10" fill="${c.light}" opacity=".4"/>
        <path d="M44 66c8-8 24-8 32 0" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".7"/>
        <path d="M92 30l1.6 4.4 4.4 1.6-4.4 1.6L92 42l-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="${c.accent}" opacity=".8"/>`;
    case 'lollipop':
      return `
        <path d="M88 46v46" stroke="${c.light}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="88" cy="34" r="18" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M88 20a14 14 0 0 1 0 28 10 10 0 0 1 0-20 6 6 0 0 0 0 12" fill="none" stroke="${c.light}" stroke-width="2.2" opacity=".8"/>
        <path d="M30 80c-8-2-12 3-10 8 4-1 7 1 7 5 2-3 5-3 7-1 1-4 1-8-4-12Z" fill="${c.accent}" opacity=".6"/>`;
    case 'gumball':
      return `
        <circle cx="35" cy="38" r="5" fill="${c.accent}" opacity=".75"/>
        <circle cx="87" cy="42" r="4" fill="${c.light}" opacity=".8"/>
        <circle cx="82" cy="70" r="5" fill="${c.accent}" opacity=".55"/>
        <circle cx="38" cy="72" r="3.6" fill="${c.light}" opacity=".7"/>
        <path d="M44 32a18 18 0 0 1 14-6" stroke="#ffffff" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>
        <path d="M60 94c-5 3-9 8-8 12 6 1 10-2 12-7Z" fill="${c.accent}" opacity=".5"/>`;
    case 'jellybean':
      return `
        <path d="M34 82c-5 7-3 12 3 12 5 0 7-4 6-8M46 84c-4 8-1 14 5 14 5 0 7-5 5-10M78 82c5 7 3 12-3 12-5 0-7-4-6-8" fill="${c.accent}" opacity=".45"/>
        <path d="M86 30l1.2 3.2 3.2 1.2-3.2 1.2L86 39l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>
        <circle cx="36" cy="40" r="2.4" fill="${c.light}" opacity=".7"/>
        <path d="M42 34c4-3 9-4 13-3" stroke="#ffffff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>`;
    case 'chocobunny':
      return `
        <path d="M50 36C45 26 45 16 49 11c6 5 9 16 8 27Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M70 36c5-10 5-20 1-25-6 5-9 16-8 27Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M52 32c-2-8-2-14 0-18 3 4 4 11 3 18M68 32c2-8 2-14 0-18-3 4-4 11-3 18" fill="${c.accent}" opacity=".35"/>
        <path d="M60 40l8 3-8 4-8-4Z" fill="${c.accent}" opacity=".8"/>
        <path d="M46 92c3 6 8 9 14 9s11-3 14-9" fill="${c.accent}" opacity=".35"/>`;
    case 'peppermint':
      return `
        <path d="M88 48v14a12 12 0 0 0 24 0V48" fill="none" stroke="${c.body}" stroke-width="7" stroke-linecap="round"/>
        <path d="M90 52v10a10 10 0 0 0 20 0V52" fill="none" stroke="${c.light}" stroke-width="2.4" stroke-dasharray="3 5" opacity=".9"/>
        <path d="M42 34c5-6 13-9 20-9M38 44c7-6 16-9 25-9" stroke="${c.light}" stroke-width="3" fill="none" opacity=".45"/>
        <path d="M30 78l1.4 3.8 3.8 1.4-3.8 1.4L30 88l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.accent}" opacity=".8"/>`;
    case 'toffee':
      return `
        <path d="M32 70c-7-3-12 0-12 5 4-1 7 0 8 4 3-2 6-2 8 0 1-4 0-7-4-9Z" fill="${c.light}" opacity=".7"/>
        <path d="M88 70c7-3 12 0 12 5-4-1-7 0-8 4-3-2-6-2-8 0-1-4 0-7 4-9Z" fill="${c.light}" opacity=".7"/>
        <path d="M44 88c2 6 6 9 16 9s14-3 16-9c-5 3-10 4-16 4s-11-1-16-4Z" fill="${c.accent}" opacity=".5"/>
        <path d="M92 34l1.4 3.8 3.8 1.4-3.8 1.4L92 44l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.accent}" opacity=".8"/>
        <circle cx="34" cy="42" r="2.2" fill="${c.light}" opacity=".7"/>`;
    case 'candycorn':
      return `
        <path d="M92 44l12 30H80Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M84 54h16l4 10H80Z" fill="${c.accent}" opacity=".9"/>
        <path d="M80 64h24l4 10H76Z" fill="${c.light}" opacity=".9"/>
        <path d="M28 36l1.6 4.4 4.4 1.6-4.4 1.6L28 48l-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="${c.accent}" opacity=".8"/>
        <circle cx="36" cy="58" r="2" fill="${c.light}" opacity=".7"/>`;
    case 'scarecrow':
      return `
        <path d="M34 30h52l-6-11H40Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M40 30h40" stroke="${c.accent}" stroke-width="2"/>
        <path d="M46 19h28M50 11h20" stroke="${c.accent}" stroke-width="1.4" opacity=".7"/>
        <path d="M26 70l-12 4M28 78l-12 8M94 70l12 4M92 78l12 8" stroke="${c.light}" stroke-width="2" stroke-linecap="round" opacity=".65"/>
        <path d="M50 60l8 8-5 8 7 6" fill="none" stroke="${c.deep}" stroke-width="1.2" opacity=".55"/>
        <path d="M32 92q28 10 56 0" fill="none" stroke="${c.accent}" stroke-width="1.6" opacity=".5"/>`;
    case 'witch':
      return `
        <path d="M42 32 60 4l18 28Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M34 32h52l-6 6H40Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M64 22l2.2 6 6 2.2-6 2.2L64 38l-2.2-5.6-6-2.2 6-2.2Z" fill="${c.accent}"/>
        <path d="M90 58l14 10-10 22" fill="none" stroke="${c.light}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
        <path d="M88 56l8 6M96 72l8 2M90 84l8 6" stroke="${c.accent}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
        <path d="M92 36l1.4 3.8 3.8 1.4-3.8 1.4L92 46l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.light}" opacity=".8"/>`;
    case 'mummy':
      return `
        <path d="M30 42c8-5 18-7 28-6M26 56c12-4 24-4 36 0M30 70c10-4 22-4 32 0M34 84c9-3 18-3 26 0" stroke="${c.light}" stroke-width="4" fill="none" opacity=".7"/>
        <path d="M88 38l12-8-4 14 8 6-14 4" fill="none" stroke="${c.light}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
        <path d="M40 28l-6 8 9 2" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".4"/>
        <circle cx="92" cy="66" r="1.8" fill="${c.accent}" opacity=".7"/>`;
    case 'franken':
      return `
        <rect x="24" y="48" width="8" height="12" rx="3" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <rect x="88" y="48" width="8" height="12" rx="3" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M40 32h40" stroke="${c.deep}" stroke-width="2" opacity=".5"/>
        <path d="M42 36v14M78 36v14M38 60h10M72 60h10M46 84h28" stroke="${c.deep}" stroke-width="1.4" stroke-dasharray="2 3" opacity=".6"/>
        <path d="M48 92c4 3 8 4 12 4s8-1 12-4" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".45"/>
        <circle cx="30" cy="74" r="2" fill="${c.light}" opacity=".6"/>`;
    case 'blackcat':
      return `
        <path d="M38 36 32 16l18 10Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M82 36 88 16 70 26Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M41 30l-3-7 7 4Z" fill="${c.accent}" opacity=".5"/>
        <path d="M79 30l3-7-7 4Z" fill="${c.accent}" opacity=".5"/>
        <path d="M92 74c10 2 14 10 10 18-6-1-9-6-10-11-2 4-5 4-6 1 0-3 3-5 6-8Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="96" cy="28" r="8" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".55"/>
        <path d="M92 28a4 4 0 1 1 5 3 3 3 0 0 0-5-3Z" fill="${c.accent}" opacity=".65"/>
        <circle cx="34" cy="60" r="1.8" fill="${c.light}" opacity=".7"/>`;
    case 'cauldron':
      return `
        <ellipse cx="60" cy="88" rx="32" ry="10" fill="${c.deep}" opacity=".4"/>
        <path d="M28 74h64l-6 18c-2 5-8 7-26 7s-24-2-26-7Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M24 70h72" stroke="${c.accent}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="44" cy="62" r="5" fill="${c.light}" opacity=".55"/>
        <circle cx="62" cy="54" r="7" fill="${c.light}" opacity=".45"/>
        <circle cx="78" cy="60" r="4" fill="${c.light}" opacity=".6"/>
        <path d="M92 44l1.4 3.8 3.8 1.4-3.8 1.4L92 54l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.accent}" opacity=".85"/>`;
    case 'elf':
      return `
        <path d="M44 32 60 6l16 26Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M32 32h56l-6-7H38Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="76" cy="9" r="4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M40 84c4 6 10 9 20 9s16-3 20-9" fill="${c.body}" opacity=".5"/>
        <path d="M34 38l8 8M86 38l-8 8" stroke="${c.light}" stroke-width="2" opacity=".6"/>
        <path d="M92 58l1.4 3.8 3.8 1.4-3.8 1.4L92 68l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.light}" opacity=".8"/>`;
    case 'reindeer':
      return `
        <path d="M48 32C43 22 37 16 30 13c1 8 5 14 11 18-7-1-12-5-15-11 2 10 8 18 17 22" fill="none" stroke="${c.deep}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M72 32c5-10 11-16 18-19-1 8-5 14-11 18 7-1 12-5 15-11-2 10-8 18-17 22" fill="none" stroke="${c.deep}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M44 23l-4-7M76 23l4-7" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="60" cy="62" r="5" fill="#ff5a6b" opacity=".9"/>
        <path d="M60 67v5" stroke="${c.deep}" stroke-width="1.4" opacity=".45"/>
        <circle cx="94" cy="34" r="2" fill="${c.light}" opacity=".7"/>`;
    case 'gingerbread':
      return `
        <path d="M40 34c4-3 9-5 20-5s16 2 20 5" stroke="${c.light}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M42 44c5 5 11 7 18 7s13-2 18-7M46 56h28" stroke="${c.light}" stroke-width="2" fill="none" opacity=".8"/>
        <circle cx="46" cy="70" r="3" fill="${c.accent}"/>
        <circle cx="60" cy="76" r="3" fill="${c.accent}"/>
        <circle cx="74" cy="70" r="3" fill="${c.accent}"/>
        <path d="M30 80c-7 2-10 7-8 12 5 0 9-3 11-7Z" fill="${c.light}" opacity=".35"/>
        <path d="M90 80c7 2 10 7 8 12-5 0-9-3-11-7Z" fill="${c.light}" opacity=".35"/>`;
    case 'nutcracker':
      return `
        <path d="M42 30h36l-4-18H46Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 12h44v6H38Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M40 38h40" stroke="${c.accent}" stroke-width="2"/>
        <path d="M46 78h28M46 86h28" stroke="${c.deep}" stroke-width="1.2" opacity=".45"/>
        <path d="M32 48l-10 6 10 6M88 48l10 6-10 6" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M34 94c8 4 17 5 26 5s18-1 26-5" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".6"/>`;
    case 'snowman':
      return `
        <path d="M40 30h40l-6-8H46Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 22h32v-9H44Z" fill="${c.deep}" opacity=".85"/>
        <path d="M38 34h44" stroke="${c.accent}" stroke-width="2"/>
        <path d="M60 46v12" stroke="${c.deep}" stroke-width="1.4" opacity=".35"/>
        <path d="M48 58l-8 6M72 58l8 6" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <path d="M60 62l10 3-10 4Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M34 92c4 4 10 6 16 6M86 92c-4 4-10 6-16 6" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".5"/>`;
    case 'holly':
      return `
        <path d="M60 30c-4-8-2-16 2-20 5 5 6 13 3 20Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 34c-8-4-12-11-11-18 7 1 13 7 15 15Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M76 34c8-4 12-11 11-18-7 1-13 7-15 15Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="43" cy="31" r="4" fill="${c.accent}"/>
        <circle cx="77" cy="31" r="4" fill="${c.accent}"/>
        <circle cx="61" cy="26" r="3.4" fill="${c.accent}"/>
        <path d="M30 64c-7 1-10 6-8 11 5 0 9-3 10-7Z" fill="${c.body}" opacity=".5"/>
        <path d="M90 64c7 1 10 6 8 11-5 0-9-3-10-7Z" fill="${c.body}" opacity=".5"/>`;
    default:
      return '';
  }
}
