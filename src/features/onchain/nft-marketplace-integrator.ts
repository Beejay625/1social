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
  collectionAddress: string;
  apiKey?: string;
  active: boolean;
  integratedBy: string;
  timestamp: number;
}

export function useNFTMarketplaceIntegrator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [integrations, setIntegrations] = useState<MarketplaceIntegration[]>([]);

  const integrate = async (
    marketplace: string,
    collectionAddress: string,
    apiKey?: string
  ): Promise<MarketplaceIntegration> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Integrate marketplace: ${marketplace} for ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const integration: MarketplaceIntegration = {
      integrationId: `integrate-${Date.now()}`,
      marketplace,
      collectionAddress,
      apiKey,
      active: true,
      integratedBy: address,
      timestamp: Date.now(),
    };
    
    setIntegrations([...integrations, integration]);
    return integration;
  };

  return { integrate, integrations, address };
}
