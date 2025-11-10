'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Dispute {
  id: string;
  parties: string[];
  description: string;
  resolution: string | null;
  wallet: string;
}

export function useDisputeResolution() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [disputes, setDisputes] = useState<Dispute[]>([]);

  const createDispute = async (parties: string[], description: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Dispute: ${parties.join(',')} - ${description}`;
    await signMessageAsync({ message });
    
    const dispute: Dispute = {
      id: `dispute_${Date.now()}`,
      parties,
      description,
      resolution: null,
      wallet: address,
    };
    
    setDisputes([...disputes, dispute]);
    return dispute;
  };

  return { createDispute, disputes, address };
}

