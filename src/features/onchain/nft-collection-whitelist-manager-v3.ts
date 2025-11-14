'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface WhitelistConfig {
  addresses: string[];
  maxMintPerAddress: number;
  startTime: number;
  endTime: number;
}

export function useNFTCollectionWhitelistManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: whitelistCount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'whitelistCount',
  });

  const { data: isWhitelisted } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isWhitelisted',
    args: [address],
  });

  const setWhitelist = async (collectionAddress: string, config: WhitelistConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Set whitelist for ${config.addresses.length} addresses`;
      await signMessageAsync({ message });

      // Batch add to whitelist
      const batchSize = 100;
      const batches = Math.ceil(config.addresses.length / batchSize);

      for (let i = 0; i < batches; i++) {
        const start = i * batchSize;
        const end = Math.min(start + batchSize, config.addresses.length);
        const batch = config.addresses.slice(start, end);

        await writeContract({
          address: collectionAddress as `0x${string}`,
          abi: [],
          functionName: 'addToWhitelist',
          args: [batch, config.maxMintPerAddress, config.startTime, config.endTime],
        });
      }
    } finally {
      setManaging(false);
    }
  };

  const removeFromWhitelist = async (collectionAddress: string, addresses: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Remove ${addresses.length} addresses from whitelist`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'removeFromWhitelist',
        args: [addresses],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setWhitelist,
    removeFromWhitelist,
    managing,
    address,
    isConnected,
    whitelistCount,
    isWhitelisted,
  };
}
