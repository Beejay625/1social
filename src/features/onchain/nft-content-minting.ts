'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTMint {
  tokenId: string;
  contentHash: string;
  wallet: string;
  timestamp: number;
}

export function useNFTContentMinting() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [mints, setMints] = useState<NFTMint[]>([]);

  const mintContent = async (contentHash: string) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const message = `Mint NFT: ${contentHash}\nWallet: ${address}`;
    const signature = await signMessageAsync({ message });
    
    const mint: NFTMint = {
      tokenId: `0x${Date.now().toString(16)}`,
      contentHash,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setMints([...mints, mint]);
    return mint;
  };

  return { mintContent, mints, isConnected, address };
}

