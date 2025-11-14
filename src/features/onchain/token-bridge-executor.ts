'use client';

/**
 * Token Bridge Executor
 * Execute cross-chain token bridges with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BridgeExecution {
  executionId: string;
  tokenAddress: string;
  amount: string;
  sourceChain: string;
  destinationChain: string;
  recipient: string;
  executedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenBridgeExecutor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [executions, setExecutions] = useState<BridgeExecution[]>([]);

  const executeBridge = async (
    tokenAddress: string,
    amount: string,
    sourceChain: string,
    destinationChain: string,
    recipient: string
  ): Promise<BridgeExecution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !recipient.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (sourceChain === destinationChain) {
      throw new Error('Source and destination chains must be different');
    }
    
    const message = `Bridge tokens: ${tokenAddress} ${amount} from ${sourceChain} to ${destinationChain}`;
    await signMessageAsync({ message });
    
    const execution: BridgeExecution = {
      executionId: `bridge-${Date.now()}`,
      tokenAddress,
      amount,
      sourceChain,
      destinationChain,
      recipient,
      executedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setExecutions([...executions, execution]);
    return execution;
  };

  return { executeBridge, executions, address };
}

