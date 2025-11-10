'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MintedContent {
  contentId: string;
  nftId: string;
  metadata: string;
  wallet: string;
  timestamp: number;
}

export function useNFTContentMinting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [minted, setMinted] = useState<MintedContent[]>([]);

  const mintContent = async (contentId: string, metadata: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Mint Content NFT: ${contentId}`;
    await signMessageAsync({ message });
    
    const mintedContent: MintedContent = {
      contentId,
      nftId: `nft_${Date.now()}`,
      metadata,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setMinted([...minted, mintedContent]);
    return mintedContent;
  };

  return { mintContent, minted, address };
}
