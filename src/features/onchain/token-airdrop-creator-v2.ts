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
  startTime: number;
  endTime: number;
  createdBy: string;
  timestamp: number;
}

export function useTokenAirdropCreatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);

  const create = async (
    tokenAddress: string,
    recipients: string[],
    amounts: string[],
    startTime: number,
    endTime: number,
    merkleRoot?: string
  ): Promise<Airdrop> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    if (endTime <= startTime) {
      throw new Error('End time must be after start time');
    }
    
    const message = `Create airdrop: ${tokenAddress} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const airdrop: Airdrop = {
      airdropId: `airdrop-${Date.now()}`,
      tokenAddress,
      recipients,
      amounts,
      merkleRoot,
      startTime,
      endTime,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setAirdrops([...airdrops, airdrop]);
    return airdrop;
  };

  return { create, airdrops, address };
}

