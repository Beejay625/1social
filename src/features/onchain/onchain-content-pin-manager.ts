'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentPin {
  contentHash: string;
  pinnedBy: string;
  pinTime: bigint;
  position: number;
}

export function useOnchainContentPinManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [pinning, setPinning] = useState(false);
  const [pins, setPins] = useState<ContentPin[]>([]);

  const { data: pinData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPins',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const pinContent = async (contentHash: string, position: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setPinning(true);

    try {
      const message = `Pin content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'pinContent',
        args: [contentHash, position, address],
      });
    } finally {
      setPinning(false);
    }
  };

  useEffect(() => {
    if (pinData) {
      const pin = pinData as ContentPin;
      setPins(prev => {
        const filtered = prev.filter(p => p.contentHash !== pin.contentHash);
        return [...filtered, pin];
      });
    }
  }, [pinData]);

  return {
    pinContent,
    pinning,
    pins,
    address,
    isConnected,
    pinData,
  };
}

