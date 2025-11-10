'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultiSigProposal {
  id: string;
  proposer: string;
  approvals: string[];
  threshold: number;
  executed: boolean;
  wallet: string;
}

export function useMultiSigProposalManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<MultiSigProposal[]>([]);

  const createProposal = async (threshold: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Proposal: threshold ${threshold}`;
    await signMessageAsync({ message });
    
    const proposal: MultiSigProposal = {
      id: `prop_${Date.now()}`,
      proposer: address,
      approvals: [address],
      threshold,
      executed: false,
      wallet: address,
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { createProposal, proposals, address };
}

