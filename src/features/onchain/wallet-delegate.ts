'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useWalletDelegateAccess() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const requestDelegation = async (delegateAddress: string) => {
    if (!address) throw new Error('Wallet not connected');
    const message = `Delegate:${delegateAddress}:${address}`;
    await signMessageAsync({ message });
    return { delegateAddress, approvedBy: address };
  };
  return { requestDelegation };
}

