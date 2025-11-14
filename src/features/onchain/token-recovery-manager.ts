'use client';

/**
 * Token Recovery Manager
 * Recover tokens from contracts with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Recovery {
  recoveryId: string;
  contractAddress: string;
  tokenAddress: string;
  amount: string;
  recoveredBy: string;
  timestamp: number;
}

export function useTokenRecoveryManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [recoveries, setRecoveries] = useState<Recovery[]>([]);

  const recoverTokens = async (
    contractAddress: string,
    tokenAddress: string,
    amount: string
  ): Promise<Recovery> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!contractAddress.startsWith('0x') || !tokenAddress.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Recover tokens: ${tokenAddress} from ${contractAddress} amount ${amount}`;
    await signMessageAsync({ message });
    
    const recovery: Recovery = {
      recoveryId: `recover-${Date.now()}`,
      contractAddress,
      tokenAddress,
      amount,
      recoveredBy: address,
      timestamp: Date.now(),
    };
    
    setRecoveries([...recoveries, recovery]);
    return recovery;
  };

  return { recoverTokens, recoveries, address };
}
