'use client';
import { useAccount } from 'wagmi';
export function useChainIDDetector() {
  const { chainId, chain, isConnected } = useAccount();
  const detectChain = () => {
    if (!isConnected) return null;
    return { chainId, chainName: chain?.name, network: chain?.network };
  };
  return { detectChain, chainId, chain, isConnected };
}
