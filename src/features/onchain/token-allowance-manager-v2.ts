'use client';

/**
 * Token Allowance Manager V2
 * Enhanced token allowance management with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface AllowanceRecord {
  allowanceId: string;
  tokenAddress: string;
  spender: string;
  amount: string;
  managedBy: string;
  timestamp: number;
}

export function useTokenAllowanceManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [allowances, setAllowances] = useState<AllowanceRecord[]>([]);

  const approveAllowance = async (
    tokenAddress: string,
    spender: string,
    amount: string
  ): Promise<AllowanceRecord> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !spender.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Approve allowance: ${tokenAddress} to ${spender} amount ${amount}`;
    await signMessageAsync({ message });
    
    const allowance: AllowanceRecord = {
      allowanceId: `allowance-${Date.now()}`,
      tokenAddress,
      spender,
      amount,
      managedBy: address,
      timestamp: Date.now(),
    };
    
    setAllowances([...allowances, allowance]);
    return allowance;
  };

  const revokeAllowance = async (
    tokenAddress: string,
    spender: string
  ): Promise<void> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Revoke allowance: ${tokenAddress} from ${spender}`;
    await signMessageAsync({ message });
    
    setAllowances(allowances.filter(
      a => !(a.tokenAddress === tokenAddress && a.spender === spender)
    ));
  };

  return { approveAllowance, revokeAllowance, allowances, address };
}

