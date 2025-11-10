'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Airdrop {
  id: string;
  recipients: string[];
  tokenAddress: string;
  amountPerRecipient: bigint;
  totalAmount: bigint;
  claimed: number;
}

export function useAirdropManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);

  const createAirdrop = async (
    recipients: string[],
    tokenAddress: string,
    amountPerRecipient: bigint
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const totalAmount = amountPerRecipient * BigInt(recipients.length);
    const txHash = await writeContract({
      address: tokenAddress as `0x${string}`,
      abi: [],
      functionName: 'createAirdrop',
      args: [recipients, amountPerRecipient],
    });

    const airdrop: Airdrop = {
      id: txHash || '',
      recipients,
      tokenAddress,
      amountPerRecipient,
      totalAmount,
      claimed: 0,
    };

    setAirdrops([...airdrops, airdrop]);
    return txHash;
  };

  return { createAirdrop, airdrops, isConnected, address };
}

