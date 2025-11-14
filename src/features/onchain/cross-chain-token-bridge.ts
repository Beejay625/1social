'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TokenBridge {
  id: string;
  token: string;
  fromChain: number;
  toChain: number;
  amount: bigint;
  bridged: boolean;
}

export function useCrossChainTokenBridge() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [bridges, setBridges] = useState<TokenBridge[]>([]);

  const bridgeToken = async (token: string, fromChain: number, toChain: number, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'bridge',
      args: [fromChain, toChain, BigInt(amount)],
    });

    const bridge: TokenBridge = {
      id: txHash || '',
      token,
      fromChain,
      toChain,
      amount: BigInt(amount),
      bridged: true,
    };

    setBridges([...bridges, bridge]);
    return txHash;
  };

  return { bridgeToken, bridges, address };
}


