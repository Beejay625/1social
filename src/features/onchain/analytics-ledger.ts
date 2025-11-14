'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AnalyticsDigest {
  date: string;
  metrics: Record<string, number>;
  ipfsHash: string;
  onchainHash: string;
}

export function useOnchainAnalyticsLedger() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [digests, setDigests] = useState<AnalyticsDigest[]>([]);

  const publishDigest = async (metrics: Record<string, number>) => {
    if (!address) throw new Error('Wallet not connected');
    
    const digest: AnalyticsDigest = {
      date: new Date().toISOString(),
      metrics,
      ipfsHash: `ipfs_${Date.now()}`,
      onchainHash: `0x${Date.now().toString(16)}`,
    };
    
    const message = `Analytics:${digest.date}:${digest.onchainHash}`;
    await signMessageAsync({ message });
    
    setDigests([...digests, digest]);
    return digest;
  };

  return { publishDigest, digests };
}


