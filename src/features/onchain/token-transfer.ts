'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useTokenTransfer() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const transfer = async (tokenAddress: string, to: string, amount: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await writeContractAsync({
      address: tokenAddress as `0x${string}`,
      abi: [],
      functionName: 'transfer',
      args: [to, amount],
    });
  };
  return { transfer, isConnected, address };
}

