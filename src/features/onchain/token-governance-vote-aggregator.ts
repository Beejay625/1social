'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface VoteAggregation {
  proposalId: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  totalVotes: number;
  quorumMet: boolean;
}

export function useTokenGovernanceVoteAggregator() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [aggregations, setAggregations] = useState<VoteAggregation[]>([]);

  const aggregateVotes = async (proposalId: string) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Aggregate votes for proposal ${proposalId}`;
    await signMessageAsync({ message });
    
    const aggregation: VoteAggregation = {
      proposalId,
      forVotes: 0,
      againstVotes: 0,
      abstainVotes: 0,
      totalVotes: 0,
      quorumMet: false,
    };
    
    setAggregations([...aggregations, aggregation]);
    return aggregation;
  };

  return { 
    aggregateVotes, 
    aggregations, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

