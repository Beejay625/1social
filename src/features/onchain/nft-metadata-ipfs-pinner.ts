'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface IPFSPin {
  tokenId: string;
  collectionAddress: string;
  metadataUri: string;
  ipfsHash: string;
  pinnedAt: number;
}

export function useNFTMetadataIPFSPinner() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [pins, setPins] = useState<IPFSPin[]>([]);

  const pinMetadata = async (tokenId: string, collectionAddress: string, metadataUri: string, ipfsHash: string) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Pin metadata to IPFS for token ${tokenId}: ${ipfsHash}`;
    await signMessageAsync({ message });
    
    const pin: IPFSPin = {
      tokenId,
      collectionAddress,
      metadataUri,
      ipfsHash,
      pinnedAt: Date.now(),
    };
    
    setPins([...pins, pin]);
    return pin;
  };

  return { 
    pinMetadata, 
    pins, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

