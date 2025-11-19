'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentWorkflow {
  workflowId: string;
  steps: string[];
  triggers: string[];
  creator: string;
  active: boolean;
  timestamp: bigint;
}

export function useOnchainContentWorkflowBuilder() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [building, setBuilding] = useState(false);
  const [workflows, setWorkflows] = useState<ContentWorkflow[]>([]);

  const { data: workflowData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getWorkflows',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createWorkflow = async (steps: string[], triggers: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBuilding(true);

    try {
      const message = `Create workflow onchain`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createWorkflow',
        args: [steps, triggers, address],
      });
    } finally {
      setBuilding(false);
    }
  };

  useEffect(() => {
    if (workflowData) {
      const workflow = workflowData as ContentWorkflow;
      setWorkflows(prev => {
        const filtered = prev.filter(w => w.workflowId !== workflow.workflowId);
        return [...filtered, workflow];
      });
    }
  }, [workflowData]);

  return {
    createWorkflow,
    building,
    workflows,
    address,
    isConnected,
    workflowData,
  };
}

