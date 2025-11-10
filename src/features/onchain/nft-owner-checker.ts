'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useNFTOwnerChecker() {
  const { address, isConnected } = useAccount();
  const { data: owner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'ownerOf',
    args: ['0'],
    query: { enabled: isConnected && !!address },
  });
  return { owner, isConnected, address };
}
