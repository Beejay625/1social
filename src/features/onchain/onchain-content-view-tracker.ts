'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentView {
  contentHash: string;
  viewer: string;
  viewCount: bigint;
  timestamp: bigint;
}

export function useOnchainContentViewTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);
  const [views, setViews] = useState<ContentView[]>([]);

  const { data: viewData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentViews',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const trackView = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Track view onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'trackView',
        args: [contentHash, address],
      });
    } finally {
      setTracking(false);
    }
  };

  useEffect(() => {
    if (viewData) {
      const view = viewData as ContentView;
      setViews(prev => {
        const filtered = prev.filter(v => v.contentHash !== view.contentHash);
        return [...filtered, view];
      });
    }
  }, [viewData]);

  return {
    trackView,
    tracking,
    views,
    address,
    isConnected,
    viewData,
  };
}

