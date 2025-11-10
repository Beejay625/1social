'use client';
import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
export function useEmergencyPauseManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const pause = async (contractAddress: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Pause:${contractAddress}`;
    await signMessageAsync({ message });
    return { contractAddress, pausedBy: address };
  };
  return { pause, isConnected, address };
}
