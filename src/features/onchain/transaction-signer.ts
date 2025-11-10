'use client';
import { useAccount, useSignTransaction } from 'wagmi';
export function useTransactionSigner() {
  const { address, isConnected } = useAccount();
  const { signTransactionAsync } = useSignTransaction();
  const signTx = async (tx: any) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await signTransactionAsync(tx);
  };
  return { signTx, isConnected, address };
}

