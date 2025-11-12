'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenMint {
  id: string;
  minter: string;
  tokenAddress: string;
  amount: string;
  recipient: string;
  timestamp: number;
  transactionHash?: string;
}

export function useSocialTokenMinting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [mints, setMints] = useState<TokenMint[]>([]);

  const mintTokens = async (
    tokenAddress: string,
    amount: string,
    recipient: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Mint Tokens: ${tokenAddress} ${amount} to ${recipient}`;
    await signMessageAsync({ message });
    
    const mint: TokenMint = {
      id: `mint-${Date.now()}`,
      minter: address,
      tokenAddress,
      amount,
      recipient,
      timestamp: Date.now(),
      transactionHash: `0x${Date.now().toString(16)}`,
    };
    
    setMints([...mints, mint]);
    return mint;
  };

  return { mintTokens, mints, address };
}

