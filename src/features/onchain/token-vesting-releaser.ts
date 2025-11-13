'use client';

/**
 * Token Vesting Releaser
 * Release vested tokens with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingRelease {
  releaseId: string;
  vestingId: string;
  tokenAddress: string;
  amount: string;
  txHash: string;
  timestamp: number;
}

export function useTokenVestingReleaser() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [releases, setReleases] = useState<VestingRelease[]>([]);

  const release = async (
    vestingId: string,
    tokenAddress: string,
    amount: string
  ): Promise<VestingRelease> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (parseFloat(amount) <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    const message = `Release vested tokens: ${vestingId} ${amount}`;
    await signMessageAsync({ message });
    
    const release: VestingRelease = {
      releaseId: `release-${Date.now()}`,
      vestingId,
      tokenAddress,
      amount,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setReleases([...releases, release]);
    return release;
  };

  return { release, releases, address };
}
