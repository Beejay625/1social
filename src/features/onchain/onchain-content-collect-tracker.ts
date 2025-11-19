'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentCollect {
  contentHash: string;
  collectCount: bigint;
  collectPrice: bigint;
  walletAddress: string;
  timestamp: bigint;
}

export function useOnchainContentCollectTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [collecting, setCollecting] = useState(false);
  const [collects, setCollects] = useState<ContentCollect[]>([]);

  const { data: collectData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentCollects',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const collectContent = async (contentHash: string, price: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCollecting(true);

    try {
      const message = `Collect content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'collectContent',
        args: [contentHash, price, address],
      });
    } finally {
      setCollecting(false);
    }
  };

  useEffect(() => {
    if (collectData) {
      const collect = collectData as ContentCollect;
      setCollects(prev => {
        const filtered = prev.filter(c => c.contentHash !== collect.contentHash);
        return [...filtered, collect];
      });
    }
  }, [collectData]);

  return {
    collectContent,
    collecting,
    collects,
    address,
    isConnected,
    collectData,
  };
}

