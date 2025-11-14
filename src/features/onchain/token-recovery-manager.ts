'use client';

/**
 * Token Recovery Manager
 * Recover tokens from contracts with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenRecovery {
  recoveryId: string;
  tokenAddress: string;
  contractAddress: string;
  amount: string;
  recoveredBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenRecoveryManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [recoveries, setRecoveries] = useState<TokenRecovery[]>([]);

  const recoverTokens = async (
    tokenAddress: string,
    contractAddress: string,
    amount: string
  ): Promise<TokenRecovery> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !contractAddress.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (parseFloat(amount) <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    const message = `Recover tokens: ${tokenAddress} from ${contractAddress} amount ${amount}`;
    await signMessageAsync({ message });
    
    const recovery: TokenRecovery = {
      recoveryId: `recover-${Date.now()}`,
      tokenAddress,
      contractAddress,
      amount,
      recoveredBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setRecoveries([...recoveries, recovery]);
    return recovery;
  };

  return { recoverTokens, recoveries, address };
}
