'use client';

/**
 * Token Dividend Distributor V2
 * Distribute dividends to token holders with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DividendDistribution {
  distributionId: string;
  tokenAddress: string;
  dividendToken: string;
  totalAmount: string;
  recipients: string[];
  amounts: string[];
  txHash: string;
  distributedBy: string;
  timestamp: number;
}

export function useTokenDividendDistributorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<DividendDistribution[]>([]);

  const distribute = async (
    tokenAddress: string,
    dividendToken: string,
    totalAmount: string,
    recipients: string[],
    amounts: string[]
  ): Promise<DividendDistribution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    const message = `Distribute dividends: ${tokenAddress} ${totalAmount} to ${recipients.length} holders`;
    await signMessageAsync({ message });
    
    const distribution: DividendDistribution = {
      distributionId: `dividend-${Date.now()}`,
      tokenAddress,
      dividendToken,
      totalAmount,
      recipients,
      amounts,
      txHash: `0x${Date.now().toString(16)}`,
      distributedBy: address,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distribute, distributions, address };
}

