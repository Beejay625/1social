'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MetadataUpdate {
  tokenId: bigint;
  metadata: Record<string, string>;
  freeze: boolean;
}

export function useNFTCollectionMetadataManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const updateMetadata = async (collectionAddress: string, update: MetadataUpdate) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Update metadata for token ${update.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'updateMetadata',
        args: [update.tokenId, JSON.stringify(update.metadata), update.freeze],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    updateMetadata,
    managing,
    address,
    isConnected,
  };
}

