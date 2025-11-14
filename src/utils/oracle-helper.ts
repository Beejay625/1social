export function calculatePriceChange(
  oldPrice: string,
  newPrice: string
): number {
  if (oldPrice === '0') return 0;
  const oldPriceBigInt = BigInt(oldPrice);
  const newPriceBigInt = BigInt(newPrice);
  const change = ((newPriceBigInt - oldPriceBigInt) * BigInt(100)) / oldPriceBigInt;
  return Number(change);
}

export function getPriceSource(
  source: string
): 'chainlink' | 'uniswap' | 'custom' | 'unknown' {
  if (source.toLowerCase().includes('chainlink')) return 'chainlink';
  if (source.toLowerCase().includes('uniswap')) return 'uniswap';
  if (source.toLowerCase().includes('custom')) return 'custom';
  return 'unknown';
}


