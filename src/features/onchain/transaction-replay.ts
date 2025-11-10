'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useTransactionReplay() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const replay = async (txHash: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Replay:${txHash}`;
    await signMessageAsync({ message });
    return { txHash, replayedBy: address };
  };
  return { replay, isConnected, address };
}
