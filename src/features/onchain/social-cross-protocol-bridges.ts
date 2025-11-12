'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BridgeTransaction {
  id: string;
  user: string;
  fromProtocol: string;
  toProtocol: string;
  asset: string;
  amount: string;
  timestamp: number;
  status: 'pending' | 'bridging' | 'completed' | 'failed';
}

export function useSocialCrossProtocolBridges() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [bridges, setBridges] = useState<BridgeTransaction[]>([]);

  const bridgeAsset = async (
    fromProtocol: string,
    toProtocol: string,
    asset: string,
    amount: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Bridge Asset: ${asset} ${amount} from ${fromProtocol} to ${toProtocol}`;
    await signMessageAsync({ message });
    
    const bridge: BridgeTransaction = {
      id: `bridge-${Date.now()}`,
      user: address,
      fromProtocol,
      toProtocol,
      asset,
      amount,
      timestamp: Date.now(),
      status: 'bridging',
    };
    
    setBridges([...bridges, bridge]);
    return bridge;
  };

  return { bridgeAsset, bridges, address };
}

