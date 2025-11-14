'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AirdropConfig {
  tokenAddress: string;
  recipients: string[];
  amounts: bigint[];
  batchSize: number;
}

export function useTokenAirdropManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [airdropping, setAirdropping] = useState(false);
  const [progress, setProgress] = useState(0);

  const { data: totalRecipients } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalRecipients',
    args: [address],
  });

  const executeAirdrop = async (config: AirdropConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setAirdropping(true);
    setProgress(0);

    try {
      // Sign message for verification
      const message = `Airdrop ${config.recipients.length} recipients`;
      await signMessageAsync({ message });

      // Execute batch airdrop
      const batches = Math.ceil(config.recipients.length / config.batchSize);
      for (let i = 0; i < batches; i++) {
        const start = i * config.batchSize;
        const end = Math.min(start + config.batchSize, config.recipients.length);
        const batchRecipients = config.recipients.slice(start, end);
        const batchAmounts = config.amounts.slice(start, end);

        await writeContract({
          address: config.tokenAddress as `0x${string}`,
          abi: [],
          functionName: 'airdrop',
          args: [batchRecipients, batchAmounts],
        });

        setProgress(Math.round(((i + 1) / batches) * 100));
      }
    } finally {
      setAirdropping(false);
    }
  };

  return {
    executeAirdrop,
    airdropping,
    progress,
    address,
    isConnected,
    totalRecipients,
  };
}

