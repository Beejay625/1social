'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Delegation {
  delegator: string;
  delegate: string;
  votingPower: bigint;
  expiry: number;
}

export function useGovernanceDelegation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const delegateVoting = async (delegate: string, expiry: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'delegate',
      args: [delegate, expiry],
    });

    const delegation: Delegation = {
      delegator: address,
      delegate,
      votingPower: BigInt(0),
      expiry,
    };

    setDelegations([...delegations, delegation]);
    return txHash;
  };

  return { delegateVoting, delegations, address };
}


