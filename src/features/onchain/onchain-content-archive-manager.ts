'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentArchive {
  contentHash: string;
  archivedBy: string;
  archiveTime: bigint;
  reason?: string;
}

export function useOnchainContentArchiveManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [archiving, setArchiving] = useState(false);
  const [archives, setArchives] = useState<ContentArchive[]>([]);

  const { data: archiveData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getArchives',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const archiveContent = async (contentHash: string, reason?: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setArchiving(true);

    try {
      const message = `Archive content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'archiveContent',
        args: [contentHash, address, reason || ''],
      });
    } finally {
      setArchiving(false);
    }
  };

  useEffect(() => {
    if (archiveData) {
      const archive = archiveData as ContentArchive;
      setArchives(prev => {
        const filtered = prev.filter(a => a.contentHash !== archive.contentHash);
        return [...filtered, archive];
      });
    }
  }, [archiveData]);

  return {
    archiveContent,
    archiving,
    archives,
    address,
    isConnected,
    archiveData,
  };
}

