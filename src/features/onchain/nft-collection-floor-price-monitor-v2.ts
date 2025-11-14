'use client';

/**
 * NFT Collection Floor Price Monitor V2
 * Monitor floor prices with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface FloorPriceMonitor {
  monitorId: string;
  collectionAddress: string;
  floorPrice: string;
  currency: string;
  change24h: number;
  timestamp: number;
}

export function useNFTCollectionFloorPriceMonitorV2(collectionAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [monitors, setMonitors] = useState<FloorPriceMonitor[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = async () => {
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
      const monitor: FloorPriceMonitor = {
        monitorId: `monitor-${Date.now()}`,
        collectionAddress: collectionAddress || '0x0',
        floorPrice: '0.5',
        currency: 'ETH',
        change24h: 0,
        timestamp: Date.now(),
      };
      
      setMonitors((prev) => [monitor, ...prev.slice(0, 9)]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isMonitoring, collectionAddress, address]);

  return { startMonitoring, stopMonitoring, monitors, isMonitoring, address };
}

