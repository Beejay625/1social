'use client';
import { useAccount } from 'wagmi';
export function useNFTMintingService() {
  const { address } = useAccount();
  const createNFT = async (metadata: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { metadata, creator: address };
  };
  return { createNFT };
}
