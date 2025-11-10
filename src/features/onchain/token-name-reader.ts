'use client';
import { useReadContract } from 'wagmi';
export function useTokenNameReader() {
  const { data: name } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'name',
  });
  return { name };
}
