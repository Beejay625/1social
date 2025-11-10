'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'viem';

export interface TreasuryProposal {
  id: string;
  amount: string;
  recipient: string;
  purpose: string;
  approvals: number;
  threshold: number;
}

export function useMultiSigTreasury() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [proposals, setProposals] = useState<TreasuryProposal[]>([]);

  const createProposal = async (amount: string, recipient: string, purpose: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'submitProposal',
      args: [recipient, parseEther(amount), purpose],
    });

    const proposal: TreasuryProposal = {
      id: txHash || '',
      amount,
      recipient,
      purpose,
      approvals: 1,
      threshold: 3,
    };

    setProposals([...proposals, proposal]);
    return txHash;
  };

  return { createProposal, proposals, isConnected, address };
}

