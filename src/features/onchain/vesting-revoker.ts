'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface VestingRevocation {
  id: string;
  vestingId: string;
  revokedAt: number;
  revoked: boolean;
}

export function useVestingRevoker() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [revocations, setRevocations] = useState<VestingRevocation[]>([]);

  const revokeVesting = async (vestingId: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'revoke',
      args: [vestingId],
    });

    const revocation: VestingRevocation = {
      id: txHash || '',
      vestingId,
      revokedAt: Date.now(),
      revoked: true,
    };

    setRevocations([...revocations, revocation]);
    return txHash;
  };

  return { revokeVesting, revocations, address };
}


