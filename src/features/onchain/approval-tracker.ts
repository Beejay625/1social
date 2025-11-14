'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface Approval {
  owner: string;
  spender: string;
  value: bigint;
  token: string;
  timestamp: number;
}

export function useApprovalTracker() {
  const { address } = useAccount();
  const [approvals, setApprovals] = useState<Approval[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Approval',
    onLogs(logs) {
      const approval: Approval = {
        owner: logs[0]?.args?.owner || '',
        spender: logs[0]?.args?.spender || '',
        value: logs[0]?.args?.value || BigInt(0),
        token: '0x',
        timestamp: Date.now(),
      };
      setApprovals([...approvals, approval]);
    },
  });

  return { approvals, address };
}


