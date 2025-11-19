'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LazyMintBatch {
  collectionAddress: string;
  metadataURIs: string[];
  recipients: string[];
  signatureExpiry: number;
}

export function useNFTLazyMintBatchOptimizer() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [optimizing, setOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);

  const optimizeLazyMint = async (batch: LazyMintBatch) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setOptimizing(true);
    setProgress(0);

    try {
      const message = `Lazy mint ${batch.metadataURIs.length} NFTs`;
      await signMessageAsync({ message });

      const optimalBatchSize = 30;
      const batches = Math.ceil(batch.metadataURIs.length / optimalBatchSize);

      for (let i = 0; i < batches; i++) {
        const start = i * optimalBatchSize;
        const end = Math.min(start + optimalBatchSize, batch.metadataURIs.length);
        const metadataBatch = batch.metadataURIs.slice(start, end);
        const recipientBatch = batch.recipients.slice(start, end);

        await writeContract({
          address: batch.collectionAddress as `0x${string}`,
          abi: [],
          functionName: 'lazyMintBatch',
          args: [metadataBatch, recipientBatch, batch.signatureExpiry],
        });

        setProgress(Math.round(((i + 1) / batches) * 100));
      }
    } finally {
      setOptimizing(false);
    }
  };

  return {
    optimizeLazyMint,
    optimizing,
    progress,
    address,
    isConnected,
  };
}

