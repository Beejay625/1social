'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface NFTMint {
  to: string;
  tokenId: bigint;
  contract: string;
  timestamp: number;
}

export function useNFTMintTracker() {
  const { address } = useAccount();
  const [mints, setMints] = useState<NFTMint[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      if (logs[0]?.args?.from === '0x0000000000000000000000000000000000000000') {
        const mint: NFTMint = {
          to: logs[0]?.args?.to || '',
          tokenId: logs[0]?.args?.tokenId || BigInt(0),
          contract: '0x',
          timestamp: Date.now(),
        };
        setMints([...mints, mint]);
      }
    },
  });

  return { mints, address };
}

