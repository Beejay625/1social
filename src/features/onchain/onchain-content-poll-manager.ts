'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentPoll {
  pollId: string;
  contentHash: string;
  options: string[];
  votes: bigint[];
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentPollManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [voting, setVoting] = useState(false);
  const [polls, setPolls] = useState<ContentPoll[]>([]);

  const { data: pollData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPolls',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createPoll = async (contentHash: string, options: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setVoting(true);

    try {
      const message = `Create poll onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createPoll',
        args: [contentHash, options, address],
      });
    } finally {
      setVoting(false);
    }
  };

  const voteOnPoll = async (pollId: string, optionIndex: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setVoting(true);

    try {
      const message = `Vote on poll onchain: ${pollId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'voteOnPoll',
        args: [pollId, optionIndex, address],
      });
    } finally {
      setVoting(false);
    }
  };

  useEffect(() => {
    if (pollData) {
      const poll = pollData as ContentPoll;
      setPolls(prev => {
        const filtered = prev.filter(p => p.pollId !== poll.pollId);
        return [...filtered, poll];
      });
    }
  }, [pollData]);

  return {
    createPoll,
    voteOnPoll,
    voting,
    polls,
    address,
    isConnected,
    pollData,
  };
}

