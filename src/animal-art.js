/* Signature silhouettes for the animal wave. */

function signatureAnimal(el, c) {
  switch (el) {
    case 'firefang':
      return `
        <path d="M36 36 31 17l18 10Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M84 36 89 17 71 27Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M40 30l-3-8 8 5Z" fill="${c.light}" opacity=".55"/>
        <path d="M80 30l3-8-8 5Z" fill="${c.light}" opacity=".55"/>
        <path d="M31 64c-8 1-12 6-10 11 5 1 10-2 12-6Z" fill="${c.light}" opacity=".35"/>
        <path d="M89 64c8 1 12 6 10 11-5 1-10-2-12-6Z" fill="${c.light}" opacity=".35"/>
        <path d="M53 74l3 7 3-7M64 74l3 7 3-7" fill="#fffaf0" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M92 28l1.6 4.4 4.4 1.6-4.4 1.6L92 40l-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="${c.accent}" opacity=".9"/>
        <path d="M24 66l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8L21 70l3-1Z" fill="${c.accent}" opacity=".7"/>`;
    case 'tamer':
      return `
        <path d="M33 30h54l-7-8H40Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 22c2-9 8-14 16-14s14 5 16 14Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M35 30h50" stroke="${c.accent}" stroke-width="2"/>
        <path d="M78 9c7-4 13-2 15 4-5-1-9 0-13 4" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M43 79 80 62" stroke="${c.deep}" stroke-width="2.4" stroke-dasharray="3 3" opacity=".55"/>
        <rect x="76" y="72" width="16" height="14" rx="4" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M76 77h16" stroke="${c.deep}" stroke-width="1" opacity=".5"/>
        <circle cx="60" cy="88" r="3.6" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>`;
    case 'falcon':
      return `
        <path d="M30 56c-13 1-20 10-19 23 10-3 19-10 26-19Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M90 56c13 1 20 10 19 23-10-3-19-10-26-19Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M35 63c-7 2-12 7-14 12M85 63c7 2 12 7 14 12" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".55"/>
        <path d="M60 56l13 6-13 7-6-7Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M56 82c2 8 3 14 3 20M64 82c-2 8-3 14-3 20" stroke="${c.deep}" stroke-width="1.4" fill="none" opacity=".5"/>
        <path d="M44 38c4-5 10-8 16-8s12 3 16 8" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    case 'raven':
      return `
        <path d="M30 54c-13 4-19 14-16 27 10-5 18-13 24-23Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M90 54c13 4 19 14 16 27-10-5-18-13-24-23Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M34 66c-7 3-11 8-12 13M86 66c7 3 11 8 12 13" stroke="${c.light}" stroke-width="1.1" fill="none" opacity=".4"/>
        <path d="M60 55l12 5-12 8-7-8Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M50 30c4-4 8-6 10-6s6 2 10 6" stroke="${c.deep}" stroke-width="1.4" fill="none" opacity=".55"/>
        <circle cx="95" cy="26" r="8" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity=".6"/>
        <path d="M91 26a4 4 0 1 1 5 4 3 3 0 0 0-5-4Z" fill="${c.accent}" opacity=".7"/>`;
    case 'moth':
      return `
        <path d="M49 31c-6-9-12-14-19-16 1 8 6 15 14 21" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width="1"/>
        <path d="M71 31c6-9 12-14 19-16-1 8-6 15-14 21" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width="1"/>
        <path d="M29 50c-12-2-20 6-18 19 10 1 19-5 24-13Z" fill="${c.body}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M91 50c12-2 20 6 18 19-10 1-19-5-24-13Z" fill="${c.body}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="31" cy="60" r="4" fill="${c.accent}" opacity=".8"/>
        <circle cx="89" cy="60" r="4" fill="${c.accent}" opacity=".8"/>
        <path d="M56 34c-4-7-8-11-13-13M64 34c4-7 8-11 13-13" stroke="${c.deep}" stroke-width="1.4" fill="none" opacity=".6"/>
        <circle cx="60" cy="34" r="2.4" fill="${c.accent}"/>`;
    case 'dragonfly':
      return `
        <ellipse cx="34" cy="46" rx="18" ry="6" transform="rotate(-24 34 46)" fill="${c.light}" opacity=".45" stroke="${c.deep}" stroke-width=".9"/>
        <ellipse cx="86" cy="46" rx="18" ry="6" transform="rotate(24 86 46)" fill="${c.light}" opacity=".45" stroke="${c.deep}" stroke-width=".9"/>
        <ellipse cx="36" cy="62" rx="16" ry="5" transform="rotate(18 36 62)" fill="${c.light}" opacity=".38" stroke="${c.deep}" stroke-width=".9"/>
        <ellipse cx="84" cy="62" rx="16" ry="5" transform="rotate(-18 84 62)" fill="${c.light}" opacity=".38" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M60 88v22M55 96h10M56 104h8" stroke="${c.deep}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>
        <circle cx="47" cy="51" r="5" fill="${c.accent}" opacity=".45" stroke="${c.deep}" stroke-width=".8"/>
        <circle cx="73" cy="51" r="5" fill="${c.accent}" opacity=".45" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M52 30c-5-6-7-11-6-16M68 30c5-6 7-11 6-16" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".55"/>`;
    case 'firefly':
      return `
        <circle cx="60" cy="94" r="11" fill="${c.accent}" opacity=".35"/>
        <circle cx="60" cy="94" r="6" fill="${c.accent}" opacity=".8"/>
        <ellipse cx="35" cy="60" rx="16" ry="7" transform="rotate(-26 35 60)" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width=".9"/>
        <ellipse cx="85" cy="60" rx="16" ry="7" transform="rotate(26 85 60)" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M52 32c-4-7-7-12-13-16M68 32c4-7 7-12 13-16" stroke="${c.deep}" stroke-width="1.3" fill="none" opacity=".6"/>
        <circle cx="39" cy="16" r="2.2" fill="${c.accent}"/><circle cx="81" cy="16" r="2.2" fill="${c.accent}"/>
        <path d="M92 32l1.4 3.8 3.8 1.4-3.8 1.4L92 43l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.accent}" opacity=".8"/>
        <path d="M24 78l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1Z" fill="${c.accent}" opacity=".65"/>`;
    case 'fox':
      return `
        <path d="M38 35 33 16l17 10Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M82 35 87 16 70 26Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M42 29l-2-7 7 5Z" fill="${c.light}" opacity=".6"/>
        <path d="M78 29l2-7-7 5Z" fill="${c.light}" opacity=".6"/>
        <path d="M28 62c-9-2-15 4-14 13 8 0 14-4 18-9Z" fill="${c.light}" opacity=".45"/>
        <path d="M92 62c9-2 15 4 14 13-8 0-14-4-18-9Z" fill="${c.light}" opacity=".45"/>
        <path d="M48 70c4 4 8 6 12 6s8-2 12-6" stroke="${c.light}" stroke-width="2" fill="none" opacity=".55"/>
        <path d="M92 84c10 2 15 10 12 18-7 0-12-5-14-11 3 2 4 1 3-2-2 1-3 0-1-5Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M98 96c3 0 5 2 5 5" stroke="${c.light}" stroke-width="2" fill="none" opacity=".65"/>`;
    case 'otter':
      return `
        <circle cx="43" cy="33" r="6" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="77" cy="33" r="6" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="43" cy="33" r="2.4" fill="${c.light}" opacity=".6"/>
        <circle cx="77" cy="33" r="2.4" fill="${c.light}" opacity=".6"/>
        <path d="M40 62c-7 0-11 3-11 6M40 67c-7 0-11 2-11 5M80 62c7 0 11 3 11 6M80 67c7 0 11 2 11 5" stroke="${c.light}" stroke-width="1" fill="none" opacity=".65"/>
        <path d="M92 78c10-2 17 3 16 11-3 5-9 3-10-2-2 4-6 2-6-2 0-3 1-5 0-7Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M26 94q34 10 68 0M31 101q29 8 58 0" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".45"/>
        <path d="M58 74c2 3 4 3 6 0" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".5"/>`;
    case 'badger':
      return `
        <path d="M52 31c0 12 3 22 8 30 5-8 8-18 8-30Z" fill="${c.light}" opacity=".85"/>
        <path d="M47 34c-4-4-9-5-13-2 2 6 7 9 13 9M73 34c4-4 9-5 13-2-2 6-7 9-13 9" fill="${c.light}" opacity=".5"/>
        <path d="M30 78c-4 3-5 7-3 10 4 0 7-2 8-5M90 78c4 3 5 7 3 10-4 0-7-2-8-5" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M27 88l-5 2M30 92l-5 2M93 88l5 2M90 92l5 2" stroke="${c.light}" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>
        <path d="M34 96q26 8 52 0" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".35"/>
        <circle cx="58" cy="55" r="2.2" fill="${c.deep}" opacity=".45"/>`;
    case 'hare':
      return `
        <path d="M47 36C43 24 44 12 49 7c6 6 8 18 6 30Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M73 36c4-12 3-24-2-29-6 6-8 18-6 30Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M49 31c-2-9-2-15 0-19 3 4 4 11 3 18M71 31c2-9 2-15 0-19-3 4-4 11-3 18" fill="${c.accent}" opacity=".4"/>
        <path d="M88 58c5-2 9 1 9 5s-4 6-7 4c-2 2-6 1-6-2 0-2 2-3 4-3-2-1-3-2 0-4Z" fill="${c.accent}" opacity=".75"/>
        <path d="M91 64c3 2 5 5 5 8" stroke="${c.deep}" stroke-width="1" fill="none" opacity=".5"/>
        <path d="M36 88c4 6 10 10 18 12M84 88c-4 6-10 10-18 12" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".5"/>
        <path d="M60 92v10" stroke="${c.deep}" stroke-width="1.3" opacity=".4"/>`;
    case 'elk':
      return `
        <path d="M48 32c-4-10-10-17-16-20 1 7 4 12 8 16-6-2-10-6-13-11 1 9 6 16 13 21" stroke="${c.deep}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M72 32c4-10 10-17 16-20-1 7-4 12-8 16 6-2 10-6 13-11-1 9-6 16-13 21" stroke="${c.deep}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M42 24l-3-7M78 24l3-7" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>
        <path d="M60 10l2.4 6.6 6.6 2.4-6.6 2.4L60 28l-2.4-6.6L51 19l6.6-2.4Z" fill="${c.light}" opacity=".8"/>
        <path d="M28 64c-7 2-10 7-8 12 5 0 9-3 11-7Z" fill="${c.light}" opacity=".35"/>
        <path d="M92 64c7 2 10 7 8 12-5 0-9-3-11-7Z" fill="${c.light}" opacity=".35"/>
        <circle cx="30" cy="42" r="1.6" fill="${c.accent}" opacity=".8"/><circle cx="90" cy="36" r="1.4" fill="${c.accent}" opacity=".7"/>
        <path d="M44 86q16 6 32 0" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".55"/>`;
    default:
      return '';
  }
}
