'use client';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
export function useTransactionStatus() {
  const { address, isConnected } = useAccount();
  const { data: receipt, isLoading } = useWaitForTransactionReceipt({
    hash: '0x' as `0x${string}`,
    query: { enabled: isConnected && !!address },
  });
  return { receipt, isLoading, isConnected, address };
}


