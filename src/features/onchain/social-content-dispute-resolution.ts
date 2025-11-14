'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Dispute {
  id: string;
  contentId: string;
  disputant: string;
  defendant: string;
  reason: string;
  arbitrator?: string;
  resolution?: string;
  timestamp: number;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
}

export function useSocialContentDisputeResolution() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [disputes, setDisputes] = useState<Dispute[]>([]);

  const createDispute = async (
    contentId: string,
    defendant: string,
    reason: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Dispute: ${contentId} ${defendant} ${reason}`;
    await signMessageAsync({ message });
    
    const dispute: Dispute = {
      id: `dispute-${Date.now()}`,
      contentId,
      disputant: address,
      defendant,
      reason,
      timestamp: Date.now(),
      status: 'open',
    };
    
    setDisputes([...disputes, dispute]);
    return dispute;
  };

  const resolveDispute = async (disputeId: string, resolution: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Resolve Dispute: ${disputeId} ${resolution}`;
    await signMessageAsync({ message });
    
    setDisputes(disputes.map(d => 
      d.id === disputeId
        ? { ...d, resolution, arbitrator: address, status: 'resolved' }
        : d
    ));
  };

  return { createDispute, resolveDispute, disputes, address };
}


