'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BatchTransfer {
  nftAddress: string;
  tokenIds: bigint[];
  recipient: string;
}

export function useNFTBatchTransferOptimizerV4() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [transferring, setTransferring] = useState(false);
  const [gasEstimate, setGasEstimate] = useState<bigint | null>(null);

  const optimizeTransfer = async (transfer: BatchTransfer) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTransferring(true);

    try {
      const message = `Transfer ${transfer.tokenIds.length} NFTs`;
      await signMessageAsync({ message });

      // Optimize batch size for gas efficiency
      const optimalBatchSize = 50;
      const batches = Math.ceil(transfer.tokenIds.length / optimalBatchSize);

      for (let i = 0; i < batches; i++) {
        const start = i * optimalBatchSize;
        const end = Math.min(start + optimalBatchSize, transfer.tokenIds.length);
        const batch = transfer.tokenIds.slice(start, end);

        await writeContract({
          address: transfer.nftAddress as `0x${string}`,
          abi: [],
          functionName: 'safeBatchTransferFrom',
          args: [address, transfer.recipient, batch],
        });
      }
    } finally {
      setTransferring(false);
    }
  };

  return {
    optimizeTransfer,
    transferring,
    gasEstimate,
    address,
    isConnected,
  };
}
