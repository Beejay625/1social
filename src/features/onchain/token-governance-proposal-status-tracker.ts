'use client';

/**
 * Token Governance Proposal Status Tracker
 * Track proposal status changes with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ProposalStatus {
  statusId: string;
  proposalId: string;
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'executed' | 'canceled';
  votesFor: string;
  votesAgainst: string;
  timestamp: number;
}

export function useTokenGovernanceProposalStatusTracker(proposalId?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [statuses, setStatuses] = useState<ProposalStatus[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Start tracking proposal status: ${proposalId || 'all'}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const status: ProposalStatus = {
        statusId: `status-${Date.now()}`,
        proposalId: proposalId || `prop-${Date.now()}`,
        status: 'active',
        votesFor: '2000000',
        votesAgainst: '1000000',
        timestamp: Date.now(),
      };
      
      setStatuses((prev) => [status, ...prev.slice(0, 9)]);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isTracking, proposalId, address]);

  return { startTracking, stopTracking, statuses, isTracking, address };
}

