'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface SupplyInfo {
  collectionAddress: string;
  currentSupply: number;
  maxSupply: number;
  remainingSupply: number;
  mintedPercentage: number;
}

export function useNFTCollectionSupplyTracker() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [supplies, setSupplies] = useState<SupplyInfo[]>([]);

  const trackSupply = async (collectionAddress: string, currentSupply: number, maxSupply: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Track supply for collection ${collectionAddress}: ${currentSupply}/${maxSupply}`;
    await signMessageAsync({ message });
    
    const remainingSupply = maxSupply - currentSupply;
    const mintedPercentage = (currentSupply / maxSupply) * 100;
    
    const supply: SupplyInfo = {
      collectionAddress,
      currentSupply,
      maxSupply,
      remainingSupply,
      mintedPercentage,
    };
    
    setSupplies([...supplies, supply]);
    return supply;
  };

  return { 
    trackSupply, 
    supplies, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

