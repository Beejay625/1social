'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface VoteDelegation {
  delegate: string;
  delegated: boolean;
  votingPower: bigint;
}

export function useVoteDelegator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [delegations, setDelegations] = useState<VoteDelegation[]>([]);

  const delegateVotes = async (delegate: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'delegate',
      args: [delegate],
    });

    const delegation: VoteDelegation = {
      delegate,
      delegated: true,
      votingPower: BigInt(0),
    };

    setDelegations([...delegations, delegation]);
    return txHash;
  };

  return { delegateVotes, delegations, address };
}


