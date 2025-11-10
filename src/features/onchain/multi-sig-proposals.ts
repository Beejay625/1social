'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultiSigProposal {
  id: string;
  to: string;
  value: bigint;
  data: string;
  signatures: string[];
  executed: boolean;
}

export function useMultiSigProposals() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<MultiSigProposal[]>([]);

  const createProposal = async (to: string, value: string, data: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Proposal: ${to} ${value} ${data}`;
    const signature = await signMessageAsync({ message });

    const proposal: MultiSigProposal = {
      id: `prop_${Date.now()}`,
      to,
      value: BigInt(value),
      data,
      signatures: [signature],
      executed: false,
    };

    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { createProposal, proposals, address };
}

