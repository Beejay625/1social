'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentCompliance {
  complianceId: string;
  contentHash: string;
  standard: string;
  passed: boolean;
  checker: string;
  timestamp: bigint;
}

export function useOnchainContentComplianceChecker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [checking, setChecking] = useState(false);
  const [compliances, setCompliances] = useState<ContentCompliance[]>([]);

  const { data: complianceData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCompliances',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const checkCompliance = async (contentHash: string, standard: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setChecking(true);

    try {
      const message = `Check compliance onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'checkCompliance',
        args: [contentHash, standard, address],
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (complianceData) {
      const compliance = complianceData as ContentCompliance;
      setCompliances(prev => {
        const filtered = prev.filter(c => c.complianceId !== compliance.complianceId);
        return [...filtered, compliance];
      });
    }
  }, [complianceData]);

  return {
    checkCompliance,
    checking,
    compliances,
    address,
    isConnected,
    complianceData,
  };
}

