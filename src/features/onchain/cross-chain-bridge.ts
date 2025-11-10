'use client';

import { useAccount, useWriteContract, useSwitchChain } from 'wagmi';
import { useState } from 'react';

export interface BridgeTransaction {
  fromChain: number;
  toChain: number;
  amount: string;
  token: string;
  txHash: string;
}

export function useCrossChainBridge() {
  const { address, isConnected, chainId } = useAccount();
  const { writeContract } = useWriteContract();
  const { switchChain } = useSwitchChain();
  const [bridges, setBridges] = useState<BridgeTransaction[]>([]);

  const bridgeTokens = async (toChain: number, amount: string, token: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    if (chainId !== toChain) {
      await switchChain({ chainId: toChain });
    }

    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'bridge',
      args: [toChain, amount],
    });

    const bridge: BridgeTransaction = {
      fromChain: chainId || 0,
      toChain,
      amount,
      token,
      txHash: txHash || '',
    };

    setBridges([...bridges, bridge]);
    return txHash;
  };

  return { bridgeTokens, bridges, isConnected, address, chainId };
}


import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BridgeTransaction {
  fromChain: string;
  toChain: string;
  amount: string;
  txHash: string;
}

export function useCrossChainBridge() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [bridges, setBridges] = useState<BridgeTransaction[]>([]);

  const bridgeAssets = async (fromChain: string, toChain: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Bridge: ${fromChain} -> ${toChain} ${amount}`;
    await signMessageAsync({ message });
    
    const bridge: BridgeTransaction = {
      fromChain,
      toChain,
      amount,
      txHash: `0x${Date.now().toString(16)}`,
    };
    
    setBridges([...bridges, bridge]);
    return bridge;
  };

  return { bridgeAssets, bridges, address };
}

