'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  estimatedGas: bigint;
}

export interface ProposalData {
  targets: string[];
  values: bigint[];
  calldatas: string[];
  description: string;
}

export function useTokenGovernanceProposalValidator() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validating, setValidating] = useState(false);

  const { data: proposalThreshold } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'proposalThreshold',
  });

  const validateProposal = async (proposal: ProposalData): Promise<ProposalValidation> => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setValidating(true);

    try {
      const message = `Validate governance proposal`;
      await signMessageAsync({ message });

      const errors: string[] = [];
      const warnings: string[] = [];

      if (proposal.targets.length === 0) {
        errors.push('At least one target is required');
      }

      if (proposal.targets.length !== proposal.values.length || proposal.targets.length !== proposal.calldatas.length) {
        errors.push('Targets, values, and calldatas must have same length');
      }

      if (!proposal.description || proposal.description.trim().length === 0) {
        warnings.push('Description is recommended');
      }

      const validation: ProposalValidation = {
        valid: errors.length === 0,
        errors,
        warnings,
        estimatedGas: BigInt(200000),
      };

      return validation;
    } finally {
      setValidating(false);
    }
  };

  return {
    validateProposal,
    validating,
    address,
    isConnected,
    proposalThreshold,
  };
}

