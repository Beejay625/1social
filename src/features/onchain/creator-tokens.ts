'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CreatorToken {
  symbol: string;
  supply: string;
  creator: string;
  contractAddress: string;
}

export function useCreatorTokens() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [tokens, setTokens] = useState<CreatorToken[]>([]);

  const createToken = async (symbol: string, supply: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Token: ${symbol} ${supply}`;
    await signMessageAsync({ message });
    
    const token: CreatorToken = {
      symbol,
      supply,
      creator: address,
      contractAddress: `0x${Date.now().toString(16)}`,
    };
    
    setTokens([...tokens, token]);
    return token;
  };

  return { createToken, tokens, address };
}

