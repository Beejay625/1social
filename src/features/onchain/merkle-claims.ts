'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MerkleClaim {
  proof: string[];
  amount: string;
  index: number;
  wallet: string;
}

export function useMerkleClaims() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [claims, setClaims] = useState<MerkleClaim[]>([]);

  const claimTokens = async (proof: string[], amount: string, index: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Claim: ${amount} tokens at index ${index}`;
    await signMessageAsync({ message });
    
    const claim: MerkleClaim = {
      proof,
      amount,
      index,
      wallet: address,
    };
    
    setClaims([...claims, claim]);
    return claim;
  };

  return { claimTokens, claims, address };
}
