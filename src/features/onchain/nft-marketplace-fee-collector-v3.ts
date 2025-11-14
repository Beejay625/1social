'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTMarketplaceFeeCollectorV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [collecting, setCollecting] = useState(false);

  const { data: feesAvailable } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getFees',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const collect = async (marketplaceAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCollecting(true);

    try {
      const message = `Collect marketplace fees`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'collectFees',
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
    feesAvailable,
  };
}

