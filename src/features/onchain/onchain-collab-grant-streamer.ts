'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CollabGrantStream {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type CollabGrantStreamPayload = Partial<CollabGrantStream> & {
  rationale?: string;
};

export function useOnchainCollabGrantStreamer() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [streams, setStreams] = useState<CollabGrantStream[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCollabGrantStreams',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const startCollabGrantStream = async (payload: CollabGrantStreamPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Start collaboration grant stream: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'startCollabGrantStream',
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

  const settleCollabGrantStream = async (payload: CollabGrantStreamPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Settle collaboration grant stream: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'settleCollabGrantStream',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as CollabGrantStream;
      setStreams(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    streams,
    processing,
    startCollabGrantStream,
    settleCollabGrantStream,
    address,
    isConnected,
  };
}
