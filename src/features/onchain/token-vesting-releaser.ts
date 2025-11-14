'use client';

/**
 * Token Vesting Releaser
 * Release vested tokens with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface VestingRelease {
  releaseId: string;
  vestingId: string;
  amount: string;
  releasedBy: string;
  timestamp: number;
}

export function useTokenVestingReleaser() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [releases, setReleases] = useState<VestingRelease[]>([]);

  const releaseVested = async (
    vestingId: string,
    amount: string
  ): Promise<VestingRelease> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Release vested: ${vestingId} amount ${amount}`;
    await signMessageAsync({ message });
    
    const release: VestingRelease = {
      releaseId: `release-${Date.now()}`,
      vestingId,
      amount,
      releasedBy: address,
      timestamp: Date.now(),
    };
    
    setReleases([...releases, release]);
    return release;
  };

  return { releaseVested, releases, address };
}
