'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useContractMetadataReader() {
  const { address, isConnected } = useAccount();
  const { data: metadata } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'name',
    query: { enabled: isConnected && !!address },
  });
  return { metadata, isConnected, address };
}
