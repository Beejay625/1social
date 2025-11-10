'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BackupRecord {
  backupId: string;
  ipfsHash: string;
  arweaveId: string;
  timestamp: number;
  verified: boolean;
}

export function useDecentralizedBackup() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [backups, setBackups] = useState<BackupRecord[]>([]);

  const createBackup = async (data: string) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const message = `Backup: ${data.substring(0, 50)}\nTimestamp: ${Date.now()}`;
    const signature = await signMessageAsync({ message });

    const backup: BackupRecord = {
      backupId: `backup_${Date.now()}`,
      ipfsHash: `ipfs_${Date.now()}`,
      arweaveId: `arweave_${Date.now()}`,
      timestamp: Date.now(),
      verified: true,
    };

    setBackups([...backups, backup]);
    return backup;
  };

  return { createBackup, backups, isConnected, address };
}
