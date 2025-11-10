'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface AggregatedBalance {
  chain: string;
  total: bigint;
  tokens: Array<{ symbol: string; balance: bigint }>;
}

export function useMultiChainBalanceAggregator() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [aggregated, setAggregated] = useState<AggregatedBalance[]>([]);

  useEffect(() => {
    if (address && balance) {
      const agg: AggregatedBalance = {
        chain: 'ethereum',
        total: balance.value,
        tokens: [{ symbol: balance.symbol, balance: balance.value }],
      };
      setAggregated([agg]);
    }
  }, [address, balance]);

  return { aggregated, address };
}

