'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface DecentralizedInvite {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type DecentralizedInvitePayload = Partial<DecentralizedInvite> & {
  rationale?: string;
};

export function useOnchainDecentralizedInviteSystem() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [invites, setInvites] = useState<DecentralizedInvite[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getDecentralizedInvites',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const issueDecentralizedInvite = async (payload: DecentralizedInvitePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Issue decentralized invite token: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'issueDecentralizedInvite',
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

  const redeemDecentralizedInvite = async (payload: DecentralizedInvitePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Redeem decentralized invite token: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'redeemDecentralizedInvite',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as DecentralizedInvite;
      setInvites(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    invites,
    processing,
    issueDecentralizedInvite,
    redeemDecentralizedInvite,
    address,
    isConnected,
  };
}
