'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentPermission {
  permissionId: string;
  contentHash: string;
  grantee: string;
  permissions: string[];
  granter: string;
  timestamp: bigint;
}

export function useOnchainContentPermissionManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [permissions, setPermissions] = useState<ContentPermission[]>([]);

  const { data: permissionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPermissions',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const grantPermission = async (contentHash: string, grantee: string, permissions: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Grant permission onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'grantPermission',
        args: [contentHash, grantee, permissions, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (permissionData) {
      const permission = permissionData as ContentPermission;
      setPermissions(prev => {
        const filtered = prev.filter(p => p.permissionId !== permission.permissionId);
        return [...filtered, permission];
      });
    }
  }, [permissionData]);

  return {
    grantPermission,
    managing,
    permissions,
    address,
    isConnected,
    permissionData,
  };
}

