'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VoteDelegation {
  id: string;
  delegate: string;
  proposalId: string;
  power: bigint;
  delegated: boolean;
}

export function useVoteDelegation() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [delegations, setDelegations] = useState<VoteDelegation[]>([]);

  const delegateVote = async (delegate: string, proposalId: string, power: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Delegate vote: ${delegate} proposal ${proposalId} power ${power}`;
    const signature = await signMessageAsync({ message });

    const delegation: VoteDelegation = {
      id: signature,
      delegate,
      proposalId,
      power: BigInt(power),
      delegated: true,
    };

    setDelegations([...delegations, delegation]);
    return delegation;
  };

  return { delegateVote, delegations, address };
}


