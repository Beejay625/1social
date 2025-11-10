'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BalanceData {
  token: string;
  balance: bigint;
  formatted: string;
  decimals: number;
}

export function useTokenBalanceFetcher() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const [balances, setBalances] = useState<BalanceData[]>([]);

  useEffect(() => {
    if (!address || !balance) return;
    
    const balanceData: BalanceData = {
      token: balance.symbol,
      balance: balance.value,
      formatted: balance.formatted,
      decimals: balance.decimals,
    };
    
    setBalances([balanceData]);
  }, [address, balance]);

  return { balances, address };
}

