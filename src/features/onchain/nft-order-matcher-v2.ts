'use client';

/**
 * NFT Order Matcher V2
 * Match NFT buy and sell orders with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface OrderMatch {
  matchId: string;
  buyOrderId: string;
  sellOrderId: string;
  tokenId: string;
  price: string;
  matchedBy: string;
  timestamp: number;
}

export function useNFTOrderMatcherV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [matches, setMatches] = useState<OrderMatch[]>([]);

  const matchOrders = async (
    buyOrderId: string,
    sellOrderId: string,
    tokenId: string,
    price: string
  ): Promise<OrderMatch> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Match orders V2: ${buyOrderId} and ${sellOrderId} for token ${tokenId}`;
    await signMessageAsync({ message });
    
    const match: OrderMatch = {
      matchId: `match-v2-${Date.now()}`,
      buyOrderId,
      sellOrderId,
      tokenId,
      price,
      matchedBy: address,
      timestamp: Date.now(),
    };
    
    setMatches([...matches, match]);
    return match;
  };

  return { matchOrders, matches, address };
}
