'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CreatorCreditScore {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type CreatorCreditScorePayload = Partial<CreatorCreditScore> & {
  rationale?: string;
};

export function useOnchainCreatorCreditScorer() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [scores, setScores] = useState<CreatorCreditScore[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCreatorCreditScores',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const submitCreatorCreditScore = async (payload: CreatorCreditScorePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Submit creator credit score inputs: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'submitCreatorCreditScore',
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

  const verifyCreatorCreditScore = async (payload: CreatorCreditScorePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Verify creator credit score inputs: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'verifyCreatorCreditScore',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as CreatorCreditScore;
      setScores(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    scores,
    processing,
    submitCreatorCreditScore,
    verifyCreatorCreditScore,
    address,
    isConnected,
  };
}
