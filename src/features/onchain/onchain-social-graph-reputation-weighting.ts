'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface SocialGraphReputationWeight {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type SocialGraphReputationWeightPayload = Partial<SocialGraphReputationWeight> & {
  rationale?: string;
};

export function useOnchainSocialGraphReputationWeighting() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [weights, setWeights] = useState<SocialGraphReputationWeight[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReputationWeights',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const proposeReputationWeight = async (payload: SocialGraphReputationWeightPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Propose social graph weight update: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'proposeReputationWeight',
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

  const finalizeReputationWeight = async (payload: SocialGraphReputationWeightPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Finalize social graph weight update: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'finalizeReputationWeight',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as SocialGraphReputationWeight;
      setWeights(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    weights,
    processing,
    proposeReputationWeight,
    finalizeReputationWeight,
    address,
    isConnected,
  };
}
