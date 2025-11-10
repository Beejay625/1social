'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface ProposalCreated {
  proposalId: bigint;
  proposer: string;
  targets: string[];
  values: bigint[];
  timestamp: number;
}

export function useProposalCreatedTracker() {
  const { address } = useAccount();
  const [proposals, setProposals] = useState<ProposalCreated[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'ProposalCreated',
    onLogs(logs) {
      const proposal: ProposalCreated = {
        proposalId: logs[0]?.args?.proposalId || BigInt(0),
        proposer: logs[0]?.args?.proposer || '',
        targets: [],
        values: [],
        timestamp: Date.now(),
      };
      setProposals([...proposals, proposal]);
    },
  });

  return { proposals, address };
}

