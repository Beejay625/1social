'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Dividend {
  id: string;
  distributor: string;
  tokenAddress: string;
  amount: string;
  recipients: string[];
  timestamp: number;
  status: 'pending' | 'distributed' | 'failed';
}

export function useSocialTokenDividends() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [dividends, setDividends] = useState<Dividend[]>([]);

  const distributeDividends = async (
    tokenAddress: string,
    amount: string,
    recipients: string[]
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Distribute Dividends: ${tokenAddress} ${amount} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const dividend: Dividend = {
      id: `dividend-${Date.now()}`,
      distributor: address,
      tokenAddress,
      amount,
      recipients,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setDividends([...dividends, dividend]);
    return dividend;
  };

  return { distributeDividends, dividends, address };
}


