'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TimelockTx {
  id: string;
  target: string;
  data: string;
  executeTime: number;
  executed: boolean;
}

export function useTimelockTransactions() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [transactions, setTransactions] = useState<TimelockTx[]>([]);

  const scheduleTransaction = async (target: string, data: string, executeTime: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: target as `0x${string}`,
      abi: [],
      functionName: 'schedule',
      args: [data, executeTime],
    });

    const tx: TimelockTx = {
      id: txHash || '',
      target,
      data,
      executeTime,
      executed: false,
    };

    setTransactions([...transactions, tx]);
    return txHash;
  };

  return { scheduleTransaction, transactions, address };
}


