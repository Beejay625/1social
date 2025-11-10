'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ChainBalance {
  chain: string;
  balance: bigint;
  formatted: string;
  symbol: string;
}

export function useMultiChainBalance() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const [balances, setBalances] = useState<ChainBalance[]>([]);

  useEffect(() => {
    if (!address || !balance) return;
    
    const chainBalance: ChainBalance = {
      chain: 'ethereum',
      balance: balance.value,
      formatted: balance.formatted,
      symbol: balance.symbol,
    };
    
    setBalances([chainBalance]);
  }, [address, balance]);

  return { balances, address };
}
