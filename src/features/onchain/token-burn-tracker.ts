'use client';

/**
 * Token Burn Tracker
 * Track token burns and calculate total burned amounts with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnRecord {
  burnId: string;
  tokenAddress: string;
  amount: string;
  totalBurned: string;
  burnedBy: string;
  timestamp: number;
}

export function useTokenBurnTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [burns, setBurns] = useState<BurnRecord[]>([]);

  const trackBurn = async (
    tokenAddress: string,
    amount: string
  ): Promise<BurnRecord> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Track burn: ${tokenAddress} amount ${amount}`;
    await signMessageAsync({ message });
    
    const totalBurned = burns
      .filter(b => b.tokenAddress === tokenAddress)
      .reduce((sum, b) => sum + parseFloat(b.amount), parseFloat(amount))
      .toFixed(2);
    
    const burn: BurnRecord = {
      burnId: `burn-${Date.now()}`,
      tokenAddress,
      amount,
      totalBurned,
      burnedBy: address,
      timestamp: Date.now(),
    };
    
    setBurns([...burns, burn]);
    return burn;
  };

  return { trackBurn, burns, address };
}
