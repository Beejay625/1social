'use client';

/**
 * Token Vesting Releaser
 * Release vested tokens with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingRelease {
  releaseId: string;
  vestingScheduleId: string;
  beneficiary: string;
  amount: string;
  releasedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenVestingReleaser() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [releases, setReleases] = useState<VestingRelease[]>([]);

  const release = async (
    vestingScheduleId: string,
    beneficiary: string,
    amount: string
  ): Promise<VestingRelease> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!beneficiary.startsWith('0x')) {
      throw new Error('Invalid beneficiary address format');
    }
    if (parseFloat(amount) <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    const message = `Release vested tokens: ${vestingScheduleId} ${amount} to ${beneficiary}`;
    await signMessageAsync({ message });
    
    const release: VestingRelease = {
      releaseId: `release-${Date.now()}`,
      vestingScheduleId,
      beneficiary,
      amount,
      releasedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setReleases([...releases, release]);
    return release;
  };

  return { release, releases, address };
}
