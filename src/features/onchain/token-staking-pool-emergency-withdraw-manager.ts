'use client';

/**
 * Token Staking Pool Emergency Withdraw Manager
 * Manage emergency withdrawals from staking pools with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface EmergencyWithdraw {
  withdrawId: string;
  stakingPool: string;
  amount: string;
  reason: string;
  withdrawnBy: string;
  timestamp: number;
}

export function useTokenStakingPoolEmergencyWithdrawManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [withdraws, setWithdraws] = useState<EmergencyWithdraw[]>([]);

  const emergencyWithdraw = async (
    stakingPool: string,
    amount: string,
    reason: string
  ): Promise<EmergencyWithdraw> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (!reason || reason.trim() === '') {
      throw new Error('Reason is required for emergency withdrawal');
    }
    
    const message = `Emergency withdraw: ${stakingPool} amount ${amount} reason ${reason}`;
    await signMessageAsync({ message });
    
    const withdraw: EmergencyWithdraw = {
      withdrawId: `emergency-${Date.now()}`,
      stakingPool,
      amount,
      reason,
      withdrawnBy: address,
      timestamp: Date.now(),
    };
    
    setWithdraws([...withdraws, withdraw]);
    return withdraw;
  };

  return { emergencyWithdraw, withdraws, address };
}

