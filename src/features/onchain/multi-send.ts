'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useMultiSend() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const sendMultiple = async (recipients: string[], amounts: string[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return { recipients, amounts, sender: address };
  };
  return { sendMultiple, isConnected, address };
}

