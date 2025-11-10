'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useContentOwnership() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const claimOwnership = async (contentId: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Ownership:${contentId}:${address}`;
    await signMessageAsync({ message });
    return { contentId, owner: address };
  };
  return { claimOwnership, isConnected, address };
}

