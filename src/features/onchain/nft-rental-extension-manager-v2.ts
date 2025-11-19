'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTRentalExtensionManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [extending, setExtending] = useState(false);

  const extendRental = async (rentalAddress: string, rentalId: number, additionalDays: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExtending(true);

    try {
      const message = `Extend rental ${rentalId} by ${additionalDays} days`;
      await signMessageAsync({ message });

      await writeContract({
        address: rentalAddress as `0x${string}`,
        abi: [],
        functionName: 'extendRental',
        args: [rentalId, additionalDays],
      });
    } finally {
      setExtending(false);
    }
  };

  return {
    extendRental,
    extending,
    address,
    isConnected,
  };
}

