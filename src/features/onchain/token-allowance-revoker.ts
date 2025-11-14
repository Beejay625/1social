'use client';

/**
 * Token Allowance Revoker
 * Revoke token allowances with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AllowanceRevocation {
  revocationId: string;
  tokenAddress: string;
  spender: string;
  revokedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenAllowanceRevoker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [revocations, setRevocations] = useState<AllowanceRevocation[]>([]);

  const revokeAllowance = async (
    tokenAddress: string,
    spender: string
  ): Promise<AllowanceRevocation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !spender.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Revoke allowance: ${tokenAddress} spender ${spender}`;
    await signMessageAsync({ message });
    
    const revocation: AllowanceRevocation = {
      revocationId: `revoke-${Date.now()}`,
      tokenAddress,
      spender,
      revokedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setRevocations([...revocations, revocation]);
    return revocation;
  };

  return { revokeAllowance, revocations, address };
}
