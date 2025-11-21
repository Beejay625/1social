'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CreatorRoyaltyAlert {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type CreatorRoyaltyAlertPayload = Partial<CreatorRoyaltyAlert> & {
  rationale?: string;
};

export function useOnchainCreatorRoyaltyWatchdog() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [alerts, setAlerts] = useState<CreatorRoyaltyAlert[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCreatorRoyaltyAlerts',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const reportCreatorRoyaltyIssue = async (payload: CreatorRoyaltyAlertPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Report creator royalty issue: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'reportCreatorRoyaltyIssue',
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

  const resolveCreatorRoyaltyIssue = async (payload: CreatorRoyaltyAlertPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Resolve creator royalty issue: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'resolveCreatorRoyaltyIssue',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as CreatorRoyaltyAlert;
      setAlerts(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    alerts,
    processing,
    reportCreatorRoyaltyIssue,
    resolveCreatorRoyaltyIssue,
    address,
    isConnected,
  };
}
