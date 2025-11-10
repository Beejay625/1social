'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useReputationSystem() {
  const { address, isConnected } = useAccount();
  const { data: reputation } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReputation',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });
  return { reputation, isConnected, address };
}

