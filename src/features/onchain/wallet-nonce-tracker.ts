'use client';

import { useAccount, useNonce } from 'wagmi';
import { useState, useEffect } from 'react';

export interface NonceInfo {
  address: string;
  nonce: number;
  timestamp: number;
}

export function useWalletNonceTracker() {
  const { address } = useAccount();
  const { data: nonce } = useNonce({ address });
  const [nonceInfo, setNonceInfo] = useState<NonceInfo | null>(null);

  useEffect(() => {
    if (address && nonce !== undefined) {
      setNonceInfo({
        address,
        nonce,
        timestamp: Date.now(),
      });
    }
  }, [address, nonce]);

  return { nonceInfo, address };
}


