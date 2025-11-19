'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentNotification {
  notificationId: string;
  recipient: string;
  type: string;
  contentHash: string;
  timestamp: bigint;
  read: boolean;
}

export function useOnchainContentNotificationManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [notifications, setNotifications] = useState<ContentNotification[]>([]);

  const { data: notificationData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getNotifications',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const markAsRead = async (notificationId: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      const message = `Mark notification read onchain: ${notificationId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'markNotificationRead',
        args: [notificationId, address],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (notificationData) {
      const notification = notificationData as ContentNotification;
      setNotifications(prev => {
        const filtered = prev.filter(n => n.notificationId !== notification.notificationId);
        return [...filtered, notification];
      });
    }
  }, [notificationData]);

  return {
    markAsRead,
    processing,
    notifications,
    address,
    isConnected,
    notificationData,
  };
}

