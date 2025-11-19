'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentEncryption {
  encryptionId: string;
  contentHash: string;
  algorithm: string;
  keyHash: string;
  encryptor: string;
  timestamp: bigint;
}

export function useOnchainContentEncryptionManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [encrypting, setEncrypting] = useState(false);
  const [encryptions, setEncryptions] = useState<ContentEncryption[]>([]);

  const { data: encryptionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getEncryptions',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const encryptContent = async (contentHash: string, algorithm: string, keyHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setEncrypting(true);

    try {
      const message = `Encrypt content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'encryptContent',
        args: [contentHash, algorithm, keyHash, address],
      });
    } finally {
      setEncrypting(false);
    }
  };

  useEffect(() => {
    if (encryptionData) {
      const encryption = encryptionData as ContentEncryption;
      setEncryptions(prev => {
        const filtered = prev.filter(e => e.encryptionId !== encryption.encryptionId);
        return [...filtered, encryption];
      });
    }
  }, [encryptionData]);

  return {
    encryptContent,
    encrypting,
    encryptions,
    address,
    isConnected,
    encryptionData,
  };
}

