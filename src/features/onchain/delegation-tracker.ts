'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface Delegation {
  delegator: string;
  delegate: string;
  timestamp: number;
}

export function useDelegationTracker() {
  const { address } = useAccount();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'DelegateChanged',
    onLogs(logs) {
      const delegation: Delegation = {
        delegator: logs[0]?.args?.delegator || '',
        delegate: logs[0]?.args?.delegate || '',
        timestamp: Date.now(),
      };
      setDelegations([...delegations, delegation]);
    },
  });

  return { delegations, address };
}

