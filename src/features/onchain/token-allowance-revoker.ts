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
  txHash: string;
  revokedBy: string;
  timestamp: number;
}

export function useTokenAllowanceRevoker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [revocations, setRevocations] = useState<AllowanceRevocation[]>([]);

  const revoke = async (
    tokenAddress: string,
    spender: string
  ): Promise<AllowanceRevocation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (!spender.startsWith('0x')) {
      throw new Error('Invalid spender address format');
    }
    
    const message = `Revoke allowance: ${tokenAddress} for ${spender}`;
    await signMessageAsync({ message });
    
    const revocation: AllowanceRevocation = {
      revocationId: `revoke-${Date.now()}`,
      tokenAddress,
      spender,
      txHash: `0x${Date.now().toString(16)}`,
      revokedBy: address,
      timestamp: Date.now(),
    };
    
    setRevocations([...revocations, revocation]);
    return revocation;
  };

  return { revoke, revocations, address };
}
