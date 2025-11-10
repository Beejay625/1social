'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Constant {
  contract: string;
  name: string;
  value: any;
  timestamp: number;
}

export function useContractConstantReader() {
  const { address } = useAccount();
  const [constants, setConstants] = useState<Constant[]>([]);

  const { data: constData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getConstant',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && constData) {
      const constant: Constant = {
        contract: '0x',
        name: 'MAX_SUPPLY',
        value: constData,
        timestamp: Date.now(),
      };
      setConstants([constant]);
    }
  }, [address, constData]);

  return { constants, address };
}

