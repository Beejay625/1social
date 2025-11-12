export function calculateVestingRelease(
  totalAmount: string,
  startTime: number,
  cliff: number,
  duration: number,
  currentTime: number
): string {
  if (currentTime < startTime + cliff) {
    return '0';
  }
  
  const elapsed = currentTime - (startTime + cliff);
  const totalElapsed = duration - cliff;
  
  if (elapsed >= totalElapsed) {
    return totalAmount;
  }
  
  const releaseAmount = (BigInt(totalAmount) * BigInt(elapsed)) / BigInt(totalElapsed);
  return releaseAmount.toString();
}

export function isVestingUnlocked(
  startTime: number,
  cliff: number,
  currentTime: number
): boolean {
  return currentTime >= startTime + cliff;
}

