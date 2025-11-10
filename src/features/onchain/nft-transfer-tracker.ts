'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface NFTTransfer {
  from: string;
  to: string;
  tokenId: bigint;
  contract: string;
  timestamp: number;
}

export function useNFTTransferTracker() {
  const { address } = useAccount();
  const [transfers, setTransfers] = useState<NFTTransfer[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      const transfer: NFTTransfer = {
        from: logs[0]?.args?.from || '',
        to: logs[0]?.args?.to || '',
        tokenId: logs[0]?.args?.tokenId || BigInt(0),
        contract: '0x',
        timestamp: Date.now(),
      };
      setTransfers([...transfers, transfer]);
    },
  });

  return { transfers, address };
}

