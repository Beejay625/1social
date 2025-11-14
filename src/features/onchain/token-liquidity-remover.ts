'use client';

/**
 * Token Liquidity Remover
 * Remove liquidity from pools with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LiquidityRemoval {
  removalId: string;
  poolAddress: string;
  lpTokenAmount: string;
  removedBy: string;
  timestamp: number;
}

export function useTokenLiquidityRemover() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [removals, setRemovals] = useState<LiquidityRemoval[]>([]);

  const removeLiquidity = async (
    poolAddress: string,
    lpTokenAmount: string
  ): Promise<LiquidityRemoval> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!poolAddress.startsWith('0x')) {
      throw new Error('Invalid pool address format');
    }
    
    const message = `Remove liquidity: ${poolAddress} amount ${lpTokenAmount}`;
    await signMessageAsync({ message });
    
    const removal: LiquidityRemoval = {
      removalId: `remove-${Date.now()}`,
      poolAddress,
      lpTokenAmount,
      removedBy: address,
      timestamp: Date.now(),
    };
    
    setRemovals([...removals, removal]);
    return removal;
  };

  return { removeLiquidity, removals, address };
}
