'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useTokenHolderTracker() {
  const { address, isConnected } = useAccount();
  const { data: holders } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getHolders',
    query: { enabled: isConnected && !!address },
  });
  return { holders, isConnected, address };
}
