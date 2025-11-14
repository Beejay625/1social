'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ProtocolBridge {
  id: string;
  asset: string;
  fromProtocol: string;
  toProtocol: string;
  amount: bigint;
  bridged: boolean;
}

export function useCrossProtocolBridge() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [bridges, setBridges] = useState<ProtocolBridge[]>([]);

  const bridgeAsset = async (asset: string, fromProtocol: string, toProtocol: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'bridge',
      args: [asset, fromProtocol, toProtocol, BigInt(amount)],
    });

    const bridge: ProtocolBridge = {
      id: txHash || '',
      asset,
      fromProtocol,
      toProtocol,
      amount: BigInt(amount),
      bridged: true,
    };

    setBridges([...bridges, bridge]);
    return txHash;
  };

  return { bridgeAsset, bridges, address };
}


