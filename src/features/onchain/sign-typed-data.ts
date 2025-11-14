'use client';
import { useAccount, useSignTypedData } from 'wagmi';
export function useSignTypedData() {
  const { address, isConnected } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const sign = async (domain: any, types: any, value: any) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await signTypedDataAsync({ domain, types, primaryType: 'Message', message: value });
  };
  return { sign, isConnected, address };
}


