'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Multisig {
  id: string;
  creator: string;
  tokenAddress: string;
  owners: string[];
  threshold: number;
  timestamp: number;
  active: boolean;
}

export function useSocialTokenMultisig() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [multisigs, setMultisigs] = useState<Multisig[]>([]);

  const createMultisig = async (
    tokenAddress: string,
    owners: string[],
    threshold: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Multisig: ${tokenAddress} ${owners.length} owners threshold ${threshold}`;
    await signMessageAsync({ message });
    
    const multisig: Multisig = {
      id: `multisig-${Date.now()}`,
      creator: address,
      tokenAddress,
      owners: [...owners, address],
      threshold,
      timestamp: Date.now(),
      active: true,
    };
    
    setMultisigs([...multisigs, multisig]);
    return multisig;
  };

  return { createMultisig, multisigs, address };
}


