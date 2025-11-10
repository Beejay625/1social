'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ContentVerification {
  contentHash: string;
  verified: boolean;
  verifier: string;
  timestamp: number;
}

export function useContentVerification() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<ContentVerification[]>([]);

  const verifyContent = async (contentHash: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify: ${contentHash}`;
    await signMessageAsync({ message });
    
    const verification: ContentVerification = {
      contentHash,
      verified: true,
      verifier: address,
      timestamp: Date.now(),
    };
    
    setVerifications([...verifications, verification]);
    return verification;
  };

  return { verifyContent, verifications, address };
}

