'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OnchainIdentity {
  wallet: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export function useOnchainIdentity() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [identity, setIdentity] = useState<OnchainIdentity | null>(null);

  const createIdentity = async (name: string, avatar: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Identity: ${name} ${avatar}`;
    await signMessageAsync({ message });
    
    const id: OnchainIdentity = {
      wallet: address,
      name,
      avatar,
      verified: false,
    };
    
    setIdentity(id);
    return id;
  };

  return { createIdentity, identity, address };
}

