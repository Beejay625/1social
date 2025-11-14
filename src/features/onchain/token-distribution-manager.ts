'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Distribution {
  id: string;
  token: string;
  recipients: string[];
  amounts: bigint[];
  distributed: boolean;
}

export function useTokenDistributionManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [distributions, setDistributions] = useState<Distribution[]>([]);

  const distribute = async (token: string, recipients: string[], amounts: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'distribute',
      args: [recipients, amounts.map(a => BigInt(a))],
    });

    const distribution: Distribution = {
      id: txHash || '',
      token,
      recipients,
      amounts: amounts.map(a => BigInt(a)),
      distributed: true,
    };

    setDistributions([...distributions, distribution]);
    return txHash;
  };

  return { distribute, distributions, address };
}


