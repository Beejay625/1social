export function calculateReflectionReward(
  holderBalance: string,
  totalSupply: string,
  reflectionAmount: string
): string {
  if (totalSupply === '0') return '0';
  const balanceBigInt = BigInt(holderBalance);
  const supplyBigInt = BigInt(totalSupply);
  const reflectionBigInt = BigInt(reflectionAmount);
  const reward = (balanceBigInt * reflectionBigInt) / supplyBigInt;
  return reward.toString();
}

export function calculateReflectionRate(
  reflectionAmount: string,
  totalSupply: string,
  period: number
): number {
  if (totalSupply === '0' || period === 0) return 0;
  const reflectionBigInt = BigInt(reflectionAmount);
  const supplyBigInt = BigInt(totalSupply);
  const dailyRate = (Number(reflectionBigInt) * 100) / (Number(supplyBigInt) * period);
  return dailyRate;
}


