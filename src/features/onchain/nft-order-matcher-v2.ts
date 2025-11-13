'use client';

/**
 * NFT Order Matcher V2
 * Match NFT buy and sell orders with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OrderMatch {
  matchId: string;
  buyOrderId: string;
  sellOrderId: string;
  tokenId: string;
  collectionAddress: string;
  price: string;
  txHash: string;
  timestamp: number;
}

export function useNFTOrderMatcherV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [matches, setMatches] = useState<OrderMatch[]>([]);

  const matchOrders = async (
    buyOrderId: string,
    sellOrderId: string,
    tokenId: string,
    collectionAddress: string,
    price: string
  ): Promise<OrderMatch> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Match orders: Buy ${buyOrderId} with Sell ${sellOrderId}`;
    await signMessageAsync({ message });
    
    const match: OrderMatch = {
      matchId: `match-${Date.now()}`,
      buyOrderId,
      sellOrderId,
      tokenId,
      collectionAddress,
      price,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setMatches([...matches, match]);
    return match;
  };

  return { matchOrders, matches, address };
}

