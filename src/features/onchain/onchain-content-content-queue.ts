'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentQueue {
  queueId: string;
  contentHashes: string[];
  priority: bigint;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentQueue() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [queuing, setQueuing] = useState(false);
  const [queues, setQueues] = useState<ContentQueue[]>([]);

  const { data: queueData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getQueues',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const addToQueue = async (contentHash: string, priority: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setQueuing(true);

    try {
      const message = `Add to queue onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'addToQueue',
        args: [contentHash, priority, address],
      });
    } finally {
      setQueuing(false);
    }
  };

  useEffect(() => {
    if (queueData) {
      const queue = queueData as ContentQueue;
      setQueues(prev => {
        const filtered = prev.filter(q => q.queueId !== queue.queueId);
        return [...filtered, queue];
      });
    }
  }, [queueData]);

  return {
    addToQueue,
    queuing,
    queues,
    address,
    isConnected,
    queueData,
  };
}

