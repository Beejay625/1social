'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useTipCollector() {
  const { address } = useAccount();
  const collectTip = async (amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { amount, recipient: address };
  };
  return { collectTip };
}
