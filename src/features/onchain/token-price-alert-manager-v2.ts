'use client';

/**
 * Token Price Alert Manager V2
 * Set and manage price alerts with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PriceAlert {
  alertId: string;
  tokenAddress: string;
  targetPrice: string;
  alertType: 'above' | 'below';
  currency: string;
  active: boolean;
  createdBy: string;
  timestamp: number;
}

export function useTokenPriceAlertManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const createAlert = async (
    tokenAddress: string,
    targetPrice: string,
    alertType: 'above' | 'below',
    currency: string
  ): Promise<PriceAlert> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (parseFloat(targetPrice) <= 0) {
      throw new Error('Target price must be greater than zero');
    }
    
    const message = `Create price alert: ${tokenAddress} ${alertType} ${targetPrice} ${currency}`;
    await signMessageAsync({ message });
    
    const alert: PriceAlert = {
      alertId: `alert-${Date.now()}`,
      tokenAddress,
      targetPrice,
      alertType,
      currency,
      active: true,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setAlerts([...alerts, alert]);
    return alert;
  };

  return { createAlert, alerts, address };
}
