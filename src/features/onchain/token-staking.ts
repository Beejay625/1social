'use client';
import { useAccount, useBalance } from 'wagmi';
export function useTokenStaking() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const stakeTokens = async (amount: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    if (Number(balance?.value || 0) < Number(amount)) {
      throw new Error('Insufficient balance');
    }
    return { amount, staker: address };
  };
  return { stakeTokens, balance, isConnected, address };
}
