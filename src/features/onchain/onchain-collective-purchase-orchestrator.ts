'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CollectivePurchasePlan {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type CollectivePurchasePlanPayload = Partial<CollectivePurchasePlan> & {
  rationale?: string;
};

export function useOnchainCollectivePurchaseOrchestrator() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [plans, setPlans] = useState<CollectivePurchasePlan[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCollectivePurchasePlans',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const proposeCollectivePurchasePlan = async (payload: CollectivePurchasePlanPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Propose collective purchase plan: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'proposeCollectivePurchasePlan',
        args: [
          payload.owner || address,
          payload.status || '',
          payload.weight ?? 0n,
          payload.metadata || '',
        ],
      });
    } finally {
      setProcessing(false);
    }
  };

  const executeCollectivePurchasePlan = async (payload: CollectivePurchasePlanPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Execute collective purchase plan: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'executeCollectivePurchasePlan',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as CollectivePurchasePlan;
      setPlans(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    plans,
    processing,
    proposeCollectivePurchasePlan,
    executeCollectivePurchasePlan,
    address,
    isConnected,
  };
}
