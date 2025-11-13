'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface FloorPriceAlert {
  collectionAddress: string;
  currentFloor: string;
  targetFloor: string;
  alertType: 'above' | 'below';
  active: boolean;
  alertId: string;
}

export function useNFTCollectionFloorPriceMonitor() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [alerts, setAlerts] = useState<FloorPriceAlert[]>([]);

  const createAlert = async (collectionAddress: string, targetFloor: string, alertType: 'above' | 'below') => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Create floor price alert for ${collectionAddress}: ${alertType} ${targetFloor}`;
    await signMessageAsync({ message });
    
    const alert: FloorPriceAlert = {
      collectionAddress,
      currentFloor: '0',
      targetFloor,
      alertType,
      active: true,
      alertId: `alert_${Date.now()}`,
    };
    
    setAlerts([...alerts, alert]);
    return alert;
  };

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(a => a.alertId === alertId ? { ...a, active: !a.active } : a));
  };

  return { 
    createAlert, 
    toggleAlert,
    alerts, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

