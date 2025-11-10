'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface VoteCast {
  proposalId: string;
  voter: string;
  choice: number;
  power: bigint;
  timestamp: number;
}

export function useVoteCastTracker() {
  const { address } = useAccount();
  const { data: vote } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVote',
    args: [address, '0'],
  });
  const [votes, setVotes] = useState<VoteCast[]>([]);

  useEffect(() => {
    if (!address || !vote) return;
    
    const voteCast: VoteCast = {
      proposalId: '0',
      voter: address,
      choice: 1,
      power: BigInt(vote as string),
      timestamp: Date.now(),
    };
    
    setVotes([voteCast]);
  }, [address, vote]);

  return { votes, address };
}
