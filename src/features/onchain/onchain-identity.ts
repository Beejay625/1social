'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OnchainIdentity {
  wallet: string;
  ensName: string | null;
  verified: boolean;
  credentials: string[];
}

export function useOnchainIdentity() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [identity, setIdentity] = useState<OnchainIdentity | null>(null);

  const verifyIdentity = async () => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const message = `1Social Identity: ${address}\nTimestamp: ${Date.now()}`;
    const signature = await signMessageAsync({ message });

    const identityData: OnchainIdentity = {
      wallet: address,
      ensName: null,
      verified: true,
      credentials: ['wallet_signature'],
    };

    setIdentity(identityData);
    return signature;
  };

  return { verifyIdentity, identity, isConnected, address };
}
