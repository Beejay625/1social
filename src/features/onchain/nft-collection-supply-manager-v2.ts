'use client';

/**
 * NFT Collection Supply Manager V2
 * Manage collection max supply with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SupplyConfig {
  collectionAddress: string;
  currentSupply: number;
  maxSupply: number;
  updatedBy: string;
  timestamp: number;
}

export function useNFTCollectionSupplyManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [configs, setConfigs] = useState<SupplyConfig[]>([]);

  const updateMaxSupply = async (
    collectionAddress: string,
    maxSupply: number
  ): Promise<SupplyConfig> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (maxSupply <= 0) {
      throw new Error('Max supply must be greater than zero');
    }
    
    const message = `Update max supply: ${collectionAddress} to ${maxSupply}`;
    await signMessageAsync({ message });
    
    const config: SupplyConfig = {
      collectionAddress,
      currentSupply: 0,
      maxSupply,
      updatedBy: address,
      timestamp: Date.now(),
    };
    
    setConfigs([...configs, config]);
    return config;
  };

  return { updateMaxSupply, configs, address };
}

