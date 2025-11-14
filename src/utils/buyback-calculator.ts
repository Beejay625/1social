export function calculateBuybackAmount(
  price: string,
  budget: string
): string {
  const priceBigInt = BigInt(price);
  const budgetBigInt = BigInt(budget);
  if (priceBigInt === BigInt(0)) return '0';
  return (budgetBigInt / priceBigInt).toString();
}

export function calculateBuybackImpact(
  amount: string,
  totalSupply: string
): number {
  if (totalSupply === '0') return 0;
  const amountBigInt = BigInt(amount);
  const supplyBigInt = BigInt(totalSupply);
  const impact = (Number(amountBigInt) * 100) / Number(supplyBigInt);
  return impact;
}


