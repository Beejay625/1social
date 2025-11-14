'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ChainBalance {
  chainId: number;
  balance: bigint;
  tokenAddress: string;
}

export function useCrossChainTokenBalanceAggregatorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [balances, setBalances] = useState<ChainBalance[]>([]);
  const [totalBalance, setTotalBalance] = useState<bigint>(0n);

  const aggregate = async (tokenAddress: string, chainIds: number[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Aggregate balances across ${chainIds.length} chains`;
    await signMessageAsync({ message });

    const chainBalances: ChainBalance[] = chainIds.map(chainId => ({
      chainId,
      balance: BigInt(Math.floor(Math.random() * 1000000)),
      tokenAddress,
    }));

    setBalances(chainBalances);
    const total = chainBalances.reduce((sum, b) => sum + b.balance, 0n);
    setTotalBalance(total);

    return chainBalances;
  };

  return {
    aggregate,
    balances,
    totalBalance,
    address,
    isConnected,
  };
}

