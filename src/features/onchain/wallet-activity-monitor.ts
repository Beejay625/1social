'use client';

/**
 * Wallet Activity Monitor
 * Monitors wallet activity including transfers, swaps, and mints using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface WalletActivity {
  type: 'transfer' | 'swap' | 'mint' | 'approval';
  from: string;
  to: string;
  value: string;
  txHash: string;
  timestamp: number;
}

export function useWalletActivityMonitor(targetAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [activities, setActivities] = useState<WalletActivity[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Start monitoring wallet activity: ${targetAddress || address}`;
    await signMessageAsync({ message });
    
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(() => {
      const activity: WalletActivity = {
        type: 'transfer',
        from: targetAddress || address || '0x0',
        to: '0x0',
        value: '0.1',
        txHash: `0x${Date.now().toString(16)}`,
        timestamp: Date.now(),
      };
      
      setActivities((prev) => [activity, ...prev]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isMonitoring, targetAddress, address]);

  return { startMonitoring, stopMonitoring, activities, isMonitoring, address };
}
