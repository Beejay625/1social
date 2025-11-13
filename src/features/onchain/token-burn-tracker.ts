'use client';

/**
 * Token Burn Tracker
 * Tracks token burns and calculates total burned amounts using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnRecord {
  tokenAddress: string;
  amount: string;
  txHash: string;
  timestamp: number;
  burner: string;
}

export function useTokenBurnTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [burns, setBurns] = useState<BurnRecord[]>([]);

  const trackBurn = async (
    tokenAddress: string,
    amount: string,
    txHash: string
  ): Promise<BurnRecord> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !txHash.startsWith('0x')) {
      throw new Error('Invalid address or transaction hash format');
    }
    
    const message = `Track token burn: ${tokenAddress} ${amount}`;
    await signMessageAsync({ message });
    
    const burn: BurnRecord = {
      tokenAddress,
      amount,
      txHash,
      timestamp: Date.now(),
      burner: address,
    };
    
    setBurns([...burns, burn]);
    return burn;
  };

  const getTotalBurned = (tokenAddress: string): string => {
    return burns
      .filter((b) => b.tokenAddress.toLowerCase() === tokenAddress.toLowerCase())
      .reduce((sum, b) => sum + BigInt(b.amount), BigInt(0))
      .toString();
  };

  return { trackBurn, burns, getTotalBurned, address };
}
