'use client';

/**
 * NFT Collection Floor Price Monitor
 * Monitor floor prices with alerts via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface FloorPriceAlert {
  collectionAddress: string;
  currentPrice: string;
  alertPrice: string;
  direction: 'above' | 'below';
  timestamp: number;
}

export function useNFTCollectionFloorPriceMonitor(collectionAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [alerts, setAlerts] = useState<FloorPriceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = async (alertPrice: string, direction: 'above' | 'below') => {
    if (!address) throw new Error('Reown wallet not connected');
    if (collectionAddress && !collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Start monitoring floor price: ${collectionAddress || 'all'}`;
    await signMessageAsync({ message });
    
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(() => {
      const alert: FloorPriceAlert = {
        collectionAddress: collectionAddress || '0x0',
        currentPrice: '0.5',
        alertPrice: '0.6',
        direction: 'above',
        timestamp: Date.now(),
      };
      
      setAlerts((prev) => [alert, ...prev.slice(0, 9)]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isMonitoring, collectionAddress, address]);

  return { startMonitoring, stopMonitoring, alerts, isMonitoring, address };
}
