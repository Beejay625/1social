'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MarketplaceOrder {
  id: string;
  tokenId: string;
  collection: string;
  price: bigint;
  orderType: 'buy' | 'sell';
  filled: boolean;
}

export function useNFTMarketplaceOrders() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [orders, setOrders] = useState<MarketplaceOrder[]>([]);

  const createOrder = async (tokenId: string, collection: string, price: string, orderType: 'buy' | 'sell') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'createOrder',
      args: [BigInt(tokenId), BigInt(price), orderType],
    });

    const order: MarketplaceOrder = {
      id: txHash || '',
      tokenId,
      collection,
      price: BigInt(price),
      orderType,
      filled: false,
    };

    setOrders([...orders, order]);
    return txHash;
  };

  return { createOrder, orders, address };
}


