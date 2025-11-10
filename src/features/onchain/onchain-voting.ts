'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface Vote {
  proposalId: string;
  support: boolean;
  weight: bigint;
  timestamp: number;
}

export function useOnchainVoting() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [votes, setVotes] = useState<Vote[]>([]);

  const { data: votingPower } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVotingPower',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const castVote = async (proposalId: string, support: boolean) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'vote',
      args: [proposalId, support],
    });

    const vote: Vote = {
      proposalId,
      support,
      weight: votingPower as bigint || BigInt(0),
      timestamp: Date.now(),
    };

    setVotes([...votes, vote]);
    return txHash;
  };

  return { castVote, votes, votingPower, isConnected, address };
}

