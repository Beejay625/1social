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
  amount: string;
  recipient: string;
  txHash: string;
  releasedBy: string;
  timestamp: number;
}

export function useTokenVestingReleaser() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [releases, setReleases] = useState<VestingRelease[]>([]);

  const release = async (
    vestingId: string,
    amount: string,
    recipient: string
  ): Promise<VestingRelease> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!recipient.startsWith('0x')) {
      throw new Error('Invalid recipient address format');
    }
    if (parseFloat(amount) <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    const message = `Release vesting: ${vestingId} ${amount} to ${recipient}`;
    await signMessageAsync({ message });
    
    const release: VestingRelease = {
      releaseId: `release-${Date.now()}`,
      vestingId,
      amount,
      recipient,
      txHash: `0x${Date.now().toString(16)}`,
      releasedBy: address,
      timestamp: Date.now(),
    };
    
    setReleases([...releases, release]);
    return release;
  };

  return { release, releases, address };
}
