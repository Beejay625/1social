'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface VotingPowerData {
  address: string;
  balance: bigint;
  delegated: bigint;
  received: bigint;
  totalPower: bigint;
  percentage: number;
}

export function useTokenGovernanceVotingPowerCalculator() {
  const { address, isConnected } = useAccount();
  const [votingPower, setVotingPower] = useState<VotingPowerData | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: balance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: delegated } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'delegated',
    args: [address],
  });

  const { data: received } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVotes',
    args: [address],
  });

  useEffect(() => {
    if (address && isConnected) {
      calculatePower();
    }
  }, [address, isConnected, balance, delegated, received]);

  const calculatePower = async () => {
    if (!address) return;
    setLoading(true);

    try {
      const bal = (balance as bigint) || BigInt(0);
      const del = (delegated as bigint) || BigInt(0);
      const rec = (received as bigint) || BigInt(0);
      const total = bal + rec - del;

      const data: VotingPowerData = {
        address,
        balance: bal,
        delegated: del,
        received: rec,
        totalPower: total,
        percentage: 0,
      };

      setVotingPower(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    votingPower,
    loading,
    address,
    isConnected,
    refresh: calculatePower,
  };
}

