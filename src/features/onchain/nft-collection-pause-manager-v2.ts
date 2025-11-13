'use client';

/**
 * NFT Collection Pause Manager V2
 * Pause/unpause NFT collections with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PauseStatus {
  collectionAddress: string;
  isPaused: boolean;
  pausedBy: string;
  reason?: string;
  timestamp: number;
}

export function useNFTCollectionPauseManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [pauseStatuses, setPauseStatuses] = useState<PauseStatus[]>([]);

  const pause = async (collectionAddress: string, reason?: string): Promise<PauseStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Pause collection: ${collectionAddress}${reason ? ` - ${reason}` : ''}`;
    await signMessageAsync({ message });
    
    const status: PauseStatus = {
      collectionAddress,
      isPaused: true,
      pausedBy: address,
      reason,
      timestamp: Date.now(),
    };
    
    setPauseStatuses([...pauseStatuses, status]);
    return status;
  };

  const unpause = async (collectionAddress: string): Promise<PauseStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Unpause collection: ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const status: PauseStatus = {
      collectionAddress,
      isPaused: false,
      pausedBy: address,
      timestamp: Date.now(),
    };
    
    setPauseStatuses([...pauseStatuses, status]);
    return status;
  };

  return { pause, unpause, pauseStatuses, address };
}

