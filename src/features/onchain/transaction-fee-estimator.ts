'use client';

import { useAccount, useEstimateGas } from 'wagmi';
import { useState } from 'react';

export interface FeeEstimate {
  gasLimit: bigint;
  gasPrice: bigint;
  totalFee: bigint;
  currency: string;
}

export function useTransactionFeeEstimator() {
  const { address } = useAccount();
  const { data: gasEstimate } = useEstimateGas({
    to: '0x' as `0x${string}`,
    value: BigInt(0),
  });
  const [estimates, setEstimates] = useState<FeeEstimate[]>([]);

  const estimateFee = async () => {
    if (!address || !gasEstimate) return null;
    
    const estimate: FeeEstimate = {
      gasLimit: gasEstimate,
      gasPrice: BigInt(20000000000),
      totalFee: gasEstimate * BigInt(20000000000),
      currency: 'ETH',
    };
    
    setEstimates([estimate]);
    return estimate;
  };

  return { estimateFee, estimates, address };
}
