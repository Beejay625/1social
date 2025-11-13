'use client';

/**
 * Token Vesting Calculator V2
 * Calculate vesting schedules with advanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingCalculation {
  calculationId: string;
  vestingScheduleId: string;
  totalAmount: string;
  startTime: number;
  endTime: number;
  cliff: number;
  vestedAmount: string;
  remainingAmount: string;
  nextVestDate: number;
  timestamp: number;
}

export function useTokenVestingCalculatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<VestingCalculation[]>([]);

  const calculate = async (
    vestingScheduleId: string,
    totalAmount: string,
    startTime: number,
    endTime: number,
    cliff: number
  ): Promise<VestingCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (endTime <= startTime) {
      throw new Error('End time must be after start time');
    }
    
    const message = `Calculate vesting: ${vestingScheduleId}`;
    await signMessageAsync({ message });
    
    const now = Date.now();
    const vestedAmount = now >= endTime ? totalAmount : '0';
    const remainingAmount = (BigInt(totalAmount) - BigInt(vestedAmount)).toString();
    
    const calculation: VestingCalculation = {
      calculationId: `calc-${Date.now()}`,
      vestingScheduleId,
      totalAmount,
      startTime,
      endTime,
      cliff,
      vestedAmount,
      remainingAmount,
      nextVestDate: now < cliff ? cliff : endTime,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
