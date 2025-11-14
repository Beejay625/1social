'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RemixData {
  originalContentHash: string;
  remixContentHash: string;
  remixer: string;
  attribution: string;
  timestamp: bigint;
}

export function useOnchainContentRemixTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);

  const { data: remixData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRemixData',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const registerRemix = async (remix: RemixData) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Register remix onchain: ${remix.remixContentHash} of ${remix.originalContentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'registerRemix',
        args: [
          remix.originalContentHash,
          remix.remixContentHash,
          remix.remixer,
          remix.attribution,
        ],
      });
    } finally {
      setTracking(false);
    }
  };

  return {
    registerRemix,
    tracking,
    address,
    isConnected,
    remixData,
  };
}

