'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface VestingSchedule {
  beneficiary: string;
  startTime: bigint;
  duration: bigint;
  amount: bigint;
  released: bigint;
}

export function useTokenVestingScheduleViewerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: scheduleData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVestingSchedule',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const viewSchedule = async (beneficiary: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setLoading(true);

    try {
      const message = `View vesting schedule for: ${beneficiary}`;
      await signMessageAsync({ message });

      if (scheduleData) {
        setSchedules([scheduleData as VestingSchedule]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scheduleData) {
      setSchedules([scheduleData as VestingSchedule]);
    }
  }, [scheduleData]);

  return {
    viewSchedule,
    schedules,
    loading,
    address,
    isConnected,
  };
}

