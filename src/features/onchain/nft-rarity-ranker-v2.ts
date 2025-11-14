'use client';

/**
 * NFT Rarity Ranker V2
 * Enhanced NFT rarity ranking with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RarityRank {
  rankId: string;
  tokenId: string;
  collectionAddress: string;
  rarityScore: number;
  rank: number;
  traits: Record<string, string>;
  rankedBy: string;
  timestamp: number;
}

export function useNFTRarityRankerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [ranks, setRanks] = useState<RarityRank[]>([]);

  const rankNFT = async (
    tokenId: string,
    collectionAddress: string,
    traits: Record<string, string>
  ): Promise<RarityRank> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Rank NFT: ${tokenId} in collection ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const rarityScore = Math.random() * 100;
    const rank = Math.floor(Math.random() * 1000) + 1;
    
    const rankRecord: RarityRank = {
      rankId: `rank-${Date.now()}`,
      tokenId,
      collectionAddress,
      rarityScore,
      rank,
      traits,
      rankedBy: address,
      timestamp: Date.now(),
    };
    
    setRanks([...ranks, rankRecord]);
    return rankRecord;
  };

  const getTopRare = async (
    collectionAddress: string,
    limit: number
  ): Promise<RarityRank[]> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Get top ${limit} rare NFTs from ${collectionAddress}`;
    await signMessageAsync({ message });
    
    return ranks
      .filter(r => r.collectionAddress === collectionAddress)
      .sort((a, b) => b.rarityScore - a.rarityScore)
      .slice(0, limit);
  };

  return { rankNFT, getTopRare, ranks, address };
}

