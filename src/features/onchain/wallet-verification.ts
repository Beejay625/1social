'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Verification {
  wallet: string;
  verified: boolean;
  timestamp: number;
}

export function useWalletVerification() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<Verification[]>([]);

  const verifyWallet = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify wallet: ${address}`;
    await signMessageAsync({ message });
    
    const verification: Verification = {
      wallet: address,
      verified: true,
      timestamp: Date.now(),
    };
    
    setVerifications([...verifications, verification]);
    return verification;
  };

  return { verifyWallet, verifications, address };
}
