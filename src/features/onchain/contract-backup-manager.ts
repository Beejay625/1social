'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Backup {
  contract: string;
  bytecode: string;
  abi: any[];
  backupHash: string;
  wallet: string;
  timestamp: number;
}

export function useContractBackupManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [backups, setBackups] = useState<Backup[]>([]);

  const createBackup = async (contract: string, bytecode: string, abi: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Backup: ${contract}`;
    await signMessageAsync({ message });
    
    const backup: Backup = {
      contract,
      bytecode,
      abi,
      backupHash: `0x${Date.now().toString(16)}`,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setBackups([...backups, backup]);
    return backup;
  };

  return { createBackup, backups, address };
}


