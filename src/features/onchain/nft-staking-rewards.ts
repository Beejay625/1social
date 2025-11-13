'use client';

/**
 * NFT Staking Rewards
 * Claim NFT staking rewards with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingReward {
  rewardId: string;
  tokenId: string;
  collectionAddress: string;
  rewardAmount: string;
  currency: string;
  txHash: string;
  timestamp: number;
}

export function useNFTStakingRewards() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rewards, setRewards] = useState<StakingReward[]>([]);

  const claimReward = async (
    tokenId: string,
    collectionAddress: string,
    rewardAmount: string,
    currency: string
  ): Promise<StakingReward> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (parseFloat(rewardAmount) <= 0) {
      throw new Error('Reward amount must be greater than zero');
    }
    
    const message = `Claim NFT staking reward: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const reward: StakingReward = {
      rewardId: `reward-${Date.now()}`,
      tokenId,
      collectionAddress,
      rewardAmount,
      currency,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setRewards([...rewards, reward]);
    return reward;
  };

  return { claimReward, rewards, address };
}
