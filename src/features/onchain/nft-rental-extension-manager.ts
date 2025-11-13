'use client';

/**
 * NFT Rental Extension Manager
 * Extend NFT rental periods with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RentalExtension {
  extensionId: string;
  rentalId: string;
  tokenId: string;
  collectionAddress: string;
  originalEndTime: number;
  newEndTime: number;
  extensionPeriod: number;
  timestamp: number;
}

export function useNFTRentalExtensionManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [extensions, setExtensions] = useState<RentalExtension[]>([]);

  const extendRental = async (
    rentalId: string,
    tokenId: string,
    collectionAddress: string,
    originalEndTime: number,
    extensionPeriod: number
  ): Promise<RentalExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (extensionPeriod <= 0) {
      throw new Error('Extension period must be greater than zero');
    }
    
    const message = `Extend rental: ${rentalId} by ${extensionPeriod}ms`;
    await signMessageAsync({ message });
    
    const extension: RentalExtension = {
      extensionId: `extend-${Date.now()}`,
      rentalId,
      tokenId,
      collectionAddress,
      originalEndTime,
      newEndTime: originalEndTime + extensionPeriod,
      extensionPeriod,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendRental, extensions, address };
}
