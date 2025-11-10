'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useMultiCallExecutor() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const executeMultiCall = async (calls: Array<{ target: string; data: string }>) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return { calls, executedBy: address };
  };
  return { executeMultiCall, isConnected, address };
}

