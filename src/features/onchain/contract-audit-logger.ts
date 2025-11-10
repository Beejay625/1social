'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AuditLog {
  contract: string;
  action: string;
  actor: string;
  details: string;
  wallet: string;
  timestamp: number;
}

export function useContractAuditLogger() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const logAction = async (contract: string, action: string, details: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Audit: ${contract} - ${action}`;
    await signMessageAsync({ message });
    
    const log: AuditLog = {
      contract,
      action,
      actor: address,
      details,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setLogs([...logs, log]);
    return log;
  };

  return { logAction, logs, address };
}

