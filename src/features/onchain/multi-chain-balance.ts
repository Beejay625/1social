'use client';
import { useAccount, useBalance } from 'wagmi';
export function useMultiChainBalance() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const aggregateBalances = async (chains: number[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return { chains, totalBalance: balance?.value || 0n, address };
  };
  return { aggregateBalances, balance, isConnected, address };
}

