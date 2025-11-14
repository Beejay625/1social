'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProxyDetection {
  contract: string;
  isProxy: boolean;
  implementation: string;
  wallet: string;
  timestamp: number;
}

export function useContractProxyDetector() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [detections, setDetections] = useState<ProxyDetection[]>([]);

  const detectProxy = async (contract: string, isProxy: boolean, implementation: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Detect Proxy: ${contract}`;
    await signMessageAsync({ message });
    
    const detection: ProxyDetection = {
      contract,
      isProxy,
      implementation,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDetections([...detections, detection]);
    return detection;
  };

  return { detectProxy, detections, address };
}


