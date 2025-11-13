'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTMetadata {
  tokenId: string;
  name: string;
  description: string;
  image: string;
  attributes: Record<string, any>;
}

export function useNFTMetadataBatchFetcher() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [metadataList, setMetadataList] = useState<NFTMetadata[]>([]);

  const fetchBatch = async (tokenIds: string[], collectionAddress: string): Promise<NFTMetadata[]> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Fetch NFT metadata batch: ${collectionAddress} ${tokenIds.length} tokens`;
    await signMessageAsync({ message });
    
    const metadata: NFTMetadata[] = tokenIds.map((tokenId) => ({
      tokenId,
      name: `NFT #${tokenId}`,
      description: `NFT metadata for token ${tokenId}`,
      image: `https://example.com/nft/${tokenId}.png`,
      attributes: { trait_type: 'value', value: 'example' },
    }));
    
    setMetadataList([...metadataList, ...metadata]);
    return metadata;
  };

  return { fetchBatch, metadataList, address };
}

