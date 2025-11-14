'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTAuctionBidWithdrawerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [withdrawing, setWithdrawing] = useState(false);

  const { data: bidAmount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getBid',
    args: address ? [address, 0n] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const withdraw = async (auctionAddress: string, auctionId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setWithdrawing(true);

    try {
      const message = `Withdraw bid from auction ${auctionId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: auctionAddress as `0x${string}`,
        abi: [],
        functionName: 'withdrawBid',
        args: [auctionId],
      });
    } finally {
      setWithdrawing(false);
    }
  };

  return {
    withdraw,
    withdrawing,
    address,
    isConnected,
    bidAmount,
  };
}

