'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Airdrop {
  id: string;
  creator: string;
  tokenAddress: string;
  recipients: string[];
  amountPerRecipient: string;
  totalAmount: string;
  timestamp: number;
  status: 'pending' | 'distributed' | 'failed';
}

export function useSocialTokenAirdrops() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);

  const createAirdrop = async (
    tokenAddress: string,
    recipients: string[],
    amountPerRecipient: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Airdrop: ${tokenAddress} ${recipients.length} recipients ${amountPerRecipient}`;
    await signMessageAsync({ message });
    
    const totalAmount = (BigInt(amountPerRecipient) * BigInt(recipients.length)).toString();
    
    const airdrop: Airdrop = {
      id: `airdrop-${Date.now()}`,
      creator: address,
      tokenAddress,
      recipients,
      amountPerRecipient,
      totalAmount,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setAirdrops([...airdrops, airdrop]);
    return airdrop;
  };

  return { createAirdrop, airdrops, address };
}

