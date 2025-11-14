'use client';

/**
 * NFT Staking Rewards
 * Claim NFT staking rewards with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface StakingReward {
  rewardId: string;
  tokenId: string;
  collectionAddress: string;
  rewardAmount: string;
  claimedBy: string;
  timestamp: number;
}

export function useNFTStakingRewards() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [rewards, setRewards] = useState<StakingReward[]>([]);

  const claimReward = async (
    tokenId: string,
    collectionAddress: string
  ): Promise<StakingReward> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Claim staking reward: ${tokenId} in ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const rewardAmount = (Math.random() * 100 + 1).toFixed(4);
    
    const reward: StakingReward = {
      rewardId: `reward-${Date.now()}`,
      tokenId,
      collectionAddress,
      rewardAmount,
      claimedBy: address,
      timestamp: Date.now(),
    };
    
    setRewards([...rewards, reward]);
    return reward;
  };

  return { claimReward, rewards, address };
}
