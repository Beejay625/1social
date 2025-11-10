'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BackupRecord {
  dataHash: string;
  storage: 'ipfs' | 'arweave';
  wallet: string;
  timestamp: number;
}

export function useDecentralizedBackup() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [backups, setBackups] = useState<BackupRecord[]>([]);

  const createBackup = async (dataHash: string, storage: 'ipfs' | 'arweave') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Backup: ${dataHash} to ${storage}`;
    await signMessageAsync({ message });
    
    const backup: BackupRecord = {
      dataHash,
      storage,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setBackups([...backups, backup]);
    return backup;
  };

  return { createBackup, backups, address };
}

