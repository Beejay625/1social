'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useTokenRewardsDistributor() {
  const { address } = useAccount();
  const distributeReward = async (recipient: string, amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { recipient, amount, distributedBy: address };
  };
  return { distributeReward };
}
