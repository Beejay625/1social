'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DisputeData {
  rentalId: number;
  reason: string;
  evidence: string;
}

export function useNFTRentalDisputeResolver() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [resolving, setResolving] = useState(false);

  const { data: disputes } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getDisputes',
    args: [address],
  });

  const createDispute = async (rentalAddress: string, dispute: DisputeData) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setResolving(true);

    try {
      const message = `Create dispute for rental ${dispute.rentalId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: rentalAddress as `0x${string}`,
        abi: [],
        functionName: 'createDispute',
        args: [dispute.rentalId, dispute.reason, dispute.evidence],
      });
    } finally {
      setResolving(false);
    }
  };

  return {
    createDispute,
    resolving,
    address,
    isConnected,
    disputes,
  };
}

