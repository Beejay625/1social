'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ApprovalRevocation {
  token: string;
  spender: string;
  revoked: boolean;
}

export function useTokenApprovalRevoker() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [revocations, setRevocations] = useState<ApprovalRevocation[]>([]);

  const revokeApproval = async (token: string, spender: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'approve',
      args: [spender, BigInt(0)],
    });

    const revocation: ApprovalRevocation = {
      token,
      spender,
      revoked: true,
    };

    setRevocations([...revocations, revocation]);
    return txHash;
  };

  return { revokeApproval, revocations, address };
}


