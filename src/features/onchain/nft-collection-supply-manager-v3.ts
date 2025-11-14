'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SupplyConfig {
  maxSupply?: number;
  reserveSupply?: number;
  publicMintSupply?: number;
  whitelistMintSupply?: number;
}

export function useNFTCollectionSupplyManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: totalSupply } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalSupply',
  });

  const { data: maxSupply } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'maxSupply',
  });

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'owner',
  });

  const updateSupply = async (collectionAddress: string, config: SupplyConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (address?.toLowerCase() !== (isOwner as string)?.toLowerCase()) {
      throw new Error('Only owner can update supply');
    }
    setManaging(true);

    try {
      const message = 'Update collection supply configuration';
      await signMessageAsync({ message });

      if (config.maxSupply !== undefined) {
        await writeContract({
          address: collectionAddress as `0x${string}`,
          abi: [],
          functionName: 'setMaxSupply',
          args: [config.maxSupply],
        });
      }

      if (config.reserveSupply !== undefined) {
        await writeContract({
          address: collectionAddress as `0x${string}`,
          abi: [],
          functionName: 'setReserveSupply',
          args: [config.reserveSupply],
        });
    }
    } finally {
      setManaging(false);
    }
  };

  const mintReserve = async (collectionAddress: string, to: string, amount: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (address?.toLowerCase() !== (isOwner as string)?.toLowerCase()) {
      throw new Error('Only owner can mint reserve');
    }
    setManaging(true);

    try {
      const message = `Mint reserve: ${amount} tokens to ${to}`;
    await signMessageAsync({ message });
    
      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'mintReserve',
        args: [to, amount],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    updateSupply,
    mintReserve,
    managing,
    address,
    isConnected,
    totalSupply,
    maxSupply,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
  };
}
