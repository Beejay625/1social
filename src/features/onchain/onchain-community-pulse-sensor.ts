'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CommunityPulseMetric {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type CommunityPulseMetricPayload = Partial<CommunityPulseMetric> & {
  rationale?: string;
};

export function useOnchainCommunityPulseSensor() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [metrics, setMetrics] = useState<CommunityPulseMetric[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCommunityPulseMetrics',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const recordCommunityPulseMetric = async (payload: CommunityPulseMetricPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Record community pulse metric: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'recordCommunityPulseMetric',
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

  const rebalanceCommunityPulseMetric = async (payload: CommunityPulseMetricPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Rebalance community pulse metric: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'rebalanceCommunityPulseMetric',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as CommunityPulseMetric;
      setMetrics(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    metrics,
    processing,
    recordCommunityPulseMetric,
    rebalanceCommunityPulseMetric,
    address,
    isConnected,
  };
}
