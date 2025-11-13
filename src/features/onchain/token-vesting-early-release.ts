'use client';

/**
 * Token Vesting Early Release
 * Early release of vested tokens with penalty via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EarlyRelease {
  releaseId: string;
  vestingScheduleId: string;
  tokenAddress: string;
  amount: string;
  penalty: string;
  releasedBy: string;
  timestamp: number;
}

export function useTokenVestingEarlyRelease() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [releases, setReleases] = useState<EarlyRelease[]>([]);

  const releaseEarly = async (
    vestingScheduleId: string,
    tokenAddress: string,
    amount: string,
    penalty: string
  ): Promise<EarlyRelease> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (parseFloat(penalty) < 0) {
      throw new Error('Penalty cannot be negative');
    }
    
    const message = `Early release: ${vestingScheduleId} with ${penalty} penalty`;
    await signMessageAsync({ message });
    
    const release: EarlyRelease = {
      releaseId: `release-${Date.now()}`,
      vestingScheduleId,
      tokenAddress,
      amount,
      penalty,
      releasedBy: address,
      timestamp: Date.now(),
    };
    
    setReleases([...releases, release]);
    return release;
  };

  return { releaseEarly, releases, address };
}
