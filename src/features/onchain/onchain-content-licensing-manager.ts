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

