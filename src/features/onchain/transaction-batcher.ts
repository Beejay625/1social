'use client';
import { useAccount } from 'wagmi';
export function useTransactionBatcher() {
  const { address } = useAccount();
  const batchTransactions = async (txs: Array<{ to: string; data: string }>) => {
    if (!address) throw new Error('Wallet not connected');
    return { transactions: txs, batchedBy: address };
  };
  return { batchTransactions };
}
