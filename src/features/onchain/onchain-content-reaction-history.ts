'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ReactionHistory {
  contentHash: string;
  reactions: Array<{
    reactionType: string;
    reactor: string;
    timestamp: bigint;
  }>;
}

export function useOnchainContentReactionHistory() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState<ReactionHistory[]>([]);

  const { data: historyData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReactionHistory',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const fetchHistory = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setLoading(true);

    try {
      const message = `Fetch reaction history onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'fetchReactionHistory',
        args: [contentHash, address],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (historyData) {
      const history = historyData as ReactionHistory;
      setHistories(prev => {
        const filtered = prev.filter(h => h.contentHash !== history.contentHash);
        return [...filtered, history];
      });
    }
  }, [historyData]);

  return {
    fetchHistory,
    loading,
    histories,
    address,
    isConnected,
    historyData,
  };
}

