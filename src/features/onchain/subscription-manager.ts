'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Subscription {
  subscriber: string;
  creator: string;
  amount: string;
  interval: 'monthly' | 'yearly';
  active: boolean;
  wallet: string;
}

export function useSubscriptionManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const createSubscription = async (creator: string, amount: string, interval: 'monthly' | 'yearly') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Subscribe: ${creator} ${amount} ${interval}`;
    await signMessageAsync({ message });
    
    const subscription: Subscription = {
      subscriber: address,
      creator,
      amount,
      interval,
      active: true,
      wallet: address,
    };
    
    setSubscriptions([...subscriptions, subscription]);
    return subscription;
  };

  return { createSubscription, subscriptions, address };
}

