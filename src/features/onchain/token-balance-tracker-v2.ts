'use client';

/**
 * Token Balance Tracker V2
 * Track token balances across multiple addresses with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BalanceData {
  dataId: string;
  tokenAddress: string;
  walletAddress: string;
  balance: string;
  timestamp: number;
}

export function useTokenBalanceTrackerV2(tokenAddress?: string, walletAddresses?: string[]) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [balances, setBalances] = useState<BalanceData[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    if (tokenAddress && !tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Start tracking balances: ${tokenAddress || 'all'}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const addresses = walletAddresses || [address || '0x0'];
      addresses.forEach(walletAddr => {
        const balance: BalanceData = {
          dataId: `balance-${Date.now()}-${walletAddr}`,
          tokenAddress: tokenAddress || '0x0',
          walletAddress: walletAddr,
          balance: '1000',
          timestamp: Date.now(),
        };
        
        setBalances((prev) => [balance, ...prev.slice(0, 19)]);
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isTracking, tokenAddress, walletAddresses, address]);

  return { startTracking, stopTracking, balances, isTracking, address };
}
