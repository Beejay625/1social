'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DropConfig {
  maxSupply: number;
  price: bigint;
  startTime: number;
  endTime: number;
  whitelistOnly: boolean;
}

export function useNFTCollectionDropManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const createDrop = async (collectionAddress: string, config: DropConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create NFT drop: ${config.maxSupply} NFTs`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'createDrop',
        args: [
          config.maxSupply,
          config.price,
          config.startTime,
          config.endTime,
          config.whitelistOnly,
        ],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    createDrop,
    managing,
    address,
    isConnected,
  };
}

