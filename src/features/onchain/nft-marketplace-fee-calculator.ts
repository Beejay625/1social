'use client';

/**
 * NFT Marketplace Fee Calculator
 * Calculate marketplace fees with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface FeeCalculation {
  calculationId: string;
  marketplace: string;
  salePrice: string;
  feePercentage: number;
  feeAmount: string;
  netAmount: string;
  timestamp: number;
}

export function useNFTMarketplaceFeeCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [calculations, setCalculations] = useState<FeeCalculation[]>([]);

  const calculate = async (
    marketplace: string,
    salePrice: string,
    feePercentage: number
  ): Promise<FeeCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (feePercentage < 0 || feePercentage > 100) {
      throw new Error('Fee percentage must be between 0 and 100');
    }
    
    const message = `Calculate marketplace fee: ${marketplace} price ${salePrice}`;
    await signMessageAsync({ message });
    
    const feeAmount = (parseFloat(salePrice) * feePercentage / 100).toString();
    const netAmount = (parseFloat(salePrice) - parseFloat(feeAmount)).toString();
    
    const calculation: FeeCalculation = {
      calculationId: `fee-${Date.now()}`,
      marketplace,
      salePrice,
      feePercentage,
      feeAmount,
      netAmount,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

