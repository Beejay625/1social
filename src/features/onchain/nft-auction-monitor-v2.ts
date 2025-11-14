'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface AuctionData {
  auctionId: bigint;
  tokenId: bigint;
  highestBid: bigint;
  bidder: string;
  endTime: bigint;
  active: boolean;
}

export function useNFTAuctionMonitorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [auctions, setAuctions] = useState<AuctionData[]>([]);
  const [monitoring, setMonitoring] = useState(false);

  const { data: auctionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getAuction',
    args: [0n],
    query: { enabled: isConnected && monitoring },
  });

  const startMonitoring = async (auctionId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Start monitoring auction: ${auctionId}`;
    await signMessageAsync({ message });

    setMonitoring(true);
  };

  useEffect(() => {
    if (auctionData) {
      const auction = auctionData as AuctionData;
      setAuctions(prev => {
        const filtered = prev.filter(a => a.auctionId !== auction.auctionId);
        return [...filtered, auction];
      });
    }
  }, [auctionData]);

  return {
    startMonitoring,
    auctions,
    monitoring,
    address,
    isConnected,
  };
}

