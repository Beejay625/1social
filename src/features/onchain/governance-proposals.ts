'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useGovernanceProposals() {
  const { address, isConnected } = useAccount();
  const { data: proposals } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getProposals',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });
  return { proposals, isConnected, address };
}
