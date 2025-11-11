'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ERC20Info {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
  timestamp: number;
}

export function useContractERC20Checker() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<ERC20Info[]>([]);

  const { data: nameData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'name',
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && nameData) {
      const token: ERC20Info = {
        contract: '0x',
        name: (nameData as string) || '',
        symbol: '',
        decimals: 18,
        timestamp: Date.now(),
      };
      setTokens([token]);
    }
  }, [address, nameData]);

  return { tokens, address };
}

