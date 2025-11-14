'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultiSendRecipient {
  address: string;
  amount: bigint;
}

export function useTokenMultiSendExecutorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [executing, setExecuting] = useState(false);

  const execute = async (tokenAddress: string, recipients: MultiSendRecipient[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExecuting(true);

    try {
      const message = `Execute multi-send to ${recipients.length} recipients`;
      await signMessageAsync({ message });

      const addresses = recipients.map(r => r.address);
      const amounts = recipients.map(r => r.amount);

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'multiSend',
        args: [addresses, amounts],
      });
    } finally {
      setExecuting(false);
    }
  };

  return {
    execute,
    executing,
    address,
    isConnected,
  };
}
