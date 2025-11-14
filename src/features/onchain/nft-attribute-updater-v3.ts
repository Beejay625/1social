'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AttributeUpdate {
  tokenId: bigint;
  attributes: Record<string, string>;
}

export function useNFTAttributeUpdaterV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [updating, setUpdating] = useState(false);

  const update = async (collectionAddress: string, update: AttributeUpdate) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setUpdating(true);

    try {
      const message = `Update attributes for token ${update.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'updateAttributes',
        args: [update.tokenId, JSON.stringify(update.attributes)],
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
  };
}
