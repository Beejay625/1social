'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AccessControl {
  contentHash: string;
  accessType: 'token-gated' | 'nft-gated' | 'wallet-gated';
  requiredToken: string;
  minBalance: bigint;
  allowedWallets: string[];
}

export function useOnchainContentAccessControl() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

