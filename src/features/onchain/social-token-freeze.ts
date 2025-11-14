'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FreezeAction {
  id: string;
  executor: string;
  tokenAddress: string;
  targetAddress: string;
  frozen: boolean;
  reason: string;
  timestamp: number;
}

export function useSocialTokenFreeze() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [freezeActions, setFreezeActions] = useState<FreezeAction[]>([]);

  const freezeToken = async (
    tokenAddress: string,
    targetAddress: string,
    reason: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Freeze Token: ${tokenAddress} ${targetAddress} ${reason}`;
    await signMessageAsync({ message });
    
    const freezeAction: FreezeAction = {
      id: `freeze-${Date.now()}`,
      executor: address,
      tokenAddress,
      targetAddress,
      frozen: true,
      reason,
      timestamp: Date.now(),
    };
    
    setFreezeActions([...freezeActions, freezeAction]);
    return freezeAction;
  };

  const unfreezeToken = async (tokenAddress: string, targetAddress: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Unfreeze Token: ${tokenAddress} ${targetAddress}`;
    await signMessageAsync({ message });
    
    const freezeAction: FreezeAction = {
      id: `unfreeze-${Date.now()}`,
      executor: address,
      tokenAddress,
      targetAddress,
      frozen: false,
      reason: 'Unfrozen',
      timestamp: Date.now(),
    };
    
    setFreezeActions([...freezeActions, freezeAction]);
    return freezeAction;
  };

  return { freezeToken, unfreezeToken, freezeActions, address };
}


