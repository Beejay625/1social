'use client';

/**
 * NFT Collection Pause Manager V2
 * Pause/unpause NFT collections with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PauseStatus {
  statusId: string;
  collectionAddress: string;
  paused: boolean;
  pausedBy: string;
  reason?: string;
  timestamp: number;
}

export function useNFTCollectionPauseManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [statuses, setStatuses] = useState<PauseStatus[]>([]);

  const pause = async (collectionAddress: string, reason?: string): Promise<PauseStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Pause collection: ${collectionAddress}${reason ? ` - ${reason}` : ''}`;
    await signMessageAsync({ message });
    
    const status: PauseStatus = {
      statusId: `pause-${Date.now()}`,
      collectionAddress,
      paused: true,
      pausedBy: address,
      reason,
      timestamp: Date.now(),
    };
    
    setStatuses([...statuses, status]);
    return status;
  };

  const unpause = async (collectionAddress: string): Promise<PauseStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Unpause collection: ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const status: PauseStatus = {
      statusId: `unpause-${Date.now()}`,
      collectionAddress,
      paused: false,
      pausedBy: address,
      timestamp: Date.now(),
    };
    
    setStatuses([...statuses, status]);
    return status;
  };

  return { pause, unpause, statuses, address };
}
