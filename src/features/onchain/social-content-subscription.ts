'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Subscription {
  id: string;
  subscriber: string;
  creator: string;
  price: string;
  currency: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startTime: number;
  endTime: number;
  active: boolean;
}

export function useSocialContentSubscription() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const subscribe = async (
    creator: string,
    price: string,
    currency: string,
    period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Subscribe: ${creator} ${price} ${currency} ${period}`;
    await signMessageAsync({ message });
    
    const periodMs = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
      yearly: 365 * 24 * 60 * 60 * 1000,
    };
    
    const subscription: Subscription = {
      id: `sub-${Date.now()}`,
      subscriber: address,
      creator,
      price,
      currency,
      period,
      startTime: Date.now(),
      endTime: Date.now() + periodMs[period],
      active: true,
    };
    
    setSubscriptions([...subscriptions, subscription]);
    return subscription;
  };

  return { subscribe, subscriptions, address };
}


