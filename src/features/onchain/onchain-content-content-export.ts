'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentExport {
  exportId: string;
  contentHashes: string[];
  format: string;
  exporter: string;
  timestamp: bigint;
}

export function useOnchainContentExport() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [exporting, setExporting] = useState(false);
  const [exports, setExports] = useState<ContentExport[]>([]);

  const { data: exportData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getExports',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const exportContent = async (contentHashes: string[], format: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExporting(true);

    try {
      const message = `Export content onchain: ${contentHashes.length} items`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'exportContent',
        args: [contentHashes, format, address],
      });
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (exportData) {
      const exportItem = exportData as ContentExport;
      setExports(prev => {
        const filtered = prev.filter(e => e.exportId !== exportItem.exportId);
        return [...filtered, exportItem];
      });
    }
  }, [exportData]);

  return {
    exportContent,
    exporting,
    exports,
    address,
    isConnected,
    exportData,
  };
}

