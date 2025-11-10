'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface VotingPower {
  voter: string;
  power: bigint;
  proposalId: string;
  delegated: boolean;
}

export function useVotingPowerTracker() {
  const { address } = useAccount();
  const { data: power } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVotes',
    args: [address],
  });
  const [powers, setPowers] = useState<VotingPower[]>([]);

  useEffect(() => {
    if (!address || !power) return;
    
    const votingPower: VotingPower = {
      voter: address,
      power: BigInt(power as string),
      proposalId: '0',
      delegated: false,
    };
    
    setPowers([votingPower]);
  }, [address, power]);

  return { powers, address };
}
