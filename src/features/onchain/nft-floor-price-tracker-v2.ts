'use client';

/**
 * NFT Floor Price Tracker V2
 * Track floor prices with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface FloorPrice {
  trackingId: string;
  collectionAddress: string;
  floorPrice: string;
  currency: string;
  timestamp: number;
}

export function useNFTFloorPriceTrackerV2(collectionAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [prices, setPrices] = useState<FloorPrice[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    if (collectionAddress && !collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Start tracking floor price: ${collectionAddress || 'all'}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const price: FloorPrice = {
        trackingId: `track-${Date.now()}`,
        collectionAddress: collectionAddress || '0x0',
        floorPrice: '0.5',
        currency: 'ETH',
        timestamp: Date.now(),
      };
      
      setPrices((prev) => [price, ...prev.slice(0, 9)]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isTracking, collectionAddress, address]);

  return { startTracking, stopTracking, prices, isTracking, address };
}
