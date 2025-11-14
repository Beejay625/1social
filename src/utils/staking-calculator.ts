export function calculateStakingRewards(
  principal: string,
  apy: number,
  days: number
): string {
  const principalBigInt = BigInt(principal);
  const apyDecimal = apy / 100;
  const yearlyRewards = principalBigInt * BigInt(Math.floor(apyDecimal * 10000)) / BigInt(10000);
  const dailyRewards = yearlyRewards / BigInt(365);
  const totalRewards = dailyRewards * BigInt(days);
  return totalRewards.toString();
}

export function calculateAPY(
  principal: string,
  rewards: string,
  days: number
): number {
  if (days === 0) return 0;
  const principalBigInt = BigInt(principal);
  const rewardsBigInt = BigInt(rewards);
  const dailyRate = (Number(rewardsBigInt) * 100) / (Number(principalBigInt) * days);
  const yearlyRate = dailyRate * 365;
  return yearlyRate;
}


