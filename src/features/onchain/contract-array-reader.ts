'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ArrayData {
  contract: string;
  name: string;
  length: number;
  values: any[];
  timestamp: number;
}

export function useContractArrayReader() {
  const { address } = useAccount();
  const [arrays, setArrays] = useState<ArrayData[]>([]);

  const { data: arrayData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getArray',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && arrayData) {
      const array: ArrayData = {
        contract: '0x',
        name: 'users',
        length: Array.isArray(arrayData) ? arrayData.length : 0,
        values: Array.isArray(arrayData) ? arrayData : [],
        timestamp: Date.now(),
      };
      setArrays([array]);
    }
  }, [address, arrayData]);

  return { arrays, address };
}


