'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useRiskCalculator() {
  const { address, isConnected } = useAccount();
  const { data: riskScore } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'calculateRisk',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });
  return { riskScore, isConnected, address };
}
