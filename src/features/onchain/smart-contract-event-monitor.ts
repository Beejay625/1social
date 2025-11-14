'use client';

/**
 * Smart Contract Event Monitor
 * Monitor smart contract events in real-time with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EventMonitor {
  monitorId: string;
  contractAddress: string;
  eventName: string;
  active: boolean;
  monitoredBy: string;
  timestamp: number;
}

export function useSmartContractEventMonitor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [monitors, setMonitors] = useState<EventMonitor[]>([]);

  const monitorEvent = async (
    contractAddress: string,
    eventName: string
  ): Promise<EventMonitor> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!contractAddress.startsWith('0x')) {
      throw new Error('Invalid contract address format');
    }
    
    const message = `Monitor contract event: ${contractAddress} event ${eventName}`;
    await signMessageAsync({ message });
    
    const monitor: EventMonitor = {
      monitorId: `monitor-${Date.now()}`,
      contractAddress,
      eventName,
      active: true,
      monitoredBy: address,
      timestamp: Date.now(),
    };
    
    setMonitors([...monitors, monitor]);
    return monitor;
  };

  return { monitorEvent, monitors, address };
}
