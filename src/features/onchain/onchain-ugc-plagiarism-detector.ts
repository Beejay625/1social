'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface UgcPlagiarismReport {
  id: string;
  owner: string;
  status: string;
  weight: bigint;
  metadata: string;
  timestamp: bigint;
}

export type UgcPlagiarismReportPayload = Partial<UgcPlagiarismReport> & {
  rationale?: string;
};

export function useOnchainUgcPlagiarismDetector() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [reports, setReports] = useState<UgcPlagiarismReport[]>([]);

  const { data: recordData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getUgcPlagiarismReports',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const reportUgcPlagiarism = async (payload: UgcPlagiarismReportPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Report UGC plagiarism evidence: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'reportUgcPlagiarism',
        args: [
          payload.owner || address,
          payload.status || '',
          payload.weight ?? 0n,
          payload.metadata || '',
        ],
      });
    } finally {
      setProcessing(false);
    }
  };

  const validateUgcPlagiarismReport = async (payload: UgcPlagiarismReportPayload) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      await signMessageAsync({ message: 'Validate UGC plagiarism evidence: ' + (payload.metadata ?? '') });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'validateUgcPlagiarismReport',
        args: [payload.owner || address, payload.metadata || ''],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recordData) {
      const record = recordData as UgcPlagiarismReport;
      setReports(prev => {
        const filtered = prev.filter(item => item.id !== record.id);
        return [...filtered, record];
      });
    }
  }, [recordData]);

  return {
    reports,
    processing,
    reportUgcPlagiarism,
    validateUgcPlagiarismReport,
    address,
    isConnected,
  };
}
