'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  recipient: string;
  issuer: string;
  wallet: string;
}

export function useOnchainBadges() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [badges, setBadges] = useState<Badge[]>([]);

  const issueBadge = async (name: string, description: string, recipient: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Issue Badge: ${name} to ${recipient}`;
    await signMessageAsync({ message });
    
    const badge: Badge = {
      id: `badge_${Date.now()}`,
      name,
      description,
      recipient,
      issuer: address,
      wallet: address,
    };
    
    setBadges([...badges, badge]);
    return badge;
  };

  return { issueBadge, badges, address };
}

