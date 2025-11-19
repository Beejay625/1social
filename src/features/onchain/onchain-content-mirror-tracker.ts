'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentMirror {
  originalContentHash: string;
  mirroredContentHash: string;
  mirrorCount: bigint;
  walletAddress: string;
  timestamp: bigint;
}

export function useOnchainContentMirrorTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);
  const [mirrors, setMirrors] = useState<ContentMirror[]>([]);

  const { data: mirrorData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentMirrors',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const trackMirror = async (originalContentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Mirror content onchain: ${originalContentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'mirrorContent',
        args: [originalContentHash, address],
      });
    } finally {
      setTracking(false);
    }
  };

  useEffect(() => {
    if (mirrorData) {
      const mirror = mirrorData as ContentMirror;
      setMirrors(prev => {
        const filtered = prev.filter(m => m.originalContentHash !== mirror.originalContentHash);
        return [...filtered, mirror];
      });
    }
  }, [mirrorData]);

  return {
    trackMirror,
    tracking,
    mirrors,
    address,
    isConnected,
    mirrorData,
  };
}

