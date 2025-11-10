'use client';

import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'viem';

export interface Tip {
  from: string;
  amount: string;
  contentId: string;
  timestamp: number;
}

export function useTipCollector() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { writeContract } = useWriteContract();
  const [tips, setTips] = useState<Tip[]>([]);

  const collectTip = async (amount: string, contentId: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'collectTip',
      args: [contentId],
      value: parseEther(amount),
    });

    const tip: Tip = {
      from: address,
      amount,
      contentId,
      timestamp: Date.now(),
    };

    setTips([...tips, tip]);
    return txHash;
  };

  return { collectTip, tips, balance, isConnected, address };
}

