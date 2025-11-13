'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ChainBalance {
  chainId: number;
  chainName: string;
  tokenAddress: string;
  balance: string;
  symbol: string;
}

export interface AggregatedBalance {
  tokenAddress: string;
  symbol: string;
  totalBalance: string;
  chainBalances: ChainBalance[];
}

export function useCrossChainTokenBalanceAggregator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [aggregatedBalances, setAggregatedBalances] = useState<AggregatedBalance[]>([]);

  const aggregateBalances = async (
    tokenAddress: string,
    chainIds: number[]
  ): Promise<AggregatedBalance> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Aggregate cross-chain balances: ${tokenAddress}`;
    await signMessageAsync({ message });
    
    const chainBalances: ChainBalance[] = chainIds.map((chainId) => ({
      chainId,
      chainName: `Chain ${chainId}`,
      tokenAddress,
      balance: '0',
      symbol: 'TOKEN',
    }));
    
    const totalBalance = chainBalances.reduce(
      (sum, cb) => sum + BigInt(cb.balance),
      BigInt(0)
    ).toString();
    
    const aggregated: AggregatedBalance = {
      tokenAddress,
      symbol: 'TOKEN',
      totalBalance,
      chainBalances,
    };
    
    setAggregatedBalances([...aggregatedBalances, aggregated]);
    return aggregated;
  };

  return { aggregateBalances, aggregatedBalances, address };
}

