'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GovernanceEmergencySignal {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type GovernanceEmergencySignalPayload = Partial<GovernanceEmergencySignal> & {
  rationale?: string;
};

export function useOnchainGovernanceEmergencySignal() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [signals, setSignals] = useState<GovernanceEmergencySignal[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getEmergencySignals',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const raiseEmergencySignal = async (payload: GovernanceEmergencySignalPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Raise governance emergency signal: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'raiseEmergencySignal',
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

  const clearEmergencySignal = async (payload: GovernanceEmergencySignalPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Clear governance emergency signal: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'clearEmergencySignal',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as GovernanceEmergencySignal;
      setSignals(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    signals,
    processing,
    raiseEmergencySignal,
    clearEmergencySignal,
    address,
    isConnected,
  };
}
