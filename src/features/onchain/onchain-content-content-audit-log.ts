'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentAuditLog {
  logId: string;
  contentHash: string;
  action: string;
  actor: string;
  details: string;
  timestamp: bigint;
}

export function useOnchainContentAuditLog() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [logging, setLogging] = useState(false);
  const [logs, setLogs] = useState<ContentAuditLog[]>([]);

  const { data: logData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getAuditLogs',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const logAction = async (contentHash: string, action: string, details: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setLogging(true);

    try {
      const message = `Log audit action onchain: ${action}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'logAction',
        args: [contentHash, action, details, address],
      });
    } finally {
      setLogging(false);
    }
  };

  useEffect(() => {
    if (logData) {
      const log = logData as ContentAuditLog;
      setLogs(prev => {
        const filtered = prev.filter(l => l.logId !== log.logId);
        return [...filtered, log];
      });
    }
  }, [logData]);

  return {
    logAction,
    logging,
    logs,
    address,
    isConnected,
    logData,
  };
}

