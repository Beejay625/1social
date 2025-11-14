'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ExecutedProposal {
  proposalId: string;
  executor: string;
  actions: string[];
  timestamp: number;
}

export function useProposalExecution() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [executions, setExecutions] = useState<ExecutedProposal[]>([]);

  const executeProposal = async (proposalId: string, actions: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'execute',
      args: [proposalId, actions],
    });

    const execution: ExecutedProposal = {
      proposalId,
      executor: address,
      actions,
      timestamp: Date.now(),
    };

    setExecutions([...executions, execution]);
    return txHash;
  };

  return { executeProposal, executions, address };
}


