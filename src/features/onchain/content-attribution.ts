'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Attribution {
  contentId: string;
  creator: string;
  contributors: string[];
  timestamp: number;
}

export function useContentAttribution() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [attributions, setAttributions] = useState<Attribution[]>([]);

  const attributeContent = async (contentId: string, contributors: string[]) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const message = `Attribution: ${contentId}\nContributors: ${contributors.join(',')}\nTimestamp: ${Date.now()}`;
    await signMessageAsync({ message });

    const attribution: Attribution = {
      contentId,
      creator: address,
      contributors,
      timestamp: Date.now(),
    };

    setAttributions([...attributions, attribution]);
    return attribution;
  };

  return { attributeContent, attributions, isConnected, address };
}
