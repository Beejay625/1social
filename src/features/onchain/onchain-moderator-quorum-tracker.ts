'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ModeratorQuorumSignal {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type ModeratorQuorumSignalPayload = Partial<ModeratorQuorumSignal> & {
  rationale?: string;
};

export function useOnchainModeratorQuorumTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [signals, setSignals] = useState<ModeratorQuorumSignal[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getModeratorQuorumSignals',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const recordModeratorQuorumSignal = async (payload: ModeratorQuorumSignalPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Record moderator quorum signal: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'recordModeratorQuorumSignal',
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

  const finalizeModeratorQuorumSignal = async (payload: ModeratorQuorumSignalPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Finalize moderator quorum signal: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'finalizeModeratorQuorumSignal',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as ModeratorQuorumSignal;
      setSignals(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    signals,
    processing,
    recordModeratorQuorumSignal,
    finalizeModeratorQuorumSignal,
    address,
    isConnected,
  };
}
