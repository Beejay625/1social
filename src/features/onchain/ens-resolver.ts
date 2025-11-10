'use client';
import { useAccount, useEnsName, useEnsAddress } from 'wagmi';
export function useENSResolver() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const resolveENS = async (name: string) => {
    if (!isConnected) throw new Error('Reown wallet not connected');
    return { name, resolved: true };
  };
  return { resolveENS, ensName, isConnected, address };
}

