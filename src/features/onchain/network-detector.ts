'use client';
import { useAccount } from 'wagmi';
export function useNetworkDetector() {
  const { chainId, chain, isConnected } = useAccount();
  const getNetworkInfo = () => {
    if (!isConnected) return null;
    return { chainId, chainName: chain?.name, isConnected };
  };
  return { getNetworkInfo, chainId, chain, isConnected };
}

