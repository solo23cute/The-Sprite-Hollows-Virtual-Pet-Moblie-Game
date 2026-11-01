/* Free room colour themes and free decor. Nothing here costs coins: every
   theme and every piece is available from the first time you decorate. */

const HOME_ROOM_THEMES = {
  honey: { name: 'Honeywood', icon: '🍯', wall: '#3a2f1b', floor: '#5a4526', glow: '#ffd166' },
  mint: { name: 'Mint Tea', icon: '🍃', wall: '#1f3a31', floor: '#2f5a4a', glow: '#8fe0c0' },
  dusk: { name: 'Dusk Plum', icon: '🌆', wall: '#2f2340', floor: '#453263', glow: '#b69cff' },
  rose: { name: 'Rose Quartz', icon: '🌸', wall: '#3d2230', floor: '#5c3245', glow: '#ff9ec7' },
  ocean: { name: 'Deep Ocean', icon: '🌊', wall: '#132c3d', floor: '#1f4a63', glow: '#5ad6ff' },
  forest: { name: 'Old Forest', icon: '🌲', wall: '#1d2f1f', floor: '#2f4a2f', glow: '#8fe07a' },
  ember: { name: 'Ember Night', icon: '🔥', wall: '#3a1f16', floor: '#5c2f1f', glow: '#ff9a3c' },
  mono: { name: 'Paper & Ink', icon: '🖋️', wall: '#2a2a32', floor: '#3d3d47', glow: '#e8e6f0' },
};

const HOME_ROOM_THEME_KEYS = Object.keys(HOME_ROOM_THEMES);

function homeRoomTheme(id) {
  const key = id || (typeof state !== 'undefined' && state && state.roomTheme) || 'honey';
  return HOME_ROOM_THEMES[key] || HOME_ROOM_THEMES.honey;
}

function homeRoomThemeStyle(id) {
  const theme = homeRoomTheme(id);
  return `--room-wall:${theme.wall};--room-floor:${theme.floor};--room-glow:${theme.glow}`;
}

/* Always-free decorations. They are placed exactly like bought furniture. */
const HOME_FREE_DECOR = [
  { id: 'free_plant', name: 'Pot Plant', icon: '🪴', cls: 'free-plant', spot: 0 },
  { id: 'free_lamp', name: 'Warm Lamp', icon: '🪔', cls: 'free-lamp', spot: 2 },
  { id: 'free_rug', name: 'Round Rug', icon: '🟣', cls: 'free-rug', spot: 1 },
  { id: 'free_frame', name: 'Framed Print', icon: '🖼️', cls: 'free-frame', spot: 0 },
  { id: 'free_plush', name: 'Plush Friend', icon: '🧸', cls: 'free-plush', spot: 1 },
  { id: 'free_banner', name: 'Wall Banner', icon: '🎏', cls: 'free-banner', spot: 2 },
  { id: 'free_mirror', name: 'Little Mirror', icon: '🪞', cls: 'free-mirror', spot: 0 },
  { id: 'free_lights', name: 'Fairy Lights', icon: '✨', cls: 'free-fairy', spot: 2 },
];

function freeDecorPiece(id) {
  return HOME_FREE_DECOR.find((piece) => piece.id === id) || null;
}
