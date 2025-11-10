'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useSocialGraphSync() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const syncGraph = async (protocol: 'lens' | 'farcaster') => {
    if (!address) throw new Error('Wallet not connected');
    const message = `SyncGraph:${protocol}:${address}`;
    await signMessageAsync({ message });
    return { protocol, synced: true };
  };
  return { syncGraph };
}

