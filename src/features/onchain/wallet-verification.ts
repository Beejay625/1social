'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useWalletVerification() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const verifyWallet = async () => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Verify:${address}:${Date.now()}`;
    await signMessageAsync({ message });
    return { verified: true, address };
  };
  return { verifyWallet, isConnected, address };
}
