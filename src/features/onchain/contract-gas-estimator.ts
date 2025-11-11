'use client';

import { useAccount, useEstimateGas } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GasEstimate {
  function: string;
  gas: bigint;
  timestamp: number;
}

export function useContractGasEstimator() {
  const { address } = useAccount();
  const [estimates, setEstimates] = useState<GasEstimate[]>([]);

  const { data: gasData } = useEstimateGas({
    to: '0x' as `0x${string}`,
    value: 0n,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && gasData) {
      const estimate: GasEstimate = {
        function: 'transfer',
        gas: gasData,
        timestamp: Date.now(),
      };
      setEstimates([estimate]);
    }
  }, [address, gasData]);

  return { estimates, address };
}
