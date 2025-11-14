'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FeeCollection {
  poolAddress: string;
  amount: bigint;
  recipient: string;
}

export function useTokenLiquidityPoolFeeCollectorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [collecting, setCollecting] = useState(false);

  const { data: feesAvailable } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getFees',
  });

  const collectFees = async (collection: FeeCollection) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCollecting(true);

    try {
      const message = `Collect fees from pool: ${collection.poolAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collection.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'collectFees',
        args: [collection.recipient],
      });
    } finally {
      setCollecting(false);
    }
  };

  return {
    collectFees,
    collecting,
    address,
    isConnected,
    feesAvailable,
  };
}

