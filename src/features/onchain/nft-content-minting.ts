'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useNFTContentMinting() {
  const { address } = useAccount();
  const mintContent = async (contentId: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { contentId, mintedBy: address, tokenId: `token_${Date.now()}` };
  };
  return { mintContent };
}
