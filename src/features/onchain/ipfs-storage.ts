'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface IPFSStorage {
  cid: string;
  content: string;
  wallet: string;
  timestamp: number;
}

export function useIPFSStorage() {
  const { address } = useAccount();
  const [stored, setStored] = useState<IPFSStorage[]>([]);

  const storeOnIPFS = async (content: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const cid = `Qm${Date.now().toString(36)}`;
    const storage: IPFSStorage = {
      cid,
      content,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setStored([...stored, storage]);
    return storage;
  };

  return { storeOnIPFS, stored, address };
}

