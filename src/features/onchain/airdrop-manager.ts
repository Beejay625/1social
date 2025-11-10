'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useAirdropManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const createAirdrop = async (recipients: string[], amount: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Airdrop:${recipients.length}:${amount}`;
    await signMessageAsync({ message });
    return { recipients, amount, createdBy: address };
  };
  return { createAirdrop, isConnected, address };
}
