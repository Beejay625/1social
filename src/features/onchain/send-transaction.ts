'use client';
import { useAccount, useSendTransaction } from 'wagmi';
export function useSendTransaction() {
  const { address, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const send = async (to: string, value: bigint) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await sendTransactionAsync({
      to: to as `0x${string}`,
      value,
    });
  };
  return { send, isConnected, address };
}

