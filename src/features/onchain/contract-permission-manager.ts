'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Permission {
  contract: string;
  role: string;
  account: string;
  granted: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractPermissionManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const managePermission = async (contract: string, role: string, account: string, granted: boolean) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Permission: ${granted ? 'Grant' : 'Revoke'} ${role} to ${account}`;
    await signMessageAsync({ message });
    
    const permission: Permission = {
      contract,
      role,
      account,
      granted,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setPermissions([...permissions, permission]);
    return permission;
  };

  return { managePermission, permissions, address };
}

