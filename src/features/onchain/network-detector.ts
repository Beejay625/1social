'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

export interface NetworkInfo {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
}

export function useNetworkDetector() {
  const { address, chainId } = useAccount();
  const [network, setNetwork] = useState<NetworkInfo | null>(null);

  useEffect(() => {
    if (chainId) {
      const info: NetworkInfo = {
        chainId,
        name: `Chain ${chainId}`,
        rpcUrl: '',
        blockExplorer: '',
      };
      setNetwork(info);
    }
  }, [chainId]);

  return { network, address, chainId };
}
