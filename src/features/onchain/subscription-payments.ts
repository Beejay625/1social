'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Subscription {
  id: string;
  subscriber: string;
  creator: string;
  amount: bigint;
  interval: number;
  active: boolean;
}

export function useSubscriptionPayments() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const subscribe = async (creator: string, amount: string, interval: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'subscribe',
      args: [creator, BigInt(amount), interval],
    });

    const subscription: Subscription = {
      id: txHash || '',
      subscriber: address,
      creator,
      amount: BigInt(amount),
      interval,
      active: true,
    };

    setSubscriptions([...subscriptions, subscription]);
    return txHash;
  };

  return { subscribe, subscriptions, address };
}


