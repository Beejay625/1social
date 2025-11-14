'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTMetadata {
  tokenId: bigint;
  name: string;
  description: string;
  image: string;
  attributes: Record<string, string>;
}

export function useNFTMetadataBatchFetcherV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [metadata, setMetadata] = useState<NFTMetadata[]>([]);
  const [fetching, setFetching] = useState(false);

  const fetchBatch = async (collectionAddress: string, tokenIds: bigint[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFetching(true);

    try {
      const message = `Fetch metadata for ${tokenIds.length} NFTs`;
      await signMessageAsync({ message });

      const fetched: NFTMetadata[] = tokenIds.map(tokenId => ({
        tokenId,
        name: `NFT #${tokenId}`,
        description: `Metadata for token ${tokenId}`,
        image: `https://example.com/nft/${tokenId}.png`,
        attributes: {},
      }));

      setMetadata(fetched);
      return fetched;
    } finally {
      setFetching(false);
    }
  };

  return {
    fetchBatch,
    metadata,
    fetching,
    address,
    isConnected,
  };
}

