'use client';
import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
export function useRoleManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const grantRole = async (role: string, account: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `GrantRole:${role}:${account}`;
    await signMessageAsync({ message });
    return { role, account, grantedBy: address };
  };
  return { grantRole, isConnected, address };
}
