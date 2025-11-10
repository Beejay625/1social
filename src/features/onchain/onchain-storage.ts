'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StorageRecord {
  key: string;
  value: string;
  ipfsHash: string;
  wallet: string;
  timestamp: number;
}

export function useOnchainStorage() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [records, setRecords] = useState<StorageRecord[]>([]);

  const storeData = async (key: string, value: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Store: ${key} = ${value.substring(0, 50)}`;
    await signMessageAsync({ message });
    
    const record: StorageRecord = {
      key,
      value,
      ipfsHash: `ipfs_${Date.now()}`,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setRecords([...records, record]);
    return record;
  };

  return { storeData, records, address };
}
