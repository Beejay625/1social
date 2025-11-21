'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CommunityRewardRoute {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type CommunityRewardRoutePayload = Partial<CommunityRewardRoute> & {
  rationale?: string;
};

export function useOnchainCommunityRewardRouter() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [routes, setRoutes] = useState<CommunityRewardRoute[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCommunityRewardRoutes',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createCommunityRewardRoute = async (payload: CommunityRewardRoutePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Create community reward route: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createCommunityRewardRoute',
        args: [
          payload.owner || address,
          payload.status || '',
          payload.weight ?? 0n,
          payload.metadata || '',
        ],
      });
    } finally {
      setProcessing(false);
    }
  };

  const rebalanceCommunityRewardRoute = async (payload: CommunityRewardRoutePayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Rebalance community reward route: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'rebalanceCommunityRewardRoute',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as CommunityRewardRoute;
      setRoutes(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    routes,
    processing,
    createCommunityRewardRoute,
    rebalanceCommunityRewardRoute,
    address,
    isConnected,
  };
}
