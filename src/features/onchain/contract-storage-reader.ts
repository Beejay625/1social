'use client';
import { useAccount } from 'wagmi';
import { getStorageAt } from 'viem';
export function useContractStorageReader() {
  const { address, isConnected, chainId } = useAccount();
  const readStorage = async (contractAddress: string, slot: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return { contractAddress, slot, readBy: address };
  };
  return { readStorage, isConnected, address, chainId };
}
