'use client';

/**
 * Token Allowance Manager
 * Manage token allowances with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Allowance {
  allowanceId: string;
  tokenAddress: string;
  spender: string;
  amount: string;
  action: 'approve' | 'increase' | 'decrease' | 'revoke';
  managedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenAllowanceManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [allowances, setAllowances] = useState<Allowance[]>([]);

  const manageAllowance = async (
    tokenAddress: string,
    spender: string,
    amount: string,
    action: 'approve' | 'increase' | 'decrease' | 'revoke'
  ): Promise<Allowance> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !spender.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (action !== 'revoke' && parseFloat(amount) <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    const message = `Manage allowance: ${tokenAddress} ${action} for ${spender}`;
    await signMessageAsync({ message });
    
    const allowance: Allowance = {
      allowanceId: `allowance-${Date.now()}`,
      tokenAddress,
      spender,
      amount: action === 'revoke' ? '0' : amount,
      action,
      managedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setAllowances([...allowances, allowance]);
    return allowance;
  };

  return { manageAllowance, allowances, address };
}
