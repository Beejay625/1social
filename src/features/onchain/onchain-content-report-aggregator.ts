'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentReport {
  contentHash: string;
  reportType: string;
  reporter: string;
  timestamp: bigint;
  status: 'pending' | 'reviewed' | 'resolved';
}

export function useOnchainContentReportAggregator() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [reporting, setReporting] = useState(false);
  const [reports, setReports] = useState<ContentReport[]>([]);

  const { data: reportData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReports',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const submitReport = async (contentHash: string, reportType: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setReporting(true);

    try {
      const message = `Report content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'submitReport',
        args: [contentHash, reportType, address],
      });
    } finally {
      setReporting(false);
    }
  };

  useEffect(() => {
    if (reportData) {
      const report = reportData as ContentReport;
      setReports(prev => {
        const filtered = prev.filter(r => r.contentHash !== report.contentHash || r.reporter !== report.reporter);
        return [...filtered, report];
      });
    }
  }, [reportData]);

  return {
    submitReport,
    reporting,
    reports,
    address,
    isConnected,
    reportData,
  };
}

