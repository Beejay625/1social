'use client';
import { useAccount, useReadContract, useSignMessage } from 'wagmi';
export function useTokenSwapRouter() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const findOptimalRoute = async (tokenIn: string, tokenOut: string, amount: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `SwapRoute:${tokenIn}:${tokenOut}:${amount}`;
    await signMessageAsync({ message });
    return { tokenIn, tokenOut, amount, route: 'optimal' };
  };
  return { findOptimalRoute, isConnected, address };
}

