'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ExplorerLink {
  type: 'tx' | 'address' | 'block';
  hash: string;
  url: string;
  wallet: string;
  timestamp: number;
}

export function useBlockExplorerIntegration() {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [links, setLinks] = useState<ExplorerLink[]>([]);

  const generateLink = async (type: 'tx' | 'address' | 'block', hash: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Explorer Link: ${type} ${hash}`;
    await signMessageAsync({ message });
    
    const link: ExplorerLink = {
      type,
      hash,
      url: `https://explorer.chain/${chainId}/${type}/${hash}`,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setLinks([...links, link]);
    return link;
  };

  return { generateLink, links, address, chainId };
}


