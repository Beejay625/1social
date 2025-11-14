'use client';

/**
 * Token Price Alert Manager
 * Set and manage price alerts for tokens with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PriceAlert {
  alertId: string;
  tokenAddress: string;
  targetPrice: string;
  condition: 'above' | 'below';
  active: boolean;
  createdBy: string;
  timestamp: number;
}

export function useTokenPriceAlertManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const createAlert = async (
    tokenAddress: string,
    targetPrice: string,
    condition: 'above' | 'below'
  ): Promise<PriceAlert> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Create price alert: ${tokenAddress} ${condition} ${targetPrice}`;
    await signMessageAsync({ message });
    
    const alert: PriceAlert = {
      alertId: `alert-${Date.now()}`,
      tokenAddress,
      targetPrice,
      condition,
      active: true,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setAlerts([...alerts, alert]);
    return alert;
  };

  return { createAlert, alerts, address };
}
