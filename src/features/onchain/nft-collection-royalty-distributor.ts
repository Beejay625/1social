'use client';

/**
 * NFT Collection Royalty Distributor
 * Distribute royalties to collection creators with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RoyaltyDistribution {
  distributionId: string;
  collectionAddress: string;
  salePrice: string;
  royaltyAmount: string;
  recipient: string;
  distributedBy: string;
  timestamp: number;
}

export function useNFTCollectionRoyaltyDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [distributions, setDistributions] = useState<RoyaltyDistribution[]>([]);

  const distribute = async (
    collectionAddress: string,
    salePrice: string,
    royaltyPercentage: number,
    recipient: string
  ): Promise<RoyaltyDistribution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !recipient.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (royaltyPercentage < 0 || royaltyPercentage > 100) {
      throw new Error('Royalty percentage must be between 0 and 100');
    }
    
    const message = `Distribute royalty: ${collectionAddress} ${royaltyPercentage}% to ${recipient}`;
    await signMessageAsync({ message });
    
    const royaltyAmount = (parseFloat(salePrice) * royaltyPercentage / 100).toString();
    
    const distribution: RoyaltyDistribution = {
      distributionId: `royalty-${Date.now()}`,
      collectionAddress,
      salePrice,
      royaltyAmount,
      recipient,
      distributedBy: address,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distribute, distributions, address };
}

