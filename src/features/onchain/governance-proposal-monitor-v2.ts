'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Proposal {
  proposalId: bigint;
  title: string;
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'executed';
  votesFor: bigint;
  votesAgainst: bigint;
  endTime: bigint;
}

export function useGovernanceProposalMonitorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [monitoring, setMonitoring] = useState(false);

  const { data: proposalData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getProposals',
    query: { enabled: isConnected && monitoring },
  });

  const startMonitoring = async (governanceAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Monitor governance proposals`;
    await signMessageAsync({ message });

    setMonitoring(true);
  };

  useEffect(() => {
    if (proposalData) {
      const newProposals = proposalData as Proposal[];
      setProposals(newProposals);
    }
  }, [proposalData]);

  return {
    startMonitoring,
    proposals,
    monitoring,
    address,
    isConnected,
  };
}

