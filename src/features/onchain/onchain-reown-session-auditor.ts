'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ReownSessionAudit {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type ReownSessionAuditPayload = Partial<ReownSessionAudit> & {
  rationale?: string;
};

export function useOnchainReownSessionAuditor() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [audits, setAudits] = useState<ReownSessionAudit[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReownSessionAudits',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const recordReownSessionAudit = async (payload: ReownSessionAuditPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Record Reown session audit trail: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'recordReownSessionAudit',
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

  const ackReownSessionAudit = async (payload: ReownSessionAuditPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Acknowledge Reown session audit: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'ackReownSessionAudit',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as ReownSessionAudit;
      setAudits(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    audits,
    processing,
    recordReownSessionAudit,
    ackReownSessionAudit,
    address,
    isConnected,
  };
}
