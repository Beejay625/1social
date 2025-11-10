'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface TokenNameInfo {
  token: string;
  name: string;
  address: string;
}

export function useTokenNameReader() {
  const { address } = useAccount();
  const { data: name } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'name',
  });
  const [names, setNames] = useState<TokenNameInfo[]>([]);

  useEffect(() => {
    if (!address || !name) return;
    
    const nameInfo: TokenNameInfo = {
      token: '0x',
      name: name as string,
      address: '0x',
    };
    
    setNames([nameInfo]);
  }, [address, name]);

  return { names, address };
}

