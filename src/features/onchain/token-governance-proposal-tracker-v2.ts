'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface Proposal {
  proposalId: string;
  title: string;
  description: string;
  proposer: string;
  startBlock: number;
  endBlock: number;
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'executed';
}

export function useTokenGovernanceProposalTrackerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const trackProposal = async (proposalId: string, title: string, description: string, proposer: string, startBlock: number, endBlock: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Track proposal: ${title}`;
    await signMessageAsync({ message });
    
    const proposal: Proposal = {
      proposalId,
      title,
      description,
      proposer,
      startBlock,
      endBlock,
      status: 'pending',
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  const updateStatus = (proposalId: string, status: Proposal['status']) => {
    setProposals(proposals.map(p => p.proposalId === proposalId ? { ...p, status } : p));
  };

  return { 
    trackProposal, 
    updateStatus,
    proposals, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

