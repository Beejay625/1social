'use client';
import { useAccount, useSwitchChain } from 'wagmi';
export function useChainSwitcher() {
  const { chainId, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const switchToChain = async (targetChainId: number) => {
    if (!isConnected) throw new Error('Reown wallet not connected');
    await switchChainAsync({ chainId: targetChainId });
    return { targetChainId, switched: true };
  };
  return { switchToChain, chainId, isConnected };
}

