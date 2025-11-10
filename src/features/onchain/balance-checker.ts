'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BalanceInfo {
  address: string;
  balance: bigint;
  symbol: string;
  decimals: number;
}

export function useBalanceChecker() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [balances, setBalances] = useState<BalanceInfo[]>([]);

  useEffect(() => {
    if (address && balance) {
      const info: BalanceInfo = {
        address,
        balance: balance.value,
        symbol: balance.symbol,
        decimals: balance.decimals,
      };
      setBalances([info]);
    }
  }, [address, balance]);

  return { balances, address };
}
