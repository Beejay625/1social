'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTDrop {
  collection: string;
  supply: number;
  price: string;
  wallet: string;
}

export function useNFTDrops() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [drops, setDrops] = useState<NFTDrop[]>([]);

  const createDrop = async (collection: string, supply: number, price: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `NFT Drop: ${collection} ${supply} @ ${price}`;
    await signMessageAsync({ message });
    
    const drop: NFTDrop = {
      collection,
      supply,
      price,
      wallet: address,
    };
    
    setDrops([...drops, drop]);
    return drop;
  };

  return { createDrop, drops, address };
}
