'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface BridgeFee {
  sourceChain: string;
  targetChain: string;
  tokenAddress: string;
  amount: string;
  fee: string;
  estimatedTime: number;
}

export function useTokenBridgeFeeCalculator() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [fees, setFees] = useState<BridgeFee[]>([]);

  const calculateFee = async (sourceChain: string, targetChain: string, tokenAddress: string, amount: string) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Calculate bridge fee: ${amount} from ${sourceChain} to ${targetChain}`;
    await signMessageAsync({ message });
    
    const fee: BridgeFee = {
      sourceChain,
      targetChain,
      tokenAddress,
      amount,
      fee: '0',
      estimatedTime: 0,
    };
    
    setFees([...fees, fee]);
    return fee;
  };

  return { 
    calculateFee, 
    fees, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

