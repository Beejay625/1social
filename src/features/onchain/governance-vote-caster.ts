'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface VoteCast {
  proposalId: string;
  support: boolean;
  reason: string;
  txHash: string;
}

export function useGovernanceVoteCaster() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [votes, setVotes] = useState<VoteCast[]>([]);

  const castVote = async (proposalId: string, support: boolean, reason: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'castVote',
      args: [BigInt(proposalId), support, reason],
    });

    const vote: VoteCast = {
      proposalId,
      support,
      reason,
      txHash: txHash || '',
    };

    setVotes([...votes, vote]);
    return txHash;
  };

  return { castVote, votes, address };
}

