'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OverflowDetection {
  contract: string;
  vulnerable: boolean;
  operations: string[];
  wallet: string;
  timestamp: number;
}

export function useContractOverflowDetector() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [detections, setDetections] = useState<OverflowDetection[]>([]);

  const detectOverflow = async (contract: string, vulnerable: boolean, operations: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Detect Overflow: ${contract}`;
    await signMessageAsync({ message });
    
    const detection: OverflowDetection = {
      contract,
      vulnerable,
      operations,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDetections([...detections, detection]);
    return detection;
  };

  return { detectOverflow, detections, address };
}

