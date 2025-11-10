'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Protocol {
  name: string;
  address: string;
  chainId: number;
  enabled: boolean;
}

export function useProtocolRegistry() {
  const { address, isConnected, chainId } = useAccount();
  const [protocols, setProtocols] = useState<Protocol[]>([]);

  const { data: registryData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getProtocols',
    args: chainId ? [chainId] : undefined,
    query: { enabled: !!chainId && isConnected },
  });

  useEffect(() => {
    if (chainId) {
      const protocolList: Protocol[] = [
        { name: 'Farcaster', address: '0x', chainId, enabled: true },
        { name: 'Lens', address: '0x', chainId, enabled: true },
      ];
      setProtocols(protocolList);
    }
  }, [chainId, registryData]);

  return { protocols, isConnected, address, chainId };
}
