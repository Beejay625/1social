'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface AdminAction {
  admin: string;
  action: string;
  target: string;
  timestamp: number;
}

export function useAdminActionTracker() {
  const { address } = useAccount();
  const [actions, setActions] = useState<AdminAction[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'AdminAction',
    onLogs(logs) {
      const action: AdminAction = {
        admin: logs[0]?.args?.admin || '',
        action: logs[0]?.args?.action || '',
        target: logs[0]?.args?.target || '',
        timestamp: Date.now(),
      };
      setActions([...actions, action]);
    },
  });

  return { actions, address };
}

