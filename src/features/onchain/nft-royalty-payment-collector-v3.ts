'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTRoyaltyPaymentCollectorV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [collecting, setCollecting] = useState(false);

  const { data: pendingRoyalties } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'pendingRoyalties',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const collect = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCollecting(true);

    try {
      const message = `Collect pending royalties`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'collectRoyalties',
        args: [address],
      });
    } finally {
      setCollecting(false);
    }
  };

  return {
    collect,
    collecting,
    address,
    isConnected,
    pendingRoyalties,
  };
}

