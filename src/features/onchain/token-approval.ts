'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useTokenApproval() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const approveToken = async (tokenAddress: string, spender: string, amount: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await writeContractAsync({
      address: tokenAddress as `0x${string}`,
      abi: [],
      functionName: 'approve',
      args: [spender, amount],
    });
  };
  return { approveToken, isConnected, address };
}


