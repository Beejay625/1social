'use client';
import { useAccount } from 'wagmi';
import { encodeFunctionData } from 'viem';
export function useFunctionSelectorEncoder() {
  const { address, isConnected } = useAccount();
  const encode = (abi: any, functionName: string, args: any[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return encodeFunctionData({ abi, functionName, args });
  };
  return { encode, isConnected, address };
}
