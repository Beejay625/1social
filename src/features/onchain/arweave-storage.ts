'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ArweaveRecord {
  txId: string;
  content: string;
  wallet: string;
  timestamp: number;
}

export function useArweaveStorage() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [records, setRecords] = useState<ArweaveRecord[]>([]);

  const storeOnArweave = async (content: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Arweave: ${content.substring(0, 50)}`;
    await signMessageAsync({ message });
    
    const record: ArweaveRecord = {
      txId: `ar_${Date.now()}`,
      content,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setRecords([...records, record]);
    return record;
  };

  return { storeOnArweave, records, address };
}
