'use client';
import { useAccount, useNonce } from 'wagmi';
export function useNonceManager() {
  const { address, isConnected } = useAccount();
  const { data: nonce } = useNonce({ address });
  return { nonce, isConnected, address };
}

