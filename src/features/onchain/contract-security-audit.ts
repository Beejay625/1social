'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SecurityAudit {
  contract: string;
  vulnerabilities: string[];
  severity: string;
  wallet: string;
  timestamp: number;
}

export function useContractSecurityAudit() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [audits, setAudits] = useState<SecurityAudit[]>([]);

  const performAudit = async (contract: string, vulnerabilities: string[], severity: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Security Audit: ${contract}`;
    await signMessageAsync({ message });
    
    const audit: SecurityAudit = {
      contract,
      vulnerabilities,
      severity,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAudits([...audits, audit]);
    return audit;
  };

  return { performAudit, audits, address };
}


