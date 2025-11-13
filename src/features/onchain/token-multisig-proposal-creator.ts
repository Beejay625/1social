'use client';

/**
 * Token Multisig Proposal Creator
 * Create multisig proposals with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultisigProposal {
  proposalId: string;
  multisigAddress: string;
  target: string;
  value: string;
  calldata: string;
  description: string;
  createdBy: string;
  timestamp: number;
}

export function useTokenMultisigProposalCreator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<MultisigProposal[]>([]);

  const createProposal = async (
    multisigAddress: string,
    target: string,
    value: string,
    calldata: string,
    description: string
  ): Promise<MultisigProposal> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!multisigAddress.startsWith('0x') || !target.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Create multisig proposal: ${multisigAddress}`;
    await signMessageAsync({ message });
    
    const proposal: MultisigProposal = {
      proposalId: `prop-${Date.now()}`,
      multisigAddress,
      target,
      value,
      calldata,
      description,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { createProposal, proposals, address };
}

