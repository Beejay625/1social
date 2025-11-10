'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface NFTMintRequest {
  contentHash: string;
  metadata: Record<string, any>;
  recipient: string;
}

export function useNFTMintingService() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [mintedNFTs, setMintedNFTs] = useState<string[]>([]);

  const mintContentNFT = async (request: NFTMintRequest) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'mint',
      args: [request.recipient, request.contentHash],
    });

    setMintedNFTs([...mintedNFTs, txHash || '']);
    return txHash;
  };

  return { mintContentNFT, mintedNFTs, isConnected, address };
}

