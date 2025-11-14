export function createSnapshot(
  holders: string[],
  balances: Record<string, string>
): {
  holders: string[];
  balances: Record<string, string>;
  totalSupply: string;
} {
  const totalSupply = holders.reduce((acc, holder) => {
    const balance = balances[holder] || '0';
    return (BigInt(acc) + BigInt(balance)).toString();
  }, '0');
  
  return {
    holders: [...holders],
    balances: { ...balances },
    totalSupply,
  };
}

export function getSnapshotBalance(
  snapshot: { balances: Record<string, string> },
  address: string
): string {
  return snapshot.balances[address] || '0';
}


