'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BalanceComparison {
  chain: string;
  balance: bigint;
  usdValue: number;
  difference: bigint;
}

export function useMultiChainBalanceComparer() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const [comparisons, setComparisons] = useState<BalanceComparison[]>([]);

  useEffect(() => {
    if (!address || !balance) return;
    
    const comparison: BalanceComparison = {
      chain: 'ethereum',
      balance: balance.value,
      usdValue: 0,
      difference: BigInt(0),
    };
    
    setComparisons([comparison]);
  }, [address, balance]);

  return { comparisons, address };
}

