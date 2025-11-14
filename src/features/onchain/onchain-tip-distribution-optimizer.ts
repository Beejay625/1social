'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TipDistribution {
  recipients: string[];
  amounts: bigint[];
  contentHash: string;
}

export function useOnchainTipDistributionOptimizer() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [optimizing, setOptimizing] = useState(false);

  const { data: totalTips } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getTotalTips',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const optimizeAndDistribute = async (distribution: TipDistribution) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setOptimizing(true);

    try {
      const message = `Optimize and distribute tips onchain to ${distribution.recipients.length} recipients`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'distributeTips',
        args: [distribution.recipients, distribution.amounts, distribution.contentHash],
      });
    } finally {
      setOptimizing(false);
    }
  };

  return {
    optimizeAndDistribute,
    optimizing,
    address,
    isConnected,
    totalTips,
  };
}

