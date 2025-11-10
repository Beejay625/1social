'use client';
import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
export function useTokenLockManager() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const lockTokens = async (tokenAddress: string, amount: string, unlockDate: number) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Lock:${tokenAddress}:${amount}:${unlockDate}`;
    await signMessageAsync({ message });
    return { tokenAddress, amount, unlockDate, lockedBy: address };
  };
  return { lockTokens, isConnected, address };
}
