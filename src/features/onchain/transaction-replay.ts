'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReplayTx {
  originalHash: string;
  replayedHash: string;
  success: boolean;
  wallet: string;
  timestamp: number;
}

export function useTransactionReplay() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [replays, setReplays] = useState<ReplayTx[]>([]);

  const replayTransaction = async (originalHash: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Replay: ${originalHash}`;
    await signMessageAsync({ message });
    
    const replay: ReplayTx = {
      originalHash,
      replayedHash: `0x${Date.now().toString(16)}`,
      success: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setReplays([...replays, replay]);
    return replay;
  };

  return { replayTransaction, replays, address };
}

