'use client';

/**
 * Token Governance Delegation Tracker
 * Track governance delegations with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DelegationTracking {
  trackingId: string;
  delegator: string;
  delegatee: string;
  amount: string;
  blockNumber: number;
  timestamp: number;
}

export function useTokenGovernanceDelegationTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [trackings, setTrackings] = useState<DelegationTracking[]>([]);

  const track = async (
    delegator: string,
    delegatee: string,
    amount: string,
    blockNumber: number
  ): Promise<DelegationTracking> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!delegator.startsWith('0x')) {
      throw new Error('Invalid delegator address format');
    }
    if (!delegatee.startsWith('0x')) {
      throw new Error('Invalid delegatee address format');
    }
    
    const message = `Track delegation: ${delegator} -> ${delegatee} ${amount}`;
    await signMessageAsync({ message });
    
    const tracking: DelegationTracking = {
      trackingId: `delegate-${Date.now()}`,
      delegator,
      delegatee,
      amount,
      blockNumber,
      timestamp: Date.now(),
    };
    
    setTrackings([...trackings, tracking]);
    return tracking;
  };

  return { track, trackings, address };
}
