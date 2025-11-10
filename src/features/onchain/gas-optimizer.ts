'use client';

import { useAccount, useEstimateGas, useFeeData } from 'wagmi';
import { useState } from 'react';

export function useGasOptimizedPlanner() {
  const { address, chainId } = useAccount();
  const { data: feeData } = useFeeData();
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const getOptimalTime = () => {
    if (!feeData) return null;
    
    const gasPrice = Number(feeData.gasPrice || 0);
    const recommendations: string[] = [];
    
    if (gasPrice > 50n) {
      recommendations.push('High gas detected - wait for lower fees');
    } else {
      recommendations.push('Optimal gas price - proceed now');
    }
    
    setRecommendations(recommendations);
    return { gasPrice, recommendations, chainId };
  };

  return { getOptimalTime, recommendations, feeData, chainId };
}

