'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface BurnBatch {
  collectionAddress: string;
  tokenIds: string[];
  burnId: string;
  timestamp: number;
}

export function useNFTBatchBurnManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [burnBatches, setBurnBatches] = useState<BurnBatch[]>([]);

  const burnBatch = async (collectionAddress: string, tokenIds: string[]) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Burn ${tokenIds.length} NFTs from collection ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const burnBatch: BurnBatch = {
      collectionAddress,
      tokenIds,
      burnId: `burn_${Date.now()}`,
      timestamp: Date.now(),
    };
    
    setBurnBatches([...burnBatches, burnBatch]);
    return burnBatch;
  };

  return { 
    burnBatch, 
    burnBatches, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

