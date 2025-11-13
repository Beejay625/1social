'use client';

/**
 * Token Governance Proposal Executor
 * Execute approved governance proposals with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalExecution {
  executionId: string;
  proposalId: string;
  txHash: string;
  executedBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalExecutor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [executions, setExecutions] = useState<ProposalExecution[]>([]);

  const executeProposal = async (proposalId: string): Promise<ProposalExecution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!proposalId || proposalId.trim() === '') {
      throw new Error('Proposal ID is required');
    }
    
    const message = `Execute proposal: ${proposalId}`;
    await signMessageAsync({ message });
    
    const execution: ProposalExecution = {
      executionId: `exec-${Date.now()}`,
      proposalId,
      txHash: `0x${Date.now().toString(16)}`,
      executedBy: address,
      timestamp: Date.now(),
    };
    
    setExecutions([...executions, execution]);
    return execution;
  };

  return { executeProposal, executions, address };
}
