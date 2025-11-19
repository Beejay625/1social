'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AllowlistConfig {
  addresses: string[];
  maxMints: number[];
  startTime: number;
  endTime: number;
}

export function useNFTCollectionAllowlistManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: isInAllowlist } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isInAllowlist',
    args: [address],
  });

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'owner',
  });

  const setAllowlist = async (collectionAddress: string, config: AllowlistConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (address?.toLowerCase() !== (isOwner as string)?.toLowerCase()) {
      throw new Error('Only owner can manage allowlist');
    }
    setManaging(true);

    try {
      const message = `Set allowlist for ${config.addresses.length} addresses`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'setAllowlist',
        args: [config.addresses, config.maxMints, config.startTime, config.endTime],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setAllowlist,
    managing,
    address,
    isConnected,
    isInAllowlist,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
  };
}

