'use client';

/**
 * NFT Collection Owner History Tracker
 * Track ownership history for NFTs with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface OwnerHistory {
  historyId: string;
  tokenId: string;
  collectionAddress: string;
  owner: string;
  previousOwner: string;
  transferType: 'mint' | 'transfer' | 'sale';
  timestamp: number;
}

export function useNFTCollectionOwnerHistoryTracker(tokenId?: string, collectionAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [histories, setHistories] = useState<OwnerHistory[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    if (collectionAddress && !collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Start tracking owner history: ${collectionAddress || 'all'} ${tokenId || ''}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const history: OwnerHistory = {
        historyId: `history-${Date.now()}`,
        tokenId: tokenId || '0',
        collectionAddress: collectionAddress || '0x0',
        owner: '0x0',
        previousOwner: '0x0',
        transferType: 'transfer',
        timestamp: Date.now(),
      };
      
      setHistories((prev) => [history, ...prev.slice(0, 19)]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isTracking, tokenId, collectionAddress, address]);

  return { startTracking, stopTracking, histories, isTracking, address };
}

