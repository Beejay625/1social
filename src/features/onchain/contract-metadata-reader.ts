'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContractMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
}

export function useContractMetadataReader() {
  const { address } = useAccount();
  const [metadata, setMetadata] = useState<ContractMetadata | null>(null);

  const { data: name } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'name',
    args: [],
    query: { enabled: !!address },
  });

  const { data: symbol } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'symbol',
    args: [],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (name && symbol) {
      setMetadata({
        name: name as string || '',
        symbol: symbol as string || '',
        decimals: 18,
        totalSupply: BigInt(0),
      });
    }
  }, [name, symbol]);

  return { metadata, address };
}

