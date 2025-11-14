'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DelegationConfig {
  delegatee: string;
  delegationType: 'voting' | 'proposition' | 'both';
  expiry?: number;
}

export function useTokenGovernanceDelegateManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [delegating, setDelegating] = useState(false);

  const { data: currentDelegate } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'delegates',
    args: [address],
  });

  const { data: votingPower } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVotes',
    args: [address],
  });

  const delegate = async (tokenAddress: string, config: DelegationConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDelegating(true);

    try {
      const message = `Delegate to ${config.delegatee}`;
      await signMessageAsync({ message });

      if (config.delegationType === 'voting') {
        await writeContract({
          address: tokenAddress as `0x${string}`,
          abi: [],
          functionName: 'delegate',
          args: [config.delegatee],
        });
      } else if (config.delegationType === 'proposition') {
        await writeContract({
          address: tokenAddress as `0x${string}`,
          abi: [],
          functionName: 'delegatePropositionPower',
          args: [config.delegatee],
        });
      } else {
        await writeContract({
          address: tokenAddress as `0x${string}`,
          abi: [],
          functionName: 'delegateBoth',
          args: [config.delegatee],
        });
      }
    } finally {
      setDelegating(false);
    }
  };

  const undelegate = async (tokenAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDelegating(true);

    try {
      const message = 'Undelegate voting power';
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'delegate',
        args: [address],
      });
    } finally {
      setDelegating(false);
    }
  };

  return {
    delegate,
    undelegate,
    delegating,
    address,
    isConnected,
    currentDelegate,
    votingPower,
  };
}

