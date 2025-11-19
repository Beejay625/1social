'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalSchedule {
  tokenAddress: string;
  proposal: {
    targets: string[];
    values: bigint[];
    calldatas: string[];
    description: string;
  };
  scheduleTime: number;
}

export function useTokenGovernanceProposalScheduler() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [scheduling, setScheduling] = useState(false);

  const scheduleProposal = async (schedule: ProposalSchedule) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule governance proposal for ${schedule.scheduleTime}`;
      await signMessageAsync({ message });

      await writeContract({
        address: schedule.tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'scheduleProposal',
        args: [
          schedule.proposal.targets,
          schedule.proposal.values,
          schedule.proposal.calldatas,
          schedule.proposal.description,
          schedule.scheduleTime,
        ],
      });
    } finally {
      setScheduling(false);
    }
  };

  return {
    scheduleProposal,
    scheduling,
    address,
    isConnected,
  };
}

