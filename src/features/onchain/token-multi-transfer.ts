'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MultiTransfer {
  tokenAddress: string;
  recipients: string[];
  amounts: bigint[];
}

export function useTokenMultiTransfer() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [transferring, setTransferring] = useState(false);

  const multiTransfer = async (transfer: MultiTransfer) => {
    if (!address) return;
    setTransferring(true);
    // Implementation for multi-transfer
    setTransferring(false);
  };

  return { multiTransfer, transferring, address };
}


