'use client';

/**
 * NFT Marketplace Integrator
 * Integrate with multiple NFT marketplaces via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MarketplaceIntegration {
  integrationId: string;
  marketplace: string;
  apiKey?: string;
  enabled: boolean;
  configuredBy: string;
  timestamp: number;
}

export function useNFTMarketplaceIntegrator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [integrations, setIntegrations] = useState<MarketplaceIntegration[]>([]);

  const integrate = async (
    marketplace: string,
    apiKey?: string
  ): Promise<MarketplaceIntegration> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!marketplace || marketplace.trim() === '') {
      throw new Error('Marketplace name is required');
    }
    
    const message = `Integrate marketplace: ${marketplace}`;
    await signMessageAsync({ message });
    
    const integration: MarketplaceIntegration = {
      integrationId: `integrate-${Date.now()}`,
      marketplace,
      apiKey,
      enabled: true,
      configuredBy: address,
      timestamp: Date.now(),
    };
    
    setIntegrations([...integrations, integration]);
    return integration;
  };

  return { integrate, integrations, address };
}

