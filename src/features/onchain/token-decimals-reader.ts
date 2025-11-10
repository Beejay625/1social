'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface DecimalsInfo {
  token: string;
  decimals: number;
  formatted: string;
}

export function useTokenDecimalsReader() {
  const { address } = useAccount();
  const { data: decimals } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'decimals',
  });
  const [decimalsInfo, setDecimalsInfo] = useState<DecimalsInfo[]>([]);

  useEffect(() => {
    if (!address || decimals === undefined) return;
    
    const info: DecimalsInfo = {
      token: 'ETH',
      decimals: Number(decimals),
      formatted: `1e${decimals}`,
    };
    
    setDecimalsInfo([info]);
  }, [address, decimals]);

  return { decimalsInfo, address };
}

