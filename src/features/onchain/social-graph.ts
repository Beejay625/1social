'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface SocialConnection {
  from: string;
  to: string;
  protocol: string;
  timestamp: number;
}

export function useSocialGraph() {
  const { address } = useAccount();
  const [connections, setConnections] = useState<SocialConnection[]>([]);

  const addConnection = async (to: string, protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const connection: SocialConnection = {
      from: address,
      to,
      protocol,
      timestamp: Date.now(),
    };
    
    setConnections([...connections, connection]);
    return connection;
  };

  return { addConnection, connections, address };
}

