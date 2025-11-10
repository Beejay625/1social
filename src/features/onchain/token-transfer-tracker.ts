'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface TransferRecord {
  token: string;
  from: string;
  to: string;
  amount: bigint;
  timestamp: number;
}

export function useTokenTransferTracker() {
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: [address],
  });
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);

  useEffect(() => {
    if (!address || !balance) return;
    
    const transfer: TransferRecord = {
      token: 'ETH',
      from: '0x',
      to: address,
      amount: BigInt(balance as string),
      timestamp: Date.now(),
    };
    
    setTransfers([transfer]);
  }, [address, balance]);

  return { transfers, address };
}
