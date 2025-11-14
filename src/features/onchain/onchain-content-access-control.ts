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

  const { data: accessStatus } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'checkAccess',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const setAccessControl = async (control: AccessControl) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Set access control onchain: ${control.accessType} for ${control.contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'setAccessControl',
        args: [
          control.contentHash,
          control.accessType,
          control.requiredToken,
          control.minBalance,
          control.allowedWallets,
        ],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setAccessControl,
    managing,
    address,
    isConnected,
    accessStatus,
  };
}

