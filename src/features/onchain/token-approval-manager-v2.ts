'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ApprovalConfig {
  tokenAddress: string;
  spender: string;
  amount: bigint;
}

export function useTokenApprovalManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: currentAllowance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'allowance',
    args: address ? [address, '0x'] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const approve = async (config: ApprovalConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Approve ${config.amount} tokens to ${config.spender}`;
      await signMessageAsync({ message });

      await writeContract({
        address: config.tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'approve',
        args: [config.spender, config.amount],
      });
    } finally {
      setManaging(false);
    }
  };

  const revoke = async (tokenAddress: string, spender: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Revoke approval for ${spender}`;
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'approve',
        args: [spender, 0n],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    approve,
    revoke,
    managing,
    address,
    isConnected,
    currentAllowance,
  };
}

