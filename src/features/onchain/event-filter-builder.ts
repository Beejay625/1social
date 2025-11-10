'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useEventFilterBuilder() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const buildFilter = async (eventName: string, filters: Record<string, any>) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Filter:${eventName}:${JSON.stringify(filters)}`;
    await signMessageAsync({ message });
    return { eventName, filters, builtBy: address };
  };
  return { buildFilter, isConnected, address };
}
