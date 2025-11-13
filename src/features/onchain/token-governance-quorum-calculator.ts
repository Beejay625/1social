'use client';

/**
 * Token Governance Quorum Calculator
 * Calculate quorum requirements with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface QuorumCalculation {
  proposalId: string;
  totalSupply: string;
  quorumPercentage: number;
  requiredQuorum: string;
  currentVotes: string;
  remainingVotes: string;
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
    
    const message = `Calculate quorum: ${proposalId}`;
    await signMessageAsync({ message });
    
    const requiredQuorum = (BigInt(totalSupply) * BigInt(Math.floor(quorumPercentage * 100))) / BigInt(10000);
    const remainingVotes = requiredQuorum > BigInt(currentVotes) 
      ? (requiredQuorum - BigInt(currentVotes)).toString()
      : '0';
    
    const calculation: QuorumCalculation = {
      proposalId,
      totalSupply,
      quorumPercentage,
      requiredQuorum: requiredQuorum.toString(),
      currentVotes,
      remainingVotes,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
