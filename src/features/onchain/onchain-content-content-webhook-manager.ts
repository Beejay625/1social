'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentWebhook {
  webhookId: string;
  url: string;
  events: string[];
  creator: string;
  active: boolean;
  timestamp: bigint;
}

export function useOnchainContentWebhookManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [webhooks, setWebhooks] = useState<ContentWebhook[]>([]);

  const { data: webhookData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getWebhooks',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createWebhook = async (url: string, events: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create webhook onchain: ${url}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createWebhook',
        args: [url, events, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (webhookData) {
      const webhook = webhookData as ContentWebhook;
      setWebhooks(prev => {
        const filtered = prev.filter(w => w.webhookId !== webhook.webhookId);
        return [...filtered, webhook];
      });
    }
  }, [webhookData]);

  return {
    createWebhook,
    managing,
    webhooks,
    address,
    isConnected,
    webhookData,
  };
}

