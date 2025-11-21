'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface LivestreamAccessRule {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type LivestreamAccessRulePayload = Partial<LivestreamAccessRule> & {
  rationale?: string;
};

export function useOnchainLivestreamAccessGate() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [rules, setRules] = useState<LivestreamAccessRule[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getLivestreamAccessRules',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createLivestreamAccessRule = async (payload: LivestreamAccessRulePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Create livestream access rule: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createLivestreamAccessRule',
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

  const revokeLivestreamAccessRule = async (payload: LivestreamAccessRulePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Revoke livestream access rule: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'revokeLivestreamAccessRule',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as LivestreamAccessRule;
      setRules(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    rules,
    processing,
    createLivestreamAccessRule,
    revokeLivestreamAccessRule,
    address,
    isConnected,
  };
}
