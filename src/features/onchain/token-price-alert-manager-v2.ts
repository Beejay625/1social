'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PriceAlert {
  tokenAddress: string;
  targetPrice: bigint;
  direction: 'above' | 'below';
  alertId: string;
}

export function useTokenPriceAlertManagerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [triggered, setTriggered] = useState<string[]>([]);

  const { data: currentPrice } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPrice',
  });

  useEffect(() => {
    if (address && isConnected && alerts.length > 0 && currentPrice) {
      checkAlerts();
    }
  }, [address, isConnected, alerts, currentPrice]);

  const createAlert = async (alert: PriceAlert) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Create price alert for ${alert.tokenAddress}`;
    await signMessageAsync({ message });

    setAlerts([...alerts, alert]);
  };

  const removeAlert = async (alertId: string) => {
    setAlerts(alerts.filter(a => a.alertId !== alertId));
  };

  const checkAlerts = async () => {
    const price = currentPrice as bigint || BigInt(0);
    const newTriggered: string[] = [];

    for (const alert of alerts) {
      const shouldTrigger = alert.direction === 'above' 
        ? price >= alert.targetPrice 
        : price <= alert.targetPrice;

      if (shouldTrigger && !triggered.includes(alert.alertId)) {
        newTriggered.push(alert.alertId);
      }
    }

    if (newTriggered.length > 0) {
      setTriggered([...triggered, ...newTriggered]);
    }
  };

  return {
    createAlert,
    removeAlert,
    alerts,
    triggered,
    address,
    isConnected,
    currentPrice,
  };
}
