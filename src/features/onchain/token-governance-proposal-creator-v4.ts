'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalData {
  title: string;
  description: string;
  targets: string[];
  values: bigint[];
  calldatas: string[];
}

export function useTokenGovernanceProposalCreatorV4() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);

  const { data: proposalThreshold } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'proposalThreshold',
  });

  const createProposal = async (governanceAddress: string, data: ProposalData) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create governance proposal: ${data.title}`;
      await signMessageAsync({ message });

      await writeContract({
        address: governanceAddress as `0x${string}`,
        abi: [],
        functionName: 'propose',
        args: [data.targets, data.values, data.calldatas, data.description],
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    createProposal,
    creating,
    address,
    isConnected,
    proposalThreshold,
  };
}

