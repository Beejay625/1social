'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { useState } from 'react';

export interface ChainSwitch {
  fromChain: number;
  toChain: number;
  timestamp: number;
}

export function useChainSwitcher() {
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [switches, setSwitches] = useState<ChainSwitch[]>([]);

  const switchToChain = async (targetChainId: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    await switchChain({ chainId: targetChainId });
    
    const chainSwitch: ChainSwitch = {
      fromChain: chainId || 0,
      toChain: targetChainId,
      timestamp: Date.now(),
    };
    
    setSwitches([...switches, chainSwitch]);
    return chainSwitch;
  };

  return { switchToChain, switches, address, chainId };
}
