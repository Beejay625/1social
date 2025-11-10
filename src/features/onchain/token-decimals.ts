'use client';
import { useReadContract } from 'wagmi';
export function useTokenDecimals() {
  const { data: decimals } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'decimals',
  });
  return { decimals };
}

