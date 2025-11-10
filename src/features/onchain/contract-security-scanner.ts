'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SecurityScan {
  contract: string;
  vulnerabilities: string[];
  score: number;
  wallet: string;
  timestamp: number;
}

export function useContractSecurityScanner() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [scans, setScans] = useState<SecurityScan[]>([]);

  const scanContract = async (contract: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Scan Security: ${contract}`;
    await signMessageAsync({ message });
    
    const scan: SecurityScan = {
      contract,
      vulnerabilities: [],
      score: 100,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setScans([...scans, scan]);
    return scan;
  };

  return { scanContract, scans, address };
}

