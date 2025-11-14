'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StorageSlot {
  variable: string;
  slot: number;
  offset: number;
  wallet: string;
  timestamp: number;
}

export function useContractStorageSlotCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [slots, setSlots] = useState<StorageSlot[]>([]);

  const calculateSlot = async (variable: string, slot: number, offset: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate Slot: ${variable} at ${slot}`;
    await signMessageAsync({ message });
    
    const storageSlot: StorageSlot = {
      variable,
      slot,
      offset,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSlots([...slots, storageSlot]);
    return storageSlot;
  };

  return { calculateSlot, slots, address };
}


