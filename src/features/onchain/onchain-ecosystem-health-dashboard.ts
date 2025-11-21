'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface EcosystemHealthMetric {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type EcosystemHealthMetricPayload = Partial<EcosystemHealthMetric> & {
  rationale?: string;
};

export function useOnchainEcosystemHealthDashboard() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [metrics, setMetrics] = useState<EcosystemHealthMetric[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getEcosystemHealthMetrics',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const recordEcosystemHealthMetric = async (payload: EcosystemHealthMetricPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Record ecosystem health metric: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'recordEcosystemHealthMetric',
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

  const normalizeEcosystemHealthMetric = async (payload: EcosystemHealthMetricPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Normalize ecosystem health metric: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'normalizeEcosystemHealthMetric',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as EcosystemHealthMetric;
      setMetrics(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    metrics,
    processing,
    recordEcosystemHealthMetric,
    normalizeEcosystemHealthMetric,
    address,
    isConnected,
  };
}
