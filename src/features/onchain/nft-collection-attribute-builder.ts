'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AttributeSet {
  traitType: string;
  values: Array<{
    value: string | number;
    rarity: number;
    weight?: number;
  }>;
}

export function useNFTCollectionAttributeBuilder() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [building, setBuilding] = useState(false);

  const buildAttributes = async (collectionAddress: string, attributes: AttributeSet[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBuilding(true);

    try {
      const message = `Build attribute sets for collection`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'setAttributes',
        args: [attributes],
      });
    } finally {
      setBuilding(false);
    }
  };

  return {
    buildAttributes,
    building,
    address,
    isConnected,
  };
}

