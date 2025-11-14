'use client';
import { useReadContract } from 'wagmi';
export function useTokenSymbol() {
  const { data: symbol } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'symbol',
  });
  return { symbol };
}


