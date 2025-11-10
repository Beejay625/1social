'use client';

import { useAccount, useWriteContract, useBalance } from 'wagmi';
import { useState } from 'react';

export function useStakeBackedBoosts() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { writeContractAsync } = useWriteContract();
  const [stakedPosts, setStakedPosts] = useState<Map<string, string>>(new Map());

  const stakeForBoost = async (postId: string, amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    if (Number(balance?.value || 0) < Number(amount)) {
      throw new Error('Insufficient balance');
    }
    
    setStakedPosts(new Map(stakedPosts.set(postId, amount)));
    return { postId, amount, staker: address };
  };

  return { stakeForBoost, stakedPosts, balance };
}

