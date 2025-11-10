'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Selector {
  function: string;
  selector: string;
  wallet: string;
  timestamp: number;
}

export function useFunctionSelectorEncoder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [selectors, setSelectors] = useState<Selector[]>([]);

  const encodeSelector = async (func: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Encode: ${func}`;
    await signMessageAsync({ message });
    
    const selector: Selector = {
      function: func,
      selector: `0x${Date.now().toString(16).slice(0, 8)}`,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSelectors([...selectors, selector]);
    return selector;
  };

  return { encodeSelector, selectors, address };
}

