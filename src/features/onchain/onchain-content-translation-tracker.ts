'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentTranslation {
  contentHash: string;
  targetLanguage: string;
  translatedHash: string;
  translator: string;
  timestamp: bigint;
}

export function useOnchainContentTranslationTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);
  const [translations, setTranslations] = useState<ContentTranslation[]>([]);

  const { data: translationData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getTranslations',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const trackTranslation = async (contentHash: string, targetLanguage: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Track translation onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'trackTranslation',
        args: [contentHash, targetLanguage, address],
      });
    } finally {
      setTracking(false);
    }
  };

  useEffect(() => {
    if (translationData) {
      const translation = translationData as ContentTranslation;
      setTranslations(prev => {
        const filtered = prev.filter(t => t.contentHash !== translation.contentHash || t.targetLanguage !== translation.targetLanguage);
        return [...filtered, translation];
      });
    }
  }, [translationData]);

  return {
    trackTranslation,
    tracking,
    translations,
    address,
    isConnected,
    translationData,
  };
}

