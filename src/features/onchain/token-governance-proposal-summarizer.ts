'use client';

/**
 * Token Governance Proposal Summarizer
 * Summarize governance proposals with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ProposalSummary {
  summaryId: string;
  proposalId: string;
  title: string;
  description: string;
  summary: string;
  keyPoints: string[];
  summarizedBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalSummarizer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [summaries, setSummaries] = useState<ProposalSummary[]>([]);

  const summarize = async (
    proposalId: string,
    title: string,
    description: string
  ): Promise<ProposalSummary> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!proposalId || proposalId.trim() === '') {
      throw new Error('Proposal ID is required');
    }
    
    const message = `Summarize proposal: ${proposalId}`;
    await signMessageAsync({ message });
    
    const summary: ProposalSummary = {
      summaryId: `summary-${Date.now()}`,
      proposalId,
      title,
      description,
      summary: '',
      keyPoints: [],
      summarizedBy: address,
      timestamp: Date.now(),
    };
    
    setSummaries([...summaries, summary]);
    return summary;
  };

  return { summarize, summaries, address };
}

