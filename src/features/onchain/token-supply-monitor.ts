'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useTokenSupplyMonitor() {
  const { address, isConnected } = useAccount();
  const { data: supply } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalSupply',
    query: { enabled: isConnected && !!address },
  });
  return { supply, isConnected, address };
}
