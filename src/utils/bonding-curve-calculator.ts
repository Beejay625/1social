export function calculateBondingCurvePrice(
  virtualBalance: string,
  virtualSupply: string,
  reserveRatio: number,
  amount: string
): string {
  const balanceBigInt = BigInt(virtualBalance);
  const supplyBigInt = BigInt(virtualSupply);
  const amountBigInt = BigInt(amount);
  const ratio = BigInt(reserveRatio);
  
  const newSupply = supplyBigInt + amountBigInt;
  const newBalance = balanceBigInt + ((balanceBigInt * amountBigInt) / supplyBigInt);
  
  const price = (newBalance * ratio) / (newSupply * BigInt(100));
  return price.toString();
}

export function calculateBondingCurveAmount(
  virtualBalance: string,
  virtualSupply: string,
  reserveRatio: number,
  payment: string
): string {
  const balanceBigInt = BigInt(virtualBalance);
  const supplyBigInt = BigInt(virtualSupply);
  const paymentBigInt = BigInt(payment);
  const ratio = BigInt(reserveRatio);
  
  const amount = (paymentBigInt * supplyBigInt) / (balanceBigInt * ratio / BigInt(100));
  return amount.toString();
}

