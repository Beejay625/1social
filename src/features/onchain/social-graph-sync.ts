'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface SocialConnection {
  from: string;
  to: string;
  protocol: string;
  timestamp: number;
}

export function useSocialGraphSync() {
  const { address, isConnected } = useAccount();
  const [connections, setConnections] = useState<SocialConnection[]>([]);

  const { data: graphData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getConnections',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  useEffect(() => {
    if (address && graphData) {
      const connection: SocialConnection = {
        from: address,
        to: (graphData as any)?.to || '',
        protocol: 'farcaster',
        timestamp: Date.now(),
      };
      setConnections([connection]);
    }
  }, [address, graphData]);

  return { connections, isConnected, address };
}
