'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReentrancyDetection {
  contract: string;
  vulnerable: boolean;
  functions: string[];
  wallet: string;
  timestamp: number;
}

export function useContractReentrancyDetector() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [detections, setDetections] = useState<ReentrancyDetection[]>([]);

  const detectReentrancy = async (contract: string, vulnerable: boolean, functions: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Detect Reentrancy: ${contract}`;
    await signMessageAsync({ message });
    
    const detection: ReentrancyDetection = {
      contract,
      vulnerable,
      functions,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDetections([...detections, detection]);
    return detection;
  };

  return { detectReentrancy, detections, address };
}

