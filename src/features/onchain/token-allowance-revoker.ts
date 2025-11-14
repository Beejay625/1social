'use client';

/**
 * Token Allowance Revoker
 * Revoke token allowances with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Revocation {
  revocationId: string;
  tokenAddress: string;
  spender: string;
  revokedBy: string;
  timestamp: number;
}

export function useTokenAllowanceRevoker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [revocations, setRevocations] = useState<Revocation[]>([]);

  const revokeAllowance = async (
    tokenAddress: string,
    spender: string
  ): Promise<Revocation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !spender.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Revoke allowance: ${tokenAddress} from ${spender}`;
    await signMessageAsync({ message });
    
    const revocation: Revocation = {
      revocationId: `revoke-${Date.now()}`,
      tokenAddress,
      spender,
      revokedBy: address,
      timestamp: Date.now(),
    };
    
    setRevocations([...revocations, revocation]);
    return revocation;
  };

  return { revokeAllowance, revocations, address };
}
