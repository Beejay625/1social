'use client';
import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
export function useNFTCollectionManager() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const createCollection = async (name: string, symbol: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `CreateCollection:${name}:${symbol}`;
    await signMessageAsync({ message });
    return { name, symbol, createdBy: address };
  };
  return { createCollection, isConnected, address };
}
