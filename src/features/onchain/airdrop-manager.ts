'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Airdrop {
  recipients: string[];
  token: string;
  amount: string;
  txHash: string;
}

export function useAirdropManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);

  const createAirdrop = async (recipients: string[], token: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Airdrop: ${recipients.length} recipients ${amount} ${token}`;
    await signMessageAsync({ message });
    
    const airdrop: Airdrop = {
      recipients,
      token,
      amount,
      txHash: `0x${Date.now().toString(16)}`,
    };
    
    setAirdrops([...airdrops, airdrop]);
    return airdrop;
  };

  return { createAirdrop, airdrops, address };
}
