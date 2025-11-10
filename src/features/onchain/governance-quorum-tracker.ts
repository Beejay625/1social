'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useGovernanceQuorumTracker() {
  const { address, isConnected } = useAccount();
  const { data: quorum } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'quorum',
    query: { enabled: isConnected && !!address },
  });
  return { quorum, isConnected, address };
}
