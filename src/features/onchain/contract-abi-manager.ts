'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useContractABIManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const saveABI = async (contractAddress: string, abi: any) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `SaveABI:${contractAddress}:${abi.length}`;
    await signMessageAsync({ message });
    return { contractAddress, abi, savedBy: address };
  };
  return { saveABI, isConnected, address };
}
