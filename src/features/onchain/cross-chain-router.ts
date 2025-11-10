'use client';

import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useState } from 'react';

export type Protocol = 'farcaster' | 'lens' | 'mirror';

export function useCrossChainRouter() {
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();
  const [activeProtocol, setActiveProtocol] = useState<Protocol | null>(null);

  const publishToProtocol = async (protocol: Protocol, content: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setActiveProtocol(protocol);
    
    // Switch to appropriate chain for protocol
    const targetChainId = protocol === 'farcaster' ? 8453 : 
                          protocol === 'lens' ? 137 : 1;
    
    if (chainId !== targetChainId) {
      await switchChainAsync({ chainId: targetChainId });
    }
    
    return { protocol, content, chainId: targetChainId };
  };

  return { publishToProtocol, activeProtocol, chainId };
}

