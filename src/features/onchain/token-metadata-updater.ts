'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TokenMetadata {
  token: string;
  name: string;
  symbol: string;
  decimals: number;
  updated: boolean;
}

export function useTokenMetadataUpdater() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [metadata, setMetadata] = useState<TokenMetadata[]>([]);

  const updateMetadata = async (token: string, name: string, symbol: string, decimals: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'updateMetadata',
      args: [name, symbol, decimals],
    });

    const meta: TokenMetadata = {
      token,
      name,
      symbol,
      decimals,
      updated: true,
    };

    setMetadata([...metadata, meta]);
    return txHash;
  };

  return { updateMetadata, metadata, address };
}


