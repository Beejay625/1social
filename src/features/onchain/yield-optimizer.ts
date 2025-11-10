'use client';
import { useAccount, useReadContract, useSignMessage } from 'wagmi';
export function useYieldOptimizer() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const optimizeYield = async (strategy: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Optimize:${strategy}:${address}`;
    await signMessageAsync({ message });
    return { strategy, optimizedBy: address };
  };
  return { optimizeYield, isConnected, address };
}
