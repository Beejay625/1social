'use client';

/**
 * NFT Auction Bid Withdrawer
 * Withdraw auction bids with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BidWithdrawal {
  withdrawalId: string;
  auctionId: string;
  bidId: string;
  withdrawnBy: string;
  timestamp: number;
}

export function useNFTAuctionBidWithdrawer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [withdrawals, setWithdrawals] = useState<BidWithdrawal[]>([]);

  const withdrawBid = async (
    auctionId: string,
    bidId: string
  ): Promise<BidWithdrawal> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Withdraw bid: ${auctionId} bid ${bidId}`;
    await signMessageAsync({ message });
    
    const withdrawal: BidWithdrawal = {
      withdrawalId: `withdraw-${Date.now()}`,
      auctionId,
      bidId,
      withdrawnBy: address,
      timestamp: Date.now(),
    };
    
    setWithdrawals([...withdrawals, withdrawal]);
    return withdrawal;
  };

  return { withdrawBid, withdrawals, address };
}
