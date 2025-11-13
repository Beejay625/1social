'use client';

/**
 * Token Governance Delegation Manager
 * Manage governance delegation with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Delegation {
  delegationId: string;
  tokenAddress: string;
  delegatee: string;
  amount: string;
  expiresAt: number;
  timestamp: number;
}

export function useTokenGovernanceDelegationManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const delegate = async (
    tokenAddress: string,
    delegatee: string,
    amount: string,
    expiresAt?: number
  ): Promise<Delegation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !delegatee.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Delegate governance: ${tokenAddress} to ${delegatee}`;
    await signMessageAsync({ message });
    
    const delegation: Delegation = {
      delegationId: `deleg-${Date.now()}`,
      tokenAddress,
      delegatee,
      amount,
      expiresAt: expiresAt || Date.now() + 86400000 * 365,
      timestamp: Date.now(),
    };
    
    setDelegations([...delegations, delegation]);
    return delegation;
  };

  return { delegate, delegations, address };
}
