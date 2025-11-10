'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useTimelockQueueManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const queueTransaction = async (target: string, value: bigint, data: string, eta: number) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Queue:${target}:${value}:${eta}`;
    await signMessageAsync({ message });
    return { target, value, data, eta, queuedBy: address };
  };
  return { queueTransaction, isConnected, address };
}
