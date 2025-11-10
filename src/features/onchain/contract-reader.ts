'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface ContractData {
  address: string;
  functionName: string;
  result: any;
  timestamp: number;
}

export function useContractReader() {
  const { address } = useAccount();
  const [readings, setReadings] = useState<ContractData[]>([]);

  const { data: contractData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'read',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const readContract = (contractAddress: string, functionName: string) => {
    const reading: ContractData = {
      address: contractAddress,
      functionName,
      result: contractData,
      timestamp: Date.now(),
    };
    setReadings([...readings, reading]);
    return reading;
  };

  return { readContract, readings, address };
}
