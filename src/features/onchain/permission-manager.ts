'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function usePermissionManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const grantPermission = async (target: string, permission: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Permission:${permission}:${target}:${address}`;
    await signMessageAsync({ message });
    return { target, permission, grantedBy: address };
  };
  return { grantPermission, isConnected, address };
}


