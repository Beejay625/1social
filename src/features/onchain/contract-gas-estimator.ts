'use client';

import { useAccount, useEstimateGas } from 'wagmi';
import { useState } from 'react';

export interface GasEstimate {
  gas: bigint;
  gasPrice: bigint;
  totalCost: bigint;
}

export function useContractGasEstimator() {
  const { address } = useAccount();
  const { data: gasEstimate } = useEstimateGas({
    to: '0x' as `0x${string}`,
    value: BigInt(0),
  });
  const [estimate, setEstimate] = useState<GasEstimate | null>(null);

  return { estimate, address, gasEstimate };
}

