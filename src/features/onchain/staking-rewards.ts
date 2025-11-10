'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useStakingRewards() {
  const { address, isConnected } = useAccount();
  const { data: rewards } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRewards',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });
  return { rewards, isConnected, address };
}
