'use client';
import { useAccount, useBalance } from 'wagmi';
export function useBalanceChecker() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const checkBalance = () => {
    if (!isConnected || !address) return null;
    return { balance: balance?.value, formatted: balance?.formatted, symbol: balance?.symbol };
  };
  return { checkBalance, balance, isConnected, address };
}

