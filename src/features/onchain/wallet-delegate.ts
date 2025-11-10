'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Delegation {
  delegate: string;
  permissions: string[];
  expiresAt: number;
}

export function useWalletDelegate() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const delegateAccess = async (delegate: string, permissions: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Delegate: ${delegate} ${permissions.join(',')}`;
    await signMessageAsync({ message });
    
    const delegation: Delegation = {
      delegate,
      permissions,
      expiresAt: Date.now() + 86400000,
    };
    
    setDelegations([...delegations, delegation]);
    return delegation;
  };

  return { delegateAccess, delegations, address };
}
