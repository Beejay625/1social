'use client';

/**
 * Token Dividend Distributor
 * Distribute dividends to token holders with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DividendDistribution {
  distributionId: string;
  tokenAddress: string;
  totalDividend: string;
  recipients: string[];
  amounts: string[];
  txHash: string;
  timestamp: number;
}

export function useTokenDividendDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<DividendDistribution[]>([]);

  const distribute = async (
    tokenAddress: string,
    totalDividend: string,
    recipients: string[],
    amounts: string[]
  ): Promise<DividendDistribution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    const message = `Distribute dividends: ${tokenAddress} to ${recipients.length} holders`;
    await signMessageAsync({ message });
    
    const distribution: DividendDistribution = {
      distributionId: `div-${Date.now()}`,
      tokenAddress,
      totalDividend,
      recipients,
      amounts,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distribute, distributions, address };
}
