'use client';

/**
 * Token Governance Proposal Creator V2
 * Create governance proposals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Proposal {
  proposalId: string;
  title: string;
  description: string;
  targets: string[];
  values: string[];
  calldatas: string[];
  createdBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalCreatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const createProposal = async (
    title: string,
    description: string,
    targets: string[],
    values: string[],
    calldatas: string[]
  ): Promise<Proposal> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (targets.length !== values.length || targets.length !== calldatas.length) {
      throw new Error('Targets, values, and calldatas arrays must have the same length');
    }
    
    const message = `Create proposal: ${title}`;
    await signMessageAsync({ message });
    
    const proposal: Proposal = {
      proposalId: `proposal-${Date.now()}`,
      title,
      description,
      targets,
      values,
      calldatas,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { createProposal, proposals, address };
}

