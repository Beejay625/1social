'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LibraryLink {
  contract: string;
  library: string;
  linked: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractLibraryLinker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [links, setLinks] = useState<LibraryLink[]>([]);

  const linkLibrary = async (contract: string, library: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Link Library: ${library} to ${contract}`;
    await signMessageAsync({ message });
    
    const link: LibraryLink = {
      contract,
      library,
      linked: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setLinks([...links, link]);
    return link;
  };

  return { linkLibrary, links, address };
}

