export function calculateMigrationAmount(
  amount: string,
  rate: string
): string {
  const amountBigInt = BigInt(amount);
  const rateBigInt = BigInt(rate);
  return (amountBigInt * rateBigInt).toString();
}

export function validateMigrationRate(
  rate: string,
  minRate: string,
  maxRate: string
): boolean {
  const rateBigInt = BigInt(rate);
  const minRateBigInt = BigInt(minRate);
  const maxRateBigInt = BigInt(maxRate);
  return rateBigInt >= minRateBigInt && rateBigInt <= maxRateBigInt;
}

