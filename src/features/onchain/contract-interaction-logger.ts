'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useContractInteractionLogger() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const logInteraction = async (contractAddress: string, functionName: string, args: any[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Log:${contractAddress}:${functionName}:${JSON.stringify(args)}`;
    await signMessageAsync({ message });
    return { contractAddress, functionName, args, loggedBy: address };
  };
  return { logInteraction, isConnected, address };
}
