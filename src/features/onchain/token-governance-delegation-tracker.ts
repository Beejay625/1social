'use client';

/**
 * Token Governance Delegation Tracker
 * Track governance delegations with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Delegation {
  delegationId: string;
  delegator: string;
  delegatee: string;
  votingPower: string;
  trackedBy: string;
  timestamp: number;
}

export function useTokenGovernanceDelegationTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const trackDelegation = async (
    delegator: string,
    delegatee: string,
    votingPower: string
  ): Promise<Delegation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!delegator.startsWith('0x') || !delegatee.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Track delegation: ${delegator} to ${delegatee} power ${votingPower}`;
    await signMessageAsync({ message });
    
    const delegation: Delegation = {
      delegationId: `delegation-${Date.now()}`,
      delegator,
      delegatee,
      votingPower,
      trackedBy: address,
      timestamp: Date.now(),
    };
    
    setDelegations([...delegations, delegation]);
    return delegation;
  };

  return { trackDelegation, delegations, address };
}
