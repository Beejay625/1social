'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useNFTTransfer() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const transferNFT = async (nftAddress: string, to: string, tokenId: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await writeContractAsync({
      address: nftAddress as `0x${string}`,
      abi: [],
      functionName: 'safeTransferFrom',
      args: [address, to, tokenId],
    });
  };
  return { transferNFT, isConnected, address };
}


