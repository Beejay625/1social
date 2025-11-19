'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentAlias {
  contentHash: string;
  alias: string;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentAliasManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [aliases, setAliases] = useState<ContentAlias[]>([]);

  const { data: aliasData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getAliases',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const setAlias = async (contentHash: string, alias: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Set alias onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'setAlias',
        args: [contentHash, alias, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (aliasData) {
      const alias = aliasData as ContentAlias;
      setAliases(prev => {
        const filtered = prev.filter(a => a.contentHash !== alias.contentHash || a.alias !== alias.alias);
        return [...filtered, alias];
      });
    }
  }, [aliasData]);

  return {
    setAlias,
    managing,
    aliases,
    address,
    isConnected,
    aliasData,
  };
}

