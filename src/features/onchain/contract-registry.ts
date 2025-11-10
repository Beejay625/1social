'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useContractRegistry() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const registerContract = async (contractAddress: string, name: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Register:${contractAddress}:${name}`;
    await signMessageAsync({ message });
    return { contractAddress, name, registeredBy: address };
  };
  return { registerContract, isConnected, address };
}
