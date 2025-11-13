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
  votingPower: string;
  delegatedBy: string;
  timestamp: number;
}

export function useTokenGovernanceDelegationManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const delegate = async (
    tokenAddress: string,
    delegatee: string,
    votingPower: string
  ): Promise<Delegation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !delegatee.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Delegate governance: ${tokenAddress} to ${delegatee}`;
    await signMessageAsync({ message });
    
    const delegation: Delegation = {
      delegationId: `delegate-${Date.now()}`,
      tokenAddress,
      delegatee,
      votingPower,
      delegatedBy: address,
      timestamp: Date.now(),
    };
    
    setDelegations([...delegations, delegation]);
    return delegation;
  };

  return { delegate, delegations, address };
}
