'use client';

/**
 * NFT Order Matcher V3
 * Match NFT buy and sell orders with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface OrderMatch {
  matchId: string;
  collectionAddress: string;
  buyOrderId: string;
  sellOrderId: string;
  tokenId: string;
  price: string;
  matchedBy: string;
  timestamp: number;
}

export function useNFTOrderMatcherV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [matches, setMatches] = useState<OrderMatch[]>([]);

  const matchOrders = async (
    collectionAddress: string,
    buyOrderId: string,
    sellOrderId: string,
    tokenId: string,
    price: string
  ): Promise<OrderMatch> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Match orders V3: ${collectionAddress} buy ${buyOrderId} sell ${sellOrderId}`;
    await signMessageAsync({ message });
    
    const match: OrderMatch = {
      matchId: `match-v3-${Date.now()}`,
      collectionAddress,
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
