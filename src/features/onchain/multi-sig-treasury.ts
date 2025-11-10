'use client';
import { useAccount } from 'wagmi';
export function useMultiSigTreasury() {
  const { address } = useAccount();
  const proposeTransaction = async (to: string, amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { to, amount, proposer: address };
  };
  return { proposeTransaction };
}
