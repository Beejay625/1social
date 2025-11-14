'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ContentVerification {
  id: string;
  contentId: string;
  verifier: string;
  verificationType: 'authenticity' | 'copyright' | 'fact-check' | 'source';
  verified: boolean;
  proof: string;
  timestamp: number;
}

export function useSocialContentVerificationOnchain() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<ContentVerification[]>([]);

  const verifyContent = async (
    contentId: string,
    verificationType: 'authenticity' | 'copyright' | 'fact-check' | 'source',
    proof: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify Content: ${contentId} ${verificationType} ${proof}`;
    await signMessageAsync({ message });
    
    const verification: ContentVerification = {
      id: `verify-${Date.now()}`,
      contentId,
      verifier: address,
      verificationType,
      verified: true,
      proof,
      timestamp: Date.now(),
    };
    
    setVerifications([...verifications, verification]);
    return verification;
  };

  return { verifyContent, verifications, address };
}


