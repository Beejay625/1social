export function calculateLiquidity(
  amountA: string,
  amountB: string
): string {
  return (BigInt(amountA) * BigInt(amountB)).toString();
}

export function calculateLPShare(
  userAmount: string,
  totalAmount: string,
  totalSupply: string
): string {
  if (totalAmount === '0') return '0';
  const userAmountBigInt = BigInt(userAmount);
  const totalAmountBigInt = BigInt(totalAmount);
  const totalSupplyBigInt = BigInt(totalSupply);
  const share = (userAmountBigInt * totalSupplyBigInt) / totalAmountBigInt;
  return share.toString();
}

