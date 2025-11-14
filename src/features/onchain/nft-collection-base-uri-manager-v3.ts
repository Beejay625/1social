'use client';

/**
 * NFT Collection Base URI Manager V3
 * Manage collection base URI with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BaseURIManagement {
  managementId: string;
  collectionAddress: string;
  baseUri: string;
  action: 'set' | 'update';
  managedBy: string;
  txHash: string;
  timestamp: number;
}

export function useNFTCollectionBaseURIManagerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [managements, setManagements] = useState<BaseURIManagement[]>([]);

  const manageBaseURI = async (
    collectionAddress: string,
    baseUri: string,
    action: 'set' | 'update'
  ): Promise<BaseURIManagement> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (!baseUri.startsWith('http://') && !baseUri.startsWith('https://') && !baseUri.startsWith('ipfs://')) {
      throw new Error('Base URI must be a valid HTTP, HTTPS, or IPFS URL');
    }
    
    const message = `Manage base URI: ${collectionAddress} ${action} to ${baseUri}`;
    await signMessageAsync({ message });
    
    const management: BaseURIManagement = {
      managementId: `uri-${Date.now()}`,
      collectionAddress,
      baseUri,
      action,
      managedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setManagements([...managements, management]);
    return management;
  };

  return { manageBaseURI, managements, address };
}

