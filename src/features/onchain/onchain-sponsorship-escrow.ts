'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface SponsorshipEscrowRecord {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type SponsorshipEscrowRecordPayload = Partial<SponsorshipEscrowRecord> & {
  rationale?: string;
};

export function useOnchainSponsorshipEscrow() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [escrows, setEscrows] = useState<SponsorshipEscrowRecord[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getSponsorshipEscrows',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const openSponsorshipEscrow = async (payload: SponsorshipEscrowRecordPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Open sponsorship escrow: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'openSponsorshipEscrow',
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

  const releaseSponsorshipEscrow = async (payload: SponsorshipEscrowRecordPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Release sponsorship escrow: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'releaseSponsorshipEscrow',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as SponsorshipEscrowRecord;
      setEscrows(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    escrows,
    processing,
    openSponsorshipEscrow,
    releaseSponsorshipEscrow,
    address,
    isConnected,
  };
}
