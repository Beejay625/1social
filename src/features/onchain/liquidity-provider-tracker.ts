'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useLiquidityProviderTracker() {
  const { address, isConnected } = useAccount();
  const { data: lpPosition } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getLPPosition',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });
  return { lpPosition, isConnected, address };
}
