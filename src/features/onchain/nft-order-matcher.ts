'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface OrderMatch {
  orderId: string;
  tokenId: string;
  price: bigint;
  matched: boolean;
}

export function useNFTOrderMatcher() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [matches, setMatches] = useState<OrderMatch[]>([]);

  const matchOrder = async (orderId: string, tokenId: string, price: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'matchOrder',
      args: [orderId, BigInt(tokenId), BigInt(price)],
    });

    const match: OrderMatch = {
      orderId,
      tokenId,
      price: BigInt(price),
      matched: true,
    };

    setMatches([...matches, match]);
    return txHash;
  };

  return { matchOrder, matches, address };
}

