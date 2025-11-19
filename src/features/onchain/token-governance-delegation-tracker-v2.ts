'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface DelegationTracking {
  delegator: string;
  delegatee: string;
  votingPower: bigint;
  delegationType: 'voting' | 'proposition' | 'both';
  expiry?: number;
}

export function useTokenGovernanceDelegationTrackerV2() {
  const { address, isConnected } = useAccount();
  const [delegations, setDelegations] = useState<DelegationTracking[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: currentDelegate } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'delegates',
    args: [address],
  });

  const { data: delegatedVotes } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVotes',
    args: [currentDelegate || address],
  });

  useEffect(() => {
    if (address && isConnected) {
      fetchDelegations();
    }
  }, [address, isConnected, currentDelegate, delegatedVotes]);

  const fetchDelegations = async () => {
    if (!address) return;
    setLoading(true);

    try {
      const delegations: DelegationTracking[] = [];
      if (currentDelegate) {
        delegations.push({
          delegator: address,
          delegatee: currentDelegate as string,
          votingPower: (delegatedVotes as bigint) || BigInt(0),
          delegationType: 'both',
        });
      }
      setDelegations(delegations);
    } finally {
      setLoading(false);
    }
  };

  return {
    delegations,
    loading,
    address,
    isConnected,
    refresh: fetchDelegations,
  };
}
