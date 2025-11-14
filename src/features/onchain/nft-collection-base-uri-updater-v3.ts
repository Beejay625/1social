'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTCollectionBaseURIUpdaterV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [updating, setUpdating] = useState(false);

  const { data: currentURI } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'baseURI',
    query: { enabled: isConnected },
  });

  const update = async (collectionAddress: string, newURI: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setUpdating(true);

    try {
      const message = `Update collection base URI: ${newURI}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'setBaseURI',
        args: [newURI],
      });
    } finally {
      setUpdating(false);
    }
  };

  return {
    update,
    updating,
    address,
    isConnected,
    currentURI,
  };
}

