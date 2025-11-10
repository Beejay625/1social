'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useContractWriter() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const writeContract = async (contractAddress: string, abi: any, functionName: string, args?: any[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await writeContractAsync({
      address: contractAddress as `0x${string}`,
      abi,
      functionName,
      args,
    });
  };
  return { writeContract, isConnected, address };
}

