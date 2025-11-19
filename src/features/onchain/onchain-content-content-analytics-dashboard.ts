'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface AnalyticsDashboard {
  dashboardId: string;
  metrics: string[];
  timeframe: bigint;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentAnalyticsDashboard() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);
  const [dashboards, setDashboards] = useState<AnalyticsDashboard[]>([]);

  const { data: dashboardData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getDashboards',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createDashboard = async (metrics: string[], timeframe: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create analytics dashboard onchain`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createDashboard',
        args: [metrics, timeframe, address],
      });
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (dashboardData) {
      const dashboard = dashboardData as AnalyticsDashboard;
      setDashboards(prev => {
        const filtered = prev.filter(d => d.dashboardId !== dashboard.dashboardId);
        return [...filtered, dashboard];
      });
    }
  }, [dashboardData]);

  return {
    createDashboard,
    creating,
    dashboards,
    address,
    isConnected,
    dashboardData,
  };
}

