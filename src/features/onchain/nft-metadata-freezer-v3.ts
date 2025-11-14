'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTMetadataFreezerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [freezing, setFreezing] = useState(false);

  const { data: isFrozen } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isFrozen',
    args: [0n],
    query: { enabled: isConnected },
  });

  const freeze = async (collectionAddress: string, tokenId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFreezing(true);

    try {
      const message = `Freeze metadata for token ${tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'freezeMetadata',
        args: [tokenId],
      });
    } finally {
      setFreezing(false);
    }
  };

  const unfreeze = async (collectionAddress: string, tokenId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFreezing(true);

    try {
      const message = `Unfreeze metadata for token ${tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'unfreezeMetadata',
        args: [tokenId],
      });
    } finally {
      setFreezing(false);
    }
  };

  return {
    freeze,
    unfreeze,
    freezing,
    address,
    isConnected,
    isFrozen,
  };
}
