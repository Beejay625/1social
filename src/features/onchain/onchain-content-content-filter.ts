'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentFilter {
  filterId: string;
  filterType: string;
  criteria: string[];
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentFilter() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState<ContentFilter[]>([]);

  const { data: filterData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getFilters',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createFilter = async (filterType: string, criteria: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFiltering(true);

    try {
      const message = `Create filter onchain: ${filterType}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createFilter',
        args: [filterType, criteria, address],
      });
    } finally {
      setFiltering(false);
    }
  };

  useEffect(() => {
    if (filterData) {
      const filter = filterData as ContentFilter;
      setFilters(prev => {
        const filtered = prev.filter(f => f.filterId !== filter.filterId);
        return [...filtered, filter];
      });
    }
  }, [filterData]);

  return {
    createFilter,
    filtering,
    filters,
    address,
    isConnected,
    filterData,
  };
}

