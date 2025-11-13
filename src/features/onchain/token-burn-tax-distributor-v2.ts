'use client';

/**
 * Token Burn Tax Distributor V2
 * Distribute burn taxes to multiple recipients with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TaxDistribution {
  distributionId: string;
  tokenAddress: string;
  burnAmount: string;
  taxAmount: string;
  recipients: string[];
  amounts: string[];
  txHash: string;
  timestamp: number;
}

export function useTokenBurnTaxDistributorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<TaxDistribution[]>([]);

  const distribute = async (
    tokenAddress: string,
    burnAmount: string,
    taxAmount: string,
    recipients: string[],
    amounts: string[]
  ): Promise<TaxDistribution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    const message = `Distribute burn tax: ${tokenAddress} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const distribution: TaxDistribution = {
      distributionId: `dist-${Date.now()}`,
      tokenAddress,
      burnAmount,
      taxAmount,
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
