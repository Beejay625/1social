export function calculateAirdropTotal(
  recipients: string[],
  amountPerRecipient: string
): string {
  const amountBigInt = BigInt(amountPerRecipient);
  const recipientsCount = BigInt(recipients.length);
  return (amountBigInt * recipientsCount).toString();
}

export function calculateAirdropCost(
  recipients: string[],
  gasPrice: string,
  gasLimit: string
): string {
  const gasPriceBigInt = BigInt(gasPrice);
  const gasLimitBigInt = BigInt(gasLimit);
  const recipientsCount = BigInt(recipients.length);
  const totalGas = gasLimitBigInt * recipientsCount;
  return (gasPriceBigInt * totalGas).toString();
}

