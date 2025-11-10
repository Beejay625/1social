'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface DAOVote {
  proposalId: string;
  voter: string;
  choice: number;
  weight: bigint;
  timestamp: number;
}

export function useDAOVoting() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [votes, setVotes] = useState<DAOVote[]>([]);

  const { data: votingPower } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVotingPower',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const castVote = async (proposalId: string, choice: number) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'vote',
      args: [proposalId, choice],
    });

    const vote: DAOVote = {
      proposalId,
      voter: address,
      choice,
      weight: votingPower as bigint || BigInt(0),
      timestamp: Date.now(),
    };

    setVotes([...votes, vote]);
    return txHash;
  };

  return { castVote, votes, votingPower, isConnected, address };
}
