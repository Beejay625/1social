'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface ProtocolStatus {
  protocol: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
}

export function useProtocolHealth() {
  const { address } = useAccount();
  const [statuses, setStatuses] = useState<ProtocolStatus[]>([]);

  const checkHealth = async (protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const status: ProtocolStatus = {
      protocol,
      status: 'healthy',
      latency: 100,
    };
    
    setStatuses([...statuses, status]);
    return status;
  };

  return { checkHealth, statuses, address };
}
