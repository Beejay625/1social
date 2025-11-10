'use client';
import { useAccount, useBalance } from 'wagmi';
export function useCrossChainAssetTracker() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const trackAssets = async (chains: number[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return { chains, balance: balance?.value || 0n, address };
  };
  return { trackAssets, balance, isConnected, address };
}
