'use client';

/**
 * Token Governance Proposal Status Tracker
 * Track proposal status changes with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface StatusTracking {
  trackingId: string;
  proposalId: string;
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'executed' | 'canceled';
  previousStatus: string;
  timestamp: number;
}

export function useTokenGovernanceProposalStatusTracker(proposalId?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [trackings, setTrackings] = useState<StatusTracking[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Start tracking status: ${proposalId || 'all'}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const tracking: StatusTracking = {
        trackingId: `status-${Date.now()}`,
        proposalId: proposalId || '0',
        status: 'pending',
        previousStatus: 'pending',
        timestamp: Date.now(),
      };
      
      setTrackings((prev) => [tracking, ...prev.slice(0, 9)]);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isTracking, proposalId, address]);

  return { startTracking, stopTracking, trackings, isTracking, address };
}
