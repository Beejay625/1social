'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Delegation {
  delegate: string;
  permissions: string[];
  expiry: number;
  active: boolean;
}

export function useWalletDelegate() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const delegatePermissions = async (delegate: string, permissions: string[], expiry: number) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'delegate',
      args: [delegate, permissions, expiry],
    });

    const delegation: Delegation = {
      delegate,
      permissions,
      expiry,
      active: true,
    };

    setDelegations([...delegations, delegation]);
    return txHash;
  };

  return { delegatePermissions, delegations, isConnected, address };
}
