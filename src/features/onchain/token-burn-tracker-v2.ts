'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BurnRecord {
  amount: bigint;
  timestamp: bigint;
  totalBurned: bigint;
}

export function useTokenBurnTrackerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [burns, setBurns] = useState<BurnRecord[]>([]);
  const [totalBurned, setTotalBurned] = useState<bigint>(0n);

  const { data: totalSupply } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalSupply',
    query: { enabled: isConnected },
  });

  const { data: burnedAmount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalBurned',
    query: { enabled: isConnected },
  });

  const trackBurns = async (tokenAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Track burns for token: ${tokenAddress}`;
    await signMessageAsync({ message });

    if (burnedAmount) {
      setTotalBurned(burnedAmount as bigint);
    }
  };

  useEffect(() => {
    if (burnedAmount) {
      setTotalBurned(burnedAmount as bigint);
    }
  }, [burnedAmount]);

  return {
    trackBurns,
    burns,
    totalBurned,
    address,
    isConnected,
    totalSupply,
  };
}
