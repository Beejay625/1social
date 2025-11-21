'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface FraudResponsePlan {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type FraudResponsePlanPayload = Partial<FraudResponsePlan> & {
  rationale?: string;
};

export function useOnchainFraudResponsePlaybook() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [plans, setPlans] = useState<FraudResponsePlan[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getFraudResponsePlans',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const submitFraudResponsePlan = async (payload: FraudResponsePlanPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Submit fraud response plan: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'submitFraudResponsePlan',
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

  const activateFraudResponsePlan = async (payload: FraudResponsePlanPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Activate fraud response plan: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'activateFraudResponsePlan',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as FraudResponsePlan;
      setPlans(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    plans,
    processing,
    submitFraudResponsePlan,
    activateFraudResponsePlan,
    address,
    isConnected,
  };
}
