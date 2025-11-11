'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Nonce {
  address: string;
  nonce: number;
  chainId: number;
  wallet: string;
  timestamp: number;
}

export function useContractNonceTracker() {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [nonces, setNonces] = useState<Nonce[]>([]);

  const trackNonce = async (targetAddress: string, nonce: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Track Nonce: ${targetAddress} - ${nonce}`;
    await signMessageAsync({ message });
    
    const nonceData: Nonce = {
      address: targetAddress,
      nonce,
      chainId: chainId || 1,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setNonces([...nonces, nonceData]);
    return nonceData;
  };

  return { trackNonce, nonces, address, chainId };
}

