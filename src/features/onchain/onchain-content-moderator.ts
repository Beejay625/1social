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

  const { data: moderationPower } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getModerationPower',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const moderateContent = async (action: ModerationAction) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setModerating(true);

    try {
      const message = `Moderate content onchain: ${action.action} for ${action.contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'moderateContent',
        args: [action.contentHash, action.action, action.reason, address],
      });
    } finally {
      setModerating(false);
    }
  };

  return {
    moderateContent,
    moderating,
    address,
    isConnected,
    moderationPower,
  };
}

