'use client';

/**
 * Token Vesting Calculator V2
 * Calculate vesting schedules with advanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingCalculation {
  calculationId: string;
  totalAmount: string;
  startTime: number;
  endTime: number;
  cliff: number;
  releasedAmount: string;
  remainingAmount: string;
  nextReleaseTime: number;
  timestamp: number;
}

export function useTokenVestingCalculatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<VestingCalculation[]>([]);

  const calculate = async (
    totalAmount: string,
    startTime: number,
    endTime: number,
    cliff: number
  ): Promise<VestingCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (endTime <= startTime) {
      throw new Error('End time must be after start time');
    }
    if (cliff < 0) {
      throw new Error('Cliff cannot be negative');
    }
    
    const message = `Calculate vesting: ${totalAmount} from ${new Date(startTime).toISOString()}`;
    await signMessageAsync({ message });
    
    const now = Date.now();
    const elapsed = Math.max(0, now - startTime);
    const totalDuration = endTime - startTime;
    const releasedAmount = elapsed >= cliff && totalDuration > 0
      ? (BigInt(totalAmount) * BigInt(Math.floor(elapsed * 10000 / totalDuration))) / BigInt(10000)
      : BigInt(0);
    const remainingAmount = BigInt(totalAmount) - releasedAmount;
    
    const calculation: VestingCalculation = {
      calculationId: `calc-${Date.now()}`,
      totalAmount,
      startTime,
      endTime,
      cliff,
      releasedAmount: releasedAmount.toString(),
      remainingAmount: remainingAmount.toString(),
      nextReleaseTime: now < startTime + cliff ? startTime + cliff : endTime,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

