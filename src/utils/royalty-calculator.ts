export function calculateRoyalty(
  saleAmount: string,
  royaltyPercentage: number
): string {
  const saleAmountBigInt = BigInt(saleAmount);
  const royaltyAmount = (saleAmountBigInt * BigInt(royaltyPercentage)) / BigInt(100);
  return royaltyAmount.toString();
}

export function calculateRemainingAmount(
  totalAmount: string,
  royaltyAmount: string
): string {
  const totalBigInt = BigInt(totalAmount);
  const royaltyBigInt = BigInt(royaltyAmount);
  return (totalBigInt - royaltyBigInt).toString();
}


