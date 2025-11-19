'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentImport {
  importId: string;
  source: string;
  contentHashes: string[];
  importer: string;
  timestamp: bigint;
}

export function useOnchainContentImport() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [importing, setImporting] = useState(false);
  const [imports, setImports] = useState<ContentImport[]>([]);

  const { data: importData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getImports',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const importContent = async (source: string, contentHashes: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setImporting(true);

    try {
      const message = `Import content onchain: ${source}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'importContent',
        args: [source, contentHashes, address],
      });
    } finally {
      setImporting(false);
    }
  };

  useEffect(() => {
    if (importData) {
      const importItem = importData as ContentImport;
      setImports(prev => {
        const filtered = prev.filter(i => i.importId !== importItem.importId);
        return [...filtered, importItem];
      });
    }
  }, [importData]);

  return {
    importContent,
    importing,
    imports,
    address,
    isConnected,
    importData,
  };
}

