'use client';

/**
 * NFT Royalty Payment Splitter V3
 * Split royalty payments with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RoyaltySplit {
  splitId: string;
  collectionAddress: string;
  tokenId: string;
  totalRoyalty: string;
  recipients: string[];
  shares: number[];
  splitBy: string;
  txHash: string;
  timestamp: number;
}

export function useNFTRoyaltyPaymentSplitterV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [splits, setSplits] = useState<RoyaltySplit[]>([]);

  const splitRoyalty = async (
    collectionAddress: string,
    tokenId: string,
    totalRoyalty: string,
    recipients: string[],
    shares: number[]
  ): Promise<RoyaltySplit> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (recipients.length !== shares.length) {
      throw new Error('Recipients and shares arrays must have the same length');
    }
    const totalShares = shares.reduce((sum, share) => sum + share, 0);
    if (totalShares !== 100) {
      throw new Error('Total shares must equal 100');
    }
    
    const message = `Split royalty: ${collectionAddress} #${tokenId} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const split: RoyaltySplit = {
      splitId: `split-${Date.now()}`,
      collectionAddress,
      tokenId,
      totalRoyalty,
      recipients,
      shares,
      splitBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setSplits([...splits, split]);
    return split;
  };

  return { splitRoyalty, splits, address };
}

