'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface JumpDest {
  contract: string;
  destination: number;
  valid: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractJumpDestAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [jumpDests, setJumpDests] = useState<JumpDest[]>([]);

  const analyzeJumpDest = async (contract: string, destination: number, valid: boolean) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Jump Dest: ${contract} at ${destination}`;
    await signMessageAsync({ message });
    
    const jumpDest: JumpDest = {
      contract,
      destination,
      valid,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setJumpDests([...jumpDests, jumpDest]);
    return jumpDest;
  };

  return { analyzeJumpDest, jumpDests, address };
}


