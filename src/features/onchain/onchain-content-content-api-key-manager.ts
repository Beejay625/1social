'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentApiKey {
  keyId: string;
  name: string;
  permissions: string[];
  creator: string;
  active: boolean;
  timestamp: bigint;
}

export function useOnchainContentApiKeyManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [apiKeys, setApiKeys] = useState<ContentApiKey[]>([]);

  const { data: apiKeyData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getApiKeys',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createApiKey = async (name: string, permissions: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create API key onchain: ${name}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createApiKey',
        args: [name, permissions, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (apiKeyData) {
      const apiKey = apiKeyData as ContentApiKey;
      setApiKeys(prev => {
        const filtered = prev.filter(k => k.keyId !== apiKey.keyId);
        return [...filtered, apiKey];
      });
    }
  }, [apiKeyData]);

  return {
    createApiKey,
    managing,
    apiKeys,
    address,
    isConnected,
    apiKeyData,
  };
}

