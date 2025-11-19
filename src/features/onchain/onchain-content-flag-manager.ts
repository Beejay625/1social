'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentFlag {
  contentHash: string;
  flagger: string;
  reason: string;
  timestamp: bigint;
  status: 'pending' | 'reviewed' | 'resolved';
}

export function useOnchainContentFlagManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [flagging, setFlagging] = useState(false);
  const [flags, setFlags] = useState<ContentFlag[]>([]);

  const { data: flagData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentFlags',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const flagContent = async (contentHash: string, reason: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFlagging(true);

    try {
      const message = `Flag content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'flagContent',
        args: [contentHash, reason, address],
      });
    } finally {
      setFlagging(false);
    }
  };

  useEffect(() => {
    if (flagData) {
      const flag = flagData as ContentFlag;
      setFlags(prev => {
        const filtered = prev.filter(f => f.contentHash !== flag.contentHash || f.flagger !== flag.flagger);
        return [...filtered, flag];
      });
    }
  }, [flagData]);

  return {
    flagContent,
    flagging,
    flags,
    address,
    isConnected,
    flagData,
  };
}

