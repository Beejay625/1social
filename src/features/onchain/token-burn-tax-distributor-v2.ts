'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface TaxDistribution {
  burnId: string;
  tokenAddress: string;
  burnAmount: string;
  taxAmount: string;
  recipients: string[];
  amounts: string[];
  distributionId: string;
}

export function useTokenBurnTaxDistributorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [distributions, setDistributions] = useState<TaxDistribution[]>([]);

  const distributeTax = async (
    burnId: string,
    tokenAddress: string,
    burnAmount: string,
    taxAmount: string,
    recipients: string[],
    amounts: string[]
  ) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    if (recipients.length !== amounts.length) throw new Error('Recipients and amounts must match');
    
    const message = `Distribute burn tax: ${taxAmount} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const distribution: TaxDistribution = {
      burnId,
      tokenAddress,
      burnAmount,
      taxAmount,
      recipients,
      amounts,
      distributionId: `tax_dist_${Date.now()}`,
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { 
    distributeTax, 
    distributions, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

