'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useContractReader() {
  const { address, isConnected } = useAccount();
  const readContract = async (contractAddress: string, abi: any, functionName: string, args?: any[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return { contractAddress, functionName, args };
  };
  return { readContract, isConnected, address };
}

