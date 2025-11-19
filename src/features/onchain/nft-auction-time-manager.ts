'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TimeAdjustment {
  auctionAddress: string;
  tokenId: bigint;
  newEndTime?: number;
  extension?: number;
}

export function useNFTAuctionTimeManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: endTime } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getEndTime',
    args: ['0x', BigInt(0)],
  });

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getAuctionOwner',
    args: ['0x', BigInt(0)],
  });

  const extendAuction = async (adjustment: TimeAdjustment) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Extend auction time for token ${adjustment.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: adjustment.auctionAddress as `0x${string}`,
        abi: [],
        functionName: 'extendAuction',
        args: [adjustment.tokenId, adjustment.extension || 3600],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    extendAuction,
    managing,
    address,
    isConnected,
    endTime,
    isOwner,
  };
}

