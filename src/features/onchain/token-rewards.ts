'use client';
import { useAccount } from 'wagmi';
export function useTokenRewards() {
  const { address } = useAccount();
  const issueReward = async (type: 'erc20' | 'nft', amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { type, amount, issuedBy: address };
  };
  return { issueReward };
}
