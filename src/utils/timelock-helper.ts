export function isTimelockUnlocked(
  unlockTime: number,
  currentTime: number = Date.now()
): boolean {
  return currentTime >= unlockTime;
}

export function getTimeUntilUnlock(
  unlockTime: number,
  currentTime: number = Date.now()
): number {
  return Math.max(0, unlockTime - currentTime);
}

export function formatTimeUntilUnlock(
  unlockTime: number,
  currentTime: number = Date.now()
): string {
  const timeUntil = getTimeUntilUnlock(unlockTime, currentTime);
  if (timeUntil === 0) return 'Unlocked';
  
  const days = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

