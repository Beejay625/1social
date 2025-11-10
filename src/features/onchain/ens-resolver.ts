'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ENSRecord {
  name: string;
  address: string;
  resolver: string;
  wallet: string;
}

export function useENSResolver() {
  const { address } = useAccount();
  const [records, setRecords] = useState<ENSRecord[]>([]);

  const { data: ensData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'resolve',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && ensData) {
      const record: ENSRecord = {
        name: (ensData as any)?.name || '',
        address,
        resolver: '0x',
        wallet: address,
      };
      setRecords([record]);
    }
  }, [address, ensData]);

  return { records, address };
}
