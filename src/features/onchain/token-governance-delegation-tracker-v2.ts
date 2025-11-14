'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Delegation {
  delegator: string;
  delegatee: string;
  votingPower: bigint;
}

export function useTokenGovernanceDelegationTrackerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const { data: delegationData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'delegates',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const track = async (governanceAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Track governance delegations`;
    await signMessageAsync({ message });

    if (delegationData) {
      const delegation: Delegation = {
        delegator: address,
        delegatee: delegationData as string,
        votingPower: 1000n,
      };
      setDelegations([delegation]);
    }
  };

  return {
    track,
    delegations,
    address,
    isConnected,
    delegationData,
  };
}

