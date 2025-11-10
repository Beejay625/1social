'use client';
import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
export function usePortfolioRebalancer() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const rebalance = async (allocations: Record<string, number>) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Rebalance:${JSON.stringify(allocations)}`;
    await signMessageAsync({ message });
    return { allocations, rebalancedBy: address };
  };
  return { rebalance, isConnected, address };
}
