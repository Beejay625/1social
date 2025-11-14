'use client';

/**
 * NFT Order Matcher V3
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
  currency: string;
  txHash: string;
  matchedBy: string;
  timestamp: number;
}

export function useNFTOrderMatcherV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [matches, setMatches] = useState<OrderMatch[]>([]);

  const match = async (
    buyOrderId: string,
    sellOrderId: string,
    tokenId: string,
    collectionAddress: string,
    price: string,
    currency: string
  ): Promise<OrderMatch> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Match orders: ${buyOrderId} <-> ${sellOrderId} for ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const match: OrderMatch = {
      matchId: `match-${Date.now()}`,
      buyOrderId,
      sellOrderId,
      tokenId,
      collectionAddress,
      price,
      currency,
      txHash: `0x${Date.now().toString(16)}`,
      matchedBy: address,
      timestamp: Date.now(),
    };
    
    setMatches([...matches, match]);
    return match;
  };

  return { match, matches, address };
}

