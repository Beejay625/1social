'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useTokenSupplyMonitorV2() {
  const { address, isConnected } = useAccount();
  const { data: totalSupply } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalSupply',
    query: { enabled: isConnected && !!address },
  });
  return { totalSupply, isConnected, address };
}


