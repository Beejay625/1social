'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useAdminActionTracker() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const trackAction = async (action: string, target: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `AdminAction:${action}:${target}`;
    await signMessageAsync({ message });
    return { action, target, trackedBy: address };
  };
  return { trackAction, isConnected, address };
}
