'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentVersion {
  versionId: string;
  contentHash: string;
  versionNumber: bigint;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentVersionManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [versioning, setVersioning] = useState(false);
  const [versions, setVersions] = useState<ContentVersion[]>([]);

  const { data: versionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVersions',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createVersion = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setVersioning(true);

    try {
      const message = `Create version onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createVersion',
        args: [contentHash, address],
      });
    } finally {
      setVersioning(false);
    }
  };

  useEffect(() => {
    if (versionData) {
      const version = versionData as ContentVersion;
      setVersions(prev => {
        const filtered = prev.filter(v => v.versionId !== version.versionId);
        return [...filtered, version];
      });
    }
  }, [versionData]);

  return {
    createVersion,
    versioning,
    versions,
    address,
    isConnected,
    versionData,
  };
}

