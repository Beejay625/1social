'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentSchedule {
  scheduleId: string;
  contentHash: string;
  scheduledTime: bigint;
  status: 'pending' | 'published' | 'cancelled';
  creator: string;
}

export function useOnchainContentScheduleManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [scheduling, setScheduling] = useState(false);
  const [schedules, setSchedules] = useState<ContentSchedule[]>([]);

  const { data: scheduleData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getSchedules',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const scheduleContent = async (contentHash: string, scheduledTime: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'scheduleContent',
        args: [contentHash, scheduledTime, address],
      });
    } finally {
      setScheduling(false);
    }
  };

  useEffect(() => {
    if (scheduleData) {
      const schedule = scheduleData as ContentSchedule;
      setSchedules(prev => {
        const filtered = prev.filter(s => s.scheduleId !== schedule.scheduleId);
        return [...filtered, schedule];
      });
    }
  }, [scheduleData]);

  return {
    scheduleContent,
    scheduling,
    schedules,
    address,
    isConnected,
    scheduleData,
  };
}

