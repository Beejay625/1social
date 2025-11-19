'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentIntegration {
  integrationId: string;
  service: string;
  config: string;
  creator: string;
  active: boolean;
  timestamp: bigint;
}

export function useOnchainContentIntegrationManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [integrations, setIntegrations] = useState<ContentIntegration[]>([]);

  const { data: integrationData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getIntegrations',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createIntegration = async (service: string, config: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create integration onchain: ${service}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createIntegration',
        args: [service, config, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (integrationData) {
      const integration = integrationData as ContentIntegration;
      setIntegrations(prev => {
        const filtered = prev.filter(i => i.integrationId !== integration.integrationId);
        return [...filtered, integration];
      });
    }
  }, [integrationData]);

  return {
    createIntegration,
    managing,
    integrations,
    address,
    isConnected,
    integrationData,
  };
}

