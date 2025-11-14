'use client';

/**
 * NFT Trait Analyzer
 * Analyze NFT traits and rarity with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TraitAnalysis {
  analysisId: string;
  tokenId: string;
  collectionAddress: string;
  traits: Record<string, string>;
  rarityScore: number;
  analyzedBy: string;
  timestamp: number;
}

export function useNFTTraitAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<TraitAnalysis[]>([]);

  const analyzeTraits = async (
    tokenId: string,
    collectionAddress: string,
    traits: Record<string, string>
  ): Promise<TraitAnalysis> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Analyze traits: ${tokenId} in ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const rarityScore = Math.random() * 100;
    
    const analysis: TraitAnalysis = {
      analysisId: `trait-${Date.now()}`,
      tokenId,
      collectionAddress,
      traits,
      rarityScore,
      analyzedBy: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeTraits, analyses, address };
}
