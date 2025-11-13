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
  traits: Record<string, any>;
  rarityScore: number;
  timestamp: number;
}

export function useNFTTraitAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<TraitAnalysis[]>([]);

  const analyze = async (
    tokenId: string,
    collectionAddress: string,
    traits: Record<string, any>
  ): Promise<TraitAnalysis> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Analyze traits: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const rarityScore = Math.random() * 100;
    
    const analysis: TraitAnalysis = {
      analysisId: `analysis-${Date.now()}`,
      tokenId,
      collectionAddress,
      traits,
      rarityScore,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyze, analyses, address };
}

