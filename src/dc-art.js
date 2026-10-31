/* Original vector silhouettes for the DC hero wave. */

const DC_GOLD = '#ffd166';
const DC_RED = '#e8574a';
const DC_GREEN = '#48d38a';
const DC_BLUE = '#5a9eff';
const DC_DARK = '#24202f';
const DC_WHITE = '#f7f5ff';

function signatureDC(el, c) {
  switch (el) {
    case 'wonderwoman':
      return `
        <path d="M29 47 10 97l24-5 8-28M91 47l19 50-24-5-8-28" fill="${DC_RED}" opacity=".82" stroke="${c.deep}" stroke-width="1"/>
        <path d="M45 30 60 21l15 9-5 7-10-4-10 4Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <circle cx="60" cy="28" r="2.2" fill="${DC_RED}"/>
        <path d="M31 61c8 4 18 6 29 6s21-2 29-6" fill="none" stroke="${DC_GOLD}" stroke-width="1.8" opacity=".85"/>
        <path d="M34 57c-5 7-4 16 2 22M86 57c5 7 4 16-2 22" fill="none" stroke="${DC_GOLD}" stroke-width="2" opacity=".9"/>
        <path d="M39 78c-6 6-8 14-3 19 5 4 12 0 13-7" fill="none" stroke="${c.light}" stroke-width="3" stroke-linecap="round" opacity=".8"/>
        <path d="M45 42l6-4M69 38l6 4" stroke="${c.deep}" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>`;
    case 'flash':
      return `
        <path d="M37 34 25 19l20 8Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M83 34 95 19l-20 8Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M33 58c-8 4-11 10-9 16 5 1 10-3 12-8M87 58c8 4 11 10 9 16-5 1-10-3-12-8" fill="${DC_GOLD}" opacity=".8"/>
        <circle cx="60" cy="47" r="9.5" fill="${DC_WHITE}" stroke="${DC_RED}" stroke-width="2"/>
        <path d="M61 39l-6 10h5l-3 8 10-12h-5l4-6Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width=".8" stroke-linejoin="round"/>
        <path d="M103 27l-12 4M105 38l-14 1M102 49l-12-3" stroke="${DC_GOLD}" stroke-width="2" stroke-linecap="round" opacity=".85"/>`;
    case 'greenlantern':
      return `
        <path d="M35 45c3-3 6-4 10-4M65 41c4 0 7 1 10 4" fill="none" stroke="${c.deep}" stroke-width="2" stroke-linecap="round" opacity=".65"/>
        <circle cx="94" cy="54" r="4.5" fill="none" stroke="${DC_GREEN}" stroke-width="2"/>
        <path d="M92 54l4-4M88 61l-6-3M95 62l5 3" stroke="${DC_GREEN}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
        <path d="M50 66h20v8H50Z" fill="${DC_GREEN}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M54 64v-4h12v4M53 74v5h14v-5" fill="none" stroke="${DC_GREEN}" stroke-width="1.5"/>
        <path d="M60 64v17M56 70h8" stroke="${c.light}" stroke-width="1.2" opacity=".65"/>
        <path d="M30 48c-6 15-5 34 7 48M90 48c6 15 5 34-7 48" fill="none" stroke="${DC_GREEN}" stroke-width="1.5" opacity=".35"/>`;
    case 'aquaman':
      return `
        <path d="M43 30 39 14l7 5 5-9 5 9 7-5-4 16Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <circle cx="51" cy="24" r="1.4" fill="${DC_GREEN}"/><circle cx="60" cy="20" r="1.4" fill="${DC_GREEN}"/><circle cx="69" cy="24" r="1.4" fill="${DC_GREEN}"/>
        <path d="M96 24v72M88 36h16M91 30l-7-7M101 30l7-7" stroke="${DC_GOLD}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M90 38c6 1 11 5 14 10" fill="none" stroke="${DC_GOLD}" stroke-width="1.4" opacity=".7"/>
        <path d="M45 76c5-3 10-4 15-4s10 1 15 4M48 81c4-2 8-3 12-3s8 1 12 3" fill="none" stroke="${c.light}" stroke-width="1.6" opacity=".55"/>
        <path d="M31 49c-5 10-4 23 3 32M89 49c5 10 4 23-3 32" fill="none" stroke="${DC_GREEN}" stroke-width="1.6" opacity=".45"/>
        <circle cx="35" cy="57" r="2.5" fill="${DC_GREEN}" opacity=".8"/>`;
    case 'cyborg':
      return `
        <path d="M35 38h20v30H35Z" fill="#9aa0b4" opacity=".82" stroke="${c.deep}" stroke-width="1"/>
        <path d="M78 34h13v18H78Z" fill="#9aa0b4" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="85" cy="43" r="3.2" fill="${DC_RED}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M39 46h12M39 51h8M84 56v12M76 62h8" stroke="${DC_GREEN}" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
        <path d="M30 73c-7 1-10 6-8 11 4 1 8-1 10-5M90 73c7 1 10 6 8 11-4 1-8-1-10-5" fill="${DC_BLUE}" opacity=".7" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M44 78h32" stroke="${c.light}" stroke-width="1.8" opacity=".55"/>
        <path d="M92 30l5-8M96 33l8-3" stroke="${c.accent}" stroke-width="1.7" stroke-linecap="round" opacity=".8"/>`;
    case 'martian':
      return `
        <path d="M34 37c5-9 13-14 26-14s21 5 26 14" fill="none" stroke="${c.deep}" stroke-width="2.4" stroke-linecap="round" opacity=".65"/>
        <path d="M29 59 8 92l24-4 9-21M91 59l21 33-24-4-9-21" fill="${DC_BLUE}" opacity=".6" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 32c-5-7-13-8-18-2 4 6 10 8 16 6M76 32c5-7 13-8 18-2-4 6-10 8-16 6" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M36 84c4 8 8 12 12 14M84 84c-4 8-8 12-12 14" stroke="${DC_GREEN}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
        <path d="M44 48c4-2 8-3 16-3s12 1 16 3" fill="none" stroke="${c.light}" stroke-width="1.7" opacity=".7"/>
        <circle cx="60" cy="27" r="2.2" fill="${DC_RED}" opacity=".9"/>`;
    case 'greenarrow':
      return `
        <path d="M38 33c6-8 14-12 22-12s16 4 22 12l-8 6c-4-4-9-6-14-6s-10 2-14 6Z" fill="${DC_GREEN}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M44 33c5-4 10-6 16-6s11 2 16 6" fill="none" stroke="${DC_WHITE}" stroke-width="1.4" opacity=".75"/>
        <path d="M30 60c-10 12-9 28 4 38M34 67c-4 10-2 20 6 27" fill="none" stroke="${DC_GOLD}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M31 64 99 44M96 40l5 4-6 2" stroke="${c.light}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M91 38l5-6M86 36l2-7" stroke="${DC_GOLD}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M41 46c4-1 8-2 12-2M67 44c4 0 8 1 12 2" fill="none" stroke="${c.deep}" stroke-width="1.8" opacity=".55"/>`;
    case 'blackcanary':
      return `
        <path d="M35 35c-8 4-12 10-13 18 8 1 15-2 19-8M85 35c8 4 12 10 13 18-8 1-15-2-19-8" fill="${DC_GOLD}" opacity=".72" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M38 31c4-6 9-9 14-9s10 3 13 8" fill="none" stroke="${DC_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <path d="M44 49c3-2 6-3 10-3M66 46c4 0 7 1 10 3" fill="none" stroke="${DC_DARK}" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>
        <path d="M34 78c-8-3-12 2-10 9 4 2 9-1 11-5M86 78c8-3 12 2 10 9-4 2-9-1-11-5" fill="${DC_GOLD}" opacity=".7"/>
        <circle cx="60" cy="77" r="4.5" fill="${DC_DARK}" stroke="${DC_GOLD}" stroke-width="1.2"/>
        <path d="M60 82v11M55 93h10" stroke="${DC_GOLD}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M25 63c-4 6-3 13 2 17M95 63c4 6 3 13-2 17" fill="none" stroke="${DC_BLUE}" stroke-width="1.4" opacity=".55"/>`;
    case 'supergirl':
      return `
        <path d="M30 50 9 97l24-4 7-26M90 50l21 47-24-4-7-26" fill="${DC_RED}" opacity=".82" stroke="${c.deep}" stroke-width="1"/>
        <path d="M45 25c5-5 10-7 15-7s10 2 15 7" fill="none" stroke="${DC_GOLD}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M38 56c-4 10-3 20 3 28M82 56c4 10 3 20-3 28" fill="none" stroke="${DC_BLUE}" stroke-width="1.8" opacity=".65"/>
        <path d="M60 67l-7 5 2 9h10l2-9Z" fill="${DC_GOLD}" stroke="${DC_RED}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M57 71h6l-2 3 3 2h-8l3-2Z" fill="${DC_RED}"/>
        <circle cx="60" cy="29" r="2.1" fill="${DC_GOLD}"/>
        <path d="M47 43c4-2 8-3 13-3M66 40c4 0 7 1 10 3" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".55"/>`;
    case 'batgirl':
      return `
        <path d="M40 30 35 13l14 10M80 30l5-17-14 10" fill="${DC_DARK}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M36 36c8-7 16-10 24-10s16 3 24 10" fill="${DC_DARK}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M33 55 12 98l22-4 8-27M87 55l21 43-22-4-8-27" fill="#6b4fa0" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 48c3-3 6-4 9-4M67 44c3 0 6 1 9 4" fill="none" stroke="${DC_GOLD}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
        <path d="M52 68c2-4 4-5 8-5s6 1 8 5c-2 5-4 7-8 7s-6-2-8-7Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M46 79 60 72l14 7" fill="none" stroke="${DC_GOLD}" stroke-width="1.5" opacity=".8"/>
        <circle cx="91" cy="70" r="2.2" fill="${DC_GOLD}" opacity=".8"/>`;
    case 'nightwing':
      return `
        <path d="M38 34c6-4 13-6 22-6s16 2 22 6" fill="none" stroke="${c.deep}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
        <path d="M41 48c4-3 8-4 11-4M68 44c3 0 7 1 11 4" fill="none" stroke="${DC_DARK}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M34 49 12 95l24-5 9-24M86 49l22 46-24-5-9-24" fill="#1a234a" opacity=".88" stroke="${c.deep}" stroke-width="1"/>
        <path d="M40 76 60 64l20 12-20 12Z" fill="${DC_BLUE}" stroke="${c.light}" stroke-width="1.1" opacity=".9"/>
        <path d="M97 38v58M93 43l8-10" stroke="${DC_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <path d="M38 34l-5-12 10 7 6-9 6 9 6-9 10 7-5 12" fill="${DC_DARK}" opacity=".85" stroke="${c.deep}" stroke-width=".9"/>
        <circle cx="91" cy="37" r="1.8" fill="${DC_GOLD}" opacity=".8"/>`;
    case 'shazam':
      return `
        <path d="M32 50 10 97l24-4 8-27M88 50l22 47-24-4-8-27" fill="${DC_RED}" opacity=".84" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 30c6-5 12-7 18-7s12 2 18 7" fill="none" stroke="${DC_GOLD}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M34 35h52l-5 10H39Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width="1" opacity=".9"/>
        <path d="M60 67 47 83h9l-5 15 20-22h-9l8-9Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M47 58h26M45 63h30" stroke="${DC_WHITE}" stroke-width="1.4" opacity=".7"/>
        <circle cx="60" cy="23" r="2" fill="${DC_GOLD}"/>
        <path d="M91 32l4-7M96 37l8-2" stroke="${DC_GOLD}" stroke-width="1.7" stroke-linecap="round" opacity=".8"/>`;
    case 'zatanna':
      return `
        <path d="M39 30c3-12 11-20 21-20s18 8 21 20Z" fill="${DC_DARK}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M34 31h52" stroke="${DC_GOLD}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M92 54v43M86 60l6-8 6 8" stroke="${DC_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <path d="M30 58c-7 8-6 19 3 26M90 58c7 8 6 19-3 26" fill="none" stroke="${c.accent}" stroke-width="1.6" opacity=".55"/>
        <path d="M45 48c4-2 8-3 15-3s11 1 15 3" fill="none" stroke="${DC_WHITE}" stroke-width="2" stroke-linecap="round"/>
        <path d="M56 52h8l-4 5Z" fill="${DC_WHITE}" opacity=".85"/>
        <circle cx="94" cy="38" r="2" fill="${DC_GOLD}"/><circle cx="27" cy="46" r="1.6" fill="${c.light}"/>
        <path d="M36 82c4-3 8-4 12-4M72 78c4 0 8 1 12 4" fill="none" stroke="${DC_GOLD}" stroke-width="1.6" opacity=".8"/>`;
    case 'dcraven':
      return `
        <path d="M38 31c4-12 12-19 22-19s18 7 22 19l-10 3c-2-6-6-9-12-9s-10 3-12 9Z" fill="#3a2a5c" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M31 57 12 96l24-4 8-24M89 57l19 39-24-4-8-24" fill="#6b5b9a" opacity=".62" stroke="${c.deep}" stroke-width="1"/>
        <path d="M49 54c3-2 6-3 11-3s8 1 11 3" fill="none" stroke="${c.light}" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>
        <circle cx="60" cy="43" r="3" fill="${DC_RED}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M87 36c8-4 13 1 11 7-2 5-8 5-12 1" fill="${DC_DARK}" stroke="${c.light}" stroke-width=".8" opacity=".9"/>
        <path d="M91 37l6 2" stroke="${DC_RED}" stroke-width="1.2"/>
        <path d="M40 83c4 5 7 7 10 8M80 83c-4 5-7 7-10 8" stroke="${c.accent}" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`;
    case 'starfire':
      return `
        <path d="M42 33c-6-10-3-20 4-25 3 9 9 11 14 7 1 9 6 13 13 10 4 10-2 18-9 21Z" fill="#ff7a45" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M47 30c-2-5 0-10 3-13 1 5 5 7 8 4 1 5 4 7 8 5 2 5-1 9-5 11Z" fill="${DC_GOLD}" opacity=".7"/>
        <circle cx="91" cy="47" r="4.5" fill="#7affd8" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M31 55c-8 9-7 21 3 29M89 55c8 9 7 21-3 29" fill="none" stroke="#ff7a45" stroke-width="1.8" opacity=".7"/>
        <path d="M45 75l4 2-2 4-4-2Z M71 75l4 2-2 4-4-2Z" fill="${DC_GOLD}"/>
        <path d="M52 37l3-3M68 34l3 3" stroke="${c.light}" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>
        <path d="M91 38l3-6M96 43l7-1" stroke="#7affd8" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>`;
    case 'beastboy':
      return `
        <path d="M39 32 30 15l14 8 6-12 6 12 14-8-9 17" fill="#4fae5a" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M31 58c-7 6-7 16 0 22 6 5 14 1 17-5M89 58c7 6 7 16 0 22-6 5-14 1-17-5" fill="#4fae5a" opacity=".7" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M45 46c3-2 6-3 10-3M65 43c4 0 7 1 10 3" fill="none" stroke="${c.deep}" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>
        <path d="M34 85c-5 8-2 15 5 16 6 1 9-4 7-10M86 85c5 8 2 15-5 16-6 1-9-4-7-10" fill="#4fae5a" opacity=".7"/>
        <path d="M93 76c10-8 17-3 16 5-1 7-9 9-14 4" fill="#4fae5a" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M43 78c5 3 10 4 17 4s12-1 17-4" fill="none" stroke="${c.light}" stroke-width="1.6" opacity=".55"/>
        <path d="M28 77l3-3M32 81l3-1" stroke="${DC_GOLD}" stroke-width="1.3" stroke-linecap="round" opacity=".65"/>`;
    case 'bluebeetle':
      return `
        <path d="M31 53 9 80l24 7 12-23M89 53l22 27-24 7-12-23" fill="${DC_BLUE}" opacity=".64" stroke="${c.deep}" stroke-width="1"/>
        <path d="M35 34c6-5 14-8 25-8s19 3 25 8" fill="none" stroke="${DC_BLUE}" stroke-width="1.8" opacity=".7"/>
        <path d="M40 43c4-3 8-4 12-4M68 39c4 0 8 1 12 4" fill="none" stroke="${c.light}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
        <path d="M49 62h22l-3 20H52Z" fill="${c.light}" opacity=".28" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M55 64v16M65 64v16M49 72h22" stroke="${DC_BLUE}" stroke-width="1.4"/>
        <path d="M95 38l5-10M100 40l8-4M92 33l-2-9" stroke="${DC_BLUE}" stroke-width="1.7" stroke-linecap="round" opacity=".85"/>
        <circle cx="94" cy="76" r="2" fill="${DC_BLUE}" opacity=".8"/>`;
    case 'static':
      return `
        <path d="M33 47c-8 8-6 19 4 25M87 47c8 8 6 19-4 25" fill="none" stroke="${DC_GOLD}" stroke-width="1.8" opacity=".6"/>
        <path d="M60 58l-12 15h9l-5 14 20-21h-9l8-8Z" fill="${DC_GOLD}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <circle cx="94" cy="42" r="8" fill="none" stroke="${c.accent}" stroke-width="1.5"/>
        <path d="M91 42a3 3 0 1 1 4 3 2 2 0 0 0-4-3Z" fill="${c.accent}" opacity=".9"/>
        <path d="M27 35l4 1M25 45l4 3M93 82l4-2" stroke="${c.accent}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M44 30c4-4 8-6 12-6M64 24c5 0 9 2 12 6" fill="none" stroke="${c.light}" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>
        <path d="M35 66l2-3M39 70l3-1" stroke="${DC_GOLD}" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>`;
    case 'constantine':
      return `
        <path d="M34 38c4-8 12-13 26-13s22 5 26 13" fill="#b08a5a" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M32 48 12 98l22-3 9-29M88 48l20 50-22-3-9-29" fill="#8a5a3c" opacity=".86" stroke="${c.deep}" stroke-width="1"/>
        <path d="M53 50h14l-7 8Z" fill="${DC_WHITE}" opacity=".85"/>
        <path d="M60 58v18" stroke="${DC_RED}" stroke-width="2"/>
        <path d="M35 61c-4 8-3 16 2 23M85 61c4 8 3 16-2 23" fill="none" stroke="${DC_GOLD}" stroke-width="1.5" opacity=".55"/>
        <circle cx="92" cy="39" r="6" fill="none" stroke="${DC_GOLD}" stroke-width="1.2"/>
        <path d="M88 39h8M92 35v8" stroke="${DC_GOLD}" stroke-width="1.3" opacity=".85"/>
        <path d="M45 30c4-3 8-4 15-4s11 1 15 4" fill="none" stroke="${DC_DARK}" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>`;
    case 'swampthing':
      return `
        <path d="M39 34c-7-9-7-18-2-23 5 3 8 10 10 19M81 34c7-9 7-18 2-23-5 3-8 10-10 19" fill="#4fae5a" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M31 41c-5-5-13-4-15 2 5 4 11 4 15 0M89 41c5-5 13-4 15 2-5 4-11 4-15 0" fill="#4fae5a" opacity=".8" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M38 54c-8 12-7 31 3 43M82 54c8 12 7 31-3 43" fill="none" stroke="#7a9e3a" stroke-width="1.8" opacity=".7"/>
        <path d="M44 76c4-3 10-4 16-4s12 1 16 4" fill="none" stroke="${c.light}" stroke-width="1.7" opacity=".55"/>
        <path d="M93 55c8-3 13 3 11 9-2 5-8 5-12 1" fill="#4fae5a" stroke="${c.deep}" stroke-width=".9"/>
        <circle cx="94" cy="36" r="2" fill="${DC_GOLD}" opacity=".8"/>
        <path d="M42 33l2-3 2 3M74 33l2-3 2 3" stroke="${c.light}" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>`;
    default:
      return '';
  }
}
