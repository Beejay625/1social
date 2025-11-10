'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Distribution {
  recipients: string[];
  token: string;
  amounts: string[];
  txHash: string;
}

export function useTokenRewardsDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<Distribution[]>([]);

  const distribute = async (recipients: string[], token: string, amounts: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Distribute: ${recipients.length} recipients ${token}`;
    await signMessageAsync({ message });
    
    const distribution: Distribution = {
      recipients,
      token,
      amounts,
      txHash: `0x${Date.now().toString(16)}`,
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distribute, distributions, address };
}
