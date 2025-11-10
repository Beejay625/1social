'use client';
import { useAccount, useReadContract } from 'wagmi';
export function usePauseStateTracker() {
  const { address, isConnected } = useAccount();
  const { data: paused } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'paused',
    query: { enabled: isConnected && !!address },
  });
  return { paused, isConnected, address };
}
