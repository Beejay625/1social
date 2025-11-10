'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface ProposalExecuted {
  proposalId: bigint;
  timestamp: number;
}

export function useProposalExecutedTracker() {
  const { address } = useAccount();
  const [executions, setExecutions] = useState<ProposalExecuted[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'ProposalExecuted',
    onLogs(logs) {
      const execution: ProposalExecuted = {
        proposalId: logs[0]?.args?.proposalId || BigInt(0),
        timestamp: Date.now(),
      };
      setExecutions([...executions, execution]);
    },
  });

  return { executions, address };
}

