'use client';

/**
 * Token Airdrop Creator V2
 * Create token airdrops with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Airdrop {
  airdropId: string;
  tokenAddress: string;
  recipients: string[];
  amounts: string[];
  merkleRoot?: string;
  createdBy: string;
  timestamp: number;
}

export function useTokenAirdropCreatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);

  const createAirdrop = async (
    tokenAddress: string,
    recipients: string[],
    amounts: string[]
  ): Promise<Airdrop> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    const message = `Create airdrop: ${tokenAddress} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const airdrop: Airdrop = {
      airdropId: `airdrop-${Date.now()}`,
      tokenAddress,
      recipients,
      amounts,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setAirdrops([...airdrops, airdrop]);
    return airdrop;
  };

  return { createAirdrop, airdrops, address };
}
