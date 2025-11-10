'use client';

import { useAccount, useEstimateGas } from 'wagmi';
import { useState } from 'react';

export interface FeeEstimate {
  gasLimit: bigint;
  gasPrice: bigint;
  totalFee: bigint;
  timestamp: number;
}

export function useTransactionFeeEstimator() {
  const { address } = useAccount();
  const [estimates, setEstimates] = useState<FeeEstimate[]>([]);

  const { data: gasEstimate } = useEstimateGas({
    to: '0x' as `0x${string}`,
    value: BigInt(0),
    query: { enabled: !!address },
  });

  const estimateFee = (gasLimit: bigint, gasPrice: bigint) => {
    const estimate: FeeEstimate = {
      gasLimit,
      gasPrice,
      totalFee: gasLimit * gasPrice,
      timestamp: Date.now(),
    };
    setEstimates([...estimates, estimate]);
    return estimate;
  };

  return { estimateFee, estimates, gasEstimate, address };
}

