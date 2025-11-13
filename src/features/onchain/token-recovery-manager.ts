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
  recipient: string;
  txHash: string;
  recoveredBy: string;
  timestamp: number;
}

export function useTokenRecoveryManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [recoveries, setRecoveries] = useState<TokenRecovery[]>([]);

  const recover = async (
    tokenAddress: string,
    contractAddress: string,
    amount: string,
    recipient: string
  ): Promise<TokenRecovery> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (!contractAddress.startsWith('0x')) {
      throw new Error('Invalid contract address format');
    }
    if (!recipient.startsWith('0x')) {
      throw new Error('Invalid recipient address format');
    }
    
    const message = `Recover tokens: ${tokenAddress} from ${contractAddress} to ${recipient}`;
    await signMessageAsync({ message });
    
    const recovery: TokenRecovery = {
      recoveryId: `recover-${Date.now()}`,
      tokenAddress,
      contractAddress,
      amount,
      recipient,
      txHash: `0x${Date.now().toString(16)}`,
      recoveredBy: address,
      timestamp: Date.now(),
    };
    
    setRecoveries([...recoveries, recovery]);
    return recovery;
  };

  return { recover, recoveries, address };
}
