'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PriceAlert {
  token: string;
  targetPrice: bigint;
  direction: 'above' | 'below';
  active: boolean;
}

export function useTokenPriceAlertSetter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const setAlert = async (token: string, targetPrice: string, direction: 'above' | 'below') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Alert: ${token} ${direction} ${targetPrice}`;
    await signMessageAsync({ message });

    const alert: PriceAlert = {
      token,
      targetPrice: BigInt(targetPrice),
      direction,
      active: true,
    };

    setAlerts([...alerts, alert]);
    return alert;
  };

  return { setAlert, alerts, address };
}


