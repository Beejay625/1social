'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentShare {
  contentHash: string;
  shareCount: bigint;
  sharer: string;
  timestamp: bigint;
}

export function useOnchainContentShareTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [sharing, setSharing] = useState(false);
  const [shares, setShares] = useState<ContentShare[]>([]);

  const { data: shareData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentShares',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const shareContent = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSharing(true);

    try {
      const message = `Share content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'shareContent',
        args: [contentHash, address],
      });
    } finally {
      setSharing(false);
    }
  };

  useEffect(() => {
    if (shareData) {
      const share = shareData as ContentShare;
      setShares(prev => {
        const filtered = prev.filter(s => s.contentHash !== share.contentHash);
        return [...filtered, share];
      });
    }
  }, [shareData]);

  return {
    shareContent,
    sharing,
    shares,
    address,
    isConnected,
    shareData,
  };
}

