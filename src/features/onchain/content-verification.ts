'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VerifiedContent {
  contentHash: string;
  signature: string;
  wallet: string;
  timestamp: number;
}

export function useContentVerification() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifiedContent, setVerifiedContent] = useState<VerifiedContent[]>([]);

  const verifyContent = async (content: string) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const contentHash = `0x${Buffer.from(content).toString('hex').slice(0, 64)}`;
    const message = `Verify: ${contentHash}\nTimestamp: ${Date.now()}`;
    const signature = await signMessageAsync({ message });

    const verified: VerifiedContent = {
      contentHash,
      signature,
      wallet: address,
      timestamp: Date.now(),
    };

    setVerifiedContent([...verifiedContent, verified]);
    return verified;
  };

  return { verifyContent, verifiedContent, isConnected, address };
}
