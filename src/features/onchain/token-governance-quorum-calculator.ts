'use client';

/**
 * Token Governance Quorum Calculator
 * Calculate quorum requirements with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface QuorumCalculation {
  calculationId: string;
  proposalId: string;
  totalSupply: string;
  quorumPercentage: number;
  requiredVotes: string;
  currentVotes: string;
  quorumMet: boolean;
  timestamp: number;
}

export function useTokenGovernanceQuorumCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<QuorumCalculation[]>([]);

  const calculate = async (
    proposalId: string,
    totalSupply: string,
    quorumPercentage: number,
    currentVotes: string
  ): Promise<QuorumCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (quorumPercentage < 0 || quorumPercentage > 100) {
      throw new Error('Quorum percentage must be between 0 and 100');
    }
    
    const message = `Calculate quorum: ${proposalId} ${quorumPercentage}%`;
    await signMessageAsync({ message });
    
    const requiredVotes = (BigInt(totalSupply) * BigInt(Math.floor(quorumPercentage * 100))) / BigInt(10000);
    const quorumMet = BigInt(currentVotes) >= requiredVotes;
    
    const calculation: QuorumCalculation = {
      calculationId: `quorum-${Date.now()}`,
      proposalId,
      totalSupply,
      quorumPercentage,
      requiredVotes: requiredVotes.toString(),
      currentVotes,
      quorumMet,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
