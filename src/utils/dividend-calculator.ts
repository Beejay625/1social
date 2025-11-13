export function calculateDividendPerHolder(
  totalDividends: string,
  holders: string[]
): string {
  if (holders.length === 0) return '0';
  const totalBigInt = BigInt(totalDividends);
  const holdersCount = BigInt(holders.length);
  return (totalBigInt / holdersCount).toString();
}

export function calculateDividendShare(
  holderBalance: string,
  totalSupply: string,
  totalDividends: string
): string {
  if (totalSupply === '0') return '0';
  const balanceBigInt = BigInt(holderBalance);
  const supplyBigInt = BigInt(totalSupply);
  const dividendsBigInt = BigInt(totalDividends);
  const share = (balanceBigInt * dividendsBigInt) / supplyBigInt;
  return share.toString();
}

