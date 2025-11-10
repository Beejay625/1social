'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useTokenPriceFetcher() {
  const { address, isConnected } = useAccount();
  const { data: price } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'latestRoundData',
    query: { enabled: isConnected && !!address },
  });
  return { price, isConnected, address };
}
