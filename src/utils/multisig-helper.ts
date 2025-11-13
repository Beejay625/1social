export function calculateMultisigThreshold(
  owners: string[],
  threshold: number
): boolean {
  return threshold > 0 && threshold <= owners.length;
}

export function validateMultisigOwners(
  owners: string[]
): boolean {
  const uniqueOwners = new Set(owners);
  return uniqueOwners.size === owners.length && owners.length > 0;
}

export function getMultisigQuorum(
  approvals: number,
  threshold: number
): number {
  return approvals >= threshold ? 100 : Math.round((approvals / threshold) * 100);
}

