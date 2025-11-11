'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ContentLicense {
  id: string;
  contentId: string;
  owner: string;
  licenseType: 'CC0' | 'CC-BY' | 'CC-BY-SA' | 'commercial';
  price?: string;
  timestamp: number;
}

export function useSocialContentLicensing() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [licenses, setLicenses] = useState<ContentLicense[]>([]);

  const createLicense = async (contentId: string, licenseType: 'CC0' | 'CC-BY' | 'CC-BY-SA' | 'commercial', price?: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create License: ${contentId} - ${licenseType}${price ? ` - ${price}` : ''}`;
    await signMessageAsync({ message });
    
    const license: ContentLicense = {
      id: `license-${Date.now()}`,
      contentId,
      owner: address,
      licenseType,
      price,
      timestamp: Date.now(),
    };
    
    setLicenses([...licenses, license]);
    return license;
  };

  return { createLicense, licenses, address };
}

