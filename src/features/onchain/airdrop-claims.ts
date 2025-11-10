'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface AirdropClaim {
  id: string;
  airdropId: string;
  amount: bigint;
  claimed: boolean;
  proof: string[];
}

export function useAirdropClaims() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [claims, setClaims] = useState<AirdropClaim[]>([]);

  const claimAirdrop = async (airdropId: string, amount: string, proof: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'claim',
      args: [airdropId, BigInt(amount), proof],
    });

    const claim: AirdropClaim = {
      id: txHash || '',
      airdropId,
      amount: BigInt(amount),
      claimed: true,
      proof,
    };

    setClaims([...claims, claim]);
    return txHash;
  };

  return { claimAirdrop, claims, address };
}

