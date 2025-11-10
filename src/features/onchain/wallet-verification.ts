'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useWalletVerification() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const verifyWallet = async () => {
    if (!address) throw new Error('Wallet not connected');
    const message = `Verify:${address}`;
    await signMessageAsync({ message });
    return { verified: true, address };
  };
  return { verifyWallet };
}
