'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

export interface WebhookEvent {
  event: string;
  txHash: string;
  blockNumber: number;
  timestamp: number;
}

export function useSmartContractWebhooks() {
  const { address } = useAccount();
  const [events, setEvents] = useState<WebhookEvent[]>([]);

  const subscribeToEvent = (eventName: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const event: WebhookEvent = {
      event: eventName,
      txHash: `0x${Date.now().toString(16)}`,
      blockNumber: Date.now(),
      timestamp: Date.now(),
    };
    
    setEvents([...events, event]);
    return event;
  };

  return { subscribeToEvent, events, address };
}

