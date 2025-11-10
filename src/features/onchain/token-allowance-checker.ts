'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useTokenAllowanceChecker() {
  const { address, isConnected } = useAccount();
  const { data: allowance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'allowance',
    args: address ? [address, '0x'] : undefined,
    query: { enabled: isConnected && !!address },
  });
  return { allowance, isConnected, address };
}
