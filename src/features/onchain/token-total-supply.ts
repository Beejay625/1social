'use client';
import { useReadContract } from 'wagmi';
export function useTokenTotalSupply() {
  const { data: totalSupply } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalSupply',
  });
  return { totalSupply };
}

