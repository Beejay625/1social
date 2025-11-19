'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface SearchIndex {
  keyword: string;
  contentHashes: string[];
  score: bigint;
  timestamp: bigint;
}

export function useOnchainContentSearchIndexer() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [indexing, setIndexing] = useState(false);
  const [indices, setIndices] = useState<SearchIndex[]>([]);

  const { data: indexData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getSearchIndices',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const indexContent = async (contentHash: string, keywords: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setIndexing(true);

    try {
      const message = `Index content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'indexContent',
        args: [contentHash, keywords, address],
      });
    } finally {
      setIndexing(false);
    }
  };

  useEffect(() => {
    if (indexData) {
      const index = indexData as SearchIndex;
      setIndices(prev => {
        const filtered = prev.filter(i => i.keyword !== index.keyword);
        return [...filtered, index];
      });
    }
  }, [indexData]);

  return {
    indexContent,
    indexing,
    indices,
    address,
    isConnected,
    indexData,
  };
}

