'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GraphConnection {
  from: string;
  to: string;
  weight: number;
  protocol: string;
}

export function useSocialGraph() {
  const { address } = useAccount();
  const [connections, setConnections] = useState<GraphConnection[]>([]);

  const { data: graphData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getConnections',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && graphData) {
      const connection: GraphConnection = {
        from: address,
        to: (graphData as any)?.to || '',
        weight: 1,
        protocol: 'farcaster',
      };
      setConnections([connection]);
    }
  }, [address, graphData]);

  return { connections, address };
}
