'use client';
import { useAccount, useNonce } from 'wagmi';
export function useWalletNonceTracker() {
  const { address, isConnected } = useAccount();
  const { data: nonce } = useNonce({ address });
  const getNextNonce = () => {
    if (!isConnected || !address) return null;
    return nonce ? nonce + 1 : 0;
  };
  return { getNextNonce, nonce, isConnected, address };
}

