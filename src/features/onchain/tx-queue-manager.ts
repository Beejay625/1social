'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useTransactionQueueManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const queueTransaction = async (tx: any) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Queue:${JSON.stringify(tx)}`;
    await signMessageAsync({ message });
    return { tx, queuedBy: address };
  };
  return { queueTransaction, isConnected, address };
}


