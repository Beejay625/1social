'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTCollectionMintPriceManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: currentPrice } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'mintPrice',
  });

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'owner',
  });

  const setMintPrice = async (collectionAddress: string, price: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (address?.toLowerCase() !== (isOwner as string)?.toLowerCase()) {
      throw new Error('Only owner can set mint price');
    }
    setManaging(true);

    try {
      const message = `Set mint price to ${price}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'setMintPrice',
        args: [price],
      });
    } finally {
      setManaging(false);
    }
  };

  const setDynamicPricing = async (collectionAddress: string, basePrice: bigint, increment: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      await signMessageAsync({ message: 'Configure dynamic pricing' });
      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'setDynamicPricing',
        args: [basePrice, increment],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setMintPrice,
    setDynamicPricing,
    managing,
    address,
    isConnected,
    currentPrice,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
  };
}

