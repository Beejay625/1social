'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ProtocolStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  lastCheck: number;
}

export function useProtocolHealth() {
  const { address, isConnected, chainId } = useAccount();
  const [protocols, setProtocols] = useState<ProtocolStatus[]>([]);

  const { data: healthData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getHealth',
    args: chainId ? [chainId] : undefined,
    query: { enabled: !!chainId && isConnected },
  });

  useEffect(() => {
    if (chainId) {
      const protocol: ProtocolStatus = {
        name: 'Farcaster',
        status: 'healthy',
        latency: 50,
        lastCheck: Date.now(),
      };
      setProtocols([protocol]);
    }
  }, [chainId, healthData]);

  return { protocols, isConnected, address, chainId };
}
