'use client';

import { useAccount, useChainId } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ChainInfo {
  chainId: number;
  name: string;
  nativeCurrency: string;
  blockExplorer: string;
}

export function useChainIdDetector() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [chainInfo, setChainInfo] = useState<ChainInfo | null>(null);

  useEffect(() => {
    if (!address) return;
    
    const info: ChainInfo = {
      chainId,
      name: 'Ethereum',
      nativeCurrency: 'ETH',
      blockExplorer: 'https://etherscan.io',
    };
    
    setChainInfo(info);
  }, [address, chainId]);

  return { chainInfo, address, chainId };
}

