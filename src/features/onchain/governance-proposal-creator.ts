'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ProposalCreation {
  targets: string[];
  values: bigint[];
  calldatas: string[];
  description: string;
  created: boolean;
}

export function useGovernanceProposalCreator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [proposals, setProposals] = useState<ProposalCreation[]>([]);

  const createProposal = async (targets: string[], values: string[], calldatas: string[], description: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'propose',
      args: [targets, values.map(v => BigInt(v)), calldatas, description],
    });

    const proposal: ProposalCreation = {
      targets,
      values: values.map(v => BigInt(v)),
      calldatas,
      description,
      created: true,
    };

    setProposals([...proposals, proposal]);
    return txHash;
  };

  return { createProposal, proposals, address };
}


