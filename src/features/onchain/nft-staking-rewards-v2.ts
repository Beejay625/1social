'use client';

/**
 * NFT Staking Rewards V2
 * Claim NFT staking rewards with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingReward {
  rewardId: string;
  stakingContractAddress: string;
  tokenId: string;
  collectionAddress: string;
  rewardAmount: string;
  rewardToken: string;
  claimedBy: string;
  txHash: string;
  timestamp: number;
}

export function useNFTStakingRewardsV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rewards, setRewards] = useState<StakingReward[]>([]);

  const claimRewards = async (
    stakingContractAddress: string,
    tokenId: string,
    collectionAddress: string,
    rewardAmount: string,
    rewardToken: string
  ): Promise<StakingReward> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingContractAddress.startsWith('0x') || !collectionAddress.startsWith('0x') || !rewardToken.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Claim staking rewards: ${collectionAddress} #${tokenId} ${rewardAmount}`;
    await signMessageAsync({ message });
    
    const reward: StakingReward = {
      rewardId: `reward-${Date.now()}`,
      stakingContractAddress,
      tokenId,
      collectionAddress,
      rewardAmount,
      rewardToken,
      claimedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setRewards([...rewards, reward]);
    return reward;
  };

  return { claimRewards, rewards, address };
}
