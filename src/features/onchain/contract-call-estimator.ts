'use client';
import { useAccount, useEstimateGas } from 'wagmi';
export function useContractCallEstimator() {
  const { address, isConnected } = useAccount();
  const { data: gasEstimate } = useEstimateGas({
    to: '0x' as `0x${string}`,
    query: { enabled: isConnected && !!address },
  });
  return { gasEstimate, isConnected, address };
}
