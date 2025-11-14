'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TreasuryAction {
  type: 'deposit' | 'withdraw' | 'proposal';
  amount: string;
  description: string;
  wallet: string;
}

export function useCommunityTreasury() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [actions, setActions] = useState<TreasuryAction[]>([]);

  const executeAction = async (type: 'deposit' | 'withdraw' | 'proposal', amount: string, description: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Treasury: ${type} ${amount} - ${description}`;
    await signMessageAsync({ message });
    
    const action: TreasuryAction = {
      type,
      amount,
      description,
      wallet: address,
    };
    
    setActions([...actions, action]);
    return action;
  };

  return { executeAction, actions, address };
}


