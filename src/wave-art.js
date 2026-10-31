/* Original signature silhouettes for the multiverse wave. */

const WAVE_GOLD = '#ffd166';
const WAVE_RED = '#e8574a';
const WAVE_GREEN = '#8fe07a';
const WAVE_BLUE = '#5a9eff';
const WAVE_DARK = '#241f2f';
const WAVE_WHITE = '#f7f5ff';

function waveStar(cx, cy, r, fill) {
  return `<path d="M0-10 2.9-3.1 10-3.1 4.5 1.5 6.2 9 0 5-6.2 9-4.5 1.5-10-3.1-2.9-3.1Z" transform="translate(${cx} ${cy}) scale(${r / 10})" fill="${fill}"/>`;
}

function waveCape(c, fill) {
  return `<path d="M30 51 11 96l23-4 8-25M90 51l19 45-23-4-8-25" fill="${fill}" opacity=".82" stroke="${c.deep}" stroke-width="1"/>`;
}

function waveWings(c, fill) {
  return `<path d="M31 52C14 38 7 52 15 63c4 6 11 6 16 1M89 52c17-14 24 0 16 11-4 6-11 6-16 1" fill="${fill}" opacity=".62" stroke="${c.deep}" stroke-width="1"/>`;
}

function waveRing(cx, cy, r, color) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1.8" opacity=".8"/>`;
}

function signatureWave(el, c) {
  switch (el) {
    case 'spiderman':
      return `
        <path d="M40 34c-9 6-13 15-12 26M80 34c9 6 13 15 12 26M34 52c5-5 10-8 16-10M86 52c-5-5-10-8-16-10" fill="none" stroke="${WAVE_WHITE}" stroke-width="1.2" opacity=".65"/>
        <path d="M53 71l7-5 7 5M56 76l4-3 4 3" fill="none" stroke="${WAVE_WHITE}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
        <path d="M42 47l6 5M78 47l-6 5M38 57l8 3M82 57l-8 3" stroke="${c.deep}" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>`;
    case 'ironman':
      return `
        <path d="M37 39h46l-5 25H62l-2 10H51l-2-10H42Z" fill="${WAVE_RED}" opacity=".2" stroke="${WAVE_GOLD}" stroke-width="1.2"/>
        <path d="M48 50c-3-8 1-13 7-13s9 5 7 13c-1 5-4 7-7 7s-6-2-7-7Z" fill="${WAVE_WHITE}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M55 45c0 4-2 7-3 8M60 52c0-5 2-8 3-9" stroke="${WAVE_BLUE}" stroke-width="1" opacity=".7"/>
        <path d="M32 54c-8 1-11 7-7 11 4 1 8-1 10-5M88 54c8 1 11 7 7 11-4 1-8-1-10-5" fill="${WAVE_GOLD}" opacity=".7"/>`;
    case 'captainamerica':
      return `
        <circle cx="94" cy="63" r="15" fill="${WAVE_BLUE}" opacity=".85" stroke="${WAVE_WHITE}" stroke-width="1.4"/>
        <circle cx="94" cy="63" r="10" fill="none" stroke="${WAVE_RED}" stroke-width="2"/>
        ${waveStar(94, 63, 5, WAVE_WHITE)}
        ${waveStar(60, 68, 5, WAVE_WHITE)}
        <path d="M34 43c4-3 8-4 12-4M76 39c4 0 8 1 12 4" fill="none" stroke="${WAVE_BLUE}" stroke-width="2" opacity=".6"/>`;
    case 'thor':
      return `
        <path d="M92 44v42M84 53h16M88 48l-5-6M96 48l5-6" stroke="${WAVE_GOLD}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M84 43c3-5 7-7 11-7s8 2 11 7" fill="none" stroke="${WAVE_WHITE}" stroke-width="1.8" opacity=".7"/>
        <path d="M43 26 33 16M77 26l10-10" stroke="${WAVE_GOLD}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M65 47l-9 14h7l-4 10 14-17h-6l5-7Z" fill="${WAVE_GOLD}" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M31 40l4-2M29 49l4 1" stroke="${WAVE_BLUE}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>`;
    case 'hulk':
      return `
        <path d="M31 63c-10 2-14 9-9 15 6 3 12-1 15-7M89 63c10 2 14 9 9 15-6 3-12-1-15-7" fill="${c.deep}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M35 86c-7 8-3 14 4 13 6-1 7-6 5-11M85 86c7 8 3 14-4 13-6-1-7-6-5-11" fill="${c.deep}" opacity=".4"/>
        <path d="M44 32c-4-5-3-11 2-13 5-2 9 2 9 8M76 32c4-5 3-11-2-13-5-2-9 2-9 8" fill="${WAVE_GREEN}" opacity=".7"/>
        <path d="M49 79h22M53 84h14" stroke="${WAVE_WHITE}" stroke-width="1.3" opacity=".55"/>`;
    case 'blackwidow':
      return `
        <path d="M34 39c-7 1-11 8-7 15 3 5 9 4 12-1M86 39c7 1 11 8 7 15-3 5-9 4-12-1" fill="${WAVE_RED}" opacity=".7"/>
        <path d="M46 31c4-5 9-7 14-7s10 2 14 7" fill="none" stroke="${WAVE_RED}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M55 65h10l-5 8Z" fill="${WAVE_RED}" stroke="${c.deep}" stroke-width=".8"/>
        <circle cx="60" cy="55" r="9" fill="none" stroke="${WAVE_RED}" stroke-width="2"/>
        <path d="M38 58c-4 6-4 14 0 20M82 58c4 6 4 14 0 20" fill="none" stroke="${WAVE_BLUE}" stroke-width="1.4" opacity=".5"/>`;
    case 'doctorstrange':
      return `
        <circle cx="60" cy="34" r="15" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.2" opacity=".7"/>
        <circle cx="60" cy="34" r="9" fill="none" stroke="${WAVE_GOLD}" stroke-width="1" stroke-dasharray="2 3" opacity=".8"/>
        <circle cx="94" cy="61" r="8" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.5"/>
        <path d="M91 58l6 6M97 58l-6 6" stroke="${WAVE_GOLD}" stroke-width="1" opacity=".8"/>
        <path d="M31 52C15 57 13 70 24 76c8 4 14-1 15-8M89 52c16 5 18 18 7 24-8 4-14-1-15-8" fill="${WAVE_RED}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M47 76c4-2 8-3 13-3s9 1 13 3" fill="none" stroke="${WAVE_WHITE}" stroke-width="1.4" opacity=".5"/>`;
    case 'blackpanther':
      return `
        <path d="M39 32 32 15l15 9M81 32l7-17-15 9" fill="${c.deep}" stroke="${WAVE_GOLD}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M37 44c7-5 15-8 23-8s16 3 23 8" fill="none" stroke="${c.light}" stroke-width="1.7" opacity=".5"/>
        <path d="M48 68c4-4 8-6 12-6s8 2 12 6" fill="none" stroke="${WAVE_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <path d="M35 83l-6 9M42 86l-4 8M78 86l4 8M85 83l6 9" stroke="${WAVE_GOLD}" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>`;
    case 'scarletwitch':
      return `
        <path d="M45 25c4-6 9-9 15-9s11 3 15 9" fill="none" stroke="${WAVE_RED}" stroke-width="2" stroke-linecap="round"/>
        <path d="M60 16l3 5 5 1-4 4 1 6-5-3-5 3 1-6-4-4 5-1Z" fill="${WAVE_GOLD}" opacity=".85"/>
        <circle cx="29" cy="61" r="8" fill="none" stroke="${WAVE_RED}" stroke-width="1.4" opacity=".7"/>
        <circle cx="91" cy="61" r="8" fill="none" stroke="${WAVE_RED}" stroke-width="1.4" opacity=".7"/>
        <path d="M25 57l4 8M33 57l-4 8M87 57l4 8M95 57l-4 8" stroke="${WAVE_RED}" stroke-width="1.2" opacity=".7"/>
        <path d="M44 79c5-3 10-4 16-4s11 1 16 4" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".5"/>`;
    case 'wolverine':
      return `
        <path d="M32 46h14l-3 6H33Z M74 46h14l1 6H77Z" fill="${WAVE_BLUE}" opacity=".8" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M35 72l-9 12M39 74l-7 12M81 72l9 12M77 74l7 12" stroke="${WAVE_GOLD}" stroke-width="1.2" stroke-linecap="round" opacity=".85"/>
        <path d="M32 39h20M68 39h20" stroke="${WAVE_BLUE}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
        <path d="M52 78l4-3 4 3 4-3 4 3" fill="none" stroke="${c.deep}" stroke-width="1.4" opacity=".55"/>`;
    case 'phoenix':
      return `
        <path d="M37 45C22 30 14 42 23 56c5 8 13 7 17 0M83 45c15-15 23-3 14 11-5 8-13 7-17 0" fill="${WAVE_RED}" opacity=".66" stroke="${WAVE_GOLD}" stroke-width="1"/>
        <path d="M43 31c-3-11 3-18 11-21 0 8 4 12 9 9 1 8 5 11 10 8-1 9-6 14-13 16Z" fill="${WAVE_GOLD}" opacity=".8"/>
        <path d="M91 78c9 4 11 13 5 17-4 2-8-1-8-5 4 0 6-3 3-5Z" fill="${WAVE_GOLD}"/>
        <path d="M47 84c5 4 9 6 13 6s8-2 13-6" fill="none" stroke="${WAVE_RED}" stroke-width="1.5" opacity=".7"/>`;
    case 'griffin':
      return `
        ${waveWings(c, WAVE_GOLD)}
        <path d="M48 30c4-7 9-10 15-10s10 4 12 10l-5 7H53Z" fill="${WAVE_GOLD}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M64 35l7 4-7 3Z" fill="${WAVE_RED}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M91 82c10-2 14 5 11 11-4 0-8-3-10-7-1 4-4 6-8 4 1-4 3-7 7-8Z" fill="${WAVE_GOLD}" opacity=".8"/>
        <path d="M44 40l6-5M50 40l6-5" stroke="${c.deep}" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>`;
    case 'kraken':
      return `
        <path d="M35 50c-10 8-10 20-2 29 6 7 13 2 10-5M43 73c-7 8-5 18 3 21 8 2 10-7 5-13M85 50c10 8 10 20 2 29-6 7-13 2-10-5M77 73c7 8 5 18-3 21-8 2-10-7-5-13" fill="${c.deep}" opacity=".55" stroke="${WAVE_GREEN}" stroke-width="1.1"/>
        <path d="M43 30 50 17l10 9 9-9 7 13Z" fill="${WAVE_GOLD}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="33" cy="66" r="2" fill="${WAVE_GREEN}"/><circle cx="33" cy="73" r="2" fill="${WAVE_GREEN}"/><circle cx="87" cy="66" r="2" fill="${WAVE_GREEN}"/><circle cx="87" cy="73" r="2" fill="${WAVE_GREEN}"/>
        <path d="M53 80c3 5 5 8 7 10M67 80c-3 5-5 8-7 10" stroke="${WAVE_GREEN}" stroke-width="1.3" opacity=".6"/>`;
    case 'pegasus':
      return `
        ${waveWings(c, WAVE_WHITE)}
        <path d="M38 32c4-8 10-12 17-12 5 0 9 2 12 6" fill="${WAVE_GOLD}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M89 35l7-8M91 43l9-4" stroke="${WAVE_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <path d="M34 84c-4 8-1 14 5 14 5 0 7-4 5-9M86 84c4 8 1 14-5 14-5 0-7-4-5-9" fill="${c.light}" opacity=".7"/>
        <path d="M61 24l3 5 5 1-4 4 1 6-5-3-5 3 1-6-4-4 5-1Z" fill="${WAVE_GOLD}" opacity=".9"/>`;
    case 'minotaur':
      return `
        <path d="M43 31C36 19 37 10 43 7c4 5 7 12 8 20M77 31c7-12 6-21 0-24-4 5-7 12-8 20" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M52 54h16M57 61h6" stroke="${WAVE_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="60" cy="45" r="9" fill="none" stroke="${WAVE_GOLD}" stroke-width="2"/>
        <path d="M35 83c9 4 17 6 25 6s16-2 25-6" fill="none" stroke="${WAVE_RED}" stroke-width="1.6" opacity=".55"/>
        <path d="M31 43h-9M31 49h-7M89 43h9M89 49h7" stroke="${WAVE_GOLD}" stroke-width="1.4" opacity=".6"/>`;
    case 'centaur':
      return `
        <path d="M31 78c-8 4-9 12-3 16 5 3 10 0 12-5M45 86c-4 7-1 12 5 12 5 0 6-5 4-9M75 86c4 7 1 12-5 12-5 0-6-5-4-9M89 78c8 4 9 12 3 16-5 3-10 0-12-5" fill="${c.light}" opacity=".65"/>
        <path d="M91 66c10-2 14 5 11 11-4 0-8-3-10-7-1 4-4 6-8 4 1-4 3-7 7-8Z" fill="${c.deep}" opacity=".55"/>
        <path d="M31 90h58" stroke="${WAVE_GREEN}" stroke-width="1.6" opacity=".5"/>
        <path d="M45 31c5-6 10-9 15-9s10 3 15 9" fill="none" stroke="${WAVE_GREEN}" stroke-width="2" opacity=".55"/>`;
    case 'mermaid':
      return `
        <path d="M35 82c10 4 17 8 25 15 8-7 15-11 25-15l-4 13-21 9-21-9Z" fill="${WAVE_GOLD}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M43 28c4-5 9-8 17-8s13 3 17 8l-5 5H48Z" fill="${WAVE_GOLD}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="93" cy="42" r="3" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.4" opacity=".7"/>
        <circle cx="99" cy="34" r="2" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.2" opacity=".55"/>
        <path d="M44 46c4-3 8-4 16-4s12 1 16 4" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.5" opacity=".55"/>`;
    case 'cerberus':
      return `
        <circle cx="29" cy="57" r="13" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <circle cx="91" cy="57" r="13" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M23 48l4-6 4 6M27 49h4M87 48l4-6 4 6M89 49h4" stroke="${c.light}" stroke-width="1.3" opacity=".7"/>
        <path d="M27 72c-3 9 1 14 7 13 5-1 6-5 5-9M93 72c3 9-1 14-7 13-5-1-6-5-5-9" fill="${c.deep}" opacity=".55"/>
        <path d="M44 83c5-3 10-4 16-4s11 1 16 4" fill="none" stroke="${WAVE_RED}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="24" cy="55" r="2" fill="${WAVE_RED}"/><circle cx="34" cy="55" r="2" fill="${WAVE_RED}"/><circle cx="86" cy="55" r="2" fill="${WAVE_RED}"/><circle cx="96" cy="55" r="2" fill="${WAVE_RED}"/>`;
    case 'chimera':
      return `
        <path d="M38 39c-8-13-6-22 1-26 4 6 7 14 8 22M82 39c8-13 6-22-1-26-4 6-7 14-8 22" fill="${WAVE_GOLD}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <path d="M34 34c5-7 12-11 20-12" fill="none" stroke="${c.light}" stroke-width="2" opacity=".55"/>
        <path d="M92 65c11-1 16 6 13 13-4 1-8-2-10-6-2 5-6 7-10 4 1-5 4-8 7-11Z" fill="${WAVE_GREEN}" opacity=".65" stroke="${c.deep}" stroke-width="1"/>
        <path d="M88 75l5-2M93 78l6 1" stroke="${WAVE_RED}" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M45 45c3-2 6-3 10-3M65 42c4 0 7 1 10 3" fill="none" stroke="${c.deep}" stroke-width="1.6" opacity=".55"/>`;
    case 'sphinx':
      return `
        ${waveWings(c, WAVE_GOLD)}
        <path d="M39 31 44 14l16 7 16-7 5 17Z" fill="${WAVE_GOLD}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M54 23h12M56 28h8" stroke="${WAVE_WHITE}" stroke-width="1.3" opacity=".7"/>
        <path d="M41 79c7 3 13 4 19 4s12-1 19-4M44 85h32" fill="none" stroke="${WAVE_BLUE}" stroke-width="1.4" opacity=".55"/>
        <path d="M60 66l4 7-4 4-4-4Z" fill="${WAVE_BLUE}" opacity=".75"/>`;

    case 'goku':
      return `
        <path d="M40 33 30 18l17 7 5-14 9 12 11-7 2 18" fill="${WAVE_DARK}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M31 53c-9 9-9 22 1 31M89 53c9 9 9 22-1 31" fill="none" stroke="${WAVE_GOLD}" stroke-width="2" opacity=".55"/>
        <path d="M45 82h30l-3 7H48Z" fill="${WAVE_BLUE}" opacity=".8" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M91 36l4-8M96 43l8-2" stroke="${WAVE_GOLD}" stroke-width="1.7" stroke-linecap="round" opacity=".8"/>`;
    case 'naruto':
      return `
        <path d="M33 36h54l-3-8H36Z" fill="${WAVE_BLUE}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 33h36" stroke="${WAVE_WHITE}" stroke-width="1.5" opacity=".8"/>
        <path d="M42 52l7 2M42 58l7 2M78 52l-7 2M78 58l-7 2" stroke="${c.deep}" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
        <path d="M76 70c6 0 10 4 10 9-5 0-9-3-12-7" fill="${WAVE_GOLD}" opacity=".7"/>
        <path d="M31 72c5 10 15 16 29 16" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.4" opacity=".5"/>`;
    case 'luffy':
      return `
        <path d="M35 32c4-9 13-15 25-15s21 6 25 15Z" fill="${WAVE_GOLD}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M33 32h54" stroke="${WAVE_RED}" stroke-width="3" stroke-linecap="round"/>
        <path d="M45 64c4-3 8-4 15-4s11 1 15 4" fill="none" stroke="${WAVE_RED}" stroke-width="2" stroke-linecap="round"/>
        <path d="M88 72c7-3 12 1 12 7 0 5-5 8-10 6" fill="${c.light}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M50 42l8 3" stroke="${WAVE_RED}" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>`;
    case 'sailormoon':
      return `
        <circle cx="42" cy="25" r="8" fill="${WAVE_GOLD}" opacity=".85"/><circle cx="78" cy="25" r="8" fill="${WAVE_GOLD}" opacity=".85"/>
        <path d="M45 31 60 22l15 9-5 7-10-4-10 4Z" fill="${WAVE_GOLD}" stroke="${c.deep}" stroke-width="1.1"/>
        <circle cx="60" cy="29" r="2" fill="${WAVE_RED}"/>
        <path d="M92 55v41M86 63l6-8 6 8" stroke="${WAVE_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="87" cy="94" r="5" fill="${WAVE_GOLD}" opacity=".85"/>
        <path d="M32 61c-5 8-4 17 2 23M88 61c5 8 4 17-2 23" fill="none" stroke="${WAVE_BLUE}" stroke-width="1.4" opacity=".6"/>`;
    case 'ichigo':
      return `
        <path d="M40 33 34 17l15 8 6-12 8 10 10-6 2 16" fill="${WAVE_RED}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <path d="M92 33v66M88 39l8-9" stroke="${WAVE_WHITE}" stroke-width="2" stroke-linecap="round"/>
        <path d="M48 42c2-3 5-4 8-4M64 38c4 0 7 1 9 4" fill="none" stroke="${WAVE_DARK}" stroke-width="2" opacity=".6"/>
        <path d="M34 62c-7 1-10 7-7 12 4 1 8-2 10-6M46 80c5 2 9 3 14 3" fill="none" stroke="${WAVE_BLUE}" stroke-width="1.4" opacity=".5"/>`;
    case 'sasuke':
      return `
        <path d="M39 33 31 16l15 8 7-12 7 12 15-8-8 17" fill="${WAVE_DARK}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M42 49c3-2 6-3 10-3M68 46c4 0 7 1 10 3" fill="none" stroke="${WAVE_DARK}" stroke-width="2" opacity=".55"/>
        <circle cx="72" cy="57" r="3.4" fill="${WAVE_RED}" opacity=".8"/><circle cx="72" cy="57" r="1.2" fill="${WAVE_DARK}"/>
        <path d="M91 54v42M87 59l6-7" stroke="${WAVE_WHITE}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M31 55c-5 8-4 18 3 24" fill="none" stroke="${WAVE_BLUE}" stroke-width="1.5" opacity=".55"/>`;
    case 'hinata':
      return `
        <path d="M39 32c5-7 12-11 21-11s16 4 21 11" fill="none" stroke="${WAVE_DARK}" stroke-width="2.2" opacity=".65"/>
        <path d="M35 44c3 12 3 26-1 38M85 44c-3 12-3 26 1 38" fill="none" stroke="${c.light}" stroke-width="1.7" opacity=".55"/>
        <path d="M43 50l-4 4 4 4M77 50l4 4-4 4" stroke="${WAVE_WHITE}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
        <path d="M48 76c4-3 8-4 12-4s8 1 12 4" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.3" opacity=".5"/>
        <circle cx="94" cy="38" r="2" fill="${WAVE_GREEN}" opacity=".8"/>`;
    case 'levi':
      return `
        <path d="M40 37c7-8 14-11 21-11s14 3 21 11l-8 5c-4-4-8-6-13-6s-9 2-13 6Z" fill="${WAVE_DARK}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M51 66h18l-4 10H55Z" fill="${WAVE_WHITE}" opacity=".75" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M32 63 18 73l15 5 9-10M88 63l14 10-15 5-9-10" fill="none" stroke="${WAVE_WHITE}" stroke-width="2" stroke-linecap="round"/>
        <path d="M30 45c-4 7-3 15 2 21M90 45c4 7 3 15-2 21" stroke="${WAVE_GREEN}" stroke-width="1.3" opacity=".55"/>`;
    case 'vegeta':
      return `
        <path d="M40 31 45 16l15 9 15-9 5 15" fill="none" stroke="${WAVE_DARK}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M35 57h50l-3 12H38Z" fill="${WAVE_BLUE}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 63h36M46 69h28" stroke="${WAVE_WHITE}" stroke-width="1.4" opacity=".7"/>
        <path d="M31 46c-5 8-4 18 3 25M89 46c5 8 4 18-3 25" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.6" opacity=".6"/>
        <path d="M92 32l3-7M97 38l8-2" stroke="${WAVE_GOLD}" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>`;
    case 'tanjiro':
      return `
        <path d="M33 57c-7 9-6 21 2 28M87 57c7 9 6 21-2 28" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.8" opacity=".65"/>
        <path d="M37 60h14v8H37ZM51 60h14v8H51ZM65 60h14v8H65Z" fill="${WAVE_GREEN}" opacity=".4"/>
        <path d="M44 35c3-2 7-3 10-3M66 32c4 0 7 1 10 3" fill="none" stroke="${WAVE_RED}" stroke-width="1.6" opacity=".6"/>
        <path d="M92 49l6 4-6 4-6-4Z" fill="${WAVE_GOLD}" opacity=".8"/>
        <path d="M49 45l5 3" stroke="${WAVE_RED}" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>`;

    case 'mickey':
      return `
        <circle cx="36" cy="27" r="14" fill="${WAVE_DARK}" stroke="${WAVE_WHITE}" stroke-width="1.2"/>
        <circle cx="84" cy="27" r="14" fill="${WAVE_DARK}" stroke="${WAVE_WHITE}" stroke-width="1.2"/>
        <path d="M47 82h26M49 87h22" stroke="${WAVE_WHITE}" stroke-width="1.5" opacity=".7"/>
        <circle cx="50" cy="70" r="3" fill="${WAVE_GOLD}" stroke="${c.deep}" stroke-width=".8"/>
        <circle cx="70" cy="70" r="3" fill="${WAVE_GOLD}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M91 67c8-2 13 3 11 9-3 1-7-1-9-4" fill="${WAVE_WHITE}" opacity=".85"/>`;
    case 'bugs':
      return `
        <path d="M40 33c-8-16-2-27 7-25 7 2 9 13 7 24M80 33c8-16 2-27-7-25-7 2-9 13-7 24" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M53 56h14M56 62h8" stroke="${WAVE_WHITE}" stroke-width="2" stroke-linecap="round"/>
        <path d="M91 78c0 10-7 16-17 16 2-7 7-12 15-15" fill="${WAVE_GOLD}" opacity=".85"/>
        <path d="M75 82l5-2M77 87l5-1" stroke="${WAVE_GREEN}" stroke-width="1.4" stroke-linecap="round"/>
        <circle cx="92" cy="40" r="2" fill="${WAVE_GOLD}" opacity=".8"/>`;
    case 'tomcat':
      return `
        <path d="M38 34 30 18l15 8M82 34l8-16-15 8" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M35 52 21 56M35 58 21 62M85 52l14 4M85 58l14 4" stroke="${WAVE_WHITE}" stroke-width="1.3" opacity=".65"/>
        <path d="M92 74c12-4 17 4 13 11-3 5-10 3-12-2" fill="${c.light}" opacity=".7"/>
        <path d="M50 44l5-2M70 42l5 2" stroke="${WAVE_DARK}" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>`;
    case 'jerry':
      return `
        <circle cx="36" cy="34" r="12" fill="${c.light}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="84" cy="34" r="12" fill="${c.light}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M92 76c13-1 18 8 13 15-4 3-9-1-10-6-2 5-7 7-11 3 1-5 4-9 8-12Z" fill="${WAVE_GOLD}" opacity=".8"/>
        <circle cx="94" cy="82" r="1.2" fill="${c.deep}"/><circle cx="99" cy="85" r="1.2" fill="${c.deep}"/>
        <path d="M34 60c-7 4-8 12-2 16" fill="none" stroke="${c.light}" stroke-width="1.5" opacity=".6"/>`;
    case 'spongebob':
      return `
        <path d="M34 40h52v50H34Z" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.5" opacity=".6"/>
        <path d="M43 78c4-4 8-4 12 0l5-4 5 4c4-4 8-4 12 0" fill="none" stroke="${WAVE_RED}" stroke-width="2" stroke-linecap="round"/>
        <path d="M46 92v8M55 92v7M65 92v7M74 92v8" stroke="${WAVE_BLUE}" stroke-width="1.5" stroke-linecap="round" opacity=".65"/>
        <circle cx="43" cy="50" r="2" fill="${WAVE_GOLD}"/><circle cx="77" cy="50" r="2" fill="${WAVE_GOLD}"/><circle cx="60" cy="55" r="1.6" fill="${WAVE_GOLD}"/>
        <path d="M91 33l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="${WAVE_GOLD}" opacity=".8"/>`;
    case 'patrick':
      return `
        <path d="M31 62c-8-5-14 1-11 8 2 5 8 5 12 2M89 62c8-5 14 1 11 8-2 5-8 5-12 2" fill="${WAVE_GREEN}" opacity=".65" stroke="${c.deep}" stroke-width="1"/>
        <path d="M40 83h40l-5 12H45Z" fill="${WAVE_GREEN}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M48 87h24" stroke="${WAVE_GREEN}" stroke-width="1.5" opacity=".8"/>
        <path d="M34 45l1.6 4.4 4.4 1.6-4.4 1.6L34 57l-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="${WAVE_GOLD}" opacity=".8"/>`;
    case 'scooby':
      return `
        <path d="M39 34c-9-6-16-2-14 7 2 7 8 10 14 8M81 34c9-6 16-2 14 7-2 7-8 10-14 8" fill="${c.light}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <path d="M39 78h42" stroke="${WAVE_GREEN}" stroke-width="5" stroke-linecap="round" opacity=".8"/>
        <circle cx="60" cy="78" r="4" fill="${WAVE_GOLD}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M50 55h4M66 55h4M53 61h14" stroke="${c.deep}" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>
        <path d="M90 66c8 1 11 7 9 13-3 1-6-1-8-4" fill="${c.light}" opacity=".65"/>`;
    case 'shaggy':
      return `
        <path d="M40 36c3-7 8-10 20-10s17 3 20 10" fill="${WAVE_GREEN}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M49 47c4-2 7-3 11-3s7 1 11 3" fill="none" stroke="${c.deep}" stroke-width="1.8" opacity=".55"/>
        <path d="M52 65c4 4 8 4 12 0" fill="none" stroke="${c.deep}" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>
        <path d="M91 77c8-7 14-1 12 6-1 5-7 6-11 3" fill="${WAVE_GOLD}" opacity=".85"/>
        <path d="M30 74c-5 8-4 16 2 22" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.3" opacity=".45"/>`;
    case 'simba':
      return `
        <path d="M35 42c-8-9-5-20 5-25 3 6 8 8 13 4 0-7 5-11 12-11 4 7 10 9 15 5 7 6 5 18-3 25Z" fill="${WAVE_GOLD}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M60 18c-3 8-5 16-3 24" stroke="${WAVE_RED}" stroke-width="1.5" opacity=".55"/>
        <path d="M34 84c-4 8-1 13 5 13 5 0 6-4 4-9M86 84c4 8 1 13-5 13-5 0-6-4-4-9" fill="${c.light}" opacity=".6"/>
        <path d="M50 56h4M66 56h4M55 62h10" stroke="${c.deep}" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>
        <path d="M92 39l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="${WAVE_GOLD}" opacity=".8"/>`;
    case 'stitch':
      return `
        <path d="M39 34c-10-10-18-5-16 5 1 8 8 12 15 9M81 34c10-10 18-5 16 5-1 8-8 12-15 9" fill="${c.light}" opacity=".65" stroke="${c.deep}" stroke-width="1"/>
        <path d="M31 69c-9 1-13 7-9 13 4 4 9 2 12-2M89 69c9 1 13 7 9 13-4 4-9 2-12-2" fill="${c.light}" opacity=".55"/>
        <path d="M45 38c4-2 8-3 15-3s11 1 15 3" fill="none" stroke="${WAVE_BLUE}" stroke-width="1.6" opacity=".55"/>
        <path d="M50 78c5-3 10-4 16-4s10 1 14 4" fill="none" stroke="${WAVE_WHITE}" stroke-width="1.2" opacity=".5"/>`;

    case 'thanos':
      return `
        <path d="M36 84c-7 0-11 5-9 10 4 3 9 0 12-4M84 84c7 0 11 5 9 10-4 3-9 0-12-4" fill="${WAVE_GOLD}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <path d="M45 43c5-3 10-4 15-4s10 1 15 4M49 49h22" fill="none" stroke="${c.light}" stroke-width="1.6" opacity=".55"/>
        <path d="M32 38h16v15H32Z" fill="${WAVE_GOLD}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="38" cy="44" r="2" fill="${WAVE_BLUE}"/><circle cx="44" cy="47" r="2" fill="${WAVE_RED}"/><circle cx="38" cy="50" r="2" fill="${WAVE_GREEN}"/>
        <path d="M91 32l1.6 4.4 4.4 1.6-4.4 1.6L91 44l-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="${WAVE_GOLD}" opacity=".8"/>`;
    case 'loki':
      return `
        <path d="M39 31 29 11l16 8 6-12 7 12 15-8-9 20" fill="${WAVE_GOLD}" opacity=".85" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M91 25v66M87 31l4 6 4-6" stroke="${WAVE_GOLD}" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="91" cy="28" r="3" fill="${WAVE_GREEN}"/>
        <path d="M31 55 12 95l24-4 8-25M89 55l19 40-24-4-8-25" fill="${WAVE_GREEN}" opacity=".45" stroke="${c.deep}" stroke-width="1"/>
        <path d="M53 62h14l-7 15Z" fill="${WAVE_GREEN}" opacity=".6"/>`;
    case 'magneto':
      return `
        <path d="M38 34c4-10 11-15 22-15s18 5 22 15l-7 6H45Z" fill="${WAVE_RED}" opacity=".7" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 30h36" stroke="${WAVE_GOLD}" stroke-width="1.6" opacity=".8"/>
        <path d="M25 72l10-3M90 65l9-5M28 59l8 2M93 83l8 3" stroke="${c.light}" stroke-width="1.5" stroke-linecap="round" opacity=".75"/>
        <path d="M86 46l12-4M84 54l14 2" stroke="${WAVE_GOLD}" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
        <circle cx="60" cy="44" r="3" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.2"/>`;
    case 'docock':
      return `
        <path d="M30 72c-10-4-13 4-8 10 5 5 12 1 14-5M32 84c-7 5-5 13 2 14 6 1 8-5 5-10M90 72c10-4 13 4 8 10-5 5-12 1-14-5M88 84c7 5 5 13-2 14-6 1-8-5-5-10" fill="none" stroke="${WAVE_GREEN}" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M42 40h14v12H42ZM64 40h14v12H64Z" fill="${c.light}" opacity=".4" stroke="${c.deep}" stroke-width="1"/>
        <path d="M47 44c2-3 5-4 8-3M69 44c2-3 5-4 8-3" stroke="${WAVE_WHITE}" stroke-width="1.4" opacity=".7"/>
        <path d="M52 71h16M55 77h10" stroke="${WAVE_GREEN}" stroke-width="1.5" opacity=".55"/>`;
    case 'greengoblin':
      return `
        <path d="M37 31c5-12 13-18 23-18s18 6 23 18l-8 6H45Z" fill="${WAVE_GREEN}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <path d="M43 31c4-4 9-6 17-6s13 2 17 6" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.4" opacity=".7"/>
        <path d="M92 73c8-1 12 4 10 10-3 2-7 0-9-3-1 4-5 6-9 3 1-4 4-7 8-8Z" fill="${WAVE_GOLD}" opacity=".8" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M93 77h5M95 75v7" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M31 56c-7 2-10 9-5 14 4 2 8-1 10-5" fill="${WAVE_GREEN}" opacity=".55"/>`;
    case 'venom':
      return `
        <path d="M31 58c-10 4-12 13-5 18 7 4 13-1 15-8M89 58c10 4 12 13 5 18-7 4-13-1-15-8" fill="${c.deep}" opacity=".8" stroke="${WAVE_BLUE}" stroke-width="1"/>
        <path d="M50 73c5-3 10-4 15-4s9 1 13 4M53 79c4-4 8-5 11-5s7 1 10 5" fill="none" stroke="${WAVE_WHITE}" stroke-width="1.4" opacity=".75"/>
        <path d="M56 70l-2 8 6-4M64 70l2 8-6-4" fill="${WAVE_WHITE}" opacity=".8"/>
        <path d="M32 35l6 6M88 35l-6 6M27 47l7 2M93 47l-7 2" stroke="${WAVE_BLUE}" stroke-width="1.4" opacity=".55"/>`;
    case 'mysterio':
      return `
        <circle cx="60" cy="37" r="18" fill="${WAVE_GREEN}" opacity=".25" stroke="${WAVE_GOLD}" stroke-width="1.5"/>
        <path d="M42 37h36M60 19c-5 8-6 14-4 22 4-3 7-3 11 0 1-8 0-14-7-22Z" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.2" opacity=".65"/>
        <path d="M32 58 14 94l23-4 8-24M88 58l18 36-23-4-8-24" fill="${WAVE_GREEN}" opacity=".4" stroke="${c.deep}" stroke-width="1"/>
        <path d="M24 44c-4 5-7 11-8 17M96 44c4 5 7 11 8 17" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.5" opacity=".55"/>
        <circle cx="92" cy="31" r="2" fill="${WAVE_GREEN}"/>`;
    case 'ultron':
      return `
        <path d="M38 40h44l-5 29H43Z" fill="#9aa0b4" opacity=".65" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 49h8v8h-8ZM68 49h8v8h-8Z" fill="${WAVE_RED}"/>
        <path d="M50 64h20M54 69h12" stroke="${WAVE_DARK}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
        <path d="M38 28l-7-9M82 28l7-9M34 35l-6-2M86 35l6-2" stroke="${WAVE_RED}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
        <path d="M32 67c-8 1-11 7-8 12 4 1 8-1 10-5M88 67c8 1 11 7 8 12-4 1-8-1-10-5" fill="${c.light}" opacity=".5"/>`;
    case 'redskull':
      return `
        <path d="M38 35c5-9 12-14 22-14s17 5 22 14l-8 8H46Z" fill="${WAVE_RED}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M45 45c4-4 9-6 15-6s11 2 15 6M49 51h22" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".55"/>
        <path d="M50 74v15M70 74v15" stroke="${c.light}" stroke-width="2.2" stroke-linecap="round" opacity=".65"/>
        <path d="M91 40l7 7-7 7-7-7Z" fill="${WAVE_BLUE}" opacity=".8" stroke="${WAVE_WHITE}" stroke-width="1"/>
        <path d="M31 58c-7 2-10 9-5 13 4 2 8-1 10-5" fill="${WAVE_RED}" opacity=".5"/>`;
    case 'killmonger':
      return `
        <path d="M36 36c3-7 9-11 16-12M68 24c7 1 13 5 16 12" fill="none" stroke="${WAVE_GOLD}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
        <path d="M45 42c3-3 6-5 10-5M65 37c4 0 7 2 10 5" fill="none" stroke="${c.deep}" stroke-width="2" opacity=".6"/>
        <path d="M47 51c3-2 6-3 10-3M66 48c4 0 7 1 10 3" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.6" opacity=".75"/>
        <path d="M44 77h32M49 82h22" stroke="${WAVE_GOLD}" stroke-width="1.5" opacity=".65"/>
        <path d="M31 44l-6 3M89 44l6 3M29 54l-6 1M91 54l6 1" stroke="${WAVE_GOLD}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>`;

    case 'joker':
      return `
        <path d="M39 34c-8-11-4-22 3-27 3 8 8 12 15 9 1 8 6 13 12 11 3 9-3 17-12 20Z" fill="${WAVE_GREEN}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 66c6 7 12 10 18 10s12-3 18-10" fill="none" stroke="${WAVE_RED}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M90 73l9-14 9 14Z" fill="${WAVE_WHITE}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M95 70l4-6 4 6Z" fill="${WAVE_RED}"/>
        <path d="M34 48c-6 0-9 4-7 8 2 3 6 2 8-1M86 44c6-1 9 3 7 7-2 3-6 2-8-1" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.6" opacity=".65"/>`;
    case 'harleyquinn':
      return `
        <path d="M34 36c-10 4-14 14-9 22 5 7 14 2 16-6M86 36c10 4 14 14 9 22-5 7-14 2-16-6" fill="${WAVE_RED}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M40 27c5-5 11-8 20-8s15 3 20 8" fill="none" stroke="${WAVE_BLUE}" stroke-width="2" stroke-linecap="round"/>
        <path d="M92 50v53M87 57l5-8 5 8" stroke="${WAVE_GOLD}" stroke-width="2" stroke-linecap="round"/>
        <path d="M86 64h12" stroke="${c.deep}" stroke-width="4" stroke-linecap="round"/>
        <path d="M45 50l5-3M70 47l5 3" stroke="${WAVE_RED}" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>`;
    case 'catwoman':
      return `
        <path d="M39 34 32 16l15 9M81 34l7-18-15 9" fill="${WAVE_DARK}" stroke="${WAVE_GOLD}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M42 45c4-3 9-4 18-4s14 1 18 4" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.7" opacity=".75"/>
        <path d="M92 60c12-2 18 5 15 13-3 6-11 4-12-2" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.8"/>
        <path d="M90 79c5 3 9 8 11 14" stroke="${WAVE_GOLD}" stroke-width="1.2" opacity=".65"/>
        <path d="M31 58c-6 4-7 11-3 15" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.3" opacity=".55"/>`;
    case 'poisonivy':
      return `
        <path d="M38 36c-8-12-2-22 6-24 2 8 8 11 14 7 2 8 7 12 13 9 2 10-4 18-13 21Z" fill="${WAVE_GREEN}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
        <path d="M95 57c8-5 14 2 12 9-2 6-9 7-13 2" fill="${WAVE_GREEN}" opacity=".6" stroke="${c.deep}" stroke-width="1"/>
        <path d="M31 70c-9 7-8 17 1 21 7 3 12-3 9-9M89 72c9 5 10 15 2 20-6 3-11-2-9-8" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.7" opacity=".6"/>
        <path d="M94 54l2-7 4 6 6-3-2 8" fill="${WAVE_RED}" opacity=".8"/>
        <path d="M46 80c5-2 10-3 14-3s9 1 14 3" fill="none" stroke="${WAVE_GREEN}" stroke-width="1.4" opacity=".55"/>`;
    case 'lexluthor':
      return `
        <path d="M40 33c5-7 11-10 20-10s15 3 20 10" fill="${WAVE_GREEN}" opacity=".45" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 50h44l-4 19H42Z" fill="${WAVE_GREEN}" opacity=".18" stroke="${WAVE_GREEN}" stroke-width="1.2"/>
        <path d="M49 58h22M49 63h22" stroke="${WAVE_GREEN}" stroke-width="1.2" opacity=".6"/>
        <path d="M92 72l5-11 6 11Z" fill="${WAVE_GREEN}" opacity=".85"/>
        <path d="M31 54c-7 2-10 9-6 14 4 2 8-1 10-5M89 54c7 2 10 9 6 14-4 2-8-1-10-5" fill="${WAVE_GREEN}" opacity=".25"/>`;
    case 'darkseid':
      return `
        <path d="M39 30 33 12l15 9 12-5 12 5 15-9-6 18Z" fill="${c.deep}" stroke="${WAVE_RED}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M46 44c4-2 8-3 14-3s10 1 14 3" fill="none" stroke="${WAVE_RED}" stroke-width="1.8" opacity=".65"/>
        <path d="M55 69c5 3 10 3 15 0M58 75c3 2 6 2 9 0" fill="none" stroke="${WAVE_RED}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M91 34c8 2 11 8 8 14" fill="none" stroke="${WAVE_RED}" stroke-width="1.7" opacity=".75"/>
        <path d="M32 62c-7 2-9 9-5 13 4 2 8-1 10-5M88 62c7 2 9 9 5 13-4 2-8-1-10-5" fill="${c.deep}" opacity=".55"/>`;
    case 'deathstroke':
      return `
        <path d="M38 35c6-6 13-9 22-9s16 3 22 9l-6 12H44Z" fill="${WAVE_DARK}" opacity=".8" stroke="${WAVE_GOLD}" stroke-width="1"/>
        <path d="M60 26v21M43 48h34" stroke="${WAVE_GOLD}" stroke-width="1.4" opacity=".8"/>
        <path d="M90 34v65M86 39l4-7 4 7" stroke="${WAVE_WHITE}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M48 72h24M52 78h16" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.4" opacity=".55"/>
        <circle cx="75" cy="44" r="2" fill="${WAVE_RED}" opacity=".8"/>`;
    case 'bane':
      return `
        <path d="M38 36c5-8 12-12 22-12s17 4 22 12l-8 8H46Z" fill="${WAVE_DARK}" opacity=".75" stroke="${WAVE_RED}" stroke-width="1"/>
        <path d="M45 45h30M48 51h24" stroke="${WAVE_RED}" stroke-width="1.5" opacity=".75"/>
        <path d="M32 70c-10 2-14 10-9 16 6 4 13-1 15-8M88 70c10 2 14 10 9 16-6 4-13-1-15-8" fill="${c.light}" opacity=".4"/>
        <path d="M48 72c4-2 8-3 12-3s8 1 12 3M51 78h18" fill="none" stroke="${WAVE_RED}" stroke-width="1.3" opacity=".65"/>
        <path d="M92 34l4-7M98 38l7-2" stroke="${WAVE_RED}" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>`;
    case 'sinestro':
      return `
        <path d="M39 32 31 18l16 7M81 32l8-14-16 7" fill="${WAVE_DARK}" stroke="${WAVE_GOLD}" stroke-width="1" stroke-linejoin="round"/>
        <circle cx="92" cy="58" r="7" fill="none" stroke="${WAVE_GOLD}" stroke-width="2"/>
        <path d="M89 58h6M92 55v6" stroke="${WAVE_GOLD}" stroke-width="1.4"/>
        <path d="M54 69l6-8 6 8-6 8Z" fill="${WAVE_GOLD}" opacity=".8"/>
        <path d="M31 50c-6 8-5 18 2 25M89 50c6 8 5 18-2 25" fill="none" stroke="${WAVE_GOLD}" stroke-width="1.3" opacity=".55"/>`;
    case 'cheetah':
      return `
        <path d="M39 34 32 17l15 9M81 34l7-17-15 9" fill="${WAVE_GOLD}" opacity=".8" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <circle cx="47" cy="48" r="2" fill="${c.deep}" opacity=".6"/><circle cx="73" cy="48" r="2" fill="${c.deep}" opacity=".6"/><circle cx="60" cy="61" r="1.6" fill="${c.deep}" opacity=".6"/>
        <path d="M34 82l-7 12M43 85l-4 10M77 85l4 10M86 82l7 12" stroke="${WAVE_WHITE}" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>
        <path d="M92 62c10-2 15 5 12 12-4 1-8-2-10-6-1 4-5 6-9 3 1-5 3-8 7-9Z" fill="${WAVE_GOLD}" opacity=".7"/>
        <path d="M45 74h30" stroke="${WAVE_GOLD}" stroke-width="1.4" opacity=".55"/>`;
    case 'thatladybear':
      return `
        <circle cx="32" cy="28" r="16" fill="${c.body}" stroke="${c.deep}" stroke-width="1.5"/>
        <circle cx="88" cy="28" r="16" fill="${c.body}" stroke="${c.deep}" stroke-width="1.5"/>
        <circle cx="32" cy="28" r="9.5" fill="${c.deep}" opacity=".9"/>
        <circle cx="88" cy="28" r="9.5" fill="${c.deep}" opacity=".9"/>
        <path d="M25 21c3-3 6-4 9-3M83 18c4-1 7 0 9 3" fill="none" stroke="${c.light}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
        <path d="M60 22c19 0 32 12 32 31 0 13-5 22-14 27-5 3-11 5-18 5s-13-2-18-5c-9-5-14-14-14-27 0-19 13-31 32-31Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.5"/>
        <path d="M60 24c14 0 25 8 29 21-6-6-16-10-29-10s-23 4-29 10c4-13 15-21 29-21Z" fill="${c.deep}" opacity=".5"/>
        <path d="M60 23c-3 8-3 14 0 20M47 25c-5 6-7 12-5 18M73 25c5 6 7 12 5 18M39 52c5 3 9 7 10 13M81 52c-5 3-9 7-10 13" fill="none" stroke="${c.deep}" stroke-width="4" stroke-linecap="round"/>
        <path d="M35 42c5-4 12-4 17-1M68 41c5-3 12-3 17 1" fill="none" stroke="${c.deep}" stroke-width="4.5" stroke-linecap="round"/>
        <ellipse cx="47" cy="55" rx="12.2" ry="13" fill="#fff2ce" stroke="${c.deep}" stroke-width="1.5"/>
        <ellipse cx="73" cy="55" rx="12.2" ry="13" fill="#fff2ce" stroke="${c.deep}" stroke-width="1.5"/>
        <ellipse cx="48" cy="56" rx="8.3" ry="10.2" fill="#e2b94b"/>
        <ellipse cx="72" cy="56" rx="8.3" ry="10.2" fill="#e2b94b"/>
        <ellipse cx="48.5" cy="57" rx="3.7" ry="5.4" fill="#1b100c"/>
        <ellipse cx="71.5" cy="57" rx="3.7" ry="5.4" fill="#1b100c"/>
        <circle cx="50.5" cy="52.5" r="2.1" fill="#ffffff"/>
        <circle cx="73.5" cy="52.5" r="2.1" fill="#ffffff"/>
        <circle cx="46.5" cy="62" r="1.2" fill="#fff8e0" opacity=".75"/>
        <circle cx="69.5" cy="62" r="1.2" fill="#fff8e0" opacity=".75"/>
        <ellipse cx="60" cy="75" rx="23" ry="14.5" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <ellipse cx="60" cy="68.5" rx="6.8" ry="5" fill="#2b1512" stroke="${c.deep}" stroke-width=".8"/>
        <ellipse cx="57.8" cy="66.8" rx="2.2" ry="1.3" fill="#fff4dc" opacity=".5"/>
        <path d="M60 72v4" stroke="${c.deep}" stroke-width="1.1" stroke-linecap="round" opacity=".55"/>
        <path d="M46 76c6 1 11 4 14 10 3-6 8-9 14-10-2 12-7 18-14 18s-12-6-14-18Z" fill="#2a0e0d" stroke="${c.deep}" stroke-width="1"/>
        <path d="M49 77l3.5 8 2-8Z" fill="#fff8e8"/><path d="M71 77l-2 8-3.5-8Z" fill="#fff8e8"/>
        <path d="M52 92l3-6 3 6Z" fill="#fff8e8"/><path d="M62 92l3-6 3 6Z" fill="#fff8e8"/>
        <path d="M53 88c4-3 10-3 14 0-2 5-5 7-7 7s-5-2-7-7Z" fill="#c94b64" opacity=".85"/>
        <g transform="rotate(-2 60 100)">
          <rect x="11" y="92.5" width="98" height="16" rx="3" fill="#062f2b" opacity=".5"/>
          <rect x="10" y="90.5" width="100" height="16" rx="3" fill="#0f8179" stroke="#073d39" stroke-width="1.4"/>
          <path d="M13 94h94" stroke="#65d3c7" stroke-width="1" opacity=".5"/>
          <text x="60" y="102.8" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.4" font-weight="900" letter-spacing=".15" fill="#f6e3a0" stroke="#4c3b12" stroke-width=".35">THATLADYBEAR</text>
        </g>`;
    default:
      return '';
  }
}
