'use client';
import { useAccount, useBalance } from 'wagmi';
export function useTokenBalanceFetcher() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const fetchBalance = () => {
    if (!isConnected || !address) return null;
    return { value: balance?.value, formatted: balance?.formatted, symbol: balance?.symbol };
  };
  return { fetchBalance, balance, isConnected, address };
}
