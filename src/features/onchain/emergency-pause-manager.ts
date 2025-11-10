'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PauseAction {
  contract: string;
  paused: boolean;
  reason: string;
  wallet: string;
  timestamp: number;
}

export function useEmergencyPauseManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [actions, setActions] = useState<PauseAction[]>([]);

  const pauseContract = async (contract: string, reason: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Pause: ${contract} - ${reason}`;
    await signMessageAsync({ message });
    
    const action: PauseAction = {
      contract,
      paused: true,
      reason,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setActions([...actions, action]);
    return action;
  };

  return { pauseContract, actions, address };
}

