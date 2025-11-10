'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TokenStream {
  id: string;
  recipient: string;
  token: string;
  rate: bigint;
  duration: number;
  active: boolean;
}

export function useTokenStreaming() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [streams, setStreams] = useState<TokenStream[]>([]);

  const createStream = async (recipient: string, token: string, rate: string, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'createStream',
      args: [recipient, BigInt(rate), duration],
    });

    const stream: TokenStream = {
      id: txHash || '',
      recipient,
      token,
      rate: BigInt(rate),
      duration,
      active: true,
    };

    setStreams([...streams, stream]);
    return txHash;
  };

  return { createStream, streams, address };
}

