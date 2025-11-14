'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FundContribution {
  creator: string;
  amount: string;
  contributor: string;
  timestamp: number;
  wallet: string;
}

export function useCreatorFund() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [contributions, setContributions] = useState<FundContribution[]>([]);

  const contributeToFund = async (creator: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Creator Fund: ${creator} ${amount}`;
    await signMessageAsync({ message });
    
    const contribution: FundContribution = {
      creator,
      amount,
      contributor: address,
      timestamp: Date.now(),
      wallet: address,
    };
    
    setContributions([...contributions, contribution]);
    return contribution;
  };

  return { contributeToFund, contributions, address };
}


