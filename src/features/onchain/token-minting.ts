'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TokenMint {
  id: string;
  token: string;
  amount: bigint;
  recipient: string;
  mintedAt: number;
}

export function useTokenMinting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [mints, setMints] = useState<TokenMint[]>([]);

  const mintTokens = async (token: string, amount: string, recipient: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'mint',
      args: [recipient, BigInt(amount)],
    });

    const mint: TokenMint = {
      id: txHash || '',
      token,
      amount: BigInt(amount),
      recipient,
      mintedAt: Date.now(),
    };

    setMints([...mints, mint]);
    return txHash;
  };

  return { mintTokens, mints, address };
}

