'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Activity {
  type: 'transfer' | 'swap' | 'mint' | 'approval';
  from: string;
  to: string;
  amount: bigint;
  timestamp: number;
  txHash: string;
}

export function useWalletActivityMonitorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [monitoring, setMonitoring] = useState(false);

  const { data: activityData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getActivities',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected && monitoring },
  });

  const startMonitoring = async () => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Start monitoring wallet activity`;
    await signMessageAsync({ message });

    setMonitoring(true);
  };

  useEffect(() => {
    if (activityData) {
      const newActivities = activityData as Activity[];
      setActivities(prev => [...prev, ...newActivities]);
    }
  }, [activityData]);

  return {
    startMonitoring,
    activities,
    monitoring,
    address,
    isConnected,
  };
}

