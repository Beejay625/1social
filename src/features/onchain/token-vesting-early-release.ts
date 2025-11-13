'use client';

/**
 * Token Vesting Early Release
 * Early release of vested tokens with penalty via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EarlyRelease {
  releaseId: string;
  vestingId: string;
  amount: string;
  penalty: string;
  netAmount: string;
  timestamp: number;
}

export function useTokenVestingEarlyRelease() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [releases, setReleases] = useState<EarlyRelease[]>([]);

  const releaseEarly = async (
    vestingId: string,
    amount: string,
    penaltyPercentage: number
  ): Promise<EarlyRelease> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (penaltyPercentage < 0 || penaltyPercentage > 100) {
      throw new Error('Penalty percentage must be between 0 and 100');
    }
    
    const message = `Early release: ${vestingId} with ${penaltyPercentage}% penalty`;
    await signMessageAsync({ message });
    
    const amountNum = parseFloat(amount);
    const penalty = (amountNum * penaltyPercentage / 100).toString();
    const netAmount = (amountNum - parseFloat(penalty)).toString();
    
    const release: EarlyRelease = {
      releaseId: `release-${Date.now()}`,
      vestingId,
      amount,
      penalty,
      netAmount,
      timestamp: Date.now(),
    };
    
    setReleases([...releases, release]);
    return release;
  };

  return { releaseEarly, releases, address };
}
