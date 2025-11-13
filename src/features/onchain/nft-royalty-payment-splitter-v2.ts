'use client';

/**
 * NFT Royalty Payment Splitter V2
 * Split royalty payments among multiple recipients with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RoyaltySplit {
  splitId: string;
  tokenId: string;
  collectionAddress: string;
  saleAmount: string;
  royaltyAmount: string;
  recipients: string[];
  shares: number[];
  timestamp: number;
}

export function useNFTRoyaltyPaymentSplitterV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [splits, setSplits] = useState<RoyaltySplit[]>([]);

  const splitRoyalty = async (
    tokenId: string,
    collectionAddress: string,
    saleAmount: string,
    royaltyAmount: string,
    recipients: string[],
    shares: number[]
  ): Promise<RoyaltySplit> => {
    if (!address) throw new Error('Reown wallet not connected');
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
      tokenId,
      collectionAddress,
      saleAmount,
      royaltyAmount,
      recipients,
      shares,
      timestamp: Date.now(),
    };
    
    setSplits([...splits, split]);
    return split;
  };

  return { splitRoyalty, splits, address };
}

