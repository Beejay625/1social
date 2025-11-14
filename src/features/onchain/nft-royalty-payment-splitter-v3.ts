'use client';

/**
 * NFT Royalty Payment Splitter V3
 * Split royalty payments with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RoyaltySplit {
  splitId: string;
  tokenId: string;
  collectionAddress: string;
  recipients: string[];
  shares: number[];
  totalAmount: string;
  splitBy: string;
  timestamp: number;
}

export function useNFTRoyaltyPaymentSplitterV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [splits, setSplits] = useState<RoyaltySplit[]>([]);

  const splitRoyalty = async (
    tokenId: string,
    collectionAddress: string,
    recipients: string[],
    shares: number[],
    totalAmount: string
  ): Promise<RoyaltySplit> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (recipients.length !== shares.length) {
      throw new Error('Recipients and shares arrays must have same length');
    }
    if (shares.reduce((sum, share) => sum + share, 0) !== 100) {
      throw new Error('Shares must sum to 100');
    }
    
    const message = `Split royalty V3: ${tokenId} in ${collectionAddress} amount ${totalAmount}`;
    await signMessageAsync({ message });
    
    const split: RoyaltySplit = {
      splitId: `split-v3-${Date.now()}`,
      tokenId,
      collectionAddress,
      recipients,
      shares,
      totalAmount,
      splitBy: address,
      timestamp: Date.now(),
    };
    
    setSplits([...splits, split]);
    return split;
  };

  return { splitRoyalty, splits, address };
}
