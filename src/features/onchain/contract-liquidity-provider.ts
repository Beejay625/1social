'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Liquidity {
  pool: string;
  tokenA: string;
  tokenB: string;
  amountA: bigint;
  amountB: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractLiquidityProvider() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [liquidity, setLiquidity] = useState<Liquidity[]>([]);

  const provideLiquidity = async (pool: string, tokenA: string, tokenB: string, amountA: bigint, amountB: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Provide Liquidity: ${pool} with ${amountA} ${tokenA} and ${amountB} ${tokenB}`;
    await signMessageAsync({ message });
    
    const liq: Liquidity = {
      pool,
      tokenA,
      tokenB,
      amountA,
      amountB,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setLiquidity([...liquidity, liq]);
    return liq;
  };

  return { provideLiquidity, liquidity, address };
}

