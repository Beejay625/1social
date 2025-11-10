'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MintedNFT {
  tokenId: string;
  metadata: string;
  minter: string;
  timestamp: number;
}

export function useNFTMintingService() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [mints, setMints] = useState<MintedNFT[]>([]);

  const mintNFT = async (metadata: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Mint NFT: ${metadata}`;
    await signMessageAsync({ message });
    
    const mint: MintedNFT = {
      tokenId: `0x${Date.now().toString(16)}`,
      metadata,
      minter: address,
      timestamp: Date.now(),
    };
    
    setMints([...mints, mint]);
    return mint;
  };

  return { mintNFT, mints, address };
}
