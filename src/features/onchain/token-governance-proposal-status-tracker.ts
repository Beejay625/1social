'use client';

/**
 * Token Governance Proposal Status Tracker
 * Track proposal status changes with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalStatus {
  statusId: string;
  proposalId: string;
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'executed';
  trackedBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalStatusTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [statuses, setStatuses] = useState<ProposalStatus[]>([]);

  const trackStatus = async (
    proposalId: string,
    status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'executed'
  ): Promise<ProposalStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Track proposal status: ${proposalId} status ${status}`;
    await signMessageAsync({ message });
    
    const proposalStatus: ProposalStatus = {
      statusId: `status-${Date.now()}`,
      proposalId,
      status,
      trackedBy: address,
      timestamp: Date.now(),
    };
    
    setStatuses([...statuses, proposalStatus]);
    return proposalStatus;
  };

  return { trackStatus, statuses, address };
}
