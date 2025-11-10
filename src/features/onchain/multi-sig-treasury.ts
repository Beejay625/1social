'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface TreasuryProposal {
  id: string;
  amount: string;
  recipient: string;
  signatures: string[];
}

export function useMultiSigTreasury() {
  const { address } = useAccount();
  const [proposals, setProposals] = useState<TreasuryProposal[]>([]);

  const createProposal = async (amount: string, recipient: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const proposal: TreasuryProposal = {
      id: `prop_${Date.now()}`,
      amount,
      recipient,
      signatures: [address],
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { createProposal, proposals, address };
}
