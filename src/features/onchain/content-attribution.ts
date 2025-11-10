'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Attribution {
  contentId: string;
  contributors: string[];
  shares: number[];
}

export function useContentAttribution() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [attributions, setAttributions] = useState<Attribution[]>([]);

  const addAttribution = async (contentId: string, contributors: string[], shares: number[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Attribution: ${contentId} ${contributors.length} contributors`;
    await signMessageAsync({ message });
    
    const attribution: Attribution = {
      contentId,
      contributors,
      shares,
    };
    
    setAttributions([...attributions, attribution]);
    return attribution;
  };

  return { addAttribution, attributions, address };
}
