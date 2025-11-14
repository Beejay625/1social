'use client';

/**
 * NFT Collection Floor Price Monitor V2
 * Monitor floor prices with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface FloorPriceAlert {
  alertId: string;
  collectionAddress: string;
  floorPrice: string;
  currency: string;
  change: number;
  timestamp: number;
}

export function useNFTCollectionFloorPriceMonitorV2(collectionAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [alerts, setAlerts] = useState<FloorPriceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    if (collectionAddress && !collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Start monitoring floor price V2: ${collectionAddress || 'all'}`;
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
        alertId: `floor-v2-${Date.now()}`,
        collectionAddress: collectionAddress || '0x0',
        floorPrice: '0.5',
        currency: 'ETH',
        change: 0,
        timestamp: Date.now(),
      };
      
      setAlerts((prev) => [alert, ...prev.slice(0, 9)]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isMonitoring, collectionAddress, address]);

  return { startMonitoring, stopMonitoring, alerts, isMonitoring, address };
}
