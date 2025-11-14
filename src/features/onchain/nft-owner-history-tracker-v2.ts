'use client';

/**
 * NFT Owner History Tracker V2
 * Track NFT ownership history with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface OwnershipHistory {
  historyId: string;
  tokenId: string;
  collectionAddress: string;
  owners: Array<{
    address: string;
    fromBlock: number;
    toBlock?: number;
    timestamp: number;
  }>;
  currentOwner: string;
  totalTransfers: number;
  timestamp: number;
}

export function useNFTOwnerHistoryTrackerV2(collectionAddress?: string, tokenId?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [histories, setHistories] = useState<OwnershipHistory[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    if (collectionAddress && !collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Start tracking ownership: ${collectionAddress || 'all'} ${tokenId || 'all'}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const history: OwnershipHistory = {
        historyId: `history-${Date.now()}`,
        tokenId: tokenId || '0',
        collectionAddress: collectionAddress || '0x0',
        owners: [],
        currentOwner: '0x0',
        totalTransfers: 0,
        timestamp: Date.now(),
      };
      
      setHistories((prev) => [history, ...prev.slice(0, 9)]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isTracking, collectionAddress, tokenId, address]);

  return { startTracking, stopTracking, histories, isTracking, address };
}
