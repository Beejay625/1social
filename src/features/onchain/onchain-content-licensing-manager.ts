'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LicenseConfig {
  contentHash: string;
  licenseType: string;
  allowedUses: string[];
  price: bigint;
  expiryTime: bigint;
}

export function useOnchainContentLicensingManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: licenseInfo } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getLicenseInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createLicense = async (config: LicenseConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create onchain license for content: ${config.contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createLicense',
        args: [
          config.contentHash,
          config.licenseType,
          config.allowedUses,
          config.price,
          config.expiryTime,
        ],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    createLicense,
    managing,
    address,
    isConnected,
    licenseInfo,
  };
}

