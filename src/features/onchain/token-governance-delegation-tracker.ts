'use client';

/**
 * Token Governance Delegation Tracker
 * Track governance delegations with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DelegationTracking {
  trackingId: string;
  tokenAddress: string;
  delegator: string;
  delegatee: string;
  votingPower: string;
  timestamp: number;
}

export function useTokenGovernanceDelegationTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [trackings, setTrackings] = useState<DelegationTracking[]>([]);

  const trackDelegation = async (
    tokenAddress: string,
    delegator: string,
    delegatee: string,
    votingPower: string
  ): Promise<DelegationTracking> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !delegator.startsWith('0x') || !delegatee.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Track delegation: ${tokenAddress} from ${delegator} to ${delegatee}`;
    await signMessageAsync({ message });
    
    const tracking: DelegationTracking = {
      trackingId: `track-${Date.now()}`,
      tokenAddress,
      delegator,
      delegatee,
      votingPower,
      timestamp: Date.now(),
    };
    
    setTrackings([...trackings, tracking]);
    return tracking;
  };

  return { trackDelegation, trackings, address };
}
