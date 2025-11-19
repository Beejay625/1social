'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VerificationRequest {
  collectionAddress: string;
  verificationType: 'blue-check' | 'verified' | 'featured';
  proof: string;
}

export function useNFTCollectionVerificationManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [verifying, setVerifying] = useState(false);

  const { data: isVerified } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isVerified',
  });

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'owner',
  });

  const requestVerification = async (request: VerificationRequest) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setVerifying(true);

    try {
      const message = `Request verification: ${request.verificationType}`;
      await signMessageAsync({ message });

      await writeContract({
        address: request.collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'requestVerification',
        args: [request.verificationType, request.proof],
      });
    } finally {
      setVerifying(false);
    }
  };

  return {
    requestVerification,
    verifying,
    address,
    isConnected,
    isVerified,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
  };
}

