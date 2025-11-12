'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LicenseListing {
  id: string;
  contentId: string;
  licensor: string;
  licenseType: string;
  price: string;
  currency: string;
  timestamp: number;
  status: 'active' | 'sold' | 'cancelled';
}

export function useSocialContentLicensingMarketplace() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<LicenseListing[]>([]);

  const listLicense = async (
    contentId: string,
    licenseType: string,
    price: string,
    currency: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `List License: ${contentId} ${licenseType} ${price} ${currency}`;
    await signMessageAsync({ message });
    
    const listing: LicenseListing = {
      id: `license-${Date.now()}`,
      contentId,
      licensor: address,
      licenseType,
      price,
      currency,
      timestamp: Date.now(),
      status: 'active',
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { listLicense, listings, address };
}

