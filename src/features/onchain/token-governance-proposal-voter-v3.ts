'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VoteData {
  proposalId: number;
  support: boolean;
  votingPower: bigint;
}

export function useTokenGovernanceProposalVoterV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [voting, setVoting] = useState(false);

  const { data: votingPower } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVotes',
    args: [address],
  });

  const { data: hasVoted } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'hasVoted',
    args: [BigInt(0), address],
  });

  const castVote = async (tokenAddress: string, vote: VoteData) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (hasVoted) {
      throw new Error('Already voted on this proposal');
    }
    setVoting(true);

    try {
      const message = `Cast vote: ${vote.support ? 'For' : 'Against'} proposal ${vote.proposalId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'castVote',
        args: [vote.proposalId, vote.support],
      });
    } finally {
      setVoting(false);
    }
  };

  const castVoteWithReason = async (tokenAddress: string, vote: VoteData, reason: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setVoting(true);

    try {
      const message = `Cast vote with reason: ${reason}`;
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'castVoteWithReason',
        args: [vote.proposalId, vote.support, reason],
      });
    } finally {
      setVoting(false);
    }
  };

  return {
    castVote,
    castVoteWithReason,
    voting,
    address,
    isConnected,
    votingPower,
    hasVoted,
  };
}

