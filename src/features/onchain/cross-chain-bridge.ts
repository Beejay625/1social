'use client';
import { useAccount, useSwitchChain } from 'wagmi';
export function useCrossChainBridge() {
  const { address } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const bridgeContent = async (targetChainId: number) => {
    if (!address) throw new Error('Wallet not connected');
    await switchChainAsync({ chainId: targetChainId });
    return { targetChainId, bridged: true };
  };
  return { bridgeContent };
}
