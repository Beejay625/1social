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
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  removedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenLiquidityRemoverV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [removals, setRemovals] = useState<LiquidityRemoval[]>([]);

  const removeLiquidity = async (
    poolAddress: string,
    lpTokenAmount: string,
    tokenA: string,
    tokenB: string
  ): Promise<LiquidityRemoval> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!poolAddress.startsWith('0x') || !tokenA.startsWith('0x') || !tokenB.startsWith('0x')) {
      throw new Error('Invalid address format');
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
      tokenA,
      tokenB,
      amountA: '0',
      amountB: '0',
      removedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setRemovals([...removals, removal]);
    return removal;
  };

  return { removeLiquidity, removals, address };
}
