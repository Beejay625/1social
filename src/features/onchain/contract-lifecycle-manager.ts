'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LifecycleStage {
  contract: string;
  stage: 'deployed' | 'active' | 'paused' | 'upgraded' | 'destroyed';
  timestamp: number;
  wallet: string;
}

export function useContractLifecycleManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [stages, setStages] = useState<LifecycleStage[]>([]);

  const updateStage = async (contract: string, stage: LifecycleStage['stage']) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Lifecycle: ${contract} -> ${stage}`;
    await signMessageAsync({ message });
    
    const lifecycle: LifecycleStage = {
      contract,
      stage,
      timestamp: Date.now(),
      wallet: address,
    };
    
    setStages([...stages, lifecycle]);
    return lifecycle;
  };

  return { updateStage, stages, address };
}

