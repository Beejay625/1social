'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AirdropClaim {
  airdrop: string;
  token: string;
  amount: bigint;
  claimed: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractAirdropClaimManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [claims, setClaims] = useState<AirdropClaim[]>([]);

  const claimAirdrop = async (airdrop: string, token: string, amount: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Claim Airdrop: ${amount} ${token} from ${airdrop}`;
    await signMessageAsync({ message });
    
    const claim: AirdropClaim = {
      airdrop,
      token,
      amount,
      claimed: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setClaims([...claims, claim]);
    return claim;
  };

  return { claimAirdrop, claims, address };
}

