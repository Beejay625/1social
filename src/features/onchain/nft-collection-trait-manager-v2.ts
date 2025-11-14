'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TraitConfig {
  traitType: string;
  values: string[];
  rarity: number[];
}

export function useNFTCollectionTraitManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: collectionTraits } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getTraits',
    args: [address],
  });

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'owner',
  });

  const setTraits = async (collectionAddress: string, traits: TraitConfig[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (address?.toLowerCase() !== (isOwner as string)?.toLowerCase()) {
      throw new Error('Only owner can manage traits');
    }
    setManaging(true);

    try {
      const message = `Set traits for collection`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'setTraits',
        args: [traits.map(t => ({ traitType: t.traitType, values: t.values, rarity: t.rarity }))],
      });
    } finally {
      setManaging(false);
    }
  };

  const updateTraitRarity = async (collectionAddress: string, traitType: string, value: string, rarity: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Update trait rarity: ${traitType} - ${value}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'updateTraitRarity',
        args: [traitType, value, rarity],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setTraits,
    updateTraitRarity,
    managing,
    address,
    isConnected,
    collectionTraits,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
  };
}

