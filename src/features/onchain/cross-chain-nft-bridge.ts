'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface NFTBridge {
  id: string;
  tokenId: string;
  fromChain: number;
  toChain: number;
  bridged: boolean;
}

export function useCrossChainNFTBridge() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [bridges, setBridges] = useState<NFTBridge[]>([]);

  const bridgeNFT = async (tokenId: string, fromChain: number, toChain: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'bridgeNFT',
      args: [BigInt(tokenId), fromChain, toChain],
    });

    const bridge: NFTBridge = {
      id: txHash || '',
      tokenId,
      fromChain,
      toChain,
      bridged: true,
    };

    setBridges([...bridges, bridge]);
    return txHash;
  };

  return { bridgeNFT, bridges, address };
}

