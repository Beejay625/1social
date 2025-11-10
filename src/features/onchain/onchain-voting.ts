'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Vote {
  proposalId: string;
  choice: number;
  power: number;
  wallet: string;
}

export function useOnchainVoting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [votes, setVotes] = useState<Vote[]>([]);

  const castVote = async (proposalId: string, choice: number, power: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Vote: ${proposalId} choice ${choice} power ${power}`;
    await signMessageAsync({ message });
    
    const vote: Vote = {
      proposalId,
      choice,
      power,
      wallet: address,
    };
    
    setVotes([...votes, vote]);
    return vote;
  };

  return { castVote, votes, address };
}
