'use client';
import { useAccount } from 'wagmi';
export function useNFTMarketplace() {
  const { address } = useAccount();
  const listNFT = async (tokenId: string, price: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { tokenId, price, listedBy: address };
  };
  return { listNFT };
}
