'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useNFTMetadataFetcher() {
  const { address, isConnected } = useAccount();
  const { data: metadata } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'tokenURI',
    args: ['0'],
    query: { enabled: isConnected && !!address },
  });
  return { metadata, isConnected, address };
}
