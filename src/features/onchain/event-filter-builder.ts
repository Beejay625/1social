'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EventFilter {
  contract: string;
  eventName: string;
  fromBlock: bigint;
  toBlock: bigint;
  args: any;
}

export function useEventFilterBuilder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [filters, setFilters] = useState<EventFilter[]>([]);

  const createFilter = async (contract: string, eventName: string, fromBlock: bigint, toBlock: bigint, args: any) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Filter: ${eventName} on ${contract}`;
    await signMessageAsync({ message });
    
    const filter: EventFilter = {
      contract,
      eventName,
      fromBlock,
      toBlock,
      args,
    };
    
    setFilters([...filters, filter]);
    return filter;
  };

  return { createFilter, filters, address };
}

