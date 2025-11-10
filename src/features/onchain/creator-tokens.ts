'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'viem';

export interface CreatorToken {
  symbol: string;
  totalSupply: bigint;
  price: bigint;
  holders: number;
}

export function useCreatorTokens() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [tokens, setTokens] = useState<CreatorToken[]>([]);

  const { data: tokenBalance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const mintCreatorToken = async (symbol: string, supply: string) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'mint',
      args: [symbol, parseEther(supply)],
    });

    const token: CreatorToken = {
      symbol,
      totalSupply: parseEther(supply),
      price: BigInt(0),
      holders: 1,
    };

    setTokens([...tokens, token]);
    return txHash;
  };

  return { mintCreatorToken, tokens, tokenBalance, isConnected, address };
}
