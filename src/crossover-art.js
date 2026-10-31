/* Original crossover-inspired silhouettes: beans, crewmates, pocket monsters, and bricks. */

function signatureCrossover(el, c) {
  switch (el) {
    case 'fallbean':
      return `
        <ellipse cx="60" cy="45" rx="22" ry="13" fill="#18243a" opacity=".9" stroke="${c.accent}" stroke-width="1.4"/>
        <ellipse cx="50" cy="42" rx="4" ry="5" fill="${c.light}" opacity=".7"/>
        <path d="M30 58c-10 4-14 13-9 20 7 2 13-4 16-11M90 58c10 4 14 13 9 20-7 2-13-4-16-11" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M34 86c-4 8-2 14 4 14 4 0 6-4 5-9M86 86c4 8 2 14-4 14-4 0-6-4-5-9" fill="${c.accent}" opacity=".8"/>
        <path d="M90 32l2 5 5 1-5 2-2 5-1-5-5-2 5-1Z" fill="${c.accent}" opacity=".85"/>`;
    case 'crownbean':
      return `
        <path d="M38 22 44 5l10 9 6-12 7 12 10-9 6 17Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.3" stroke-linejoin="round"/>
        <circle cx="38" cy="20" r="2.4" fill="${c.light}"/><circle cx="60" cy="8" r="2.4" fill="${c.light}"/><circle cx="82" cy="20" r="2.4" fill="${c.light}"/>
        <ellipse cx="60" cy="48" rx="21" ry="12" fill="#26304d" opacity=".9" stroke="${c.accent}" stroke-width="1.3"/>
        <path d="M39 82c-6 9-3 15 4 15 5 0 7-5 5-11M81 82c6 9 3 15-4 15-5 0-7-5-5-11" fill="${c.accent}" opacity=".75"/>
        <path d="M48 66c4-3 8-4 12-4s8 1 12 4" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".8"/>`;
    case 'hurdlebean':
      return `
        <path d="M34 31c8-5 16-7 26-7s18 2 26 7" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M34 31h52" stroke="${c.light}" stroke-width="2" opacity=".7"/>
        <path d="M44 87c-8 4-11 10-4 13 6 2 11-2 14-7M76 87c8 4 11 10 4 13-6 2-11-2-14-7" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M34 78c-9 1-14 6-12 12 6 1 12-2 15-7" fill="${c.light}" opacity=".7"/>
        <path d="M90 36l14-8M92 44l16 1" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
        <path d="M42 55l12-3M78 55l-12-3" stroke="${c.deep}" stroke-width="2" stroke-linecap="round" opacity=".45"/>`;
    case 'crewmate':
      return `
        <path d="M31 69c-9-2-14 3-12 10 3 4 9 3 13-1Z" fill="${c.accent}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <rect x="79" y="48" width="17" height="31" rx="5" fill="${c.deep}" opacity=".7" stroke="${c.accent}" stroke-width="1.2"/>
        <ellipse cx="61" cy="40" rx="24" ry="14" fill="#17243a" stroke="${c.accent}" stroke-width="1.6"/>
        <path d="M43 37c4-5 30-7 38 1" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".7"/>
        <path d="M40 84c0 9 4 14 10 14M80 84c0 9-4 14-10 14" stroke="${c.deep}" stroke-width="5" stroke-linecap="round"/>
        <path d="M45 67h30" stroke="${c.accent}" stroke-width="2" opacity=".55"/>`;
    case 'impostor':
      return `
        <path d="M27 66c-10-4-16 2-15 10 2 6 10 6 15 1Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <rect x="79" y="46" width="17" height="34" rx="6" fill="${c.deep}" opacity=".8" stroke="${c.accent}" stroke-width="1.2"/>
        <ellipse cx="61" cy="39" rx="24" ry="13" fill="#1b1526" stroke="${c.accent}" stroke-width="1.5"/>
        <path d="M44 42c4-5 30-7 37 0" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".55"/>
        <path d="M42 61l7 8 7-8 7 8 7-8 7 8" fill="none" stroke="${c.accent}" stroke-width="2.3" stroke-linejoin="round"/>
        <path d="M43 85c-2 7 1 12 7 12M77 85c2 7-1 12-7 12" stroke="${c.deep}" stroke-width="4" stroke-linecap="round"/>
        <path d="M88 33l1.4 3.6 3.6 1.4-3.6 1.4L88 43l-1.4-3.6-3.6-1.4 3.6-1.4Z" fill="${c.accent}" opacity=".85"/>`;
    case 'ghostmate':
      return `
        <path d="M38 72c-8 8-10 18-2 24 7 5 14-4 17-12 4 11 12 17 18 11 6-5 1-15-5-22Z" fill="${c.light}" opacity=".4" stroke="${c.accent}" stroke-width="1.2"/>
        <ellipse cx="61" cy="39" rx="23" ry="13" fill="#1d2746" opacity=".8" stroke="${c.accent}" stroke-width="1.5"/>
        <path d="M44 38c5-4 28-6 35 0" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".8"/>
        <path d="M45 68c5-4 10-5 15-5s10 1 15 5" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".6"/>
        <path d="M30 49c-5-2-8 1-7 5 1 3 5 3 8 1M91 49c5-2 8 1 7 5-1 3-5 3-8 1" fill="${c.light}" opacity=".55"/>
        <path d="M95 29l1.2 3.2 3.2 1.2-3.2 1.2L95 38l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>`;
    case 'voltling':
      return `
        <path d="M42 33 35 8l19 15Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M78 33 85 8 66 23Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M40 22 38 13l7 5Z" fill="${c.accent}" opacity=".85"/><path d="M80 22 82 13l-7 5Z" fill="${c.accent}" opacity=".85"/>
        <path d="M91 77l18-8-7 10 10 2-19 10 6-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M36 62c-8 1-12 6-10 12 5 2 9-1 11-5M84 62c8 1 12 6 10 12-5 2-9-1-11-5" fill="${c.accent}" opacity=".6"/>
        <path d="M32 46l2-6 3 5 5-1-3 4M88 46l-2-6-3 5-5-1 3 4" stroke="${c.accent}" stroke-width="1.8" fill="none" stroke-linejoin="round"/>`;
    case 'emberling':
      return `
        <path d="M44 34c-5-10-2-20 5-25 3 8 8 11 12 8 1-6 4-11 8-14 1 12 5 19 3 31Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M50 29c-2-5 0-10 3-14 1 5 4 7 6 5 0-4 2-7 4-9 0 7 2 12 1 18Z" fill="${c.light}" opacity=".55"/>
        <path d="M91 72c12-4 19 2 18 10-6 3-11-1-14-5-1 6-6 9-10 6 0-5 2-9 6-11Z" fill="${c.accent}" opacity=".7" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M37 64c-8 2-11 8-7 13 5 1 9-3 10-8M83 64c8 2 11 8 7 13-5 1-9-3-10-8" fill="${c.accent}" opacity=".45"/>
        <path d="M45 47c3-4 7-6 11-7" stroke="${c.light}" stroke-width="2" fill="none" opacity=".55"/>`;
    case 'bulblet':
      return `
        <path d="M60 30c-2-14 4-24 15-28 4 11-1 20-9 25 12-5 22 0 25 10-11 6-22 4-29-3Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M60 29c8-4 15-11 18-20M76 8c-1 7-5 13-11 17" fill="none" stroke="${c.light}" stroke-width="1.3" opacity=".65"/>
        <path d="M46 36c-5-7-14-8-19-2 4 6 11 8 18 5M74 36c5-7 14-8 19-2-4 6-11 8-18 5" fill="${c.light}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 84c-6 6-4 13 3 15 5 1 7-4 5-10M82 84c6 6 4 13-3 15-5 1-7-4-5-10" fill="${c.accent}" opacity=".55"/>
        <path d="M42 52c5-4 11-6 18-6s13 2 18 6" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".3"/>`;
    case 'bubblet':
      return `
        <path d="M32 54c-9-2-14 3-12 9 5 2 9-1 12-4M88 54c9-2 14 3 12 9-5 2-9-1-12-4" fill="${c.light}" opacity=".6"/>
        <path d="M35 75c-10 2-14 9-8 15 6 3 12-1 16-8M85 75c10 2 14 9 8 15-6 3-12-1-16-8" fill="${c.accent}" opacity=".45"/>
        <path d="M40 54c0-12 8-21 20-21s20 9 20 21c-6-6-12-8-20-8s-14 2-20 8Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M44 51c4-4 9-6 16-6s12 2 16 6" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".65"/>
        <circle cx="33" cy="37" r="5" fill="none" stroke="${c.accent}" stroke-width="1.4" opacity=".8"/><circle cx="26" cy="26" r="3" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity=".6"/><circle cx="90" cy="32" r="2" fill="${c.light}" opacity=".7"/>
        <path d="M24 66l1.2 3.2 3.2 1.2-3.2 1.2L24 75l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>`;
    case 'brickling':
      return `
        <path d="M37 32v-8h10v8M53 32v-8h10v8M69 32v-8h10v8" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <rect x="34" y="30" width="50" height="8" rx="2" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M30 62c-8-4-14 1-13 8 2 5 9 5 14 1M90 62c8-4 14 1 13 8-2 5-9 5-14 1" fill="${c.accent}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 86v8h8v-8M68 86v8h8v-8" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 48h8v8h-8Z" fill="${c.light}" opacity=".45"/><path d="M74 67h7v7h-7Z" fill="${c.light}" opacity=".4"/>
        <circle cx="60" cy="41" r="2.2" fill="${c.light}"/>`;
    case 'minipal':
      return `
        <path d="M40 25c0-9 8-15 20-15s20 6 20 15Z" fill="${c.deep}" opacity=".8"/>
        <path d="M40 25h40" stroke="${c.accent}" stroke-width="4" stroke-linecap="round"/>
        <path d="M40 27c0 10 8 17 20 17s20-7 20-17" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M30 63c-9 0-14 5-12 11 5 3 11 0 14-4M90 63c9 0 14 5 12 11-5 3-11 0-14-4" fill="${c.light}" opacity=".55"/>
        <path d="M44 84v12h9V84M67 84v12h9V84" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M50 40c2-3 6-3 8 0M62 40c2-3 6-3 8 0" stroke="${c.deep}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <path d="M54 48c4 4 8 4 12 0" stroke="${c.deep}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M92 32l1.2 3.2 3.2 1.2-3.2 1.2L92 41l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.accent}" opacity=".8"/>`;
    case 'brickdragon':
      return `
        <path d="M34 40 8 22l10 23-10 6 26 5Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M86 40 112 22l-10 23 10 6-26 5Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M47 33 42 13l13 12M73 33 78 13 65 25" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M40 82c-8 8-6 15 2 16 6 0 8-5 6-11M80 82c8 8 6 15-2 16-6 0-8-5-6-11" fill="${c.accent}" opacity=".6"/>
        <path d="M91 74c12-3 18 4 17 12-6 1-11-2-14-6-1 4-5 7-9 5 1-5 3-9 6-11Z" fill="${c.accent}" opacity=".7"/>
        <path d="M43 52h34M43 60h34" stroke="${c.deep}" stroke-width="1.2" opacity=".3"/>
        <path d="M38 49h8v8h-8ZM74 58h8v8h-8Z" fill="${c.light}" opacity=".35"/>
        <circle cx="60" cy="44" r="2.4" fill="${c.light}"/>`;
    case 'spacebuilder':
      return `
        <circle cx="60" cy="42" r="27" fill="none" stroke="${c.accent}" stroke-width="2.4" opacity=".8"/>
        <path d="M37 42c2-12 10-19 23-19s21 7 23 19" fill="${c.light}" opacity=".18"/>
        <path d="M35 66c-10 3-13 10-7 16 6 2 12-3 15-10M85 66c10 3 13 10 7 16-6 2-12-3-15-10" fill="${c.accent}" opacity=".55"/>
        <path d="M33 59c-10 0-15 5-13 11 5 3 11 0 14-5M87 59c10 0 15 5 13 11-5 3-11 0-14-5" fill="${c.body}" opacity=".7" stroke="${c.deep}" stroke-width="1"/>
        <path d="M92 78v16h8V78M88 84h16" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="60" cy="41" r="3" fill="${c.light}" opacity=".7"/>
        <path d="M25 32l1.2 3.2 3.2 1.2-3.2 1.2L25 41l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>`;
    default:
      return '';
  }
}
