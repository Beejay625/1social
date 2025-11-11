'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Balance {
  token: string;
  balance: bigint;
  decimals: number;
  timestamp: number;
}

export function useContractBalanceTracker() {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    if (address && balanceData) {
      const balance: Balance = {
        token: 'native',
        balance: balanceData.value,
        decimals: balanceData.decimals,
        timestamp: Date.now(),
      };
      setBalances([balance]);
    }
  }, [address, balanceData]);

  return { balances, address };
}

