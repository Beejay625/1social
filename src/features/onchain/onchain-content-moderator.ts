'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ModerationAction {
  contentHash: string;
  action: 'flag' | 'approve' | 'remove';
  reason: string;
  moderatorAddress: string;
}

export function useOnchainContentModerator() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [moderating, setModerating] = useState(false);

