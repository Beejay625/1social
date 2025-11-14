'use client';

/**
 * Token Dividend Distributor V2
 * Distribute dividends to token holders with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface DividendDistribution {
  distributionId: string;
  tokenAddress: string;
  totalAmount: string;
  recipients: string[];
  distributedBy: string;
  timestamp: number;
}

export function useTokenDividendDistributorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [distributions, setDistributions] = useState<DividendDistribution[]>([]);

  const distributeDividends = async (
    tokenAddress: string,
    totalAmount: string,
    recipients: string[]
  ): Promise<DividendDistribution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (recipients.length === 0) {
      throw new Error('Recipients array cannot be empty');
    }
    
    const message = `Distribute dividends V2: ${tokenAddress} amount ${totalAmount} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const distribution: DividendDistribution = {
      distributionId: `dividend-v2-${Date.now()}`,
      tokenAddress,
      totalAmount,
      recipients,
      distributedBy: address,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distributeDividends, distributions, address };
}
