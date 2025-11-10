'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OwnershipRecord {
  contentId: string;
  owner: string;
  timestamp: number;
  verified: boolean;
}

export function useContentOwnership() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [ownerships, setOwnerships] = useState<OwnershipRecord[]>([]);

  const claimOwnership = async (contentId: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Claim Ownership: ${contentId}`;
    await signMessageAsync({ message });
    
    const ownership: OwnershipRecord = {
      contentId,
      owner: address,
      timestamp: Date.now(),
      verified: true,
    };
    
    setOwnerships([...ownerships, ownership]);
    return ownership;
  };

  return { claimOwnership, ownerships, address };
}
