'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useNFTApprovalChecker() {
  const { address, isConnected } = useAccount();
  const { data: approved } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getApproved',
    args: ['0'],
    query: { enabled: isConnected && !!address },
  });
  return { approved, isConnected, address };
}
