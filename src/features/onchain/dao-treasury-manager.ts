'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TreasuryAction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: bigint;
  token: string;
  to: string;
  executed: boolean;
}

export function useDAOTreasuryManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [actions, setActions] = useState<TreasuryAction[]>([]);

  const executeAction = async (type: 'deposit' | 'withdraw' | 'transfer', amount: string, token: string, to: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'execute',
      args: [type, BigInt(amount), token, to],
    });

    const action: TreasuryAction = {
      id: txHash || '',
      type,
      amount: BigInt(amount),
      token,
      to,
      executed: true,
    };

    setActions([...actions, action]);
    return txHash;
  };

  return { executeAction, actions, address };
}


