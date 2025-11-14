'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BatchMintConfig {
  tokenIds: bigint[];
  uris: string[];
  recipients: string[];
}

export function useNFTBatchMintOptimizerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [optimizing, setOptimizing] = useState(false);

  const optimizeAndMint = async (collectionAddress: string, config: BatchMintConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setOptimizing(true);

    try {
      const message = `Optimize and mint batch of ${config.tokenIds.length} NFTs`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'batchMint',
        args: [config.recipients, config.tokenIds, config.uris],
      });
    } finally {
      setOptimizing(false);
    }
  };

  return {
    optimizeAndMint,
    optimizing,
    address,
    isConnected,
  };
}

