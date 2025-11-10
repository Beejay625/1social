'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useNFTApproval() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const approveNFT = async (nftAddress: string, operator: string, tokenId: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await writeContractAsync({
      address: nftAddress as `0x${string}`,
      abi: [],
      functionName: 'approve',
      args: [operator, tokenId],
    });
  };
  return { approveNFT, isConnected, address };
}

