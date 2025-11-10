'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useOnchainStorage() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const storeContent = async (content: string, ipfsHash: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Store:${ipfsHash}:${content.substring(0, 50)}`;
    await signMessageAsync({ message });
    return { ipfsHash, storedBy: address };
  };
  return { storeContent, isConnected, address };
}

