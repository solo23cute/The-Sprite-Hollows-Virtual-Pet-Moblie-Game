/* Guardian Vault: secret sprites behind duel-win milestones. Every door is
   opened from the guardian gallery and grants a hidden sprite plus coins. */

const GUARDIAN_VAULT_DOORS = [
  { id: 'gv-1', name: 'First Door', icon: '🔐', wins: 3, secret: 'heartkeeper', coins: 120 },
  { id: 'gv-2', name: 'Tide Door', icon: '🌊', wins: 6, secret: 'shelloracle', coins: 180 },
  { id: 'gv-3', name: 'Atlas Door', icon: '🗺️', wins: 10, secret: 'atlaskeeper', coins: 240 },
  { id: 'gv-4', name: 'Task Door', icon: '📜', wins: 15, secret: 'taskkeeper', coins: 300 },
  { id: 'gv-5', name: 'Dawn Door', icon: '🌅', wins: 21, secret: 'dailykeeper', coins: 360 },
  { id: 'gv-6', name: 'Gift Door', icon: '🎁', wins: 28, secret: 'giftkeeper', coins: 420 },
  { id: 'gv-7', name: 'Summit Door', icon: '🏔️', wins: 36, secret: 'summitspirit', coins: 500 },
  { id: 'gv-8', name: 'Rebirth Door', icon: '🕹️', wins: 45, secret: 'rebirthkeeper', coins: 600 },
];

function guardianVaultDoor(id) {
  return GUARDIAN_VAULT_DOORS.find((door) => door.id === id) || null;
}

function guardianVaultWins() {
  const beaten = (typeof state !== 'undefined' && state && state.guardiansBeaten) || {};
  return Object.values(beaten).reduce((sum, count) => sum + (Number(count) || 0), 0);
}

function guardianVaultOpened(id) {
  return !!((state && state.vaultDoors) || []).includes(id);
}
