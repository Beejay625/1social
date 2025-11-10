'use client';
import { useAccount } from 'wagmi';
export function useSocialGraph() {
  const { address } = useAccount();
  const syncGraph = async (protocol: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { protocol, syncedBy: address };
  };
  return { syncGraph };
}
