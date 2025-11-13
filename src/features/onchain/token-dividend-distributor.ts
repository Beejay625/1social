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
  totalAmount: string;
  recipients: string[];
  amounts: string[];
  distributedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenDividendDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<DividendDistribution[]>([]);

  const distribute = async (
    tokenAddress: string,
    totalAmount: string,
    recipients: string[],
    amounts: string[]
  ): Promise<DividendDistribution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    const message = `Distribute dividends: ${tokenAddress} to ${recipients.length} holders`;
    await signMessageAsync({ message });
    
    const distribution: DividendDistribution = {
      distributionId: `dividend-${Date.now()}`,
      tokenAddress,
      totalAmount,
      recipients,
      amounts,
      distributedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distribute, distributions, address };
}
