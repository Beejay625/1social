'use client';

/**
 * NFT Marketplace Order Book V2
 * Enhanced order book tracking with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Order {
  orderId: string;
  tokenId: string;
  collectionAddress: string;
  price: string;
  side: 'buy' | 'sell';
  status: 'active' | 'filled' | 'cancelled';
  createdBy: string;
  timestamp: number;
}

export function useNFTMarketplaceOrderBookV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = async (
    tokenId: string,
    collectionAddress: string,
    price: string,
    side: 'buy' | 'sell'
  ): Promise<Order> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Create ${side} order: ${tokenId} in ${collectionAddress} at ${price}`;
    await signMessageAsync({ message });
    
    const order: Order = {
      orderId: `order-${Date.now()}`,
      tokenId,
      collectionAddress,
      price,
      side,
      status: 'active',
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setOrders([...orders, order]);
    return order;
  };

  const getOrderBook = async (
    collectionAddress: string
  ): Promise<{ buys: Order[]; sells: Order[] }> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Get order book for ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const collectionOrders = orders.filter(
      o => o.collectionAddress === collectionAddress && o.status === 'active'
    );
    
    return {
      buys: collectionOrders.filter(o => o.side === 'buy').sort((a, b) => parseFloat(b.price) - parseFloat(a.price)),
      sells: collectionOrders.filter(o => o.side === 'sell').sort((a, b) => parseFloat(a.price) - parseFloat(b.price)),
    };
  };

  return { createOrder, getOrderBook, orders, address };
}

