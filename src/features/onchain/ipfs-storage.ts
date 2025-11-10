'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface IPFSRecord {
  cid: string;
  fileName: string;
  size: number;
  wallet: string;
  timestamp: number;
}

export function useIPFSStorage() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [records, setRecords] = useState<IPFSRecord[]>([]);

  const uploadToIPFS = async (fileName: string, content: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `IPFS Upload: ${fileName}`;
    await signMessageAsync({ message });
    
    const record: IPFSRecord = {
      cid: `ipfs_${Date.now()}`,
      fileName,
      size: content.length,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setRecords([...records, record]);
    return record;
  };

  return { uploadToIPFS, records, address };
}
