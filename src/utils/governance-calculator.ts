export function calculateVotingPower(
  tokenBalance: string,
  totalSupply: string
): number {
  if (totalSupply === '0') return 0;
  const balanceBigInt = BigInt(tokenBalance);
  const supplyBigInt = BigInt(totalSupply);
  const power = (Number(balanceBigInt) * 100) / Number(supplyBigInt);
  return power;
}

export function calculateQuorum(
  votesFor: number,
  votesAgainst: number,
  totalSupply: string
): number {
  const totalVotes = votesFor + votesAgainst;
  if (totalSupply === '0') return 0;
  const quorum = (totalVotes * 100) / Number(BigInt(totalSupply));
  return quorum;
}


