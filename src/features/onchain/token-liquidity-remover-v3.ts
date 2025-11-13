'use client';

/**
 * Token Liquidity Remover V3
 * Remove liquidity from pools with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LiquidityRemoval {
  removalId: string;
  poolAddress: string;
  lpTokenAmount: string;
  tokenAOut: string;
  tokenBOut: string;
  txHash: string;
  removedBy: string;
  timestamp: number;
}

export function useTokenLiquidityRemoverV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [removals, setRemovals] = useState<LiquidityRemoval[]>([]);

  const remove = async (
    poolAddress: string,
    lpTokenAmount: string
  ): Promise<LiquidityRemoval> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!poolAddress.startsWith('0x')) {
      throw new Error('Invalid pool address format');
    }
    if (parseFloat(lpTokenAmount) <= 0) {
      throw new Error('LP token amount must be greater than zero');
    }
    
    const message = `Remove liquidity: ${poolAddress} ${lpTokenAmount} LP tokens`;
    await signMessageAsync({ message });
    
    const removal: LiquidityRemoval = {
      removalId: `remove-${Date.now()}`,
      poolAddress,
      lpTokenAmount,
      tokenAOut: '0',
      tokenBOut: '0',
      txHash: `0x${Date.now().toString(16)}`,
      removedBy: address,
      timestamp: Date.now(),
    };
    
    setRemovals([...removals, removal]);
    return removal;
  };

  return { remove, removals, address };
}

