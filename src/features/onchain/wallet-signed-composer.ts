'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SignedContent {
  content: string;
  signature: string;
  wallet: string;
  timestamp: number;
}

export function useWalletSignedComposer() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [signedContent, setSignedContent] = useState<SignedContent | null>(null);

  const signContent = async (content: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const message = `1Social Content: ${content}\nTimestamp: ${Date.now()}`;
    const signature = await signMessageAsync({ message });
    
    const signed: SignedContent = {
      content,
      signature,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSignedContent(signed);
    return signed;
  };

  return { signContent, signedContent, isConnected, address };
}

