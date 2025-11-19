'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentBackup {
  backupId: string;
  contentHash: string;
  backupLocation: string;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentBackup() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [backingUp, setBackingUp] = useState(false);
  const [backups, setBackups] = useState<ContentBackup[]>([]);

  const { data: backupData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getBackups',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createBackup = async (contentHash: string, backupLocation: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBackingUp(true);

    try {
      const message = `Create backup onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createBackup',
        args: [contentHash, backupLocation, address],
      });
    } finally {
      setBackingUp(false);
    }
  };

  useEffect(() => {
    if (backupData) {
      const backup = backupData as ContentBackup;
      setBackups(prev => {
        const filtered = prev.filter(b => b.backupId !== backup.backupId);
        return [...filtered, backup];
      });
    }
  }, [backupData]);

  return {
    createBackup,
    backingUp,
    backups,
    address,
    isConnected,
    backupData,
  };
}

