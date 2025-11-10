'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface License {
  contentId: string;
  licensor: string;
  licensee: string;
  terms: string;
  price: string;
  wallet: string;
}

export function useContentLicensing() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [licenses, setLicenses] = useState<License[]>([]);

  const createLicense = async (contentId: string, licensee: string, terms: string, price: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `License: ${contentId} to ${licensee} for ${price}`;
    await signMessageAsync({ message });
    
    const license: License = {
      contentId,
      licensor: address,
      licensee,
      terms,
      price,
      wallet: address,
    };
    
    setLicenses([...licenses, license]);
    return license;
  };

  return { createLicense, licenses, address };
}
