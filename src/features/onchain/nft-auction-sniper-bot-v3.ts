'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SniperConfig {
  auctionAddress: string;
  maxBid: bigint;
  executeAtTime: number;
  bidIncrement: bigint;
}

export function useNFTAuctionSniperBotV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [snipping, setSnipping] = useState(false);
  const [monitoring, setMonitoring] = useState(false);

  const { data: currentBid } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCurrentBid',
    args: ['0x', BigInt(0)],
  });

  const { data: auctionEndTime } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getAuctionEndTime',
    args: ['0x', BigInt(0)],
  });

  const setupSniper = async (config: SniperConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSnipping(true);

    try {
      const message = `Setup sniper bot with max bid ${config.maxBid}`;
      await signMessageAsync({ message });

      await writeContract({
        address: config.auctionAddress as `0x${string}`,
        abi: [],
        functionName: 'setupSniper',
        args: [config.maxBid, config.executeAtTime, config.bidIncrement],
      });
    } finally {
      setSnipping(false);
    }
  };

  const executeSnipe = async (auctionAddress: string, tokenId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setMonitoring(true);

    try {
      const message = `Execute snipe for token ${tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: auctionAddress as `0x${string}`,
        abi: [],
        functionName: 'executeSnipe',
        args: [tokenId],
      });
    } finally {
      setMonitoring(false);
    }
  };

  return {
    setupSniper,
    executeSnipe,
    snipping,
    monitoring,
    address,
    isConnected,
    currentBid,
    auctionEndTime,
  };
}

